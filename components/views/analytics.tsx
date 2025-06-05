"use client"

import { useState, useEffect } from "react"
import type { JSX } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Target,
  Zap,
  Download,
  Filter,
  Brain,
  AlertTriangle,
  CheckCircle,
  MapPin,
  PieChart,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  TrendingDownIcon,
} from "lucide-react"

// Enhanced KPI Card Component
type KPICardProps = {
  title: string
  current: string
  previous: string
  change: string
  trend: "up" | "down"
  target?: string
  achievement?: number
  icon: React.ElementType
  gradient: string
  isSelected: boolean
  onClick: () => void
}

const KPICard = ({
  title,
  current,
  previous,
  change,
  trend,
  target,
  achievement,
  icon: Icon,
  gradient,
  isSelected,
  onClick,
}: KPICardProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [current])

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isSelected
          ? "ring-2 ring-blue-500/50 bg-gray-900/80 border-blue-600/50"
          : "bg-gray-900/50 border-gray-800/50 hover:border-blue-600/30"
      } backdrop-blur-sm`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-400" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
              {change}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
            <p
              className={`text-2xl font-bold text-white transition-all duration-500 ${isAnimating ? "scale-110" : ""}`}
            >
              {current}
            </p>
            <p className="text-xs text-gray-500">vs {previous} last period</p>
          </div>

          {target && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Target: {target}</span>
                <span className="text-blue-400 font-medium">{achievement}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${achievement}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// AI Insight Card Component
type AIInsight = {
  type: string
  title: string
  description: string
  impact: string
  confidence: number
  icon: React.ElementType
  color: string
  bgColor: string
}

const AIInsightCard = ({
  insight,
  index,
}: {
  insight: AIInsight
  index: number
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div
        className={`p-6 ${insight.bgColor} rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm`}
      >
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <insight.icon className={`h-6 w-6 ${insight.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{insight.title}</h4>
              <Badge variant="outline" className="text-xs bg-gray-800/50 border-gray-600">
                {insight.confidence}% confidence
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{insight.description}</p>
            <div className="flex items-center justify-between">
              <p className={`text-sm font-bold ${insight.color}`}>{insight.impact}</p>
              <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-700/50">
                <Eye className="h-3 w-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Chart Placeholder Component
const AnimatedChart = ({
  title,
  icon: Icon,
  color,
  data,
  type = "line",
}: {
  title: string
  icon: React.ElementType
  color: string
  data?: { primary?: string; secondary?: string }
  type?: "line" | "bar" | "pie"
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} animate-pulse opacity-20`}></div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id={`grid-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
        </svg>
      </div>

      {/* Mock chart lines/bars */}
      {isLoaded && type === "line" && (
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 20 180 Q 80 120 140 140 T 260 100"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 20 200 Q 80 160 140 170 T 260 130"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      )}

      {isLoaded && type === "bar" && (
        <div className="absolute inset-4 flex items-end justify-around">
          {[40, 60, 80, 45, 70, 55, 85].map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t animate-pulse"
              style={{
                height: `${height}%`,
                width: "12%",
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={`text-center z-10 transition-all duration-500 ${isLoaded ? "scale-100" : "scale-90"}`}>
        <Icon
          className={`h-12 w-12 mx-auto mb-3 ${color.includes("blue") ? "text-blue-500" : color.includes("green") ? "text-green-500" : color.includes("purple") ? "text-purple-500" : "text-orange-500"}`}
        />
        <p className="text-gray-300 font-medium">{title}</p>
        {data && (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-400">{data.primary}</p>
            <p className="text-xs text-gray-500">{data.secondary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AnalyticsView() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const kpiData = {
    revenue: {
      current: "KSh 2,847,500",
      previous: "KSh 2,456,200",
      change: "+15.9%",
      trend: "up",
      target: "KSh 3,000,000",
      achievement: 94.9,
    },
    orders: {
      current: "1,247",
      previous: "1,089",
      change: "+14.5%",
      trend: "up",
      target: "1,300",
      achievement: 95.9,
    },
    customers: {
      current: "342",
      previous: "318",
      change: "+7.5%",
      trend: "up",
      target: "350",
      achievement: 97.7,
    },
    avgOrderValue: {
      current: "KSh 18,450",
      previous: "KSh 17,230",
      change: "+7.1%",
      trend: "up",
      target: "KSh 20,000",
      achievement: 92.3,
    },
  }

  const aiInsights = [
    {
      type: "opportunity",
      title: "Revenue Opportunity Detected",
      description:
        "Westlands territory shows 23% higher order values. Consider expanding coverage to maximize revenue potential.",
      impact: "Potential +KSh 145,000/month",
      confidence: 87,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-600/10",
    },
    {
      type: "warning",
      title: "Inventory Risk Alert",
      description:
        "Coca Cola 500ml stock will run out in 3 days based on current demand trends and consumption patterns.",
      impact: "Risk of KSh 89,000 lost sales",
      confidence: 94,
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    },
    {
      type: "optimization",
      title: "Route Efficiency Improvement",
      description: "AI suggests combining CBD and Westlands routes for optimal fuel savings and reduced delivery time.",
      impact: "Save KSh 12,400/month",
      confidence: 91,
      icon: MapPin,
      color: "text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-600/10",
    },
    {
      type: "trend",
      title: "Customer Behavior Pattern",
      description: "Modern Trade customers order 34% more on Fridays. Optimize inventory and staffing accordingly.",
      impact: "Increase revenue by 8%",
      confidence: 89,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
    },
  ]

  const performanceMetrics = [
    {
      category: "Sales Performance",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      metrics: [
        { name: "Total Revenue", value: "KSh 2,847,500", change: "+15.9%", trend: "up" },
        { name: "Orders Completed", value: "1,247", change: "+14.5%", trend: "up" },
        { name: "Average Order Value", value: "KSh 18,450", change: "+7.1%", trend: "up" },
        { name: "Conversion Rate", value: "68.4%", change: "+3.2%", trend: "up" },
      ],
    },
    {
      category: "Customer Analytics",
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      metrics: [
        { name: "Active Customers", value: "342", change: "+7.5%", trend: "up" },
        { name: "New Customers", value: "24", change: "+12.0%", trend: "up" },
        { name: "Customer Retention", value: "89.2%", change: "+2.1%", trend: "up" },
        { name: "Customer Lifetime Value", value: "KSh 156,780", change: "+9.3%", trend: "up" },
      ],
    },
    {
      category: "Operational Efficiency",
      icon: Zap,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      metrics: [
        { name: "Route Efficiency", value: "87.5%", change: "+5.2%", trend: "up" },
        { name: "Delivery Success Rate", value: "96.8%", change: "+1.4%", trend: "up" },
        { name: "Inventory Turnover", value: "12.3x", change: "+8.7%", trend: "up" },
        { name: "Cost per Delivery", value: "KSh 450", change: "-12.3%", trend: "up" },
      ],
    },
    {
      category: "Financial Health",
      icon: BarChart3,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      metrics: [
        { name: "Gross Margin", value: "34.2%", change: "+2.1%", trend: "up" },
        { name: "Operating Margin", value: "18.7%", change: "+1.8%", trend: "up" },
        { name: "Cash Flow", value: "KSh 456,780", change: "+22.4%", trend: "up" },
        { name: "ROI", value: "28.9%", change: "+4.2%", trend: "up" },
      ],
    },
  ]

  const topProducts = [
    { name: "Coca Cola 500ml", revenue: "KSh 284,000", units: 2840, growth: "+8.2%", margin: "32%", trend: "up" },
    { name: "Bread - White", revenue: "KSh 192,000", units: 1920, growth: "+15.1%", margin: "28%", trend: "up" },
    { name: "Milk 1L", revenue: "KSh 247,500", units: 1650, growth: "+5.3%", margin: "35%", trend: "up" },
    { name: "Rice 2kg", revenue: "KSh 213,000", units: 1420, growth: "+12.7%", margin: "30%", trend: "up" },
    { name: "Cooking Oil 1L", revenue: "KSh 178,900", units: 1230, growth: "+18.4%", margin: "25%", trend: "up" },
  ]

  const territoryPerformance = [
    { territory: "CBD", revenue: "KSh 567,890", orders: 234, growth: "+12.4%", efficiency: "92%", trend: "up" },
    { territory: "Westlands", revenue: "KSh 489,560", orders: 198, growth: "+18.7%", efficiency: "89%", trend: "up" },
    { territory: "Eastlands", revenue: "KSh 423,780", orders: 187, growth: "+8.9%", efficiency: "85%", trend: "up" },
    {
      territory: "Industrial Area",
      revenue: "KSh 678,900",
      orders: 156,
      growth: "+22.1%",
      efficiency: "94%",
      trend: "up",
    },
    { territory: "South Route", revenue: "KSh 345,670", orders: 143, growth: "+6.2%", efficiency: "87%", trend: "up" },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setAnimationKey((prev) => prev + 1)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  interface TrendIconProps {
    trend: "up" | "down"
  }

  const getTrendIcon = (trend: TrendIconProps["trend"]): JSX.Element => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-400" />
    ) : (
      <TrendingDownIcon className="h-4 w-4 text-red-400" />
    )
  }

  interface TrendColorProps {
    trend: "up" | "down"
  }

  const getTrendColor = (trend: TrendColorProps["trend"]): string => {
    return trend === "up" ? "text-green-400" : "text-red-400"
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden" key={animationKey}>
      {/* Enhanced Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
            Business Intelligence
          </h2>
          <p className="text-gray-400 flex items-center">
            <Brain className="h-4 w-4 mr-2 text-purple-400" />
            AI-powered insights and analytics for data-driven decisions
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced AI Insights Section */}
      <Card className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border-purple-800/50 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-purple-400 animate-pulse" />
            AI-Powered Business Insights
            <Badge className="ml-3 bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">Real-time</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <AIInsightCard key={index} insight={insight} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(kpiData).map(([key, data]) => (
          <KPICard
            key={key}
            title={
              key === "revenue"
                ? "Total Revenue"
                : key === "orders"
                  ? "Orders Completed"
                  : key === "customers"
                    ? "Active Customers"
                    : "Avg Order Value"
            }
            current={data.current}
            previous={data.previous}
            change={data.change}
            trend={data.trend as "up" | "down"}
            target={data.target}
            achievement={data.achievement}
            icon={
              key === "revenue" ? DollarSign : key === "orders" ? ShoppingCart : key === "customers" ? Users : Target
            }
            gradient={
              key === "revenue"
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : key === "orders"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                  : key === "customers"
                    ? "bg-gradient-to-br from-purple-500 to-pink-600"
                    : "bg-gradient-to-br from-orange-500 to-red-500"
            }
            isSelected={selectedMetric === key}
            onClick={() => setSelectedMetric(key)}
          />
        ))}
      </div>

      {/* Enhanced Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 transition-all duration-300"
          >
            Sales Analytics
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 transition-all duration-300"
          >
            Customer Insights
          </TabsTrigger>
          <TabsTrigger
            value="operations"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 transition-all duration-300"
          >
            Operations
          </TabsTrigger>
          <TabsTrigger
            value="forecasting"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 transition-all duration-300"
          >
            Forecasting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {performanceMetrics.map((category, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <div className={`h-8 w-8 ${category.gradient} rounded-lg flex items-center justify-center mr-3`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div>
                        <p className="font-medium text-white">{metric.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTrendIcon(metric.trend as "up" | "down")}
                          <span className={`text-sm font-medium ${getTrendColor(metric.trend as "up" | "down")}`}>{metric.change}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sales" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-500" />
                  Top Performing Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-sm text-gray-400">
                            {product.units.toLocaleString()} units • {product.margin} margin
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{product.revenue}</p>
                        <div className="flex items-center justify-end space-x-1">
                          {getTrendIcon(product.trend as "up" | "down")}
                          <p className="text-sm text-green-400">{product.growth}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Territory Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territoryPerformance.map((territory, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{territory.territory}</h4>
                        <Badge variant="outline" className="text-blue-400 border-blue-400 bg-blue-400/10">
                          {territory.efficiency}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">{territory.orders} orders</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(territory.trend as "up" | "down")}
                          <span className="text-green-400 font-medium">{territory.growth}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-white">{territory.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-500" />
                  Customer Segmentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="Customer Segments"
                  icon={Users}
                  color="from-purple-500/10 via-blue-500/10 to-cyan-500/10"
                  data={{
                    primary: "Modern Trade: 45%",
                    secondary: "Retail: 35% • Wholesale: 20%",
                  }}
                  type="pie"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  Customer Lifetime Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="CLV Analysis"
                  icon={DollarSign}
                  color="from-green-500/10 via-emerald-500/10 to-teal-500/10"
                  data={{
                    primary: "Avg CLV: KSh 156,780",
                    secondary: "+9.3% growth this quarter",
                  }}
                  type="bar"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                  Retention Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="Retention Metrics"
                  icon={CheckCircle}
                  color="from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                  data={{
                    primary: "89.2% retention rate",
                    secondary: "+2.1% improvement",
                  }}
                  type="line"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Operational Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="Efficiency Metrics"
                  icon={Zap}
                  color="from-yellow-500/10 via-orange-500/10 to-red-500/10"
                  data={{
                    primary: "Route Efficiency: 87.5%",
                    secondary: "Delivery Success: 96.8%",
                  }}
                  type="line"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2 text-orange-500" />
                  Inventory Turnover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="Inventory Analytics"
                  icon={Package}
                  color="from-orange-500/10 via-red-500/10 to-pink-500/10"
                  data={{
                    primary: "Turnover: 12.3x",
                    secondary: "+8.7% improvement",
                  }}
                  type="bar"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Revenue Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="30-Day Revenue Forecast"
                  icon={TrendingUp}
                  color="from-green-500/10 via-emerald-500/10 to-teal-500/10"
                  data={{
                    primary: "Predicted: KSh 3.2M",
                    secondary: "Confidence: 89%",
                  }}
                  type="line"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Demand Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatedChart
                  title="Demand Forecast"
                  icon={BarChart3}
                  color="from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                  data={{
                    primary: "Peak demand: Fridays",
                    secondary: "Growth trend: +12%",
                  }}
                  type="bar"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
