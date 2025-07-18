package com.samshodan.infragpt.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ExplainerService {
    private final ChatClient chatClient;

    public ExplainerService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String respond(String type, String content, String promptType) {
        String prompt;
        if ("code".equalsIgnoreCase(promptType)) {
            prompt = String.format("""
            You are a software development expert. Write a well-commented %s code and configuration for the following requirement:

            %s

            Explain any assumptions you made in comments.
        """, type, content);
        } else {
            prompt = String.format("""
            You are a senior DevOps engineer. Explain this %s configuration in plain English:

            ---
            %s
            ---

            Then suggest 2–3 best practices or improvements.
        """, type, content);
        }

        return chatClient.prompt(prompt).call().content();
    }
}
