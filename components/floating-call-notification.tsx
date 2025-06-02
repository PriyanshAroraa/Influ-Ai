"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingCallNotificationProps {
  influencerName: string
  influencerAvatar: string
  isActive: boolean
  onMaximize: () => void
  onClose: () => void
  duration?: string
  status?: "in-progress" | "completed"
}

export function FloatingCallNotification({
  influencerName,
  influencerAvatar,
  isActive,
  onMaximize,
  onClose,
  duration = "05:23",
  status = "completed",
}: FloatingCallNotificationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed z-[100] top-20 right-4"
          initial={{ opacity: 0, scale: 0.3, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.3, x: 100 }}
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
              animate={{ width: 280, height: "auto" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">{influencerName}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-white/80 text-xs">
                        {status === "in-progress" ? (
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                            Call in progress
                          </span>
                        ) : (
                          "Call completed"
                        )}
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

              {/* Call content */}
              <div className="p-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={influencerAvatar || "/placeholder.svg"}
                        alt={influencerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {status === "in-progress" && (
                      <motion.div
                        className="absolute inset-0 border-4 border-green-400 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      ></motion.div>
                    )}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-gray-900 font-medium">{influencerName}</p>
                  <p className="text-gray-500 text-sm">
                    {status === "in-progress" ? "AI is negotiating" : "Call duration"}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{duration}</p>
                </div>

                <Button
                  onClick={onMaximize}
                  className="w-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] hover:opacity-90 text-white"
                >
                  {status === "in-progress" ? "View Live Call" : "View Call Summary"}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative"
              onClick={toggleExpand}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, rgba(90, 49, 244, 0.9), rgba(148, 47, 255, 0.9))`,
              }}
            >
              {/* Influencer avatar in background */}
              <div
                className="absolute inset-1 rounded-full bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: `url(${influencerAvatar || "/placeholder.svg"})`,
                }}
              />

              {/* Phone icon */}
              <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="h-3 w-3 text-white" />
              </div>

              {/* Status indicator */}
              {status === "in-progress" && (
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                />
              )}

              {/* Pulsing ring for active calls */}
              {status === "in-progress" && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
