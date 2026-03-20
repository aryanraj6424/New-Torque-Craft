// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Users, 
//   History, 
//   ClipboardList, 
//   QrCode, 
//   RotateCcw, 
//   Package, 
//   Settings 
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const navItems = [
//   { name: 'Overview', path: '/admin/dealer/overview', icon: LayoutDashboard },
//   { name: 'Customers', path: '/admin/dealer/customers', icon: Users },
//   { name: 'Order History', path: '/admin/dealer/order-history', icon: History },
//   { name: 'Purchase Orders', path: '/admin/dealer/purchase-orders', icon: ClipboardList },
//   { name: 'Warranty', path: '/admin/dealer/warranty', icon: QrCode },
//   { name: 'Refunds', path: '/admin/dealer/refunds', icon: RotateCcw },
//   { name: 'Inventory', path: '/admin/dealer/inventory', icon: Package },
// ];

// export default function DealerLayout() {
//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-slate-800/50 bg-[#020617] flex flex-col sticky top-0 h-screen">
//         <div className="p-6">
//           <div className="flex items-center gap-2 mb-8">
//             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
//               <Package className="w-5 h-5 text-white" />
//             </div>
//             <span className="font-bold text-xl tracking-tight text-white">TorqueCraft</span>
//           </div>
          
//           <nav className="space-y-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) => cn(
//                   "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
//                   isActive 
//                     ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
//                     : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
//                 )}
//               >
//                 <item.icon className={cn(
//                   "w-5 h-5 transition-colors",
//                   "group-hover:text-cyan-400"
//                 )} />
//                 <span className="font-medium text-xs uppercase tracking-widest font-black">{item.name}</span>
//               </NavLink>
//             ))}
//           </nav>
//         </div>
        
//         <div className="mt-auto p-6 border-t border-slate-800/50">
//           <NavLink 
//             to="/admin/dealer/settings"
//             className={({ isActive }) => cn(
//               "flex items-center gap-3 px-4 py-3 w-full transition-all duration-200 rounded-xl group",
//               isActive 
//                 ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
//                 : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
//             )}
//           >
//             <Settings className={cn(
//               "w-5 h-5 transition-colors",
//               "group-hover:text-cyan-400"
//             )} />
//             <span className="font-medium text-xs uppercase tracking-widest font-black">Settings</span>
//           </NavLink>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 bg-[#020617]/80 backdrop-blur-md z-10">
//           <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase">
//             {/* Page title will be dynamic or handled by outlet */}
//             Dealer Panel
//           </h1>
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 transition-colors">
//               <Settings className="w-5 h-5" />
//             </button>
//             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
//               PA
//             </div>
//           </div>
//         </header>
        
//         <div className="p-8 max-w-7xl mx-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }




import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  ClipboardList, 
  QrCode, 
  RotateCcw, 
  Package, 
  CreditCard,
  Settings 
} from 'lucide-react';
// Changed to a relative path to ensure Vite finds it without alias issues
import { cn } from '../../../lib/utils'; 

const navItems = [
  // Paths are absolute to ensure they work from any sub-level
  { name: 'Overview', path: '/admin/dealer/overview', icon: LayoutDashboard },
  { name: 'Customers Invoices', path: '/admin/dealer/customers', icon: Users },
  { name: 'Orders', path: '/admin/dealer/order-history', icon: History },
  // { name: 'Purchase Orders', path: '/admin/dealer/purchase-orders', icon: ClipboardList },
  { name: 'Warranty', path: '/admin/dealer/warranty', icon: QrCode },
  { name: 'Refunds', path: '/admin/dealer/refunds', icon: RotateCcw },
  { name: 'Inventory', path: '/admin/dealer/inventory', icon: Package },
  { name: 'Payment', path: '/admin/dealer/payment', icon: CreditCard },
];

export default function DealerLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-[#020617] flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
           

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
          
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* This is where the sub-pages like Overview or Inventory will render */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}