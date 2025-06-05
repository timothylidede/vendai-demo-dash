"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { StatCard } from "@/components/ui/stat-card"
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"
import { MapPin, Search, Plus, Download, Navigation, Clock, Zap, Target, TrendingUp, Eye, Play, Pause, RotateCcw, Fuel, Route, AlertTriangle, Settings, Calendar, BarChart3, Activity, DollarSign, CheckCircle, XCircle, Info, Edit, Phone, MessageSquare, RefreshCw, Truck, Users, Timer } from 'lucide-react'

// Enhanced Mock Map Component with animations
type MockMapProps = {
  routes: any[]
  selectedRoute: string | null
  onRouteSelect: (routeId: string) => void
}

type MapMarker = {
  id: number
  x: number
  y: number
  type: string
  label: string
  status: string
  route?: string
  pulse?: boolean
}

// Simple Dijkstra-like algorithm for route optimization
interface RouteOptimizationPriorities {
  time: number
  fuel: number
  distance: number
}

interface OptimizableRoute {
  id: string
  name: string
  driver: string
  vehicle: string
  status: string
  progress: number
  outlets: number
  outletsCompleted: number
  estimatedTime: string
  actualTime: string
  distance: string
  efficiency: number
  revenue: string
  startTime: string
  estimatedCompletion: string
  currentLocation: string
  nextStop: string
  fuelCost: string
  optimizationSavings: string
}

const optimizeRoute = (
  route: OptimizableRoute,
  priorities: RouteOptimizationPriorities = { time: 0.5, fuel: 0.3, distance: 0.2 }
): OptimizableRoute => {
  const { time, fuel, distance } = priorities;
  const currentDistance = parseFloat(route.distance);
  const currentFuelCost = parseFloat(route.fuelCost.replace("KSh ", ""));
  const timeInHours = parseFloat(route.estimatedTime) * 60; // Convert to minutes

  // Simulate optimization by reducing metrics based on priorities
  const optimizedDistance = currentDistance * (1 - distance * 0.15);
  const optimizedFuelCost = currentFuelCost * (1 - fuel * 0.2);
  const optimizedTime = timeInHours * (1 - time * 0.1);

  // Calculate savings
  const savings = Math.round((currentFuelCost - optimizedFuelCost) + (currentDistance - optimizedDistance) * 10);
  const efficiencyGain = Math.min(route.efficiency + (time * 5 + fuel * 3 + distance * 2), 98);

  return {
    ...route,
    distance: `${optimizedDistance.toFixed(1)} km`,
    fuelCost: `KSh ${Math.round(optimizedFuelCost)}`,
    estimatedTime: `${(optimizedTime / 60).toFixed(1)}h`,
    efficiency: Math.round(efficiencyGain),
    optimizationSavings: `KSh ${savings}`,
  };
};

// Driver assignment algorithm based on availability and proximity
interface Driver {
  name: string;
  vehicle: string;
  available: boolean;
  currentLoad: number;
}

interface AssignableRoute {
  driver: string;
  vehicle: string;
  [key: string]: any;
}

// Route interface (move this above assignDriver)
interface Route {
  id: string;
  name: string;
  driver: string;
  vehicle: string;
  status: string;
  progress: number;
  outlets: number;
  outletsCompleted: number;
  estimatedTime: string;
  actualTime: string;
  distance: string;
  efficiency: number;
  revenue: string;
  startTime: string;
  estimatedCompletion: string;
  currentLocation: string;
  nextStop: string;
  fuelCost: string;
  optimizationSavings: string;
}

// Driver assignment algorithm based on availability and proximity
const assignDriver = (route: Route, drivers: { id: string; name: string; vehicle: string; available: boolean; currentLoad: number }[]): Route => {
  const availableDrivers = drivers.filter((d) => d.available);
  if (!availableDrivers.length) return route;

  // Score drivers based on proximity to route's starting location and load
  const scoredDrivers = availableDrivers.map((driver) => {
    const proximityScore = Math.random() * 100; // Simulate distance to route start
    const loadScore = 100 - driver.currentLoad * 10; // Lower score for higher load
    return { driver, score: proximityScore * 0.6 + loadScore * 0.4 };
  });

  // Select driver with highest score
  const bestDriver = scoredDrivers.sort((a, b) => b.score - a.score)[0]?.driver;
  return bestDriver
    ? { ...route, driver: bestDriver.name, vehicle: bestDriver.vehicle }
    : route;
};

