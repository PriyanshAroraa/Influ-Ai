"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { SpotlightButton } from "@/components/spotlight-button"
import { Input } from "@/components/ui/input"
import { Star, Sparkles } from "lucide-react"
import { SearchTransition } from "@/components/search-transition"

export function CosmicHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // Check for animation support
    const supportsTransform = CSS.supports("transform", "translate3d(0,0,0)")
    const supportsFilter = CSS.supports("filter", "brightness(1)")

    if (!supportsTransform || !supportsFilter) {
      setIsSupported(false)
      return
    }

    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      animationId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Normalize coordinates (0-1)
        const normalizedX = x / rect.width
        const normalizedY = y / rect.height

        // Calculate parallax offsets
        const parallaxStrength1 = 30 // Top layer
        const parallaxStrength2 = 20 // Bottom layer

        const offsetX1 = (normalizedX - 0.5) * parallaxStrength1
        const offsetY1 = (normalizedY - 0.5) * parallaxStrength1

        const offsetX2 = (normalizedX - 0.5) * -parallaxStrength2
        const offsetY2 = (normalizedY - 0.5) * -parallaxStrength2

        // Update CSS custom properties
        hero.style.setProperty("--mouse-x", `${x}px`)
        hero.style.setProperty("--mouse-y", `${y}px`)
        hero.style.setProperty("--parallax-x1", `${offsetX1}px`)
        hero.style.setProperty("--parallax-y1", `${offsetY1}px`)
        hero.style.setProperty("--parallax-x2", `${offsetX2}px`)
        hero.style.setProperty("--parallax-y2", `${offsetY2}px`)
        hero.style.setProperty("--brightness", "1.2")
      })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
      hero.style.setProperty("--glow-opacity", "0.6")
      hero.style.setProperty("--beam-opacity", "0.6")
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      hero.style.setProperty("--glow-opacity", "0")
      hero.style.setProperty("--beam-opacity", "0")
      hero.style.setProperty("--brightness", "1")

      // Reset parallax
      hero.style.setProperty("--parallax-x1", "0px")
      hero.style.setProperty("--parallax-y1", "0px")
      hero.style.setProperty("--parallax-x2", "0px")
      hero.style.setProperty("--parallax-y2", "0px")
    }

    hero.addEventListener("mousemove", handleMouseMove)
    hero.addEventListener("mouseenter", handleMouseEnter)
    hero.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove)
      hero.removeEventListener("mouseenter", handleMouseEnter)
      hero.removeEventListener("mouseleave", handleMouseLeave)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value
      setSearchQuery(query)
      setShowTransition(true)
    }
  }

  const handleSearchButtonClick = () => {
    const inputElement = document.querySelector('input[placeholder*="Find beauty"]') as HTMLInputElement
    const query = inputElement?.value || "Find beauty influencers in Los Angeles..."
    setSearchQuery(query)
    setShowTransition(true)
  }

  const handleTransitionComplete = () => {
    setShowTransition(false)
  }

  return (
    <section
      ref={heroRef}
      className={`cosmic-hero relative w-full min-h-screen overflow-hidden ${
        isSupported ? "cosmic-hero-interactive" : "cosmic-hero-fallback"
      }`}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--glow-opacity": "0",
          "--beam-opacity": "0",
          "--parallax-x1": "0px",
          "--parallax-y1": "0px",
          "--parallax-x2": "0px",
          "--parallax-y2": "0px",
          "--brightness": "1",
        } as React.CSSProperties
      }
    >
      {/* Background Layers */}
      <div className="cosmic-background">
        {/* Base cosmic image */}
        <div className="cosmic-layer cosmic-layer-base" />

        {/* Parallax Layer 1 (Top) */}
        <div className="cosmic-layer cosmic-layer-1" />

        {/* Parallax Layer 2 (Bottom) */}
        <div className="cosmic-layer cosmic-layer-2" />

        {/* Cosmic beam image that appears on hover */}
        <div className="cosmic-beam" />

        {/* Cursor tracking glow - much brighter */}
        <div className="cosmic-glow" />

        {/* Brightness reveal overlay */}
        <div className="cosmic-reveal" />
      </div>

      {/* Cosmic Text Banner */}
      <div className="absolute top-20 left-0 right-0 z-10 cosmic-text-banner py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-white/90">
            <Sparkles className="h-5 w-5 text-purple-300 animate-pulse" />
            <span className="text-sm md:text-base font-medium">
              ✨ Experience the cosmic portal - Move your cursor to reveal the light beam
            </span>
            <Sparkles className="h-5 w-5 text-blue-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center pt-32">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:scale-105 transition-transform duration-300 animate-bounce-gentle animate-pulse-glow">
            🚀 AI-Powered Discovery
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Discover Top Influencers
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Instantly
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Search creators by name, niche or by AI prompt—no account needed. Connect with the perfect influencers for
            your brand in seconds.
          </p>

          {/* Search Bar */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 p-2 group-hover:border-white/30 group-hover:animate-pulse-glow">
              <div className="flex items-center">
                <div className="flex-1 px-4">
                  <Input
                    type="text"
                    placeholder="Find beauty influencers in Los Angeles..."
                    className="border-0 text-lg placeholder:text-white/60 focus:ring-0 bg-transparent text-white"
                    onKeyPress={handleSearchSubmit}
                  />
                </div>
                <SpotlightButton onClick={handleSearchButtonClick} />
              </div>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {["Fashion", "Beauty", "Lifestyle", "Tech", "Fitness", "Food"].map((category, index) => (
              <div
                key={category}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:scale-105 transform border border-white/20 hover:animate-pulse-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-3 border-white/20 flex items-center justify-center text-white text-sm font-bold hover:scale-110 transition-transform duration-300 hover:z-10 relative backdrop-blur-sm hover:animate-pulse-glow"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold text-white">50k+ Influencers</div>
                <div className="text-sm text-white/60">Verified creators</div>
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
                <div className="font-semibold text-white">4.9/5</div>
                <div className="text-sm text-white/60">User rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center hover:animate-pulse-glow transition-all duration-300">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Search Transition Overlay */}
      <SearchTransition isVisible={showTransition} searchQuery={searchQuery} onComplete={handleTransitionComplete} />
    </section>
  )
}
