// app/chat/page.tsx
"use client"
// @ts-ignore
import { ChatBox } from './ChatBox'
// @ts-ignore
import { MessageList } from './MessageList'
import { useChat } from './useChat'

export default function ChatPage() {
    const { messages, sendMessage } = useChat()

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow">
                <MessageList messages={messages} />
            </div>
            <ChatBox onSend={sendMessage} />
        </div>
    )
}
