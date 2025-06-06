import { Message } from 'ai'
import { WindsurfClient } from '@/lib/api/windsurf-client'

export const maxDuration = 60

type ChatRequest = {
  messages: Message[]
  chatId: string
  userId: string
  systemPrompt?: string
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      chatId,
      userId,
      systemPrompt,
    } = (await req.json()) as ChatRequest

    if (!messages || !chatId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Error, missing information' }),
        { status: 400 }
      )
    }

    // Initialize Windsurf client
    const client = new WindsurfClient()

    // Stream response from Windsurf API
    const stream = await client.streamChat({
      messages,
      chatId,
      userId,
      systemPrompt
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  } catch (error) {
    console.error('Error in chat route:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}
    })
  } catch (err: unknown) {
    console.error("Error in /api/chat:", err)
    // Return a structured error response if the error is a UsageLimitError.
    const error = err as { code?: string; message?: string }
    if (error.code === "DAILY_LIMIT_REACHED") {
      return new Response(
        JSON.stringify({ error: error.message, code: error.code }),
        { status: 403 }
      )
    }

    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500 }
    )
  }
}
