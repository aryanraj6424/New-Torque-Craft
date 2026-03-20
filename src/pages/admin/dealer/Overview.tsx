// import React from 'react';
// import { 
//   Users, 
//   ShoppingBag, 
//   DollarSign, 
//   RotateCcw, 
//   ShieldCheck, 
//   Package, 
//   AlertTriangle,
//   TrendingUp,
//   ArrowUpRight,
//   ChevronRight
// } from 'lucide-react';
// import { 
//   LineChart, 
//   Line, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   AreaChart,
//   Area
// } from 'recharts';
// import { cn } from '@/src/lib/utils';

// const stats = [
//   { label: 'Total Customers', value: '1,247', change: '+12% from last month', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
//   { label: 'Total Orders', value: '3,892', change: '+8% from last month', icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
//   { label: 'Total Revenue', value: '$487,291', change: '+15% from last month', icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-400/10' },
//   { label: 'Pending Refunds', value: '8', change: 'Requires action', icon: RotateCcw, color: 'text-pink-400', bg: 'bg-pink-400/10', alert: true },
//   { label: 'Active Warranties', value: '942', change: '+23 new this week', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
//   { label: 'Available Inventory', value: '1,847', change: '74 units in transit', icon: Package, color: 'text-amber-400', bg: 'bg-amber-400/10' },
//   { label: 'Low Stock Alerts', value: '3', change: 'Needs restock', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10', alert: true },
// ];

// const salesData = [
//   { name: 'Mon', value: 15 },
//   { name: 'Tue', value: 22 },
//   { name: 'Wed', value: 18 },
//   { name: 'Thu', value: 28 },
//   { name: 'Fri', value: 35 },
//   { name: 'Sat', value: 48 },
//   { name: 'Sun', value: 42 },
// ];

// const topProducts = [
//   { name: 'CyberCore X1', sold: 342, revenue: '$444,518', change: '+12%' },
//   { name: 'NeoLink v4', sold: 287, revenue: '$258,013', change: '+8%' },
//   { name: 'FutureVision', sold: 198, revenue: '$316,602', change: '+15%' },
//   { name: 'TurboBoost Pro', sold: 156, revenue: '$124,896', change: '+5%' },
//   { name: 'MegaDrive Kit', sold: 134, revenue: '$107,334', change: '+3%' },
// ];

// export default function Overview() {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white tracking-tight">OVERVIEW</h2>
//         <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
//           <button className="px-3 py-1 text-xs font-medium bg-cyan-500 text-white rounded-md shadow-lg shadow-cyan-500/20">Daily</button>
//           <button className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">Monthly</button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, i) => (
//           <div 
//             key={i} 
//             className={cn(
//               "p-6 rounded-2xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700 transition-all duration-300 group relative overflow-hidden",
//               stat.alert && "border-red-500/20 bg-red-500/5"
//             )}
//           >
//             <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
//               <stat.icon className={cn("w-5 h-5", stat.color)} />
//             </div>
//             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
//             <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
//             <p className={cn("text-xs font-medium", stat.alert ? "text-red-400" : "text-emerald-400")}>
//               {stat.change}
//             </p>
            
//             {/* Subtle background glow */}
//             <div className={cn("absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 rounded-full", stat.bg)} />
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Sales Trend Chart */}
//         <div className="lg:col-span-2 p-8 rounded-2xl bg-[#0f172a] border border-slate-800/50">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
//                 <TrendingUp className="w-4 h-4 text-cyan-400" />
//               </div>
//               <h3 className="font-bold text-white tracking-tight">Sales Trend</h3>
//             </div>
//           </div>
          
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={salesData}>
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
//                 <XAxis 
//                   dataKey="name" 
//                   axisLine={false} 
//                   tickLine={false} 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                   dy={10}
//                 />
//                 <YAxis 
//                   axisLine={false} 
//                   tickLine={false} 
//                   tick={{ fill: '#64748b', fontSize: 12 }}
//                 />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
//                   itemStyle={{ color: '#06b6d4' }}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="value" 
//                   stroke="#06b6d4" 
//                   strokeWidth={3}
//                   fillOpacity={1} 
//                   fill="url(#colorValue)" 
//                   animationDuration={2000}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Top Selling Products */}
//         <div className="p-8 rounded-2xl bg-[#0f172a] border border-slate-800/50">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
//                 <Package className="w-4 h-4 text-blue-400" />
//               </div>
//               <h3 className="font-bold text-white tracking-tight">Top Selling Products</h3>
//             </div>
//             <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
//           </div>

