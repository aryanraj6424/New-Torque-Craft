// import React from 'react';
// import { GlassCard, Badge } from '../ui/GlassCard';
// import { 
//   Network, 
//   Truck, 
//   ClipboardList, 
//   ShieldCheck, 
//   Warehouse, 
//   MapPin, 
//   RotateCcw, 
//   CheckCircle2, 
//   XCircle,
//   Package
// } from 'lucide-react';
// import { clsx } from 'clsx';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   Cell
// } from 'recharts';

// const supplyData = [
//   { name: 'Dealer A', value: 450 },
//   { name: 'Dealer B', value: 320 },
//   { name: 'Dealer C', value: 680 },
//   { name: 'Dealer D', value: 540 },
//   { name: 'Dealer E', value: 290 },
// ];

// interface DistributorProps {
//   activeTab: string;
// }

// const Distributor: React.FC<DistributorProps> = ({ activeTab }) => {
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             {/* Header Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <GlassCard className="group hover:border-cyan-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 w-fit">
//                   <Network size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Dealers</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">142</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-blue-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4 w-fit">
//                   <Truck size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Products Supplied</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">4,842</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-purple-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-4 w-fit">
//                   <ClipboardList size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Bulk Orders</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">84</h3>
//               </GlassCard>

//               <GlassCard className="group hover:border-emerald-500/30 transition-all duration-500">
//                 <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 w-fit">
//                   <ShieldCheck size={20} />
//                 </div>
//                 <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Warranties</p>
//                 <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">3,102</h3>
//               </GlassCard>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Dealer Network Panel */}
//               <GlassCard className="lg:col-span-1">
//                 <div className="flex items-center justify-between mb-6">
//                   <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                     <Network size={20} className="text-cyan-400" />
//                     Dealer Network
//                   </h4>
//                   <button className="text-xs text-cyan-400 hover:underline font-bold">View Map</button>
//                 </div>
//                 <div className="space-y-4">
//                   {[
//                     { name: 'CyberTech Solutions', loc: 'New York, US', customers: 1242, sales: 842 },
//                     { name: 'Neo Distribution', loc: 'London, UK', customers: 842, sales: 542 },
//                     { name: 'Future Systems', loc: 'Tokyo, JP', customers: 2102, sales: 1202 },
//                     { name: 'Digital Horizon', loc: 'Berlin, DE', customers: 542, sales: 342 },
//                   ].map((dealer, i) => (
//                     <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
//                       <div className="flex items-center justify-between mb-2">
//                         <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{dealer.name}</p>
//                         <Badge variant="info">{dealer.loc.split(',')[1]}</Badge>
//                       </div>
//                       <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
//                         <span>Customers: {dealer.customers}</span>
//                         <span>Sales: {dealer.sales}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </GlassCard>

