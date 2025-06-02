"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Mic, Phone, X, MessageSquare, User, Bot, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AiCallSimulationProps {
  isVisible: boolean
  onClose: () => void
  onMinimize: () => void
  prompt: string
  influencerName: string
  influencerCategory: string
  influencerAvatar: string
}

export function AiCallSimulation({
  isVisible,
  onClose,
  onMinimize,
  prompt,
  influencerName,
  influencerCategory,
  influencerAvatar,
}: AiCallSimulationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [conversation, setConversation] = useState<{ speaker: "ai" | "influencer"; text: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimizing, setIsMinimizing] = useState(false)
  const conversationRef = useRef<HTMLDivElement>(null)

  const processingSteps = [
    { id: 0, title: "Understanding prompt", icon: Brain, duration: 1500 },
    { id: 1, title: "Analyzing influencer profile", icon: User, duration: 2000 },
    { id: 2, title: "Reviewing past collaborations", icon: MessageSquare, duration: 1800 },
    { id: 3, title: "Creating negotiation script", icon: Sparkles, duration: 2200 },
    { id: 4, title: "Initiating AI call", icon: Phone, duration: 1000 },
  ]

  const generateConversation = () => {
    return [
      {
        speaker: "ai" as const,
        text: `Hello ${influencerName}, this is AI assistant calling on behalf of a brand interested in working with you.`,
      },
      { speaker: "influencer" as const, text: "Hi there! I'm interested to hear more about this opportunity." },
      {
        speaker: "ai" as const,
        text: `We're looking to collaborate on ${prompt}. Given your expertise in ${influencerCategory}, we believe you'd be perfect for this campaign.`,
      },
      {
        speaker: "influencer" as const,
        text: "That sounds interesting! What kind of deliverables and timeline are you thinking about?",
      },
      {
        speaker: "ai" as const,
        text: `For the ${prompt}, we're looking at a 2-week campaign period. The budget we have in mind aligns with your usual rates.`,
      },
      {
        speaker: "influencer" as const,
        text: "Great! I'd need to check my schedule, but I'm definitely interested. Could you send over more details about the creative direction?",
      },
    ]
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
    } else if (currentStep === processingSteps.length) {
      const fullConversation = generateConversation()

      const playConversation = async () => {
        for (let i = 0; i < fullConversation.length; i++) {
          const message = fullConversation[i]
          setIsTyping(true)

          setConversation((prev) => [...prev, { speaker: message.speaker, text: "" }])

          for (let j = 0; j <= message.text.length; j++) {
            setConversation((prev) => {
              const newConv = [...prev]
              if (newConv.length > 0) {
                newConv[newConv.length - 1].text = message.text.substring(0, j)
              }
              return newConv
            })
            await new Promise((resolve) => setTimeout(resolve, 30))
          }

          setIsTyping(false)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }

      playConversation()
    }

    return () => clearTimeout(timeout)
  }, [isVisible, currentStep])

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [conversation])

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
            className="bg-gray-900 rounded-2xl w-full max-w-5xl overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isMinimizing ? 0.1 : 1,
              opacity: isMinimizing ? 0 : 1,
              x: isMinimizing ? window.innerWidth / 2 - 100 : 0,
              y: isMinimizing ? -window.innerHeight / 2 + 100 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: isMinimizing ? 0.8 : 0.5,
            }}
          >
            {/* Header with minimize button */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMinimize}
                className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Processing steps in top left */}
            <div className="absolute top-6 left-6 z-10">
              <div className="space-y-2">
                {processingSteps.map((step) => (
                  <motion.div
                    key={step.id}
                    className={`flex items-center space-x-2 ${
                      currentStep > step.id
                        ? "text-green-400"
                        : currentStep === step.id
                          ? "text-white"
                          : "text-gray-500"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: currentStep >= step.id ? 1 : 0.5,
                    }}
                    transition={{ delay: step.id * 0.2 }}
                  >
                    <step.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                    {currentStep > step.id && (
                      <motion.div
                        className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                    {currentStep === step.id && (
                      <motion.div className="w-4 h-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="p-8 pt-24 pb-20 min-h-[600px] flex flex-col">
              {/* Processing animation (shown during steps) */}
              {currentStep < processingSteps.length && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    className="relative w-64 h-64"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#5A31F4] to-[#942FFF] rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        x: [-10, 0, -10],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Bot className="h-10 w-10 text-white" />
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        x: [10, 0, 10],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 0.5,
                      }}
                    >
                      <User className="h-10 w-10 text-white" />
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-[#5A31F4] to-[#FF6B6B]"
                      animate={{
                        scaleX: [0.5, 1, 0.5],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />

                    <motion.div
                      className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-white text-lg font-medium">
                        {processingSteps[currentStep]?.title || "Processing..."}
                      </p>
                      <div className="flex justify-center mt-2 space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Conversation (shown after processing) */}
              {currentStep >= processingSteps.length && (
                <motion.div
                  className="flex-1 flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-full">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 font-medium">Call in progress</span>
                    </div>
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className="relative w-64 h-20">
                      <motion.div
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-[#5A31F4] to-[#942FFF] rounded-full flex items-center justify-center"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <Bot className="h-8 w-8 text-white" />
                      </motion.div>

                      <motion.div
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-full flex items-center justify-center"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 0.5,
                        }}
                      >
                        <User className="h-8 w-8 text-white" />
                      </motion.div>

                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-blue-400"
                            animate={{
                              height: [4, 12, 4],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    ref={conversationRef}
                    className="flex-1 overflow-y-auto bg-gray-800/30 rounded-xl p-4 space-y-4 max-h-[300px]"
                  >
                    {conversation.map((message, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${message.speaker === "ai" ? "justify-start" : "justify-end"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.speaker === "ai"
                              ? "bg-gradient-to-r from-[#5A31F4]/80 to-[#942FFF]/80 text-white"
                              : "bg-gradient-to-r from-[#FF6B6B]/80 to-[#FFE66D]/80 text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium opacity-80">
                              {message.speaker === "ai" ? "AI Assistant" : influencerName}
                            </span>
                            {message.speaker === "ai" ? (
                              <Bot className="h-3 w-3 opacity-80" />
                            ) : (
                              <User className="h-3 w-3 opacity-80" />
                            )}
                          </div>
                          <p>{message.text}</p>
                          {index === conversation.length - 1 && isTyping && (
                            <div className="flex space-x-1 mt-1">
                              <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                {currentStep >= processingSteps.length ? (
                  <div className="flex items-center">
                    <Mic className="h-4 w-4 mr-2 text-green-400" />
                    <span>AI is negotiating with {influencerName}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    <span>Preparing AI negotiation...</span>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-gray-300 border-gray-700 hover:bg-gray-700"
              >
                End Call
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
