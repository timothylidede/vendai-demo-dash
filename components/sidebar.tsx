"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  Route,
  BarChart3,
  CreditCard,
  Truck,
  Settings,
  FileText,
  Smartphone,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Retailers", icon: Users },
    { id: "sales", label: "Sales Team", icon: UserCheck },
    { id: "routes", label: "Routes", icon: Route },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "mobile-app", label: "Mobile Apps", icon: Smartphone },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={cn(
        "bg-gray-900/95 backdrop-blur-sm border-r border-gray-800/50 flex flex-col transition-all duration-300 flex-shrink-0",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold text-lg">v</span>
              </div>
              <div className="flex items-baseline space-x-0 min-w-0">
                <span className="text-white font-semibold text-xl">vend</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold text-xl lowercase tracking-wide">
                  ai
                </span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left transition-all duration-200 h-12",
              activeView === item.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50",
              isCollapsed && "justify-center px-2",
            )}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-6 border-t border-gray-800/50 flex-shrink-0">
          <div className="text-xs text-gray-500">
            <div className="flex items-baseline space-x-1">
              <span>vend</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold lowercase">
                ai
              </span>
            </div>
            <span>v2.4.1</span>
            <p className="mt-1">© 2025 vendai Ltd</p>
          </div>
        </div>
      )}
    </div>
  )
}
