"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/ui/stat-card"
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  MapPin,
  Phone,
  UserCheck,
  Target,
  TrendingUp,
  Clock,
  Eye,
  MoreHorizontal,
  BarChart3,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SalesTeamView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddRepModal, setShowAddRepModal] = useState(false)
  const [showPerformanceReport, setShowPerformanceReport] = useState(false)
  const [showTargetModal, setShowTargetModal] = useState(false)
  const [showTerritoryModal, setShowTerritoryModal] = useState(false)
  type SalesRep = {
    id: string
    name: string
    avatar: string
    phone: string
    email: string
    territory: string
    status: string
    location: string
    outletsAssigned: number
    outletsCovered: number
    ordersToday: number
    revenueToday: string
    monthlyTarget: string
    monthlyAchieved: string
    performance: number
    lastActivity: string
    rating: number
    joinDate: string
  }
  const [selectedRep, setSelectedRep] = useState<SalesRep | null>(null)
  const [showRepProfile, setShowRepProfile] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("performance")
  const [newRep, setNewRep] = useState({
    name: "",
    phone: "",
    email: "",
    territory: "",
    monthlyTarget: ""
  })

  // Function to add new rep
  const handleAddRep = () => {
    if (newRep.name && newRep.phone && newRep.email && newRep.territory) {
      const repId = `REP-${String(salesReps.length + 1).padStart(3, '0')}`
      const avatar = newRep.name.split(' ').map(n => n[0]).join('').toUpperCase()
      
      const newRepData = {
        id: repId,
        name: newRep.name,
        avatar: avatar,
        phone: newRep.phone,
        email: newRep.email,
        territory: newRep.territory,
        status: "active",
        location: newRep.territory.split(' ')[0],
        outletsAssigned: 0,
        outletsCovered: 0,
        ordersToday: 0,
        revenueToday: "KSh 0",
        monthlyTarget: newRep.monthlyTarget || "KSh 300,000",
        monthlyAchieved: "KSh 0",
        performance: 0,
        lastActivity: "Just now",
        rating: 5.0,
        joinDate: new Date().toISOString().split('T')[0]
      }
      
      salesReps.push(newRepData)
      setShowAddRepModal(false)
      setNewRep({ name: "", phone: "", email: "", territory: "", monthlyTarget: "" })
    }
  }

  // Function to export data
  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Phone,Territory,Status,Revenue Today,Monthly Target,Performance\n" +
      filteredReps.map(rep => 
        `${rep.id},${rep.name},${rep.phone},${rep.territory},${rep.status},${rep.revenueToday},${rep.monthlyTarget},${rep.performance}%`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "sales_team_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to filter reps
  const getFilteredAndSortedReps = () => {
    let filtered = salesReps.filter(rep => {
      const matchesSearch = rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rep.territory.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || rep.status === filterStatus
      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "performance":
          return b.performance - a.performance
        case "revenue":
          return parseFloat(b.revenueToday.replace(/[^\d.]/g, "")) - parseFloat(a.revenueToday.replace(/[^\d.]/g, ""))
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }

  const teamStats = {
    totalReps: 12,
    activeToday: 10,
    avgPerformance: 87.5,
    totalRevenue: "KSh 2,847,500",
  }

  const salesReps = [
    {
      id: "REP-001",
      name: "John Kamau",
      avatar: "JK",
      phone: "+254 712 345 678",
      email: "john.kamau@vendai.co.ke",
      territory: "CBD & Westlands",
      status: "active",
      location: "Westlands",
      outletsAssigned: 50,
      outletsCovered: 45,
      ordersToday: 12,
      revenueToday: "KSh 67,500",
      monthlyTarget: "KSh 500,000",
      monthlyAchieved: "KSh 475,000",
      performance: 95,
      lastActivity: "2 min ago",
      rating: 4.8,
      joinDate: "2023-03-15",
    },
    {
      id: "REP-002",
      name: "Mary Wanjiku",
      avatar: "MW",
      phone: "+254 723 456 789",
      email: "mary.wanjiku@vendai.co.ke",
      territory: "Kilimani & Karen",
      status: "active",
      location: "Kilimani",
      outletsAssigned: 45,
      outletsCovered: 42,
      ordersToday: 8,
      revenueToday: "KSh 52,300",
      monthlyTarget: "KSh 450,000",
      monthlyAchieved: "KSh 396,000",
      performance: 88,
      lastActivity: "15 min ago",
      rating: 4.6,
      joinDate: "2023-01-20",
    },
    {
      id: "REP-003",
      name: "Peter Ochieng",
      avatar: "PO",
      phone: "+254 734 567 890",
      email: "peter.ochieng@vendai.co.ke",
      territory: "Eastlands",
      status: "active",
      location: "Embakasi",
      outletsAssigned: 40,
      outletsCovered: 38,
      ordersToday: 15,
      revenueToday: "KSh 89,200",
      monthlyTarget: "KSh 400,000",
      monthlyAchieved: "KSh 328,000",
      performance: 82,
      lastActivity: "5 min ago",
      rating: 4.4,
      joinDate: "2023-05-10",
    },
    {
      id: "REP-004",
      name: "Grace Muthoni",
      avatar: "GM",
      phone: "+254 745 678 901",
      email: "grace.muthoni@vendai.co.ke",
      territory: "Kasarani & Thika Road",
      status: "break",
      location: "Kasarani",
      outletsAssigned: 35,
      outletsCovered: 29,
      ordersToday: 6,
      revenueToday: "KSh 34,800",
      monthlyTarget: "KSh 350,000",
      monthlyAchieved: "KSh 304,500",
      performance: 87,
      lastActivity: "1 hour ago",
      rating: 4.5,
      joinDate: "2023-07-01",
    },
    {
      id: "REP-005",
      name: "David Mwangi",
      avatar: "DM",
      phone: "+254 756 789 012",
      email: "david.mwangi@vendai.co.ke",
      territory: "Industrial Area",
      status: "active",
      location: "Industrial Area",
      outletsAssigned: 25,
      outletsCovered: 24,
      ordersToday: 9,
      revenueToday: "KSh 78,900",
      monthlyTarget: "KSh 600,000",
      monthlyAchieved: "KSh 570,000",
      performance: 95,
      lastActivity: "8 min ago",
      rating: 4.9,
      joinDate: "2022-11-15",
    },
    {
      id: "REP-006",
      name: "Sarah Akinyi",
      avatar: "SA",
      phone: "+254 767 890 123",
      email: "sarah.akinyi@vendai.co.ke",
      territory: "Ngong Road",
      status: "active",
      location: "Ngong Road",
      outletsAssigned: 30,
      outletsCovered: 28,
      ordersToday: 11,
      revenueToday: "KSh 65,400",
      monthlyTarget: "KSh 400,000",
      monthlyAchieved: "KSh 372,000",
      performance: 93,
      lastActivity: "12 min ago",
      rating: 4.7,
      joinDate: "2023-02-28",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "break":
        return "bg-yellow-600"
      case "offline":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-400"
    if (performance >= 80) return "text-blue-400"
    if (performance >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  const filteredReps = getFilteredAndSortedReps()

  return (
    <div className="space-y-8 p-8 max-w-full overflow-x-hidden text-base">
      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reps"
          value={teamStats.totalReps.toString()}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="sales team"
        />

        <StatCard
          title="Active Today"
          value={teamStats.activeToday.toString()}
          icon={UserCheck}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          description="working now"
        />

        <StatCard
          title="Avg Performance"
          value={`${teamStats.avgPerformance}%`}
          icon={Target}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="team average"
        />

        <StatCard
          title="Total Revenue"
          value={teamStats.totalRevenue}
          change="+15.3%"
          trend="up"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
          description="this month"
        />
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl lg:col-span-2">
          <CardHeader className="p-8">
            <CardTitle className="text-sm font-semibold">Top Performers Today</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              {salesReps
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 3)
                .map((rep, index) => (
                  <div key={rep.id} className="flex items-center justify-between p-6 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {rep.avatar}
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{rep.name}</h4>
                        <p className="text-sm text-white mt-1">{rep.territory}</p>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-sm text-gray-400">{rep.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{rep.revenueToday}</p>
                      <p className="text-sm text-green-400 mt-1">{rep.ordersToday} orders</p>
                      <Badge className="bg-green-600 mt-2 text-sm">{rep.performance}%</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Actions */}
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl">
          <CardHeader className="p-8">
            <CardTitle className="text-sm font-semibold">Team Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              <Button 
                onClick={() => setShowAddRepModal(true)}
                className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 rounded-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="text-sm">Add New Rep</span>
              </Button>
              <Button 
                onClick={() => setShowPerformanceReport(true)}
                variant="outline" 
                className="w-full justify-start border-gray-700 h-12 rounded-xl"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                <span className="text-sm">Performance Report</span>
              </Button>
              <Button 
                onClick={() => setShowTargetModal(true)}
                variant="outline" 
                className="w-full justify-start border-gray-700 h-12 rounded-xl"
              >
                <Target className="h-5 w-5 mr-2" />
                <span className="text-sm">Set Targets</span>
              </Button>
              <Button 
                onClick={() => setShowTerritoryModal(true)}
                variant="outline" 
                className="w-full justify-start border-gray-700 h-12 rounded-xl"
              >
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">Territory Management</span>
              </Button>
              <Button 
                onClick={handleExportData}
                variant="outline" 
                className="border-gray-700 hover:bg-gray-800 h-12 px-6 rounded-xl"
              >
                <Download className="h-5 w-5 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search sales reps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 w-80 h-12 bg-gray-800/50 border-gray-700 rounded-xl"
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800 h-12 px-6 rounded-xl">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800 h-12 px-6 rounded-xl">
            <Download className="h-5 w-5 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Sales Team Table */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="p-8">
          <CardTitle className="font-semibold">Sales Team ({filteredReps.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-700">
              <TableHeader>
                <TableRow className="bg-gray-800">
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Rep</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Territory</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Outlets</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Today</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Monthly Progress</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Performance</TableHead>
                  <TableHead className="text-gray-400 text-base px-4 py-3 uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-800">
                {filteredReps.map((rep) => (
                  <TableRow key={rep.id} className="hover:bg-gray-800/50">
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {rep.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-white">{rep.name}</p>
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 mr-1 text-gray-400" />
                            <span className="text-gray-400">{rep.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div>
                        <p className="text-gray-300">{rep.territory}</p>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-gray-400">{rep.location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="space-y-1">
                        <Badge className={`${getStatusColor(rep.status)} px-3 py-1`}>{rep.status}</Badge>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-gray-400">{rep.lastActivity}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div>
                        <p className="text-white">
                          {rep.outletsCovered}/{rep.outletsAssigned}
                        </p>
                        <Progress
                          value={(rep.outletsCovered / rep.outletsAssigned) * 100}
                          className="h-2 bg-gray-700 mt-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div>
                        <p className="font-medium text-white">{rep.revenueToday}</p>
                        <p className="text-gray-400 mt-1">{rep.ordersToday} orders</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div>
                        <p className="text-white">{rep.monthlyAchieved}</p>
                        <p className="text-gray-400 mt-1">Target: {rep.monthlyTarget}</p>
                        <Progress
                          value={
                            (Number.parseInt(rep.monthlyAchieved.replace(/[^\d]/g, "")) /
                              Number.parseInt(rep.monthlyTarget.replace(/[^\d]/g, ""))) *
                            100
                          }
                          className="h-2 bg-gray-700 mt-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${getPerformanceColor(rep.performance)}`}>
                          {rep.performance}%
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-4 mr-1 rounded ${
                                i < Math.floor(rep.rating) ? "bg-yellow-500" : "bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-800 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedRep(rep)
                              setShowRepProfile(true)
                            }}
                            className="hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedRep(rep)
                              setShowPerformanceReport(true)
                            }}
                            className="hover:bg-gray-800"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Performance
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-800">
                            <MapPin className="h-4 w-4 mr-2" />
                            Track Location
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedRep(rep)
                              setShowTargetModal(true)
                            }}
                            className="hover:bg-gray-800"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Set Target
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Add New Rep Modal */}
      {showAddRepModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New Sales Rep</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Full Name"
                value={newRep.name}
                onChange={(e) => setNewRep({...newRep, name: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
              <Input
                placeholder="Phone (+254 xxx xxx xxx)"
                value={newRep.phone}
                onChange={(e) => setNewRep({...newRep, phone: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
              <Input
                placeholder="Email"
                value={newRep.email}
                onChange={(e) => setNewRep({...newRep, email: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
              <Input
                placeholder="Territory"
                value={newRep.territory}
                onChange={(e) => setNewRep({...newRep, territory: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
              <Input
                placeholder="Monthly Target (KSh 300,000)"
                value={newRep.monthlyTarget}
                onChange={(e) => setNewRep({...newRep, monthlyTarget: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
              <div className="flex gap-3">
                <Button onClick={handleAddRep} className="flex-1">Add Rep</Button>
                <Button onClick={() => setShowAddRepModal(false)} variant="outline" className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance Report Modal */}
      {showPerformanceReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top Performers</h3>
                  {salesReps.sort((a, b) => b.performance - a.performance).slice(0, 5).map((rep, index) => (
                    <div key={rep.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2">
                      <div>
                        <p className="font-medium">{rep.name}</p>
                        <p className="text-sm text-gray-400">{rep.territory}</p>
                      </div>
                      <Badge className="bg-green-600">{rep.performance}%</Badge>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Revenue Leaders</h3>
                  {salesReps.sort((a, b) => 
                    parseFloat(b.revenueToday.replace(/[^\d.]/g, "")) - parseFloat(a.revenueToday.replace(/[^\d.]/g, ""))
                  ).slice(0, 5).map((rep) => (
                    <div key={rep.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2">
                      <div>
                        <p className="font-medium">{rep.name}</p>
                        <p className="text-sm text-gray-400">{rep.ordersToday} orders</p>
                      </div>
                      <p className="font-bold text-green-400">{rep.revenueToday}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={() => setShowPerformanceReport(false)} className="mt-6 w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rep Profile Modal */}
      {showRepProfile && selectedRep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {selectedRep.avatar}
                </div>
                {selectedRep.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-medium">{selectedRep.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{selectedRep.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Territory</p>
                  <p className="font-medium">{selectedRep.territory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Join Date</p>
                  <p className="font-medium">{selectedRep.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Monthly Target</p>
                  <p className="font-medium">{selectedRep.monthlyTarget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Monthly Achieved</p>
                  <p className="font-medium text-green-400">{selectedRep.monthlyAchieved}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Performance</p>
                  <p className="font-medium">{selectedRep.performance}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rating</p>
                  <p className="font-medium">{selectedRep.rating}/5.0</p>
                </div>
              </div>
              <Button onClick={() => setShowRepProfile(false)} className="w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Target Setting Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Set Monthly Targets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {salesReps.map((rep) => (
                  <div key={rep.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{rep.name}</p>
                      <p className="text-sm text-gray-400">Current: {rep.monthlyTarget}</p>
                    </div>
                    <Input
                      placeholder="New target"
                      className="w-32 bg-gray-700 border-gray-600"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="flex-1">Update Targets</Button>
                <Button onClick={() => setShowTargetModal(false)} variant="outline" className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Territory Management Modal */}
      {showTerritoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Territory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Current Territories</h3>
                  {salesReps.map((rep) => (
                    <div key={rep.id} className="p-3 bg-gray-800 rounded-lg mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{rep.name}</p>
                          <p className="text-sm text-gray-400">{rep.territory}</p>
                          <p className="text-xs text-gray-500">{rep.outletsAssigned} outlets assigned</p>
                        </div>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Territory Analytics</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Total Coverage</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Overlapping Areas</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Uncovered Outlets</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setShowTerritoryModal(false)} className="mt-6 w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
