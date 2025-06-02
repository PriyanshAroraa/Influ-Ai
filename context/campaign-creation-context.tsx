"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type CampaignStatus =
  | "idle"
  | "input"
  | "understanding"
  | "planning"
  | "searching"
  | "selecting"
  | "negotiating"
  | "completed"
  | "minimized"
  | "error"

export interface InfluencerResult {
  id: string
  name: string
  platform: string
  followers: string
  niche: string
  avatar: string
}

interface CampaignDetails {
  name: string
  goals: string
  industry: string
  budget: string
}

interface CampaignCreationContextType {
  isDialogOpen: boolean
  isMinimized: boolean
  campaignStatus: CampaignStatus
  aiOutput: string[]
  influencerResults: InfluencerResult[]
  currentCampaignDetails: CampaignDetails | null
  openDialog: (details?: CampaignDetails) => void
  closeDialog: () => void
  minimizeDialog: () => void
  restoreDialog: () => void
  startCampaignAutomation: (details: CampaignDetails) => Promise<void>
  resetCampaignAutomation: () => void
}

const CampaignCreationContext = createContext<CampaignCreationContextType | undefined>(undefined)

export function CampaignCreationProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>("idle")
  const [aiOutput, setAiOutput] = useState<string[]>([])
  const [influencerResults, setInfluencerResults] = useState<InfluencerResult[]>([])
  const [currentCampaignDetails, setCurrentCampaignDetails] = useState<CampaignDetails | null>(null)

  const openDialog = useCallback((details?: CampaignDetails) => {
    setIsDialogOpen(true)
    setIsMinimized(false)
    if (details) {
      setCurrentCampaignDetails(details)
      setCampaignStatus("understanding") // Start automation if details provided
    } else {
      setCampaignStatus("input") // Show form if no details
    }
  }, [])

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setIsMinimized(false)
    resetCampaignAutomation()
  }, [])

  const minimizeDialog = useCallback(() => {
    setIsMinimized(true)
    setIsDialogOpen(false)
    setCampaignStatus("minimized")
  }, [])

  const restoreDialog = useCallback(() => {
    setIsMinimized(false)
    setIsDialogOpen(true)
    if (campaignStatus === "minimized") {
      setCampaignStatus(currentCampaignDetails ? "understanding" : "input") // Restore to appropriate state
    }
  }, [campaignStatus, currentCampaignDetails])

  const resetCampaignAutomation = useCallback(() => {
    setCampaignStatus("idle")
    setAiOutput([])
    setInfluencerResults([])
    setCurrentCampaignDetails(null)
  }, [])

  const startCampaignAutomation = useCallback(async (details: CampaignDetails) => {
    setCurrentCampaignDetails(details)
    setIsDialogOpen(true)
    setIsMinimized(false)
    setCampaignStatus("understanding")
    setAiOutput([])
    setInfluencerResults([])

    try {
      const response = await fetch("/api/campaign-automation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process chunks as they arrive
        const lines = buffer.split("\n")
        buffer = lines.pop() || "" // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith("event: status")) {
            setCampaignStatus(line.substring("event: status".length + 1) as CampaignStatus)
          } else if (line.startsWith("event: ai_output")) {
            setAiOutput((prev) => [...prev, line.substring("event: ai_output".length + 1)])
          } else if (line.startsWith("event: influencers")) {
            setInfluencerResults(JSON.parse(line.substring("event: influencers".length + 1)))
          }
        }
      }
    } catch (error) {
      console.error("Campaign automation failed:", error)
      setCampaignStatus("error")
      setAiOutput((prev) => [...prev, `Error: ${(error as Error).message}`])
    }
  }, [])

  return (
    <CampaignCreationContext.Provider
      value={{
        isDialogOpen,
        isMinimized,
        campaignStatus,
        aiOutput,
        influencerResults,
        currentCampaignDetails,
        openDialog,
        closeDialog,
        minimizeDialog,
        restoreDialog,
        startCampaignAutomation,
        resetCampaignAutomation,
      }}
    >
      {children}
    </CampaignCreationContext.Provider>
  )
}

export function useCampaignCreation() {
  const context = useContext(CampaignCreationContext)
  if (context === undefined) {
    throw new Error("useCampaignCreation must be used within a CampaignCreationProvider")
  }
  return context
}
