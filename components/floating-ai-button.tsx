"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, Phone, Mail } from "lucide-react"
import { Conversation } from "@/app/components/conversation"
import { EmailChatDialog } from "@/components/email-chat-dialog"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingAiButton() {
  const [showSubButtons, setShowSubButtons] = useState(false)
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [isEmailChatOpen, setIsEmailChatOpen] = useState(false)

  const handleTestMeClick = () => {
    setShowSubButtons(!showSubButtons)
  }

  const handleCallClick = () => {
    setIsCallDialogOpen(true)
    setShowSubButtons(false)
  }

  const handleEmailClick = () => {
    setIsEmailChatOpen(true)
    setShowSubButtons(false)
  }

  // Placeholder deal details for demonstration
  const sampleDealDetails = [
    "Campaign: Summer Collection Launch",
    "Product: New Eco-Friendly Sneakers",
    "Budget: $5,000",
    "Deliverables: 2 Instagram Posts, 1 Story",
    "Deadline: July 15, 2025",
  ]

  // Placeholder influencer data for demonstration
  const sampleInfluencerData = {
    platform: "Instagram",
    followers: 850000,
    rate: 25000,
    engagement_rate: "3.5%",
    languages: ["English"],
    location: "Los Angeles",
  }

  // Initial user prompt for the email negotiation
  const initialEmailPrompt =
    "Draft an initial outreach email for a product review video for our new eco-friendly sneakers."

  return (
    <>
      {/* Main "Test Me" Button */}
      <Button
        onClick={handleTestMeClick}
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Open AI Interaction Options"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Test Me</span>
      </Button>

      {/* Animated Sub-Buttons */}
      <AnimatePresence>
        {showSubButtons && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 flex flex-col gap-3 z-50"
          >
            <Button
              onClick={handleCallClick}
              className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:scale-110 transition-transform duration-300"
              aria-label="Start AI Call"
            >
              <Phone className="h-6 w-6" />
              <span className="sr-only">Call</span>
            </Button>
            <Button
              onClick={handleEmailClick}
              className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] text-white hover:scale-110 transition-transform duration-300"
              aria-label="Start AI Email Chat"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ElevenLabs Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-gray-900 text-white rounded-2xl border-none">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>AI Voice Chat</DialogTitle>
          </DialogHeader>
          <Conversation onClose={() => setIsCallDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Email Chat Dialog */}
      <Dialog open={isEmailChatOpen} onOpenChange={setIsEmailChatOpen}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-gray-900 text-white rounded-2xl border-none">
          <EmailChatDialog
            onClose={() => setIsEmailChatOpen(false)}
            dealDetails={sampleDealDetails}
            influencerData={sampleInfluencerData}
            initialUserPrompt={initialEmailPrompt}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
