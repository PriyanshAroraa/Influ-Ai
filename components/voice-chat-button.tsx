"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog" // Re-added Dialog imports
import { MessageCircle } from "lucide-react"
import VoiceNegotiator from "@/app/components/VoiceNegotiator" // Re-added VoiceNegotiator import

export function VoiceChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 flex items-center justify-center shadow-lg bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Open AI Voice Chat"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Test Me</span>
      </Button>

      {/* Re-enabled Dialog and VoiceNegotiator */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>AI Voice Chat</DialogTitle>
          </DialogHeader>
          <VoiceNegotiator onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
