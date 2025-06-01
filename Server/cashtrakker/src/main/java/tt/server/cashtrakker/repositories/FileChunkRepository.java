package tt.server.cashtrakker.repositories;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;
import tt.server.cashtrakker.model.FileChunk;

import java.util.concurrent.TimeUnit;

@Service
public class FileChunkRepository {

    private static final Logger log = LoggerFactory.getLogger(FileChunkRepository.class);
    private final RedisTemplate<String, FileChunk> redisFileTemplate;

    public FileChunkRepository(RedisTemplate<String, FileChunk> redisFileTemplate) {
        this.redisFileTemplate = redisFileTemplate;
    }

    public void save(String key, FileChunk fileChunk) {
        if (key == null) {
            log.error("Tried to save fileChunk that had no key set");
            return;
        }

        redisFileTemplate.opsForSet().add(key, fileChunk);
        redisFileTemplate.expire(key, 10, TimeUnit.MINUTES);
    }

    public FileChunk getByKey(String key) {
        return redisFileTemplate.opsForValue().get(key);
    }

    public int getSavedFileChunksNumberByMatchingKey(String key) {
        int count = 0;
        try (var chunks = redisFileTemplate.execute((RedisCallback<Cursor<byte[]>>) connection ->
                connection.scan(ScanOptions.scanOptions().match(key + "*").build()))) {

            if (chunks == null) {
                return count;
            }

            while (chunks.hasNext()) {
                chunks.next();
                count++;
            }
        } catch (RuntimeException e) {
            throw e;
        }
        return count;
    }
}
