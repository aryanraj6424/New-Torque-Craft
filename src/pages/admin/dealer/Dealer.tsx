// import React from 'react';
// import { GlassCard, Badge } from '../ui/GlassCard';
// import { 
//   Users, 
//   Package, 
//   ShieldCheck, 
//   RotateCcw, 
//   QrCode, 
//   Search, 
//   History, 
//   UserCircle, 
//   ShoppingBag, 
//   AlertTriangle, 
//   CheckCircle2, 
//   XCircle,
//   Warehouse
// } from 'lucide-react';
// import { clsx } from 'clsx';
// import { 
//   LineChart, 
//   Line, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer 
// } from 'recharts';

// const salesData = [
//   { name: 'Mon', value: 12 },
//   { name: 'Tue', value: 18 },
//   { name: 'Wed', value: 15 },
//   { name: 'Thu', value: 24 },
//   { name: 'Fri', value: 32 },
//   { name: 'Sat', value: 45 },
//   { name: 'Sun', value: 38 },
// ];

// interface DealerProps {
//   activeTab: string;
// }

// const Dealer: React.FC<DealerProps> = ({ activeTab }) => {
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             {/* Header Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <GlassCard className="group hover:border-cyan-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 w-fit">
//                   <Users size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Customers</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">842</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-blue-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4 w-fit">
//                   <ShoppingBag size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Products Sold</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">1,204</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-purple-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-4 w-fit">
//                   <ShieldCheck size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Warranties</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">942</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-rose-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 mb-4 w-fit">
//                   <RotateCcw size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Pending Refunds</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight text-rose-400">12</h3>
//               </GlassCard>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Sales Analytics */}
//               <GlassCard className="lg:col-span-2">
//                 <div className="flex items-center justify-between mb-8">
//                   <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                     <History size={20} className="text-cyan-400" />
//                     Weekly Sales Trend
//                   </h4>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">7D</button>
//                     <button className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-bold hover:bg-white/10 transition-colors">30D</button>
//                   </div>
//                 </div>
//                 <div className="h-[280px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={salesData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
//                       <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                       <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                       <Tooltip 
//                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }}
//                         itemStyle={{ color: '#06b6d4' }}
//                       />
//                       <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6, strokeWidth: 0 }} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </GlassCard>

//               {/* Inventory Section */}
//               <GlassCard className="lg:col-span-1">
//                 <div className="flex items-center justify-between mb-6">
//                   <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                     <Package size={20} className="text-cyan-400" />
//                     Inventory
//                   </h4>
//                   <button className="text-xs text-cyan-400 hover:underline font-bold">Request Stock</button>
//                 </div>
//                 <div className="space-y-4">
//                   {[
//                     { name: 'CyberCore X1', stock: 42, threshold: 10, status: 'healthy' },
//                     { name: 'NeoLink v4', stock: 8, threshold: 15, status: 'low' },
//                     { name: 'FutureVision', stock: 24, threshold: 5, status: 'healthy' },
//                   ].map((item, i) => (
//                     <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-bold text-white">{item.name}</p>
//                         {item.status === 'low' && (
//                           <div className="flex items-center gap-1 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
//                             <AlertTriangle size={12} />
//                             <span>Low Stock</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
//                           <div 
//                             className={clsx("h-full rounded-full", item.status === 'low' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]')}
//                             style={{ width: `${(item.stock / (item.stock + 50)) * 100}%` }}
//                           />
//                         </div>
//                         <span className="text-xs font-mono text-white">{item.stock}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </GlassCard>
//             </div>
//           </div>
//         );
//       case 'warranty':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard className="border-cyan-500/20">
//               <div className="flex flex-col md:flex-row gap-12">
//                 <div className="md:w-1/3">
//                   <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
//                     <QrCode size={32} className="text-cyan-400" />
//                   </div>
//                   <h4 className="text-xl font-bold text-white">Warranty Registration</h4>
//                   <p className="text-sm text-slate-400 mt-2">Scan product QR code or enter serial number to register a new customer warranty.</p>
                  
