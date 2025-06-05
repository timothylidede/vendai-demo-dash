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
  Users,
  Search,
  Plus,
  Download,
  Filter,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  CreditCard,
  Eye,
  Edit,
  MoreHorizontal,
  TrendingUp,
  Store,
  X,
  RefreshCw,
  Send,
  FileText,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Customer = {
  id: string
  name: string
  type: string
  location: string
  address: string
  contact: string
  phone: string
  email: string
  status: string
  creditLimit: string
  currentCredit: string
  lastOrder: string
  totalOrders: number
  totalSpent: string
  rating: number
}

export function CustomersView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    type: "Retail",
    contact: "",
    phone: "",
    email: "",
    location: "",
    address: "",
    creditLimit: ""
  })
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const [showEditCustomer, setShowEditCustomer] = useState(false)
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [showCreditAdjust, setShowCreditAdjust] = useState(false)
  const [showSendMessage, setShowSendMessage] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Partial<Customer>>({})
  const [creditAdjustment, setCreditAdjustment] = useState({ amount: "", type: "increase", reason: "" })
  const [message, setMessage] = useState({ subject: "", body: "" })
  const [newOrder, setNewOrder] = useState({ items: [{ product: "", quantity: "", price: "" }], total: 0 })

  const customerStats = {
    total: 342,
    active: 298,
    totalRevenue: "KSh 4,567,890",
    averageOrderValue: "KSh 13,356",
  }

  const customers = [
    {
      id: "CUS-001",
      name: "Mama Mboga Store",
      type: "Retail",
      location: "Westlands",
      address: "123 Moi Avenue, Westlands",
      contact: "John Kamau",
      phone: "+254 712 345 678",
      email: "john@mamamboga.co.ke",
      status: "active",
      creditLimit: "KSh 50,000",
      currentCredit: "KSh 15,400",
      lastOrder: "2024-01-20",
      totalOrders: 45,
      totalSpent: "KSh 567,890",
      rating: 4.8,
    },
    {
      id: "CUS-002",
      name: "City Supermarket",
      type: "Modern Trade",
      location: "CBD",
      address: "456 Kenyatta Avenue, CBD",
      contact: "Mary Wanjiku",
      phone: "+254 723 456 789",
      email: "mary@citysupermarket.co.ke",
      status: "active",
      creditLimit: "KSh 500,000",
      currentCredit: "KSh 245,200",
      lastOrder: "2024-01-20",
      totalOrders: 128,
      totalSpent: "KSh 2,345,670",
      rating: 4.5,
    },
    {
      id: "CUS-003",
      name: "Village Kiosk",
      type: "Retail",
      location: "Kasarani",
      address: "789 Thika Road, Kasarani",
      contact: "Peter Ochieng",
      phone: "+254 734 567 890",
      email: "peter@villagekiosk.co.ke",
      status: "active",
      creditLimit: "KSh 30,000",
      currentCredit: "KSh 8,750",
      lastOrder: "2024-01-20",
      totalOrders: 32,
      totalSpent: "KSh 234,560",
      rating: 4.2,
    },
    {
      id: "CUS-004",
      name: "Metro Wholesale",
      type: "Wholesale",
      location: "Industrial Area",
      address: "101 Enterprise Road, Industrial Area",
      contact: "Grace Muthoni",
      phone: "+254 745 678 901",
      email: "grace@metrowholesale.co.ke",
      status: "active",
      creditLimit: "KSh 1,000,000",
      currentCredit: "KSh 567,300",
      lastOrder: "2024-01-19",
      totalOrders: 215,
      totalSpent: "KSh 4,567,890",
      rating: 4.9,
    },
    {
      id: "CUS-005",
      name: "Quick Mart",
      type: "Modern Trade",
      location: "Kilimani",
      address: "202 Argwings Kodhek Road, Kilimani",
      contact: "David Mwangi",
      phone: "+254 756 789 012",
      email: "david@quickmart.co.ke",
      status: "active",
      creditLimit: "KSh 750,000",
      currentCredit: "KSh 352,800",
      lastOrder: "2024-01-19",
      totalOrders: 178,
      totalSpent: "KSh 3,456,780",
      rating: 4.7,
    },
    {
      id: "CUS-006",
      name: "Corner Shop",
      type: "Retail",
      location: "Embakasi",
      address: "303 Airport North Road, Embakasi",
      contact: "Sarah Akinyi",
      phone: "+254 767 890 123",
      email: "sarah@cornershop.co.ke",
      status: "inactive",
      creditLimit: "KSh 25,000",
      currentCredit: "KSh 0",
      lastOrder: "2023-12-18",
      totalOrders: 28,
      totalSpent: "KSh 187,650",
      rating: 3.8,
    },
    {
      id: "CUS-007",
      name: "Naivas Supermarket",
      type: "Modern Trade",
      location: "Ngong Road",
      address: "404 Ngong Road",
      contact: "James Omondi",
      phone: "+254 778 901 234",
      email: "james@naivas.co.ke",
      status: "active",
      creditLimit: "KSh 2,000,000",
      currentCredit: "KSh 1,298,500",
      lastOrder: "2024-01-18",
      totalOrders: 312,
      totalSpent: "KSh 7,890,123",
      rating: 4.9,
    },
  ]

  const locations = [...new Set(customers.map(c => c.location))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-gray-600"
      case "new":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400"
    if (rating >= 4.0) return "text-blue-400"
    if (rating >= 3.5) return "text-yellow-400"
    return "text-orange-400"
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || customer.type === typeFilter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesLocation = locationFilter === "all" || customer.location === locationFilter
    const matchesTab = activeTab === "all" || 
      (activeTab === "modern-trade" && customer.type === "Modern Trade") ||
      (activeTab === "retail" && customer.type === "Retail") ||
      (activeTab === "wholesale" && customer.type === "Wholesale")

    return matchesSearch && matchesType && matchesStatus && matchesLocation && matchesTab
  })

  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setStatusFilter("all")
    setLocationFilter("all")
  }

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsExporting(false)
    alert("Customer data exported successfully!")
  }

  const handleAddCustomer = () => {
    // Add customer logic here
    console.log("Adding customer:", newCustomer)
    setShowAddCustomer(false)
    setNewCustomer({
      name: "",
      type: "Retail",
      contact: "",
      phone: "",
      email: "",
      location: "",
      address: "",
      creditLimit: ""
    })
    alert("Customer added successfully!")
  }

