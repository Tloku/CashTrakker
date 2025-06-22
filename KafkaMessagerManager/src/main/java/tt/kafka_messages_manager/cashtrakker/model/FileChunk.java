package tt.kafka_messages_manager.cashtrakker.model;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileChunk implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String fileName;
    private byte[] data;
    private LocalDate uploadDate;
    private int chunkNumber;
    private boolean isFirstChunk;
    private boolean isLastChunk;
}