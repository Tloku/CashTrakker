package tt.kafka_messages_manager.cashtrakker.nuxeo;

import org.nuxeo.client.NuxeoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tt.kafka_messages_manager.cashtrakker.exceptions.NuxeoConnectionException;

@Configuration
public class NuxeoClientProvider {
    private static final Logger log = LoggerFactory.getLogger(NuxeoClientProvider.class);
    @Value("${nuxeo.url}")
    private String nuxeoUrl;

    @Value("${nuxeo.username}")
    private String nuxeoUsername;

    @Value("${nuxeo.password}")
    private String nuxeoPassword;

    @Bean
    public NuxeoClient nuxeoClient() {
        log.info("Initializing connection to Nuxeo at {}", nuxeoUrl);
        try {
            return new NuxeoClient.Builder()
                    .url(nuxeoUrl)
                    .authentication(nuxeoUsername, nuxeoPassword)
                    .schemas("*")
                    .connect();
        } catch (Exception e) {
            log.error("Failed to connect to Nuxeo", e);
            throw new NuxeoConnectionException("There was an error when connecting to Nuxeo", e);
        }
    }
}
