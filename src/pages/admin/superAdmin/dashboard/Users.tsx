

// import React, { useState } from "react";
// import { GlassCard } from "../../ui/GlassCard";
// import { 
//   User, Package, Store, Truck, CreditCard, 
//   ShieldCheck, Search, ChevronRight, ArrowLeft,
//   ExternalLink, Hash, Calendar, Zap
// } from "lucide-react";

// // 1. DATA HIERARCHY (Har user ke andar poora supply chain data)
// const customerData = [
//   { 
//     id: "USR-9901", 
//     name: "John Miller", 
//     email: "john@email.com", 
//     status: "Active",
//     orderId: "ORD-TC-7721",
//     product: "V8 Titanium Stud Kit",
//     sku: "TQ-V8-PRO",
//     dealer: "Cyber Torque Motors",
//     distributor: "Global Engine Parts Ltd",
//     payment: { status: "PAID", method: "Stripe", amount: "$450.00", date: "2026-02-10" },
//     warranty: { id: "WAR-99021", expiry: "2028-02-10", type: "Platinum Lifetime" }
//   },
//   { 
//     id: "USR-9902", 
//     name: "David Smith", 
//     email: "david@email.com", 
//     status: "Active",
//     orderId: "ORD-TC-8840",
//     product: "Stage 2 Turbo Bolts",
//     sku: "TQ-S2-TURBO",
//     dealer: "Premium Engines HQ",
//     distributor: "Torque Craft Global",
//     payment: { status: "PAID", method: "PayPal", amount: "$299.00", date: "2026-03-01" },
//     warranty: { id: "WAR-88440", expiry: "2027-03-01", type: "Standard" }
//   }
// ];

// const UsersPage = () => {
//   // Step 2: State to handle hierarchy view
//   const [selectedUser, setSelectedUser] = useState<any>(null);

//   // Agar user select ho gaya hai toh Detail View dikhao
//   if (selectedUser) {
//     return <CustomerDetailView user={selectedUser} onBack={() => setSelectedUser(null)} />;
//   }

//   // Step 3: Main List View (Modernized Table)
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-end">
//         <div>
//           <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
//             Customer <span className="text-brand-red">Registry</span>
//           </h2>
//           <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Authorized Asset Owners</p>
//         </div>
//         <div className="relative group">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-red transition-colors" size={14} />
//           <input 
//             type="text" 
//             placeholder="FILTER BY NAME, ID OR PRODUCT..."
//             className="bg-black/40 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-[10px] font-bold text-white focus:outline-none focus:border-brand-red/40 w-80 transition-all uppercase tracking-widest"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-2">
//         {customerData.map((user) => (
//           <div 
//             key={user.id}
//             onClick={() => setSelectedUser(user)}
//             className="group flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 hover:border-brand-red/30 cursor-pointer transition-all rounded-sm"
//           >
//             <div className="flex items-center gap-6">
//               <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center text-slate-500 group-hover:text-brand-red group-hover:bg-brand-red/10 transition-all">
//                 <User size={20} />
//               </div>
//               <div>
//                 <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{user.name}</h4>
//                 <p className="text-[10px] text-slate-500 font-bold">{user.email}</p>
//               </div>
//             </div>

//             <div className="hidden lg:flex items-center gap-12">
//               <div className="w-32">
//                 <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Product</p>
//                 <p className="text-[10px] text-white font-bold truncate uppercase">{user.product}</p>
//               </div>
//               <div className="w-32">
//                 <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Purchased From</p>
//                 <p className="text-[10px] text-brand-red font-bold truncate uppercase italic">{user.dealer}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//                <div className="text-right">
//                   <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1">Status</p>
//                   <span className="text-[9px] font-black text-emerald-500 uppercase">{user.status}</span>
//                </div>
//                <ChevronRight size={18} className="text-slate-800 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // --- CUSTOMER DETAIL VIEW (The Hierarchy System) ---
// const CustomerDetailView = ({ user, onBack }: any) => {
//   return (
//     <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
//       <button onClick={onBack} className="group flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-brand-red transition-all uppercase tracking-[0.2em]">
//         <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Registry
//       </button>

