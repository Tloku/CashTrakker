package tt.kafka_messages_manager.cashtrakker.exceptions;

public class FileChunkNotFoundException extends RuntimeException {
    public FileChunkNotFoundException(String message) {
        super(message);
    }

    public FileChunkNotFoundException(String message, Throwable t) {
      super(message, t);
    }
}
