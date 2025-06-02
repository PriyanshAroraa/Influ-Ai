"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { ChatMessage } from "@/components/minimized-chat-bubble"

interface MinimizedMail {
  influencerName: string
  influencerAvatar: string
  prompt: string
  messages: ChatMessage[]
  status: "sent" | "delivered" | "read" | "replied"
}

interface MinimizedCall {
  influencerName: string
  influencerAvatar: string
  prompt: string
  duration: string
  status: "in-progress" | "completed"
}

interface NotificationContextType {
  activeMail: MinimizedMail | null
  activeCall: MinimizedCall | null
  minimizeMail: (mail: MinimizedMail) => void
  minimizeCall: (call: MinimizedCall) => void
  closeMail: () => void
  closeCall: () => void
  updateMailMessages: (messages: ChatMessage[]) => void
  updateCallStatus: (status: "in-progress" | "completed", duration?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [activeMail, setActiveMail] = useState<MinimizedMail | null>(null)
  const [activeCall, setActiveCall] = useState<MinimizedCall | null>(null)

  const minimizeMail = useCallback((mail: MinimizedMail) => {
    setActiveMail(mail)
  }, [])

  const minimizeCall = useCallback((call: MinimizedCall) => {
    setActiveCall(call)
  }, [])

  const closeMail = useCallback(() => {
    setActiveMail(null)
  }, [])

  const closeCall = useCallback(() => {
    setActiveCall(null)
  }, [])

  const updateMailMessages = useCallback((messages: ChatMessage[]) => {
    setActiveMail((prev) => (prev ? { ...prev, messages } : null))
  }, [])

  const updateCallStatus = useCallback((status: "in-progress" | "completed", duration?: string) => {
    setActiveCall((prev) => (prev ? { ...prev, status, duration: duration || prev.duration } : null))
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        activeMail,
        activeCall,
        minimizeMail,
        minimizeCall,
        closeMail,
        closeCall,
        updateMailMessages,
        updateCallStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
