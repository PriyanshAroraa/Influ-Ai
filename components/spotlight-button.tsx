"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Search } from "lucide-react"

interface SpotlightButtonProps {
  onClick?: () => void
}

export function SpotlightButton({ onClick }: SpotlightButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      button.style.setProperty("--mouse-x", `${x}px`)
      button.style.setProperty("--mouse-y", `${y}px`)
    }

    const handleMouseEnter = () => {
      button.style.setProperty("--spotlight-opacity", "1")
    }

    const handleMouseLeave = () => {
      button.style.setProperty("--spotlight-opacity", "0")
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className="spotlight-button relative overflow-hidden px-8 py-3 rounded-full bg-gray-200 text-gray-800 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 cursor-pointer"
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
          "--spotlight-opacity": "0",
        } as React.CSSProperties
      }
    >
      {/* Spotlight effect */}
      <div
        className="spotlight-glow absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 120px at var(--mouse-x) var(--mouse-y), rgba(255, 235, 59, 0.3) 0%, rgba(255, 235, 59, 0.1) 40%, transparent 70%)`,
          opacity: "var(--spotlight-opacity)",
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* Button content */}
      <Search className="h-5 w-5 relative z-10" />
      <span className="relative z-10">Find My Influencer</span>
    </button>
  )
}
