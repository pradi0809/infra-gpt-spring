package com.samshodan.infragpt.parser;

import org.yaml.snakeyaml.Yaml;
import java.util.Map;

public class ServerlessParser {
    public static String detect(String content) {
        try {
            Map<String, Object> parsed = new Yaml().load(content);
            if (parsed != null && parsed.containsKey("functions")) {
                return "Serverless Framework";
            }
        } catch (Exception ignored) {}
        return null;
    }
}
