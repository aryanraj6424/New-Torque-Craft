import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Package, 
  MapPin, 
  Navigation, 
  Plus, 
  ExternalLink, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Box
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// Sample Shipping Data
const initialShipments = [
  { 
    id: "TRK-88291", 
    orderId: "ORD-5521", 
    customer: "Rajesh Kumar", 
    courier: "Delhivery", 
    status: "IN_TRANSIT", 
    location: "Nagpur Hub", 
    eta: "Mar 25",
    items: 4
  },
  { 
    id: "TRK-88295", 
    orderId: "ORD-5525", 
    customer: "Siddharth Malhotra", 
    courier: "BlueDart", 
    status: "DISPATCHED", 
    location: "Warehouse Exit", 
    eta: "Mar 27",
    items: 2
  },
  { 
    id: "TRK-88299", 
    orderId: "ORD-5530", 
    customer: "Pooja Sharma", 
    courier: "Ecom Express", 
    status: "DELIVERED", 
    location: "Mumbai South", 
    eta: "Delivered",
    items: 1
  }
];

export default function Shipping() {
  const [shipments] = useState(initialShipments);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Logistics & Shipping</h2>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-1">Dispatch Entry & Courier Tracking</p>
        </div>
        <button 
          onClick={() => setIsDispatchModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-[10px] font-black text-white shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" /> New Dispatch Entry
        </button>
      </div>

      {/* TRACKING STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Out for Delivery', value: '18', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending Dispatch', value: '05', icon: Box, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Delivered Today', value: '42', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Avg. Transit Time', value: '2.4 Days', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black text-white">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* DISPATCH LIST */}
      <div className="p-8 rounded-[40px] bg-[#0f172a] border border-slate-800/50 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight">Active Shipments</h3>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search Tracking ID..." 
              className="bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all w-64"
            />
          </div>
        </div>

        <div className="space-y-4">
          {shipments.map((ship, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-950/40 border border-slate-800/50 hover:border-cyan-500/30 transition-all group">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                
                {/* Tracking & Courier */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-black text-[10px]">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-white tracking-tight">{ship.id}</h5>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{ship.courier}</p>
                  </div>
                </div>

                {/* Customer & Order */}
                <div>
                  <p className="text-sm font-bold text-slate-300">{ship.customer}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{ship.orderId}</p>
                </div>

                {/* Current Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-rose-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-300">{ship.location}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Current Location</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                    ship.status === 'DELIVERED' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    ship.status === 'IN_TRANSIT' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    {ship.status.replace('_', ' ')}
                  </div>
                </div>

                {/* ETA & Action */}
                <div className="text-right">
                   <p className="text-sm font-black text-white">{ship.eta}</p>
                   <button className="text-[10px] font-black text-cyan-400 uppercase flex items-center gap-1 ml-auto hover:underline mt-1">
                      Track Live <ExternalLink size={10} />
                   </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISPATCH ENTRY MODAL */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[999] p-4">
          <div className="bg-[#0f172a] w-full max-w-2xl rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
               <h3 className="text-xl font-black uppercase tracking-tighter italic">Dispatch New Order</h3>
               <button onClick={() => setIsDispatchModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                 <Plus className="rotate-45" size={24} />
               </button>
            </div>
            
            <div className="p-10 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Order ID</label>
                    <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none" placeholder="e.g. ORD-9921" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Courier Partner</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none appearance-none">
                       <option>Delhivery</option>
                       <option>BlueDart</option>
                       <option>Ecom Express</option>
                       <option>Professional Courier</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Tracking Number / AWB</label>
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-12 text-sm text-white focus:border-cyan-500 outline-none" placeholder="Enter AWB Code" />
                  </div>
               </div>

               <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl flex items-start gap-4">
                  <Package className="text-cyan-400 shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-bold text-cyan-100">Automatic Status Sync Enabled</p>
                    <p className="text-[10px] text-cyan-400/60 uppercase font-black mt-1">Once dispatched, tracking updates will be sent to the dealer automatically.</p>
                  </div>
               </div>

               <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-cyan-500/20 transition-all">
                  Confirm Dispatch & Send AWB
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}