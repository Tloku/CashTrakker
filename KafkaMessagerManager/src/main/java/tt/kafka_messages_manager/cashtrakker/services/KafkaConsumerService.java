package tt.kafka_messages_manager.cashtrakker.services;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.model.FileChunkMessage;

@Service
public class KafkaConsumerService {

    private final FileToNuxeoService fileToNuxeoService;

    public KafkaConsumerService(FileToNuxeoService fileToNuxeoService) {
        this.fileToNuxeoService = fileToNuxeoService;
    }

    @KafkaListener(topics = "${kafka.file-chunk-topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void listenForUploadedFileChunks(String message) {
        var fileChunkMessage = StringMessageToJsonObjectConverter.convertToJson(message, FileChunkMessage.class);
        System.out.println("Received message: " + message);
        fileToNuxeoService.saveToNuxeo(fileChunkMessage);
    }
}
