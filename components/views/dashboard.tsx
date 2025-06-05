"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/ui/stat-card"
import {
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  Package,
  Users,
  Zap,
} from "lucide-react"

interface DashboardViewProps {
  onNavigate: (view: string, action?: string) => void; // Allow optional action parameter
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const metrics = {
    revenue: { value: "KSh 2,847,500", change: "+12.5%", trend: "up" as const },
    orders: { value: "1,247", change: "+8.2%", trend: "up" as const, pending: 23 },
    lowStock: { value: "8", change: "-2", trend: "up" as const },
    activeRoutes: { value: "12", change: "+1", trend: "up" as const },
    customers: { value: "342", change: "+15", trend: "up" as const },
    avgOrderValue: { value: "KSh 18,450", change: "+5.8%", trend: "up" as const },
  }

  const topProducts = [
    { name: "Coca Cola 500ml", sold: 2840, revenue: "KSh 284,000", trend: "+8%", stock: 450 },
    { name: "Bread - White", sold: 1920, revenue: "KSh 192,000", trend: "+15%", stock: 120 },
    { name: "Milk 1L", sold: 1650, revenue: "KSh 247,500", trend: "+5%", stock: 89 },
    { name: "Rice 2kg", sold: 1420, revenue: "KSh 213,000", trend: "+12%", stock: 67 },
  ]

  const recentOrders = [
    {
      id: "ORD-2024-001",
      customer: "Mama Mboga Store",
      amount: "KSh 15,400",
      status: "delivered",
      time: "2 hours ago",
      items: 12,
    },
    {
      id: "ORD-2024-002",
      customer: "City Supermarket",
      amount: "KSh 45,200",
      status: "processing",
      time: "4 hours ago",
      items: 28,
    },
    {
      id: "ORD-2024-003",
      customer: "Village Kiosk",
      amount: "KSh 8,750",
      status: "pending",
      time: "6 hours ago",
      items: 8,
    },
    {
      id: "ORD-2024-004",
      customer: "Metro Wholesale",
      amount: "KSh 67,300",
      status: "shipped",
      time: "8 hours ago",
      items: 45,
    },
  ]

  const salesTeam = [
    { name: "John Kamau", outlets: 42, target: 85, performance: 95, revenue: "KSh 245,000" },
    { name: "Mary Wanjiku", outlets: 38, target: 80, performance: 88, revenue: "KSh 198,000" },
    { name: "Peter Ochieng", outlets: 35, target: 75, performance: 82, revenue: "KSh 167,000" },
    { name: "Grace Muthoni", outlets: 29, target: 70, performance: 76, revenue: "KSh 134,000" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-600"
      case "processing":
        return "bg-blue-600"
      case "pending":
        return "bg-orange-600"
      case "shipped":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
      {/* Key Metrics Grid - Two Columns, Three Per Row */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <StatCard
          title="Monthly Revenue"
          value={metrics.revenue.value}
          change={metrics.revenue.change}
          trend={metrics.revenue.trend}
          icon={DollarSign}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          description="vs last month"
          className="text-sm" // Reduce font size
        />

        <StatCard
          title="Total Orders"
          value={metrics.orders.value}
          change={metrics.orders.change}
          trend={metrics.orders.trend}
          icon={ShoppingCart}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description={`${metrics.orders.pending} pending`}
          className="text-sm"
        />

        <StatCard
          title="Low Stock Items"
          value={metrics.lowStock.value}
          change={metrics.lowStock.change}
          trend={metrics.lowStock.trend}
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="requires attention"
          className="text-sm"
        />

        <StatCard
          title="Active Routes"
          value={metrics.activeRoutes.value}
          change={metrics.activeRoutes.change}
          trend={metrics.activeRoutes.trend}
          icon={MapPin}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          description="in progress"
          className="text-sm"
        />

        <StatCard
          title="Active Customers"
          value={metrics.customers.value}
          change={metrics.customers.change}
          trend={metrics.customers.trend}
          icon={Users}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
          description="this month"
          className="text-sm"
        />

        <StatCard
          title="Avg Order Value"
          value={metrics.avgOrderValue.value}
          change={metrics.avgOrderValue.change}
          trend={metrics.avgOrderValue.trend}
          icon={Zap}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          description="per transaction"
          className="text-sm"
        />
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Top Products - Takes 2 columns on XL screens */}
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Top Performing Products</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 hover:bg-gray-800"
              onClick={() => onNavigate("inventory")}
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white truncate text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-400 truncate">
                        {product.sold} units sold • {product.stock} in stock
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-semibold text-white text-sm">{product.revenue}</p>
                  <p className="text-xs text-green-400">{product.trend}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions - Takes 1 column */}
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm"
              onClick={() => onNavigate("orders", "openNewOrderModal")} // Pass the action
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Order
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800 text-sm"
              onClick={() => onNavigate("inventory")}
            >
              <Package className="h-4 w-4 mr-2" />
              Check Inventory
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800 text-sm"
              onClick={() => onNavigate("routes")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Optimize Routes
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800 text-sm"
              onClick={() => onNavigate("analytics")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800 text-sm"
              onClick={() => onNavigate("customers")}
            >
              <Users className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Orders */}
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("orders")}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-white truncate text-sm">{order.id}</h4>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-300 truncate">{order.customer}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {order.time} • {order.items} items
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-semibold text-white text-sm">{order.amount}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sales Team Performance */}
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Sales Team Performance</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("sales")}>
              Manage Team
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesTeam.map((member, index) => (
              <div key={index} className="p-3 sm:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white truncate text-sm">{member.name}</h4>
                      <p className="text-xs text-gray-400 truncate">
                        {member.outlets} outlets • {member.revenue}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400 flex-shrink-0 ml-2">
                    {member.performance}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="truncate">Target: {member.target} outlets</span>
                  <span className="flex-shrink-0 ml-2">{member.performance}% achieved</span>
                </div>
                <Progress value={member.performance} className="h-2 bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}