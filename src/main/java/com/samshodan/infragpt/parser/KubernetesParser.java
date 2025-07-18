package com.samshodan.infragpt.parser;

import org.yaml.snakeyaml.Yaml;
import java.util.Map;

public class KubernetesParser {
    public static String detect(String content) {
        try {
            Map<String, Object> parsed = new Yaml().load(content);
            if (parsed != null && parsed.containsKey("apiVersion")) {
                return "Kubernetes";
            }
        } catch (Exception ignored) {}
        return null;
    }
}
