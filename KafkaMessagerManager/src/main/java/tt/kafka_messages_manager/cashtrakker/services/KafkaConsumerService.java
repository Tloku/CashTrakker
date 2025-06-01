package tt.kafka_messages_manager.cashtrakker.services;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.model.FileChunk;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "${kafka.file-chunk-topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void listenForUploadedFileChunks(String message) {
        System.out.println("Received message: " + message);
        // You can process the message here
    }
}
