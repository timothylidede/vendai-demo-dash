"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"
import { toast } from "sonner"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Users,
  Package,
  MapPin,
  DollarSign,
  Clock,
  Lightbulb,
  BarChart3,
  Eye,
  RefreshCw,
  Settings,
  Activity,
  Cpu,
  Gauge,
  Award,
} from "lucide-react"

export default function AIInsightsView() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const [insightCategory, setInsightCategory] = useState("all")

  const aiInsights = [
    {
      id: "AI-001",
      type: "opportunity",
      category: "Sales",
      title: "Revenue Growth Opportunity",
      description:
        "Westlands territory shows 23% higher order values compared to other areas. Consider expanding sales team coverage in this region.",
      impact: "Potential +KSh 145,000/month",
      confidence: 87,
      priority: "high",
      actionable: true,
      timeframe: "This week",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      id: "AI-002",
      type: "warning",
      category: "Inventory",
      title: "Stock Depletion Alert",
      description: "Coca Cola 500ml will run out in 3 days based on current demand trends and delivery schedules.",
      impact: "Risk of KSh 89,000 lost sales",
      confidence: 94,
      priority: "urgent",
      actionable: true,
      timeframe: "Next 3 days",
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      id: "AI-003",
      type: "optimization",
      category: "Operations",
      title: "Route Efficiency Improvement",
      description: "AI suggests combining CBD and Westlands routes during off-peak hours for 18% fuel savings.",
      impact: "Save KSh 12,400/month",
      confidence: 91,
      priority: "medium",
      actionable: true,
      timeframe: "Next week",
      icon: MapPin,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "AI-004",
      type: "trend",
      category: "Customer",
      title: "Customer Behavior Pattern",
      description: "Modern Trade customers order 34% more on Fridays. Optimize inventory and staffing accordingly.",
      impact: "Increase revenue by 8%",
      confidence: 89,
      priority: "medium",
      actionable: true,
      timeframe: "This Friday",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: "AI-005",
      type: "prediction",
      category: "Demand",
      title: "Seasonal Demand Forecast",
      description: "Bread and milk demand expected to increase by 25% next week due to school reopening patterns.",
      impact: "Prepare additional KSh 67,000 inventory",
      confidence: 82,
      priority: "medium",
      actionable: true,
      timeframe: "Next week",
      icon: Package,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      id: "AI-006",
      type: "anomaly",
      category: "Sales",
      title: "Unusual Sales Pattern Detected",
      description: "Village Kiosk orders dropped 45% this week. Recommend immediate follow-up to identify issues.",
      impact: "Potential customer retention risk",
      confidence: 76,
      priority: "high",
      actionable: true,
      timeframe: "Today",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  ]

  const aiMetrics = {
    totalInsights: 24,
    actionableInsights: 18,
    avgConfidence: 87.3,
    implementedActions: 12,
    potentialSavings: "KSh 234,500",
    accuracyRate: "91.2%",
    predictionsToday: 156,
    modelUptime: "99.8%",
  }

  const insightCategories = [
    { id: "all", name: "All Insights", count: 24 },
    { id: "sales", name: "Sales", count: 8 },
    { id: "inventory", name: "Inventory", count: 6 },
    { id: "operations", name: "Operations", count: 5 },
    { id: "customer", name: "Customer", count: 3 },
    { id: "financial", name: "Financial", count: 2 },
  ]

  const aiModels = [
    {
      name: "Demand Forecasting",
      accuracy: 91.2,
      status: "active",
      lastTrained: "2024-01-15",
      predictions: 1247,
      performance: "excellent",
    },
    {
      name: "Route Optimization",
      accuracy: 87.8,
      status: "active",
      lastTrained: "2024-01-14",
      predictions: 892,
      performance: "good",
    },
    {
      name: "Customer Segmentation",
      accuracy: 89.5,
      status: "active",
      lastTrained: "2024-01-12",
      predictions: 567,
      performance: "good",
    },
    {
      name: "Anomaly Detection",
      accuracy: 94.1,
      status: "training",
      lastTrained: "2024-01-10",
      predictions: 234,
      performance: "excellent",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-blue-600"
      case "low":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400"
    if (confidence >= 80) return "text-blue-400"
    if (confidence >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-green-400"
      case "good":
        return "text-blue-400"
      case "fair":
        return "text-yellow-400"
      default:
        return "text-orange-400"
    }
  }

  const filteredInsights = aiInsights.filter((insight) => {
    if (insightCategory === "all") return true
    return insight.category.toLowerCase() === insightCategory
  })

  const handleInsightAction = (action: string, insightId?: string) => {
    switch (action) {
      case "implement":
        toast.success(`Insight ${insightId} implementation started`)
        break
      case "dismiss":
        toast.info(`Insight ${insightId} dismissed`)
        break
      case "refresh":
        toast.success("AI insights refreshed successfully")
        break
      case "retrain":
        toast.info("Model retraining initiated")
        break
      case "export":
        toast.success("Insights exported successfully")
        break
      default:
        toast.info(`${action} action completed`)
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Insights & Recommendations</h2>
          <p className="text-gray-400">AI-powered business intelligence and actionable insights</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
            onClick={() => handleInsightAction("refresh")}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Insights
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
            onClick={() => handleInsightAction("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </Button>
        </div>
      </div>

      {/* Enhanced AI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Insights"
          value={aiMetrics.totalInsights.toString()}
          change="+6"
          trend="up"
          description="this week"
          icon={Brain}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title="Actionable"
          value={aiMetrics.actionableInsights.toString()}
          change="+4"
          trend="up"
          description="ready to implement"
          icon={Target}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="Avg Confidence"
          value={`${aiMetrics.avgConfidence}%`}
          change="+2.1%"
          trend="up"
          description="prediction accuracy"
          icon={BarChart3}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Implemented"
          value={aiMetrics.implementedActions.toString()}
          change="+3"
          trend="up"
          description="actions taken"
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
        />
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <TabsList className="bg-gray-800/50 backdrop-blur-sm mb-4 sm:mb-0">
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              AI Models
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Predictions
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Performance
            </TabsTrigger>
          </TabsList>

          <div className="flex space-x-4 items-center">
            <Select value={insightCategory} onValueChange={setInsightCategory}>
              <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {insightCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1d">Today</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="90d">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="insights" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInsights.map((insight) => (
              <Card
                key={insight.id}
                className={`bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:scale-105 ${insight.borderColor}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`h-10 w-10 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                        <insight.icon className={`h-5 w-5 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-base font-semibold">{insight.title}</CardTitle>
                          <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>{insight.category}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {insight.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}%
                      </div>
                      <div className="text-xs text-gray-400">confidence</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{insight.description}</p>

                  <div className={`p-3 ${insight.bgColor} rounded-lg border ${insight.borderColor}`}>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className={`h-4 w-4 ${insight.color}`} />
                      <span className={`text-sm font-semibold ${insight.color}`}>{insight.impact}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${insight.color.replace("text-", "bg-").replace("-400", "-500")}`}
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => handleInsightAction("view", insight.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {insight.actionable && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                          onClick={() => handleInsightAction("implement", insight.id)}
                        >
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Cpu className="h-5 w-5 mr-2 text-purple-500" />
                AI Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{model.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>Last trained: {model.lastTrained}</span>
                          <span>•</span>
                          <span>{model.predictions} predictions</span>
                          <span>•</span>
                          <span className={getPerformanceColor(model.performance)}>{model.performance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getConfidenceColor(model.accuracy)}`}>
                          {model.accuracy}%
                        </div>
                        <div className="text-xs text-gray-400">accuracy</div>
                      </div>
                      <Badge className={model.status === "active" ? "bg-green-600" : "bg-orange-600"}>
                        {model.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleInsightAction("retrain", model.name)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleInsightAction("configure", model.name)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Demand Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Demand Forecast Chart</p>
                    <p className="text-sm text-gray-400">Next 30 days prediction</p>
                    <p className="text-xs text-blue-400 mt-2">91.2% accuracy rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  Revenue Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Revenue Forecast</p>
                    <p className="text-sm text-gray-400">Projected: KSh 3.2M next month</p>
                    <p className="text-xs text-green-400 mt-2">+8% growth expected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2 text-purple-500" />
                  Inventory Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <Package className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Stock Level Predictions</p>
                    <p className="text-sm text-gray-400">Optimal inventory levels</p>
                    <p className="text-xs text-purple-400 mt-2">15% reduction in waste</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-orange-500" />
                  Customer Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-red-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <Users className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Customer Behavior Analysis</p>
                    <p className="text-sm text-gray-400">Segmentation & preferences</p>
                    <p className="text-xs text-orange-400 mt-2">89% prediction accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Model Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <Target className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Accuracy Trends</p>
                    <p className="text-sm text-gray-400">91.2% average</p>
                    <p className="text-xs text-green-400 mt-2">+2.1% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Prediction Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Daily Predictions</p>
                    <p className="text-sm text-gray-400">2,940 predictions today</p>
                    <p className="text-xs text-blue-400 mt-2">+156 vs yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Avg Response Time</p>
                    <p className="text-sm text-gray-400">0.23 seconds</p>
                    <p className="text-xs text-yellow-400 mt-2">-0.05s improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-500" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center hover:bg-gray-800/50 transition-colors">
                    <div className="text-2xl font-bold text-green-400">99.8%</div>
                    <div className="text-sm text-gray-400">Model Uptime</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center hover:bg-gray-800/50 transition-colors">
                    <div className="text-2xl font-bold text-blue-400">0.23s</div>
                    <div className="text-sm text-gray-400">Avg Response</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center hover:bg-gray-800/50 transition-colors">
                    <div className="text-2xl font-bold text-purple-400">91.2%</div>
                    <div className="text-sm text-gray-400">Accuracy Rate</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center hover:bg-gray-800/50 transition-colors">
                    <div className="text-2xl font-bold text-orange-400">2.9K</div>
                    <div className="text-sm text-gray-400">Daily Predictions</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center hover:bg-gray-800/50 transition-colors">
                    <div className="text-2xl font-bold text-cyan-400">87%</div>
                    <div className="text-sm text-gray-400">Implementation Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
