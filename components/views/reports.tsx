"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { StatCard } from "@/components/ui/stat-card"
import { toast } from "sonner"
import { FileText, Download, Filter, BarChart3, PieChart, TrendingUp, Users, Package, DollarSign, Clock, Send, Eye, Plus, Calendar, Activity, Zap, Database, Settings, Share2, Archive } from 'lucide-react'

export default function ReportsView() {
  const [selectedReportType, setSelectedReportType] = useState("sales")
  const [dateRange, setDateRange] = useState("30d")

  const reportStats = {
    totalReports: 156,
    scheduledReports: 12,
    generatedToday: 8,
    avgGenerationTime: "2.3s",
    totalDownloads: 1247,
    storageUsed: "2.4 GB",
    automationRate: "78%",
    shareCount: 89,
  }

  const reportTemplates = [
    {
      id: "sales-summary",
      name: "Sales Summary Report",
      description: "Comprehensive overview of sales performance",
      category: "Sales",
      frequency: "Daily",
      lastGenerated: "2 hours ago",
      icon: DollarSign,
      color: "text-green-400",
      downloads: 234,
      popularity: "high",
    },
    {
      id: "inventory-status",
      name: "Inventory Status Report",
      description: "Current stock levels and movement analysis",
      category: "Inventory",
      frequency: "Weekly",
      lastGenerated: "1 day ago",
      icon: Package,
      color: "text-blue-400",
      downloads: 189,
      popularity: "high",
    },
    {
      id: "customer-analysis",
      name: "Customer Analysis Report",
      description: "Customer behavior and segmentation insights",
      category: "Customers",
      frequency: "Monthly",
      lastGenerated: "3 days ago",
      icon: Users,
      color: "text-purple-400",
      downloads: 156,
      popularity: "medium",
    },
    {
      id: "route-efficiency",
      name: "Route Efficiency Report",
      description: "Delivery performance and optimization metrics",
      category: "Operations",
      frequency: "Weekly",
      lastGenerated: "5 hours ago",
      icon: TrendingUp,
      color: "text-orange-400",
      downloads: 123,
      popularity: "medium",
    },
    {
      id: "financial-summary",
      name: "Financial Summary Report",
      description: "Revenue, costs, and profitability analysis",
      category: "Financial",
      frequency: "Monthly",
      lastGenerated: "1 week ago",
      icon: BarChart3,
      color: "text-cyan-400",
      downloads: 98,
      popularity: "high",
    },
    {
      id: "performance-dashboard",
      name: "Performance Dashboard",
      description: "KPI tracking and performance metrics",
      category: "Analytics",
      frequency: "Daily",
      lastGenerated: "30 minutes ago",
      icon: Activity,
      color: "text-pink-400",
      downloads: 167,
      popularity: "high",
    },
  ]

  const scheduledReports = [
    {
      id: "SCH-001",
      name: "Weekly Sales Dashboard",
      schedule: "Every Monday 9:00 AM",
      recipients: ["john@vendai.co.ke", "mary@vendai.co.ke"],
      status: "active",
      nextRun: "Tomorrow 9:00 AM",
      lastRun: "Success",
    },
    {
      id: "SCH-002",
      name: "Monthly Inventory Report",
      schedule: "1st of every month",
      recipients: ["inventory@vendai.co.ke"],
      status: "active",
      nextRun: "Feb 1, 2024",
      lastRun: "Success",
    },
    {
      id: "SCH-003",
      name: "Customer Performance Report",
      schedule: "Every Friday 5:00 PM",
      recipients: ["sales@vendai.co.ke"],
      status: "paused",
      nextRun: "Paused",
      lastRun: "Failed",
    },
  ]

  const recentReports = [
    {
      id: "RPT-001",
      name: "January Sales Summary",
      type: "Sales Report",
      generatedBy: "John Kamau",
      generatedAt: "2024-01-20 14:30",
      size: "2.4 MB",
      format: "PDF",
      status: "completed",
      downloads: 23,
    },
    {
      id: "RPT-002",
      name: "Inventory Analysis Q1",
      type: "Inventory Report",
      generatedBy: "System",
      generatedAt: "2024-01-19 09:00",
      size: "1.8 MB",
      format: "Excel",
      status: "completed",
      downloads: 15,
    },
    {
      id: "RPT-003",
      name: "Route Optimization Report",
      type: "Operations Report",
      generatedBy: "Mary Wanjiku",
      generatedAt: "2024-01-18 16:45",
      size: "3.1 MB",
      format: "PDF",
      status: "completed",
      downloads: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "paused":
        return "bg-orange-600"
      case "completed":
        return "bg-blue-600"
      case "failed":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "high":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const handleReportAction = (action: string, reportId?: string) => {
    switch (action) {
      case "generate":
        toast.success(`Report ${reportId} generation started`)
        break
      case "schedule":
        toast.success("Report scheduled successfully")
        break
      case "download":
        toast.success(`Report ${reportId} downloaded`)
        break
      case "share":
        toast.success(`Report ${reportId} shared successfully`)
        break
      case "delete":
        toast.success(`Report ${reportId} deleted`)
        break
      case "export":
        toast.success("Reports exported successfully")
        break
      default:
        toast.info(`${action} action completed`)
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Reports & Analytics</h2>
          <p className="text-gray-400">Generate, schedule, and manage business reports</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          onClick={() => handleReportAction("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Report
        </Button>
      </div>

      {/* Enhanced Report Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value={reportStats.totalReports.toString()}
          change="+12"
          trend="up"
          description="all time"
          icon={FileText}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Scheduled"
          value={reportStats.scheduledReports.toString()}
          change="+2"
          trend="up"
          description="automated"
          icon={Calendar}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="Generated Today"
          value={reportStats.generatedToday.toString()}
          change="+3"
          trend="up"
          description="today"
          icon={Activity}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title="Avg Generation"
          value={reportStats.avgGenerationTime}
          change="-0.5s"
          trend="up"
          description="processing time"
          icon={Zap}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
        />
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Report Templates
          </TabsTrigger>
          <TabsTrigger value="builder" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Report Builder
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Scheduled Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            Report History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <template.icon className={`h-5 w-5 ${template.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <span className={`text-xs ${getPopularityColor(template.popularity)}`}>
                          {template.popularity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-400">{template.description}</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span>{template.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Generated:</span>
                      <span>{template.lastGenerated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downloads:</span>
                      <span className="text-blue-400">{template.downloads}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                      onClick={() => handleReportAction("generate", template.id)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={() => handleReportAction("preview", template.id)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={() => handleReportAction("schedule", template.id)}
                    >
                      <Calendar className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Custom Report Builder</CardTitle>
                <CardDescription>Create custom reports with advanced filtering and visualization options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="sales">Sales Report</SelectItem>
                        <SelectItem value="inventory">Inventory Report</SelectItem>
                        <SelectItem value="customers">Customer Report</SelectItem>
                        <SelectItem value="operations">Operations Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Data Sources</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="orders" defaultChecked />
                        <Label htmlFor="orders" className="text-sm">
                          Orders Data
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="customers" defaultChecked />
                        <Label htmlFor="customers" className="text-sm">
                          Customer Data
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inventory" />
                        <Label htmlFor="inventory" className="text-sm">
                          Inventory Data
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sales" defaultChecked />
                        <Label htmlFor="sales" className="text-sm">
                          Sales Data
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="routes" />
                        <Label htmlFor="routes" className="text-sm">
                          Route Data
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="financial" />
                        <Label htmlFor="financial" className="text-sm">
                          Financial Data
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 90 days</SelectItem>
                        <SelectItem value="1y">Last year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => handleReportAction("preview")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    onClick={() => handleReportAction("generate")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Chart Types & Options</CardTitle>
                <CardDescription>Select visualization options for your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-xs">Bar Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    <PieChart className="h-6 w-6 mb-2" />
                    <span className="text-xs">Pie Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span className="text-xs">Line Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs">Table</span>
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-800">
                  <h4 className="font-medium text-white">Quick Actions</h4>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleReportAction("export-template")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Template
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleReportAction("schedule")}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleReportAction("save-template")}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Save as Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Scheduled Reports</CardTitle>
                <CardDescription>Manage automated report generation and distribution</CardDescription>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                onClick={() => handleReportAction("schedule-new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-white">{report.name}</h4>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <Badge variant="outline" className={getStatusColor(report.lastRun === "Success" ? "completed" : "failed")}>
                          {report.lastRun}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {report.schedule}
                          </span>
                          <span>Next: {report.nextRun}</span>
                        </div>
                        <p>Recipients: {report.recipients.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReportAction("view", report.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReportAction("run-now", report.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReportAction("edit", report.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Report History</CardTitle>
                <CardDescription>Previously generated reports and download history</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => handleReportAction("filter")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => handleReportAction("export-all")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{report.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>Generated by {report.generatedBy}</span>
                          <span>•</span>
                          <span>{report.generatedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <p className="text-white">{report.format}</p>
                        <p className="text-gray-400">{report.size}</p>
                        <p className="text-blue-400">{report.downloads} downloads</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReportAction("view", report.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReportAction("download", report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReportAction("share", report.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
