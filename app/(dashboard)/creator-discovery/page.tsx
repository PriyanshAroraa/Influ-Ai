"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, ArrowUpDown, Users, Heart, Eye, Star, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function CreatorDiscoveryPage() {
  const [creators, setCreators] = useState([
    {
      id: "c1",
      name: "Sarah Chen",
      handle: "@sarahchen_official",
      category: "Beauty",
      followers: "2.4M",
      engagementRate: "5.2%",
      avgViews: "1.2M",
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c2",
      name: "Alex Rodriguez",
      handle: "@tech_alex",
      category: "Technology",
      followers: "1.8M",
      engagementRate: "7.1%",
      avgViews: "900K",
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c3",
      name: "Priya Sharma",
      handle: "@priya_lifestyle",
      category: "Lifestyle",
      followers: "3.2M",
      engagementRate: "4.8%",
      avgViews: "1.5M",
      rating: 4.7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c4",
      name: "Marcus Johnson",
      handle: "@fit_marcus",
      category: "Fitness",
      followers: "1.5M",
      engagementRate: "6.5%",
      avgViews: "800K",
      rating: 4.6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c5",
      name: "Jessica Lee",
      handle: "@jessica_foodie",
      category: "Food",
      followers: "1.1M",
      engagementRate: "6.0%",
      avgViews: "750K",
      rating: 4.5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c6",
      name: "David Kim",
      handle: "@gaming_david",
      category: "Gaming",
      followers: "2.0M",
      engagementRate: "5.5%",
      avgViews: "1.1M",
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortBy, setSortBy] = useState("followers")

  const filteredCreators = creators
    .filter(
      (creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((creator) => filterCategory === "All" || creator.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "followers") return Number.parseFloat(b.followers) - Number.parseFloat(a.followers)
      if (sortBy === "engagementRate") return Number.parseFloat(b.engagementRate) - Number.parseFloat(a.engagementRate)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Creator Discovery</h1>
        <Button className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300 rounded-full">
          <Plus className="mr-2 h-5 w-5" />
          Add New Creator
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search creators by name, handle, or niche..."
            className="pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#5A31F4] focus:border-transparent w-full rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
            >
              <Filter className="h-5 w-5" />
              Category: {filterCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterCategory("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Beauty")}>Beauty</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Technology")}>Technology</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Lifestyle")}>Lifestyle</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Fitness")}>Fitness</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Food")}>Food</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCategory("Gaming")}>Gaming</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowUpDown className="h-5 w-5" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("followers")}>Followers</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("engagementRate")}>Engagement Rate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Creator List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCreators.map((creator, i) => (
          <Card
            key={creator.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage alt="Avatar" src={creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{creator.name}</CardTitle>
                  <p className="text-sm text-gray-500">{creator.handle}</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {creator.category}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                Followers: <span className="font-medium ml-1 text-gray-800">{creator.followers}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Heart className="mr-2 h-4 w-4" />
                Engagement: <span className="font-medium ml-1 text-gray-800">{creator.engagementRate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Eye className="mr-2 h-4 w-4" />
                Avg. Views: <span className="font-medium ml-1 text-gray-800">{creator.avgViews}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="mr-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                Rating: <span className="font-medium ml-1 text-gray-800">{creator.rating}</span>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
