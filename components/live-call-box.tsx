"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNotifications } from "@/context/notification-context"
import { MinimizedCallNotification } from "./minimized-call-notification"

export function LiveCallBox() {
  const { activeCall, closeCall } = useNotifications()

  const handleMaximize = () => {
    closeCall()
  }

  if (!activeCall) return null

  return (
    <AnimatePresence>
      {activeCall && (
        <motion.div
          className="fixed z-[100] top-4 right-4" // Initial fixed position
          initial={{ opacity: 0, scale: 0.3, x: 100, y: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} // Snaps back to x:0, y:0 relative to fixed position
          exit={{ opacity: 0, scale: 0.3, x: 100, y: -100 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.6,
          }}
          drag // Enable dragging
          dragConstraints={{ left: 0, right: window.innerWidth - 280, top: 0, bottom: window.innerHeight - 120 }} // Constrain to viewport
          dragElastic={0.2} // Slight bounce
        >
          <MinimizedCallNotification
            influencerName={activeCall.influencerName}
            influencerAvatar={activeCall.influencerAvatar}
            isActive={true}
            onMaximize={handleMaximize}
            onClose={closeCall}
            duration={activeCall.duration}
            status={activeCall.status}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