//               {/* Product Supply Chart */}
//               <GlassCard className="lg:col-span-2">
//                 <div className="flex items-center justify-between mb-8">
//                   <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                     <Truck size={20} className="text-cyan-400" />
//                     Supply Distribution
//                   </h4>
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-cyan-500" />
//                       <span className="text-xs text-slate-400">Units Supplied</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="h-[300px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={supplyData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
//                       <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                       <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
//                       <Tooltip 
//                         cursor={{ fill: '#ffffff05' }}
//                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }}
//                       />
//                       <Bar dataKey="value" radius={[4, 4, 0, 0]}>
//                         {supplyData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#06b6d4' : '#3b82f6'} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </GlassCard>
//             </div>
//           </div>
//         );
//       case 'network':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard>
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <Network size={20} className="text-cyan-400" />
//                   Full Dealer Network
//                 </h4>
//                 <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs">Register New Dealer</button>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[
//                   { name: 'CyberTech Solutions', loc: 'New York, US', customers: 1242, sales: 842, status: 'active' },
//                   { name: 'Neo Distribution', loc: 'London, UK', customers: 842, sales: 542, status: 'active' },
//                   { name: 'Future Systems', loc: 'Tokyo, JP', customers: 2102, sales: 1202, status: 'warning' },
//                   { name: 'Digital Horizon', loc: 'Berlin, DE', customers: 542, sales: 342, status: 'active' },
//                   { name: 'Quantum Retail', loc: 'Seoul, KR', customers: 156, sales: 88, status: 'inactive' },
//                 ].map((dealer, i) => (
//                   <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/5">
//                         <Warehouse size={20} />
//                       </div>
//                       <Badge variant={dealer.status === 'active' ? 'success' : dealer.status === 'warning' ? 'warning' : 'error'}>
//                         {dealer.status}
//                       </Badge>
//                     </div>
//                     <p className="text-base font-bold text-white mb-1">{dealer.name}</p>
//                     <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
//                       <MapPin size={12} />
//                       {dealer.loc}
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
//                       <div>
//                         <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Customers</p>
//                         <p className="text-sm font-bold text-white">{dealer.customers}</p>
//                       </div>
//                       <div>
//                         <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Products Sold</p>
//                         <p className="text-sm font-bold text-cyan-400">{dealer.sales}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </div>
//         );
//       case 'inventory':
//         return (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard>
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <Warehouse size={20} className="text-cyan-400" />
//                   Warehouse Inventory
//                 </h4>
//                 <Badge variant="success">Stock Healthy</Badge>
//               </div>
//               <div className="space-y-6">
//                 {[
//                   { product: 'CyberCore X1 Processor', stock: 842, sent: 2102, status: 'high' },
//                   { product: 'NeoLink Router v4', stock: 142, sent: 842, status: 'low' },
//                   { product: 'FutureVision Display', stock: 542, sent: 1202, status: 'medium' },
//                   { product: 'Quantum RAM 32GB', stock: 1204, sent: 4500, status: 'high' },
//                 ].map((item, i) => (
//                   <div key={i} className="space-y-2">
//                     <div className="flex justify-between items-center">
//                       <p className="text-sm font-bold text-white">{item.product}</p>
//                       <p className="text-xs text-slate-400">Stock: <span className={item.status === 'low' ? 'text-rose-400' : 'text-cyan-400'}>{item.stock}</span> / {item.stock + item.sent}</p>
//                     </div>
//                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//                       <div 
//                         className={clsx("h-full rounded-full", item.status === 'low' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]')}
//                         style={{ width: `${(item.stock / (item.stock + item.sent)) * 100}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>

//             <GlassCard>
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <ClipboardList size={20} className="text-cyan-400" />
//                   Bulk Orders Management
//                 </h4>
//                 <button className="text-xs text-cyan-400 hover:underline font-bold">View History</button>
//               </div>
//               <div className="space-y-4">
//                 {[
//                   { dealer: 'CyberTech Solutions', qty: 150, status: 'Shipped', date: '2h ago' },
//                   { dealer: 'Neo Distribution', qty: 80, status: 'Processing', date: '5h ago' },
//                   { dealer: 'Future Systems', qty: 210, status: 'Delivered', date: '1d ago' },
//                   { dealer: 'Digital Horizon', qty: 45, status: 'Pending', date: '1d ago' },
//                 ].map((order, i) => (
//                   <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/5">
//                         <Package size={20} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-white">{order.dealer}</p>
//                         <p className="text-[10px] text-slate-500 uppercase tracking-wider">{order.qty} Units • {order.date}</p>
//                       </div>
//                     </div>
//                     <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : order.status === 'Pending' ? 'error' : 'warning'}>
//                       {order.status}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </div>
//         );
//       case 'refunds':
//         return (
//           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <GlassCard className="border-cyan-500/20">
//               <div className="flex items-center justify-between mb-8">
//                 <h4 className="text-lg font-bold text-white flex items-center gap-2">
//                   <RotateCcw size={20} className="text-cyan-400" />
//                   Refund Verification Queue
//                 </h4>
//                 <p className="text-xs text-slate-500">Awaiting your verification before Super Admin approval</p>
//               </div>
//               <div className="space-y-4">
//                 {[
//                   { customer: 'Alex Rivera', dealer: 'CyberTech Solutions', amount: '$1,240.00', reason: 'Defective Display Unit' },
//                   { customer: 'Sarah Chen', dealer: 'Neo Distribution', amount: '$840.00', reason: 'Power Failure after 2 days' },
//                   { customer: 'Marcus Thorne', dealer: 'Future Systems', amount: '$2,100.00', reason: 'Motherboard Short Circuit' },
//                 ].map((req, i) => (
//                   <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all gap-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 font-bold">
//                         {req.customer.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       <div>
//                         <p className="text-base font-bold text-white">{req.customer}</p>
//                         <p className="text-xs text-slate-400">Dealer: <span className="text-cyan-400">{req.dealer}</span></p>
//                       </div>
//                     </div>
//                     <div className="flex-1 max-w-md">
//                       <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Reason</p>
//                       <p className="text-sm text-slate-300 italic">"{req.reason}"</p>
//                     </div>
//                     <div className="flex items-center gap-8">
//                       <div className="text-right">
//                         <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Amount</p>
//                         <p className="text-lg font-mono font-bold text-white">{req.amount}</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors">
//                           <XCircle size={20} />
//                         </button>
//                         <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
//                           <CheckCircle2 size={20} />
//                         </button>
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

