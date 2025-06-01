package tt.server.cashtrakker.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import tt.server.cashtrakker.model.FileChunkMessage;

@Slf4j
@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, FileChunkMessage> kafkaFileChunkTemplate;

    public KafkaProducerService(KafkaTemplate<String, FileChunkMessage> kafkaTemplate) {
        this.kafkaFileChunkTemplate = kafkaTemplate;
    }

    public void sendMessage(String topicName, FileChunkMessage fileChunk) {
        kafkaFileChunkTemplate.send(topicName, fileChunk);
    }
}
