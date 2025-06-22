package tt.kafka_messages_manager.cashtrakker.model;

import lombok.*;
import org.nuxeo.client.objects.blob.Blob;

import java.io.Serializable;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NuxeoFile implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String fileName;
    private Blob blob;
    private LocalDate uploadDate;
}
