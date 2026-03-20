import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar,
  User,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const warrantyClaims = [
  { id: 'W-9021', customer: 'Alex Rivera', product: 'CyberCore X1', date: '2025-03-15', status: 'APPROVED', type: 'REPAIR', expiry: '2026-03-15' },
  { id: 'W-9022', customer: 'Sarah Jenkins', product: 'NeoLink v4', date: '2025-03-16', status: 'PENDING', type: 'REPLACEMENT', expiry: '2027-05-20' },
  { id: 'W-9023', customer: 'Michael Chen', product: 'FutureVision', date: '2025-03-17', status: 'REJECTED', type: 'REPAIR', expiry: '2025-12-10' },
  { id: 'W-9024', customer: 'Elena Rodriguez', product: 'TurboBoost Pro', date: '2025-03-18', status: 'IN_PROGRESS', type: 'REPAIR', expiry: '2026-08-05' },
  { id: 'W-9025', customer: 'David Kim', product: 'MegaDrive Kit', date: '2025-03-18', status: 'PENDING', type: 'REPLACEMENT', expiry: '2027-01-15' },
];

export default function Warranty() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">WARRANTY MANAGEMENT</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-xs font-black text-white transition-all">
            <Filter className="w-4 h-4" />
            FILTER CLAIMS
          </button>
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all">
            NEW CLAIM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Claims', value: '1,284', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending Review', value: '42', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Approved', value: '1,156', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Rejected', value: '86', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white">Active Warranty Claims</h3>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search claims..." 
              className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-64"
            />
          </div>
        </div>

        <div className="space-y-4">
          {warrantyClaims.map((claim, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button className="text-slate-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-black text-xs">
                    {claim.id}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white tracking-tight">{claim.customer}</h5>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-300">{claim.product}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-300">{claim.date}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Claim Date</p>
                  </div>
                </div>

                <div>
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                    claim.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    claim.status === 'PENDING' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                    claim.status === 'IN_PROGRESS' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  )}>
                    {claim.status.replace('_', ' ')}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-1">{claim.type}</p>
                </div>

                <div className="text-right">
                  <button className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 ml-auto group/btn">
                    View Case
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Expiry: {claim.expiry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
