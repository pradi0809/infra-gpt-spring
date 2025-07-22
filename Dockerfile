FROM ollama/ollama:latest

RUN mkdir -p /usr/local/bin

RUN <<EOF
cat > /usr/local/bin/init-mistral.sh << 'SCRIPT_EOF'
#!/bin/bash
set -e

echo "Starting ollama serve in background..."
ollama serve &
# We don't need OLLAMA_PID anymore if we use `wait` without arguments
# OLLAMA_PID=\$! # Remove or comment this line

echo "Waiting for Ollama server to be ready at http://localhost:11434..."
TIMEOUT=60 # seconds
ELAPSED=0
while ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; do
    if [ \$ELAPSED -ge \$TIMEOUT ]; then
        echo "Error: Ollama server did not become ready within \$TIMEOUT seconds."
        exit 1
    fi
    sleep 1
    ELAPSED=\\$((ELAPSED + 1))
    echo -n "." # Print a dot to show progress
done
echo "\nOllama server is ready."

echo "Attempting to pull Mistral model..."
if ollama pull mistral; then
    echo "Mistral model pulled successfully!"
else
    echo "Error: Failed to pull Mistral model."
    exit 1 # Exit if pull fails, as the main purpose isn't met
fi

echo "Keeping Ollama server running (waiting for all background jobs)..."
# Use 'wait' without arguments to wait for all child processes to complete
wait
SCRIPT_EOF
EOF

RUN chmod +x /usr/local/bin/init-mistral.sh

EXPOSE 11434

ENTRYPOINT ["/usr/local/bin/init-mistral.sh"]