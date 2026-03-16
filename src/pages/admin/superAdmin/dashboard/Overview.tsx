// import React from "react";
// import { GlassCard } from "../../ui/GlassCard";
// import {
//   Users,
//   Store,
//   TrendingUp,
//   RotateCcw,
//   QrCode,
//   Percent,
//   DollarSign,
//   ArrowUpRight
// } from "lucide-react";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer
// } from "recharts";

// const data = [
//   { month: "Jan", sales: 400 },
//   { month: "Feb", sales: 700 },
//   { month: "Mar", sales: 650 },
//   { month: "Apr", sales: 900 },
//   { month: "May", sales: 1200 },
//   { month: "Jun", sales: 1500 }
// ];

// const Overview = () => {
//   return (
//     /* pt-6 ensures content doesn't touch the top bar, pb-10 for bottom clearance */
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
//       {/* HEADER SECTION - Optional but good for context */}
//       <div className="mb-2">
//         <h2 className="text-2xl font-bold text-white tracking-tight">System Overview</h2>
//         <p className="text-sm text-slate-400">Real-time performance and partner metrics.</p>
//       </div>

//       {/* KPI CARDS - Fixed Grid for better spacing */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
//         {/* Total Customers */}
//         <GlassCard className="group hover:border-cyan-500/30 transition-all">
//           <div className="flex justify-between items-start">
//             <div>
//               <Users className="text-cyan-400 mb-3" size={24} />
//               <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Customers</p>
//               <h3 className="text-3xl font-bold text-white mt-1">4,245</h3>
//             </div>
//             <div className="text-emerald-400 text-xs flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
//               <ArrowUpRight size={12}/> 12%
//             </div>
//           </div>
//         </GlassCard>

//         {/* Total Dealers */}
//         <GlassCard className="group hover:border-blue-500/30 transition-all">
//           <Store className="text-blue-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Dealers</p>
//           <h3 className="text-3xl font-bold text-white mt-1">156</h3>
//         </GlassCard>

//         {/* Distributors */}
//         <GlassCard className="group hover:border-purple-500/30 transition-all">
//           <Store className="text-purple-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Distributors</p>
//           <h3 className="text-3xl font-bold text-white mt-1">42</h3>
//         </GlassCard>

//         {/* Influencer Revenue */}
//         <GlassCard className="group hover:border-pink-500/30 transition-all">
//           <TrendingUp className="text-pink-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Influencer Sales</p>
//           <h3 className="text-3xl font-bold text-white mt-1">$152K</h3>
//         </GlassCard>

//         {/* Active Coupons */}
//         <GlassCard>
//           <Percent className="text-yellow-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Active Coupons</p>
//           <h3 className="text-3xl font-bold text-white mt-1">86</h3>
//         </GlassCard>

//         {/* Refund Requests */}
//         <GlassCard>
//           <RotateCcw className="text-orange-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Refunds</p>
//           <h3 className="text-3xl font-bold text-white mt-1">28</h3>
//         </GlassCard>

//         {/* QR Codes */}
//         <GlassCard>
//           <QrCode className="text-cyan-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Generated Codes</p>
//           <h3 className="text-3xl font-bold text-white mt-1">5,842</h3>
//         </GlassCard>

//         {/* Active Warranties */}
//         <GlassCard>
//           <TrendingUp className="text-green-400 mb-3" size={24} />
//           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Warranties</p>
//           <h3 className="text-3xl font-bold text-white mt-1">980</h3>
//         </GlassCard>

//       </div>


//       {/* GRAPH SECTION */}
//       <GlassCard className="h-[450px] p-8">
//         <div className="flex flex-col mb-8">
//           <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Platform Performance</h4>
//           <p className="text-xs text-slate-500 mt-1">Monthly revenue and order trends across all channels</p>
//         </div>

//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data}>
//               <defs>
//                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
//                   <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
//               <XAxis 
//                 dataKey="month" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{fill: '#64748b', fontSize: 12}} 
//                 dy={10}
//               />
//               <YAxis 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{fill: '#64748b', fontSize: 12}} 
//               />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
//                 itemStyle={{ color: '#06b6d4' }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#06b6d4"
//                 fillOpacity={1}
//                 fill="url(#colorSales)"
//                 strokeWidth={3}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </GlassCard>

//       {/* Extra Space at Bottom to prevent cut-off */}
//       <div className="h-10" />
//     </div>
//   );
// };

// export default Overview;






import React from "react";
import { GlassCard } from "../../ui/GlassCard";
import {
  Users,
  Store,
  TrendingUp,
  RotateCcw,
  QrCode,
  Percent,
  ArrowUpRight,
  TrendingDown,
  Activity
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 700 },
  { month: "Mar", sales: 650 },
  { month: "Apr", sales: 900 },
  { month: "May", sales: 1200 },
  { month: "Jun", sales: 1500 }
];

const Overview = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* QUICK STATS SUMMARY */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={16} className="text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-widest">Real-time Metrics</span>
        </div>
        <div className="text-[10px] text-slate-500 font-medium">Last updated: Just now</div>
      </div>

      {/* KPI CARDS - Better Mobile Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Total Customers */}
        <GlassCard className="group hover:border-cyan-500/30 transition-all cursor-default">
          <div className="flex justify-between items-start">
            <Users className="text-cyan-400 mb-3" size={20} />
            <span className="text-emerald-400 text-[10px] font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
              +12%
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Customers</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">4,245</h3>
        </GlassCard>

        {/* Total Dealers */}
        <GlassCard className="group hover:border-blue-500/30 transition-all cursor-default">
          <Store className="text-blue-400 mb-3" size={20} />
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Dealers</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">156</h3>
        </GlassCard>

        {/* Influencer Revenue */}
        <GlassCard className="group hover:border-pink-500/30 transition-all cursor-default">
          <div className="flex justify-between items-start">
            <TrendingUp className="text-pink-400 mb-3" size={20} />
            <span className="text-emerald-400 text-[10px] font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
               <ArrowUpRight size={10}/> 8%
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Revenue</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">$152K</h3>
        </GlassCard>

        {/* Warranties */}
        <GlassCard className="group hover:border-green-500/30 transition-all cursor-default">
          <TrendingUp className="text-green-400 mb-3" size={20} />
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Active Warranties</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">980</h3>
        </GlassCard>

        {/* Coupons */}
        <GlassCard>
          <Percent className="text-yellow-400 mb-3" size={20} />
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Active Coupons</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">86</h3>
        </GlassCard>

        {/* Refunds */}
        <GlassCard>
          <div className="flex justify-between items-start">
            <RotateCcw className="text-orange-400 mb-3" size={20} />
            <span className="text-red-400 text-[10px] font-bold flex items-center bg-red-500/10 px-1.5 py-0.5 rounded">
               <TrendingDown size={10}/> 2%
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Refunds</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">28</h3>
        </GlassCard>

        {/* QR Codes */}
        <GlassCard>
          <QrCode className="text-cyan-400 mb-3" size={20} />
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">QR Codes</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">5,842</h3>
        </GlassCard>

        {/* Distributors */}
        <GlassCard>
          <Store className="text-purple-400 mb-3" size={20} />
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Distributors</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">42</h3>
        </GlassCard>

      </div>

      {/* GRAPH SECTION */}
      <GlassCard className="p-6 md:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Platform Performance</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">Growth analytics for current fiscal year</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500/40 border border-cyan-400" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Sales</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} 
              />
              <Tooltip 
                cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }}
                itemStyle={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '10px' }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={3}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Bottom Spacer */}
      <div className="h-10 invisible" />
    </div>
  );
};

export default Overview;