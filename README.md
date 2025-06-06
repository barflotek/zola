# Zola Chat - Windsurf Integration

## Project Overview
Zola is a modern chat interface that integrates with the Windsurf backend API while maintaining Supabase for user management and data persistence.

## Tech Stack
- Frontend: Next.js with TypeScript
- Backend: Windsurf API
- Database: Supabase
- State Management: React Context

## Prerequisites
- Node.js 18+ installed
- Access to Windsurf API
- Access to Supabase project

## Environment Setup
1. Create a `.env.local` file in the project root with:
```env
# Windsurf API Configuration
WINDSURF_API_URL=http://localhost:8000
WINDSURF_API_KEY=your_windsurf_api_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gdgivpczfnzcfviyxxni.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE=your_supabase_service_role_key

# CSRF Protection
CSRF_SECRET=your_32_character_random_string
```

2. Generate a CSRF secret:
```bash
openssl rand -hex 16
```

## Getting Started
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application at http://localhost:3000

## Project Structure
- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/lib` - Utility functions and store providers
  - `/agent-store` - Agent management
  - `/chat-store` - Chat state management
  - `/user-store` - User management with Supabase
  - `/user-preference-store` - User preferences

## Key Components
1. **Providers** (in order of nesting):
   - ThemeProvider
   - UserProvider (Supabase auth)
   - UserPreferencesProvider
   - ChatsProvider
   - ChatSessionProvider
   - AgentProvider
   - SidebarProvider

2. **API Integration**:
   - Chat messages use WindsurfClient
   - User management uses Supabase
   - Agent management uses both Windsurf and Supabase

## Development Notes
1. Always ensure both services are running:
   - Windsurf backend (port 8000)
   - Next.js frontend (port 3000)

2. Key files to check if issues arise:
   - `.env.local` - Environment configuration
   - `app/layout.tsx` - Provider setup
   - `app/api/chat/route.ts` - Chat API endpoint

## Troubleshooting
1. If you see Supabase connection errors:
   - Verify Supabase credentials in `.env.local`
   - Check if Supabase project is accessible

2. If chat doesn't work:
   - Ensure Windsurf API is running
   - Check WindsurfClient configuration
   - Verify user authentication state

3. Common fixes:
   - Clear browser cache and local storage
   - Restart Next.js development server
   - Check browser console for specific errors

## Current Status
- [x] Basic Windsurf integration
- [x] Supabase configuration
- [x] Provider hierarchy setup
- [ ] Complete user authentication flow
- [ ] Agent management integration
- [ ] Chat history persistence

## Next Steps
1. Complete the chat functionality testing
2. Implement proper error handling
3. Add user authentication flow
4. Set up agent management
5. Add chat history persistence

[zola.chat](https://zola.chat)

**Zola** is the open-source interface for AI chat.

[![Chat with this repo](https://zola.chat/button/github.svg)](https://zola.chat/?agent=github/ibelick/zola)

![zola screenshot](./public/cover_zola.webp)

## Features

- Multi-model support: OpenAI, Mistral, Claude, Gemini, **Ollama (local models)**
- File uploads with context-aware answers
- Clean, responsive UI with light/dark themes
- Built with Tailwind, shadcn/ui, and prompt-kit
- Fully open-source and self-hostable
- Customizable: user system prompt, multiple layout options
- **Local AI with Ollama**: Run models locally with automatic model detection

## Agent Features (WIP)

- `@agent` mentions
- Early tool and MCP integration for agent workflows
- Foundation for more powerful, customizable agents (more coming soon)

## Quick Start

### Option 1: With OpenAI (Cloud)

```bash
git clone https://github.com/ibelick/zola.git
cd zola
npm install
echo "OPENAI_API_KEY=your-key" > .env.local
npm run dev
```

### Option 2: With Ollama (Local)

```bash
# Install and start Ollama
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2  # or any model you prefer

# Clone and run Zola
git clone https://github.com/ibelick/zola.git
cd zola
npm install
npm run dev
```

Zola will automatically detect your local Ollama models!

### Option 3: Docker with Ollama

```bash
git clone https://github.com/ibelick/zola.git
cd zola
docker-compose -f docker-compose.ollama.yml up
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ibelick/zola)

To unlock features like auth, file uploads, and agents, see [INSTALL.md](./INSTALL.md).

## Built with

- [prompt-kit](https://prompt-kit.com/) — AI components
- [shadcn/ui](https://ui.shadcn.com) — core components
- [motion-primitives](https://motion-primitives.com) — animated components
- [vercel ai sdk](https://vercel.com/blog/introducing-the-vercel-ai-sdk) — model integration, AI features
- [supabase](https://supabase.com) — auth and storage

## Sponsors

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

## License

Apache License 2.0

## Notes

This is a beta release. The codebase is evolving and may change.
