import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users2, // For Dealer Management
  ShoppingBag, // For Orders
  Package, // For Products
  QrCode, // For QR System
  RotateCcw, // For Returns & Warranty
  Truck, // For Shipping
  IndianRupee, // For Financials
  BarChart3, // For Reports
  Settings,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/distributor/dashboard",
    icon: LayoutDashboard,
  },
  { name: "Orders", path: "/admin/distributor/orders", icon: ShoppingBag },
  { name: "Products", path: "/admin/distributor/products", icon: Package },
  {
    name: "Dealer Management",
    path: "/admin/distributor/dealer-management",
    icon: Users2,
  },
  { name: "Shipping", path: "/admin/distributor/shipping", icon: Truck },
  { name: "QR System", path: "/admin/distributor/qr-system", icon: QrCode },
  {
    name: "Returns & Warranty",
    path: "/admin/distributor/returns-warranty",
    icon: RotateCcw,
  },

  {
    name: "Financials",
    path: "/admin/distributor/financials",
    icon: IndianRupee,
  },
  { name: "Reports", path: "/admin/distributor/reports", icon: BarChart3 },
];

export default function DistributorLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-[#020617] flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
          <br /> <br /> <br /> <br />
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                  )
                }
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    "group-hover:text-cyan-400",
                  )}
                />
                <span className="font-medium text-[10px] uppercase tracking-widest font-black">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Settings at Bottom */}
        <div className="p-6 border-t border-slate-800/50 bg-[#020617]">
          <NavLink
            to="/admin/distributor/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 w-full transition-all duration-200 rounded-xl group",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
              )
            }
          >
            <Settings
              className={cn(
                "w-5 h-5 transition-colors",
                "group-hover:text-cyan-400",
              )}
            />
            <span className="font-medium text-[10px] uppercase tracking-widest font-black">
              Settings
            </span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <br />
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-10">
          {/* Profile/Notification icons yahan add kar sakte hain */}
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
