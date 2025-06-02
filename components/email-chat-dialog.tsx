"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"

interface EmailChatDialogProps {
  onClose: () => void
  initialUserPrompt?: string
  influencerName?: string
  dealDetails?: string[]
  influencerData?: Record<string, any>
}

export function EmailChatDialog({
  onClose,
  initialUserPrompt,
  influencerName = "Influencer",
  dealDetails,
  influencerData = {},
}: EmailChatDialogProps) {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: "sent" | "received"; content: string; timestamp: string }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const [isInitialEmailExpanded, setIsInitialEmailExpanded] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null) // State for conversation ID

  const NEGOTIATION_API_URL = process.env.NEXT_PUBLIC_INFLUENCER_NEGOTIATION_API_URL

  // Function to call the negotiation API
  const callNegotiationApi = useCallback(
    async (
      prompt: string, // This is the latest user message text
      isInitialCall: boolean,
      currentConversationId: string | null,
    ) => {
      setIsLoading(true)
      setError(null)
      try {
        let apiUrl: string
        let requestBody: any

        // Ensure influencerData and dealDetails are always present, even if empty
        const influencerDataToSend = {
          name: influencerName,
          ...influencerData,
          dealDetails: dealDetails || [], // Ensure dealDetails is an array
        }

        if (isInitialCall) {
          apiUrl = `${NEGOTIATION_API_URL}/negotiate`
          requestBody = {
            userPrompt: prompt, // Initial prompt text
            influencerData: influencerDataToSend,
          }
          console.log("Calling initial negotiation API with URL:", apiUrl, "and method: POST")
        } else {
          apiUrl = `${NEGOTIATION_API_URL}/negotiate-conversation`
          requestBody = {
            conversationId: currentConversationId, // Use the ID passed in
            userMessage: prompt, // The latest user message text
            influencerData: influencerDataToSend, // Always send influencer data
            // IMPORTANT: We no longer send 'messages' array here, backend manages history
          }
          console.log("Calling follow-up negotiation API with URL:", apiUrl, "and method: POST")
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Added Accept header
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `API error: ${response.statusText}`)
        }

        const data = await response.json()

        if (isInitialCall) {
          setConversationId(data.conversationId) // Store conversation ID from initial response
          return data.body as string // Return the AI's generated body for initial email
        } else {
          return data.response as string // Return the AI's response for follow-up
        }
      } catch (err: any) {
        console.error("Negotiation API error:", err)
        setError(err.message || "Failed to get AI response.")
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [NEGOTIATION_API_URL, influencerName, influencerData, dealDetails],
  )

  // Fetch initial email when component mounts, only if chatHistory is empty
  useEffect(() => {
    const fetchInitialEmail = async () => {
      if (initialUserPrompt && chatHistory.length === 0) {
        let currentId = conversationId
        if (!currentId) {
          currentId = crypto.randomUUID() // Generate a new UUID if not already set
          setConversationId(currentId)
        }

        const aiResponse = await callNegotiationApi(initialUserPrompt, true, currentId)
        if (aiResponse) {
          setChatHistory([
            {
              type: "sent",
              content: aiResponse,
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
        }
      }
    }
    fetchInitialEmail()
  }, [initialUserPrompt, callNegotiationApi, chatHistory.length, conversationId])

  // Scroll to bottom of chat history on new message or history update
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [chatHistory, isLoading])

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim()
      // Add user's message to history immediately
      const updatedChatHistory = [
        ...chatHistory,
        { type: "received", content: userMessage, timestamp: new Date().toLocaleTimeString() },
      ]
      setChatHistory(updatedChatHistory)
      setMessage("")

      let idForFollowUp = conversationId
      if (!idForFollowUp) {
        // Fallback: if initial call failed and conversationId wasn't set, generate one
        idForFollowUp = crypto.randomUUID()
        setConversationId(idForFollowUp)
      }

      // For follow-up calls, `userMessage` is the latest prompt.
      // The backend now manages the full history.
      const aiResponse = await callNegotiationApi(userMessage, false, idForFollowUp)
      if (aiResponse) {
        setChatHistory((prev) => [
          ...prev,
          { type: "sent", content: aiResponse, timestamp: new Date().toLocaleTimeString() },
        ])
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const initialEmailContentToDisplay = chatHistory[0]?.content || "No initial email content."
  const showExpandButton =
    initialEmailContentToDisplay.split("\n").length > 3 || initialEmailContentToDisplay.length > 200

  return (
    <div className="flex flex-col h-[650px] max-h-[90vh] w-full bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="font-semibold text-lg">Email Chat with {influencerName}</h3>
      </div>

      {/* Deal Details Section */}
      {dealDetails && dealDetails.length > 0 && (
        <div className="bg-gray-800 px-3 py-1.5 border-b border-gray-700 text-xs text-gray-300">
          <h4 className="font-semibold text-white mb-0.5">Deal Details:</h4>
          <ul className="list-disc list-inside space-y-0.5">
            {dealDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content Area: Chat History */}
      <div ref={chatHistoryRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.type === "sent" ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white" : "bg-gray-700"
              } text-gray-200`}
            >
              <p className={`whitespace-pre-wrap ${index === 0 && !isInitialEmailExpanded ? "line-clamp-3" : ""}`}>
                {msg.content}
              </p>
              {index === 0 && showExpandButton && (
                <Button
                  variant="link"
                  onClick={() => setIsInitialEmailExpanded(!isInitialEmailExpanded)}
                  className="text-purple-400 hover:text-purple-300 text-xs p-0 h-auto mt-1"
                >
                  {isInitialEmailExpanded ? "Show Less" : "Read More"}
                </Button>
              )}
              <span className={`text-xs mt-1 block ${msg.type === "sent" ? "text-gray-200" : "text-gray-400"}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-gray-200 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI is typing...</span>
            </div>
          </div>
        )}
        {error && <div className="text-red-500 text-sm p-2 bg-red-900/20 rounded-md">Error: {error}</div>}
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-900">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your response..."
          className="flex-1 min-h-[80px] max-h-[150px] resize-y bg-gray-800 text-white border-gray-700 placeholder:text-gray-500"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
          className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:from-[#4A21E4] hover:to-[#841FEF]"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
