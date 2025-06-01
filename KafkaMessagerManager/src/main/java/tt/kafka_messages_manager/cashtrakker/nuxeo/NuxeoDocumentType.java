package tt.kafka_messages_manager.cashtrakker.nuxeo;

import tt.kafka_messages_manager.cashtrakker.exceptions.UnknownNuxeoDocumentTypeException;

import java.util.List;

public enum NuxeoDocumentType {
    FILE("File"),
    FOLDER("Folder"),
    NOTE("Note"),
    PICTURE("Picture"),
    AUDIO("Audio"),
    VIDEO("Video"),
    WORKSPACE("Workspace"),
    DOMAIN("Domain"),
    COLLECTION("Collection"),
    ARTICLE("Article"),
    ROOT("Root");

    private final String type;

    NuxeoDocumentType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public static boolean canBeTraversed(String type) {
        return List.of(
                ROOT.getType(),
                FOLDER.getType()
        ).contains(type);
    }

    public static NuxeoDocumentType fromString(String text) {
        for (NuxeoDocumentType type : NuxeoDocumentType.values()) {
            if (type.type.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new UnknownNuxeoDocumentTypeException("Could not find nuxeo document type: " + text);
    }
}
