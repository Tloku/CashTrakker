package tt.kafka_messages_manager.cashtrakker.nuxeo;

import org.nuxeo.client.NuxeoClient;
import org.nuxeo.client.Operations;
import org.nuxeo.client.objects.Document;
import org.nuxeo.client.objects.Documents;
import org.nuxeo.client.objects.blob.FileBlob;
import org.nuxeo.client.objects.upload.BatchUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.model.NuxeoFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
public class NuxeoService implements NuxeoInterface {
    private static final Logger log = LoggerFactory.getLogger(NuxeoService.class);
    private final NuxeoClient nuxeoClient;

    public NuxeoService(NuxeoClient nuxeoClient) {
        this.nuxeoClient = nuxeoClient;
    }

    @Override
    public List<Document> getAllDocuments() {
        Document rootDocument = nuxeoClient
                .repository()
                .fetchDocumentByPath("/");

        return getAllDocumentsRecursively(rootDocument).toList();
    }

    @Override
    public Document getDocumentById(String id) {
        return nuxeoClient
                .repository()
                .fetchDocumentById(id);
    }

    @Override
    public Documents getDocumentsByTitle(String title) {
        return nuxeoClient
                .repository()
                .query("SELECT * FROM Document WHERE dc:title = '" + title + "'");
    }

    @Override
    public Document getDocumentByPath(String path) {
        return nuxeoClient.repository().fetchDocumentByPath(path);
    }

    @Override
    public boolean deleteDocuments(List<Document> documents) {
        for(Document doc: documents) {
            try {
                nuxeoClient
                        .repository()
                        .deleteDocument(doc);
                System.out.println("Successfully deleted file: " + doc.getTitle());
            } catch (RuntimeException e) {
                System.out.println("Error occurred when deleting file: " + doc.getTitle());
                return false;
            }
        }
        return true;
    }

    @Override
    public Document createWorkspace(String parentPath, String workspaceName) {
        try {
            Document existingWorkspace = nuxeoClient.repository().fetchDocumentByPath(parentPath + "/" + workspaceName);
            System.out.println("Workspace already exists: " + existingWorkspace.getPath());
            return existingWorkspace;
        } catch (Exception e) {
            System.out.println("Workspace does not exist. Creating new one...");
        }

        Document workspace = Document.createWithName(workspaceName, NuxeoDocumentType.WORKSPACE.getType());
        workspace.setPropertyValue("dc:title", workspaceName);
        return nuxeoClient.repository().createDocumentByPath(parentPath, workspace);
    }

    @Override
    public void saveDocumentAsFile(Document document, String path) {
        if (document.getPropertyValue("file:content") == null) {
            System.out.println("File " + document.getTitle() + " has no content" );
            return;
        }

        Map<String, String> properties = document.getPropertyValue("file:content");
        String title = properties.get("name");
        try (InputStream blobStream = document.streamBlob().getStream()) {
            Path targetDir = Path.of(path);
            if (!Files.exists(targetDir)) {
                Files.createDirectories(targetDir);
            }

            Path targetFile = targetDir.resolve(title);
            Files.copy(blobStream, targetFile, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File saved successfully at: " + targetFile);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    @Override
    public Document createFileDocument(String workSpacePath, String fileName) {
        Document document = Document.createWithName(fileName, NuxeoDocumentType.FILE.getType());
        document.setPropertyValue("dc:title", fileName);
        Document created = nuxeoClient.repository().createDocumentByPath(workSpacePath, document);
        System.out.println("Created document of title: " + fileName);
        return created;
    }

    @Override
    public void uploadFileContentUsingBatch(String path, String fileName, String workspacePath) {
        File initialFile = new File(path + fileName);
        FileBlob blob = new FileBlob(initialFile);
        BatchUpload batchUpload = nuxeoClient.batchUploadManager().createBatch();
        batchUpload = batchUpload.upload("0", blob);
        batchUpload.operationOnFile(Operations.BLOB_ATTACH_ON_DOCUMENT)
                .param("document", workspacePath + "/" + fileName)
                .execute();
    }

    @Override
    public void uploadFileContentUsingBatch(Document document, NuxeoFile nuxeoFile) {
        BatchUpload batchUpload = nuxeoClient.batchUploadManager().createBatch();
        batchUpload = batchUpload.upload("0", nuxeoFile.getBlob());
        batchUpload.operationOnFile(Operations.BLOB_ATTACH_ON_DOCUMENT)
                .param("document", document.getPath())
                .execute();
        System.out.println("Executed file batch uploading");
    }

    @Override
    public Document saveNuxeoFile(NuxeoFile nuxeoFile, String workspacePath) {
        Document created = createFileDocument(workspacePath, nuxeoFile.getId());
        uploadFileContentUsingBatch(created, nuxeoFile);
        return created;
    }

    @Override
    public void clearWorkspace(String path) {
        String query = "SELECT * FROM Document WHERE ecm:path STARTSWITH '" + path + "' AND ecm:primaryType = 'File' AND ecm:isTrashed = 0";
        List<Document> documents = nuxeoClient.repository().query(query).getDocuments();

        for (Document doc : documents) {
            System.out.println("Deleting document: " + doc.getTitle() + " (" + doc.getPath() + ")");
            nuxeoClient.repository().deleteDocument(doc.getId());
        }

        System.out.println("Workspace cleared: " + path);
    }

    private Stream<Document> getAllDocumentsRecursively(Document rootDocument) {
        if (!NuxeoDocumentType.canBeTraversed(rootDocument.getType())) {
            return Stream.of(rootDocument);
        }

        return Stream.concat(
                Stream.of(rootDocument),
                rootDocument.fetchChildren()
                        .streamEntries()
                        .flatMap(this::getAllDocumentsRecursively)
        );
    }
}

