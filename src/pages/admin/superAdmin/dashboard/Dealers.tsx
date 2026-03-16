// import React from "react";
// import { GlassCard } from "../../ui/GlassCard";

// const dealers = [
//   { name: "Alpha Motors", city: "Delhi", orders: 120 },
//   { name: "Prime Autos", city: "Bangalore", orders: 94 },
//   { name: "Torque Hub", city: "Mumbai", orders: 60 }
// ];

// const DealersPage = () => {

//   return (

//     <GlassCard>

//       <h2 className="text-xl font-bold mb-6">
//         Dealer Network
//       </h2>

//       <table className="w-full text-sm">

//         <thead className="text-slate-400">

//           <tr>
//             <th>Dealer Name</th>
//             <th>City</th>
//             <th>Total Orders</th>
//           </tr>

//         </thead>

//         <tbody className="text-white">

//           {dealers.map((dealer, i) => (

//             <tr key={i} className="border-t border-white/10">

//               <td className="py-3">{dealer.name}</td>
//               <td>{dealer.city}</td>
//               <td>{dealer.orders}</td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </GlassCard>

//   );

// };

// export default DealersPage;




import React from "react";
import { GlassCard, Badge } from "../../ui/GlassCard";
import { Store, CheckCircle2, XCircle, Clock, MoreVertical } from "lucide-react";

// Torque Craft Requirements: Track Dealer Tiers and Approval Status
const dealers = [
  { name: "Alpha Motors", city: "Delhi", orders: 120, tier: "Distributor", status: "Approved", revenue: "$45,200" },
  { name: "Prime Autos", city: "Bangalore", orders: 94, tier: "Dealer", status: "Approved", revenue: "$28,400" },
  { name: "Torque Hub", city: "Mumbai", orders: 60, tier: "Dealer", status: "Pending", revenue: "$12,100" },
  { name: "Diesel Works", city: "Chandigarh", orders: 0, tier: "Retail", status: "Rejected", revenue: "$0" }
];

const DealersPage = () => {
  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Dealer Management</h2>
          <p className="text-sm text-slate-400">Approve applications and manage pricing tiers</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          Invite New Dealer
        </button>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-white/10">
                <th className="pb-4 font-semibold uppercase tracking-wider">Dealer Information</th>
                <th className="pb-4 font-semibold uppercase tracking-wider">Pricing Tier</th>
                <th className="pb-4 font-semibold uppercase tracking-wider">Status</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-right">Total Orders</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-right">Revenue</th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-white">
              {dealers.map((dealer, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Store size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">{dealer.name}</div>
                        <div className="text-xs text-slate-500">{dealer.city}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${
                      dealer.tier === 'Distributor' ? 'bg-purple-500/20 text-purple-400' : 
                      dealer.tier === 'Dealer' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {dealer.tier}
                    </span>
                  </td>

                  <td className="py-4">
                    {dealer.status === "Approved" && (
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                        <CheckCircle2 size={14} /> Approved
                      </div>
                    )}
                    {dealer.status === "Pending" && (
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                        <Clock size={14} /> Pending Review
                      </div>
                    )}
                    {dealer.status === "Rejected" && (
                      <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
                        <XCircle size={14} /> Rejected
                      </div>
                    )}
                  </td>

                  <td className="py-4 text-right font-mono text-slate-300">
                    {dealer.orders}
                  </td>

                  <td className="py-4 text-right font-bold text-cyan-400">
                    {dealer.revenue}
                  </td>

                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-500 group-hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Pricing Tier Legend for Admin Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Retail Tier</h4>
          <p className="text-[11px] text-slate-400">Standard market pricing. No bulk discounts applied.</p>
        </div>
        <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/5">
          <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Dealer Tier</h4>
          <p className="text-[11px] text-slate-400">Automated wholesale pricing logic enabled.</p>
        </div>
        <div className="p-4 rounded-xl border border-purple-500/10 bg-purple-500/5">
          <h4 className="text-xs font-bold text-purple-400 uppercase mb-2">Distributor Tier</h4>
          <p className="text-[11px] text-slate-400">Deep discount tier for global scaling partners.</p>
        </div>
      </div>
    </div>
  );
};

export default DealersPage;