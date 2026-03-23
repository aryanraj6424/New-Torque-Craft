// import React, { useState, useMemo } from "react";
// import { 
//   Users, UserPlus, TrendingUp, Wallet, 
//   History, Search, X, Edit3, Trash2, 
//   Save, CheckCircle2, AlertCircle, ShieldCheck,
//   ChevronRight, BarChart3
// } from "lucide-react";
// import { cn } from "../../../lib/utils";

// // --- Types ---
// interface Dealer {
//   id: string;
//   name: string;
//   businessName: string;
//   email: string;
//   phone: string;
//   location: string;
//   creditLimit: number;
//   currentBalance: number;
//   performanceScore: number; // 1 to 100
//   totalOrders: number;
//   status: "Active" | "Pending" | "On Hold";
// }

// const INITIAL_DEALERS: Dealer[] = [
//   {
//     id: "DLR-001",
//     name: "Rajesh Malhotra",
//     businessName: "Malhotra Auto Spares",
//     email: "rajesh@malhotraauto.com",
//     phone: "+91 98765 43210",
//     location: "Noida, UP",
//     creditLimit: 500000,
//     currentBalance: 120000,
//     performanceScore: 92,
//     totalOrders: 45,
//     status: "Active"
//   },
//   {
//     id: "DLR-002",
//     name: "Amit Singh",
//     businessName: "Singh Performance Wheels",
//     email: "amit@singhwheels.in",
//     phone: "+91 91234 56789",
//     location: "Gurgaon, HR",
//     creditLimit: 300000,
//     currentBalance: 280000,
//     performanceScore: 65,
//     totalOrders: 12,
//     status: "On Hold"
//   }
// ];

// export default function DealerManagement() {
//   const [dealers, setDealers] = useState<Dealer[]>(INITIAL_DEALERS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Form State
//   const [formData, setFormData] = useState<Partial<Dealer>>({
//     name: "", businessName: "", email: "", phone: "", 
//     location: "", creditLimit: 0, status: "Active"
//   });

//   // --- Handlers ---
//   const openAddModal = () => {
//     setEditingId(null);
//     setFormData({ name: "", businessName: "", email: "", phone: "", location: "", creditLimit: 0, status: "Active" });
//     setIsModalOpen(true);
//   };

//   const openEditModal = (dealer: Dealer) => {
//     setEditingId(dealer.id);
//     setFormData(dealer);
//     setIsModalOpen(true);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.businessName) return alert("Business details are mandatory!");

//     if (editingId) {
//       setDealers(dealers.map(d => d.id === editingId ? { ...d, ...formData } as Dealer : d));
//     } else {
//       const newDealer: Dealer = {
//         ...(formData as Dealer),
//         id: `DLR-${Math.floor(100 + Math.random() * 900)}`,
//         currentBalance: 0,
//         performanceScore: 100,
//         totalOrders: 0,
//       };
//       setDealers([newDealer, ...dealers]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to remove this dealer?")) {
//       setDealers(dealers.filter(d => d.id !== id));
//     }
//   };

//   const filteredDealers = useMemo(() => {
//     return dealers.filter(d => 
//       d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       d.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       d.location.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, dealers]);

//   return (
//     <div className="min-h-screen bg-[#020617] p-4 md:p-8 space-y-10 text-slate-200">
      
//       {/* MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
//             <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
//               <h3 className="font-black uppercase tracking-widest text-cyan-400 italic flex items-center gap-2">
//                 <UserPlus size={20}/> {editingId ? "Update Dealer Profile" : "Onboard New Dealer"}
//               </h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6">
//               <FormField label="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="Owner Name" />
//               <FormField label="Business Name" value={formData.businessName} onChange={v => setFormData({...formData, businessName: v})} placeholder="Shop/Company Name" />
//               <FormField label="Email" value={formData.email} onChange={v => setFormData({...formData, email: v})} placeholder="dealer@email.com" />
//               <FormField label="Phone" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="+91..." />
//               <FormField label="Location" value={formData.location} onChange={v => setFormData({...formData, location: v})} placeholder="City, State" />
//               <FormField label="Credit Limit ($)" type="number" value={formData.creditLimit} onChange={v => setFormData({...formData, creditLimit: Number(v)})} />
              
//               <div className="col-span-2 pt-4">
//                 <button type="submit" className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
//                   <Save size={18} /> {editingId ? "Save Dealer Data" : "Confirm Registration"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Dealer Network</h2>
//           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
//             <span className="w-6 h-[1px] bg-cyan-500"></span> Channel Partner Management
//           </p>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="relative flex-1 md:flex-none">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//             <input 
//               type="text" 
//               placeholder="SEARCH BY NAME, SHOP OR CITY..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 transition-all w-full md:w-80 outline-none backdrop-blur-md"
//             />
//           </div>
//           <button onClick={openAddModal} className="p-4 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all shadow-lg active:scale-90">
//             <UserPlus size={20} />
//           </button>
//         </div>
//       </div>

//       {/* QUICK STATS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard label="Total Dealers" value={dealers.length} icon={Users} color="cyan" />
//         <StatCard label="Avg Performance" value="84%" icon={TrendingUp} color="emerald" />
//         <StatCard label="Network Credit" value={`$${dealers.reduce((acc, d) => acc + (d.creditLimit || 0), 0).toLocaleString()}`} icon={Wallet} color="purple" />
//         <StatCard label="Pending Approval" value="03" icon={ShieldCheck} color="amber" />
//       </div>

//       {/* DEALERS TABLE */}
//       <div className="bg-slate-900/30 border border-slate-800/50 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-separate border-spacing-0">
//             <thead>
//               <tr className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-900/60 text-center">
//                 <th className="px-10 py-7 text-left border-b border-slate-800/50">Dealer Details</th>
//                 <th className="px-6 py-7 border-b border-slate-800/50">Credit Status</th>
//                 <th className="px-6 py-7 border-b border-slate-800/50">Performance</th>
//                 <th className="px-6 py-7 border-b border-slate-800/50">Orders</th>
//                 <th className="px-10 py-7 text-right border-b border-slate-800/50">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/30">
//               {filteredDealers.map((d) => (
//                 <tr key={d.id} className="group hover:bg-slate-800/40 transition-all duration-300">
//                   <td className="px-10 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-500 font-black italic">
//                         {d.businessName.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="text-[13px] font-black text-white uppercase italic tracking-tight">{d.businessName}</div>
//                         <div className="text-[10px] text-slate-500 font-bold uppercase">{d.name} • {d.location}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-6">
//                     <div className="flex flex-col items-center">
//                       <div className="text-xs font-black text-white">${d.currentBalance.toLocaleString()} / <span className="text-slate-500">${d.creditLimit.toLocaleString()}</span></div>
//                       <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700">
//                         <div 
//                           className={cn("h-full rounded-full transition-all", (d.currentBalance/d.creditLimit) > 0.8 ? "bg-red-500" : "bg-cyan-500")}
//                           style={{ width: `${(d.currentBalance / d.creditLimit) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <div className={cn(
//                       "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black border",
//                       d.performanceScore > 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
//                     )}>
//                       <TrendingUp size={12} /> {d.performanceScore}%
//                     </div>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <div className="text-sm font-black text-white tabular-nums">{d.totalOrders}</div>
//                     <div className="text-[9px] text-slate-600 font-black uppercase">Orders</div>
//                   </td>
//                   <td className="px-10 py-6 text-right">
//                     <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
//                       <button onClick={() => alert(`Showing history for ${d.businessName}`)} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-cyan-400 transition-all shadow-lg"><History size={16}/></button>
//                       <button onClick={() => openEditModal(d)} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-white transition-all shadow-lg"><Edit3 size={16}/></button>
//                       <button onClick={() => handleDelete(d.id)} className="p-3 bg-slate-900 border border-slate-800 text-red-500/40 rounded-xl hover:text-red-500 transition-all shadow-lg"><Trash2 size={16}/></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Helper Components ---

