package tt.kafka_messages_manager.cashtrakker.exceptions;

public class NuxeoConnectionException extends RuntimeException {
    public NuxeoConnectionException(String message) {
        super(message);
    }

    public NuxeoConnectionException(String message, Throwable e) {
        super(message, e);
    }
}
