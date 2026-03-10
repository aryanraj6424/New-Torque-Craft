// import { Shield, Package, Clock, ChevronRight, Download, Settings, History } from 'lucide-react';
// import { motion } from 'framer-motion';
// import warrantyData from '../data/warranty.json';

// const WarrantyDashboard = () => {
//   const activeWarranties = warrantyData.filter(w => w.activated);

//   return (
//     <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-display font-black italic uppercase mb-2">My Garage</h1>
//             <p className="text-white/50">Manage your Torque Craft components and warranty status.</p>
//           </div>
//           <div className="flex gap-4">
//             <button className="btn-secondary py-2 text-xs flex items-center gap-2">
//               <Settings size={14} /> Account Settings
//             </button>
//             <button className="btn-primary py-2 text-xs flex items-center gap-2">
//               <History size={14} /> Order History
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="metallic-card p-8">
//             <div className="flex items-center justify-between mb-4">
//               <Shield className="text-brand-red" size={24} />
//               <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Active Warranties</span>
//             </div>
//             <p className="text-4xl font-display font-black italic">{activeWarranties.length}</p>
//           </div>
//           <div className="metallic-card p-8">
//             <div className="flex items-center justify-between mb-4">
//               <Package className="text-brand-blue" size={24} />
//               <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Components</span>
//             </div>
//             <p className="text-4xl font-display font-black italic">12</p>
//           </div>
//           <div className="metallic-card p-8">
//             <div className="flex items-center justify-between mb-4">
//               <Clock className="text-brand-red" size={24} />
//               <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Days Since Last Build</span>
//             </div>
//             <p className="text-4xl font-display font-black italic">42</p>
//           </div>
//         </div>

//         {/* Warranty List */}
//         <div className="metallic-card overflow-hidden">
//           <div className="p-8 border-b border-white/10 flex justify-between items-center">
//             <h3 className="text-xl font-display font-bold italic uppercase">Registered Components</h3>
//             <button className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2">
//               Register New <ChevronRight size={16} />
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30">
//                   <th className="px-8 py-4">Component</th>
//                   <th className="px-8 py-4">Serial Number</th>
//                   <th className="px-8 py-4">Activation Date</th>
//                   <th className="px-8 py-4">Expiry Date</th>
//                   <th className="px-8 py-4">Status</th>
//                   <th className="px-8 py-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {activeWarranties.map((w) => (
//                   <tr key={w.serial} className="hover:bg-white/5 transition-colors">
//                     <td className="px-8 py-6">
//                       <p className="text-sm font-bold">{w.productName}</p>
//                     </td>
//                     <td className="px-8 py-6">
//                       <code className="text-[10px] font-mono bg-black/50 px-2 py-1 rounded border border-white/10">{w.serial}</code>
//                     </td>
//                     <td className="px-8 py-6 text-sm text-white/60">{w.activationDate}</td>
//                     <td className="px-8 py-6 text-sm text-brand-red font-bold">{w.expiryDate}</td>
//                     <td className="px-8 py-6">
//                       <span className="bg-brand-blue/20 text-brand-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand-blue/30">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-8 py-6">
//                       <button className="text-white/40 hover:text-white transition-colors">
//                         <Download size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WarrantyDashboard;




import { Shield, Package, Clock, ChevronRight, Download, Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWarranty } from '../context/WarrantyContext'; // Context import kiya
import { Link } from 'react-router-dom'; // Navigation ke liye

const WarrantyDashboard = () => {
  const { warranties } = useWarranty(); // Dynamic data context se liya

  // Filter active warranties (Context mein status track ho raha hai)
  const activeWarranties = warranties.filter(w => w.status === 'Active' || w.status === 'Pending Verification');

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]"> {/* Consistent Background */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-black italic uppercase text-white mb-2">My <span className="text-brand-red">Garage</span></h1>
            <p className="text-white/50">Manage your Torque Craft components and warranty status.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2 transition-all">
              <Settings size={14} /> Account
            </button>
            <button className="bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-red-600/10">
              <History size={14} /> Orders
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <Shield className="text-brand-red" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Active Warranties</span>
            </div>
            <p className="text-4xl font-display font-black italic text-white">{activeWarranties.length}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <Package className="text-brand-blue" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Total Components</span>
            </div>
            <p className="text-4xl font-display font-black italic text-white">{warranties.length}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-brand-red" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Service Status</span>
            </div>
            <p className="text-2xl font-display font-black italic text-green-500 uppercase">Optimal</p>
          </motion.div>
        </div>

        {/* Warranty List Table */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-display font-bold italic uppercase text-white">Registered Components</h3>
            <Link to="/warranty-registration" className="text-brand-red text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Register New <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  <th className="px-8 py-5">Component / SKU</th>
                  <th className="px-8 py-5">Purchase Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {warranties.length > 0 ? (
                  warranties.map((w) => (
                    <tr key={w.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-white uppercase italic group-hover:text-brand-red transition-colors">{w.customerName}'s Part</p>
                        <code className="text-[10px] font-mono text-white/40">{w.sku}</code>
                      </td>
                      <td className="px-8 py-6 text-sm text-white/60 font-mono">{w.purchaseDate}</td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                          w.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                          'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-white/20 hover:text-white transition-colors p-2 bg-white/5 rounded-lg">
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-white/20 uppercase text-xs font-bold tracking-[0.2em]">
                      No components registered in your garage yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyDashboard;