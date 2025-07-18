package com.samshodan.infragpt.parser;

public class TerraformParser {
    public static String detect(String content) {
        if (content.contains("resource") || content.contains("provider")) {
            return "Terraform";
        }
        return null;
    }
}
