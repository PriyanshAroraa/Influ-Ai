"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Star, Users, Heart, Shield, ArrowUp, Flame, MapPin } from "lucide-react"
import { AiPromptPopup } from "@/components/ai-prompt-popup"
import { Badge } from "@/components/ui/badge"

// Define the type for an influencer, matching the mapped structure
type Influencer = {
  id: string
  name: string
  handle: string
  avatar: string
  category: string
  followers: string
  followersCount: number
  engagement: string
  engagementRate: number
  likes: string
  demographics: string
  authenticity: string
  verified: boolean
  rating: number
  priceRange: string
  relevanceScore: number
}

interface InfluencerListingProps {
  influencers: Influencer[]
  searchQuery: string
}

export function InfluencerListing({ influencers, searchQuery }: InfluencerListingProps) {
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [activePopup, setActivePopup] = useState<{
    type: "call" | "mail"
    influencerId: string
    influencerName: string
    influencerCategory: string // Add this line
  } | null>(null)
  // const [showAiPromptPopup, setShowAiPromptPopup] = useState(false)
  // const [aiPromptPopupType, setAiPromptPopupType] = useState<"call" | "mail">("call")
  // const [currentInfluencerForPopup, setCurrentInfluencerForPopup] = useState<Influencer | null>(null)
  // const [currentButtonRef, setCurrentButtonRef] = useState<React.RefObject<HTMLButtonElement> | null>(null)

  // Pre-initialize all button refs
  const callButtonRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({})
  const mailButtonRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({})

  // Initialize refs for all influencers
  useEffect(() => {
    influencers.forEach((influencer) => {
      if (!callButtonRefs.current[influencer.id]) {
        callButtonRefs.current[influencer.id] = { current: null }
      }
      if (!mailButtonRefs.current[influencer.id]) {
        mailButtonRefs.current[influencer.id] = { current: null }
      }
    })
  }, [influencers]) // Re-run when influencers prop changes

  const sortInfluencers = (criteria: string) => {
    setSortBy(criteria)
    // In a real app, you'd sort the 'influencers' prop here or fetch sorted data
  }

  const loadMoreInfluencers = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // In a real app, you'd fetch more data from the API here
    }, 2000)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Fashion: "from-pink-400 to-purple-600",
      Tech: "from-blue-400 to-cyan-600",
      Beauty: "from-rose-400 to-pink-600",
      Fitness: "from-green-400 to-emerald-600",
      Food: "from-orange-400 to-red-600",
      Travel: "from-indigo-400 to-purple-600",
      // Add more categories if your API returns them
      default: "from-gray-400 to-gray-600", // Fallback
    }
    return colors[category as keyof typeof colors] || colors.default
  }

  const handleAiButtonClick = (
    type: "call" | "mail",
    influencerId: string,
    influencerName: string,
    influencerCategory: string,
  ) => {
    setActivePopup({ type, influencerId, influencerName, influencerCategory })
  }

  const closePopup = () => {
    setActivePopup(null)
  }

  const getButtonRef = (influencerId: string, type: "call" | "mail") => {
    return type === "call" ? callButtonRefs.current[influencerId] : mailButtonRefs.current[influencerId]
  }

  // const handleOpenAiPrompt = (
  //   type: "call" | "mail",
  //   event: React.MouseEvent<HTMLButtonElement>,
  //   influencer: Influencer,
  // ) => {
  //   setAiPromptPopupType(type)
  //   setCurrentInfluencerForPopup(influencer)
  //   setShowAiPromptPopup(true)
  //   // Create a new ref object for the specific button that was clicked
  //   const newRef = { current: event.currentTarget } as React.RefObject<HTMLButtonElement>
  //   setCurrentButtonRef(newRef)
  // }

  // const handleCloseAiPrompt = () => {
  //   setShowAiPromptPopup(false)
  //   setCurrentInfluencerForPopup(null)
  //   setCurrentButtonRef(null) // Clear the ref
  // }

  return (
    <div className="relative z-10 pt-0 pb-12">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        {/* Results Count and Sorting */}
        <div className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
          <div className="text-gray-700">
            <span className="text-gray-900 font-semibold text-lg">{influencers.length}</span> influencers found
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm font-medium">Sort by:</span>
            <Button
              variant={sortBy === "relevance" ? "default" : "ghost"}
              size="sm"
              onClick={() => sortInfluencers("relevance")}
              className={`transition-all duration-300 hover:scale-105 ${
                sortBy === "relevance"
                  ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90"
                  : "text-gray-600 hover:text-[#5A31F4] hover:bg-[#5A31F4]/5"
              }`}
            >
              Relevance
            </Button>
            <Button
              variant={sortBy === "followers" ? "default" : "ghost"}
              size="sm"
              onClick={() => sortInfluencers("followers")}
              className={`transition-all duration-300 hover:scale-105 ${
                sortBy === "followers"
                  ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90"
                  : "text-gray-600 hover:text-[#5A31F4] hover:bg-[#5A31F4]/5"
              }`}
            >
              Followers
            </Button>
            <Button
              variant={sortBy === "engagement" ? "default" : "ghost"}
              size="sm"
              onClick={() => sortInfluencers("engagement")}
              className={`transition-all duration-300 hover:scale-105 ${
                sortBy === "engagement"
                  ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90"
                  : "text-gray-600 hover:text-[#5A31F4] hover:bg-[#5A31F4]/5"
              }`}
            >
              Engagement
            </Button>
          </div>
        </div>
        {/* Influencer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {influencers.map((influencer, index) => (
            <div
              key={influencer.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-[#5A31F4]/30 transition-all duration-700 hover:-translate-y-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#5A31F4]/10 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              {/* Card Content */}
              <div className="relative z-10 p-6">
                {/* Profile Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] p-0.5 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={influencer.avatar || "/placeholder.svg"} // Use dynamic avatar URL
                        alt={influencer.name}
                        className="w-full h-full rounded-full object-cover bg-gray-100"
                      />
                    </div>
                    {influencer.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#5A31F4] to-[#942FFF] rounded-full flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                    )}
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5A31F4]/30 to-[#942FFF]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#5A31F4] transition-colors duration-300">
                    {influencer.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{influencer.handle}</p>

                  <Badge
                    className={`bg-gradient-to-r ${getCategoryColor(influencer.category)} text-white border-0 px-3 py-1 text-xs font-medium hover:scale-105 transition-transform duration-300`}
                  >
                    {influencer.category}
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="space-y-4 mb-6">
                  {/* Top Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-gray-50/50 rounded-xl p-3 group-hover:bg-[#5A31F4]/5 transition-colors duration-300">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-[#5A31F4] mr-1" />
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      </div>
                      <div className="text-gray-900 font-bold text-lg">{influencer.followers}</div>
                      <div className="text-gray-600 text-xs uppercase tracking-wide">Followers</div>
                    </div>
                    <div className="text-center bg-gray-50/50 rounded-xl p-3 group-hover:bg-[#942FFF]/5 transition-colors duration-300">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="h-4 w-4 text-[#942FFF] mr-1" />
                        <Flame className="h-3 w-3 text-orange-500" />
                      </div>
                      <div className="text-gray-900 font-bold text-lg">{influencer.engagement}</div>
                      <div className="text-gray-600 text-xs uppercase tracking-wide">Engagement</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                  {/* Demographics */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-4 w-4 text-[#6A8DFF] mr-1" />
                      <span className="text-gray-600 text-xs uppercase tracking-wide">Demographics</span>
                    </div>
                    <p className="text-gray-900 text-sm">{influencer.demographics}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                  {/* Authenticity */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-gray-600 text-xs uppercase tracking-wide">Authenticity</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                          style={{ width: `${Number.parseInt(influencer.authenticity)}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 font-bold text-sm">{influencer.authenticity}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(influencer.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-gray-900 font-bold text-sm ml-2">{influencer.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-gray-600 text-xs">{influencer.priceRange}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    ref={callButtonRefs.current[influencer.id]}
                    onClick={() => handleAiButtonClick("call", influencer.id, influencer.name, influencer.category)}
                    className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] hover:opacity-90 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5A31F4]/25 group/btn"
                  >
                    <Phone className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-wide">AI Call</span>
                  </Button>
                  <Button
                    ref={mailButtonRefs.current[influencer.id]}
                    onClick={() => handleAiButtonClick("mail", influencer.id, influencer.name, influencer.category)}
                    className="bg-gradient-to-r from-[#6A8DFF] to-[#942FFF] hover:opacity-90 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6A8DFF]/25 group/btn"
                  >
                    <Mail className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                    <span className="text-xs font-medium uppercase tracking-wide">AI Mail</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Load More Button */}
        <div className="text-center">
          <Button
            onClick={loadMoreInfluencers}
            disabled={loading}
            className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] hover:opacity-90 text-white border-0 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#5A31F4]/25"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Loading More...
              </div>
            ) : (
              "Load More Influencers"
            )}
          </Button>
        </div>
      </div>

      {/* AI Prompt Popup */}
      {activePopup && (
        <AiPromptPopup
          isVisible={!!activePopup}
          onClose={closePopup}
          type={activePopup.type}
          influencerName={activePopup.influencerName}
          influencerCategory={activePopup.influencerCategory} // Pass the category here
          buttonRef={getButtonRef(activePopup.influencerId, activePopup.type)}
        />
      )}
    </div>
  )
}
