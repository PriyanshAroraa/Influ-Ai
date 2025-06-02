"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Filter, ArrowUpDown, FileText, CalendarDays, DollarSign } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ContractsPage() {
  const [contracts, setContracts] = useState([
    {
      id: "con1",
      name: "Sarah Chen - Summer Fashion",
      status: "Signed",
      influencer: "Sarah Chen",
      campaign: "Summer Fashion Collab",
      value: "$5,000",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
    },
    {
      id: "con2",
      name: "Alex Rodriguez - Tech Launch",
      status: "Pending",
      influencer: "Alex Rodriguez",
      campaign: "Tech Gadget Launch",
      value: "$10,000",
      startDate: "2024-07-15",
      endDate: "2024-09-30",
    },
    {
      id: "con3",
      name: "Priya Sharma - Healthy Living",
      status: "Draft",
      influencer: "Priya Sharma",
      campaign: "Healthy Living Series",
      value: "$4,000",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
    },
    {
      id: "con4",
      name: "Marcus Johnson - Travel Vlog",
      status: "Signed",
      influencer: "Marcus Johnson",
      campaign: "Travel Vlog Partnership",
      value: "$6,000",
      startDate: "2024-06-10",
      endDate: "2024-07-20",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("startDate")

  const filteredContracts = contracts
    .filter(
      (contract) =>
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.influencer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.campaign.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((contract) => filterStatus === "All" || contract.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "startDate") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      if (sortBy === "value")
        return (
          Number.parseFloat(b.value.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(a.value.replace(/[^0-9.-]+/g, ""))
        )
      return 0
    })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Signed":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Draft":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contracts</h1>
        <Button className="rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300">
          <Plus className="mr-2 h-5 w-5" />
          Create New Contract
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search contracts..."
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
            <DropdownMenuItem onClick={() => setFilterStatus("Signed")}>Signed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Draft")}>Draft</DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => setSortBy("startDate")}>Start Date</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("value")}>Value</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Contract List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredContracts.map((contract) => (
          <Card
            key={contract.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">{contract.name}</CardTitle>
              </div>
              <Badge className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(contract.status)}`}>
                {contract.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Influencer: <span className="font-medium text-gray-800">{contract.influencer}</span>
              </p>
              <p className="text-sm text-gray-600">
                Campaign: <span className="font-medium text-gray-800">{contract.campaign}</span>
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="mr-2 h-4 w-4" />
                Value: <span className="font-medium ml-1 text-gray-800">{contract.value}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarDays className="mr-2 h-4 w-4" />
                Dates:{" "}
                <span className="font-medium ml-1 text-gray-800">
                  {contract.startDate} - {contract.endDate}
                </span>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="rounded-full w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                View Contract
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
