
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertCircle, 
  RotateCcw, 
  QrCode, 
  IndianRupee, 
  Globe2, 
  Activity,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for Tailwind Classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Interfaces ---
interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ElementType;
  trend?: number;
  variant?: 'default' | 'danger' | 'warning' | 'success';
}

// --- Mock Data (Replace with API calls) ---
const COUNTRY_DATA = [
  { country: 'India', sales: '₹18.2M', progress: 75, color: 'bg-cyan-500' },
  { country: 'USA', sales: '₹12.4M', progress: 55, color: 'bg-blue-500' },
  { country: 'UAE', sales: '₹6.8M', progress: 35, color: 'bg-emerald-500' },
  { country: 'Australia', sales: '₹5.4M', progress: 25, color: 'bg-amber-500' },
];

const ACTIVITY_LOGS = [
  { msg: 'New Bulk Order - Apex Motors', time: '2m ago', type: 'order', status: 'normal' },
  { msg: 'Duplicate QR Scan Alert - Noida Sector 62', time: '15m ago', type: 'alert', status: 'critical' },
  { msg: 'Warranty Claim Registered #8840', time: '1h ago', type: 'warranty', status: 'normal' },
  { msg: 'Payment Settled - Global Auto UAE', time: '3h ago', type: 'payment', status: 'normal' },
  { msg: 'Suspicious Activity: Multiple Failed Logins', time: '5h ago', type: 'security', status: 'warning' },
];

// --- Sub-Components ---

const StatCard = ({ title, value, subtext, icon: Icon, trend, variant = "default" }: StatCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#0B0F18] border border-slate-800/50 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-xl transition-transform group-hover:scale-110",
        variant === "danger" ? "bg-red-500/10 text-red-500" : 
        variant === "warning" ? "bg-amber-500/10 text-amber-500" :
        "bg-cyan-500/10 text-cyan-500"
      )}>
        <Icon size={22} />
      </div>
      {trend !== undefined && (
        <span className={cn(
          "text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
          trend > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
          {trend > 0 ? <ArrowUpRight size={10} /> : ''} {trend}%
        </span>
      )}
    </div>
    
    <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black italic tracking-tighter text-white">
        {value}
      </span>
    </div>
    <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-widest leading-relaxed">
      {subtext}
    </p>
    
    {/* Background Glow Effect */}
    <div className={cn(
      "absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 rounded-full",
      variant === "danger" ? "bg-red-500" : "bg-cyan-500"
    )} />
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/50 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Super Admin Dashboard
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-1">Live Global Monitoring System v4.0</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
             
            
            </div>
            
          </div>
        </div>

        {/* Top Tier Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard 
            title="Total Revenue" 
            value="₹42.8M" 
            subtext="Consolidated Global Yield" 
            icon={TrendingUp} 
            trend={12.5} 
          />
          <StatCard 
            title="Pending Invoices" 
            value="28" 
            subtext="Awaiting Transaction" 
            icon={IndianRupee} 
            variant="warning"
          />
          <StatCard 
            title="Active Refunds" 
            value="08" 
            subtext="Unprocessed Claims" 
            icon={RotateCcw} 
            variant="danger"
          />
          <StatCard 
            title="QR Scan Alerts" 
            value="03" 
            subtext="Duplicate ID's Detected" 
            icon={QrCode} 
            variant="danger"
          />
          <StatCard 
            title="Overdue Receivables" 
            value="₹8.2L" 
            subtext="Past Due 30+ Days" 
            icon={AlertCircle} 
            variant="danger"
          />
        </div>

        {/* Analytical Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Country-wise Sales Snapshot */}
          <div className="lg:col-span-2 bg-[#0B0F18] border border-slate-800/50 rounded-2xl p-8 relative">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white">
                  <Globe2 size={18} className="text-cyan-500" /> Global Sales Snapshot
                </h3>
              </div>
              <select className="bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase p-2 rounded-lg outline-none">
                <option>Last 30 Days</option>
                <option>Quarterly</option>
              </select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {COUNTRY_DATA.map((item) => (
                <div key={item.country} className="space-y-3 group">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">{item.country}</span>
                    <span className="text-white">{item.sales}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={cn("h-full rounded-full relative", item.color)} 
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-[#0B0F18] border border-slate-800/50 rounded-2xl p-8 flex flex-col shadow-2xl shadow-black/50">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white mb-10">
              <Activity size={18} className="text-cyan-500" /> Live Feed
            </h3>
            
            <div className="space-y-8 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {ACTIVITY_LOGS.map((log, i) => (
                <div key={i} className="flex gap-4 items-start relative group">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0 z-10",
                    log.status === 'critical' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" : 
                    log.status === 'warning' ? "bg-amber-500" : "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  )} />
                  {i !== ACTIVITY_LOGS.length - 1 && (
                    <div className="absolute left-[3.5px] top-4 w-[1px] h-full bg-slate-800" />
                  )}
                  
                  <div className="space-y-1.5">
                    <p className={cn(
                      "text-[12px] font-bold leading-snug transition-colors",
                      log.status === 'critical' ? "text-red-400" : "text-slate-200 group-hover:text-white"
                    )}>
                      {log.msg}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">{log.time}</p>
                      {log.type === 'security' && (
                        <span className="flex items-center gap-1 text-[8px] font-black text-amber-500 uppercase tracking-tighter">
                          <ShieldAlert size={10} /> Security Risk
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-4 bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-white">
              System Audit Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}