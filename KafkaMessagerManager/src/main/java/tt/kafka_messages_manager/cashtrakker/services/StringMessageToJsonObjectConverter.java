package tt.kafka_messages_manager.cashtrakker.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import tt.kafka_messages_manager.cashtrakker.exceptions.ConvertToJsonException;

@Service
public class StringMessageToJsonObjectConverter {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static <T> T convertToJson(String strObject, Class<T> clazz) {
        try {
            return MAPPER.readValue(strObject, clazz);
        } catch (JsonProcessingException e) {
            throw new ConvertToJsonException(e.getMessage());
        }
    }
}