// function FormField({ label, value, onChange, placeholder, type = "text" }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">{label}</label>
//       <input 
//         type={type}
//         required 
//         value={value} 
//         onChange={e => onChange(e.target.value)} 
//         className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all text-white" 
//         placeholder={placeholder} 
//       />
//     </div>
//   );
// }

// function StatCard({ label, value, icon: Icon, color }: any) {
//   const colorMap: any = {
//     cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
//     emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
//     purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
//     amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
//   };
//   return (
//     <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-[2.5rem] shadow-xl group hover:border-slate-700 transition-all backdrop-blur-sm">
//       <div className={cn("w-12 h-12 flex items-center justify-center rounded-2xl mb-4 border transition-transform group-hover:scale-110", colorMap[color])}>
//         <Icon size={22} />
//       </div>
//       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
//       <h4 className="text-2xl font-black mt-1 text-white tabular-nums tracking-tighter">{value}</h4>
//     </div>
//   );
// }







import React, { useState, useMemo, useEffect } from "react";
import { 
  Users, UserPlus, TrendingUp, Wallet, 
  History, Search, X, Edit3, Trash2, 
  ArrowUpDown, AlertCircle, BarChart3,
  Package
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
type DealerStatus = "Active" | "Pending" | "On Hold";

interface OrderRecord {
  id: string;
  date: string;
  amount: number;
  status: "Delivered" | "Shipped" | "Processing";
}

interface Dealer {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  creditLimit: number;
  currentBalance: number;
  performanceScore: number;
  totalOrders: number;
  status: DealerStatus;
  joinedDate: string;
  orderHistory: OrderRecord[];
}

const DUMMY_DEALERS: Dealer[] = [
  {
    id: "DLR-X921",
    name: "Rajesh Malhotra",
    businessName: "Nitro Wheels Performance",
    email: "contact@nitrowheels.com",
    phone: "+91 98765 00001",
    location: "Noida, Sector 62",
    creditLimit: 1000000,
    currentBalance: 150000,
    performanceScore: 96,
    totalOrders: 142,
    status: "Active",
    joinedDate: "12/01/2025",
    orderHistory: [
      { id: "ORD-001", date: "2026-03-15", amount: 45000, status: "Delivered" },
      { id: "ORD-002", date: "2026-03-20", amount: 12000, status: "Processing" }
    ]
  },
  {
    id: "DLR-Y442",
    name: "Sanya Gupta",
    businessName: "Elite Carbon Spares",
    email: "sales@elitecarbon.in",
    phone: "+91 91234 55502",
    location: "Gurgaon, HR",
    creditLimit: 500000,
    currentBalance: 460000,
    performanceScore: 78,
    totalOrders: 45,
    status: "On Hold",
    joinedDate: "05/02/2026",
    orderHistory: []
  }
];

export default function DealerManagement() {
  const [dealers, setDealers] = useState<Dealer[]>(() => {
    const saved = localStorage.getItem("torque_dealers");
    return saved ? JSON.parse(saved) : DUMMY_DEALERS; 
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Dealer; direction: 'asc' | 'desc' } | null>(null);

  // Default values set to empty strings to avoid "Uncontrolled to Controlled" warning
  const [formData, setFormData] = useState<Partial<Dealer>>({
    name: "", businessName: "", email: "", phone: "", 
    location: "", creditLimit: 0, status: "Active"
  });

  useEffect(() => {
    localStorage.setItem("torque_dealers", JSON.stringify(dealers));
  }, [dealers]);

  const handleSort = (key: keyof Dealer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDealers(prev => prev.map(d => 
        d.id === editingId ? { ...d, ...formData, orderHistory: d.orderHistory || [] } as Dealer : d
      ));
    } else {
      const newDealer: Dealer = {
        name: formData.name || "",
        businessName: formData.businessName || "",
        email: formData.email || "",
        phone: formData.phone || "",
        location: formData.location || "",
        creditLimit: formData.creditLimit || 0,
        status: (formData.status as DealerStatus) || "Active",
        id: `DLR-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        currentBalance: 0,
        performanceScore: 100,
        totalOrders: 0,
        joinedDate: new Date().toLocaleDateString(),
        orderHistory: []
      };
      setDealers(prev => [newDealer, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredAndSortedDealers = useMemo(() => {
    let result = dealers.filter(d => 
      (d.businessName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (d.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [dealers, searchTerm, sortConfig]);

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-10 text-slate-200 selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <Users className="text-cyan-400" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Dealer Command</h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1">Network Intelligence System</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH NETWORK..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[11px] font-black uppercase tracking-widest focus:border-cyan-500/50 outline-none transition-all backdrop-blur-xl"
            />
          </div>
          <button 
            onClick={() => { 
              setEditingId(null); 
              setFormData({ name: "", businessName: "", email: "", phone: "", location: "", creditLimit: 0, status: "Active" }); 
              setIsModalOpen(true); 
            }}
            className="flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-cyan-500/20 active:scale-95"
          >
            <UserPlus size={18} /> Add Dealer
          </button>
        </div>
      </header>

      {/* KPI GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Active Dealers" value={dealers.filter(d => d.status === "Active").length} icon={Users} color="cyan" />
        <KPICard label="High Performers" value={dealers.filter(d => (d.performanceScore || 0) > 90).length} icon={TrendingUp} color="emerald" />
        <KPICard label="Network Credit" value={`₹${(dealers.reduce((a, b) => a + (b.creditLimit || 0), 0) / 1000000).toFixed(1)}M`} icon={Wallet} color="purple" />
        <KPICard label="Credit Alerts" value={dealers.filter(d => (d.currentBalance / d.creditLimit) > 0.9).length} icon={AlertCircle} color="amber" />
      </section>

      {/* MAIN TABLE */}
      <div className="bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900/60">
                <TableHead label="Dealer / Entity" onSort={() => handleSort('businessName')} />
                <TableHead label="Credit Utilization" onSort={() => handleSort('currentBalance')} center />
                <TableHead label="Perf. Score" onSort={() => handleSort('performanceScore')} center />
                <TableHead label="Status" center />
                <th className="px-10 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredAndSortedDealers.map((d) => (
                <DealerRow 
                  key={d.id} 
                  dealer={d} 
                  onEdit={() => { setEditingId(d.id); setFormData(d); setIsModalOpen(true); }}
                  onViewHistory={() => { setSelectedDealer(d); setIsHistoryOpen(true); }}
                  onDelete={() => {
                    if(confirm("Confirm Removal?")) setDealers(prev => prev.filter(x => x.id !== d.id));
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {isModalOpen && <RegistrationModal editingId={editingId} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />}
      {isHistoryOpen && selectedDealer && <HistoryModal dealer={selectedDealer} onClose={() => setIsHistoryOpen(false)} />}
    </div>
  );
}

// --- Components ---

function DealerRow({ dealer, onEdit, onDelete, onViewHistory }: { dealer: Dealer; onEdit: () => void; onDelete: () => void; onViewHistory: () => void }) {
  const usagePercent = (dealer.currentBalance / (dealer.creditLimit || 1)) * 100;
  
  return (
    <tr className="group hover:bg-slate-800/30 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-black italic">
            {dealer.businessName?.charAt(0) || "D"}
          </div>
          <div>
            <div className="text-[14px] font-black text-white uppercase italic tracking-tight">{dealer.businessName}</div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{dealer.name} • {dealer.location}</div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="max-w-[160px] mx-auto space-y-2">
          <div className="flex justify-between text-[10px] font-black tabular-nums">
            <span className="text-white">₹{dealer.currentBalance.toLocaleString()}</span>
            <span className="text-slate-500">₹{dealer.creditLimit.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div 
              className={cn("h-full transition-all duration-700", usagePercent > 85 ? "bg-red-500" : "bg-cyan-500")}
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-8 py-6 text-center">
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black border",
          dealer.performanceScore > 85 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
        )}>
          {dealer.performanceScore}%
        </div>
      </td>
      <td className="px-8 py-6 text-center">
        <span className={cn(
          "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border",
          dealer.status === "Active" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" : 
          dealer.status === "On Hold" ? "text-red-400 border-red-500/30 bg-red-500/5" : "text-amber-400 border-amber-500/30 bg-amber-500/5"
        )}>
          {dealer.status}
        </span>
      </td>
      <td className="px-10 py-6 text-right">
        <div className="flex justify-end gap-2">
          <button onClick={onViewHistory} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-cyan-400 transition-all"><History size={15}/></button>
          <button onClick={onEdit} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-cyan-400 transition-all"><Edit3 size={15}/></button>
          <button onClick={onDelete} className="p-3 bg-slate-900 border border-slate-800 text-red-500/40 rounded-xl hover:text-red-500 transition-all"><Trash2 size={15}/></button>
        </div>
      </td>
    </tr>
  );
}

function HistoryModal({ dealer, onClose }: { dealer: Dealer; onClose: () => void }) {
  // Crash Prevention: Check if orderHistory exists before accessing length
  const orders = dealer?.orderHistory || [];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="bg-[#0f172a] border border-slate-800 rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="text-xl font-black uppercase italic text-cyan-400">Logs: {dealer.businessName}</h3>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Transaction History</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-800 rounded-full transition-colors text-slate-400"><X /></button>
        </div>
        <div className="p-10 max-h-[60vh] overflow-y-auto space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-slate-800 rounded-xl text-cyan-400"><Package size={20} /></div>
                  <div>
                    <div className="text-sm font-black text-white">{order.id}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{order.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-400">₹{order.amount.toLocaleString()}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{order.status}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-slate-600 uppercase font-black text-[10px] tracking-[0.3em]">
              No order history available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RegistrationModal({ editingId, formData, setFormData, handleSubmit, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f172a] border border-slate-800 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="text-xl font-black uppercase italic text-cyan-400">{editingId ? 'Edit Profile' : 'New Registration'}</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-800 rounded-full text-slate-400"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Business Name" value={formData.businessName} onChange={(v:any) => setFormData({...formData, businessName: v})} required />
            <Input label="Owner Name" value={formData.name} onChange={(v:any) => setFormData({...formData, name: v})} required />
            <Input label="Email" type="email" value={formData.email} onChange={(v:any) => setFormData({...formData, email: v})} required />
            <Input label="Phone" value={formData.phone} onChange={(v:any) => setFormData({...formData, phone: v})} />
            <Input label="Location" value={formData.location} onChange={(v:any) => setFormData({...formData, location: v})} />
            <Input label="Credit Limit (₹)" type="number" value={formData.creditLimit} onChange={(v:any) => setFormData({...formData, creditLimit: Number(v)})} />
          </div>
          <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] active:scale-95 transition-transform">
            {editingId ? 'Push Updates' : 'Initialize Onboarding'}
          </button>
        </form>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color }: any) {
  const themes: any = {
    cyan: "text-cyan-400 bg-cyan-400/5 border-cyan-500/20",
    emerald: "text-emerald-400 bg-emerald-400/5 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-400/5 border-purple-500/20",
    amber: "text-amber-400 bg-amber-400/5 border-amber-500/20",
  };
  return (
    <div className={cn("p-8 rounded-[2.5rem] border backdrop-blur-sm transition-all hover:scale-[1.02]", themes[color])}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-white/5"><Icon size={24} /></div>
        <BarChart3 className="text-slate-800" size={16} />
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
      <h4 className="text-3xl font-black mt-1 text-white tracking-tighter">{value}</h4>
    </div>
  );
}

function TableHead({ label, onSort, center }: { label: string; onSort?: () => void; center?: boolean }) {
  return (
    <th className={cn("px-8 py-7 border-b border-slate-800/50", center && "text-center")}>
      <button onClick={onSort} className={cn("inline-flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors", center && "mx-auto")}>
        {label} {onSort && <ArrowUpDown size={12} />}
      </button>
    </th>
  );
}

function Input({ label, value, onChange, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">{label}</label>
      <input 
        {...props}
        value={value ?? ""} // Fix: Ensures the input is always controlled
        onChange={e => onChange(e.target.value)}
        className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-[12px] font-medium text-white focus:border-cyan-500/50 outline-none transition-all"
      />  
    </div>
  );
}