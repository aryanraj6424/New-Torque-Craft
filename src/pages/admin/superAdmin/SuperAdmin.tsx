import React, { useState } from "react";
import Overview from "./dashboard/Overview";
import AnalyticsPage from "./dashboard/Analytics";
import OrdersPage from "./dashboard/Orders";
import Inventory from "./dashboard/Inventory";
import Reports from "./dashboard/reports/Reports";
import RefundManager from "./dashboard/RefundManager";
import CouponsPage from "./dashboard/Coupons";
import InfluencersPage from "./dashboard/InfluencersPage";
import {
  RotateCcw,
  QrCode,
  BarChart3,
  LayoutDashboard,
  Settings,
  Percent,   // Add this
  Link,
  ClipboardList,
  ShieldAlert,
  Activity,
  ShoppingCart,
  Database,
  Menu,
  Box,
  Users
} from "lucide-react";

const PlaceholderPage: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <ShieldAlert size={64} className="mb-4 text-blue-400 opacity-40" />
    <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">{title}</h2>
    <p className="max-w-md text-sm text-white/60">
      {subtitle ?? "This section is coming soon. Select another item from the sidebar to continue."}
    </p>
  </div>
);

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Activity size={18} />, disabled: false },
    { id: "partners", label: "Partners Report", icon: <ClipboardList size={18} />, disabled: false },
    { id: "customers", label: "Customers", icon: <Users size={18} />, disabled: true },
    { id: "coupons", label: "Coupons", icon: <Percent size={18} />, disabled: false },
    { id: "influencers", label: "Influencers", icon: <Link size={18} />, disabled: true },
    { id: "inventory", label: "Inventory", icon: <Database size={18} />, disabled: false },
    { id: "qr", label: "QR Authentication", icon: <QrCode size={18} />, disabled: false },
    { id: "refunds", label: "Refunds", icon: <RotateCcw size={18} />, disabled: false },
    { id: "fraud", label: "Fraud Monitoring", icon: <ShieldAlert size={18} />, disabled: false },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} />, disabled: false },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, disabled: false }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "partners":
        return <Reports />;
      case "customers":
        return (
          <PlaceholderPage
            title="Customers"
            subtitle="Premium customer management system coming soon. This section is currently under development."
          />
        );
      case "influencers":
        return (
          <PlaceholderPage
            title="Influencers"
            subtitle="Advanced influencer marketing platform coming soon. This section is currently under development."
          />
        );
      case "coupons":
        return <CouponsPage />;
      case "inventory":
        return <Inventory />;
      case "qr":
        return (
          <PlaceholderPage
            title="QR Authentication"
            subtitle="QR code generation and verification tools will appear here."
          />
        );
      case "refunds":
        return <RefundManager />;
      case "fraud":
        return (
          <PlaceholderPage
            title="Fraud Monitoring"
            subtitle="Tools to review suspicious activity and flag risky accounts will appear here."
          />
        );
      case "analytics":
        return <AnalyticsPage />;
      case "settings":
        return (
          <PlaceholderPage
            title="Settings"
            subtitle="Configure system-wide settings, access controls, and integrations."
          />
        );
      default:
        return (
          <PlaceholderPage
            title={activeTab}
            subtitle="This module is not yet implemented."
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Mobile backdrop (click to close) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-16 inset-y-0 left-0 w-72 border-r border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col h-[calc(100vh-4rem)] shrink-0 transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (!item.disabled) {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }
              }}
              disabled={item.disabled}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed text-slate-600 bg-slate-900/50"
                  : activeTab === item.id
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              {item.icon}
              {item.label}
              {item.disabled && (
                <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 mt-16 h-[calc(100vh-4rem)] relative">
        <header className="flex items-center justify-between h-20 px-4 sm:px-8 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-lg font-bold tracking-wide uppercase">
              {activeTab.replace(/\b\w/g, (c) => c.toUpperCase()).replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex p-2 rounded-lg border border-white/10 hover:bg-white/10 transition" aria-label="Settings">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617] px-3 sm:px-4 py-4 sm:py-5">
          <div className="w-full min-h-[calc(100vh-4rem)]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
