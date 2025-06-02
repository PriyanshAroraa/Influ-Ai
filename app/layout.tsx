import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NotificationProvider } from "@/context/notification-context"
import { CampaignCreationProvider } from "@/context/campaign-creation-context"
import CreateCampaignDialog from "@/components/create-campaign-dialog"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { ChatBall } from "@/components/chat-ball"
import { LiveCallBox } from "@/components/live-call-box"
import { FloatingAiButton } from "@/components/floating-ai-button" // Import the new component

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NotificationProvider>
            <CampaignCreationProvider>
              {children}
              <ChatBall />
              <LiveCallBox />
              <FloatingActionButtons />
              <CreateCampaignDialog />
              <FloatingAiButton /> {/* Render the new floating AI button */}
            </CampaignCreationProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