const handleBulkAction = (action: string) => {
    if (selectedCustomers.length === 0) {
      alert("Please select customers first")
      return
    }
    alert(`${action} applied to ${selectedCustomers.length} customers`)
    setSelectedCustomers([])
  }

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowCustomerDetails(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer({ ...customer })
    setShowEditCustomer(true)
  }

  const selectAllCustomers = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  const handleNewOrder = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowNewOrder(true)
  }

  const handleCreditAdjust = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowCreditAdjust(true)
  }

  const handleSaveEditCustomer = () => {
    // Here you would typically update the customer in your data store
    console.log("Saving customer:", editingCustomer)
  }

  const handleSaveOrder = () => {
    // Calculate total and save order
    const total = newOrder.items.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity) || 0), 0)
  }

  const handleSendMessage = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowSendMessage(true)
  }

const handleSaveCreditAdjustment = () => {
  console.log("Credit adjustment:", { customer: selectedCustomer, adjustment: creditAdjustment })
  setShowCreditAdjust(false)
  setCreditAdjustment({ amount: "", type: "increase", reason: "" })
  alert("Credit adjustment applied successfully!")
}


const handleSendMessageSubmit = () => {
  console.log("Sending message:", { customer: selectedCustomer, message })
  setShowSendMessage(false)
  setMessage({ subject: "", body: "" })
  alert("Message sent successfully!")
}

const addOrderItem = () => {
  setNewOrder(prev => ({
    ...prev,
    items: [...prev.items, { product: "", quantity: "", price: "" }]
  }))
}

