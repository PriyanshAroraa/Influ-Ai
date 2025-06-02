"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Filter, ArrowUpDown, DollarSign, CalendarDays, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: "p1",
      influencer: "Sarah Chen",
      campaign: "Summer Fashion Collab",
      amount: "$5,000",
      status: "Paid",
      date: "2024-08-31",
      method: "Bank Transfer",
    },
    {
      id: "p2",
      influencer: "Alex Rodriguez",
      campaign: "Tech Gadget Launch",
      amount: "$10,000",
      status: "Pending",
      date: "2024-09-30",
      method: "PayPal",
    },
    {
      id: "p3",
      influencer: "Priya Sharma",
      campaign: "Healthy Living Series",
      amount: "$4,000",
      status: "Paid",
      date: "2024-05-31",
      method: "Stripe",
    },
    {
      id: "p4",
      influencer: "Marcus Johnson",
      campaign: "Travel Vlog Partnership",
      amount: "$6,000",
      status: "Overdue",
      date: "2024-07-20",
      method: "Bank Transfer",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("date")

  const filteredPayments = payments
    .filter(
      (payment) =>
        payment.influencer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.method.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((payment) => filterStatus === "All" || payment.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "amount")
        return (
          Number.parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) - Number.parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
        )
      return 0
    })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <Button className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300 rounded-full">
          <Plus className="mr-2 h-5 w-5" />
          Record New Payment
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search payments..."
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
            <DropdownMenuItem onClick={() => setFilterStatus("Paid")}>Paid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Overdue")}>Overdue</DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => setSortBy("date")}>Date</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("amount")}>Amount</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Payment List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPayments.map((payment) => (
          <Card
            key={payment.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">{payment.influencer}</CardTitle>
              </div>
              <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(payment.status)}`}>
                {payment.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Campaign: <span className="font-medium text-gray-800">{payment.campaign}</span>
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="mr-2 h-4 w-4" />
                Amount: <span className="font-medium ml-1 text-gray-800">{payment.amount}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarDays className="mr-2 h-4 w-4" />
                Due Date: <span className="font-medium ml-1 text-gray-800">{payment.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2 h-4 w-4" />
                Method: <span className="font-medium ml-1 text-gray-800">{payment.method}</span>
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
