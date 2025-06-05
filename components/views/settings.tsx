"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { StatCard } from "@/components/ui/stat-card"
import { toast } from "sonner"
import {
  User,
  Users,
  Building,
  Bell,
  Shield,
  Database,
  Globe,
  Smartphone,
  Moon,
  Sun,
  Save,
  Plus,
  Lock,
  Mail,
  Key,
  UserPlus,
  UserCheck,
  UserX,
  Zap,
  Activity,
  SettingsIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
} from "lucide-react"

export default function SettingsView() {
  const [theme, setTheme] = useState("dark")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [aiFeatures, setAiFeatures] = useState(true)
  const [dataBackup, setDataBackup] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const settingsStats = {
    totalUsers: 24,
    activeUsers: 18,
    systemUptime: "99.8%",
    lastBackup: "2 hours ago",
    securityScore: 87,
    integrations: 8,
    storageUsed: "2.4 GB",
    apiCalls: 15247,
  }

  const users = [
    {
      id: "USR-001",
      name: "John Kamau",
      email: "john.kamau@vendai.co.ke",
      role: "Admin",
      status: "active",
      lastLogin: "2 hours ago",
      avatar: "JK",
      permissions: ["all"],
    },
    {
      id: "USR-002",
      name: "Mary Wanjiku",
      email: "mary.wanjiku@vendai.co.ke",
      role: "Manager",
      status: "active",
      lastLogin: "1 day ago",
      avatar: "MW",
      permissions: ["view", "edit", "create"],
    },
    {
      id: "USR-003",
      name: "Peter Ochieng",
      email: "peter.ochieng@vendai.co.ke",
      role: "Sales Rep",
      status: "active",
      lastLogin: "5 hours ago",
      avatar: "PO",
      permissions: ["view", "create"],
    },
    {
      id: "USR-004",
      name: "Grace Muthoni",
      email: "grace.muthoni@vendai.co.ke",
      role: "Inventory Manager",
      status: "inactive",
      lastLogin: "2 weeks ago",
      avatar: "GM",
      permissions: ["view", "edit"],
    },
  ]

  const roles = [
    {
      id: "ROLE-001",
      name: "Admin",
      users: 1,
      permissions: "Full access to all features",
      description: "Complete system control",
    },
    {
      id: "ROLE-002",
      name: "Manager",
      users: 3,
      permissions: "Create, edit, and view all data",
      description: "Manage operations and teams",
    },
    {
      id: "ROLE-003",
      name: "Sales Rep",
      users: 8,
      permissions: "Create orders, view customers",
      description: "Field sales operations",
    },
    {
      id: "ROLE-004",
      name: "Inventory Manager",
      users: 2,
      permissions: "Manage inventory, view orders",
      description: "Stock and warehouse management",
    },
    {
      id: "ROLE-005",
      name: "Driver",
      users: 5,
      permissions: "View assigned deliveries",
      description: "Delivery operations",
    },
  ]

  const integrations = [
    {
      id: "INT-001",
      name: "M-Pesa API",
      status: "connected",
      lastSync: "10 minutes ago",
      description: "Payment processing integration",
      health: "excellent",
    },
    {
      id: "INT-002",
      name: "QuickBooks",
      status: "connected",
      lastSync: "1 hour ago",
      description: "Accounting software integration",
      health: "good",
    },
    {
      id: "INT-003",
      name: "Google Maps",
      status: "connected",
      lastSync: "30 minutes ago",
      description: "Route optimization and mapping",
      health: "excellent",
    },
    {
      id: "INT-004",
      name: "SMS Gateway",
      status: "disconnected",
      lastSync: "Never",
      description: "Customer notifications via SMS",
      health: "poor",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-gray-600"
      case "connected":
        return "bg-green-600"
      case "disconnected":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-400"
      case "good":
        return "text-blue-400"
      case "fair":
        return "text-yellow-400"
      case "poor":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const handleSettingsAction = (action: string, itemId?: string) => {
    switch (action) {
      case "save":
        toast.success("Settings saved successfully")
        break
      case "add-user":
        toast.success("New user invitation sent")
        break
      case "delete-user":
        toast.success(`User ${itemId} removed`)
        break
      case "connect":
        toast.success(`Integration ${itemId} connected`)
        break
      case "disconnect":
        toast.success(`Integration ${itemId} disconnected`)
        break
      case "backup":
        toast.success("Manual backup initiated")
        break
      case "test":
        toast.info("Running system diagnostics...")
        break
      default:
        toast.info(`${action} action completed`)
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
        <Button
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          onClick={() => handleSettingsAction("save")}
        >
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* Enhanced Settings Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={settingsStats.totalUsers.toString()}
          change="+3"
          trend="up"
          description="registered users"
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Active Users"
          value={settingsStats.activeUsers.toString()}
          change="+2"
          trend="up"
          description="online now"
          icon={Activity}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatCard
          title="System Uptime"
          value={settingsStats.systemUptime}
          change="+0.1%"
          trend="up"
          description="availability"
          icon={Wifi}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title="Last Backup"
          value={settingsStats.lastBackup}
          description="automated backup"
          icon={Database}
          gradient="bg-gradient-to-br from-orange-500 to-red-500"
        />
      </div>


      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-gray-800/50 backdrop-blur-sm">
          <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="company" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <Building className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <Users className="h-4 w-4 mr-2" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-600 transition-all duration-300">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Account Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Kamau" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      defaultValue="john.kamau@vendai.co.ke"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+254 712 345 678" className="bg-gray-800/50 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" disabled className="bg-gray-800/50 border-gray-700" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Distribution manager with 5+ years of experience in FMCG sector."
                    className="bg-gray-800/50 border-gray-700 min-h-24"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    onClick={() => handleSettingsAction("save")}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme" className="text-base">
                      Theme
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className={theme === "light" ? "bg-blue-600" : "border-gray-700"}
                      >
                        <Sun className="h-4 w-4 mr-1" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className={theme === "dark" ? "bg-blue-600" : "border-gray-700"}
                      >
                        <Moon className="h-4 w-4 mr-1" />
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="africa-nairobi">
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="africa-nairobi">Africa/Nairobi (EAT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Features</Label>
                    <p className="text-sm text-gray-400">Enable AI-powered insights and recommendations</p>
                  </div>
                  <Switch checked={aiFeatures} onCheckedChange={setAiFeatures} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Company Information</CardTitle>
                <CardDescription>Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      defaultValue="VendAI Distribution Ltd"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Company Email</Label>
                    <Input
                      id="company-email"
                      defaultValue="info@vendai.co.ke"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Company Phone</Label>
                    <Input
                      id="company-phone"
                      defaultValue="+254 20 123 4567"
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / PIN</Label>
                    <Input id="tax-id" defaultValue="A123456789B" className="bg-gray-800/50 border-gray-700" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Company Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Business Park, Westlands, Nairobi, Kenya"
                    className="bg-gray-800/50 border-gray-700 min-h-20"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="fmcg">
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="fmcg">FMCG Distribution</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-gray-800/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="small">1-50 employees</SelectItem>
                        <SelectItem value="medium">51-200 employees</SelectItem>
                        <SelectItem value="large">201-1000 employees</SelectItem>
                        <SelectItem value="enterprise">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Business Settings</CardTitle>
                <CardDescription>Configure business operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="kes">
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="kes">KES - Kenyan Shilling</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <Select defaultValue="january">
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input defaultValue="08:00" className="bg-gray-800/50 border-gray-700" />
                    <Input defaultValue="17:00" className="bg-gray-800/50 border-gray-700" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Backup</Label>
                    <p className="text-sm text-gray-400">Daily automated data backup</p>
                  </div>
                  <Switch checked={dataBackup} onCheckedChange={setDataBackup} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">User Management</h3>
                <p className="text-gray-400">Manage users and their permissions</p>
              </div>
              <Button
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                onClick={() => handleSettingsAction("add-user")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Users</CardTitle>
                  <CardDescription>Manage user accounts and access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800">
                          <TableHead className="text-gray-400">User</TableHead>
                          <TableHead className="text-gray-400">Role</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-gray-400">Last Login</TableHead>
                          <TableHead className="text-gray-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {user.avatar}
                                </div>
                                <div>
                                  <p className="font-medium text-white">{user.name}</p>
                                  <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </TableCell>
                            <TableCell className="text-gray-400">{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSettingsAction("edit-user", user.id)}
                                >
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSettingsAction("delete-user", user.id)}
                                >
                                  <UserX className="h-4 w-4" />
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

              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Roles & Permissions</CardTitle>
                  <CardDescription>Manage user roles and access levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.id} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{role.name}</h4>
                        <Badge variant="outline">{role.users} users</Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{role.description}</p>
                      <p className="text-xs text-gray-500">{role.permissions}</p>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleSettingsAction("create-role")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Role
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">All Notifications</Label>
                    <p className="text-sm text-gray-400">Enable or disable all notifications</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-400">Receive push notifications in browser</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Notification Types</CardTitle>
                <CardDescription>Configure specific notification categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Order Updates</p>
                      <p className="text-sm text-gray-400">New orders, status changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Inventory Alerts</p>
                      <p className="text-sm text-gray-400">Low stock, out of stock warnings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">System Updates</p>
                      <p className="text-sm text-gray-400">Maintenance, feature updates</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">AI Insights</p>
                      <p className="text-sm text-gray-400">AI recommendations, alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Security Alerts</p>
                      <p className="text-sm text-gray-400">Login attempts, security issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Auto Logout
                    </Label>
                    <p className="text-sm text-gray-400">Automatically logout after inactivity</p>
                  </div>
                  <Switch checked={autoLogout} onCheckedChange={setAutoLogout} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-gray-800/50 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleSettingsAction("change-password")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    onClick={() => handleSettingsAction("download-backup")}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Download Data Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Security Status</CardTitle>
                <CardDescription>Current security score and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gray-800/50 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
                  <p className="text-gray-400">Security Score</p>
                  <p className="text-sm text-green-400 mt-1">Good security level</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Strong Password</p>
                      <p className="text-xs text-gray-400">Password meets security requirements</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-orange-900/20 border border-orange-800/50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Enable 2FA</p>
                      <p className="text-xs text-gray-400">Two-factor authentication not enabled</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Recent Login Activity</p>
                      <p className="text-xs text-gray-400">No suspicious login attempts</p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  onClick={() => handleSettingsAction("security-audit")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Integrations</h3>
                <p className="text-gray-400">Connect with third-party services and APIs</p>
              </div>
              <Button
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                onClick={() => handleSettingsAction("browse-integrations")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse Integrations
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-medium">{integration.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                            <span className={`text-xs ${getHealthColor(integration.health)}`}>
                              {integration.health}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-400">{integration.description}</p>
                    <div className="text-xs text-gray-500">
                      <p>Last sync: {integration.lastSync}</p>
                    </div>
                    <div className="flex space-x-2">
                      {integration.status === "connected" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-700 hover:bg-gray-800"
                            onClick={() => handleSettingsAction("configure", integration.id)}
                          >
                            <SettingsIcon className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-red-700 hover:bg-red-900/20 text-red-400"
                            onClick={() => handleSettingsAction("disconnect", integration.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                          onClick={() => handleSettingsAction("connect", integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
