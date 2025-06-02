"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Minimize2,
  CheckCircle,
  Loader2,
  Rocket,
  DollarSign,
  Lightbulb,
  Search,
  Database,
  ArrowRight,
  Sparkles,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCampaignCreation, type CampaignStatus, type InfluencerResult } from "@/context/campaign-creation-context"
import { cn } from "@/lib/utils"

// --- Timeline Step Definitions ---
const timelineSteps: { id: CampaignStatus; label: string; icon: React.ElementType }[] = [
  { id: "input", label: "Details", icon: ClipboardList },
  { id: "understanding", label: "Understand", icon: Lightbulb },
  { id: "searching", label: "Search", icon: Search },
  { id: "parsing", label: "Parse Data", icon: Database },
  { id: "negotiating", label: "Negotiate", icon: DollarSign },
  { id: "completed", label: "Launch", icon: Rocket },
]

// --- Animated Text Component ---
interface AnimatedTextProps {
  text: string
  delay?: number
  speed?: number
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, speed = 0.02 }) => {
  const [displayedText, setDisplayedText] = useState("")
  const i = useRef(0)

  useEffect(() => {
    setDisplayedText("") // Reset on text change
    i.current = 0
    const typingInterval = setInterval(() => {
      if (i.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i.current))
        i.current++
      } else {
        clearInterval(typingInterval)
      }
    }, speed * 1000)

    return () => clearInterval(typingInterval)
  }, [text, speed, delay])

  return <motion.p className="text-sm text-gray-700 leading-relaxed">{displayedText}</motion.p>
}

