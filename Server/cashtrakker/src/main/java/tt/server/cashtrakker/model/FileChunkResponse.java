package tt.server.cashtrakker.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class FileChunkResponse {
    private String name;
    private boolean finishedSaving;
}
