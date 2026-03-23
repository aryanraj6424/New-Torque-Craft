
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  QrCode, 
  RotateCcw, 
  Package, 
  CreditCard,
  Truck, // Added for Shipping
  Settings 
} from 'lucide-react';
// Relative path preserved as per your original code
import { cn } from '../../../lib/utils'; 

const navItems = [
  { name: 'Dashboard', path: '/admin/dealer/overview', icon: LayoutDashboard },
  { name: 'Orders', path: '/admin/dealer/order-history', icon: History },
  { name: 'Customers', path: '/admin/dealer/customers', icon: Users },
  { name: 'QR Verification', path: '/admin/dealer/qr-verifications', icon: QrCode },
  { name: 'Returns & Warranty', path: '/admin/dealer/refunds-warranty', icon: RotateCcw },
  { name: 'Shipping', path: '/admin/dealer/shipping', icon: Truck },
  { name: 'Payments', path: '/admin/dealer/payment', icon: CreditCard },
  { name: 'Products', path: '/admin/dealer/products', icon: Package },
];

export default function DealerLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-[#020617] flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            {/* Logo/Brand Space */}
            <br /> <br /> <br /> 
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  "group-hover:text-cyan-400"
                )} />
                <span className="font-medium text-[10px] uppercase tracking-widest font-black">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Settings at Bottom */}
        <div className="mt-auto p-6 border-t border-slate-800/50">
          <NavLink 
            to="/admin/dealer/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 w-full transition-all duration-200 rounded-xl group",
              isActive 
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            <Settings className={cn(
              "w-5 h-5 transition-colors",
              "group-hover:text-cyan-400"
            )} />
            <span className="font-medium text-[10px] uppercase tracking-widest font-black">
              Settings
            </span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <br /> <br />
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-10">
          {/* Header content if any */}
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}