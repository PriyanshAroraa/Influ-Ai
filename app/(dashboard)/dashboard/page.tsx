"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Subscriptions Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Subscriptions</CardTitle>
            <Users className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+2350</div>
            <p className="text-xs text-gray-500">+180.1% from last month</p>
          </CardContent>
        </Card>

        {/* Sales Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Sales</CardTitle>
            <CreditCard className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+12,234</div>
            <p className="text-xs text-gray-500">+19% from last month</p>
          </CardContent>
        </Card>

        {/* Active Now Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 p-6 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active Now</CardTitle>
            <Activity className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+573</div>
            <p className="text-xs text-gray-500">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns and Top Influencers */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Campaigns Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    AD
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Summer Fashion Ad</p>
                    <p className="text-sm text-gray-500">Beauty & Lifestyle</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-full">
                  Active
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    TG
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tech Gadget Launch</p>
                    <p className="text-sm text-gray-500">Technology</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full">
                  Pending
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-medium">
                    FS
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Fitness Series</p>
                    <p className="text-sm text-gray-500">Health & Fitness</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 rounded-full">
                  Completed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Influencers Card */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Top Influencers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Avatar" src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Chen</p>
                    <p className="text-sm text-gray-500">Beauty | 2.4M followers</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full"
                >
                  View
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Avatar" src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Alex Rodriguez</p>
                    <p className="text-sm text-gray-500">Tech | 1.8M followers</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full"
                >
                  View
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Avatar" src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Lifestyle | 3.2M followers</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full"
                >
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Progress */}
      <Card className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-xl"></div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Campaign Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Summer Fashion Ad</p>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-blue-100 [&>*]:bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Tech Gadget Launch</p>
                <span className="text-sm font-medium text-gray-900">40%</span>
              </div>
              <Progress value={40} className="h-2 bg-purple-100 [&>*]:bg-purple-500" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Fitness Series</p>
                <span className="text-sm font-medium text-gray-900">100%</span>
              </div>
              <Progress value={100} className="h-2 bg-green-100 [&>*]:bg-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
