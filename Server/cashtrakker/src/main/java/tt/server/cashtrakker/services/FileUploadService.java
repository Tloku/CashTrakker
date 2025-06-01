package tt.server.cashtrakker.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tt.server.cashtrakker.model.FileChunk;
import tt.server.cashtrakker.model.FileChunkMessage;
import tt.server.cashtrakker.model.FileChunkResponse;
import tt.server.cashtrakker.repositories.FileChunkRepository;

@Service
@Slf4j
public class FileUploadService {

    private final FileChunkRepository fileChunkRepository;
    private final KafkaProducerService kafkaProducerService;

    public FileUploadService(FileChunkRepository fileChunkRepository, KafkaProducerService kafkaProducerService) {
        this.fileChunkRepository = fileChunkRepository;
        this.kafkaProducerService = kafkaProducerService;
    }

    public FileChunkResponse uploadFileChunk(FileChunk fileChunk) {
        String key = fileChunk.getId() + "-" + fileChunk.getChunkNumber();
        fileChunkRepository.save(key, fileChunk);
        FileChunkResponse resp = FileChunkResponse.builder()
                .name(key)
                .build();

        if (fileChunk.isLastChunk()) {
            kafkaProducerService.sendMessage("cashtrakker-filechunk-topic", FileChunkMessage.builder()
                    .id(fileChunk.getId())
                    .numbersOfChunks(fileChunk.getChunkNumber())
                    .build());
        }

        return resp;
    }
}
