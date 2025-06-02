"use client"

import { usePathname } from "next/navigation"
import { OpenDashboardButton } from "./open-dashboard-button"

export function DashboardButtonWrapper() {
  const pathname = usePathname()

  // Only show the button on the landing page and influencers page
  const showButton = pathname === "/" || pathname === "/influencers"

  return showButton ? <OpenDashboardButton scrollThreshold={200} /> : null
}
