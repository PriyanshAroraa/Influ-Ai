"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar" // Import SidebarTrigger

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-100 bg-white px-4 shadow-sm md:px-6">
      {/* Sidebar Trigger (Burger Menu) - Always visible to toggle sidebar */}
      <SidebarTrigger className="h-8 w-8" />

      {/* Logo/Title */}
      <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <span className="text-2xl font-bold bg-gradient-to-r from-[#5A31F4] to-[#942FFF] bg-clip-text text-transparent">
          InfluAI
        </span>
      </Link>

      {/* Search Bar - Hidden on small screens, visible on medium and up */}
      <div className="relative ml-auto flex-1 md:grow-0 hidden md:block">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-gray-100 pl-8 md:w-[200px] lg:w-[336px] focus-visible:ring-[#5A31F4]"
        />
      </div>

      {/* User/Auth Buttons - Example, can be replaced with actual user menu */}
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="rounded-full" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  )
}
