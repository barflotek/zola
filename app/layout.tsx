import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AgentProvider } from "@/lib/agent-store/provider"
import { ChatsProvider } from "@/lib/chat-store/chats/provider"
import { ChatSessionProvider } from "@/lib/chat-store/session/provider"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/config"
import { UserPreferencesProvider } from "@/lib/user-preference-store/provider"
import { UserProvider } from "@/lib/user-store/provider"
import { ThemeProvider } from "next-themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Create a default user profile for development
  const defaultUser = {
    id: 'default-user',
    email: 'user@example.com',
    display_name: 'Default User',
    profile_image: '',
    role: 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    anonymous: false,
    daily_message_count: 0,
    daily_reset: new Date().toISOString(),
    message_count: 0,
    onboarding_completed: true,
    system_prompt: null,
    tools_enabled: true,
    updated_by: 'default-user',
    preferred_model: null,
    premium: false,
    last_active_at: new Date().toISOString(),
    daily_pro_message_count: 0,
    daily_pro_reset: new Date().toISOString()
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider initialUser={defaultUser}>
            <UserPreferencesProvider>
              <ChatsProvider>
                <ChatSessionProvider>
                  <AgentProvider userId={defaultUser.id}>
                    <SidebarProvider>
                      <TooltipProvider>
                        {children}
                        <Toaster position="bottom-right" />
                      </TooltipProvider>
                    </SidebarProvider>
                  </AgentProvider>
                </ChatSessionProvider>
              </ChatsProvider>
            </UserPreferencesProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
