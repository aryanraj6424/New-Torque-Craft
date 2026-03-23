// import React, { useState, useMemo } from "react";
// import { 
//   ShoppingBag, 
//   FileText, 
//   UserPlus, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Search,
//   Filter,
//   Download,
//   MoreVertical,
//   ExternalLink
// } from "lucide-react";
// import { cn } from "../../../lib/utils";

// // ✅ Type Definition
// interface Order {
//   id: string;
//   customer: string;
//   items: number;
//   amount: string;
//   status: "Pending" | "Accepted" | "Assigned" | "Rejected";
//   date: string;
//   assignedTo?: string;
//   type: string;
// }

// const initialOrders: Order[] = [
//   { id: "ORD-9921", customer: "Rahul Sharma", items: 3, amount: "₹42,500", status: "Pending", date: "23 Mar 2026", type: "Diesel Engine" },
//   { id: "ORD-9922", customer: "Apex Motors", items: 12, amount: "₹2,15,000", status: "Accepted", date: "22 Mar 2026", assignedTo: "North Dealer A", type: "Transmission Kit" },
//   { id: "ORD-9923", customer: "Suresh Gupta", items: 1, amount: "₹8,400", status: "Assigned", date: "22 Mar 2026", assignedTo: "Z-Tech Parts", type: "Brake Pads" },
//   { id: "ORD-9924", customer: "Elite Spares", items: 5, amount: "₹56,000", status: "Rejected", date: "21 Mar 2026", type: "Clutch Plate" },
//   { id: "ORD-9925", customer: "Global Auto", items: 8, amount: "₹1,12,000", status: "Pending", date: "20 Mar 2026", type: "Full Service Kit" },
// ];

// export default function Orders() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   // ✅ Production Logic: Update Status
//   const updateStatus = (id: string, newStatus: Order["status"], dealer?: string) => {
//     setOrders(prev => prev.map(order => 
//       order.id === id ? { ...order, status: newStatus, assignedTo: dealer || order.assignedTo } : order
//     ));
//   };

//   // ✅ Production Logic: Invoice Generation
//   const generateInvoice = (order: Order) => {
//     console.log(`Generating invoice for ${order.id}...`);
//     alert(`Generating Distributor Invoice for ${order.id}\nTotal: ${order.amount}`);
//   };

//   // ✅ Search & Filter Logic
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             order.customer.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab;
//       return matchesSearch && matchesTab;
//     });
//   }, [searchTerm, activeTab, orders]);

//   const getStatusStyle = (status: string) => {
//     switch (status) {
//       case "Pending": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
//       case "Accepted": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
//       case "Assigned": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
//       case "Rejected": return "text-red-400 bg-red-400/10 border-red-400/20";
//       default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
//     }
//   };

//   return (
//     <div className="space-y-10 text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
//       {/* HEADER & SEARCH */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Order Pipeline</h2>
//           <div className="flex items-center gap-2 mt-2">
//             <span className="w-8 h-[2px] bg-cyan-500"></span>
//             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Accept & Assign Distribution</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="relative group flex-1 md:flex-none">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//             <input 
//               type="text" 
//               placeholder="SEARCH BY ID OR NAME..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-80 backdrop-blur-xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* QUICK ACTIONS STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {[
//           { label: "New Requests", value: orders.filter(o => o.status === "Pending").length, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
//           { label: "To Assign", value: orders.filter(o => o.status === "Accepted").length, icon: UserPlus, color: "text-cyan-400", bg: "bg-cyan-400/10" },
//           { label: "Active", value: orders.filter(o => o.status === "Assigned").length, icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" },
//           { label: "Completed", value: "142", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
//         ].map((stat, i) => (
//           <div key={i} className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2rem] border border-slate-800/50 shadow-xl group">
//             <div className={cn("w-12 h-12 flex items-center justify-center rounded-2xl mb-4", stat.bg)}>
//               <stat.icon size={22} className={stat.color} />
//             </div>
//             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
//             <h4 className="text-2xl font-black mt-1 text-white tabular-nums">{stat.value}</h4>
//           </div>
//         ))}
//       </div>

