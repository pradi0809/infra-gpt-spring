// app/chat/ChatBox.tsx
'use client'
import { useState } from 'react'

export function ChatBox({ onSend }: { onSend: (msg: string) => void }) {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex items-center border-t p-2 bg-white">
      <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 resize-none border rounded p-2 mr-2"
      />
            <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Send
            </button>
        </div>
    )
}
