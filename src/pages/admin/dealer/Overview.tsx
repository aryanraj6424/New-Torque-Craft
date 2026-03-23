
import React, { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  DollarSign,
  Clock,
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

// ✅ Dummy Chart Data
const salesDaily = [
  { name: "Mon", value: 15 }, { name: "Tue", value: 22 },
  { name: "Wed", value: 18 }, { name: "Thu", value: 28 },
  { name: "Fri", value: 35 }, { name: "Sat", value: 48 },
  { name: "Sun", value: 42 },
];

const salesMonthly = [
  { name: "Jan", value: 320 }, { name: "Feb", value: 410 },
  { name: "Mar", value: 530 }, { name: "Apr", value: 610 },
  { name: "May", value: 720 },
];

const topProducts = [
  { name: "CyberCore X1", sold: 342, revenue: "$444,518", change: "+12%" },
  { name: "NeoLink v4", sold: 287, revenue: "$258,013", change: "+8%" },
  { name: "FutureVision", sold: 198, revenue: "$316,602", change: "+15%" },
  { name: "TurboBoost Pro", sold: 156, revenue: "$124,896", change: "+5%" },
];

export default function Overview() {
  const [view, setView] = useState("daily");
  const navigate = useNavigate();

  const salesData = view === "daily" ? salesDaily : salesMonthly;

  // ✅ New Dynamic Stats based on Daily/Monthly
  const stats = [
    {
      label: view === "daily" ? "Today Sales" : "Monthly Sales",
      value: view === "daily" ? "$2,450" : "$74,890",
      change: view === "daily" ? "+12% from yesterday" : "+18% from last month",
      icon: DollarSign,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      label: "Pending Orders",
      value: view === "daily" ? "14" : "128",
      change: "Processing",
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Payment Due",
      value: view === "daily" ? "$840" : "$12,400",
      change: "Action Required",
      icon: CreditCard,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      alert: true,
    },
    {
      label: "Return Requests",
      value: view === "daily" ? "2" : "45",
      change: "8 pending review",
      icon: RotateCcw,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      label: "Alerts",
      value: view === "daily" ? "3" : "12",
      change: "Check notifications",
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
        <h2 className="text-2xl font-bold">Dashboard</h2>

        {/* Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setView("daily")}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              view === "daily" ? "bg-cyan-500 text-white" : "text-slate-400"
            )}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              view === "monthly" ? "bg-cyan-500 text-white" : "text-slate-400"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* STATS GRID - Updated to 5 columns for new items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "p-5 bg-[#0f172a] rounded-xl border border-slate-800 hover:border-cyan-500 transition cursor-pointer",
              stat.alert && "border-red-500/20"
            )}
          >
            <div className={cn("w-10 h-10 flex items-center justify-center rounded-lg mb-3", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>

            <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-xl font-bold mt-1">{stat.value}</h3>

            <p
              className={cn(
                "text-[10px] mt-2 font-medium",
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
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-cyan-400" />
            <h3 className="font-bold">Sales Performance ({view === 'daily' ? 'Last 7 Days' : 'Last 5 Months'})</h3>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: '8px' }}
                  itemStyle={{ color: "#06b6d4" }}
                />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="url(#color)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Top Products</h3>
            <button className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-transparent hover:border-cyan-500/50 transition shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-200">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.sold} units sold</p>
                </div>

                <div className="text-right">
                  <p className="text-cyan-400 text-sm font-bold">{p.revenue}</p>
                  <p className="text-emerald-400 text-[10px]">{p.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}