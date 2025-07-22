// app/api/chat/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of `You said: ${prompt}`.split(' ')) {
        controller.enqueue(encoder.encode(word + ' '))
        await new Promise((r) => setTimeout(r, 150)) // Simulate streaming
      }
      controller.close()
    },
  })

  return new NextResponse(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
