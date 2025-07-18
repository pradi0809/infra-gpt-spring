package com.samshodan.infragpt.controller;

import com.samshodan.infragpt.model.ExplainRequest;
import com.samshodan.infragpt.service.ExplainerService;
import com.samshodan.infragpt.parser.KubernetesParser;
import com.samshodan.infragpt.parser.TerraformParser;
import com.samshodan.infragpt.parser.ServerlessParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExplainerController {
    private final ExplainerService explainerService;

    public ExplainerController(ExplainerService explainerService) {
        this.explainerService = explainerService;
    }

    @PostMapping("/explain")
    public ResponseEntity<String> explain(@RequestBody ExplainRequest request) {
        String content = request.getContent();
        String promptType = request.getPromptType();
        String type = KubernetesParser.detect(content);
        if (type == null) type = TerraformParser.detect(content);
        if (type == null) type = ServerlessParser.detect(content);
        if (type == null) type = "generic";
        String response = explainerService.respond(type, content, promptType);
        return ResponseEntity.ok(response);
    }
}