// export default Distributor;







import React, { useState } from 'react';
import { GlassCard, Badge } from '../ui/GlassCard';
import { 
  Network, 
  Truck, 
  ClipboardList, 
  ShieldCheck, 
  Warehouse, 
  MapPin, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Package,
  LayoutDashboard,
  Globe
} from 'lucide-react';
import { clsx } from 'clsx';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const supplyData = [
  { name: 'Dealer A', value: 450 },
  { name: 'Dealer B', value: 320 },
  { name: 'Dealer C', value: 680 },
  { name: 'Dealer D', value: 540 },
  { name: 'Dealer E', value: 290 },
];

interface DistributorProps {
  activeTab: string;
}

const Distributor: React.FC<DistributorProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <GlassCard className="group hover:border-cyan-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 w-fit">
                  <Network size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Dealers</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">142</h3>
              </GlassCard>

              <GlassCard className="group hover:border-blue-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4 w-fit">
                  <Truck size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Products Supplied</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">4,842</h3>
              </GlassCard>

              <GlassCard className="group hover:border-purple-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-4 w-fit">
                  <ClipboardList size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Bulk Orders</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">84</h3>
              </GlassCard>

              <GlassCard className="group hover:border-emerald-500/30 transition-all duration-500">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 w-fit">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Warranties</p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">3,102</h3>
              </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Dealer Network Panel */}
              <GlassCard className="lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Network size={20} className="text-cyan-400" />
                    Dealer Network
                  </h4>
                  <button className="text-xs text-cyan-400 hover:underline font-bold">View Map</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'CyberTech Solutions', loc: 'New York, US', customers: 1242, sales: 842 },
                    { name: 'Neo Distribution', loc: 'London, UK', customers: 842, sales: 542 },
                    { name: 'Future Systems', loc: 'Tokyo, JP', customers: 2102, sales: 1202 },
                    { name: 'Digital Horizon', loc: 'Berlin, DE', customers: 542, sales: 342 },
                  ].map((dealer, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{dealer.name}</p>
                        <Badge variant="info">{dealer.loc.split(',')[1]}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <span>Customers: {dealer.customers}</span>
                        <span>Sales: {dealer.sales}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Product Supply Chart */}
              <GlassCard className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Truck size={20} className="text-cyan-400" />
                    Supply Distribution
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-xs text-slate-400">Units Supplied</span>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={supplyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {supplyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#06b6d4' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Network size={20} className="text-cyan-400" />
                  Full Dealer Network
                </h4>
                <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs">Register New Dealer</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'CyberTech Solutions', loc: 'New York, US', customers: 1242, sales: 842, status: 'active' },
                  { name: 'Neo Distribution', loc: 'London, UK', customers: 842, sales: 542, status: 'active' },
                  { name: 'Future Systems', loc: 'Tokyo, JP', customers: 2102, sales: 1202, status: 'warning' },
                  { name: 'Digital Horizon', loc: 'Berlin, DE', customers: 542, sales: 342, status: 'active' },
                  { name: 'Quantum Retail', loc: 'Seoul, KR', customers: 156, sales: 88, status: 'inactive' },
                ].map((dealer, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/5">
                        <Warehouse size={20} />
                      </div>
                      <Badge variant={dealer.status === 'active' ? 'success' : dealer.status === 'warning' ? 'warning' : 'error'}>
                        {dealer.status}
                      </Badge>
                    </div>
                    <p className="text-base font-bold text-white mb-1">{dealer.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                      <MapPin size={12} />
                      {dealer.loc}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Customers</p>
                        <p className="text-sm font-bold text-white">{dealer.customers}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Products Sold</p>
                        <p className="text-sm font-bold text-cyan-400">{dealer.sales}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      case 'inventory':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Warehouse size={20} className="text-cyan-400" />
                  Warehouse Inventory
                </h4>
                <Badge variant="success">Stock Healthy</Badge>
              </div>
              <div className="space-y-6">
                {[
                  { product: 'CyberCore X1 Processor', stock: 842, sent: 2102, status: 'high' },
                  { product: 'NeoLink Router v4', stock: 142, sent: 842, status: 'low' },
                  { product: 'FutureVision Display', stock: 542, sent: 1202, status: 'medium' },
                  { product: 'Quantum RAM 32GB', stock: 1204, sent: 4500, status: 'high' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-white">{item.product}</p>
                      <p className="text-xs text-slate-400">Stock: <span className={item.status === 'low' ? 'text-rose-400' : 'text-cyan-400'}>{item.stock}</span> / {item.stock + item.sent}</p>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={clsx("h-full rounded-full", item.status === 'low' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]')}
                        style={{ width: `${(item.stock / (item.stock + item.sent)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <ClipboardList size={20} className="text-cyan-400" />
                  Bulk Orders Management
                </h4>
                <button className="text-xs text-cyan-400 hover:underline font-bold">View History</button>
              </div>
              <div className="space-y-4">
                {[
                  { dealer: 'CyberTech Solutions', qty: 150, status: 'Shipped', date: '2h ago' },
                  { dealer: 'Neo Distribution', qty: 80, status: 'Processing', date: '5h ago' },
                  { dealer: 'Future Systems', qty: 210, status: 'Delivered', date: '1d ago' },
                  { dealer: 'Digital Horizon', qty: 45, status: 'Pending', date: '1d ago' },
                ].map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-white/5">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{order.dealer}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{order.qty} Units • {order.date}</p>
                      </div>
                    </div>
                    <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : order.status === 'Pending' ? 'error' : 'warning'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        );
      case 'refunds':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <GlassCard className="border-cyan-500/20">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <RotateCcw size={20} className="text-cyan-400" />
                  Refund Verification Queue
                </h4>
                <p className="text-xs text-slate-500">Awaiting your verification before Super Admin approval</p>
              </div>
              <div className="space-y-4">
                {[
                  { customer: 'Alex Rivera', dealer: 'CyberTech Solutions', amount: '$1,240.00', reason: 'Defective Display Unit' },
                  { customer: 'Sarah Chen', dealer: 'Neo Distribution', amount: '$840.00', reason: 'Power Failure after 2 days' },
                  { customer: 'Marcus Thorne', dealer: 'Future Systems', amount: '$2,100.00', reason: 'Motherboard Short Circuit' },
                ].map((req, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 font-bold">
                        {req.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">{req.customer}</p>
                        <p className="text-xs text-slate-400">Dealer: <span className="text-cyan-400">{req.dealer}</span></p>
                      </div>
                    </div>
                    <div className="flex-1 max-w-md">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Reason</p>
                      <p className="text-sm text-slate-300 italic">"{req.reason}"</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Amount</p>
                        <p className="text-lg font-mono font-bold text-white">{req.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors">
                          <XCircle size={20} />
                        </button>
                        <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                          <CheckCircle2 size={20} />
                        </button>
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

// --- YEH WRAPPER COMPONENT HAI JO NAVIGATION HANDLE KAREGA ---
const DistributorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'network', label: 'Dealer Network', icon: <Globe size={18} /> },
    { id: 'inventory', label: 'Inventory', icon: <Warehouse size={18} /> },
    { id: 'refunds', label: 'Refund Verification', icon: <RotateCcw size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] pt-20">
      {/* SIDEBAR NAVIGATION */}
      <div className="w-64 border-r border-white/10 px-4 py-8 space-y-2 hidden md:block">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-6">Distribution Hub</p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                activeTab === item.id 
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
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
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab === 'overview' ? 'Distributor Dashboard' : activeTab.replace('-', ' ')}</h1>
            <p className="text-slate-400 text-sm mt-1">Monitor dealer performance and supply chain logistics.</p>
          </div>
          
          <Distributor activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default DistributorDashboard; // <--- Yeh default export error fix karega