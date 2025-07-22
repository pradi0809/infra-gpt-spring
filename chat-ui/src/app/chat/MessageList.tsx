// app/chat/MessageList.tsx
import { Message } from './useChat'
import { MessageBubble } from './Message'

export function MessageList({ messages }: { messages: Message[] }) {
    return (
        <div className="space-y-4">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
        </div>
    )
}
