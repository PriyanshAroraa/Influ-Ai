"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Megaphone, FileText, CreditCard, BarChart3, Search, Shield } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    name: "Creator Discovery",
    href: "/creator-discovery",
    icon: Search,
  },
  {
    name: "Outreach",
    href: "/outreach",
    icon: FileText,
  },
  {
    name: "Contracts",
    href: "/contracts",
    icon: FileText,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    name: "Performance",
    href: "/performance",
    icon: BarChart3,
  },
  {
    name: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: Shield,
  },
  // Removed Settings and Help from navItems
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  // },
  // {
  //   name: "Help",
  //   href: "/help",
  //   icon: HelpCircle,
  // },
]

interface MainNavProps {
  className?: string
  direction?: "horizontal" | "vertical"
}

export function MainNav({ className, direction = "vertical" }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex", direction === "vertical" ? "flex-col space-y-1" : "flex-row space-x-4", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center transition-all duration-200 group",
              direction === "vertical"
                ? "px-4 py-3 text-sm font-medium rounded-xl"
                : "px-2 py-1 text-sm font-medium rounded-md",
              isActive
                ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white shadow-lg"
                : direction === "vertical"
                  ? "text-gray-600 hover:text-[#5A31F4] hover:bg-[#5A31F4]/5"
                  : "text-gray-600 hover:text-[#5A31F4] hover:bg-gray-100",
            )}
          >
            {/* Icons only for vertical navigation (sidebar) */}
            {direction === "vertical" && (
              <item.icon
                className={cn(
                  "h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-[#5A31F4]",
                )}
              />
            )}
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