//       {/* MAIN ORDERS TABLE */}
//       <div className="bg-[#0f172a]/50 rounded-[3rem] border border-slate-800/50 overflow-hidden shadow-2xl backdrop-blur-sm">
//         <div className="p-8 border-b border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-900/20">
//           <h3 className="text-xl font-black uppercase tracking-tight italic flex items-center gap-3">
//             <div className="p-2 bg-cyan-500/10 rounded-xl">
//               <ShoppingBag size={20} className="text-cyan-400" />
//             </div>
//             Live Network Orders
//           </h3>
          
//           <div className="flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
//             {["all", "pending", "assigned"].map((tab) => (
//               <button 
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={cn(
//                   "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
//                   activeTab === tab ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "text-slate-500 hover:text-slate-300"
//                 )}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-separate border-spacing-0">
//             <thead>
//               <tr className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-900/40">
//                 <th className="px-10 py-6">Order ID</th>
//                 <th className="px-6 py-6">Customer / Type</th>
//                 <th className="px-6 py-6 text-center">Amount</th>
//                 <th className="px-6 py-6 text-center">Status</th>
//                 <th className="px-6 py-6">Handling Agent</th>
//                 <th className="px-10 py-6 text-right">Control</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/30">
//               {filteredOrders.length > 0 ? filteredOrders.map((order) => (
//                 <tr key={order.id} className="group hover:bg-slate-800/30 transition-all duration-300">
//                   <td className="px-10 py-6">
//                     <span className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer">
//                       {order.id}
//                       <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </span>
//                     <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">{order.date}</p>
//                   </td>
//                   <td className="px-6 py-6">
//                     <span className="text-sm font-black text-slate-200 uppercase tracking-tight">{order.customer}</span>
//                     <p className="text-[10px] text-cyan-500/70 font-black uppercase tracking-widest mt-0.5">{order.type}</p>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <span className="text-sm font-black text-emerald-400 tabular-nums">{order.amount}</span>
//                     <p className="text-[9px] text-slate-500 font-bold uppercase">{order.items} Units</p>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <span className={cn("px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border", getStatusStyle(order.status))}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-6">
//                     {order.assignedTo ? (
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-cyan-400 border border-slate-700 uppercase">
//                           {order.assignedTo.charAt(0)}
//                         </div>
//                         <span className="text-[11px] font-black uppercase text-slate-300">{order.assignedTo}</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2 text-slate-600">
//                         <div className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" />
//                         <span className="text-[10px] font-black uppercase italic tracking-widest">Unassigned</span>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-10 py-6 text-right">
//                     <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      
//                       {/* Accept/Reject Control */}
//                       {order.status === "Pending" && (
//                         <>
//                           <button 
//                             onClick={() => updateStatus(order.id, "Accepted")}
//                             className="p-2.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/20"
//                           >
//                             <CheckCircle2 size={18} />
//                           </button>
//                           <button 
//                             onClick={() => updateStatus(order.id, "Rejected")}
//                             className="p-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/20"
//                           >
//                             <XCircle size={18} />
//                           </button>
//                         </>
//                       )}
                      
//                       {/* Assign Control */}
//                       {order.status === "Accepted" && (
//                         <button 
//                           onClick={() => updateStatus(order.id, "Assigned", "Auto-Dealer-X")}
//                           className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/30"
//                         >
//                           <UserPlus size={16} />
//                           <span className="text-[10px] font-black uppercase tracking-widest">Assign</span>
//                         </button>
//                       )}

//                       {/* Invoice Control */}
//                       {(order.status === "Assigned" || order.status === "Accepted") && (
//                         <button 
//                           onClick={() => generateInvoice(order)}
//                           className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-lg shadow-purple-500/10"
//                         >
//                           <Download size={18} />
//                         </button>
//                       )}

//                       <button className="p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all">
//                         <MoreVertical size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={6} className="px-10 py-20 text-center opacity-30">
//                     <Search size={48} className="mx-auto mb-4" />
//                     <p className="text-sm font-black uppercase tracking-[0.3em]">No matching orders</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-8 bg-slate-900/40 border-t border-slate-800/50 flex justify-between items-center">
//           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
//             Pipeline Activity: <span className="text-cyan-500">{filteredOrders.length}</span> entries found
//           </p>
//           <div className="flex gap-3">
//             <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 hover:text-white transition-all active:scale-95">Previous</button>
//             <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black text-slate-500 hover:text-white transition-all active:scale-95">Next</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }                                                                       







import React, { useState, useMemo, useCallback } from "react";
import { 
  ShoppingBag, FileText, UserPlus, CheckCircle2, 
  XCircle, Clock, Search, Filter, Download, 
  ExternalLink, X, Loader2
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
type OrderStatus = "Pending" | "Accepted" | "Assigned" | "Rejected";

interface Order {
  id: string;
  customer: string;
  items: number;
  amount: string;
  status: OrderStatus;
  date: string;
  assignedTo?: string;
  type: string;
}

// --- Mock Data ---
const INITIAL_ORDERS: Order[] = [
  { id: "ORD-9921", customer: "Rahul Sharma", items: 3, amount: "₹42,500", status: "Pending", date: "23 Mar 2026", type: "Diesel Engine" },
  { id: "ORD-9922", customer: "Apex Motors", items: 12, amount: "₹2,15,000", status: "Accepted", date: "22 Mar 2026", assignedTo: "North Dealer A", type: "Transmission Kit" },
  { id: "ORD-9923", customer: "Suresh Gupta", items: 1, amount: "₹8,400", status: "Assigned", date: "22 Mar 2026", assignedTo: "Z-Tech Parts", type: "Brake Pads" },
];

export default function OrderPipeline() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // Track which order is being updated
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // --- Logic: Filter & Search ---
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, orders]);

  // --- Logic: Actions ---
  const handleUpdateStatus = useCallback(async (id: string, newStatus: OrderStatus, dealer?: string) => {
    setIsUpdating(id);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setOrders(prev => prev.map(order => 
      order.id === id ? { 
        ...order, 
        status: newStatus, 
        assignedTo: dealer || (newStatus === "Rejected" ? undefined : order.assignedTo) 
      } : order
    ));
    
    setIsUpdating(null);
    setSelectedOrderId(null);
  }, []);

  const handleDownloadInvoice = (order: Order) => {
    console.log(`Downloading invoice for ${order.id}`);
    // Trigger PDF Generation Logic here
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 space-y-10 text-slate-200">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Order Pipeline</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
            <span className="w-6 h-[1px] bg-cyan-500"></span> Accept & Assign Distribution
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="SEARCH ORDERS..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-6 text-xs font-bold focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-80"
            />
          </div>
          <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:text-cyan-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="New Requests" value={orders.filter(o => o.status === "Pending").length} icon={Clock} color="amber" />
        <StatCard label="To Be Assigned" value={orders.filter(o => o.status === "Accepted").length} icon={UserPlus} color="cyan" />
        <StatCard label="Invoices Pending" value={orders.filter(o => o.status === "Assigned").length} icon={FileText} color="purple" />
        <StatCard label="Completed" value={142} icon={CheckCircle2} color="emerald" />
      </div>

      {/* 3. Main Table Container */}
      <div className="bg-slate-900/30 border border-slate-800/50 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="p-6 border-b border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><ShoppingBag size={20}/></div>
            <h3 className="font-black uppercase tracking-tight">Live Orders</h3>
          </div>
          
          <div className="flex bg-black/40 p-1 rounded-xl border border-slate-800">
            {["all", "pending", "assigned"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/50">
                <th className="px-8 py-5">Order Detail</th>
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5 text-center">Amount</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5">Assigned Agent</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-black text-white cursor-pointer hover:text-cyan-400 transition-colors">
                        {order.id} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">{order.date}</div>
                    </td>
                    <td className="px-6 py-6 font-bold text-slate-300 uppercase text-xs">
                      {order.customer}
                      <div className="text-[9px] text-cyan-500/60 mt-0.5 tracking-widest uppercase">{order.items} Units</div>
                    </td>
                    <td className="px-6 py-6 text-center text-emerald-400 font-black text-sm">{order.amount}</td>
                    <td className="px-6 py-6 text-center">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-6">
                      {order.assignedTo ? (
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {order.assignedTo}
                        </div>
                      ) : (
                        <span className="text-[10px] italic text-slate-600 uppercase font-black tracking-widest">Unassigned</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {isUpdating === order.id ? (
                          <Loader2 size={20} className="animate-spin text-cyan-500 mr-4" />
                        ) : (
                          <ActionButtons 
                            order={order} 
                            onUpdate={handleUpdateStatus} 
                            onAssign={() => setSelectedOrderId(order.id)}
                            onInvoice={handleDownloadInvoice}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-slate-600 uppercase font-black tracking-[0.3em] text-sm">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Assign Dealer Modal */}
      {selectedOrderId && (
        <AssignModal 
          onClose={() => setSelectedOrderId(null)} 
          onSelect={(dealer) => handleUpdateStatus(selectedOrderId, "Assigned", dealer)} 
        />
      )}
    </div>
  );
}

// --- Sub-Components (For Cleanliness) ---

function StatCard({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    amber: "text-amber-400 bg-amber-400/10",
    cyan: "text-cyan-400 bg-cyan-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    emerald: "text-emerald-400 bg-emerald-400/10",
  };
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
      <div className={cn("w-10 h-10 flex items-center justify-center rounded-xl mb-4", colors[color])}>
        <Icon size={20} />
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black mt-1 text-white tabular-nums">{value}</h4>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: any = {
    Pending: "text-amber-400 bg-amber-400/5 border-amber-400/20",
    Accepted: "text-emerald-400 bg-emerald-400/5 border-emerald-400/20",
    Assigned: "text-cyan-400 bg-cyan-400/5 border-cyan-400/20",
    Rejected: "text-red-400 bg-red-400/5 border-red-400/20",
  };
  return (
    <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border", styles[status])}>
      {status}
    </span>
  );
}

function ActionButtons({ order, onUpdate, onAssign, onInvoice }: any) {
  return (
    <div className="flex gap-2">
      {order.status === "Pending" && (
        <>
          <button onClick={() => onUpdate(order.id, "Accepted")} className="p-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle2 size={16}/></button>
          <button onClick={() => onUpdate(order.id, "Rejected")} className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"><XCircle size={16}/></button>
        </>
      )}
      {order.status === "Accepted" && (
        <button onClick={onAssign} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-cyan-500 transition-all"><UserPlus size={14}/> Assign Dealer</button>
      )}
      {(order.status === "Assigned" || order.status === "Accepted") && (
        <button onClick={() => onInvoice(order)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-purple-600 hover:text-white transition-all"><Download size={16}/></button>
      )}
    </div>
  );
}

function AssignModal({ onClose, onSelect }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-black uppercase tracking-widest text-cyan-400 text-xs">Assign Distribution Dealer</h3>
          <button onClick={onClose}><X size={18}/></button>
        </div>
        <div className="p-6 space-y-3">
          {["North Dealer A", "Z-Tech Parts", "Apex Regional"].map((dealer) => (
            <button 
              key={dealer} 
              onClick={() => onSelect(dealer)}
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-left text-xs font-bold hover:border-cyan-500 hover:bg-cyan-500/5 transition-all flex justify-between items-center"
            >
              {dealer} <UserPlus size={14} className="text-slate-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}