"use client"

import React, { useState, useEffect } from "react"
import type { JSX } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/ui/stat-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Truck,
  Search,
  Plus,
  Download,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  Navigation,
  Phone,
  Eye,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Fuel,
  Route,
  Play,
  RotateCcw,
  Settings,
  X,
  Edit,
  MessageSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Enhanced Mock Map Component with real-time tracking
type Delivery = {
  id: string
  orderId: string
  customer: string
  address: string
  phone: string
  driver: string
  vehicle: string
  status: string
  scheduledTime: string
  actualTime: string | null
  items: number
  weight: string
  distance: string
  deliveryNote: string
  priority: string
  customerSignature: string | null
}

type Vehicle = {
  id: string
  plateNumber: string
  driver: string
  driverPhone: string
  status: string
  currentLocation: string
  deliveriesAssigned: number
  deliveriesCompleted: number
  fuelLevel: number
  lastUpdate: string
  route: string
  estimatedReturn: string
}

interface DeliveryMapProps {
  vehicles: Vehicle[]
  deliveries: Delivery[]
  selectedVehicle: string | null
  onVehicleSelect: (vehicle: string) => void
}

const DeliveryMap = ({ vehicles, deliveries, selectedVehicle, onVehicleSelect }: DeliveryMapProps) => {
  const [animatedPositions, setAnimatedPositions] = useState<Record<string, { x: number; y: number }>>({})

  const mapMarkers = [
    { id: "depot", x: 20, y: 30, type: "depot", label: "Main Depot" },
    { id: "VH-001", x: 60, y: 25, type: "active", label: "Westlands", vehicle: "KCA 123A" },
    { id: "VH-002", x: 75, y: 60, type: "active", label: "Embakasi", vehicle: "KBZ 456B" },
    { id: "VH-003", x: 40, y: 45, type: "returned", label: "CBD", vehicle: "KCX 789C" },
    { id: "VH-004", x: 25, y: 35, type: "maintenance", label: "Service Center", vehicle: "KDA 012D" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPositions((prev) => {
        const newPositions = { ...prev }
        mapMarkers.forEach((marker) => {
          if (marker.type === "active") {
            newPositions[marker.id] = {
              x: marker.x + (Math.random() - 0.5) * 2,
              y: marker.y + (Math.random() - 0.5) * 2,
            }
          }
        })
        return newPositions
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  interface MapMarker {
    id: string
    x: number
    y: number
    type: "active" | "returned" | "maintenance" | "depot"
    label: string
    vehicle?: string
  }

  type StatusColor =
    | "active"
    | "returned"
    | "maintenance"
    | "depot"
    | string

  const getStatusColor = (status: StatusColor): string => {
    switch (status) {
      case "active":
        return "#10b981"
      case "returned":
        return "#3b82f6"
      case "maintenance":
        return "#6b7280"
      case "depot":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 animate-pulse"></div>
      </div>

      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="delivery-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <filter id="delivery-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#delivery-grid)" />

        {/* Vehicle markers */}
        {mapMarkers.map((marker) => {
          const position = animatedPositions[marker.id] || { x: marker.x, y: marker.y }
          const isSelected = selectedVehicle === marker.vehicle

          return (
            <g
              key={marker.id}
              className="cursor-pointer"
              onClick={() => {
                if (marker.vehicle) onVehicleSelect(marker.vehicle)
              }}
            >
              {/* Pulse effect for active vehicles */}
              {marker.type === "active" && (
                <circle
                  cx={`${position.x}%`}
                  cy={`${position.y}%`}
                  r="12"
                  fill={getStatusColor(marker.type)}
                  opacity="0.3"
                >
                  <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Main marker */}
              <circle
                cx={`${position.x}%`}
                cy={`${position.y}%`}
                r={marker.type === "depot" ? "8" : "6"}
                fill={getStatusColor(marker.type)}
                stroke="white"
                strokeWidth="2"
                className="hover:r-10 transition-all duration-300"
                filter={isSelected ? "url(#delivery-glow)" : "none"}
              />

              {/* Vehicle icon */}
              {marker.type !== "depot" && (
                <text
                  x={`${position.x}%`}
                  y={`${position.y + 2}%`}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  className="font-bold"
                >
                  🚛
                </text>
              )}

              {/* Label */}
              <text
                x={`${position.x}%`}
                y={`${position.y + 12}%`}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="font-medium drop-shadow-lg"
              >
                {marker.label}
              </text>

              {/* Vehicle plate for non-depot markers */}
              {marker.vehicle && (
                <text
                  x={`${position.x}%`}
                  y={`${position.y - 10}%`}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  className="font-bold opacity-75"
                >
                  {marker.vehicle}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Enhanced map legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-gray-700/50 shadow-xl">
        <h4 className="text-white font-semibold mb-3 text-sm">Vehicle Status</h4>
        <div className="flex flex-col space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white">Active ({vehicles.filter((v) => v.status === "active").length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-white">Returned ({vehicles.filter((v) => v.status === "returned").length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-white">
              Maintenance ({vehicles.filter((v) => v.status === "maintenance").length})
            </span>
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
          <div className="text-green-400 font-bold text-lg">{vehicles.filter((v) => v.status === "active").length}</div>
          <div className="text-xs text-gray-400">Active Now</div>
          <div className="text-blue-400 font-bold text-sm mt-2">
            {deliveries.filter((d) => d.status === "in-transit").length}
          </div>
          <div className="text-xs text-gray-400">In Transit</div>
        </div>
      </div>
    </div>
  )
}

export default function DeliveryView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const deliveryStats = {
    totalDeliveries: 1247,
    inTransit: 23,
    delivered: 1164,
    failed: 8,
    avgDeliveryTime: "2.4 hours",
    onTimeRate: "94.2%",
  }

  const [vehicles, setVehicles] = useState([
    {
      id: "VH-001",
      plateNumber: "KCA 123A",
      driver: "John Kamau",
      driverPhone: "+254 712 345 678",
      status: "active",
      currentLocation: "Westlands",
      deliveriesAssigned: 8,
      deliveriesCompleted: 5,
      fuelLevel: 75,
      lastUpdate: "2 min ago",
      route: "CBD Central Route",
      estimatedReturn: "16:30",
    },
    {
      id: "VH-002",
      plateNumber: "KBZ 456B",
      driver: "Mary Wanjiku",
      driverPhone: "+254 723 456 789",
      status: "active",
      currentLocation: "Embakasi",
      deliveriesAssigned: 12,
      deliveriesCompleted: 7,
      fuelLevel: 60,
      lastUpdate: "5 min ago",
      route: "Eastlands Express",
      estimatedReturn: "17:15",
    },
    {
      id: "VH-003",
      plateNumber: "KCX 789C",
      driver: "Peter Ochieng",
      driverPhone: "+254 734 567 890",
      status: "returned",
      currentLocation: "Depot",
      deliveriesAssigned: 6,
      deliveriesCompleted: 6,
      fuelLevel: 45,
      lastUpdate: "1 hour ago",
      route: "Westlands Premium",
      estimatedReturn: "Completed",
    },
    {
      id: "VH-004",
      plateNumber: "KDA 012D",
      driver: "Grace Muthoni",
      driverPhone: "+254 745 678 901",
      status: "maintenance",
      currentLocation: "Service Center",
      deliveriesAssigned: 0,
      deliveriesCompleted: 0,
      fuelLevel: 0,
      lastUpdate: "3 hours ago",
      route: "Under Maintenance",
      estimatedReturn: "Tomorrow",
    },
  ])

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL-2024-001",
      orderId: "ORD-2024-001",
      customer: "Mama Mboga Store",
      address: "123 Moi Avenue, Westlands",
      phone: "+254 712 345 678",
      driver: "John Kamau",
      vehicle: "KCA 123A",
      status: "delivered",
      scheduledTime: "10:00",
      actualTime: "09:45",
      items: 12,
      weight: "45 kg",
      distance: "12.5 km",
      deliveryNote: "Delivered successfully",
      priority: "normal",
      customerSignature: "Received",
    },
    {
      id: "DEL-2024-002",
      orderId: "ORD-2024-002",
      customer: "City Supermarket",
      address: "456 Kenyatta Avenue, CBD",
      phone: "+254 723 456 789",
      driver: "Mary Wanjiku",
      vehicle: "KBZ 456B",
      status: "in-transit",
      scheduledTime: "14:00",
      actualTime: null,
      items: 28,
      weight: "78 kg",
      distance: "8.2 km",
      deliveryNote: "En route to customer",
      priority: "high",
      customerSignature: null,
    },
    {
      id: "DEL-2024-003",
      orderId: "ORD-2024-003",
      customer: "Village Kiosk",
      address: "789 Thika Road, Kasarani",
      phone: "+254 734 567 890",
      driver: "John Kamau",
      vehicle: "KCA 123A",
      status: "scheduled",
      scheduledTime: "15:30",
      actualTime: null,
      items: 8,
      weight: "23 kg",
      distance: "18.7 km",
      deliveryNote: "Next delivery",
      priority: "normal",
      customerSignature: null,
    },
    {
      id: "DEL-2024-004",
      orderId: "ORD-2024-004",
      customer: "Metro Wholesale",
      address: "101 Enterprise Road, Industrial Area",
      phone: "+254 745 678 901",
      driver: "Mary Wanjiku",
      vehicle: "KBZ 456B",
      status: "failed",
      scheduledTime: "11:00",
      actualTime: "11:30",
      items: 45,
      weight: "156 kg",
      distance: "25.3 km",
      deliveryNote: "Customer not available",
      priority: "urgent",
      customerSignature: null,
    },
  ])

  interface Notification {
    id: number
    message: string
    type: "success" | "info" | "error" | "warning" | string
    timestamp: string
  }

  const addNotification = (message: string, type: Notification["type"] = "success") => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setNotifications((prev: Notification[]) => [...prev, notification])
    setTimeout(() => {
      setNotifications((prev: Notification[]) => prev.filter((n) => n.id !== notification.id))
    }, 5000)
  }

  interface DeliveryAction {
    deliveryId: string
    action: "start" | "complete" | "fail" | "reschedule" | string
  }

  const handleDeliveryAction = (deliveryId: string, action: DeliveryAction["action"]) => {
    setDeliveries((prevDeliveries: Delivery[]) =>
      prevDeliveries.map((delivery: Delivery) => {
        if (delivery.id === deliveryId) {
          switch (action) {
            case "start":
              addNotification(`Delivery ${deliveryId} started`)
              return { ...delivery, status: "in-transit", actualTime: new Date().toLocaleTimeString() }
            case "complete":
              addNotification(`Delivery ${deliveryId} completed successfully`)
              return {
                ...delivery,
                status: "delivered",
                actualTime: new Date().toLocaleTimeString(),
                customerSignature: "Received",
              }
            case "fail":
              addNotification(`Delivery ${deliveryId} marked as failed`)
              return { ...delivery, status: "failed", actualTime: new Date().toLocaleTimeString() }
            case "reschedule":
              addNotification(`Delivery ${deliveryId} rescheduled`)
              return { ...delivery, status: "scheduled" }
            default:
              return delivery
          }
        }
        return delivery
      }),
    )
  }

  interface VehicleAction {
    vehicleId: string
    action: "dispatch" | "return" | "maintenance" | string
  }

  const handleVehicleAction = (
    vehicleId: string,
    action: VehicleAction["action"]
  ) => {
    setVehicles((prevVehicles: Vehicle[]) =>
      prevVehicles.map((vehicle: Vehicle) => {
        if (vehicle.id === vehicleId) {
          switch (action) {
            case "dispatch":
              addNotification(`Vehicle ${vehicle.plateNumber} dispatched`)
              return { ...vehicle, status: "active" }
            case "return":
              addNotification(`Vehicle ${vehicle.plateNumber} returned to depot`)
              return { ...vehicle, status: "returned", currentLocation: "Depot" }
            case "maintenance":
              addNotification(`Vehicle ${vehicle.plateNumber} sent for maintenance`)
              return { ...vehicle, status: "maintenance", currentLocation: "Service Center" }
            default:
              return vehicle
          }
        }
        return vehicle
      }),
    )
  }

  const handleScheduleDelivery = () => {
    const newDelivery = {
      id: `DEL-2024-${String(deliveries.length + 1).padStart(3, "0")}`,
      orderId: `ORD-2024-${String(deliveries.length + 1).padStart(3, "0")}`,
      customer: "New Customer",
      address: "Address TBD",
      phone: "+254 xxx xxx xxx",
      driver: "Unassigned",
      vehicle: "TBD",
      status: "scheduled",
      scheduledTime: "TBD",
      actualTime: null,
      items: 0,
      weight: "0 kg",
      distance: "0 km",
      deliveryNote: "New delivery scheduled",
      priority: "normal",
      customerSignature: null,
    }
    setDeliveries((prev) => [...prev, newDelivery])
    addNotification("New delivery scheduled successfully")
    setShowScheduleModal(false)
  }

  interface StatusColorMap {
    [key: string]: string
  }

  type DeliveryStatus = "delivered" | "in-transit" | "scheduled" | "failed"
  type VehicleStatus = "active" | "returned" | "maintenance"
  type Status = DeliveryStatus | VehicleStatus | string

  const getStatusColor = (status: Status): string => {
    switch (status) {
      case "delivered":
        return "bg-green-600"
      case "in-transit":
        return "bg-blue-600"
      case "scheduled":
        return "bg-orange-600"
      case "failed":
        return "bg-red-600"
      case "active":
        return "bg-green-600"
      case "returned":
        return "bg-blue-600"
      case "maintenance":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  interface StatusIconProps {
    status: string
  }

  const getStatusIcon = (status: StatusIconProps["status"]): JSX.Element | null => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "in-transit":
        return <Truck className="h-4 w-4 mr-1" />
      case "scheduled":
        return <Clock className="h-4 w-4 mr-1" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  interface FuelLevelColorProps {
    level: number
  }

  const getFuelLevelColor = (level: FuelLevelColorProps["level"]): string => {
    if (level > 50) return "text-green-400"
    if (level > 25) return "text-yellow-400"
    return "text-red-400"
  }

  interface PriorityColorMap {
    [key: string]: string
  }

  type Priority = "urgent" | "high" | "normal" | "low" | string

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case "urgent":
        return "border-red-500 text-red-400"
      case "high":
        return "border-orange-500 text-orange-400"
      case "normal":
        return "border-blue-500 text-blue-400"
      case "low":
        return "border-gray-500 text-gray-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.slice(-3).map((notification) => (
            <div
              key={notification.id}
              className={`${
                notification.type === "success"
                  ? "bg-green-900/95 border-green-700 text-green-100"
                  : "bg-blue-900/95 border-blue-700 text-blue-100"
              } border px-4 py-3 rounded-lg backdrop-blur-sm flex items-start space-x-3 shadow-xl animate-in slide-in-from-right-5`}
            >
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs opacity-75 mt-1">{notification.timestamp}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Delivery Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Deliveries"
          value={deliveryStats.totalDeliveries.toLocaleString()}
          change="+8.2%"
          trend="up"
          icon={Package}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="this month"
        />
        <StatCard
          title="In Transit"
          value={deliveryStats.inTransit.toString()}
          change="+3"
          trend="up"
          icon={Truck}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="active deliveries"
        />
        <StatCard
          title="Delivered"
          value={deliveryStats.delivered.toLocaleString()}
          change="+156"
          trend="up"
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          description="completed"
        />
        <StatCard
          title="Failed"
          value={deliveryStats.failed.toString()}
          change="-2"
          trend="up"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-red-500 to-pink-600"
          description="need attention"
        />
      </div>


      {/* Enhanced Live Vehicle Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Navigation className="h-5 w-5 mr-2 text-blue-500" />
              Live Vehicle Tracking
              {selectedVehicle && <Badge className="ml-2 bg-blue-600 animate-pulse">{selectedVehicle} Selected</Badge>}
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <DeliveryMap
                vehicles={vehicles}
                deliveries={deliveries}
                selectedVehicle={selectedVehicle}
                onVehicleSelect={(vehicle: string) => setSelectedVehicle(vehicle)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className={`p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 cursor-pointer ${
                  selectedVehicle === vehicle.plateNumber ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedVehicle(vehicle.plateNumber)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{vehicle.plateNumber}</p>
                      <p className="text-xs text-gray-400">{vehicle.driver}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{vehicle.currentLocation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Deliveries:</span>
                    <span className="text-white">
                      {vehicle.deliveriesCompleted}/{vehicle.deliveriesAssigned}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Fuel:</span>
                    <span className={getFuelLevelColor(vehicle.fuelLevel)}>{vehicle.fuelLevel}%</span>
                  </div>
                  <Progress value={vehicle.fuelLevel} className="h-2 bg-gray-700" />
                  <div className="flex space-x-1 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-gray-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        addNotification(`Calling ${vehicle.driver}`)
                      }}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-gray-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        addNotification(`Tracking ${vehicle.plateNumber}`)
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Delivery Management Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <TabsList className="bg-gray-800/50 backdrop-blur-sm mb-4 sm:mb-0">
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Active Deliveries ({deliveries.filter((d) => d.status === "in-transit").length})
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Scheduled ({deliveries.filter((d) => d.status === "scheduled").length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Completed ({deliveries.filter((d) => d.status === "delivered").length})
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Fleet Management
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-gray-700"
              onClick={() => addNotification("Delivery data exported")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              onClick={() => setShowScheduleModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Delivery
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Truck className="h-5 w-5 mr-2 text-blue-500" />
                Active Deliveries ({deliveries.filter((d) => d.status === "in-transit").length})
                <div className="ml-auto">
                  <Badge className="bg-blue-600 animate-pulse">Live Updates</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Delivery</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Driver & Vehicle</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Schedule</TableHead>
                      <TableHead className="text-gray-400">Items</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries
                      .filter((delivery) => delivery.status === "in-transit")
                      .map((delivery) => (
                        <TableRow key={delivery.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{delivery.id}</p>
                              <p className="text-xs text-gray-400">{delivery.orderId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.customer}</p>
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {delivery.address.split(",")[1]}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.driver}</p>
                              <p className="text-xs text-gray-400">{delivery.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(delivery.status)}>
                                <div className="flex items-center">
                                  {getStatusIcon(delivery.status)}
                                  {delivery.status}
                                </div>
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(delivery.priority)}>
                                {delivery.priority}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">ETA: {delivery.scheduledTime}</p>
                              <p className="text-xs text-gray-400">{delivery.distance}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.items} items</p>
                              <p className="text-xs text-gray-400">{delivery.weight}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDelivery(delivery)
                                  setShowDeliveryModal(true)
                                }}
                                className="hover:bg-gray-800"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addNotification(`Calling customer for ${delivery.id}`)}
                                className="hover:bg-gray-800"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeliveryAction(delivery.id, "complete")}
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

        <TabsContent value="scheduled" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                Scheduled Deliveries ({deliveries.filter((d) => d.status === "scheduled").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Delivery</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Driver & Vehicle</TableHead>
                      <TableHead className="text-gray-400">Scheduled Time</TableHead>
                      <TableHead className="text-gray-400">Items</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries
                      .filter((delivery) => delivery.status === "scheduled")
                      .map((delivery) => (
                        <TableRow key={delivery.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{delivery.id}</p>
                              <p className="text-xs text-gray-400">{delivery.orderId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.customer}</p>
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {delivery.address.split(",")[1]}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.driver}</p>
                              <p className="text-xs text-gray-400">{delivery.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-white">
                              <Calendar className="h-3 w-3 mr-1" />
                              {delivery.scheduledTime}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.items} items</p>
                              <p className="text-xs text-gray-400">{delivery.weight}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeliveryAction(delivery.id, "start")}
                                className="hover:bg-green-600/20"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDelivery(delivery)
                                  setShowDeliveryModal(true)
                                }}
                                className="hover:bg-gray-800"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-800">
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

        <TabsContent value="completed" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Completed Deliveries ({deliveries.filter((d) => d.status === "delivered").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Delivery</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Driver</TableHead>
                      <TableHead className="text-gray-400">Completion</TableHead>
                      <TableHead className="text-gray-400">Performance</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries
                      .filter((delivery) => delivery.status === "delivered")
                      .map((delivery) => (
                        <TableRow key={delivery.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{delivery.id}</p>
                              <p className="text-xs text-gray-400">{delivery.orderId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.customer}</p>
                              <div className="flex items-center text-xs text-gray-400 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {delivery.address.split(",")[1]}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{delivery.driver}</p>
                              <p className="text-xs text-gray-400">{delivery.vehicle}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <Badge className="bg-green-600 mb-1">Delivered</Badge>
                              <p className="text-xs text-gray-400">at {delivery.actualTime}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-green-400 font-medium">On Time</p>
                              <p className="text-xs text-gray-400">{delivery.distance}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedDelivery(delivery)
                                  setShowDeliveryModal(true)
                                }}
                                className="hover:bg-gray-800"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeliveryAction(delivery.id, "reschedule")}
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

        <TabsContent value="vehicles" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Truck className="h-5 w-5 mr-2 text-blue-500" />
                Fleet Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Vehicle</TableHead>
                      <TableHead className="text-gray-400">Driver</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Current Route</TableHead>
                      <TableHead className="text-gray-400">Progress</TableHead>
                      <TableHead className="text-gray-400">Fuel Level</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{vehicle.plateNumber}</p>
                            <p className="text-xs text-gray-400">{vehicle.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{vehicle.driver}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {vehicle.driverPhone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                            <p className="text-xs text-gray-400">{vehicle.lastUpdate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{vehicle.route}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {vehicle.currentLocation}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">
                              {vehicle.deliveriesCompleted}/{vehicle.deliveriesAssigned}
                            </p>
                            <Progress
                              value={
                                vehicle.deliveriesAssigned > 0
                                  ? (vehicle.deliveriesCompleted / vehicle.deliveriesAssigned) * 100
                                  : 0
                              }
                              className="h-2 bg-gray-700 mt-1"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className={`font-medium ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                              {vehicle.fuelLevel}%
                            </span>
                            <Progress value={vehicle.fuelLevel} className="h-2 bg-gray-700 mt-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-800">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem
                                className="hover:bg-gray-800"
                                onClick={() => addNotification(`Tracking ${vehicle.plateNumber}`)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Track Vehicle
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-gray-800"
                                onClick={() => addNotification(`Calling ${vehicle.driver}`)}
                              >
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Driver
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-gray-800"
                                onClick={() => addNotification(`Viewing route for ${vehicle.plateNumber}`)}
                              >
                                <Route className="h-4 w-4 mr-2" />
                                View Route
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-gray-800"
                                onClick={() => addNotification(`Fuel report generated for ${vehicle.plateNumber}`)}
                              >
                                <Fuel className="h-4 w-4 mr-2" />
                                Fuel Report
                              </DropdownMenuItem>
                              {vehicle.status === "active" && (
                                <DropdownMenuItem
                                  className="hover:bg-gray-800"
                                  onClick={() => handleVehicleAction(vehicle.id, "return")}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Return to Depot
                                </DropdownMenuItem>
                              )}
                              {vehicle.status === "returned" && (
                                <DropdownMenuItem
                                  className="hover:bg-gray-800"
                                  onClick={() => handleVehicleAction(vehicle.id, "dispatch")}
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  Dispatch
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>
      </Tabs>

      {/* Delivery Details Modal */}
      {showDeliveryModal && selectedDelivery && (
        <Dialog open={showDeliveryModal} onOpenChange={setShowDeliveryModal}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center justify-between">
                <span>Delivery Details - {selectedDelivery.id}</span>
                <Badge className={getStatusColor(selectedDelivery.status)}>{selectedDelivery.status}</Badge>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Delivery Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400">Customer Name</Label>
                      <p className="text-white font-medium">{selectedDelivery.customer}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Address</Label>
                      <p className="text-white">{selectedDelivery.address}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Phone</Label>
                      <p className="text-white">{selectedDelivery.phone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Priority</Label>
                      <Badge variant="outline" className={getPriorityColor(selectedDelivery.priority)}>
                        {selectedDelivery.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Delivery Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Order ID:</span>
                      <span className="text-white">{selectedDelivery.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Driver:</span>
                      <span className="text-white">{selectedDelivery.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Vehicle:</span>
                      <span className="text-white">{selectedDelivery.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Scheduled Time:</span>
                      <span className="text-white">{selectedDelivery.scheduledTime}</span>
                    </div>
                    {selectedDelivery.actualTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Actual Time:</span>
                        <span className="text-green-400">{selectedDelivery.actualTime}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distance:</span>
                      <span className="text-white">{selectedDelivery.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Items:</span>
                      <span className="text-white">{selectedDelivery.items}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white">{selectedDelivery.weight}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Delivery Notes</h3>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <p className="text-gray-300">{selectedDelivery.deliveryNote}</p>
                </div>
              </div>

              {/* Customer Signature */}
              {selectedDelivery.customerSignature && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Proof of Delivery</h3>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-green-400 font-medium">✓ {selectedDelivery.customerSignature}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {selectedDelivery.status === "scheduled" && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleDeliveryAction(selectedDelivery.id, "start")
                      setShowDeliveryModal(false)
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Delivery
                  </Button>
                )}
                {selectedDelivery.status === "in-transit" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleDeliveryAction(selectedDelivery.id, "complete")
                        setShowDeliveryModal(false)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Delivered
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      onClick={() => {
                        handleDeliveryAction(selectedDelivery.id, "fail")
                        setShowDeliveryModal(false)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Mark Failed
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                  onClick={() => addNotification(`Calling customer for ${selectedDelivery.id}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                  onClick={() => addNotification(`SMS sent to customer for ${selectedDelivery.id}`)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Schedule Delivery Modal */}
      {showScheduleModal && (
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Schedule New Delivery</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input id="customer" placeholder="Customer name" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+254 xxx xxx xxx" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" placeholder="Full delivery address" className="bg-gray-800 border-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="driver">Assign Driver</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="john">John Kamau</SelectItem>
                      <SelectItem value="mary">Mary Wanjiku</SelectItem>
                      <SelectItem value="peter">Peter Ochieng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vehicle">Assign Vehicle</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="kca123a">KCA 123A</SelectItem>
                      <SelectItem value="kbz456b">KBZ 456B</SelectItem>
                      <SelectItem value="kcx789c">KCX 789C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="scheduled-time">Scheduled Time</Label>
                  <Input id="scheduled-time" type="time" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="items">Number of Items</Label>
                  <Input id="items" type="number" placeholder="0" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleDelivery} className="bg-blue-600 hover:bg-blue-700">
                  Schedule Delivery
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
