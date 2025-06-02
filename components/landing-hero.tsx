"use client"
import { useRef, useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { SpotlightButton } from "@/components/spotlight-button"
import { Star } from "lucide-react"
import { SearchTransition } from "@/components/search-transition"
import { DashboardPreview } from "./dashboard-preview" // Import the new component

export function LandingHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showTransition, setShowTransition] = useState(false)

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value
      setSearchQuery(query)
      setShowTransition(true)
      router.push(`/influencers?q=${encodeURIComponent(query)}`)
    }
  }

  const handleSearchButtonClick = () => {
    const inputElement = document.querySelector('input[placeholder*="Find beauty"]') as HTMLInputElement
    const query = inputElement?.value || "Find beauty influencers in Los Angeles..."
    setSearchQuery(query)
    setShowTransition(true)
    router.push(`/influencers?q=${encodeURIComponent(query)}`)
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/influencers?q=${encodeURIComponent(`Find ${category.toLowerCase()} influencers`)}`)
  }

  const handleTransitionComplete = () => {
    setShowTransition(false)
  }

  return (
    <section
      ref={heroRef}
      className="landing-hero relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Sexy Navigation Bar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-2xl px-8 py-4 transition-all duration-500 hover:shadow-3xl">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-[#5A31F4] to-[#942FFF] bg-clip-text text-transparent">
            InfluAI
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Reviews", "Pricing", "FAQs", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-[#5A31F4] transition-all duration-300 relative group px-3 py-2 rounded-full hover:bg-gray-100/50"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#5A31F4] to-[#942FFF] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-[#5A31F4] transition-all duration-300 px-4 py-2 rounded-full hover:bg-gray-100/50"
            >
              Login
            </a>
            {/* Updated Signup Button */}
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-[#5A31F4] transition-all duration-300 px-4 py-2 rounded-full hover:bg-gray-100/50"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Permanent Light Beam Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic beam image always visible */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/cosmic-beam.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
        />

        {/* Removed the "Permanent light beam focused on search area" */}
        {/* Subtle floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/30 rounded-full animate-float"
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col md:flex-row items-center justify-between min-h-screen pt-32">
        {/* Left Content */}
        <div className="w-full md:w-3/5 space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Discover Top Influencers
              {/* Removed gradient from "Instantly" */}
              <span className="block text-[#5A31F4]">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              Search creators by name, niche or by AI prompt—no account needed. Connect with the perfect influencers for
              your brand in seconds.
            </p>
          </div>

          {/* Enhanced Search Bar with Permanent Light */}
          <div className="relative group max-w-2xl">
            {/* Permanent glow effect around search bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5A31F4]/20 to-[#942FFF]/20 rounded-2xl blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 rounded-2xl blur-2xl animate-pulse"></div>

            <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-500 p-2 group-hover:border-[#5A31F4]/30 hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="flex-1 px-4">
                  <Input
                    type="text"
                    placeholder="Find beauty influencers in Los Angeles..."
                    className="border-0 text-lg placeholder:text-gray-400 focus:ring-0 bg-transparent text-gray-900"
                    onKeyPress={handleSearchSubmit}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div onClick={handleSearchButtonClick}>
                  <SpotlightButton />
                </div>
              </div>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-3 max-w-2xl">
            {["Fashion", "Beauty", "Lifestyle", "Tech", "Fitness", "Food"].map((category, index) => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-6 py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gradient-to-r hover:from-[#5A31F4] hover:to-[#942FFF] hover:text-white cursor-pointer transition-all duration-500 hover:shadow-lg transform" // Removed translate-y and scale for smoother hover
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] border-3 border-white flex items-center justify-center text-white text-sm font-bold hover:scale-110 transition-transform duration-300 hover:z-10 relative shadow-lg"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900">50k+ Influencers</div>
                <div className="text-sm text-gray-600">Verified creators</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current hover:scale-125 transition-transform duration-300"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dashboard Mockup */}
        <div className="w-full md:w-2/5 mt-12 md:mt-0">
          <DashboardPreview /> {/* Integrate the dashboard preview here */}
        </div>
      </div>
      {/* Search Transition Overlay */}
      <SearchTransition isVisible={showTransition} searchQuery={searchQuery} onComplete={handleTransitionComplete} />
    </section>
  )
}