//           <div className="space-y-4">
//             {topProducts.map((product, i) => (
//               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-colors group">
//                 <div className="flex items-center gap-4">
//                   <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
//                     {i + 1}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-white text-sm">{product.name}</h4>
//                     <p className="text-xs text-slate-500">{product.sold} units sold</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-cyan-400 text-sm">{product.revenue}</p>
//                   <p className="text-[10px] font-bold text-emerald-400">{product.change}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  RotateCcw,
  ShieldCheck,
  Package,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router-dom";

// ✅ Dummy dynamic data
const salesDaily = [
  { name: "Mon", value: 15 },
  { name: "Tue", value: 22 },
  { name: "Wed", value: 18 },
  { name: "Thu", value: 28 },
  { name: "Fri", value: 35 },
  { name: "Sat", value: 48 },
  { name: "Sun", value: 42 },
];

const salesMonthly = [
  { name: "Jan", value: 320 },
  { name: "Feb", value: 410 },
  { name: "Mar", value: 530 },
  { name: "Apr", value: 610 },
  { name: "May", value: 720 },
];

const topProducts = [
  { name: "CyberCore X1", sold: 342, revenue: "$444,518", change: "+12%" },
  { name: "NeoLink v4", sold: 287, revenue: "$258,013", change: "+8%" },
  { name: "FutureVision", sold: 198, revenue: "$316,602", change: "+15%" },
  { name: "TurboBoost Pro", sold: 156, revenue: "$124,896", change: "+5%" },
];

export default function Overview() {
  const [view, setView] = useState<"daily" | "monthly">("daily");
  const navigate = useNavigate();

  const salesData = view === "daily" ? salesDaily : salesMonthly;

  // ✅ Dynamic Stats (future API ready)
  const stats = [
    {
      label: "Total Customers",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Total Orders",
      value: "3,892",
      change: "+8%",
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Revenue",
      value: "$487K",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Pending Refunds",
      value: "8",
      change: "Action Required",
      icon: RotateCcw,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      alert: true,
      action: () => navigate("/dealer/refunds"),
    },
    {
      label: "Active Warranties",
      value: "942",
      change: "+23",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Inventory",
      value: "1,847",
      change: "74 incoming",
      icon: Package,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Low Stock",
      value: "3",
      change: "Restock needed",
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-400/10",
      alert: true,
    },
  ];

  return (
    <div className="space-y-8 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>

        {/* Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setView("daily")}
            className={cn(
              "px-3 py-1 text-xs rounded-md",
              view === "daily"
                ? "bg-cyan-500 text-white"
                : "text-slate-400"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={cn(
              "px-3 py-1 text-xs rounded-md",
              view === "monthly"
                ? "bg-cyan-500 text-white"
                : "text-slate-400"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={stat.action}
            className={cn(
              "p-5 bg-[#0f172a] rounded-xl border border-slate-800 hover:border-cyan-500 transition cursor-pointer",
              stat.alert && "border-red-500/20"
            )}
          >
            <div className={cn("p-2 rounded-lg mb-3", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>

            <p className="text-xs text-slate-400">{stat.label}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>

            <p
              className={cn(
                "text-xs mt-1",
                stat.alert ? "text-red-400" : "text-emerald-400"
              )}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* CHART + PRODUCTS */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="lg:col-span-2 bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-cyan-400" />
            <h3 className="font-bold">Sales Trend</h3>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                fill="url(#color)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Top Products</h3>
            <button className="text-xs text-cyan-400 flex items-center gap-1">
              View <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-slate-900 rounded-lg hover:border hover:border-cyan-500 transition"
              >
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-slate-400">
                    {p.sold} sold
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-cyan-400 text-sm">{p.revenue}</p>
                  <p className="text-emerald-400 text-xs">{p.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}