const removeOrderItem = (index: number) => {
  setNewOrder(prev => ({
    ...prev,
    items: prev.items.filter((_, i) => i !== index)
  }))
}

const updateOrderItem = (index: number, field: "product" | "quantity" | "price", value: string) => {
  setNewOrder(prev => ({
    ...prev,
    items: prev.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
  }))
}

  return (
    <div className="space-y-8 p-8 max-w-full overflow-x-hidden">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Retailers"
          value={customerStats.total.toString()}
          icon={Store}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="registered"
        />

        <StatCard
          title="Active"
          value={customerStats.active.toString()}
          icon={Users}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          description="this month"
        />

        <StatCard
          title="Total Revenue"
          value={customerStats.totalRevenue}
          change="+15.9%"
          trend="up"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
          description="from customers"
        />

        <StatCard
          title="Avg Order Value"
          value={customerStats.averageOrderValue}
          change="+7.1%"
          trend="up"
          icon={ShoppingBag}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="per transaction"
        />
      </div>

      {/* Main Content Card */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="p-6 pb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
              <TabsList className="bg-gray-800/50 h-12 rounded-xl">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 px-6 h-10 rounded-lg text-sm">
                  All Retailers ({customers.length})
                </TabsTrigger>
                <TabsTrigger value="modern-trade" className="data-[state=active]:bg-blue-600 px-6 h-10 rounded-lg text-sm">
                  Modern Trade ({customers.filter(c => c.type === "Modern Trade").length})
                </TabsTrigger>
                <TabsTrigger value="retail" className="data-[state=active]:bg-blue-600 px-6 h-10 rounded-lg text-sm">
                  Retail ({customers.filter(c => c.type === "Retail").length})
                </TabsTrigger>
                <TabsTrigger value="wholesale" className="data-[state=active]:bg-blue-600 px-6 h-10 rounded-lg text-sm">
                  Wholesale ({customers.filter(c => c.type === "Wholesale").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              onClick={() => setShowAddCustomer(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-6 rounded-xl text-sm font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Customer
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced Filter Section */}
            <div className="bg-gray-800/30 rounded-xl p-6 mb-6 border border-gray-700/50">
              <div className="flex flex-col space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by name, contact, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-gray-900/50 border-gray-600 rounded-xl text-sm"
                  />
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Type Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Customer Type</label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full h-11 bg-gray-900/50 border border-gray-600 rounded-lg px-3 text-sm text-gray-200"
                    >
                      <option value="all">All Types</option>
                      <option value="Retail">Retail</option>
                      <option value="Modern Trade">Modern Trade</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full h-11 bg-gray-900/50 border border-gray-600 rounded-lg px-3 text-sm text-gray-200"
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="new">New</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Location</label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full h-11 bg-gray-900/50 border border-gray-600 rounded-lg px-3 text-sm text-gray-200"
                    >
                      <option value="all">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</label>
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full h-11 border-gray-600 hover:bg-gray-800 rounded-lg text-sm"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-300">
                  Showing <span className="font-medium text-white">{filteredCustomers.length}</span> of{" "}
                  <span className="font-medium text-white">{customers.length}</span> customers
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800 text-sm"
                >
                  {isExporting ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {isExporting ? "Exporting..." : "Export All"}
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Customer Table */}
            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <Table className="bg-gray-800 rounded-lg overflow-hidden">
                  <TableHeader className="bg-gray-700">
                    <TableRow className="border-b border-gray-600">
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Retailer</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Type</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Contact</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Location</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Status</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Credit</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Orders</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Rating</TableHead>
                      <TableHead className="text-gray-300 text-xs uppercase py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer, idx) => (
                      <TableRow
                        key={customer.id}
                        className={`border-b border-gray-600 ${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition-colors`}
                      >
                        <TableCell className="py-3 px-2">
                          <div>
                            <p className="font-medium text-white text-sm">{customer.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{customer.id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm py-3 px-2">{customer.type}</TableCell>
                        <TableCell className="py-3 px-2">
                          <div>
                            <p className="text-gray-300 text-sm">{customer.contact}</p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <div className="flex items-center text-gray-300 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {customer.location}
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <Badge className={`${getStatusColor(customer.status)} px-2 py-1 text-xs`}>{customer.status}</Badge>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <div>
                            <p className="text-white text-sm">{customer.currentCredit}</p>
                            <p className="text-xs text-gray-400 mt-1">Limit: {customer.creditLimit}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <div>
                            <p className="text-white text-sm">{customer.totalOrders}</p>
                            <p className="text-xs text-gray-400 mt-1">{customer.totalSpent}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <div className="flex items-center text-sm">
                            <Star className={`h-4 w-4 mr-1 ${getRatingColor(customer.rating)}`} />
                            <span className={getRatingColor(customer.rating)}>{customer.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-700 rounded-lg p-2">
                                <MoreHorizontal className="h-4 w-4 text-gray-300" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-900 border border-gray-700">
                              <DropdownMenuLabel className="text-gray-400">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-700" />
                              <DropdownMenuItem onClick={() => handleViewDetails(customer)} className="hover:bg-gray-800 text-gray-200">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditCustomer(customer)} className="hover:bg-gray-800 text-gray-200">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleNewOrder(customer)} className="hover:bg-gray-800 text-gray-200">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                New Order
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCreditAdjust(customer)} className="hover:bg-gray-800 text-gray-200">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Adjust Credit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendMessage(customer)} className="hover:bg-gray-800 text-gray-200">
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Add New Customer</CardTitle>
                <Button
                  onClick={() => setShowAddCustomer(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                  <Input
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="Enter business name"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Customer Type</label>
                  <select
                    value={newCustomer.type}
                    onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                    className="w-full h-10 bg-gray-800 border border-gray-600 rounded-md px-3 text-sm text-gray-200"
                  >
                    <option value="Retail">Retail</option>
                    <option value="Modern Trade">Modern Trade</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Person</label>
                  <Input
                    value={newCustomer.contact}
                    onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
                    placeholder="Contact person name"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <Input
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    placeholder="+254 xxx xxx xxx"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    placeholder="email@example.com"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <Input
                    value={newCustomer.location}
                    onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                    placeholder="e.g., Westlands, CBD"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Credit Limit</label>
                  <Input
                    value={newCustomer.creditLimit}
                    onChange={(e) => setNewCustomer({...newCustomer, creditLimit: e.target.value})}
                    placeholder="KSh 50,000"
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Address</label>
                <Input
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  placeholder="Complete business address"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setShowAddCustomer(false)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCustomer}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Add Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Customer Details - {selectedCustomer.name}</CardTitle>
                <Button
                  onClick={() => setShowCustomerDetails(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Business Name</label>
                      <p className="text-white">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Customer ID</label>
                      <p className="text-white">{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Type</label>
                      <p className="text-white">{selectedCustomer.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Status</label>
                      <Badge className={`${getStatusColor(selectedCustomer.status)} px-2 py-1`}>
                        {selectedCustomer.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Contact Person</label>
                      <p className="text-white">{selectedCustomer.contact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Phone</label>
                      <p className="text-white">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Email</label>
                      <p className="text-white">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Address</label>
                      <p className="text-white">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Credit Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Credit Limit</label>
                      <p className="text-white">{selectedCustomer.creditLimit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Current Credit</label>
                      <p className="text-white">{selectedCustomer.currentCredit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Order History</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Total Orders</label>
                      <p className="text-white">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Total Spent</label>
                      <p className="text-white">{selectedCustomer.totalSpent}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Last Order</label>
                      <p className="text-white">{selectedCustomer.lastOrder}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Rating</label>
                      <div className="flex items-center">
                        <Star className={`h-4 w-4 mr-1 ${getRatingColor(selectedCustomer.rating)}`} />
                        <span className={getRatingColor(selectedCustomer.rating)}>{selectedCustomer.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Edit Customer</CardTitle>
                <Button
                  onClick={() => setShowEditCustomer(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                  <Input
                    value={editingCustomer.name || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Customer Type</label>
                  <select
                    value={editingCustomer.type || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, type: e.target.value})}
                    className="w-full h-10 bg-gray-800 border border-gray-600 rounded-md px-3 text-sm text-gray-200"
                  >
                    <option value="Retail">Retail</option>
                    <option value="Modern Trade">Modern Trade</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Person</label>
                  <Input
                    value={editingCustomer.contact || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, contact: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <Input
                    value={editingCustomer.phone || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <Input
                    value={editingCustomer.email || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <Input
                    value={editingCustomer.location || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, location: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Credit Limit</label>
                  <Input
                    value={editingCustomer.creditLimit || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, creditLimit: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={editingCustomer.status || ""}
                    onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                    className="w-full h-10 bg-gray-800 border border-gray-600 rounded-md px-3 text-sm text-gray-200"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Address</label>
                <Input
                  value={editingCustomer.address || ""}
                  onChange={(e) => setEditingCustomer({...editingCustomer, address: e.target.value})}
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setShowEditCustomer(false)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEditCustomer}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrder && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">New Order - {selectedCustomer.name}</CardTitle>
                <Button
                  onClick={() => setShowNewOrder(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
                {newOrder.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 mb-4 items-end">
                    <div className="col-span-5">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Product</label>
                      <Input
                        value={item.product}
                        onChange={(e) => updateOrderItem(index, 'product', e.target.value)}
                        placeholder="Product name"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                        placeholder="Qty"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Price (KSh)</label>
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateOrderItem(index, 'price', e.target.value)}
                        placeholder="0.00"
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        onClick={() => removeOrderItem(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        disabled={newOrder.items.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={addOrderItem}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-xl font-bold text-blue-400">
                    KSh {newOrder.items.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity) || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setShowNewOrder(false)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveOrder}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Create Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Credit Adjustment Modal */}
      {showCreditAdjust && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Adjust Credit - {selectedCustomer.name}</CardTitle>
                <Button
                  onClick={() => setShowCreditAdjust(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Current Credit</div>
                <div className="text-lg font-semibold text-white">{selectedCustomer.currentCredit}</div>
                <div className="text-sm text-gray-400">Limit: {selectedCustomer.creditLimit}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Adjustment Type</label>
                <select
                  value={creditAdjustment.type}
                  onChange={(e) => setCreditAdjustment({...creditAdjustment, type: e.target.value})}
                  className="w-full h-10 bg-gray-800 border border-gray-600 rounded-md px-3 text-sm text-gray-200"
                >
                  <option value="increase">Increase Credit</option>
                  <option value="decrease">Decrease Credit</option>
                  <option value="payment">Record Payment</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount (KSh)</label>
                <Input
                  type="number"
                  value={creditAdjustment.amount}
                  onChange={(e) => setCreditAdjustment({...creditAdjustment, amount: e.target.value})}
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
                <Input
                  value={creditAdjustment.reason}
                  onChange={(e) => setCreditAdjustment({...creditAdjustment, reason: e.target.value})}
                  placeholder="Reason for adjustment"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setShowCreditAdjust(false)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCreditAdjustment}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Apply Adjustment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Send Message Modal */}
      {showSendMessage && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Send Message - {selectedCustomer.name}</CardTitle>
                <Button
                  onClick={() => setShowSendMessage(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Sending to:</div>
                <div className="text-white">{selectedCustomer.contact}</div>
                <div className="text-sm text-gray-400">{selectedCustomer.phone}</div>
                <div className="text-sm text-gray-400">{selectedCustomer.email}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <Input
                  value={message.subject}
                  onChange={(e) => setMessage({...message, subject: e.target.value})}
                  placeholder="Message subject"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  value={message.body}
                  onChange={(e) => setMessage({...message, body: e.target.value})}
                  placeholder="Type your message here..."
                  className="w-full h-32 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 resize-none"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  onClick={() => setShowSendMessage(false)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessageSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}