//       {/* Header Info */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-8 gap-4">
//          <div className="flex items-center gap-6">
//             <div className="p-5 bg-brand-red/10 rounded-sm border border-brand-red/20 text-brand-red shadow-[0_0_20px_rgba(231,31,41,0.15)]">
//                <User size={40} />
//             </div>
//             <div>
//                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">{user.name}</h2>
//                <div className="flex items-center gap-3 mt-2">
//                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">ID: {user.id}</span>
//                  <div className="w-1 h-1 bg-slate-800 rounded-full" />
//                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Verified Owner</span>
//                </div>
//             </div>
//          </div>
//       </div>

//       {/* STEP 4: HIERARCHY TRACE (The core requirement) */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
//         <HierarchyBox icon={<Truck />} label="Distributor" value={user.distributor} sub="Source Origin" color="text-slate-500" />
//         <HierarchyBox icon={<Store />} label="Authorized Dealer" value={user.dealer} sub="Sales Channel" color="text-brand-red" />
//         <HierarchyBox icon={<Package />} label="Asset (SKU)" value={`${user.sku}`} sub={user.product} color="text-white" />
//         <HierarchyBox icon={<Zap />} label="End Performance" value="INSTALLED" sub="Active Status" color="text-emerald-500" />
//       </div>

      

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Transaction Block */}
//         <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
//           <h3 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
//             <CreditCard size={18} className="text-brand-red" /> Billing Metadata
//           </h3>
//           <div className="space-y-5">
//             <DetailRow label="Transaction ID" value={user.orderId} />
//             <DetailRow label="Settlement Status" value={user.payment.status} highlight="text-emerald-500" />
//             <DetailRow label="Payment Gateway" value={user.payment.method} />
//             <DetailRow label="Net Amount" value={user.payment.amount} />
//             <DetailRow label="Date of Purchase" value={user.payment.date} />
//           </div>
//         </GlassCard>

//         {/* Warranty Block */}
//         <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
//           <h3 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
//             <ShieldCheck size={18} className="text-brand-red" /> Warranty Protocol
//           </h3>
//           <div className="space-y-5">
//             <DetailRow label="Protocol ID" value={user.warranty.id} />
//             <DetailRow label="Coverage Type" value={user.warranty.type} highlight="text-brand-red" />
//             <DetailRow label="Validation Status" value="AUTHENTIC" highlight="text-emerald-500" />
//             <DetailRow label="Expires On" value={user.warranty.expiry} />
//           </div>
//           <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white hover:border-brand-red/40 transition-all flex items-center justify-center gap-2">
//             <ExternalLink size={14} /> Download Certificate
//           </button>
//         </GlassCard>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const HierarchyBox = ({ icon, label, value, sub, color }: any) => (
//   <div className="bg-white/[0.02] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition-all">
//     <div className="absolute -right-2 -bottom-2 opacity-[0.03] text-white group-hover:scale-110 transition-transform duration-700">
//       {React.cloneElement(icon, { size: 80 })}
//     </div>
//     <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
//     <p className={`text-xs font-black uppercase italic tracking-tight ${color}`}>{value}</p>
//     <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase">{sub}</p>
//   </div>
// );

// const DetailRow = ({ label, value, highlight = "text-white" }: any) => (
//   <div className="flex justify-between items-center border-b border-white/5 pb-2">
//     <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
//     <span className={`text-[11px] font-black uppercase tracking-tight ${highlight}`}>{value}</span>
//   </div>
// );

// export default UsersPage;






import React, { useState } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { 
  User, Package, Store, Truck, CreditCard, 
  ShieldCheck, Search, ChevronRight, ArrowLeft,
  ExternalLink, Hash, Calendar, Zap, MapPin, 
  Mail, Phone, AlertTriangle, CheckCircle2, Globe
} from "lucide-react";

