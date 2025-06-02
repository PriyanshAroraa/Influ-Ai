"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Filter, ArrowUpDown, CalendarDays, Users, DollarSign, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "c1",
      name: "Summer Fashion Collab",
      status: "Active",
      type: "Beauty",
      budget: "$10,000",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      influencers: 15,
      engagement: "5.2%",
    },
    {
      id: "c2",
      name: "Tech Gadget Launch",
      status: "Pending",
      type: "Technology",
      budget: "$25,000",
      startDate: "2024-07-15",
      endDate: "2024-09-30",
      influencers: 8,
      engagement: "7.1%",
    },
    {
      id: "c3",
      name: "Healthy Living Series",
      status: "Completed",
      type: "Fitness",
      budget: "$8,000",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      influencers: 10,
      engagement: "4.8%",
    },
    {
      id: "c4",
      name: "Travel Vlog Partnership",
      status: "Active",
      type: "Lifestyle",
      budget: "$12,000",
      startDate: "2024-06-10",
      endDate: "2024-07-20",
      influencers: 5,
      engagement: "6.5%",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const filteredCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((campaign) => filterStatus === "All" || campaign.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "startDate") return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      if (sortBy === "influencers") return a.influencers - b.influencers
      return 0
    })

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <Button className="rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300">
          <Plus className="mr-2 h-5 w-5" />
          Create New Campaign
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search campaigns..."
            className="rounded-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#5A31F4] focus:border-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              Status: {filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>Completed</DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("startDate")}>Start Date</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("influencers")}>Influencers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Campaign List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">{campaign.name}</CardTitle>
              <Badge
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  campaign.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : campaign.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {campaign.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{campaign.type} Campaign</p>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="mr-2 h-4 w-4" />
                {campaign.startDate} - {campaign.endDate}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-2 h-4 w-4" />
                {campaign.influencers} Influencers
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <DollarSign className="mr-2 h-4 w-4" />
                Budget: {campaign.budget}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare className="mr-2 h-4 w-4" />
                Avg. Engagement: {campaign.engagement}
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="rounded-full w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
