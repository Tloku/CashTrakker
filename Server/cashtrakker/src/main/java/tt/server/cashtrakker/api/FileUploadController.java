package tt.server.cashtrakker.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import tt.server.cashtrakker.model.FileChunk;
import tt.server.cashtrakker.model.FileChunkResponse;
import tt.server.cashtrakker.repositories.FileChunkRepository;
import tt.server.cashtrakker.services.FileUploadService;
import tt.server.cashtrakker.services.KafkaProducerService;

import java.io.IOException;
import java.time.LocalDate;

@Controller
@RequestMapping("/file_upload")
@CrossOrigin(value = "*")
public class FileUploadController {

    private final FileChunkRepository fileChunkRepository;
    private final KafkaProducerService kafkaProducerService;
    private final FileUploadService fileUploadService;


    public FileUploadController(
        FileChunkRepository fileChunkRepository,
        KafkaProducerService kafkaProducerService,
        FileUploadService fileUploadService
    ) {
        this.fileChunkRepository = fileChunkRepository;
        this.kafkaProducerService = kafkaProducerService;
        this.fileUploadService = fileUploadService;
    }

    @PostMapping(value = "/receipt", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FileChunkResponse> uploadFile(
        @RequestParam(value = "file") MultipartFile file,
        @RequestParam("chunkNumber") int chunkNumber,
        @RequestParam("totalChunks") int totalChunks,
        @RequestParam("isFirstChunk") boolean isFirstChunk,
        @RequestParam("isLastChunk") boolean isLastChunk,
        @RequestParam("fileName") String fileName,
        @RequestParam("id") String id
    ) throws IOException {
        FileChunk fileChunk = FileChunk.builder()
                .id(id)
                .uploadDate(LocalDate.now())
                .chunkNumber(chunkNumber)
                .isFirstChunk(isFirstChunk)
                .isLastChunk(isLastChunk)
                .fileName(fileName)
                .data(file.getBytes())
                .build();

        var resp = fileUploadService.uploadFileChunk(fileChunk);

        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
}