//                   <div className="mt-8 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
//                     <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Quick Scan</p>
//                     <div className="aspect-square rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer">
//                       <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       <QrCode size={48} className="text-slate-700 group-hover:text-cyan-400 transition-colors" />
//                       <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
//                       <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
//                       <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
//                       <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
//                       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-scan" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Customer Name</label>
//                       <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
//                       <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
//                       <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product Serial</label>
//                       <input type="text" placeholder="SN-XXXX-XXXX-XXXX" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
//                     </div>
//                     <div className="space-y-2 md:col-span-2">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
//                       <textarea placeholder="Full residential address..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
//                     </div>
//                   </div>
//                   <div className="mt-8 flex justify-end">
//                     <button className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95">
//                       Register Warranty
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </GlassCard>
//           </div>
//         );
//       case 'refunds':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard>
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <RotateCcw size={20} className="text-cyan-400" />
//                   Refund Requests
//                 </h4>
//                 <Badge variant="error">12 Action Required</Badge>
//               </div>
//               <div className="space-y-4">
//                 {[
//                   { customer: 'James Wilson', product: 'CyberCore X1', reason: 'Dead on Arrival', status: 'Requested' },
//                   { customer: 'Elena Gilbert', product: 'NeoLink v4', reason: 'Intermittent Connectivity', status: 'Requested' },
//                   { customer: 'Marcus Thorne', product: 'FutureVision', reason: 'Screen Flickering', status: 'Requested' },
//                 ].map((req, i) => (
//                   <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
//                     <div className="flex items-center justify-between mb-3">
//                       <div>
//                         <p className="text-sm font-bold text-white">{req.customer}</p>
//                         <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">{req.product}</p>
//                       </div>
//                       <Badge variant="warning">{req.status}</Badge>
//                     </div>
//                     <p className="text-xs text-slate-400 italic mb-4">"{req.reason}"</p>
//                     <div className="flex gap-2">
//                       <button className="flex-1 py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-2">
//                         <XCircle size={14} /> Reject
//                       </button>
//                       <button className="flex-1 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2">
//                         <CheckCircle2 size={14} /> Approve
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </div>
//         );
//       case 'customers':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard>
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <Users size={20} className="text-cyan-400" />
//                   Customer Management
//                 </h4>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
//                   <input type="text" placeholder="Search customers..." className="bg-white/5 border border-white/10 rounded-lg py-2 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500/30 w-64" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[
//                   { name: 'Alex Rivera', phone: '+1 555-0123', city: 'New York', product: 'CyberCore X1', date: '2025-01-15' },
//                   { name: 'Sarah Chen', phone: '+1 555-0456', city: 'San Francisco', product: 'NeoLink v4', date: '2025-02-10' },
//                   { name: 'Marcus Thorne', phone: '+1 555-0789', city: 'Chicago', product: 'FutureVision', date: '2025-02-28' },
//                   { name: 'Elena Gilbert', phone: '+1 555-1234', city: 'Boston', product: 'NeoLink v4', date: '2025-03-01' },
//                   { name: 'James Wilson', phone: '+1 555-5678', city: 'Seattle', product: 'CyberCore X1', date: '2025-03-05' },
//                 ].map((customer, i) => (
//                   <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-cyan-400 border border-white/5">
//                         {customer.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div>
//                         <p className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{customer.name}</p>
//                         <p className="text-xs text-slate-500">{customer.city}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2 pt-4 border-t border-white/5">
//                       <div className="flex justify-between text-xs">
//                         <span className="text-slate-500">Product</span>
//                         <span className="text-cyan-400 font-bold">{customer.product}</span>
//                       </div>
//                       <div className="flex justify-between text-xs">
//                         <span className="text-slate-500">Registered</span>
//                         <span className="text-white">{customer.date}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </div>
//         );
//       default:
//         return (
//           <div className="flex flex-col items-center justify-center py-20 opacity-30">
//             <Warehouse size={48} className="text-slate-500 mb-4" />
//             <h3 className="text-xl font-bold uppercase tracking-widest">Section Under Construction</h3>
//             <p className="text-sm mt-2 italic">Feature coming soon in v2.5.0</p>
//           </div>
//         );
//     }
//   };

//   return renderContent();
// };


// export default Dealer;







import React, { useState } from 'react';
import { GlassCard, Badge } from '../ui/GlassCard';
import { 
  Users, 
  Package, 
  ShieldCheck, 
  RotateCcw, 
  QrCode, 
  Search, 
  History, 
  UserCircle, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Warehouse,
  LayoutDashboard
} from 'lucide-react';
import { clsx } from 'clsx';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const salesData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 24 },
  { name: 'Fri', value: 32 },
  { name: 'Sat', value: 45 },
  { name: 'Sun', value: 38 },
];

interface DealerProps {
  activeTab: string;
}

