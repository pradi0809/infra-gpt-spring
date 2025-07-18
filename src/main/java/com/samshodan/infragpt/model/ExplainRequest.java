package com.samshodan.infragpt.model;

public class ExplainRequest {
    private String content;
    private String promptType = "explain";

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getPromptType() { return promptType; }
    public void setPromptType(String promptType) { this.promptType = promptType; }
}
