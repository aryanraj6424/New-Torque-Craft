// import React from "react";
// import { GlassCard } from "../../../ui/GlassCard";
// import { ArrowLeft, Users, RotateCcw, ShieldCheck, ShieldAlert, ShoppingBag } from "lucide-react";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// const data = [
//   { name: "Week 1", sales: 4000 },
//   { name: "Week 2", sales: 3000 },
//   { name: "Week 3", sales: 5000 },
//   { name: "Week 4", sales: 4800 },
// ];

// // Main Component
// const DealerDetail = ({ dealerId, onBack }: { dealerId: string, onBack: () => void }) => {
//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       {/* Header with Back Button */}
//       <button 
//         onClick={onBack} 
//         className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
//       >
//         <ArrowLeft size={18} /> Back to List
//       </button>

//       <div>
//         <h2 className="text-2xl font-bold text-white tracking-tight">Performance: XYZ Dealer</h2>
//         <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-mono">Dealer ID: {dealerId}</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <MetricCard label="Total Customers" value="240" icon={<Users className="text-cyan-400"/>} />
//         <MetricCard label="Total Sales" value="$12,450" icon={<ShoppingBag className="text-emerald-400"/>} />
//         <MetricCard label="Refund Requests" value="14" icon={<RotateCcw className="text-orange-400"/>} />
//         <MetricCard label="Active Warranties" value="180" icon={<ShieldCheck className="text-green-400"/>} />
//         <MetricCard label="Pending/Deactivated" value="12" icon={<ShieldAlert className="text-red-400"/>} />
//         <MetricCard label="Total Refunded" value="$840" icon={<RotateCcw className="text-red-500"/>} />
//       </div>

//       {/* Sales Trend Graph */}
//       <GlassCard className="p-8 h-[450px]">
//         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Sales Trend Analysis</h3>
//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
//               <XAxis 
//                 dataKey="name" 
//                 stroke="#64748b" 
//                 fontSize={12} 
//                 tickLine={false} 
//                 axisLine={false} 
//                 dy={10}
//               />
//               <YAxis 
//                 stroke="#64748b" 
//                 fontSize={12} 
//                 tickLine={false} 
//                 axisLine={false} 
//               />
//               <Tooltip 
//                 contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
//                 itemStyle={{ color: '#06b6d4' }}
//               />
//               <Area 
//                 type="monotone" 
//                 dataKey="sales" 
//                 stroke="#06b6d4" 
//                 fillOpacity={0.1} 
//                 fill="#06b6d4" 
//                 strokeWidth={3} 
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </GlassCard>
      
//       {/* Footer Space */}
//       <div className="h-10 invisible" />
//     </div>
//   );
// };

// // Reusable Metric Card Component
// // Prop types define kar diye hain taaki error na aaye
// const MetricCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
//   <GlassCard className="p-6 hover:bg-white/5 transition-colors">
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
//         <h4 className="text-2xl font-bold text-white">{value}</h4>
//       </div>
//       <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 shadow-inner">
//         {icon}
//       </div>
//     </div>
//   </GlassCard>
// );

// export default DealerDetail;


import React from "react";
import { GlassCard } from "../../../ui/GlassCard";
import { 
  ArrowLeft, Users, ShieldCheck, ShieldAlert, 
  ShoppingBag, RotateCcw, MapPin, Package 
} from "lucide-react";

const DealerDetail = ({ dealerId, onBack }: { dealerId: string, onBack: () => void }) => {
  
  // Dummy Data (Real app mein ye API se aayega dealerId ke base par)
  const dealerInfo = {
    name: "Cyber Torque Motors",
    location: "Plot 42, Okhla Phase III, New Delhi",
    totalCustomers: "1,240",
    activeWarranties: "850",
    pendingWarranties: "42",
    totalProducts: "18",
    refundsProcessed: "12",
    refundAmount: "$4,500"
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-white/5 pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest mb-4">
            <ArrowLeft size={14} /> Back to Directory
          </button>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Dealer <span className="text-brand-red">Intelligence</span>
          </h2>
          <div className="flex items-center gap-2 text-slate-400 mt-2">
            <MapPin size={14} className="text-brand-red" />
            <span className="text-xs font-bold uppercase tracking-widest">{dealerInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid - Warranties, Customers, Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Customers" value={dealerInfo.totalCustomers} icon={<Users />} />
        <MetricCard label="Active Warranties" value={dealerInfo.activeWarranties} icon={<ShieldCheck />} color="text-emerald-500" />
        <MetricCard label="Pending Claims" value={dealerInfo.pendingWarranties} icon={<ShieldAlert />} color="text-orange-500" />
        <MetricCard label="Total Products" value={dealerInfo.totalProducts} icon={<Package />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Refund Status Details */}
        <GlassCard className="p-6 border-white/5 bg-white/[0.01]">
          <h3 className="text-sm font-black text-white uppercase italic tracking-widest mb-6 flex items-center gap-2">
            <RotateCcw size={18} className="text-brand-red" /> Refund Status Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-white/5 rounded">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Processed Requests</span>
              <span className="text-white font-black">{dealerInfo.refundsProcessed}</span>
            </div>
            <div className="flex justify-between p-4 bg-white/5 rounded text-brand-red">
              <span className="text-[10px] font-bold uppercase">Total Refund Volume</span>
              <span className="font-black">{dealerInfo.refundAmount}</span>
            </div>
          </div>
        </GlassCard>

        {/* Product Details Table/List */}
        <GlassCard className="p-6 border-white/5 bg-white/[0.01]">
          <h3 className="text-sm font-black text-white uppercase italic tracking-widest mb-6 flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-red" /> Product Inventory Summary
          </h3>
          <div className="text-[10px] text-slate-500 font-bold uppercase">
             {/* Yahan aap product list map kar sakte hain */}
             <p>V8 Engine - Stage 2 (120 Units)</p>
             <div className="h-px bg-white/5 my-2" />
             <p>Torque Spares - Carbon Fiber (450 Units)</p>
          </div>
        </GlassCard>
      </div>

    </div>
  );
};

/* Mini Component for Stats */
const MetricCard = ({ label, value, icon, color = "text-white" }: any) => (
  <GlassCard className="p-6 border-white/5 group hover:border-brand-red/20 transition-all">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <h4 className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</h4>
      </div>
      <div className="p-3 bg-white/5 rounded text-slate-400 group-hover:text-brand-red transition-colors">
        {React.cloneElement(icon, { size: 20 })}
      </div>
    </div>
  </GlassCard>
);

export default DealerDetail;