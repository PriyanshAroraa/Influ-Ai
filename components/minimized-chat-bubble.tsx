"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChatMessage } from "@/components/chat-ball" // Re-import ChatMessage type

interface MinimizedChatBubbleProps {
  type: "mail" | "call"
  influencerName: string
  influencerAvatar: string
  isActive: boolean
  onMaximize: () => void
  onClose: () => void
  messages: ChatMessage[]
  status: "sent" | "delivered" | "read" | "replied"
}

export function MinimizedChatBubble({
  influencerName,
  influencerAvatar,
  isActive,
  onMaximize,
  onClose,
  messages,
  status,
}: MinimizedChatBubbleProps) {
  const unreadCount = messages.filter((msg) => !msg.read && msg.sender === "influencer").length

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center cursor-grab relative"
          onClick={onMaximize} // Click to maximize
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: `linear-gradient(135deg, rgba(106, 141, 255, 0.9), rgba(148, 47, 255, 0.9))`,
          }}
        >
          {/* Influencer avatar in background */}
          <div
            className="absolute inset-2 rounded-full bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url(${influencerAvatar || "/placeholder.svg"})`,
            }}
          />

          {/* Mail icon overlay */}
          <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Mail className="h-4 w-4 text-white" />
          </div>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
            >
              <span className="text-white text-xs font-bold">{unreadCount}</span>
            </motion.div>
          )}

          {/* Floating animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
          />

          {/* Pulsing ring when there are unread messages */}
          {unreadCount > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation() // Prevent maximizing when clicking close
              onClose()
            }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-800/80 text-white hover:bg-gray-700/80 z-20"
          >
            <X className="h-3 w-3" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
