"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SearchTransition } from "@/components/search-transition"
import { InfluencerListing } from "@/components/influencer-listing"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

type InfluencerApiResponse = {
  prompt: string
  interpreted_criteria: Record<string, string>
  filters_applied: string
  total_matches: number
  results_returned: number
  influencers: {
    name: string
    category: string
    content_type: string
    platform: string
    followers: number
    engagement: number
    rate_inr: number
    age: number
    gender: string
    contact: {
      email: string
      phone: string
    }
  }[]
}

// Define the type for an influencer, matching the mapped structure for InfluencerListing
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

export default function InfluencersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const initialPrompt = (searchParams.q as string) || "Find beauty influencers in Los Angeles..."

  const [showSearchTransition, setShowSearchTransition] = useState(false)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialPrompt)
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loadingInfluencers, setLoadingInfluencers] = useState(true)
  const [errorFetching, setErrorFetching] = useState<string | null>(null)

  const searchInputRef = useRef<HTMLInputElement>(null)

  const fetchInfluencers = async (prompt: string) => {
    setLoadingInfluencers(true)
    setErrorFetching(null)
    setShowSearchTransition(true) // Start transition immediately on fetch

    const limit = 10 // Hardcode limit for now as per API example
    const apiUrl = process.env.NEXT_PUBLIC_INFLUENCER_API_URL || "https://influencer-search-api-1.onrender.com"
    const fullUrl = `${apiUrl}/search?prompt=${encodeURIComponent(prompt)}&limit=${limit}`

    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure data is always fresh
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`API call failed with status: ${res.status}, message: ${errorText}`)
      }

      const influencersData = (await res.json()) as InfluencerApiResponse

      if (!influencersData || influencersData.influencers.length === 0) {
        setInfluencers([])
        return // No influencers found
      }

      // Map API response to existing InfluencerListing structure
      const mappedInfluencers: Influencer[] = influencersData.influencers.map((apiInfluencer, index) => ({
        id: `${apiInfluencer.name}-${index}`, // Generate unique ID
        name: apiInfluencer.name,
        handle: `@${apiInfluencer.name.toLowerCase().replace(/\s/g, "")}`, // Generate handle from name
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(apiInfluencer.name)}`, // Dynamic avatar
        category: apiInfluencer.category,
        followers: `${(apiInfluencer.followers / 1000000).toFixed(1)}M`, // Format to M
        followersCount: apiInfluencer.followers,
        engagement: `${apiInfluencer.engagement}%`,
        engagementRate: apiInfluencer.engagement,
        likes: `${Math.floor((apiInfluencer.followers * (apiInfluencer.engagement / 100) * 0.8) / 1000)}K`, // Estimate likes
        demographics: `${apiInfluencer.age} years, ${apiInfluencer.gender === "male" ? "Male" : "Female"}`, // Combine age and gender
        authenticity: `${90 + Math.floor(Math.random() * 10)}%`, // Placeholder
        verified: true, // Placeholder
        rating: 4.0 + Math.random() * 0.9, // Placeholder
        priceRange: `₹${apiInfluencer.rate_inr.toLocaleString("en-IN")}`, // Format INR
        relevanceScore: 80 + Math.floor(Math.random() * 20), // Placeholder
      }))
      setInfluencers(mappedInfluencers)
    } catch (error: any) {
      console.error("Error fetching influencer data:", error)
      setErrorFetching(error.message || "An error occurred while fetching data.")
      setInfluencers([]) // Clear influencers on error
    } finally {
      // The transition will handle hiding itself via onComplete
    }
  }

  useEffect(() => {
    fetchInfluencers(initialPrompt)
  }, [initialPrompt]) // Re-fetch when initial prompt changes (e.g., from URL)

  const handleSearchAction = (query: string) => {
    setCurrentSearchQuery(query)
    router.push(`/influencers?q=${encodeURIComponent(query)}`) // Update URL and trigger re-fetch via useEffect
  }

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value
      handleSearchAction(query)
    }
  }

  const handleSearchButtonClick = () => {
    const query = searchInputRef.current?.value || "Find beauty influencers in Los Angeles..."
    handleSearchAction(query)
  }

  const handleCategoryClick = (category: string) => {
    handleSearchAction(`Find ${category.toLowerCase()} influencers`)
  }

  const handleTransitionComplete = () => {
    setShowSearchTransition(false)
    setLoadingInfluencers(false) // Only set loading to false after transition completes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Permanent Light Beam Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic beam image always visible */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/cosmic-beam.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
        />

        {/* Subtle floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="flex flex-col items-center justify-center py-12 space-y-6 relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight text-gray-900">
          Discover Top Influencers
          <span className="block bg-gradient-to-r from-[#5A31F4] to-[#942FFF] bg-clip-text text-transparent animate-gradient">
            Effortlessly
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
          Search creators by name, niche, or by AI prompt to connect with the perfect influencers for your brand.
        </p>
        <div className="relative group max-w-2xl w-full px-4">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 p-2 group-hover:border-gray-300 group-hover:animate-pulse-glow">
            <div className="flex items-center">
              <div className="flex-1 px-4">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Find beauty influencers in Los Angeles..."
                  className="border-0 text-lg placeholder:text-gray-500 focus:ring-0 bg-transparent text-gray-900"
                  onKeyPress={handleSearchSubmit}
                  defaultValue={currentSearchQuery}
                />
              </div>
              <Button
                className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white rounded-xl px-6 py-3 text-lg font-semibold shadow-lg hover:from-[#5A31F4]/90 hover:to-[#942FFF]/90 transition-all duration-300 flex items-center gap-2"
                onClick={handleSearchButtonClick}
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto px-4">
          {["Fashion", "Beauty", "Lifestyle", "Tech", "Fitness", "Food"].map((category, index) => (
            <Badge
              key={category}
              onClick={() => handleCategoryClick(category)} // Added onClick handler
              className="bg-white/10 backdrop-blur-sm text-gray-700 border-gray-200/50 hover:scale-105 transition-transform duration-300 animate-bounce-gentle animate-pulse-glow cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Conditional rendering based on loading/error state */}
      {loadingInfluencers && !showSearchTransition ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] text-gray-600 text-xl">
          Loading influencers...
        </div>
      ) : errorFetching ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] text-red-500 text-xl">
          Error: {errorFetching}
        </div>
      ) : influencers.length === 0 ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] text-gray-600 text-xl">
          No influencers found for your search.
        </div>
      ) : (
        <InfluencerListing influencers={influencers} searchQuery={currentSearchQuery} />
      )}

      {/* Search Transition Overlay */}
      <SearchTransition
        isVisible={showSearchTransition}
        searchQuery={currentSearchQuery}
        onComplete={handleTransitionComplete}
      />
    </div>
  )
}