const Dealer: React.FC<DealerProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <GlassCard className="group hover:border-cyan-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 w-fit">
                  <Users size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Customers</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">842</h3>
              </GlassCard>

              <GlassCard className="group hover:border-blue-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4 w-fit">
                  <ShoppingBag size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Products Sold</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">1,204</h3>
              </GlassCard>

              <GlassCard className="group hover:border-purple-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-4 w-fit">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Warranties</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">942</h3>
              </GlassCard>

              <GlassCard className="group hover:border-rose-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 mb-4 w-fit">
                  <RotateCcw size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Pending Refunds</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight text-rose-400">12</h3>
              </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Analytics */}
              <GlassCard className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <History size={20} className="text-cyan-400" />
                    Weekly Sales Trend
                  </h4>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">7D</button>
                    <button className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-bold hover:bg-white/10 transition-colors">30D</button>
                  </div>
                </div>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                        itemStyle={{ color: '#06b6d4' }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Inventory Section */}
              <GlassCard className="lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package size={20} className="text-cyan-400" />
                    Inventory
                  </h4>
                  <button className="text-xs text-cyan-400 hover:underline font-bold">Request Stock</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'CyberCore X1', stock: 42, threshold: 10, status: 'healthy' },
                    { name: 'NeoLink v4', stock: 8, threshold: 15, status: 'low' },
                    { name: 'FutureVision', stock: 24, threshold: 5, status: 'healthy' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        {item.status === 'low' && (
                          <div className="flex items-center gap-1 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                            <AlertTriangle size={12} />
                            <span>Low Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={clsx("h-full rounded-full", item.status === 'low' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]')}
                            style={{ width: `${(item.stock / (item.stock + 50)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-white">{item.stock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        );
      case 'warranty':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard className="border-cyan-500/20">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <QrCode size={32} className="text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Warranty Registration</h4>
                  <p className="text-sm text-slate-400 mt-2">Scan product QR code or enter serial number to register a new customer warranty.</p>
                  
                  <div className="mt-8 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Quick Scan</p>
                    <div className="aspect-square rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <QrCode size={48} className="text-slate-700 group-hover:text-cyan-400 transition-colors" />
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-scan" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Customer Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product Serial</label>
                      <input type="text" placeholder="SN-XXXX-XXXX-XXXX" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
                      <textarea placeholder="Full residential address..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95">
                      Register Warranty
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        );
      case 'refunds':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <RotateCcw size={20} className="text-cyan-400" />
                  Refund Requests
                </h4>
                <Badge variant="error">12 Action Required</Badge>
              </div>
              <div className="space-y-4">
                {[
                  { customer: 'James Wilson', product: 'CyberCore X1', reason: 'Dead on Arrival', status: 'Requested' },
                  { customer: 'Elena Gilbert', product: 'NeoLink v4', reason: 'Intermittent Connectivity', status: 'Requested' },
                  { customer: 'Marcus Thorne', product: 'FutureVision', reason: 'Screen Flickering', status: 'Requested' },
                ].map((req, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-white">{req.customer}</p>
                        <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">{req.product}</p>
                      </div>
                      <Badge variant="warning">{req.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 italic mb-4">"{req.reason}"</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500/20 transition-colors flex items-center justify-center gap-2">
                        <XCircle size={14} /> Reject
                      </button>
                      <button className="flex-1 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle2 size={14} /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      case 'customers':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users size={20} className="text-cyan-400" />
                  Customer Management
                </h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input type="text" placeholder="Search customers..." className="bg-white/5 border border-white/10 rounded-lg py-2 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-cyan-500/30 w-64" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Alex Rivera', phone: '+1 555-0123', city: 'New York', product: 'CyberCore X1', date: '2025-01-15' },
                  { name: 'Sarah Chen', phone: '+1 555-0456', city: 'San Francisco', product: 'NeoLink v4', date: '2025-02-10' },
                  { name: 'Marcus Thorne', phone: '+1 555-0789', city: 'Chicago', product: 'FutureVision', date: '2025-02-28' },
                  { name: 'Elena Gilbert', phone: '+1 555-1234', city: 'Boston', product: 'NeoLink v4', date: '2025-03-01' },
                  { name: 'James Wilson', phone: '+1 555-5678', city: 'Seattle', product: 'CyberCore X1', date: '2025-03-05' },
                ].map((customer, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-cyan-400 border border-white/5">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{customer.name}</p>
                        <p className="text-xs text-slate-500">{customer.city}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Product</span>
                        <span className="text-cyan-400 font-bold">{customer.product}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Registered</span>
                        <span className="text-white">{customer.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Warehouse size={48} className="text-slate-500 mb-4" />
            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Section Under Construction</h3>
            <p className="text-sm mt-2 italic text-slate-400">Feature coming soon in v2.5.0</p>
          </div>
        );
    }
  };

  return renderContent();
};

// --- YEH WRAPPER COMPONENT HAI JO SIDEBAR AUR TABS KO HANDLE KAREGA ---
const DealerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'warranty', label: 'Warranty', icon: <QrCode size={18} /> },
    { id: 'refunds', label: 'Refunds', icon: <RotateCcw size={18} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] pt-20">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 border-r border-white/10 px-4 py-8 space-y-2 hidden md:block">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-6">Dealer Management</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                activeTab === item.id 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT WINDOW */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab}</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your dealership operations and analytics.</p>
          </div>
          
          {/* Aapka Original Component Yahan Render Hoga */}
          <Dealer activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default DealerDashboard;