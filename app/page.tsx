"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DashboardView } from "@/components/views/dashboard";
import { InventoryView } from "@/components/views/inventory";
import OrdersView from "@/components/views/orders";
import { CustomersView } from "@/components/views/customers";
import { SalesTeamView } from "@/components/views/sales-team";
import RoutesView from "@/components/views/routes";
import AnalyticsView from "@/components/views/analytics";
import BillingView from "@/components/views/billing";
import DeliveryView from "@/components/views/delivery";
import SettingsView from "@/components/views/settings";
import ReportsView from "@/components/views/reports";
import MobileAppView from "@/components/views/mobile-app";
import AIInsightsView from "@/components/views/ai-insights";

export default function VendAI() {
  const [activeView, setActiveView] = useState("dashboard");
  const [triggerAction, setTriggerAction] = useState<string | null>(null);

  const handleNavigate = (view: string, action?: string) => {
    setActiveView(view);
    setTriggerAction(action || null);
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />;
      case "inventory":
        return <InventoryView triggerScrollToProducts={triggerAction === "scrollToProductsTable"} />;
      case "orders":
        return <OrdersView triggerNewOrderModal={triggerAction === "openNewOrderModal"} />;
      case "customers":
        return <CustomersView />;
      case "sales":
        return <SalesTeamView />;
      case "routes":
        return <RoutesView />;
      case "analytics":
        return <AnalyticsView />;
      case "billing":
        return <BillingView />;
      case "delivery":
        return <DeliveryView />;
      case "settings":
        return <SettingsView />;
      case "reports":
        return <ReportsView />;
      case "mobile-app":
        return <MobileAppView />;
      case "ai-insights":
        return <AIInsightsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={(view) => handleNavigate(view)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full">{renderView()}</div>
        </main>
      </div>
    </div>
  );
}