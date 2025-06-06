import { Message } from 'ai'

export interface WindsurfChatRequest {
  messages: Message[]
  chatId: string
  userId: string
  systemPrompt?: string
}

export interface WindsurfChatResponse {
  message: string
  error?: string
}

export class WindsurfClient {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = process.env.WINDSURF_API_URL || 'http://localhost:8000'
    this.apiKey = process.env.WINDSURF_API_KEY || ''
  }

  async chat(params: WindsurfChatRequest): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        messages: params.messages,
        chat_id: params.chatId,
        user_id: params.userId,
        system_prompt: params.systemPrompt
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response
  }

  async streamChat(params: WindsurfChatRequest): Promise<ReadableStream> {
    const response = await this.chat(params)
    return response.body as ReadableStream
  }
}
