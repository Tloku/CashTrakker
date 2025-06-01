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

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
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
            Files.copy(blobStream, Path.of(path + title));
            System.out.println("File saved successfully!");
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    @Override
    public Document createFileDocument(String workSpacePath, String fileName) {
        Document document = Document.createWithName(fileName, NuxeoDocumentType.FILE.getType());
        document.setPropertyValue("dc:title", fileName.split("\\.")[0]);
        return nuxeoClient.repository().createDocumentByPath(workSpacePath, document);
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

