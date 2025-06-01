package tt.server.cashtrakker.model;

import lombok.*;

import java.time.LocalDate;

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