// 1. DATA HIERARCHY
const customerData = [
  { 
    id: "USR-9901", 
    name: "John Miller", 
    email: "john@email.com", 
    phone: "+1 (555) 012-3456",
    status: "Active",
    address: "742 Evergreen Terrace, Springfield, OR 97403, USA",
    orderId: "ORD-TC-7721",
    product: "V8 Titanium Stud Kit",
    sku: "TQ-V8-PRO",
    dealer: "Cyber Torque Motors",
    distributor: "Global Engine Parts Ltd",
    payment: { status: "PAID", method: "Stripe", amount: "$450.00", date: "2026-02-10" },
    warranty: { 
      id: "WAR-99021", 
      expiry: "2028-02-10", 
      type: "Platinum Lifetime",
      isUnderWarranty: true,
      daysLeft: 720
    }
  },
  { 
    id: "USR-9902", 
    name: "David Smith", 
    email: "david@email.com", 
    phone: "+44 20 7946 0958",
    status: "Active",
    address: "Unit 4, Silverstone Technology Park, NN12 8GX, UK",
    orderId: "ORD-TC-8840",
    product: "Stage 2 Turbo Bolts",
    sku: "TQ-S2-TURBO",
    dealer: "Premium Engines HQ",
    distributor: "Torque Craft Global",
    payment: { status: "PAID", method: "PayPal", amount: "$299.00", date: "2026-03-01" },
    warranty: { id: "WAR-88440", expiry: "2027-03-01", type: "Standard", isUnderWarranty: true, daysLeft: 345 }
  }
];

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (selectedUser) {
    return <CustomerDetailView user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Customer <span className="text-brand-red">Registry</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Global Asset Verification Database</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-red transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="SEARCH NAME, EMAIL OR UID..."
            className="bg-black/40 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-[10px] font-bold text-white focus:outline-none focus:border-brand-red/40 w-80 transition-all uppercase tracking-widest"
          />
        </div>
      </div>

      {/* CUSTOMER LIST WITH ADDRESS & PHONE */}
      <div className="grid grid-cols-1 gap-3">
        {customerData.map((user) => (
          <div 
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="group flex flex-wrap lg:flex-nowrap items-center justify-between p-5 bg-white/[0.01] border border-white/5 hover:border-brand-red/30 cursor-pointer transition-all rounded-sm"
          >
            {/* Basic Info */}
            <div className="flex items-center gap-5 min-w-[250px]">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center text-brand-red border border-white/5 group-hover:bg-brand-red group-hover:text-white transition-all font-black italic">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase italic tracking-tight leading-none mb-1">{user.name}</h4>
                <p className="text-[9px] text-slate-500 font-bold flex items-center gap-1 uppercase tracking-tighter">
                  <Mail size={10} className="text-brand-red"/> {user.email}
                </p>
              </div>
            </div>

            {/* Contact & Address - ADDED HERE */}
            <div className="hidden xl:flex flex-col gap-1 w-64 border-l border-white/5 pl-6">
               <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1"><Phone size={10} /> Contact</p>
               <p className="text-[10px] text-slate-400 font-bold">{user.phone}</p>
            </div>

            <div className="hidden md:flex flex-col gap-1 w-72 border-l border-white/5 pl-6">
               <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1"><MapPin size={10} /> Shipping Address</p>
               <p className="text-[10px] text-slate-400 font-bold truncate">{user.address}</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-8 border-l border-white/5 pl-6">
               <div className="text-right">
                  <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-1 italic">Warranty</p>
                  <span className={`text-[9px] font-black uppercase ${user.warranty.isUnderWarranty ? 'text-emerald-500' : 'text-brand-red'}`}>
                    {user.warranty.isUnderWarranty ? 'COVERED' : 'EXPIRED'}
                  </span>
               </div>
               <ChevronRight size={18} className="text-slate-800 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ENHANCED DETAIL VIEW ---
const CustomerDetailView = ({ user, onBack }: any) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <button onClick={onBack} className="group flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-brand-red transition-all uppercase tracking-[0.2em]">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit to Registry
      </button>

      {/* Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-white/5 pb-8">
         <div className="lg:col-span-7 flex items-center gap-8">
            <div className="p-6 bg-brand-red/10 rounded-sm border border-brand-red/20 text-brand-red shadow-[0_0_20px_rgba(231,31,41,0.15)] relative">
               <User size={48} />
               <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1 rounded-full border-4 border-black">
                  <CheckCircle2 size={12} className="text-white" />
               </div>
            </div>
            <div>
               <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-none">{user.name}</h2>
               <div className="flex flex-wrap items-center gap-6 mt-4">
                  <span className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <Mail size={14} className="text-brand-red"/> {user.email}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <Phone size={14} className="text-brand-red"/> {user.phone}
                  </span>
               </div>
            </div>
         </div>

         {/* Address Block */}
         <div className="lg:col-span-5">
            <div className="bg-white/5 p-5 border border-white/10 rounded-sm h-full flex flex-col justify-center">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                <Globe size={10} className="text-brand-red" /> Shipping Destination
              </p>
              <p className="text-[11px] text-white font-black uppercase leading-relaxed italic tracking-tight">
                <MapPin size={12} className="inline mr-2 text-brand-red -translate-y-0.5"/> 
                {user.address}
              </p>
            </div>
         </div>
      </div>

      {/* HIERARCHY FLOW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <HierarchyBox icon={<Truck />} label="Distributor" value={user.distributor} sub="Source Origin" color="text-slate-500" />
        <HierarchyBox icon={<Store />} label="Retailer" value={user.dealer} sub="Verified Partner" color="text-brand-red" />
        <HierarchyBox icon={<Package />} label="SKU / Asset" value={user.sku} sub={user.product} color="text-white" />
        <HierarchyBox icon={<ShieldCheck />} label="Protection Status" value={user.warranty.isUnderWarranty ? "ACTIVE" : "EXPIRED"} sub={`${user.warranty.daysLeft} Days Coverage`} color="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Metadata */}
        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
          <h3 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
            <CreditCard size={18} className="text-brand-red" /> Transaction Details
          </h3>
          <div className="space-y-5">
            <DetailRow label="Order ID" value={user.orderId} />
            <DetailRow label="Settlement" value={user.payment.status} highlight="text-emerald-500" />
            <DetailRow label="Gateway" value={user.payment.method} />
            <DetailRow label="Gross Amount" value={user.payment.amount} />
            <DetailRow label="Purchase Date" value={user.payment.date} />
          </div>
        </GlassCard>

        {/* Protection Metadata */}
        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
          <h3 className="text-xs font-black text-white uppercase italic tracking-[0.2em] mb-8 flex items-center gap-3">
            <ShieldCheck size={18} className="text-brand-red" /> Warranty Metadata
          </h3>
          <div className="space-y-5">
            <DetailRow label="Certificate ID" value={user.warranty.id} />
            <DetailRow label="Plan Level" value={user.warranty.type} highlight="text-brand-red" />
            <DetailRow label="Activation Status" value="AUTHENTICATED" highlight="text-emerald-500" />
            <DetailRow label="Expiry Date" value={user.warranty.expiry} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="py-4 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:border-brand-red transition-all flex items-center justify-center gap-2 group/btn">
              <ExternalLink size={14} className="group-hover/btn:rotate-12 transition-transform"/> Warranty PDF
            </button>
            <button className="py-4 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:border-emerald-500 transition-all flex items-center justify-center gap-2 group/btn">
              <Hash size={14} className="group-hover/btn:scale-110 transition-transform"/> View Invoice
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// Helper Components
const HierarchyBox = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white/[0.02] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition-all">
    <div className="absolute -right-2 -bottom-2 opacity-[0.03] text-white group-hover:scale-110 transition-transform duration-700">
      {React.cloneElement(icon, { size: 80 })}
    </div>
    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xs font-black uppercase italic tracking-tight ${color}`}>{value}</p>
    <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{sub}</p>
  </div>
);

const DetailRow = ({ label, value, highlight = "text-white" }: any) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
    <span className={`text-[11px] font-black uppercase tracking-tight ${highlight}`}>{value}</span>
  </div>
);

export default UsersPage;