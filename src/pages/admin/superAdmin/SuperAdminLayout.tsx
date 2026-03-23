import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users2,
  Truck,
  QrCode,
  RotateCcw,
  UserCheck,
  Globe2,
  IndianRupee,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/super-admin/dashboard",
    icon: LayoutDashboard,
  },
  { 
    name: "Order Management", 
    path: "/admin/super-admin/orders", 
    icon: ShoppingBag 
  },
  { 
    name: "Product Management", 
    path: "/admin/super-admin/products", 
    icon: Package 
  },
  {
    name: "Customer Management",
    path: "/admin/super-admin/customers",
    icon: Users2,
  },
  { 
    name: "Shipping Engine", 
    path: "/admin/super-admin/shipping", 
    icon: Truck 
  },
  { 
    name: "QR Authenticity", 
    path: "/admin/super-admin/qr-system", 
    icon: QrCode 
  },
  {
    name: "Return & Warranty",
    path: "/admin/super-admin/returns-warranty",
    icon: RotateCcw,
  },
  {
    name: "User & Role",
    path: "/admin/super-admin/users-roles",
    icon: UserCheck,
  },
  {
    name: "Region Engine",
    path: "/admin/super-admin/regions",
    icon: Globe2,
  },
  {
    name: "Financial Closure",
    path: "/admin/super-admin/finance",
    icon: IndianRupee,
  },
  { 
    name: "Analytics & Reports", 
    path: "/admin/super-admin/analytics", 
    icon: BarChart3 
  },
];

export default function SuperAdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 bg-[#020617] flex flex-col sticky top-0 h-screen">
      <br /> <br /> <br />
        <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
         
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
            to="/admin/super-admin/settings"
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
              System Settings
            </span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-10">
          
          {/* Add Profile/Auth buttons here */}
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}