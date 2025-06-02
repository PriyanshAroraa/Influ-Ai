"use client"

import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MinimizedCallNotificationProps {
  influencerName: string
  influencerAvatar: string
  isActive: boolean
  onMaximize: () => void
  onClose: () => void
  duration: string
  status: "in-progress" | "completed"
}

export function MinimizedCallNotification({
  influencerName,
  influencerAvatar,
  isActive,
  onMaximize,
  onClose,
  duration,
  status,
}: MinimizedCallNotificationProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeOn, setIsVolumeOn] = useState(true)

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden cursor-grab"
          initial={{ width: 280, height: 120 }}
          animate={{ width: 280, height: 120 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={influencerAvatar || "/placeholder.svg"}
                    alt={influencerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-green-400 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              </div>
              <div>
                <h3 className="text-white text-sm font-medium">{influencerName}</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Live Call • {duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMaximize}
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

          {/* Minimized View Content */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-green-400 rounded-full"
                    animate={{ height: [4, 12, 4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="text-white text-sm">AI is negotiating...</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVolumeOn(!isVolumeOn)}
                className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                {isVolumeOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
