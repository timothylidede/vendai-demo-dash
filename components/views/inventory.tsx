"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Search,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Calendar,
  ShoppingCart,
  Minus,
  MoreHorizontal,
  Check,
  X,
  AlertCircle,
  History,
  BarChart3,
  Settings
} from "lucide-react"

interface InventoryViewProps {
  triggerScrollToProducts?: boolean;
}

export function InventoryView({ triggerScrollToProducts = false }: InventoryViewProps) {
  const productsTableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  type Product = {
    id: string
    name: string
    category: string
    sku: string
    currentStock: number
    minStock: number
    maxStock: number
    unitPrice: string
    totalValue: string
    supplier: string
    lastRestocked: string
    expiryDate: string
    status: string
    reorderPoint: number
    avgMonthlySales: number
    leadTime: number
  }
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [quickAdjustment, setQuickAdjustment] = useState({})
  const [showRestockSuggestions, setShowRestockSuggestions] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Beverages',
    sku: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: '',
    supplier: '',
    expiryDate: '',
    reorderPoint: 0,
    avgMonthlySales: 0,
    leadTime: 7
  })

  const inventoryStats = {
    totalProducts: 1247,
    lowStock: 8,
    totalValue: "KSh 4,567,890",
    turnoverRate: "12.3x",
  }

  const categories = [
    { name: "Beverages", count: 245, value: "KSh 1,234,500" },
    { name: "Food Items", count: 432, value: "KSh 2,145,600" },
    { name: "Personal Care", count: 189, value: "KSh 567,890" },
    { name: "Household", count: 156, value: "KSh 345,670" },
    { name: "Snacks", count: 225, value: "KSh 274,230" },
  ]

  const [products, setProducts] = useState([
    {
      id: "PRD-001",
      name: "Coca Cola 500ml",
      category: "Beverages",
      sku: "CC-500ML",
      currentStock: 450,
      minStock: 100,
      maxStock: 1000,
      unitPrice: "KSh 100",
      totalValue: "KSh 45,000",
      supplier: "Coca Cola Kenya",
      lastRestocked: "2024-01-15",
      expiryDate: "2024-06-15",
      status: "in-stock",
      reorderPoint: 150,
      avgMonthlySales: 320,
      leadTime: 7
    },
    {
      id: "PRD-002",
      name: "Bread - White",
      category: "Food Items",
      sku: "BRD-WHT",
      currentStock: 45,
      minStock: 50,
      maxStock: 200,
      unitPrice: "KSh 80",
      totalValue: "KSh 3,600",
      supplier: "Nairobi Bakery",
      lastRestocked: "2024-01-20",
      expiryDate: "2024-01-25",
      status: "low-stock",
      reorderPoint: 60,
      avgMonthlySales: 180,
      leadTime: 2
    },
    {
      id: "PRD-003",
      name: "Milk 1L",
      category: "Food Items",
      sku: "MLK-1L",
      currentStock: 0,
      minStock: 30,
      maxStock: 150,
      unitPrice: "KSh 120",
      totalValue: "KSh 0",
      supplier: "Brookside Dairy",
      lastRestocked: "2024-01-18",
      expiryDate: "2024-01-28",
      status: "out-of-stock",
      reorderPoint: 40,
      avgMonthlySales: 90,
      leadTime: 3
    },
    {
      id: "PRD-004",
      name: "Rice 2kg",
      category: "Food Items",
      sku: "RCE-2KG",
      currentStock: 89,
      minStock: 25,
      maxStock: 200,
      unitPrice: "KSh 180",
      totalValue: "KSh 16,020",
      supplier: "Kenya Rice Mills",
      lastRestocked: "2024-01-12",
      expiryDate: "2024-12-31",
      status: "in-stock",
      reorderPoint: 35,
      avgMonthlySales: 45,
      leadTime: 14
    },
    {
      id: "PRD-005",
      name: "Soap Bar",
      category: "Personal Care",
      sku: "SP-BAR",
      currentStock: 234,
      minStock: 50,
      maxStock: 500,
      unitPrice: "KSh 45",
      totalValue: "KSh 10,530",
      supplier: "Unilever Kenya",
      lastRestocked: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "in-stock",
      reorderPoint: 75,
      avgMonthlySales: 120,
      leadTime: 10
    },
  ])

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current === 0) return { status: "out-of-stock", color: "bg-red-600", text: "Out of Stock" }
    if (current <= min) return { status: "low-stock", color: "bg-orange-600", text: "Low Stock" }
    if (current >= max * 0.8) return { status: "overstocked", color: "bg-yellow-600", text: "Overstocked" }
    return { status: "in-stock", color: "bg-green-600", text: "In Stock" }
  }

  const getStockPercentage = (current: number, max: number): number => {
    return Math.min((current / max) * 100, 100)
  }

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set())
      setShowBulkActions(false)
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)))
      setShowBulkActions(true)
    }
  }

  const handleQuickStockAdjustment = (productId: string, adjustment: number) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const newStock = Math.max(0, product.currentStock + adjustment)
        const newValue = newStock * parseInt(product.unitPrice.replace('KSh ', ''))
        return {
          ...product,
          currentStock: newStock,
          totalValue: `KSh ${newValue.toLocaleString()}`
        }
      }
      return product
    }))
  }

  const handleBulkRestock = () => {
    const selectedProductsList = products.filter(p => selectedProducts.has(p.id))
    // This would typically open a bulk restock modal
    alert(`Restocking ${selectedProductsList.length} products`)
  }

  const getRestockSuggestions = () => {
    return products.filter(product => 
      product.currentStock <= product.reorderPoint ||
      product.currentStock === 0
    ).map(product => ({
      ...product,
      suggestedQuantity: Math.max(
        product.maxStock - product.currentStock,
        product.avgMonthlySales * (product.leadTime / 30)
      )
    }))
  }

  const handleAddProduct = () => {
  if (!newProduct.name || !newProduct.sku || !newProduct.unitPrice) {
    alert('Please fill in all required fields (Name, SKU, Unit Price)')
    return
  }

  const newId = `PRD-${String(products.length + 1).padStart(3, '0')}`
  const unitPriceNum = parseFloat(newProduct.unitPrice)
  const totalValue = newProduct.currentStock * unitPriceNum
  
  const productToAdd = {
    id: newId,
    name: newProduct.name,
    category: newProduct.category,
    sku: newProduct.sku,
    currentStock: newProduct.currentStock,
    minStock: newProduct.minStock,
    maxStock: newProduct.maxStock,
    unitPrice: `KSh ${unitPriceNum}`,
    totalValue: `KSh ${totalValue.toLocaleString()}`,
    supplier: newProduct.supplier,
    lastRestocked: new Date().toISOString().split('T')[0],
    expiryDate: newProduct.expiryDate,
    status: newProduct.currentStock === 0 ? 'out-of-stock' : 
            newProduct.currentStock <= newProduct.minStock ? 'low-stock' : 'in-stock',
    reorderPoint: newProduct.reorderPoint,
    avgMonthlySales: newProduct.avgMonthlySales,
    leadTime: newProduct.leadTime
  }
  useEffect(() => {
    if (triggerScrollToProducts && productsTableRef.current) {
      productsTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [triggerScrollToProducts]);

  setProducts(prev => [...prev, productToAdd])
  
  // Reset form
  setNewProduct({
    name: '',
    category: 'Beverages',
    sku: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: '',
    supplier: '',
    expiryDate: '',
    reorderPoint: 0,
    avgMonthlySales: 0,
    leadTime: 7
  })
  
  setShowAddProduct(false)
  alert('Product added successfully!')
}

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low-stock" && product.currentStock <= product.minStock) ||
      (stockFilter === "out-of-stock" && product.currentStock === 0) ||
      (stockFilter === "in-stock" && product.currentStock > product.minStock)

    return matchesSearch && matchesCategory && matchesStock
  })

  const restockSuggestions = getRestockSuggestions()

  return (
    <div className="space-y-8 p-8 max-w-full overflow-x-hidden">
      {/* Restock Suggestions Alert */}
      {restockSuggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-800/50 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                <div>
                  <h3 className="font-semibold text-orange-200">Restock Recommendations</h3>
                  <p className="text-sm text-orange-300">
                    {restockSuggestions.length} products need restocking
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowRestockSuggestions(!showRestockSuggestions)}
                  className="border-orange-600/50 text-orange-300 hover:bg-orange-800/30"
                >
                  {showRestockSuggestions ? 'Hide' : 'View'} Details
                </Button>
                <Button 
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => alert('Generate purchase orders for restock items')}
                >
                  Generate PO
                </Button>
              </div>
            </div>
            
            {showRestockSuggestions && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restockSuggestions.slice(0, 6).map(product => (
                  <div key={product.id} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <Badge variant="outline" className="text-xs bg-orange-600 text-white">
                        {product.currentStock === 0 ? 'Out' : 'Low'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">
                      Current: {product.currentStock} | Suggested: {Math.round(product.suggestedQuantity)}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs h-8"
                      onClick={() => handleQuickStockAdjustment(product.id, Math.round(product.suggestedQuantity))}
                    >
                      Quick Restock
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={inventoryStats.totalProducts.toLocaleString()}
          icon={Package}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          description="active SKUs"
        />

        <StatCard
          title="Low Stock Alerts"
          value={inventoryStats.lowStock.toString()}
          change="-2"
          trend="up"
          icon={AlertTriangle}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
          description="requires attention"
        />

        <StatCard
          title="Total Value"
          value={inventoryStats.totalValue}
          change="+8.7%"
          trend="up"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
          description="inventory worth"
        />

        <StatCard
          title="Turnover Rate"
          value={inventoryStats.turnoverRate}
          change="+1.2x"
          trend="up"
          icon={RefreshCw}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          description="annual turns"
        />
      </div>

      {/* Category Overview */}
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="p-8">
          <CardTitle className="text-xl font-semibold">Category Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-5 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors duration-300"
              >
                <h4 className="font-medium text-white mb-2 text-base">{category.name}</h4>
                <p className="text-2xl font-bold text-blue-400 mb-1">{category.count}</p>
                <p className="text-xs text-gray-400">{category.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <Card className="bg-blue-900/20 border-blue-800/50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-400" />
                <span className="font-medium">{selectedProducts.size} products selected</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkRestock}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Bulk Restock
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('Bulk price update')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Prices
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('Generate report')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSelectedProducts(new Set())
                    setShowBulkActions(false)
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 w-full h-12 bg-gray-800/50 border-gray-700 rounded-xl"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-60 h-12 bg-gray-800/50 border-gray-700 rounded-xl">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-xl">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Beverages">Beverages</SelectItem>
              <SelectItem value="Food Items">Food Items</SelectItem>
              <SelectItem value="Personal Care">Personal Care</SelectItem>
              <SelectItem value="Household">Household</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-full sm:w-60 h-12 bg-gray-800/50 border-gray-700 rounded-xl">
              <SelectValue placeholder="Filter by stock" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-xl">
              <SelectItem value="all">All Stock Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
          <Button variant="outline" className="rounded-xl h-12 flex items-center gap-2 w-full sm:w-auto">
            <Download className="w-5 h-5" /> Export CSV
          </Button>
          <Button variant="outline" className="rounded-xl h-12 flex items-center gap-2 w-full sm:w-auto">
            <History className="w-5 h-5" /> Stock History
          </Button>
          <Button 
            variant="default" 
            className="rounded-xl h-12 flex items-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddProduct(true)}
          >
            <Plus className="w-5 h-5" /> Add Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div ref={productsTableRef}>
        <Card className="bg-gray-900/60 border-gray-800/60 rounded-2xl overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Products</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs"
              >
                {selectedProducts.size === filteredProducts.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-full text-sm text-gray-300">
              <TableHeader className="bg-gray-800/70">
                <TableRow>
                  <TableHead className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Product ID</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Name</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Category</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Stock</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Quick Adjust</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Price</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Total Value</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Status</TableHead>
                  <TableHead className="whitespace-nowrap px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-10 text-gray-500">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.currentStock, product.minStock, product.maxStock);
                    const stockPercent = getStockPercentage(product.currentStock, product.maxStock);

                    return (
                      <TableRow
                        key={product.id}
                        className={`hover:bg-gray-700 transition duration-300 cursor-pointer ${
                          selectedProducts.has(product.id) ? "bg-blue-900/20" : ""
                        }`}
                      >
                        {index === 0 ? (
                          <TableCell className="px-4 py-3"></TableCell> // Empty cell for first row
                        ) : (
                          <TableCell className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedProducts.has(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                              className="rounded"
                            />
                          </TableCell>
                        )}
                        <TableCell className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-400">
                          {product.id}
                        </TableCell>
                        <TableCell className="px-4 py-3 font-semibold">{product.name}</TableCell>
                        <TableCell className="px-4 py-3">{product.category}</TableCell>
                        <TableCell className="px-4 py-3 w-32">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{product.currentStock}</span> / {product.maxStock}
                          </div>
                          <Progress
                            value={stockPercent}
                            className={`h-2 rounded-lg ${
                              stockStatus.status === "out-of-stock"
                                ? "bg-red-800"
                                : stockStatus.status === "low-stock"
                                ? "bg-orange-800"
                                : "bg-green-800"
                            }`}
                          />
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleQuickStockAdjustment(product.id, -1)}
                              disabled={product.currentStock === 0}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleQuickStockAdjustment(product.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">{product.unitPrice}</TableCell>
                        <TableCell className="px-4 py-3">{product.totalValue}</TableCell>
                        <TableCell className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={`uppercase px-3 py-1 rounded-full text-[0.65rem] font-semibold ${stockStatus.color} text-white`}
                          >
                            {stockStatus.text}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setViewingProduct(product)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setEditingProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Product Details Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">{viewingProduct.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewingProduct(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Basic Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">SKU:</span>
                        <span>{viewingProduct.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span>{viewingProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Supplier:</span>
                        <span>{viewingProduct.supplier}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Stock Levels</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Stock:</span>
                        <span className="font-semibold">{viewingProduct.currentStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Stock:</span>
                        <span>{viewingProduct.minStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Stock:</span>
                        <span>{viewingProduct.maxStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reorder Point:</span>
                        <span>{viewingProduct.reorderPoint}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Financial</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Unit Price:</span>
                        <span>{viewingProduct.unitPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Value:</span>
                        <span className="font-semibold">{viewingProduct.totalValue}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Dates</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Restocked:</span>
                        <span>{viewingProduct.lastRestocked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expiry Date:</span>
                        <span>{viewingProduct.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Monthly Sales:</span>
                        <span>{viewingProduct.avgMonthlySales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lead Time:</span>
                        <span>{viewingProduct.leadTime} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setEditingProduct(viewingProduct)
                      setViewingProduct(null)
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => alert('Generate restock recommendation')}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Restock
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => alert('View stock history')}
                  >
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Edit Product</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingProduct(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                    <Input 
                      defaultValue={editingProduct.name}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">SKU</label>
                    <Input 
                      defaultValue={editingProduct.sku}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <Select defaultValue={editingProduct.category}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Beverages">Beverages</SelectItem>
                        <SelectItem value="Food Items">Food Items</SelectItem>
                        <SelectItem value="Personal Care">Personal Care</SelectItem>
                        <SelectItem value="Household">Household</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Supplier</label>
                    <Input 
                      defaultValue={editingProduct.supplier}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Unit Price (KSh)</label>
                    <Input 
                      type="number"
                      defaultValue={editingProduct.unitPrice.replace('KSh ', '')}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Stock</label>
                    <Input 
                      type="number"
                      defaultValue={editingProduct.currentStock}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Min Stock</label>
                    <Input 
                      type="number"
                      defaultValue={editingProduct.minStock}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Stock</label>
                    <Input 
                      type="number"
                      defaultValue={editingProduct.maxStock}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reorder Point</label>
                    <Input 
                      type="number"
                      defaultValue={editingProduct.reorderPoint}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <Input 
                      type="date"
                      defaultValue={editingProduct.expiryDate}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex gap-3 justify-end">
                  <Button 
                    variant="outline"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      alert('Product updated successfully!')
                      setEditingProduct(null)
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Add New Product</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddProduct(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct(prev => ({...prev, sku: e.target.value}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="e.g., CC-500ML"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <Select 
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct(prev => ({...prev, category: value}))}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Beverages">Beverages</SelectItem>
                        <SelectItem value="Food Items">Food Items</SelectItem>
                        <SelectItem value="Personal Care">Personal Care</SelectItem>
                        <SelectItem value="Household">Household</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Supplier</label>
                    <Input 
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct(prev => ({...prev, supplier: e.target.value}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="Enter supplier name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Unit Price (KSh) <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="number"
                      value={newProduct.unitPrice}
                      onChange={(e) => setNewProduct(prev => ({...prev, unitPrice: e.target.value}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Avg Monthly Sales</label>
                    <Input 
                      type="number"
                      value={newProduct.avgMonthlySales}
                      onChange={(e) => setNewProduct(prev => ({...prev, avgMonthlySales: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Stock</label>
                    <Input 
                      type="number"
                      value={newProduct.currentStock}
                      onChange={(e) => setNewProduct(prev => ({...prev, currentStock: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Min Stock</label>
                    <Input 
                      type="number"
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct(prev => ({...prev, minStock: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Stock</label>
                    <Input 
                      type="number"
                      value={newProduct.maxStock}
                      onChange={(e) => setNewProduct(prev => ({...prev, maxStock: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Reorder Point</label>
                    <Input 
                      type="number"
                      value={newProduct.reorderPoint}
                      onChange={(e) => setNewProduct(prev => ({...prev, reorderPoint: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <Input 
                      type="date"
                      value={newProduct.expiryDate}
                      onChange={(e) => setNewProduct(prev => ({...prev, expiryDate: e.target.value}))}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Lead Time (days)</label>
                    <Input 
                      type="number"
                      value={newProduct.leadTime}
                      onChange={(e) => setNewProduct(prev => ({...prev, leadTime: Number(e.target.value)}))}
                      className="bg-gray-800/50 border-gray-700"
                      placeholder="7"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex gap-3 justify-end">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddProduct(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProduct}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}