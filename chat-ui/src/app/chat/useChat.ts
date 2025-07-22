// app/chat/useChat.ts
"use client"
import { useState, useEffect, useRef } from 'react'

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const abortRef = useRef<AbortController | null>(null)

    const sendMessage = async (content: string) => {
        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
        }

        setMessages((prev) => [...prev, userMessage])

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: '',
        }
        setMessages((prev) => [...prev, assistantMessage])

        // Example: Streaming response from internal API using fetch + SSE
        const controller = new AbortController()
        abortRef.current = controller

        const response = await fetch('http://localhost:8080/api/explain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: content, promptType: "code"}),
            signal: controller.signal,
        })

        if (!response.body) return

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            assistantMessage.content += chunk
            setMessages((prev) =>
                prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: assistantMessage.content } : m))
            )
        }
    }

    return { messages, sendMessage }
}
