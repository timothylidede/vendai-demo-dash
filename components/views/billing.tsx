"use client"

import React, { useState, useEffect } from "react"
import type { JSX } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/ui/stat-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Search, Plus, Download, Filter, DollarSign, Clock, CheckCircle, AlertTriangle, FileText, Send, Eye, MoreHorizontal, Calendar, TrendingUp, Receipt, Banknote, Smartphone, Building, Edit, Trash2, Printer, Mail, RefreshCw, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BillingView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const billingStats = {
    totalInvoiced: "KSh 4,567,890",
    totalPaid: "KSh 4,123,450",
    totalPending: "KSh 444,440",
    totalOverdue: "KSh 89,560",
    avgPaymentTime: "12.5 days",
    collectionRate: "90.3%",
  }

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-2024-001",
      customer: "City Supermarket",
      customerType: "Modern Trade",
      amount: "KSh 45,200",
      tax: "KSh 7,232",
      total: "KSh 52,432",
      status: "paid",
      paymentMethod: "Bank Transfer",
      issueDate: "2024-01-15",
      dueDate: "2024-01-30",
      paidDate: "2024-01-28",
      items: 28,
      creditTerms: "NET 15",
      customerEmail: "orders@citysupermarket.com",
      customerPhone: "+254 723 456 789",
      products: [
        { name: "Rice 2kg", quantity: 50, price: "KSh 7,500" },
        { name: "Cooking Oil 1L", quantity: 30, price: "KSh 4,500" },
      ]
    },
    {
      id: "INV-2024-002",
      customer: "Mama Mboga Store",
      customerType: "Retail",
      amount: "KSh 15,400",
      tax: "KSh 2,464",
      total: "KSh 17,864",
      status: "pending",
      paymentMethod: "M-Pesa",
      issueDate: "2024-01-18",
      dueDate: "2024-02-02",
      paidDate: null,
      items: 12,
      creditTerms: "NET 15",
      customerEmail: "mama@mboga.com",
      customerPhone: "+254 712 345 678",
      products: [
        { name: "Coca Cola 500ml", quantity: 24, price: "KSh 2,400" },
        { name: "Bread Loaves", quantity: 10, price: "KSh 500" },
      ]
    },
    {
      id: "INV-2024-003",
      customer: "Metro Wholesale",
      customerType: "Wholesale",
      amount: "KSh 67,300",
      tax: "KSh 10,768",
      total: "KSh 78,068",
      status: "overdue",
      paymentMethod: "Credit",
      issueDate: "2024-01-10",
      dueDate: "2024-01-25",
      paidDate: null,
      items: 45,
      creditTerms: "NET 15",
      customerEmail: "metro@wholesale.com",
      customerPhone: "+254 745 678 901",
      products: [
        { name: "Flour 2kg", quantity: 100, price: "KSh 15,000" },
        { name: "Tea Leaves 500g", quantity: 50, price: "KSh 12,500" },
      ]
    },
  ])

  const paymentMethods = [
    { name: "M-Pesa", count: 156, percentage: 45.2, icon: Smartphone, color: "text-green-400" },
    { name: "Bank Transfer", count: 89, percentage: 25.8, icon: Building, color: "text-blue-400" },
    { name: "Cash on Delivery", count: 67, percentage: 19.4, icon: Banknote, color: "text-orange-400" },
    { name: "Credit Terms", count: 33, percentage: 9.6, icon: CreditCard, color: "text-purple-400" },
  ]

  const recentPayments = [
    {
      id: "PAY-001",
      invoice: "INV-2024-001",
      customer: "City Supermarket",
      amount: "KSh 52,432",
      method: "Bank Transfer",
      date: "2024-01-28",
      status: "completed",
    },
    {
      id: "PAY-002",
      invoice: "INV-2024-004",
      customer: "Quick Mart",
      amount: "KSh 61,248",
      method: "M-Pesa",
      date: "2024-01-26",
      status: "completed",
    },
    {
      id: "PAY-003",
      invoice: "INV-2024-007",
      customer: "Corner Shop",
      amount: "KSh 12,450",
      method: "Cash",
      date: "2024-01-25",
      status: "completed",
    },
  ]

  interface Notification {
    id: number
    message: string
    type: "success" | "info" | "error"
    timestamp: string
  }

  const addNotification = (message: string, type: "success" | "info" | "error" = "success") => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    }
    setNotifications((prev: Notification[]) => [...prev, notification])
    setTimeout(() => {
      setNotifications((prev: Notification[]) => prev.filter(n => n.id !== notification.id))
    }, 5000)
  }

  interface InvoiceProduct {
    name: string
    quantity: number
    price: string
  }

  interface Invoice {
    id: string
    customer: string
    customerType: string
    amount: string
    tax: string
    total: string
    status: "paid" | "pending" | "overdue" | "draft"
    paymentMethod: string
    issueDate: string
    dueDate: string
    paidDate: string | null
    items: number
    creditTerms: string
    customerEmail: string
    customerPhone: string
    products: InvoiceProduct[]
  }

  type InvoiceAction = "mark_paid" | "send_reminder" | "download"

  const handleInvoiceAction = (invoiceId: string, action: InvoiceAction) => {
    setInvoices((prevInvoices: Invoice[]) =>
      prevInvoices.map((invoice: Invoice) => {
        if (invoice.id === invoiceId) {
          switch (action) {
            case 'mark_paid':
              addNotification(`Invoice ${invoiceId} marked as paid`)
              return { ...invoice, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
            case 'send_reminder':
              addNotification(`Payment reminder sent for invoice ${invoiceId}`)
              return invoice
            case 'download':
              addNotification(`Invoice ${invoiceId} downloaded`)
              return invoice
            default:
              return invoice
          }
        }
        return invoice
      })
    )
  }

  const handleCreateInvoice = () => {
    const newInvoice: Invoice = {
      id: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      customer: "New Customer",
      customerType: "Retail",
      amount: "KSh 0",
      tax: "KSh 0",
      total: "KSh 0",
      status: "draft",
      paymentMethod: "M-Pesa",
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paidDate: null,
      items: 0,
      creditTerms: "NET 15",
      customerEmail: "",
      customerPhone: "",
      products: []
    }
    setInvoices(prev => [...prev, newInvoice])
    addNotification("New invoice created successfully")
    setShowCreateModal(false)
  }

  interface StatusColorMap {
    [key: string]: string
  }

  type InvoiceStatus = "paid" | "pending" | "overdue" | "draft"

  const getStatusColor = (status: InvoiceStatus | string): string => {
    const statusColorMap: StatusColorMap = {
      paid: "bg-green-600",
      pending: "bg-orange-600",
      overdue: "bg-red-600",
      draft: "bg-gray-600",
    }
    return statusColorMap[status] || "bg-gray-600"
  }

  interface StatusIconProps {
    status: InvoiceStatus | string
  }

  const getStatusIcon = (status: InvoiceStatus | string): JSX.Element | null => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4 mr-1" />
      case "pending": return <Clock className="h-4 w-4 mr-1" />
      case "overdue": return <AlertTriangle className="h-4 w-4 mr-1" />
      case "draft": return <FileText className="h-4 w-4 mr-1" />
      default: return null
    }
  }

  interface PaymentMethodIconProps {
    method: string
  }

  const getPaymentMethodIcon = (method: PaymentMethodIconProps["method"]): JSX.Element => {
    switch (method) {
      case "M-Pesa": return <Smartphone className="h-4 w-4 mr-1" />
      case "Bank Transfer": return <Building className="h-4 w-4 mr-1" />
      case "Cash on Delivery":
      case "Cash": return <Banknote className="h-4 w-4 mr-1" />
      case "Credit": return <CreditCard className="h-4 w-4 mr-1" />
      default: return <DollarSign className="h-4 w-4 mr-1" />
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
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
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Billing Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Invoiced"
          value={billingStats.totalInvoiced}
          change="+15.9%"
          trend="up"
          icon={Receipt}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="this month"
        />
        <StatCard
          title="Total Paid"
          value={billingStats.totalPaid}
          change="+12.3%"
          trend="up"
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          description="collected"
        />
        <StatCard
          title="Pending"
          value={billingStats.totalPending}
          change="-5.2%"
          trend="down"
          icon={Clock}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="awaiting payment"
        />
        <StatCard
          title="Overdue"
          value={billingStats.totalOverdue}
          change="+2.1%"
          trend="up"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-red-500 to-pink-600"
          description="past due"
        />
      </div>

      {/* Payment Methods Overview */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
            Payment Methods Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="p-4 sm:p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                    <method.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${method.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm">{method.name}</h4>
                    <p className="text-sm text-gray-400">{method.count} transactions</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${method.color}`}>{method.percentage}%</span>
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${method.color.replace("text-", "bg-").replace("-400", "-500")}`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions and Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <Button 
              className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              onClick={() => addNotification("Payment reminders sent to all overdue customers")}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              onClick={() => addNotification("Billing report exported successfully")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              onClick={() => addNotification("GST returns generated")}
            >
              <FileText className="h-4 w-4 mr-2" />
              GST Returns
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Payment Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-700"
              onClick={() => addNotification("Payment data refreshed")}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{payment.customer}</p>
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        {getPaymentMethodIcon(payment.method)}
                        {payment.method} • {payment.invoice}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{payment.amount}</p>
                    <p className="text-sm text-gray-400">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Billing Tabs */}
      <Tabs defaultValue="invoices" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <TabsList className="bg-gray-800/50 backdrop-blur-sm mb-4 sm:mb-0">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Invoices ({filteredInvoices.length})
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Payments
            </TabsTrigger>
            <TabsTrigger value="overdue" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Overdue ({invoices.filter(i => i.status === 'overdue').length})
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 transition-all duration-300">
              Reports
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search invoices..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="border-gray-700"
              onClick={() => addNotification("Invoice data exported")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="invoices" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                All Invoices ({filteredInvoices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Invoice</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Payment Method</TableHead>
                      <TableHead className="text-gray-400">Due Date</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{invoice.id}</p>
                            <p className="text-xs text-gray-400">{invoice.items} items</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white">{invoice.customer}</p>
                            <p className="text-xs text-gray-400">{invoice.customerType}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">{invoice.total}</p>
                            <p className="text-xs text-gray-400">Tax: {invoice.tax}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(invoice.status)}
                              {invoice.status}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-300">
                            {getPaymentMethodIcon(invoice.paymentMethod)}
                            {invoice.paymentMethod}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-300">
                            <Calendar className="h-3 w-3 mr-1" />
                            {invoice.dueDate}
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
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setShowInvoiceModal(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-gray-800"
                                onClick={() => handleInvoiceAction(invoice.id, 'download')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-gray-800"
                                onClick={() => handleInvoiceAction(invoice.id, 'send_reminder')}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send Reminder
                              </DropdownMenuItem>
                              {invoice.status !== 'paid' && (
                                <DropdownMenuItem 
                                  className="hover:bg-gray-800"
                                  onClick={() => handleInvoiceAction(invoice.id, 'mark_paid')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Paid
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

        <TabsContent value="payments" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{payment.customer}</p>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          {getPaymentMethodIcon(payment.method)}
                          {payment.method} • {payment.invoice}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{payment.amount}</p>
                      <p className="text-sm text-gray-400">{payment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-0">
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Overdue Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Invoice</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Days Overdue</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((invoice) => invoice.status === "overdue")
                      .map((invoice) => (
                        <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{invoice.id}</p>
                              <p className="text-xs text-gray-400">{invoice.items} items</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-white">{invoice.customer}</p>
                              <p className="text-xs text-gray-400">{invoice.customerType}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{invoice.total}</p>
                              <p className="text-xs text-gray-400">Tax: {invoice.tax}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-red-600">
                              {Math.floor(
                                (new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 3600 * 24),
                              )}{" "}
                              days
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleInvoiceAction(invoice.id, 'send_reminder')}
                                className="hover:bg-gray-800"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setShowInvoiceModal(true)
                                }}
                                className="hover:bg-gray-800"
                              >
                                <Eye className="h-4 w-4" />
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

        <TabsContent value="reports" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Revenue Chart</p>
                    <p className="text-sm text-gray-400 mt-1">+15.9% growth this month</p>
                    <p className="text-xs text-green-400 mt-2">KSh 4.56M total invoiced</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payment Method Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-orange-500/10 animate-pulse"></div>
                  <div className="text-center z-10">
                    <CreditCard className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">Payment Distribution</p>
                    <p className="text-sm text-gray-400 mt-1">M-Pesa leads at 45.2%</p>
                    <p className="text-xs text-blue-400 mt-2">345 transactions this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Invoice Details Modal */}
      {showInvoiceModal && selectedInvoice && (
        <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center justify-between">
                <span>Invoice Details - {selectedInvoice.id}</span>
                <Badge className={getStatusColor(selectedInvoice.status)}>
                  {selectedInvoice.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400">Customer Name</Label>
                      <p className="text-white font-medium">{selectedInvoice.customer}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Customer Type</Label>
                      <p className="text-white">{selectedInvoice.customerType}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Email</Label>
                      <p className="text-white">{selectedInvoice.customerEmail}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Phone</Label>
                      <p className="text-white">{selectedInvoice.customerPhone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Invoice Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Issue Date:</span>
                      <span className="text-white">{selectedInvoice.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Due Date:</span>
                      <span className="text-white">{selectedInvoice.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment Method:</span>
                      <span className="text-white">{selectedInvoice.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credit Terms:</span>
                      <span className="text-white">{selectedInvoice.creditTerms}</span>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Paid Date:</span>
                        <span className="text-green-400">{selectedInvoice.paidDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
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
                      {selectedInvoice.products.map((product, index) => (
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

              {/* Totals */}
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">{selectedInvoice.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax:</span>
                    <span className="text-white">{selectedInvoice.tax}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-white font-bold text-lg">{selectedInvoice.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleInvoiceAction(selectedInvoice.id, 'download')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                  onClick={() => handleInvoiceAction(selectedInvoice.id, 'send_reminder')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reminder
                </Button>
                {selectedInvoice.status !== 'paid' && (
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                    onClick={() => {
                      handleInvoiceAction(selectedInvoice.id, 'mark_paid')
                      setShowInvoiceModal(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Customer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Invoice</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" placeholder="Customer name" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="customer-type">Customer Type</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="modern-trade">Modern Trade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="customer@email.com" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+254 xxx xxx xxx" className="bg-gray-800 border-gray-700" />
                </div>
              </div>

              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                    <SelectItem value="credit">Credit Terms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." className="bg-gray-800 border-gray-700" />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateInvoice} className="bg-blue-600 hover:bg-blue-700">
                  Create Invoice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
