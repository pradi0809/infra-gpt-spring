FROM ollama/ollama:latest

# Create a directory for our scripts
RUN mkdir -p /usr/local/bin

# Create a script to pull mistral model on first run
RUN cat > /usr/local/bin/init-mistral.sh << 'EOF'
#!/bin/bash
set -e

# Start ollama server in background
ollama serve &
OLLAMA_PID=$!

# Wait for ollama to be ready
echo "Waiting for Ollama server to start..."
while ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; do
    sleep 1
done

echo "Ollama server is ready. Pulling Mistral model..."

# Pull mistral model
ollama pull mistral

echo "Mistral model pulled successfully!"

# Keep the server running
wait $OLLAMA_PID
EOF

# Make the script executable
RUN chmod +x /usr/local/bin/init-mistral.sh

# Expose the ollama port
EXPOSE 11434

# Use our init script as the entrypoint
ENTRYPOINT ["/usr/local/bin/init-mistral.sh"]