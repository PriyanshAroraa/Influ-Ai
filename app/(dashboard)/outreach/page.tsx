"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Filter, ArrowUpDown, Mail, Phone, MessageSquare, CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function OutreachPage() {
  const [outreachRecords, setOutreachRecords] = useState([
    {
      id: "o1",
      influencer: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Summer Fashion Collab",
      method: "Email",
      status: "Sent",
      lastContact: "2024-06-05",
      nextAction: "Follow-up",
    },
    {
      id: "o2",
      influencer: { name: "Alex Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Tech Gadget Launch",
      method: "Call",
      status: "Replied",
      lastContact: "2024-07-10",
      nextAction: "Schedule Meeting",
    },
    {
      id: "o3",
      influencer: { name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Healthy Living Series",
      method: "DM",
      status: "Pending",
      lastContact: "2024-03-10",
      nextAction: "Send Reminder",
    },
    {
      id: "o4",
      influencer: { name: "Marcus Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      campaign: "Travel Vlog Partnership",
      method: "Email",
      status: "Not Interested",
      lastContact: "2024-06-15",
      nextAction: "Archive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("lastContact")

  const filteredRecords = outreachRecords
    .filter(
      (record) =>
        record.influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.method.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((record) => filterStatus === "All" || record.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "lastContact") return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
      if (sortBy === "influencer") return a.influencer.name.localeCompare(b.influencer.name)
      return 0
    })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Sent":
        return "bg-blue-100 text-blue-700"
      case "Replied":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Not Interested":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Email":
        return <Mail className="h-4 w-4" />
      case "Call":
        return <Phone className="h-4 w-4" />
      case "DM":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Outreach Management</h1>
        <Button className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300 rounded-full">
          <Plus className="mr-2 h-5 w-5" />
          Log New Outreach
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by influencer or campaign..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#5A31F4] focus:border-transparent w-full"
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
              Status: {filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterStatus("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Sent")}>Sent</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Replied")}>Replied</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Not Interested")}>Not Interested</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
            >
              <ArrowUpDown className="h-5 w-5" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("lastContact")}>Last Contact</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("influencer")}>Influencer Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Outreach List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecords.map((record) => (
          <Card
            key={record.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="Avatar" src={record.influencer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {record.influencer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{record.influencer.name}</CardTitle>
                  <p className="text-sm text-gray-500">{record.campaign}</p>
                </div>
              </div>
              <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(record.status)}`}>
                {record.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                {getMethodIcon(record.method)}
                <span className="ml-2">
                  Method: <span className="font-medium text-gray-800">{record.method}</span>
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarDays className="mr-2 h-4 w-4" />
                Last Contact: <span className="font-medium ml-1 text-gray-800">{record.lastContact}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageSquare className="mr-2 h-4 w-4" />
                Next Action: <span className="font-medium ml-1 text-gray-800">{record.nextAction}</span>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
