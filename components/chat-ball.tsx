"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNotifications } from "@/context/notification-context"
import { MinimizedChatBubble } from "./minimized-chat-bubble"

export interface ChatMessage {
  id: string
  text: string
  sender: "ai" | "influencer"
  timestamp: Date
  read: boolean
}

export function ChatBall() {
  const { activeMail, closeMail } = useNotifications()

  const handleMaximize = () => {
    closeMail()
  }

  if (!activeMail) return null

  return (
    <AnimatePresence>
      {activeMail && (
        <motion.div
          className="fixed z-[100] bottom-4 left-4" // Initial fixed position
          initial={{ opacity: 0, scale: 0.3, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }} // Snaps back to y:0 relative to fixed position
          exit={{ opacity: 0, scale: 0.3, y: 100 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.6,
          }}
          drag // Enable dragging
          dragConstraints={{ left: 0, right: window.innerWidth - 64, top: 0, bottom: window.innerHeight - 64 }} // Constrain to viewport
          dragElastic={0.2} // Slight bounce
        >
          <MinimizedChatBubble
            type="mail"
            influencerName={activeMail.influencerName}
            influencerAvatar={activeMail.influencerAvatar}
            isActive={true}
            onMaximize={handleMaximize}
            onClose={closeMail}
            messages={activeMail.messages}
            status={activeMail.status}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
