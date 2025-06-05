"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/ui/stat-card"
import {
  ShoppingCart,
  Search,
  Plus,
  Download,
  Filter,
  Clock,
  CheckCircle,
  TruckIcon,
  AlertCircle,
  XCircle,
  Eye,
  FileText,
  Calendar,
  Package,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  X,
  Check,
  RefreshCw,
  Archive,
  Copy,
  Send,
  Star,
  ChevronDown,
  Printer,
  MessageSquare,
  Settings,
  MoreHorizontal
} from "lucide-react"

export default function EnhancedOrdersView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const orderStats = {
    total: 1247,
    pending: 23,
    delivered: 1164,
    totalValue: "KSh 4,567,890",
  }

  const orders = [
    {
      id: "ORD-2024-001",
      customer: "Mama Mboga Store",
      customerType: "Retail",
      location: "Westlands",
      date: "2024-01-20",
      items: 12,
      amount: "KSh 15,400",
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "M-Pesa",
      priority: "normal",
      phone: "+254712345678",
      email: "mama@mboga.com",
      deliveryDate: "2024-01-21",
      notes: "Regular customer, prefers morning delivery",
      products: [
        { name: "Coca Cola 500ml", quantity: 24, price: "KSh 2,400" },
        { name: "Bread Loaves", quantity: 10, price: "KSh 500" },
        { name: "Milk 1L", quantity: 12, price: "KSh 1,200" }
      ]
    },
    {
      id: "ORD-2024-002",
      customer: "City Supermarket",
      customerType: "Modern Trade",
      location: "CBD",
      date: "2024-01-20",
      items: 28,
      amount: "KSh 45,200",
      status: "processing",
      paymentStatus: "pending",
      paymentMethod: "Credit",
      priority: "high",
      phone: "+254723456789",
      email: "orders@citysupermarket.com",
      deliveryDate: "2024-01-22",
      notes: "Urgent order for weekend promotion",
      products: [
        { name: "Rice 2kg", quantity: 50, price: "KSh 7,500" },
        { name: "Cooking Oil 1L", quantity: 30, price: "KSh 4,500" },
        { name: "Sugar 1kg", quantity: 25, price: "KSh 2,750" }
      ]
    },
    {
      id: "ORD-2024-003",
      customer: "Village Kiosk",
      customerType: "Retail",
      location: "Kasarani",
      date: "2024-01-20",
      items: 8,
      amount: "KSh 8,750",
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "Cash on Delivery",
      priority: "normal",
      phone: "+254734567890",
      email: "village@kiosk.com",
      deliveryDate: "2024-01-23",
      notes: "First time customer",
      products: [
        { name: "Soap Bars", quantity: 20, price: "KSh 2,000" },
        { name: "Toothpaste", quantity: 12, price: "KSh 1,800" }
      ]
    },
    {
      id: "ORD-2024-004",
      customer: "Metro Wholesale",
      customerType: "Wholesale",
      location: "Industrial Area",
      date: "2024-01-19",
      items: 45,
      amount: "KSh 67,300",
      status: "shipped",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      priority: "normal",
      phone: "+254745678901",
      email: "metro@wholesale.com",
      deliveryDate: "2024-01-21",
      notes: "Weekly bulk order",
      products: [
        { name: "Flour 2kg", quantity: 100, price: "KSh 15,000" },
        { name: "Tea Leaves 500g", quantity: 50, price: "KSh 12,500" }
      ]
    },
    {
      id: "ORD-2024-005",
      customer: "Quick Mart",
      customerType: "Modern Trade",
      location: "Kilimani",
      date: "2024-01-19",
      items: 32,
      amount: "KSh 52,800",
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "M-Pesa",
      priority: "normal",
      phone: "+254756789012",
      email: "quickmart@orders.com",
      deliveryDate: "2024-01-20",
      notes: "Regular weekly order",
      products: [
        { name: "Detergent 1kg", quantity: 25, price: "KSh 6,250" },
        { name: "Biscuits Assorted", quantity: 40, price: "KSh 8,000" }
      ]
    },
    {
      id: "ORD-2024-006",
      customer: "Corner Shop",
      customerType: "Retail",
      location: "Embakasi",
      date: "2024-01-18",
      items: 15,
      amount: "KSh 12,450",
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "M-Pesa",
      priority: "low",
      phone: "+254767890123",
      email: "corner@shop.com",
      deliveryDate: "2024-01-19",
      notes: "Customer requested cancellation",
      products: [
        { name: "Juice 1L", quantity: 15, price: "KSh 2,250" }
      ]
    },
    {
      id: "ORD-2024-007",
      customer: "Naivas Supermarket",
      customerType: "Modern Trade",
      location: "Ngong Road",
      date: "2024-01-18",
      items: 65,
      amount: "KSh 98,500",
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "Credit",
      priority: "high",
      phone: "+254778901234",
      email: "naivas@orders.com",
      deliveryDate: "2024-01-19",
      notes: "VIP customer - priority handling",
      products: [
        { name: "Cereals 500g", quantity: 30, price: "KSh 9,000" },
        { name: "Pasta 500g", quantity: 40, price: "KSh 6,000" },
        { name: "Canned Foods", quantity: 50, price: "KSh 12,500" }
      ]
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-600"
      case "processing": return "bg-blue-600"
      case "pending": return "bg-orange-600"
      case "shipped": return "bg-purple-600"
      case "cancelled": return "bg-red-600"
      default: return "bg-gray-600"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-600"
      case "pending": return "bg-orange-600"
      case "refunded": return "bg-red-600"
      default: return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 text-red-400"
      case "normal": return "border-blue-500 text-blue-400"
      case "low": return "border-gray-500 text-gray-400"
      default: return "border-gray-500 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4 mr-1" />
      case "processing": return <Clock className="h-4 w-4 mr-1" />
      case "pending": return <AlertCircle className="h-4 w-4 mr-1" />
      case "shipped": return <TruckIcon className="h-4 w-4 mr-1" />
      case "cancelled": return <XCircle className="h-4 w-4 mr-1" />
      default: return null
    }
  }

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length 
        ? [] 
        : filteredOrders.map(order => order.id)
    )
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on orders:`, selectedOrders)
    setSelectedOrders([])
    setShowBulkActions(false)
  }

  type Order = typeof orders[number];

  const handleOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesDate = dateFilter === "all" || order.date === dateFilter
    const matchesCustomerType = customerTypeFilter === "all" || order.customerType === customerTypeFilter
    const matchesPaymentMethod = paymentMethodFilter === "all" || order.paymentMethod === paymentMethodFilter

    return matchesSearch && matchesStatus && matchesDate && matchesCustomerType && matchesPaymentMethod
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case "amount":
        comparison = parseFloat(a.amount.replace(/[^0-9.-]/g, '')) - parseFloat(b.amount.replace(/[^0-9.-]/g, ''))
        break
      case "customer":
        comparison = a.customer.localeCompare(b.customer)
        break
      default:
        comparison = 0
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)

  return (
    <div className="space-y-8 p-8 max-w-full overflow-x-hidden">
      {/* Enhanced Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={orderStats.total.toLocaleString()}
          change="+8.2%"
          trend="up"
          icon={ShoppingCart}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="this month"
        />
        <StatCard
          title="Pending"
          value={orderStats.pending.toString()}
          change="-3"
          trend="up"
          icon={AlertCircle}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="awaiting action"
        />
        <StatCard
          title="Delivered"
          value={orderStats.delivered.toLocaleString()}
          change="+156"
          trend="up"
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          description="completed"
        />
        <StatCard
          title="Total Value"
          value={orderStats.totalValue}
          change="+15.3%"
          trend="up"
          icon={TruckIcon}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          description="order value"
        />
      </div>

      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <Card className="bg-blue-900/30 border-blue-500/50 backdrop-blur-sm rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-blue-200 font-medium">
                  {selectedOrders.length} orders selected
                </span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-500 text-blue-200 hover:bg-blue-800"
                    onClick={() => handleBulkAction('update_status')}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Update Status
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-500 text-green-200 hover:bg-green-800"
                    onClick={() => handleBulkAction('mark_paid')}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Paid
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-500 text-purple-200 hover:bg-purple-800"
                    onClick={() => handleBulkAction('export')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-orange-500 text-orange-200 hover:bg-orange-800"
                    onClick={() => handleBulkAction('archive')}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedOrders([])}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Filters and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full h-12 bg-gray-800/50 border-gray-700 rounded-xl text-sm"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-700 hover:bg-gray-800 h-12 px-4 rounded-xl"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 h-12 px-4 rounded-xl">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800 h-12 px-4 rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-6 rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 bg-gray-800/50 border border-gray-700 rounded-lg px-3 text-sm text-gray-200"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Customer Type</label>
                  <select
                    value={customerTypeFilter}
                    onChange={(e) => setCustomerTypeFilter(e.target.value)}
                    className="w-full h-10 bg-gray-800/50 border border-gray-700 rounded-lg px-3 text-sm text-gray-200"
                  >
                    <option value="all">All Types</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Modern Trade">Modern Trade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                  <select
                    value={paymentMethodFilter}
                    onChange={(e) => setPaymentMethodFilter(e.target.value)}
                    className="w-full h-10 bg-gray-800/50 border border-gray-700 rounded-lg px-3 text-sm text-gray-200"
                  >
                    <option value="all">All Methods</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Credit">Credit</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 h-10 bg-gray-800/50 border border-gray-700 rounded-lg px-3 text-sm text-gray-200"
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                      <option value="customer">Customer</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="border-gray-700 hover:bg-gray-800 px-3 h-10"
                    >
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Orders Table */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Orders ({sortedOrders.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-800/50">
                <TableRow className="border-gray-700">
                  <TableHead className="w-12 text-center"></TableHead> {/* Empty header to maintain alignment */}
                  <TableHead className="text-gray-400 text-xs uppercase">Order</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Customer</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Date</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Items</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Amount</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Status</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Payment</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Priority</TableHead>
                  <TableHead className="text-gray-400 text-xs uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <p className="text-white text-sm font-medium">{order.id}</p>
                        <p className="text-xs text-gray-400">{order.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-gray-400">{order.customerType}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">{order.date}</TableCell>
                    <TableCell className="text-gray-300 text-sm">{order.items}</TableCell>
                    <TableCell className="font-medium text-white text-sm">{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} px-2 py-1 text-xs`}>
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPaymentStatusColor(order.paymentStatus)} px-2 py-1 text-xs border-0`}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPriorityColor(order.priority)} px-2 py-1 text-xs`}>
                        {order.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-gray-800 rounded-lg p-2"
                          onClick={() => handleOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-800 rounded-lg p-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-800 rounded-lg p-2">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-800 rounded-lg p-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-6 bg-gray-800/30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-gray-700"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-blue-600" : "border-gray-700"}
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold text-white">
                    Order Details - {selectedOrder.id}
                  </CardTitle>
                  <p className="text-gray-400 mt-1">{selectedOrder.customer}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(selectedOrder.status)} px-3 py-1`}>
                    <div className="flex items-center">
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status}
                    </div>
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{selectedOrder.customer}</p>
                          <p className="text-gray-400 text-sm">{selectedOrder.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white">{selectedOrder.phone}</p>
                          <p className="text-gray-400 text-sm">Primary contact</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white">{selectedOrder.email}</p>
                          <p className="text-gray-400 text-sm">Email address</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-white">{selectedOrder.customerType}</p>
                          <p className="text-gray-400 text-sm">Customer type</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Order Notes</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-300">{selectedOrder.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Order Date:</span>
                        <span className="text-white">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery Date:</span>
                        <span className="text-white">{selectedOrder.deliveryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Items:</span>
                        <span className="text-white">{selectedOrder.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority:</span>
                        <Badge variant="outline" className={`${getPriorityColor(selectedOrder.priority)} px-2 py-1 text-xs`}>
                          {selectedOrder.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Method:</span>
                        <span className="text-white">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Status:</span>
                        <Badge variant="outline" className={`${getPaymentStatusColor(selectedOrder.paymentStatus)} px-2 py-1 text-xs border-0`}>
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span className="text-gray-400 font-medium">Total Amount:</span>
                        <span className="text-white font-bold text-lg">{selectedOrder.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product List */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
                <div className="bg-gray-800/30 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-800/50">
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-400">Product</TableHead>
                        <TableHead className="text-gray-400">Quantity</TableHead>
                        <TableHead className="text-gray-400">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((product, index) => (
                        <TableRow key={index} className="border-gray-700">
                          <TableCell className="text-white">{product.name}</TableCell>
                          <TableCell className="text-gray-300">{product.quantity}</TableCell>
                          <TableCell className="text-white font-medium">{product.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Order
                </Button>
                <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
                <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  <TruckIcon className="h-4 w-4 mr-2" />
                  Update Shipping
                </Button>
                <Button variant="outline" className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Order
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}