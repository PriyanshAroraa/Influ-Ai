"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Filter, ArrowUpDown, User, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([
    {
      id: "u1",
      name: "Alice Smith",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-06-10",
    },
    {
      id: "u2",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2024-06-09",
    },
    {
      id: "u3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2024-05-20",
    },
    {
      id: "u4",
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-06-11",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("lastLogin")

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((user) => filterRole === "All" || user.role === filterRole)
    .filter((user) => filterStatus === "All" || user.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "lastLogin") return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button className="rounded-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white hover:opacity-90 transition-opacity duration-300">
          <Plus className="mr-2 h-5 w-5" />
          Add New User
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            className="rounded-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5A31F4] focus:border-transparent w-full"
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
              Role: {filterRole}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterRole("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRole("Admin")}>Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRole("User")}>User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuItem onClick={() => setFilterStatus("Inactive")}>Inactive</DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => setSortBy("lastLogin")}>Last Login</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Management List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user, index) => (
          <Card
            key={user.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-gray-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">{user.name}</CardTitle>
              </div>
              <Badge
                className={`rounded-full px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(user.status)}`}
              >
                {user.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Email: <span className="font-medium text-gray-800">{user.email}</span>
              </p>
              <p className="text-sm text-gray-600">
                Role: <span className="font-medium text-gray-800">{user.role}</span>
              </p>
              <p className="text-sm text-gray-600">
                Last Login: <span className="font-medium text-gray-800">{user.lastLogin}</span>
              </p>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <Label htmlFor={`user-status-${user.id}`} className="text-sm font-medium text-gray-700">
                  Active
                </Label>
                <Switch id={`user-status-${user.id}`} checked={user.status === "Active"} />
              </div>
              <Button
                variant="outline"
                className="rounded-full w-full border-gray-300 text-gray-700 hover:bg-gray-50 mt-2"
              >
                <Settings className="mr-2 h-4 w-4" />
                Manage User
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
