# Infra-GPT Spring

A Spring Boot application that uses AI to explain and generate infrastructure code (Kubernetes, Terraform, Serverless).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Infra-GPT Spring is a web service that leverages the Ollama AI model to:
1. Explain infrastructure code in plain English
2. Generate infrastructure code based on requirements
3. Suggest best practices and improvements

The application can detect and work with:
- Kubernetes configurations
- Terraform scripts
- Serverless Framework configurations

## Prerequisites

- Java 17 or higher
- Maven
- Docker and Docker Compose (for running Ollama)

## Setup Instructions

### 1. Clone the repository

```
git clone <repository-url>
cd infra-gpt-spring
```

### 2. Start the Ollama service with Docker Compose

```
docker-compose up -d
```

This will:
- Build a Docker image with Ollama
- Pull the Mistral model automatically
- Start the Ollama service on port 11434

### 3. Build the Spring Boot application

```
mvn clean package
```

### 4. Run the application

```
java -jar target/infra-gpt-spring-0.0.1-SNAPSHOT.jar
```

The application will start on port 8080 by default.

## API Usage

### Explain Infrastructure Code

```
POST /api/explain
Content-Type: application/json

{
  "content": "your-infrastructure-code-here",
  "promptType": "explain"
}
```

### Generate Infrastructure Code

```
POST /api/explain
Content-Type: application/json

{
  "content": "your-requirements-here",
  "promptType": "code"
}
```

## Configuration

The application is configured to connect to Ollama running on localhost:11434 using the Mistral model.
You can modify these settings in `src/main/resources/application.yml`.

## GPU Acceleration (Optional)

If you have an NVIDIA GPU, you can enable GPU acceleration by uncommenting the relevant section in the `docker-compose.yaml` file.

## Project Structure

- `controller/`: REST API endpoints
- `model/`: Data models for requests/responses
- `parser/`: Logic to detect infrastructure code types
- `service/`: Business logic for AI interactions

## Notes

- The application automatically detects the type of infrastructure code provided
- For unrecognized formats, it falls back to "generic" type
- The Ollama service needs time to download the Mistral model on first run

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.