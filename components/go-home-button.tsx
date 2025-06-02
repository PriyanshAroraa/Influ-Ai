"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Rocket } from "lucide-react"
import { usePathname } from "next/navigation"

export function GoHomeButton() {
  const pathname = usePathname()

  // Only show this button on dashboard pages, not on the landing or influencers page
  // This checks if the path is NOT '/' and NOT '/influencers'
  const isDashboardOrOtherPage = pathname !== "/" && pathname !== "/influencers"

  if (!isDashboardOrOtherPage) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Link href="/" passHref>
        <Button className="rounded-full shadow-lg px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-all duration-300 hover:scale-105">
          <Rocket className="mr-2 h-5 w-5" />
          Launch App
        </Button>
      </Link>
    </div>
  )
}
