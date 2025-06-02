import type React from "react"
import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { GoHomeButton } from "@/components/go-home-button" // Import the GoHomeButton

export default async function DashboardGroup({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen} collapsible="offcanvas">
      {" "}
      {/* Ensure collapsible is offcanvas here */}
      <AppSidebar />
      {/* SidebarInset now wraps the entire content of the dashboard group */}
      <SidebarInset className="flex flex-col flex-1 w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* You can add dynamic breadcrumbs here based on the current route */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage> {/* This can be dynamic */}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>{" "}
        {/* Wrap children in main for consistency */}
        <GoHomeButton /> {/* Add the floating button here */}
      </SidebarInset>
    </SidebarProvider>
  )
}
