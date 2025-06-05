"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/ui/stat-card"
import { toast } from "sonner"
import {
  Smartphone,
  Download,
  QrCode,
  Users,
  MapPin,
  Package,
  Shield,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  Globe,
  Share2,
  BarChart3,
} from "lucide-react"

export default function MobileAppView() {
  const [selectedApp, setSelectedApp] = useState("sales")

  const appStats = {
    totalDownloads: 1247,
    activeUsers: 892,
    avgRating: 4.8,
    lastUpdate: "2024-01-15",
    version: "v2.4.1",
    crashRate: "0.02%",
    dailyActiveUsers: 567,
    monthlyGrowth: "+12.5%",
  }

  const mobileApps = [
    {
      id: "sales",
      name: "VendAI Sales",
      description: "Field sales management for sales representatives",
      icon: Users,
      downloads: 456,
      rating: 4.9,
      version: "v2.4.1",
      features: ["Order Management", "Customer Database", "Route Planning", "Offline Mode"],
      status: "published",
      lastUpdate: "2024-01-15",
      activeUsers: 234,
      crashRate: "0.01%",
    },
    {
      id: "driver",
      name: "VendAI Driver",
      description: "Delivery tracking and route optimization for drivers",
      icon: MapPin,
      downloads: 234,
      rating: 4.7,
      version: "v2.3.8",
      features: ["GPS Navigation", "Delivery Tracking", "Proof of Delivery", "Real-time Updates"],
      status: "published",
      lastUpdate: "2024-01-12",
      activeUsers: 189,
      crashRate: "0.03%",
    },
    {
      id: "inventory",
      name: "VendAI Inventory",
      description: "Stock management and warehouse operations",
      icon: Package,
      downloads: 189,
      rating: 4.6,
      version: "v2.2.5",
      features: ["Stock Counting", "Barcode Scanning", "Inventory Alerts", "Transfer Management"],
      status: "beta",
      lastUpdate: "2024-01-10",
      activeUsers: 145,
      crashRate: "0.05%",
    },
    {
      id: "manager",
      name: "VendAI Manager",
      description: "Management dashboard for supervisors and managers",
      icon: Shield,
      downloads: 156,
      rating: 4.8,
      version: "v2.4.0",
      features: ["Team Monitoring", "Performance Analytics", "Report Generation", "Notifications"],
      status: "published",
      lastUpdate: "2024-01-14",
      activeUsers: 98,
      crashRate: "0.02%",
    },
  ]

  const deviceMetrics = [
    { platform: "Android", users: 567, percentage: 63.6, color: "text-green-400" },
    { platform: "iOS", users: 325, percentage: 36.4, color: "text-blue-400" },
  ]

  const appUsage = [
    { feature: "Order Creation", usage: 89, trend: "+12%" },
    { feature: "Customer Management", usage: 76, trend: "+8%" },
    { feature: "Route Planning", usage: 68, trend: "+15%" },
    { feature: "Inventory Check", usage: 54, trend: "+5%" },
    { feature: "Report Generation", usage: 43, trend: "+22%" },
  ]

  const userFeedback = [
    {
      id: "FB-001",
      user: "John Kamau",
      app: "VendAI Sales",
      rating: 5,
      comment: "Excellent app! Makes field sales so much easier.",
      date: "2024-01-18",
      status: "resolved",
    },
    {
      id: "FB-002",
      user: "Mary Wanjiku",
      app: "VendAI Driver",
      rating: 4,
      comment: "Good navigation but could use better offline maps.",
      date: "2024-01-17",
      status: "pending",
    },
    {
      id: "FB-003",
      user: "Peter Ochieng",
      app: "VendAI Sales",
      rating: 5,
      comment: "Love the offline mode feature!",
      date: "2024-01-16",
      status: "resolved",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600"
      case "beta":
        return "bg-orange-600"
      case "development":
        return "bg-blue-600"
      case "resolved":
        return "bg-green-600"
      case "pending":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
    ))
  }

  const handleAppAction = (action: string, appId?: string) => {
    switch (action) {
      case "download":
        toast.success(`Download link generated for ${appId}`)
        break
      case "qr":
        toast.success("QR code generated successfully")
        break
      case "share":
        toast.success("App link shared successfully")
        break
      case "update":
        toast.success("App update initiated")
        break
      case "analytics":
        toast.info("Opening analytics dashboard")
        break
      default:
        toast.info(`${action} action completed`)
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Mobile Applications</h2>
          <p className="text-gray-400">Manage mobile apps for field teams and operations</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800" onClick={() => handleAppAction("qr")}>
            <QrCode className="h-4 w-4 mr-2" />
            QR Codes
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAppAction("store")}>
            <Download className="h-4 w-4 mr-2" />
            App Store
          </Button>
        </div>
      </div>

      {/* Enhanced App Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Downloads"
          value={appStats.totalDownloads.toLocaleString()}
          change="+156"
          trend="up"
          description="all time"
          icon={Download}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Active Users"
          value={appStats.activeUsers.toLocaleString()}
          change="+23"
          trend="up"
          description="this month"
          icon={Users}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="Avg Rating"
          value={appStats.avgRating.toString()}
          change="+0.2"
          trend="up"
          description="user rating"
          icon={Star}
          gradient="bg-gradient-to-br from-yellow-500 to-orange-600"
        />
        <StatCard
          title="Current Version"
          value={appStats.version}
          description="latest release"
          icon={Smartphone}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
      </div>

      <Tabs defaultValue="apps" className="w-full">
        <TabsList className="bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="apps" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Mobile Apps
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Usage Analytics
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            User Feedback
          </TabsTrigger>
          <TabsTrigger value="distribution" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            App Distribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apps" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mobileApps.map((app) => (
              <Card
                key={app.id}
                className={`bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedApp === app.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedApp(app.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <app.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium">{app.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        <span className="text-xs text-gray-400">{app.version}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-400">{app.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Downloads:</span>
                      <span className="text-white">{app.downloads}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Users:</span>
                      <span className="text-white">{app.activeUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-white">{app.rating}</span>
                        <div className="flex">{getRatingStars(Math.floor(app.rating))}</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Crash Rate:</span>
                      <span className={`${app.crashRate <= "0.02%" ? "text-green-400" : "text-orange-400"}`}>
                        {app.crashRate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-white">{app.lastUpdate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Features:</h4>
                    <div className="space-y-1">
                      {app.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAppAction("download", app.id)
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAppAction("qr", app.id)
                      }}
                    >
                      <QrCode className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAppAction("share", app.id)
                      }}
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Platform Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{metric.platform}</span>
                      <div className="flex items-center space-x-2">
                        <span className={metric.color}>{metric.users} users</span>
                        <span className="text-gray-400">({metric.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={metric.percentage} className="h-2 bg-gray-700" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Feature Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appUsage.map((usage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{usage.feature}</p>
                      <p className="text-sm text-green-400">{usage.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{usage.usage}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  App Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">99.8%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">1.2s</div>
                    <div className="text-sm text-gray-400">Avg Load Time</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">4.7</div>
                    <div className="text-sm text-gray-400">Avg Rating</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-400">89%</div>
                    <div className="text-sm text-gray-400">User Retention</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                User Feedback & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userFeedback.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {feedback.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-white">{feedback.user}</p>
                          <p className="text-sm text-gray-400">{feedback.app}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">{getRatingStars(feedback.rating)}</div>
                        <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{feedback.comment}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{feedback.date}</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 hover:bg-gray-800"
                          onClick={() => handleAppAction("respond", feedback.id)}
                        >
                          Respond
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 hover:bg-gray-800"
                          onClick={() => handleAppAction("resolve", feedback.id)}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  App Store Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Google Play Store</p>
                        <p className="text-sm text-gray-400">Android Apps</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleAppAction("playstore")}
                    >
                      View Store
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Apple App Store</p>
                        <p className="text-sm text-gray-400">iOS Apps</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAppAction("appstore")}
                    >
                      View Store
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <Download className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Direct Download</p>
                        <p className="text-sm text-gray-400">APK Files</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={() => handleAppAction("direct")}
                    >
                      Generate Links
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <QrCode className="h-5 w-5 mr-2 text-purple-500" />
                  QR Code Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center hover:border-gray-600 transition-colors">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">QR Code Preview</p>
                    <p className="text-sm text-gray-500">Select an app to generate QR code</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    onClick={() => handleAppAction("generate-qr")}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleAppAction("download-qr")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
