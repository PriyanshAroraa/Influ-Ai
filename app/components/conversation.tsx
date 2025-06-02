"use client"

import { useConversation } from "@elevenlabs/react"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button" // Assuming shadcn/ui Button

interface ConversationProps {
  onClose: () => void
}

export function Conversation({ onClose }: ConversationProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [signedUrl, setSignedUrl] = useState<string | null>(null) // This state is not strictly needed for useConversation but kept for consistency with original prompt

  const conversation = useConversation({
    onConnect: () => console.log("Connected "),
    onDisconnect: () => console.log("Disconnected "),
    onMessage: (msg) => {
      if (msg.transcript) {
        console.log("[Transcript]", msg.transcript)
      }
      if (msg.response?.text) {
        console.log("[AI Text]", msg.response.text)
      }
    },
    onError: (err) => {
      console.error(" Conversation Error:", err)
      setErrorMsg(`Conversation error: ${err.message || "Unknown error"}`)
    },
    onModeChange: (mode) => console.log("Mode:", mode.mode === "speaking" ? "speaking" : "listening"),
  })

  // Fetch a fresh signed URL from our API route
  const getSignedUrl = useCallback(async () => {
    try {
      const resp = await fetch("/api/get-signed-url")
      if (!resp.ok) {
        const errorText = await resp.text()
        throw new Error(`API error: ${resp.statusText} - ${errorText}`)
      }
      const { signedUrl } = await resp.json()
      return signedUrl as string
    } catch (err: any) {
      console.error(err)
      setErrorMsg("Could not get signed URL")
      return null
    }
  }, [])

  const startConversation = useCallback(async () => {
    setErrorMsg(null)
    try {
      // Request mic permission first
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get a fresh signed URL
      const url = await getSignedUrl()
      if (!url) return

      setSignedUrl(url) // Update state, though not directly used by conversation.startSession

      // Start the voice session using the signed URL
      await conversation.startSession({ signedUrl: url })
    } catch (err: any) {
      console.error(err)
      setErrorMsg("Failed to start conversation: " + (err.message || "Unknown error"))
    }
  }, [conversation, getSignedUrl])

  const stopConversation = useCallback(async () => {
    if (conversation) {
      await conversation.endSession()
    }
  }, [conversation])

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h3 className="text-xl font-semibold">AI Conversation Negotiator</h3>
      <div className="flex gap-2">
        <Button onClick={startConversation} disabled={conversation.status === "connected"}>
          Start Conversation
        </Button>
        <Button onClick={stopConversation} disabled={conversation.status !== "connected"} variant="destructive">
          Stop Conversation
        </Button>
      </div>

      <div className="mt-4 text-lg text-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? "speaking" : "listening"}</p>
      </div>

      {errorMsg && <p className="mt-2 text-red-500 text-center">{errorMsg}</p>}
      <Button onClick={onClose} variant="outline" className="mt-4">
        Close
      </Button>
    </div>
  )
}
