import React, { useState } from "react";
import {
  TrendingUp,
  Users2,
  Package,
  IndianRupee,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Clock,
  ArrowUpRight,
  BarChart3,
  Map,
  CreditCard,
  ShieldAlert,
  ClipboardList
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

import { cn } from "../../../lib/utils"; 
import { useNavigate } from "react-router-dom";

// ✅ Distributor Specific Data
const salesDaily = [
  { name: "Mon", value: 120 }, { name: "Tue", value: 210 },
  { name: "Wed", value: 150 }, { name: "Thu", value: 320 },
  { name: "Fri", value: 450 }, { name: "Sat", value: 580 },
  { name: "Sun", value: 510 },
];

const salesMonthly = [
  { name: "Jan", value: 4200 }, { name: "Feb", value: 5100 },
  { name: "Mar", value: 7300 }, { name: "Apr", value: 8100 },
  { name: "May", value: 9200 },
];

const topDealers = [
  { name: "Apex Motors", region: "North", orders: 142, revenue: "₹12.4L", change: "+15%" },
  { name: "Elite Spares", region: "South", orders: 98, revenue: "₹8.2L", change: "+5%" },
  { name: "Global Auto", region: "West", orders: 87, revenue: "₹7.5L", change: "+12%" },
  { name: "Z-Tech Parts", region: "East", orders: 65, revenue: "₹5.1L", change: "+8%" },
];

export default function Dashboard() {
  const [view, setView] = useState("daily");
  const navigate = useNavigate();

  const salesData = view === "daily" ? salesDaily : salesMonthly;

  const stats = [
    {
      label: "Region Revenue",
      value: view === "daily" ? "₹84,250" : "₹42.5L",
      change: "North Region Leading",
      icon: Map,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Pending Payments",
      value: view === "daily" ? "₹12,400" : "₹3.8L",
      change: "12 Dealers Overdue",
      icon: CreditCard,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Active Returns",
      value: view === "daily" ? "08" : "45",
      change: "Pending Inspection",
      icon: RotateCcw,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      label: "Assigned Orders",
      value: view === "daily" ? "24" : "312",
      change: "Out for delivery",
      icon: ClipboardList,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Security Alerts",
      value: "02",
      change: "Duplicate Scans Found",
      icon: ShieldAlert,
      color: "text-red-400",
      bg: "bg-red-400/10",
      alert: true,
    },
  ];

  return (
    <div className="space-y-8 text-white animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black   tracking-tighter">Distributor  Dashboard</h2>
          
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setView("daily")}
            className={cn(
              "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
              view === "daily" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-slate-300"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={cn(
              "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
              view === "monthly" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-slate-300"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "p-6 bg-[#0f172a] rounded-[32px] border border-slate-800/50 hover:border-cyan-500/50 transition-all group",
              stat.alert && "border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]"
            )}
          >
            <div className={cn("w-12 h-12 flex items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>

            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1 tracking-tight">{stat.value}</h3>

            <p className={cn(
                "text-[9px] mt-2 font-black uppercase tracking-tighter",
                stat.alert ? "text-red-400 animate-pulse" : "text-emerald-400"
              )}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* CHART + TOP DEALERS */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-[#0f172a] p-8 rounded-[40px] border border-slate-800/50 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-black uppercase tracking-tight italic">Sales Flow</h3>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {view === 'daily' ? 'Live 7 Day Feed' : 'Annual Growth Trend'}
            </p>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="distroColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" opacity={0.5} />
                <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                />
                <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false} 
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: '16px', fontSize: '12px' }}
                  itemStyle={{ color: "#06b6d4", fontWeight: '900' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={4} 
                    fill="url(#distroColor)" 
                    animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PERFORMING DEALERS */}
        <div className="bg-[#0f172a] p-8 rounded-[40px] border border-slate-800/50 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black uppercase tracking-tight italic">Dealer Network</h3>
            <button className="text-[10px] font-black text-cyan-400 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors">
              Live Map <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {topDealers.map((dealer, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-slate-950/40 rounded-2xl border border-slate-800/50 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                        {dealer.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs font-black text-white uppercase tracking-tight">{dealer.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{dealer.region}</p>
                    </div>
                </div>

                <div className="text-right">
                  <p className="text-cyan-400 text-sm font-black">{dealer.revenue}</p>
                  <p className="text-emerald-400 text-[9px] font-bold uppercase">{dealer.change}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-lg">
             View All Dealers
          </button>
        </div>

      </div>
    </div>
  );
}