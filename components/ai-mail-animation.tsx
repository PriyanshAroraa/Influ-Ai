"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Database, FileText, Send, X, Minimize2, Mail, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AiMailAnimationProps {
  isVisible: boolean
  onClose: () => void
  onMinimize: () => void
  prompt: string
  influencerName: string
  influencerAvatar: string
  influencerCategory: string
}

export function AiMailAnimation({
  isVisible,
  onClose,
  onMinimize,
  prompt,
  influencerName,
  influencerAvatar,
  influencerCategory,
}: AiMailAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [emailContent, setEmailContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isMinimizing, setIsMinimizing] = useState(false)
  const emailContentRef = useRef<HTMLDivElement>(null)

  const processingSteps = [
    { id: 0, title: "Finding contact through Crunchbase", icon: Search, duration: 1800 },
    { id: 1, title: "Analyzing prompt", icon: Database, duration: 2000 },
    { id: 2, title: "Writing personalized email", icon: FileText, duration: 2500 },
    { id: 3, title: "Sending email", icon: Send, duration: 1500 },
  ]

  const generateEmailContent = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return `From: ai-assistant@influai.com
To: ${influencerName.toLowerCase().replace(" ", ".")}@creator.com
Subject: Collaboration Opportunity: ${prompt}
Date: ${currentDate}

Dear ${influencerName},

I hope this email finds you well. My name is AI Assistant, and I'm reaching out on behalf of a brand that's interested in collaborating with you on ${prompt}.

We've been following your work in the ${influencerCategory} space and are impressed with your authentic content and engaged audience. Your unique perspective and creative approach align perfectly with our brand values.

For this collaboration, we're looking for:
• ${prompt}
• Timeline: 4 weeks from agreement
• Compensation: Competitive rate based on your standard pricing

Would you be interested in discussing this opportunity further? We'd love to share more details about the brand, campaign goals, and creative direction.

Please let me know if you're interested, and we can schedule a call to discuss the details.

Looking forward to your response!

Best regards,
AI Assistant
Brand Partnerships Manager
InfluAI`
  }

  const handleMinimize = () => {
    setIsMinimizing(true)
    setTimeout(() => {
      onMinimize()
    }, 800) // Wait for animation to complete
  }

  // Process steps sequentially
  useEffect(() => {
    if (!isVisible) return

    let timeout: NodeJS.Timeout

    if (currentStep < processingSteps.length) {
      timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, processingSteps[currentStep].duration)
    } else if (currentStep === processingSteps.length && !isComplete) {
      const content = generateEmailContent()
      let currentIndex = 0

      const typeEmail = () => {
        if (currentIndex <= content.length) {
          setEmailContent(content.substring(0, currentIndex))
          currentIndex += 5
          timeout = setTimeout(typeEmail, 10)
        } else {
          setIsComplete(true)
        }
      }

      typeEmail()
    }

    return () => clearTimeout(timeout)
  }, [isVisible, currentStep, isComplete])

  useEffect(() => {
    if (emailContentRef.current) {
      emailContentRef.current.scrollTop = emailContentRef.current.scrollHeight
    }
  }, [emailContent])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimizing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl w-full max-w-4xl overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isMinimizing ? 0.1 : 1,
              opacity: isMinimizing ? 0 : 1,
              x: isMinimizing ? -window.innerWidth / 2 + 100 : 0,
              y: isMinimizing ? window.innerHeight / 2 - 100 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: isMinimizing ? 0.8 : 0.5,
            }}
          >
            {/* Header with controls */}
            <div className="bg-gray-800 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">AI Mail to {influencerName}</h3>
                  <p className="text-gray-400 text-xs">Personalized outreach</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main content */}
            <div className="p-6 min-h-[500px] max-h-[80vh] flex flex-col">
              <div className="flex">
                {/* Left sidebar with steps */}
                <div className="w-64 pr-6 border-r border-gray-700">
                  <div className="space-y-4">
                    {processingSteps.map((step) => (
                      <motion.div
                        key={step.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          currentStep > step.id
                            ? "bg-green-500/10 text-green-400"
                            : currentStep === step.id
                              ? "bg-blue-500/10 text-blue-400"
                              : "text-gray-500"
                        }`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: currentStep >= step.id ? 1 : 0.5,
                        }}
                        transition={{ delay: step.id * 0.2 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep > step.id
                              ? "bg-green-500/20"
                              : currentStep === step.id
                                ? "bg-blue-500/20"
                                : "bg-gray-700/20"
                          }`}
                        >
                          {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                        {currentStep === step.id && (
                          <motion.div
                            className="ml-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Your Prompt</h4>
                    <p className="text-white text-sm">{prompt}</p>
                  </div>
                </div>

                {/* Right content area */}
                <div className="flex-1 pl-6">
                  {currentStep >= 2 ? (
                    <div className="h-full flex flex-col">
                      <div className="bg-gray-800 rounded-t-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="text-gray-400 text-xs">Email Preview</div>
                        <div className="w-16" />
                      </div>
                      <div
                        ref={emailContentRef}
                        className="flex-1 bg-white text-gray-900 p-4 rounded-b-lg overflow-y-auto font-mono text-sm whitespace-pre-wrap"
                      >
                        {emailContent}
                        {currentStep === 2 && (
                          <motion.span
                            className="inline-block w-2 h-4 bg-gray-900 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                      <motion.div
                        className="relative w-40 h-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] opacity-20"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="absolute inset-4 rounded-full bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] opacity-40"
                          animate={{ scale: [1.2, 1, 1.2] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut", delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-8 rounded-full bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
                        >
                          <Mail className="h-10 w-10 text-white" />
                        </motion.div>
                      </motion.div>
                      <p className="text-gray-300 mt-6 text-center">
                        {currentStep === 0 && "Searching for contact information..."}
                        {currentStep === 1 && "Analyzing your prompt to craft the perfect email..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-gray-800 p-4 flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                {isComplete ? (
                  <div className="flex items-center text-green-400">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Email sent successfully!</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />
                    <span>
                      {currentStep < processingSteps.length
                        ? processingSteps[currentStep]?.title
                        : "Finalizing email..."}
                    </span>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={isComplete ? handleMinimize : onClose}
                className="text-gray-300 border-gray-700 hover:bg-gray-700"
              >
                {isComplete ? "Minimize" : "Cancel"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
