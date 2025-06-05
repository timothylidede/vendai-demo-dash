"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, Settings, LogOut, HelpCircle } from "lucide-react"

interface HeaderProps {
  activeView: string
}

export function Header({ activeView }: HeaderProps) {
  const getViewTitle = (view: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      inventory: "Inventory Management",
      orders: "Order Management",
      customers: "Customer Management",
      sales: "Sales Team",
      routes: "Route Optimization",
      analytics: "Business Analytics",
      billing: "Billing & Payments",
      delivery: "Delivery Management",
      settings: "Settings",
      reports: "Reports & Analytics",
      "mobile-app": "Mobile Applications",
      "ai-insights": "AI Insights",
    }
    return titles[view] || "vendAI"
  }

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between min-w-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-semibold text-white truncate">
            {getViewTitle(activeView)}
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5 hidden sm:block">
            Helping you run your business smarter, one decision at a time.
          </p>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-12 w-72 h-10 text-sm bg-gray-800/50 border-gray-700 focus:border-blue-500 rounded-xl"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-800/50 rounded-xl p-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-[10px] font-medium">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-700 rounded-xl">
              <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-3">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">Low stock alert</p>
                  <p className="text-[11px] text-gray-400">Coca Cola 500ml running low</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-3">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-[11px] text-gray-400">Order #ORD-2024-008 from City Supermarket</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-3">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">Route optimization complete</p>
                  <p className="text-[11px] text-gray-400">New route suggestions available</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-800/50 rounded-xl p-2 sm:p-3">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">JK</span>
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Kamau</p>
                  <p className="text-[11px] text-gray-400 truncate">Administrator</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-gray-700 rounded-xl">
              <DropdownMenuLabel className="text-base">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-2">
                <User className="mr-3 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-2">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 px-4 py-2">
                <HelpCircle className="mr-3 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="hover:bg-gray-800 text-red-400 px-4 py-2">
                <LogOut className="mr-3 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
