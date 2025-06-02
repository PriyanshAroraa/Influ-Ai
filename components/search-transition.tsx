"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Brain, Search, Shield, Database } from "lucide-react"

interface SearchTransitionProps {
  isVisible: boolean
  searchQuery: string
  onComplete: () => void
}

export function SearchTransition({ isVisible, searchQuery, onComplete }: SearchTransitionProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const router = useRouter()

  const stages = [
    { text: "Understanding your prompt...", icon: Brain },
    { text: "Scraping social media in real-time...", icon: Search },
    { text: "Calculating follower authenticity scores...", icon: Shield },
    { text: "Compiling results...", icon: Database },
  ]

  useEffect(() => {
    if (!isVisible) {
      setCurrentStage(0)
      return
    }

    // Stage timing: 500ms each = 2 seconds total
    const stageTimings = [500, 500, 500, 500]
    let totalTime = 0

    stages.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStage(index)
      }, totalTime)
      totalTime += stageTimings[index]
    })

    // Navigate after all stages complete
    setTimeout(() => {
      router.push(`/influencers?q=${encodeURIComponent(searchQuery)}`)
      onComplete()
    }, totalTime + 200)
  }, [isVisible, searchQuery, router, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-900/70 backdrop-blur-md flex items-center justify-center transition-all duration-300">
      <div className="text-center max-w-lg mx-auto px-6">
        {/* Search query */}
        <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <p className="text-sm text-gray-300 mb-1">Searching:</p>
          <p className="text-white font-medium">{searchQuery}</p>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon
            const isActive = index === currentStage
            const isCompleted = index < currentStage

            return (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  isActive
                    ? "bg-white/20 backdrop-blur-sm border border-white/30 scale-105"
                    : isCompleted
                      ? "bg-white/10 backdrop-blur-sm border border-white/20 opacity-60"
                      : "opacity-30"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white animate-pulse"
                      : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-400"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <p
                  className={`text-left transition-all duration-300 ${
                    isActive ? "text-white font-medium" : isCompleted ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {stage.text}
                </p>
                {isActive && (
                  <div className="flex space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
