package tt.kafka_messages_manager.cashtrakker.services;

import org.apache.commons.io.FileUtils;
import org.nuxeo.client.objects.blob.Blob;
import org.nuxeo.client.objects.blob.FileBlob;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.exceptions.BlobCreationException;
import tt.kafka_messages_manager.cashtrakker.exceptions.FileChunkNotFoundException;
import tt.kafka_messages_manager.cashtrakker.model.FileChunk;
import tt.kafka_messages_manager.cashtrakker.model.FileChunkMessage;
import tt.kafka_messages_manager.cashtrakker.model.NuxeoFile;
import tt.kafka_messages_manager.cashtrakker.repositories.FileChunkRepository;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class FileChunkJoinerService {

    private final FileChunkRepository fileChunkRepository;

    public FileChunkJoinerService(FileChunkRepository fileChunkRepository) {
        this.fileChunkRepository = fileChunkRepository;
    }

    public NuxeoFile getFileFromChunks(FileChunkMessage fileChunkMessage) {
        var fileChunks = getChunks(fileChunkMessage);

        if (fileChunks.isEmpty()) {
            return null;
        }

        var nuxeoFile = createNuxeoFile(fileChunks);
        var blob = createBlobFromFileChunks(fileChunks);
        nuxeoFile.setBlob(blob);
        System.out.println("Successfully created nuxeo file: " + nuxeoFile.getId());
        return nuxeoFile;
    }

    private List<FileChunk> getChunks(FileChunkMessage fileChunkMessage) {
        var fileChunks = new ArrayList<FileChunk>();
        for (int i = 0; i < fileChunkMessage.getNumbersOfChunks(); i++) {
            String key = fileChunkMessage.getId() + "-" + (i + 1);
            var fileChunk = fileChunkRepository.getByKey(key);

            if (fileChunk == null) {
                throw new FileChunkNotFoundException("Could not find file chunk with key: " + key);
            }

            fileChunks.add(fileChunk);
        }
        return fileChunks;
    }

    private NuxeoFile createNuxeoFile(List<FileChunk> fileChunks) {
        return NuxeoFile.builder()
                .fileName(fileChunks.getFirst().getFileName())
                .id(fileChunks.getFirst().getId())
                .uploadDate(fileChunks.getFirst().getUploadDate())
                .build();
    }

    private Blob createBlobFromFileChunks(List<FileChunk> fileChunks) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            for (var fileChunk: fileChunks) {
                outputStream.write(fileChunk.getData());
            }

            var fileInBytes = outputStream.toByteArray();
            var file = new File(fileChunks.getFirst().getFileName());
            FileUtils.writeByteArrayToFile(file, fileInBytes);
            return new FileBlob(file);
        } catch (IOException e) {
            throw new BlobCreationException(e.getMessage());
        }
    }
}