// --- Main Dialog Component ---
export default function CreateCampaignDialog() {
  const {
    isDialogOpen,
    isMinimized,
    campaignStatus,
    aiOutput,
    influencerResults,
    currentCampaignDetails,
    closeDialog,
    minimizeDialog,
    startCampaignAutomation,
    resetCampaignAutomation,
  } = useCampaignCreation()

  const [campaignName, setCampaignName] = useState("")
  const [campaignGoals, setCampaignGoals] = useState("")
  const [industry, setIndustry] = useState("")
  const [budget, setBudget] = useState("")

  const aiOutputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentCampaignDetails) {
      setCampaignName(currentCampaignDetails.name)
      setCampaignGoals(currentCampaignDetails.goals)
      setIndustry(currentCampaignDetails.industry)
      setBudget(currentCampaignDetails.budget)
    } else {
      setCampaignName("")
      setCampaignGoals("")
      setIndustry("")
      setBudget("")
    }
  }, [currentCampaignDetails])

  useEffect(() => {
    // Scroll to bottom of AI output
    if (aiOutputRef.current) {
      aiOutputRef.current.scrollTop = aiOutputRef.current.scrollHeight
    }
  }, [aiOutput])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await startCampaignAutomation({ name: campaignName, goals: campaignGoals, industry, budget })
  }

  const currentStepIndex = timelineSteps.findIndex((step) => step.id === campaignStatus)
  const isProcessing =
    campaignStatus !== "input" &&
    campaignStatus !== "idle" &&
    campaignStatus !== "completed" &&
    campaignStatus !== "error"

  const renderContent = () => {
    if (campaignStatus === "input" || campaignStatus === "idle") {
      return (
        <motion.form
          key="input-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-5 p-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="campaignName" className="text-gray-700 font-medium">
                Campaign Name
              </Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Summer Fashion Collection"
                required
                className="rounded-xl border-gray-200 focus:border-[#5A31F4] focus:ring-[#5A31F4]/20 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor="industry" className="text-gray-700 font-medium">
                Industry
              </Label>
              <Input
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Beauty, Tech, Gaming"
                required
                className="rounded-xl border-gray-200 focus:border-[#5A31F4] focus:ring-[#5A31F4]/20 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="campaignGoals" className="text-gray-700 font-medium">
              Campaign Goals
            </Label>
            <Textarea
              id="campaignGoals"
              value={campaignGoals}
              onChange={(e) => setCampaignGoals(e.target.value)}
              placeholder="e.g., Increase brand awareness by 20%, drive 1000 sales"
              required
              rows={3}
              className="rounded-xl border-gray-200 focus:border-[#5A31F4] focus:ring-[#5A31F4]/20 transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="budget" className="text-gray-700 font-medium">
              Budget
            </Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., $10,000 - $15,000"
              required
              className="rounded-xl border-gray-200 focus:border-[#5A31F4] focus:ring-[#5A31F4]/20 transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white py-3 text-lg font-semibold shadow-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" /> Launch AI Automation
          </Button>
        </motion.form>
      )
    } else if (campaignStatus === "error") {
      return (
        <motion.div
          key="error-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center text-red-500 p-4"
        >
          <X className="h-16 w-16 mx-auto text-red-500 mb-4 animate-bounce" />
          <p className="text-xl font-semibold mb-4">Automation Failed!</p>
          {aiOutput.map((line, i) => (
            <p key={i} className="text-sm text-red-400">
              {line}
            </p>
          ))}
          <Button
            onClick={resetCampaignAutomation}
            className="mt-6 rounded-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 text-lg font-semibold shadow-md transition-all duration-300"
          >
            Try Again
          </Button>
        </motion.div>
      )
    } else if (campaignStatus === "completed") {
      return (
        <motion.div
          key="completed-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center p-4"
        >
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Campaign Ready!</h3>
          <p className="text-lg text-gray-700 mb-6">
            Your AI-powered campaign &quot;{currentCampaignDetails?.name}&quot; is fully set up.
          </p>

          {influencerResults.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Selected Influencers:</h4>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {influencerResults.map((influencer: InfluencerResult, index) => (
                  <motion.div
                    key={influencer.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#5A31F4] to-[#942FFF] text-white font-bold">
                          {influencer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{influencer.name}</p>
                        <p className="text-sm text-gray-600">
                          {influencer.platform} • {influencer.followers} • {influencer.niche}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          <Button
            onClick={closeDialog}
            className="w-full rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white py-3 text-lg font-semibold shadow-lg hover:opacity-90 transition-opacity duration-300 mt-8"
          >
            View Campaign Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      )
    } else {
      // AI Processing Steps
      return (
        <motion.div
          key="ai-processing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 p-2"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", damping: 10, stiffness: 100 }}
              className="inline-block p-3 rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] shadow-lg"
            >
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </motion.div>
            <h3 className="text-2xl font-bold mt-4 text-gray-900">
              {timelineSteps[currentStepIndex]?.label}
              {isProcessing && <span className="ml-2 animate-pulse">...</span>}
            </h3>
            <p className="text-md text-gray-600">
              Campaign: <span className="font-semibold">{currentCampaignDetails?.name}</span>
            </p>
          </div>

          <div
            ref={aiOutputRef}
            className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-inner"
          >
            {aiOutput.map((line, i) => (
              <AnimatedText key={i} text={line} delay={i * 0.5} speed={0.03} />
            ))}
          </div>

          {campaignStatus === "searching" && influencerResults.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">Potential Influencers Found:</h4>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {influencerResults.map((influencer: InfluencerResult, index) => (
                  <motion.div
                    key={influencer.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 shadow-sm bg-white">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#5A31F4] to-[#942FFF] text-white font-bold">
                          {influencer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{influencer.name}</p>
                        <p className="text-xs text-gray-500">
                          {influencer.platform} • {influencer.followers} • {influencer.niche}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      )
    }
  }

  if (isMinimized) return null // Dialog is handled by the floating button indicator

  return (
    <AnimatePresence>
      {isDialogOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold gradient-text flex items-center gap-2">
                  <Sparkles className="h-7 w-7" /> Fully AI Automated Campaigns
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={minimizeDialog}
                    className="rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Minimize2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeDialog}
                    className="rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Horizontal Timeline */}
              <div className="relative flex justify-between items-center mb-8 mt-4 px-4">
                <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                {timelineSteps.map((step, index) => {
                  const isActive = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex
                  const Icon = step.icon
                  return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                      <motion.div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out",
                          isActive
                            ? "bg-gradient-to-br from-[#5A31F4] to-[#942FFF] text-white shadow-md"
                            : "bg-gray-100 text-gray-500",
                          isCurrent && "animate-bounce-once", // Custom animation for current step
                        )}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <motion.p
                        className={cn(
                          "mt-2 text-xs font-medium text-center transition-colors duration-300",
                          isActive ? "text-gray-900" : "text-gray-500",
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      >
                        {step.label}
                      </motion.p>
                    </div>
                  )
                })}
              </div>

              <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-1 hover:scale-[1.005] hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {campaignStatus === "input" || campaignStatus === "idle"
                      ? "Enter Campaign Details"
                      : campaignStatus === "error"
                        ? "Automation Error"
                        : campaignStatus === "completed"
                          ? "Campaign Automation Complete"
                          : "AI Processing"}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {campaignStatus === "input" || campaignStatus === "idle"
                      ? "Provide the basic information for your AI-driven campaign."
                      : campaignStatus === "error"
                        ? "Something went wrong during the automation process."
                        : campaignStatus === "completed"
                          ? "Your campaign is ready to go!"
                          : "The AI is working its magic..."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">{renderContent()}</CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
