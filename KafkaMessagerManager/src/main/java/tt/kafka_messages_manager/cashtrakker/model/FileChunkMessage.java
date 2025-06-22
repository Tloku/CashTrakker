package tt.kafka_messages_manager.cashtrakker.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileChunkMessage {
    private static final long serialVersionUID = 1L;
    private String id;
    private int numbersOfChunks;
}
