// import React from 'react';
// import { motion } from 'motion/react';
// import { 
//   LayoutDashboard, 
//   Users, 
//   Package, 
//   QrCode, 
//   ShieldCheck, 
//   BarChart3, 
//   RotateCcw, 
//   Settings,
//   Network,
//   Truck,
//   ClipboardList,
//   Warehouse,
//   UserCircle,
//   ShoppingBag,
//   History,
//   Search
// } from 'lucide-react';
// import { clsx } from 'clsx';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   active?: boolean;
//   onClick?: () => void;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
//   <motion.button
//     whileHover={{ x: 4 }}
//     whileTap={{ scale: 0.98 }}
//     onClick={onClick}
//     className={clsx(
//       "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group relative",
//       active 
//         ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
//         : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
//     )}
//   >
//     {active && (
//       <motion.div 
//         layoutId="active-pill"
//         className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
//       />
//     )}
//     <span className={clsx("transition-transform duration-300 group-hover:scale-110", active && "text-cyan-400")}>
//       {icon}
//     </span>
//     <span className="text-sm font-medium tracking-wide">{label}</span>
//   </motion.button>
// );

// interface SidebarProps {
//   role: 'super-admin' | 'distributor' | 'dealer';
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
//   const menus = {
//     'super-admin': [
//       { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
//       { id: 'users', label: 'Manage Users', icon: <Users size={20} /> },
//       { id: 'products', label: 'Product Control', icon: <Package size={20} /> },
//       { id: 'qr', label: 'QR Generation', icon: <QrCode size={20} /> },
//       { id: 'warranty', label: 'Warranty Monitoring', icon: <ShieldCheck size={20} /> },
//       { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
//       { id: 'refunds', label: 'Refund Management', icon: <RotateCcw size={20} /> },
//       { id: 'settings', label: 'HQ Settings', icon: <Settings size={20} /> },
//     ],
//     'distributor': [
//       { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
//       { id: 'network', label: 'Dealer Network', icon: <Network size={20} /> },
//       { id: 'supply', label: 'Product Supply', icon: <Truck size={20} /> },
//       { id: 'orders', label: 'Bulk Orders', icon: <ClipboardList size={20} /> },
//       { id: 'warranty', label: 'Warranty Data', icon: <ShieldCheck size={20} /> },
//       { id: 'refunds', label: 'Refund Verification', icon: <RotateCcw size={20} /> },
//       { id: 'inventory', label: 'Inventory', icon: <Warehouse size={20} /> },
//       { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
//       { id: 'profile', label: 'Profile Settings', icon: <UserCircle size={20} /> },
//     ],
//     'dealer': [
//       { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
//       { id: 'inventory', label: 'Inventory', icon: <Warehouse size={20} /> },
//       { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
//       { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
//       { id: 'warranty', label: 'Warranty Registration', icon: <ShieldCheck size={20} /> },
//       { id: 'refunds', label: 'Refund Requests', icon: <RotateCcw size={20} /> },
//       { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
//       { id: 'profile', label: 'Profile Settings', icon: <UserCircle size={20} /> },
//     ]
//   };

//   return (
//     <div className="w-64 h-screen border-r border-white/10 bg-black/20 backdrop-blur-2xl flex flex-col p-6 sticky top-0">
//       <div className="flex items-center gap-3 mb-10 px-2">
//         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
//           <ShieldCheck className="text-white" size={24} />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-white tracking-tight">CYBER<span className="text-cyan-400">HUB</span></h1>
//           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Warranty OS</p>
//         </div>
//       </div>

//       <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
//         {menus[role].map((item) => (
//           <SidebarItem
//             key={item.id}
//             icon={item.icon}
//             label={item.label}
//             active={activeTab === item.id}
//             onClick={() => setActiveTab(item.id)}
//           />
//         ))}
//       </div>

//       <div className="mt-auto pt-6 border-t border-white/5">
//         <div className="flex items-center gap-3 px-2">
//           <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
//             <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-semibold text-white truncate">Prashant K.</p>
//             <p className="text-[10px] text-slate-500 truncate capitalize">{role.replace('-', ' ')}</p>
//           </div>
//           <button className="text-slate-500 hover:text-white transition-colors">
//             <Settings size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const TopBar: React.FC<{ role: string }> = ({ role }) => (
//   <div className="h-20 border-b border-white/10 bg-black/10 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
//     <div className="flex items-center gap-4 flex-1 max-w-xl">
//       <div className="relative w-full group">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
//         <input 
//           type="text" 
//           placeholder="Search by Phone, Name, or Serial..." 
//           className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
//         />
//       </div>
//     </div>
    
//     <div className="flex items-center gap-6">
//       <div className="flex flex-col items-end">
//         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Status</p>
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
//           <span className="text-xs font-medium text-emerald-400">Operational</span>
//         </div>
//       </div>
//       <div className="h-8 w-px bg-white/10" />
//       <div className="text-right">
//         <p className="text-xs font-bold text-white uppercase tracking-tighter">{role.replace('-', ' ')} PANEL</p>
//         <p className="text-[10px] text-slate-500">v2.4.0-stable</p>
//       </div>
//     </div>
//   </div>
// );
