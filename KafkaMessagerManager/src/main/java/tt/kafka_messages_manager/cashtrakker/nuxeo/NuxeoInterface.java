package tt.kafka_messages_manager.cashtrakker.nuxeo;

import org.nuxeo.client.objects.Document;
import org.nuxeo.client.objects.Documents;

import java.util.List;

public interface NuxeoInterface {
    List<Document> getAllDocuments();
    Document getDocumentById(String id);
    Documents getDocumentsByTitle(String title);
    Document getDocumentByPath(String path);
    boolean deleteDocuments(List<Document> documents);
    Document createWorkspace(String parentPath, String workspaceName);
    void saveDocumentAsFile(Document document, String path);
    Document createFileDocument(String workSpacePath, String fileName);
    void uploadFileContentUsingBatch(String path, String fileName, String workspacePath);
}
