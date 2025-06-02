"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

interface OpenDashboardButtonProps {
  scrollThreshold?: number // Pixels to scroll before button appears
}

export function OpenDashboardButton({ scrollThreshold = 300 }: OpenDashboardButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 inset-x-0 z-50" // Take full width, fixed at bottom
        >
          <div className="flex justify-center gap-4">
            {" "}
            {/* Center the flex items within this full-width div */}
            <Link href="/dashboard" passHref>
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5A31F4] focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Dashboard
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/campaigns" passHref>
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-[#942FFF] to-[#5A31F4] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#942FFF] focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Campaign
                <Plus className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
