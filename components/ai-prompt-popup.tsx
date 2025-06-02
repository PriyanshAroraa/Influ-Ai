"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Send, Sparkles } from "lucide-react"
import { AiCallSimulation } from "@/components/ai-call-simulation"
import { AiMailAnimation } from "@/components/ai-mail-animation"
import { useNotifications } from "@/context/notification-context" // Import the hook

interface AiPromptPopupProps {
  isVisible: boolean
  onClose: () => void
  type: "call" | "mail"
  influencerName: string
  influencerCategory: string // Add this prop
  buttonRef: React.RefObject<HTMLButtonElement>
}

export function AiPromptPopup({
  isVisible,
  onClose,
  type,
  influencerName,
  influencerCategory,
  buttonRef,
}: AiPromptPopupProps) {
  const [prompt, setPrompt] = useState("")
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [showCallSimulation, setShowCallSimulation] = useState(false)
  const [showMailAnimation, setShowMailAnimation] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const { minimizeMail, minimizeCall, closeMail, closeCall } = useNotifications() // Use the context hook

  const placeholders = {
    call: [
      "2 reels for $50k budget",
      "Story posts for product launch",
      "Long-term brand partnership discussion",
      "Exclusive collaboration for 6 months",
      "Event coverage and live streaming",
    ],
    mail: [
      "3 Instagram posts + 5 stories for $25k",
      "Product review video for new launch",
      "Brand ambassador role negotiation",
      "Sponsored content package deal",
      "Cross-platform promotion campaign",
    ],
  }

  const getRandomPlaceholder = () => {
    const options = placeholders[type]
    return options[Math.floor(Math.random() * options.length)]
  }

  const [currentPlaceholder, setCurrentPlaceholder] = useState(getRandomPlaceholder())

  useEffect(() => {
    if (isVisible && buttonRef.current && popupRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const popupRect = popupRef.current.getBoundingClientRect()

      // Calculate initial position above the button
      let newTop = buttonRect.top - popupRect.height - 20
      let newLeft = buttonRect.left + buttonRect.width / 2 - popupRect.width / 2

      // Adjust if it goes off-screen (top)
      if (newTop < 10) {
        // 10px margin from top
        newTop = buttonRect.bottom + 20 // Position below the button
      }

      // Adjust if it goes off-screen (left/right)
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      if (newLeft < 10) {
        // 10px margin from left
        newLeft = 10
      } else if (newLeft + popupRect.width > screenWidth - 10) {
        // 10px margin from right
        newLeft = screenWidth - popupRect.width - 10
      }

      // Ensure it doesn't go off the bottom if positioned below
      if (newTop + popupRect.height > screenHeight - 10) {
        newTop = screenHeight - popupRect.height - 10
      }

      setPosition({ top: newTop, left: newLeft })
    }
  }, [isVisible, buttonRef])

  useEffect(() => {
    if (isVisible) {
      setCurrentPlaceholder(getRandomPlaceholder())
    }
  }, [isVisible, type])

  const handleSend = () => {
    if (prompt.trim()) {
      if (type === "call") {
        setShowCallSimulation(true)
      } else {
        setShowMailAnimation(true)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Call handlers
  const handleCloseCallSimulation = () => {
    setShowCallSimulation(false)
    onClose()
    setPrompt("")
    closeCall() // Ensure global state is cleared if simulation is closed
  }

  const handleMinimizeCallSimulation = () => {
    setShowCallSimulation(false)
    minimizeCall({
      // Use context to minimize call
      influencerName,
      influencerAvatar: "/placeholder.svg?height=100&width=100",
      prompt,
      duration: "00:00", // Initial duration
      status: "in-progress",
    })
    setTimeout(() => {
      onClose()
      setPrompt("")
    }, 100)
  }

  const handleMaximizeCall = () => {
    closeCall() // Close minimized call when maximizing
    setShowCallSimulation(true)
  }

  // Mail handlers
  const handleCloseMailAnimation = () => {
    setShowMailAnimation(false)
    onClose()
    setPrompt("")
    closeMail() // Ensure global state is cleared if animation is closed
  }

  const handleMinimizeMailAnimation = () => {
    setShowMailAnimation(false)
    minimizeMail({
      // Use context to minimize mail
      influencerName,
      influencerAvatar: "/placeholder.svg?height=100&width=100",
      prompt,
      messages: [], // Initial empty messages
      status: "sent",
    })
    setTimeout(() => {
      onClose()
      setPrompt("")
    }, 100)
  }

  const handleMaximizeMail = () => {
    closeMail() // Close minimized mail when maximizing
    setShowMailAnimation(true)
  }

  return (
    <>
      {/* Backdrop */}
      {isVisible && <div className="fixed inset-0 z-40" onClick={onClose} />}

      {/* Popup */}
      {isVisible && (
        <div
          ref={popupRef}
          className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm w-80 transition-all duration-300 transform"
          style={{
            top: position.top,
            left: position.left,
            transform: isVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(10px)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  type === "call"
                    ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF]"
                    : "bg-gradient-to-r from-[#6A8DFF] to-[#942FFF]"
                }`}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  AI {type === "call" ? "Call" : "Email"} to {influencerName}
                </h3>
                <p className="text-xs text-gray-500">{type === "call" ? "Voice negotiation" : "Email negotiation"}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentPlaceholder}
              className="min-h-[80px] resize-none border-gray-200 focus:border-[#5A31F4] focus:ring-[#5A31F4]/20"
              autoFocus
            />

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2">
              {placeholders[type].slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-500">
                {type === "call" ? "AI will call and negotiate" : "AI will send professional email"}
              </p>
              <Button
                onClick={handleSend}
                disabled={!prompt.trim()}
                className={`px-4 py-2 text-sm ${
                  type === "call"
                    ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF]"
                    : "bg-gradient-to-r from-[#6A8DFF] to-[#942FFF]"
                } hover:opacity-90 disabled:opacity-50`}
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Call Simulation */}
      {showCallSimulation && (
        <AiCallSimulation
          isVisible={showCallSimulation}
          onClose={handleCloseCallSimulation}
          onMinimize={handleMinimizeCallSimulation}
          prompt={prompt}
          influencerName={influencerName}
          influencerCategory={influencerCategory} // Pass influencerCategory
          influencerAvatar="/placeholder.svg?height=100&width=100"
        />
      )}

      {/* AI Mail Animation */}
      {showMailAnimation && (
        <AiMailAnimation
          isVisible={showMailAnimation}
          onClose={handleCloseMailAnimation}
          onMinimize={handleMinimizeMailAnimation}
          prompt={prompt}
          influencerName={influencerName}
          influencerAvatar="/placeholder.svg?height=100&width=100"
          influencerCategory={influencerCategory} // Pass influencerCategory
        />
      )}
    </>
  )
}