const [isAdvancedOptimizationOpen, setIsAdvancedOptimizationOpen] = useState(false);
const [isDriverAssignmentOpen, setIsDriverAssignmentOpen] = useState(false);
const [optimizationParams, setOptimizationParams] = useState({
  prioritizeTime: 0.5,
  prioritizeFuel: 0.3,
  prioritizeDistance: 0.2,
  avoidTraffic: true,
});
const [drivers, setDrivers] = useState([
  { id: "D1", name: "John Kamau", vehicle: "KCA 123A", available: true, currentLoad: 2 },
  { id: "D2", name: "Mary Wanjiku", vehicle: "KBZ 456B", available: true, currentLoad: 3 },
  { id: "D3", name: "Peter Ochieng", vehicle: "KCX 789C", available: false, currentLoad: 5 },
  { id: "D4", name: "Grace Muthoni", vehicle: "KDA 012D", available: true, currentLoad: 1 },
  { id: "D5", name: "David Mwangi", vehicle: "KEB 345E", available: true, currentLoad: 0 },
]);

const MockMap = ({ routes, selectedRoute, onRouteSelect }: MockMapProps) => {
  const [animatedMarkers, setAnimatedMarkers] = useState<MapMarker[]>([])

  const mapMarkers = [
    { id: 1, x: 20, y: 30, type: "depot", label: "Main Depot", status: "active" },
    { id: 2, x: 60, y: 25, type: "active", label: "Westlands", route: "RT-001", status: "active" },
    { id: 3, x: 75, y: 60, type: "active", label: "Embakasi", route: "RT-002", status: "active" },
    { id: 4, x: 40, y: 45, type: "completed", label: "CBD", route: "RT-003", status: "completed" },
    { id: 5, x: 55, y: 75, type: "active", label: "Industrial Area", route: "RT-004", status: "active" },
    { id: 6, x: 30, y: 80, type: "planned", label: "Karen", route: "RT-005", status: "planned" },
    { id: 7, x: 85, y: 40, type: "active", label: "Kasarani", route: "RT-006", status: "active" },
    { id: 8, x: 15, y: 60, type: "completed", label: "Ngong Road", route: "RT-007", status: "completed" },
  ]

  const routePaths = [
    { from: { x: 20, y: 30 }, to: { x: 60, y: 25 }, status: "active", id: "RT-001", progress: 65 },
    { from: { x: 20, y: 30 }, to: { x: 75, y: 60 }, status: "active", id: "RT-002", progress: 40 },
    { from: { x: 20, y: 30 }, to: { x: 40, y: 45 }, status: "completed", id: "RT-003", progress: 100 },
    { from: { x: 20, y: 30 }, to: { x: 55, y: 75 }, status: "active", id: "RT-004", progress: 75 },
    { from: { x: 20, y: 30 }, to: { x: 30, y: 80 }, status: "planned", id: "RT-005", progress: 0 },
    { from: { x: 20, y: 30 }, to: { x: 85, y: 40 }, status: "active", id: "RT-006", progress: 30 },
    { from: { x: 20, y: 30 }, to: { x: 15, y: 60 }, status: "completed", id: "RT-007", progress: 100 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedMarkers((prev) =>
        mapMarkers.map((marker) => ({
          ...marker,
          pulse: marker.type === "active" ? Math.random() > 0.5 : false,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10b981"
      case "completed":
        return "#3b82f6"
      case "planned":
        return "#f59e0b"
      case "depot":
        return "#8b5cf6"
      case "delayed":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#10b981"
    if (progress >= 50) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {/* Enhanced grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Route paths with progress indicators */}
        {routePaths.map((path, index) => {
          const isSelected = selectedRoute === path.id
          const progressLength = path.progress / 100

          return (
            <g key={index}>
              {/* Background path */}
              <line
                x1={`${path.from.x}%`}
                y1={`${path.from.y}%`}
                x2={`${path.to.x}%`}
                y2={`${path.to.y}%`}
                stroke="#374151"
                strokeWidth="3"
                opacity="0.3"
              />

              {/* Progress path */}
              <line
                x1={`${path.from.x}%`}
                y1={`${path.from.y}%`}
                x2={`${path.from.x + (path.to.x - path.from.x) * progressLength}%`}
                y2={`${path.from.y + (path.to.y - path.from.y) * progressLength}%`}
                stroke={getProgressColor(path.progress)}
                strokeWidth={isSelected ? "4" : "3"}
                strokeDasharray={path.status === "planned" ? "5,5" : "none"}
                opacity={path.status === "active" ? 0.9 : 0.7}
                className="cursor-pointer hover:opacity-100 transition-all duration-300"
                onClick={() => onRouteSelect(path.id)}
                filter={isSelected ? "url(#glow)" : "none"}
              />

              {/* Animated vehicle for active routes */}
              {path.status === "active" && path.progress > 0 && (
                <circle r="4" fill={getStatusColor(path.status)} opacity="0.9" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href={`#path-${index}`} />
                  </animateMotion>
                </circle>
              )}

              <path
                id={`path-${index}`}
                d={`M ${path.from.x}% ${path.from.y}% L ${path.to.x}% ${path.to.y}%`}
                fill="none"
                opacity="0"
              />
            </g>
          )
        })}

        {/* Enhanced location markers */}
        {mapMarkers.map((marker) => {
          const isSelected = selectedRoute === marker.route
          const shouldPulse = marker.type === "active"

          return (
            <g
              key={marker.id}
              className="cursor-pointer"
              onClick={() => {
                if (marker.route) onRouteSelect(marker.route)
              }}
            >
              {/* Pulse effect for active markers */}
              {shouldPulse && (
                <circle cx={`${marker.x}%`} cy={`${marker.y}%`} r="12" fill={getStatusColor(marker.type)} opacity="0.3">
                  <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Main marker */}
              <circle
                cx={`${marker.x}%`}
                cy={`${marker.y}%`}
                r={marker.type === "depot" ? "8" : "6"}
                fill={getStatusColor(marker.type)}
                stroke="white"
                strokeWidth="2"
                className="hover:r-10 transition-all duration-300"
                filter={isSelected ? "url(#glow)" : "none"}
              />

              {/* Label */}
              <text
                x={`${marker.x}%`}
                y={`${marker.y + 12}%`}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="font-medium drop-shadow-lg"
              >
                {marker.label}
              </text>

              {/* Route ID for non-depot markers */}
              {marker.route && (
                <text
                  x={`${marker.x}%`}
                  y={`${marker.y - 10}%`}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  className="font-bold opacity-75"
                >
                  {marker.route}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Enhanced map legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-gray-700/50 shadow-xl">
        <h4 className="text-white font-semibold mb-3 text-sm">Route Status</h4>
        <div className="flex flex-col space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white">Active Routes ({routes.filter((r) => r.status === "active").length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-white">Completed ({routes.filter((r) => r.status === "completed").length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-white">Planned ({routes.filter((r) => r.status === "planned").length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-white">Main Depot</span>
          </div>
        </div>
      </div>

      {/* Real-time stats overlay */}
      <div className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-gray-700/50 shadow-xl">
        <div className="text-center">
          <div className="text-green-400 font-bold text-lg">{routes.filter((r) => r.status === "active").length}</div>
          <div className="text-xs text-gray-400">Active Now</div>
        </div>
      </div>
    </div>
  )
}

// Route Details Modal Component
type RouteDetailsModalProps = {
  route: any
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedRoute: any) => void
}

const RouteDetailsModal = ({ route, isOpen, onClose, onUpdate }: RouteDetailsModalProps) => {
  const [editedRoute, setEditedRoute] = useState(route)

  useEffect(() => {
    setEditedRoute(route)
  }, [route])

  if (!route) return null

  const handleAction = (action: string) => {
    toast.success(`${action} action completed for route ${route.id}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Route className="h-5 w-5 mr-2" />
            Route Details - {route.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Status */}
          <div className="flex items-center justify-between">
            <Badge
              className={`${route.status === "active" ? "bg-green-600" : route.status === "completed" ? "bg-blue-600" : "bg-orange-600"}`}
            >
              {route.status.toUpperCase()}
            </Badge>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleAction("Call Driver")}>
                <Phone className="h-4 w-4 mr-1" />
                Call Driver
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction("Send Message")}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">
                Progress: {route.outletsCompleted}/{route.outlets} outlets
              </span>
              <span className="text-gray-400">{route.progress}%</span>
            </div>
            <Progress value={route.progress} className="h-3" />
          </div>

          {/* Route Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Driver</Label>
                <p className="text-white font-medium">{route.driver}</p>
              </div>
              <div>
                <Label className="text-gray-400">Vehicle</Label>
                <p className="text-white font-medium">{route.vehicle}</p>
              </div>
              <div>
                <Label className="text-gray-400">Current Location</Label>
                <p className="text-white font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-blue-400" />
                  {route.currentLocation}
                </p>
              </div>
              <div>
                <Label className="text-gray-400">Next Stop</Label>
                <p className="text-white font-medium">{route.nextStop}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Distance</Label>
                <p className="text-white font-medium">{route.distance}</p>
              </div>
              <div>
                <Label className="text-gray-400">Efficiency</Label>
                <p
                  className={`font-bold ${route.efficiency >= 90 ? "text-green-400" : route.efficiency >= 80 ? "text-blue-400" : "text-yellow-400"}`}
                >
                  {route.efficiency}%
                </p>
              </div>
              <div>
                <Label className="text-gray-400">Revenue</Label>
                <p className="text-white font-medium">{route.revenue}</p>
              </div>
              <div>
                <Label className="text-gray-400">Fuel Cost</Label>
                <p className="text-white font-medium">{route.fuelCost}</p>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Time Analysis</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Start Time</p>
                <p className="text-white font-medium">{route.startTime}</p>
              </div>
              <div>
                <p className="text-gray-400">Estimated</p>
                <p className="text-white font-medium">{route.estimatedTime}</p>
              </div>
              <div>
                <p className="text-gray-400">Actual</p>
                <p className="text-white font-medium">{route.actualTime}</p>
              </div>
            </div>
          </div>

          {/* Optimization Savings */}
          <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-green-400 mr-2" />
              <div>
                <p className="text-green-400 font-medium">AI Optimization Savings</p>
                <p className="text-green-300 text-sm">
                  Saved {route.optimizationSavings} compared to traditional routing
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function RoutesView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedRouteDetails, setSelectedRouteDetails] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const [routes, setRoutes] = useState([
    {
      id: "RT-001",
      name: "CBD Central Route",
      driver: "John Kamau",
      vehicle: "KCA 123A",
      status: "active",
      progress: 65,
      outlets: 12,
      outletsCompleted: 8,
      estimatedTime: "2h 30m",
      actualTime: "2h 45m",
      distance: "45.2 km",
      efficiency: 92,
      revenue: "KSh 67,500",
      startTime: "08:00",
      estimatedCompletion: "14:30",
      currentLocation: "Westlands",
      nextStop: "Sarit Centre",
      fuelCost: "KSh 2,400",
      optimizationSavings: "KSh 450",
    },
    {
      id: "RT-002",
      name: "Eastlands Express",
      driver: "Mary Wanjiku",
      vehicle: "KBZ 456B",
      status: "active",
      progress: 40,
      outlets: 15,
      outletsCompleted: 6,
      estimatedTime: "3h 15m",
      actualTime: "1h 30m",
      distance: "62.8 km",
      efficiency: 88,
      revenue: "KSh 89,200",
      startTime: "07:30",
      estimatedCompletion: "15:45",
      currentLocation: "Embakasi",
      nextStop: "Donholm Shopping Center",
      fuelCost: "KSh 3,200",
      optimizationSavings: "KSh 680",
    },
    {
      id: "RT-003",
      name: "Westlands Premium",
      driver: "Peter Ochieng",
      vehicle: "KCX 789C",
      status: "completed",
      progress: 100,
      outlets: 8,
      outletsCompleted: 8,
      estimatedTime: "2h 00m",
      actualTime: "1h 45m",
      distance: "32.5 km",
      efficiency: 95,
      revenue: "KSh 125,800",
      startTime: "09:00",
      estimatedCompletion: "11:00",
      currentLocation: "Depot",
      nextStop: "Completed",
      fuelCost: "KSh 1,800",
      optimizationSavings: "KSh 320",
    },
    {
      id: "RT-004",
      name: "Industrial Zone",
      driver: "Grace Muthoni",
      vehicle: "KDA 012D",
      status: "active",
      progress: 75,
      outlets: 6,
      outletsCompleted: 4,
      estimatedTime: "4h 00m",
      actualTime: "3h 10m",
      distance: "78.3 km",
      efficiency: 85,
      revenue: "KSh 156,400",
      startTime: "06:00",
      estimatedCompletion: "16:00",
      currentLocation: "Industrial Area",
      nextStop: "Baba Dogo",
      fuelCost: "KSh 4,100",
      optimizationSavings: "KSh 890",
    },
    {
      id: "RT-005",
      name: "South Route",
      driver: "David Mwangi",
      vehicle: "KEB 345E",
      status: "planned",
      progress: 0,
      outlets: 10,
      outletsCompleted: 0,
      estimatedTime: "2h 45m",
      actualTime: "0h 00m",
      distance: "51.7 km",
      efficiency: 0,
      revenue: "KSh 78,900",
      startTime: "14:00",
      estimatedCompletion: "16:45",
      currentLocation: "Depot",
      nextStop: "Karen Shopping Centre",
      fuelCost: "KSh 2,800",
      optimizationSavings: "KSh 520",
    },
  ])

  const optimizationInsights = [
    {
      type: "fuel-savings",
      title: "Fuel Optimization",
      description: "AI route optimization saved 15% fuel costs this week",
      impact: "KSh 15,400 saved",
      icon: Fuel,
      color: "text-green-400",
      bgGradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20",
    },
    {
      type: "time-efficiency",
      title: "Time Efficiency",
      description: "Routes completed 12% faster than traditional planning",
      impact: "4.2 hours saved",
      icon: Clock,
      color: "text-blue-400",
      bgGradient: "bg-gradient-to-br from-blue-500/20 to-cyan-600/20",
    },
    {
      type: "coverage",
      title: "Coverage Optimization",
      description: "Increased outlet coverage by 18% with same resources",
      impact: "62 more outlets",
      icon: Target,
      color: "text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-500/20 to-pink-600/20",
    },
    {
      type: "revenue",
      title: "Revenue Impact",
      description: "Optimized routes generated 8% more revenue per trip",
      impact: "KSh 89,500 increase",
      icon: TrendingUp,
      color: "text-orange-400",
      bgGradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) => {
          if (route.status === "active" && route.progress < 100) {
            const newProgress = Math.min(route.progress + Math.random() * 1.5, 100)
            const newOutletsCompleted = Math.floor((newProgress / 100) * route.outlets)
            return {
              ...route,
              progress: Math.round(newProgress),
              outletsCompleted: newOutletsCompleted,
              status: newProgress >= 100 ? "completed" : "active",
            }
          }
          return route
        }),
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Auto-dismiss notifications
  useEffect(() => {
    notifications.forEach((notification) => {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
      }, 5000)
    })
  }, [notifications])

  interface Notification {
    id: number
    message: string
    type: "success" | "error" | "info"
    timestamp: string
  }

  interface Route {
    id: string;
    name: string;
    driver: string;
    vehicle: string;
    status: string;
    progress: number;
    outlets: number;
    outletsCompleted: number;
    estimatedTime: string;
    actualTime: string;
    distance: string;
    efficiency: number;
    revenue: string;
    startTime: string;
    estimatedCompletion: string;
    currentLocation: string;
    nextStop: string;
    fuelCost: string;
    optimizationSavings: string;
  }

  const addNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setNotifications((prev: Notification[]) => [...prev, notification])
  }

  interface Route {
    id: string
    name: string
    driver: string
    vehicle: string
    status: string
    progress: number
    outlets: number
    outletsCompleted: number
    estimatedTime: string
    actualTime: string
    distance: string
    efficiency: number
    revenue: string
    startTime: string
    estimatedCompletion: string
    currentLocation: string
    nextStop: string
    fuelCost: string
    optimizationSavings: string
  }

  type RouteAction = "start" | "pause" | "complete" | "reset"

  const handleRouteAction = (routeId: string, action: RouteAction) => {
    setRoutes((prevRoutes: Route[]) =>
      prevRoutes.map((route: Route) => {
        if (route.id === routeId) {
          switch (action) {
            case "start":
              addNotification(`Route ${routeId} started successfully`)
              return { ...route, status: "active", progress: Math.max(route.progress, 1) }
            case "pause":
              addNotification(`Route ${routeId} paused`)
              return { ...route, status: "paused" }
            case "complete":
              addNotification(`Route ${routeId} marked as completed`)
              return { ...route, status: "completed", progress: 100, outletsCompleted: route.outlets }
            case "reset":
              addNotification(`Route ${routeId} reset to planned status`)
              return { ...route, status: "planned", progress: 0, outletsCompleted: 0 }
            default:
              return route
          }
        }
        return route
      }),
    )
  }

  const handleOptimizeAll = () => {
    setIsOptimizing(true)
    addNotification("Starting AI optimization for all routes...", "info")

    setTimeout(() => {
      setRoutes((prevRoutes) =>
        prevRoutes.map((route) => ({
          ...route,
          efficiency: Math.min(route.efficiency + Math.random() * 8, 98),
          optimizationSavings: `KSh ${Math.round(Number.parseFloat(route.optimizationSavings.replace("KSh ", "")) * 1.3)}`,
        })),
      )
      setIsOptimizing(false)
      addNotification("All routes optimized! Average 15% efficiency improvement achieved.")
    }, 4000)
  }

  const handleCreateRoute = () => {
    const newRoute = {
      id: `RT-${String(routes.length + 1).padStart(3, "0")}`,
      name: `New Route ${routes.length + 1}`,
      driver: "Unassigned",
      vehicle: "TBD",
      status: "planned",
      progress: 0,
      outlets: Math.floor(Math.random() * 10) + 5,
      outletsCompleted: 0,
      estimatedTime: "2h 30m",
      actualTime: "0h 00m",
      distance: `${(Math.random() * 50 + 20).toFixed(1)} km`,
      efficiency: 0,
      revenue: `KSh ${Math.floor(Math.random() * 100000 + 50000).toLocaleString()}`,
      startTime: "TBD",
      estimatedCompletion: "TBD",
      currentLocation: "Depot",
      nextStop: "TBD",
      fuelCost: `KSh ${Math.floor(Math.random() * 3000 + 1500)}`,
      optimizationSavings: `KSh ${Math.floor(Math.random() * 500 + 200)}`,
    }
    setRoutes((prev) => [...prev, newRoute])
    addNotification(`New route ${newRoute.id} created successfully`)
  }

  const handleViewDetails = (route: any) => {
    setSelectedRouteDetails(route)
    setIsDetailsModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "completed":
        return "bg-blue-600"
      case "planned":
        return "bg-orange-600"
      case "paused":
        return "bg-yellow-600"
      case "delayed":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  interface EfficiencyColorProps {
    efficiency: number
  }

  const getEfficiencyColor = (efficiency: number): string => {
    if (efficiency >= 90) return "text-green-400"
    if (efficiency >= 80) return "text-blue-400"
    if (efficiency >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || route.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const routeStats = {
    totalRoutes: routes.length,
    activeRoutes: routes.filter((r) => r.status === "active").length,
    completedToday: routes.filter((r) => r.status === "completed").length,
    avgEfficiency: Math.round(routes.reduce((sum, r) => sum + r.efficiency, 0) / routes.length),
    totalDistance: `${routes.reduce((sum, r) => sum + Number.parseFloat(r.distance), 0).toFixed(1)} km`,
    fuelSaved: `KSh ${routes.reduce((sum, r) => sum + Number.parseFloat(r.optimizationSavings.replace("KSh ", "")), 0).toLocaleString()}`,
    avgDeliveryTime: "2.4 hrs",
    onTimeRate: "94.2%",
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
      {/* Enhanced Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.slice(-3).map((notification) => (
            <div
              key={notification.id}
              className={`${
                notification.type === "success"
                  ? "bg-green-900/95 border-green-700 text-green-100"
                  : notification.type === "error"
                    ? "bg-red-900/95 border-red-700 text-red-100"
                    : "bg-blue-900/95 border-blue-700 text-blue-100"
              } border px-4 py-3 rounded-lg backdrop-blur-sm flex items-start space-x-3 shadow-xl animate-in slide-in-from-right-5`}
            >
              {notification.type === "success" && <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
              {notification.type === "error" && <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
              {notification.type === "info" && <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs opacity-75 mt-1">{notification.timestamp}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                className="hover:opacity-70 transition-opacity"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Route Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Routes"
          value={routeStats.totalRoutes.toString()}
          change="+3"
          trend="up"
          description="this week"
          icon={Route}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Active Routes"
          value={routeStats.activeRoutes.toString()}
          change="+2"
          trend="up"
          description="in progress"
          icon={Navigation}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Completed Today"
          value={routeStats.completedToday.toString()}
          change="+5"
          trend="up"
          description="on schedule"
          icon={Target}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title="Avg Efficiency"
          value={`${routeStats.avgEfficiency}%`}
          change="+8%"
          trend="up"
          description="performance rating"
          icon={Zap}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
        />
      </div>


      {/* Enhanced AI Optimization Insights */}
      <Card className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-cyan-900/30 border-blue-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500 animate-pulse" />
            AI Route Optimization Insights
            <Badge className="ml-2 bg-green-600 animate-pulse">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {optimizationInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 ${insight.bgGradient} rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                    <insight.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${insight.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm">{insight.title}</h4>
                    <p className={`text-sm font-bold ${insight.color}`}>{insight.impact}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Live Route Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-green-500" />
              Live Route Tracking
              {selectedRoute && <Badge className="ml-2 bg-blue-600 animate-pulse">{selectedRoute} Selected</Badge>}
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <MockMap
                routes={routes}
                selectedRoute={selectedRoute}
                onRouteSelect={(routeId: string) => setSelectedRoute(routeId)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Route Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <Button
              className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-sm transition-all duration-300 hover:scale-105"
              onClick={handleCreateRoute}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Route
            </Button>

            <Button
              className={`w-full justify-start text-sm transition-all duration-300 hover:scale-105 ${
                isOptimizing
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-700"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
              onClick={() => setIsAdvancedOptimizationOpen(true)} // Open advanced optimization modal
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Advanced AI Optimize
                </>
              )}
            </Button>

            <Button
              className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-sm transition-all duration-300 hover:scale-105"
              onClick={() => setIsDriverAssignmentOpen(true)} // Open driver assignment modal
            >
              <Users className="h-4 w-4 mr-2" />
              Assign Drivers
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 text-sm transition-all duration-300 hover:scale-105"
              onClick={() => {
                toast.success("Routes exported successfully");
                // Simulate CSV export
                const csv = routes.map((r) => Object.values(r).join(",")).join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "routes.csv";
                a.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Routes
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 text-sm transition-all duration-300 hover:scale-105"
              onClick={() => {
                setRoutes((prev) =>
                  prev.map((r) => ({
                    ...r,
                    efficiency: Math.max(r.efficiency - Math.random() * 10, 0),
                    optimizationSavings: `KSh ${Math.round(
                      parseFloat(r.optimizationSavings.replace("KSh ", "")) * 0.8,
                    )}`,
                  })),
                );
                toast.success("Optimization reset");
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Optimization
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 text-sm transition-all duration-300 hover:scale-105"
              onClick={() => {
                setRoutes((prev) =>
                  prev.map((r) =>
                    r.status === "active"
                      ? optimizeRoute(r, { time: 0.7, fuel: 0.2, distance: 0.1 }) // Prioritize time for emergency
                      : r,
                  ),
                );
                addNotification("Emergency reroute completed with time priority", "info");
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Reroute
            </Button>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <h4 className="text-white font-medium mb-3 text-sm">Quick Stats</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Speed</span>
                  <span className="text-white">45 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">On-time Rate</span>
                  <span className="text-green-400">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel Efficiency</span>
                  <span className="text-blue-400">12.5 km/L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs for Route Management */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <TabsList className="bg-gray-800/50 backdrop-blur-sm mb-4 sm:mb-0">
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Active Routes ({routes.filter((r) => r.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Completed ({routes.filter((r) => r.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="planned" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Planned ({routes.filter((r) => r.status === "planned").length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search routes, drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Active Routes ({routes.filter((r) => r.status === "active").length})
                <div className="ml-auto">
                  <Badge className="bg-green-600 animate-pulse">Live Updates</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Route</TableHead>
                      <TableHead className="text-gray-400">Driver & Vehicle</TableHead>
                      <TableHead className="text-gray-400">Progress</TableHead>
                      <TableHead className="text-gray-400">Current Location</TableHead>
                      <TableHead className="text-gray-400">Efficiency</TableHead>
                      <TableHead className="text-gray-400">Revenue</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutes
                      .filter((route) => route.status === "active")
                      .map((route) => (
                        <TableRow key={route.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.name}</p>
                              <p className="text-xs text-gray-400">{route.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.driver}</p>
                              <p className="text-xs text-gray-400">{route.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-white">
                                  {route.outletsCompleted}/{route.outlets} outlets
                                </span>
                                <span className="text-gray-400">{route.progress}%</span>
                              </div>
                              <Progress value={route.progress} className="h-2 bg-gray-700" />
                              <p className="text-xs text-gray-400">ETA: {route.estimatedCompletion}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="flex items-center text-white mb-1">
                                <MapPin className="h-3 w-3 mr-1 text-blue-400" />
                                {route.currentLocation}
                              </div>
                              <p className="text-xs text-gray-400">Next: {route.nextStop}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <span className={`text-lg font-bold ${getEfficiencyColor(route.efficiency)}`}>
                                {route.efficiency.toFixed(1)}% {/* Changed to truncate to 1 decimal */}
                              </span>
                              <p className="text-xs text-gray-400">{route.distance}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.revenue}</p>
                              <p className="text-xs text-green-400">+{route.optimizationSavings} saved</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(route)}
                                className="hover:bg-blue-600/20"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRouteAction(route.id, "pause")}
                                className="hover:bg-yellow-600/20"
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRouteAction(route.id, "complete")}
                                className="hover:bg-green-600/20"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                Completed Routes ({routes.filter((r) => r.status === "completed").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Route</TableHead>
                      <TableHead className="text-gray-400">Driver & Vehicle</TableHead>
                      <TableHead className="text-gray-400">Completion</TableHead>
                      <TableHead className="text-gray-400">Time Performance</TableHead>
                      <TableHead className="text-gray-400">Efficiency</TableHead>
                      <TableHead className="text-gray-400">Revenue</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutes
                      .filter((route) => route.status === "completed")
                      .map((route) => (
                        <TableRow key={route.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.name}</p>
                              <p className="text-xs text-gray-400">{route.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.driver}</p>
                              <p className="text-xs text-gray-400">{route.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <Badge className="bg-blue-600 mb-1">Completed</Badge>
                              <p className="text-xs text-gray-400">
                                {route.outletsCompleted}/{route.outlets} outlets
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.actualTime}</p>
                              <p className="text-xs text-green-400">
                                {route.actualTime < route.estimatedTime ? "Early" : "On Time"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <span className={`text-lg font-bold ${getEfficiencyColor(route.efficiency)}`}>
                                {route.efficiency}%
                              </span>
                              <p className="text-xs text-gray-400">{route.distance}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.revenue}</p>
                              <p className="text-xs text-green-400">+{route.optimizationSavings} saved</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(route)}
                                className="hover:bg-blue-600/20"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRouteAction(route.id, "reset")}
                                className="hover:bg-orange-600/20"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planned" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                Planned Routes ({routes.filter((r) => r.status === "planned").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Route</TableHead>
                      <TableHead className="text-gray-400">Driver & Vehicle</TableHead>
                      <TableHead className="text-gray-400">Schedule</TableHead>
                      <TableHead className="text-gray-400">Outlets</TableHead>
                      <TableHead className="text-gray-400">Estimated</TableHead>
                      <TableHead className="text-gray-400">Expected Revenue</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoutes
                      .filter((route) => route.status === "planned")
                      .map((route) => (
                        <TableRow key={route.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.name}</p>
                              <p className="text-xs text-gray-400">{route.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.driver}</p>
                              <p className="text-xs text-gray-400">{route.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">Start: {route.startTime}</p>
                              <p className="text-xs text-gray-400">ETA: {route.estimatedCompletion}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.outlets} outlets</p>
                              <p className="text-xs text-gray-400">{route.distance}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{route.estimatedTime}</p>
                              <p className="text-xs text-gray-400">Fuel: {route.fuelCost}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{route.revenue}</p>
                              <p className="text-xs text-green-400">+{route.optimizationSavings} savings</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRouteAction(route.id, "start")}
                                className="hover:bg-green-600/20"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(route)}
                                className="hover:bg-blue-600/20"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-600/20">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Route Efficiency Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Efficiency Analytics</p>
                    <p className="text-sm text-gray-400 mt-1">Average: {routeStats.avgEfficiency}% efficiency</p>
                    <p className="text-xs text-blue-400 mt-2">+5.2% improvement this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Fuel className="h-5 w-5 mr-2 text-green-500" />
                  Fuel Consumption Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <Fuel className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Fuel Analytics</p>
                    <p className="text-sm text-gray-400 mt-1">Total saved: {routeStats.fuelSaved}</p>
                    <p className="text-xs text-green-400 mt-2">15% reduction this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-300">On-time Delivery</span>
                    <span className="text-green-400 font-bold">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-300">Customer Satisfaction</span>
                    <span className="text-blue-400 font-bold">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-300">Route Optimization</span>
                    <span className="text-purple-400 font-bold">87.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-300">Cost Reduction</span>
                    <span className="text-orange-400 font-bold">12.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
                  Revenue Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <DollarSign className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Revenue Analytics</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Total:{" "}
                      {routes
                        .reduce((sum, r) => sum + Number.parseFloat(r.revenue.replace("KSh ", "").replace(",", "")), 0)
                        .toLocaleString()}{" "}
                      KSh
                    </p>
                    <p className="text-xs text-yellow-400 mt-2">+8% growth this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Route Details Modal */}
      <RouteDetailsModal
        route={selectedRouteDetails}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onUpdate={(updatedRoute) => {
          setRoutes((prev) => prev.map((r) => (r.id === updatedRoute.id ? updatedRoute : r)))
          addNotification(`Route ${updatedRoute.id} updated successfully`)
        }}
      />

      {/* Advanced Optimization Modal */}
      <Dialog open={isAdvancedOptimizationOpen} onOpenChange={setIsAdvancedOptimizationOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Advanced Route Optimization
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label className="text-gray-200">Prioritize Time ({optimizationParams.prioritizeTime.toFixed(2)})</Label>
              <Slider
                value={[optimizationParams.prioritizeTime]}
                onValueChange={([value]) =>
                  setOptimizationParams((prev) => ({
                    ...prev,
                    prioritizeTime: value,
                    prioritizeFuel: prev.prioritizeFuel * (1 - value / prev.prioritizeTime),
                    prioritizeDistance:
                      1 - value - prev.prioritizeFuel * (1 - value / prev.prioritizeTime),
                  }))
                }
                min={0}
                max={1}
                step={0.01}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-gray-200">Prioritize Fuel ({optimizationParams.prioritizeFuel.toFixed(2)})</Label>
              <Slider
                value={[optimizationParams.prioritizeFuel]}
                onValueChange={([value]) =>
                  setOptimizationParams((prev) => ({
                    ...prev,
                    prioritizeFuel: value,
                    prioritizeTime: prev.prioritizeTime * (1 - value / prev.prioritizeFuel),
                    prioritizeDistance:
                      1 - value - prev.prioritizeTime * (1 - value / prev.prioritizeFuel),
                  }))
                }
                min={0}
                max={1}
                step={0.01}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={optimizationParams.avoidTraffic}
                onCheckedChange={(checked) =>
                  setOptimizationParams((prev) => ({ ...prev, avoidTraffic: !!checked }))
                }
              />
              <Label className="text-gray-200">Avoid Traffic Hotspots</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAdvancedOptimizationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setIsOptimizing(true);
                setTimeout(() => {
                  setRoutes((prev) =>
                    prev.map((r) =>
                      r.status !== "completed"
                        ? optimizeRoute(r, {
                            time: optimizationParams.prioritizeTime,
                            fuel: optimizationParams.prioritizeFuel,
                            distance: optimizationParams.prioritizeDistance,
                          })
                        : r
                    ),
                  );
                  setIsOptimizing(false);
                  addNotification("Advanced optimization completed successfully");
                  setIsAdvancedOptimizationOpen(false);
                }, 2000);
              }}
              disabled={isOptimizing}
            >
              {isOptimizing ? <RefreshCw className="animate-spin h-4 w-4 mr-2" /> : <Zap className="h-4 w-4 mr-2" />}
              Optimize Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Driver Assignment Modal */}
      <Dialog open={isDriverAssignmentOpen} onOpenChange={setIsDriverAssignmentOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Smart Driver Assignment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">
              Automatically assign drivers to unassigned or planned routes based on availability and proximity.
            </p>
            <div className="space-y-2">
              {routes
                .filter((r) => r.driver === "Unassigned" || r.status === "planned")
                .map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                    <span className="text-white text-sm">{route.name} ({route.id})</span>
                    <span className="text-gray-400 text-xs">{route.driver}</span>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDriverAssignmentOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                setRoutes((prev) =>
                  prev.map((r) =>
                    r.driver === "Unassigned" || r.status === "planned" ? assignDriver(r, drivers) : r,
                  ) as Route[], // Explicitly cast to Route[] to satisfy TypeScript
                );
                addNotification("Drivers assigned successfully");
                setIsDriverAssignmentOpen(false);
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Assign Drivers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
