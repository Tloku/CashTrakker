package tt.kafka_messages_manager.cashtrakker.services;

import org.nuxeo.client.NuxeoClient;
import org.nuxeo.client.objects.Document;
import org.nuxeo.client.objects.Documents;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.model.FileChunkMessage;
import tt.kafka_messages_manager.cashtrakker.model.NuxeoFile;
import tt.kafka_messages_manager.cashtrakker.nuxeo.NuxeoService;
import tt.kafka_messages_manager.cashtrakker.repositories.FileChunkRepository;

@Service
public class FileToNuxeoService {
    private final String WORKSPACE_DIRECTORY = "/default-domain/workspaces/uploads";
    private final NuxeoService nuxeoService;
    private final FileChunkJoinerService fileChunkJoinerService;

    public FileToNuxeoService(NuxeoService nuxeoService,FileChunkJoinerService fileChunkJoinerService) {
        this.nuxeoService = nuxeoService;
        this.fileChunkJoinerService = fileChunkJoinerService;
    }

    public void saveToNuxeo(FileChunkMessage fileChunkMessage) {
        NuxeoFile file = fileChunkJoinerService.getFileFromChunks(fileChunkMessage);
        nuxeoService.saveNuxeoFile(file, WORKSPACE_DIRECTORY);
        System.out.println("Successfully saved file in nuxeo: {id: " + file.getId() + "}");
    }


}
