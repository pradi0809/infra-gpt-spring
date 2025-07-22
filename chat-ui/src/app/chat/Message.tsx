// app/chat/Message.tsx
import { Message } from './useChat'
import ReactMarkdown from 'react-markdown'

export function MessageBubble({ message }: { message: Message }) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xl rounded px-4 py-2 ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
                }`}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    )
}
