"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Plus, Rocket } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCampaignCreation } from "@/context/campaign-creation-context"
import { Badge } from "@/components/ui/badge" // Assuming you have Badge component

interface FloatingActionButtonsProps {
  scrollThreshold?: number // Pixels to scroll before button appears
}

export function FloatingActionButtons({ scrollThreshold = 300 }: FloatingActionButtonsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const { isMinimized, campaignStatus, restoreDialog, openDialog } = useCampaignCreation()

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/campaigns") ||
    pathname.startsWith("/creator-discovery") ||
    pathname.startsWith("/outreach") ||
    pathname.startsWith("/contracts") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/performance") ||
    pathname.startsWith("/admin-dashboard")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Only add scroll listener if not on a dashboard route
    if (!isDashboardRoute) {
      window.addEventListener("scroll", handleScroll)
    } else {
      setIsVisible(false) // Hide buttons on dashboard routes
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold, isDashboardRoute])

  if (isDashboardRoute) {
    return null // Do not render these buttons on dashboard pages
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 inset-x-0 z-50"
        >
          <div className="flex justify-center gap-4">
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

            {isMinimized ? (
              <motion.button
                className="relative flex items-center gap-2 bg-gradient-to-r from-[#942FFF] to-[#5A31F4] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#942FFF] focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restoreDialog}
              >
                <Rocket className="h-5 w-5" />
                Campaign Progress
                <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full px-2 py-1 text-xs font-bold">
                  {campaignStatus === "minimized" ? "Active" : campaignStatus}
                </Badge>
              </motion.button>
            ) : (
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-[#942FFF] to-[#5A31F4] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#942FFF] focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openDialog()}
              >
                Create Campaign
                <Plus className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
