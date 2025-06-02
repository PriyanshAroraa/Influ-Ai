"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, X, Maximize2, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ChatMessage {
  id: string
  text: string
  sender: "ai" | "influencer"
  timestamp: Date
  read: boolean
}

interface FloatingMailBubbleProps {
  influencerName: string
  influencerAvatar: string
  isActive: boolean
  onMaximize: () => void
  onClose: () => void
  messages?: ChatMessage[]
  status?: "sent" | "delivered" | "read" | "replied"
}

export function FloatingMailBubble({
  influencerName,
  influencerAvatar,
  isActive,
  onMaximize,
  onClose,
  messages = [],
  status = "sent",
}: FloatingMailBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = messages.filter((msg) => !msg.read && msg.sender === "influencer").length
    setUnreadCount(count)
  }, [messages])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const getStatusIcon = () => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <Check className="h-3 w-3 text-gray-400" />
      case "read":
        return <Check className="h-3 w-3 text-blue-400" />
      case "replied":
        return <Mail className="h-3 w-3 text-green-400" />
      default:
        return <Clock className="h-3 w-3 text-gray-400" />
    }
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed z-[100] bottom-20 left-4"
          initial={{ opacity: 0, scale: 0.3, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 100 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.6,
          }}
        >
          {isExpanded ? (
            <motion.div
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ width: 60, height: 60 }}
              animate={{ width: 320, height: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">{influencerName}</h3>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon()}
                      <span className="text-white/80 text-xs">
                        {status === "sent" && "Sent"}
                        {status === "delivered" && "Delivered"}
                        {status === "read" && "Read"}
                        {status === "replied" && "Replied"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpand}
                    className="h-6 w-6 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-6 w-6 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Chat content */}
              <div className="h-[300px] overflow-y-auto p-3 bg-gray-50 flex flex-col space-y-3">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                          message.sender === "ai"
                            ? "bg-gray-200 text-gray-900"
                            : "bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className="text-right">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <Mail className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">Email sent successfully!</p>
                      <p className="text-xs text-gray-400 mt-1">Waiting for response...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <Button
                  onClick={onMaximize}
                  className="w-full bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] hover:opacity-90 text-white"
                >
                  View Full Email
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative ${
                unreadCount > 0 ? "animate-bounce-gentle" : ""
              }`}
              onClick={toggleExpand}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, rgba(106, 141, 255, 0.9), rgba(148, 47, 255, 0.9))`,
              }}
            >
              {/* Influencer avatar in background */}
              <div
                className="absolute inset-1 rounded-full bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: `url(${influencerAvatar || "/placeholder.svg"})`,
                }}
              />

              {/* Mail icon */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="h-3 w-3 text-white" />
              </div>

              {/* Unread badge */}
              {unreadCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </motion.div>
              )}

              {/* Status indicator */}
              <motion.div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  status === "sent"
                    ? "bg-gray-400"
                    : status === "delivered"
                      ? "bg-blue-400"
                      : status === "read"
                        ? "bg-green-400"
                        : status === "replied"
                          ? "bg-green-500"
                          : "bg-gray-400"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />

              {/* Floating animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
