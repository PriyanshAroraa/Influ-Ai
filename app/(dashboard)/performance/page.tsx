"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, ArrowUpDown, LineChart, BarChart, TrendingUp, Users, DollarSign } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function PerformancePage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "p1",
      name: "Summer Fashion Collab",
      impressions: "1.2M",
      reach: "950K",
      engagementRate: "5.2%",
      conversions: 1200,
      roi: "150%",
    },
    {
      id: "p2",
      name: "Tech Gadget Launch",
      impressions: "2.5M",
      reach: "1.8M",
      engagementRate: "7.1%",
      conversions: 3500,
      roi: "220%",
    },
    {
      id: "p3",
      name: "Healthy Living Series",
      impressions: "800K",
      reach: "600K",
      engagementRate: "4.8%",
      conversions: 800,
      roi: "110%",
    },
    {
      id: "p4",
      name: "Travel Vlog Partnership",
      impressions: "1.5M",
      reach: "1.1M",
      engagementRate: "6.5%",
      conversions: 1800,
      roi: "180%",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterMetric, setFilterMetric] = useState("All")
  const [sortBy, setSortBy] = useState("impressions")

  const filteredCampaigns = campaigns
    .filter((campaign) => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "impressions") return Number.parseFloat(b.impressions) - Number.parseFloat(a.impressions)
      if (sortBy === "engagementRate") return Number.parseFloat(b.engagementRate) - Number.parseFloat(a.engagementRate)
      if (sortBy === "conversions") return b.conversions - a.conversions
      if (sortBy === "roi") return Number.parseFloat(b.roi) - Number.parseFloat(a.roi)
      return 0
    })

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <Button className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300 rounded-full">
          <LineChart className="mr-2 h-5 w-5" />
          Generate Report
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search campaigns..."
            className="pl-4 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#5A31F4] focus:border-transparent w-full"
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
              Metric: {filterMetric}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterMetric("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMetric("Impressions")}>Impressions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMetric("Engagement Rate")}>Engagement Rate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMetric("Conversions")}>Conversions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterMetric("ROI")}>ROI</DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => setSortBy("impressions")}>Impressions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("engagementRate")}>Engagement Rate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("conversions")}>Conversions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("roi")}>ROI</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCampaigns.map((campaign, index) => (
          <Card
            key={campaign.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <LineChart className="h-6 w-6 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">{campaign.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                Impressions: <span className="font-medium ml-1 text-gray-800">{campaign.impressions}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart className="mr-2 h-4 w-4" />
                Reach: <span className="font-medium ml-1 text-gray-800">{campaign.reach}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="mr-2 h-4 w-4" />
                Engagement Rate: <span className="font-medium ml-1 text-gray-800">{campaign.engagementRate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="mr-2 h-4 w-4" />
                Conversions: <span className="font-medium ml-1 text-gray-800">{campaign.conversions}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="mr-2 h-4 w-4" />
                ROI: <span className="font-medium ml-1 text-gray-800">{campaign.roi}</span>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
