// import React, { useState } from "react";
// import { ChevronRight, Loader2, X } from "lucide-react";
// import { cn } from "@/src/lib/utils";

// type RefundType = {
//   id: string;
//   customer: string;
//   product: string;
//   date: string;
//   status: string;
//   amount: string;
//   reason: string;
//   images: string[];
//   invoice: string;
// };

// const initialRefunds: RefundType[] = [
//   {
//     id: "TC-WR-2026-000245",
//     customer: "Alex Rivera",
//     product: "CyberCore X1",
//     date: "2025-03-15",
//     status: "DEALER_PENDING",
//     amount: "$1,200",
//     reason: "Defective Unit",
//     images: ["https://via.placeholder.com/100"],
//     invoice: "https://via.placeholder.com/150",
//   },
//   {
//     id: "TC-WR-2026-000246",
//     customer: "Sarah Jenkins",
//     product: "NeoLink v4",
//     date: "2025-03-16",
//     status: "DEALER_PENDING",
//     amount: "$750",
//     reason: "Wrong Product Delivered",
//     images: ["https://via.placeholder.com/100"],
//     invoice: "https://via.placeholder.com/150",
//   },
//   {
//     id: "TC-WR-2026-000247",
//     customer: "Michael Chen",
//     product: "FutureVision",
//     date: "2025-03-17",
//     status: "DISTRIBUTOR_PENDING",
//     amount: "$1,500",
//     reason: "Damaged During Shipping",
//     images: ["https://via.placeholder.com/100"],
//     invoice: "https://via.placeholder.com/150",
//   },
// ];

// export default function Refunds() {
//   const [refunds, setRefunds] = useState<RefundType[]>(initialRefunds);
//   const [selectedCase, setSelectedCase] = useState<RefundType | null>(null);
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   const [rejectModal, setRejectModal] = useState<string | null>(null);
//   const [rejectReason, setRejectReason] = useState("");

//   // ✅ Approve
//   const handleApprove = (id: string) => {
//     setLoadingId(id);

//     setTimeout(() => {
//       setRefunds((prev) =>
//         prev.map((r) =>
//           r.id === id ? { ...r, status: "DISTRIBUTOR_PENDING" } : r
//         )
//       );
//       setLoadingId(null);
//     }, 1200);
//   };

//   // ✅ Reject
//   const handleReject = () => {
//     setRefunds((prev) =>
//       prev.map((r) =>
//         r.id === rejectModal
//           ? { ...r, status: "DEALER_REJECTED", reason: rejectReason }
//           : r
//       )
//     );
//     setRejectModal(null);
//     setRejectReason("");
//   };

//   // ✅ Status Badge
//   const getStatusBadge = (status: string) => {
//     const base = "px-3 py-1 text-xs rounded-full font-semibold";

//     if (status.includes("APPROVED"))
//       return cn(base, "bg-emerald-500/10 text-emerald-400");
//     if (status.includes("PENDING"))
//       return cn(base, "bg-amber-500/10 text-amber-400");
//     if (status.includes("REJECTED"))
//       return cn(base, "bg-rose-500/10 text-rose-400");

//     return cn(base, "bg-blue-500/10 text-blue-400");
//   };

//   // ✅ Timeline
//   const Timeline = ({ status }: { status: string }) => {
//     const steps = [
//       "Customer Request",
//       "Dealer Review",
//       "Distributor Verification",
//       "Technical Validation",
//       "Final Decision",
//     ];

//     let activeIndex = 1;
//     if (status.includes("DISTRIBUTOR")) activeIndex = 2;
//     if (status.includes("REJECTED")) activeIndex = 1;

//     return (
//       <div className="mt-4 space-y-3">
//         {steps.map((step, i) => (
//           <div key={i} className="flex items-center gap-3">
//             <div
//               className={cn(
//                 "w-3 h-3 rounded-full",
//                 i <= activeIndex ? "bg-green-500" : "bg-gray-600"
//               )}
//             />
//             <p className="text-sm text-slate-300">{step}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="text-white space-y-6">

//       <h2 className="text-2xl font-bold">Dealer Refund Management</h2>

//       {/* LIST */}
//       <div className="space-y-4">
//         {refunds.map((refund) => (
//           <div
//             key={refund.id}
//             onClick={() => setSelectedCase(refund)}
//             className="p-5 bg-[#0f172a] border border-slate-800 rounded-xl cursor-pointer hover:border-cyan-500 transition"
//           >
//             <div className="flex justify-between">
//               <div>
//                 <p className="text-xs text-cyan-400 font-semibold">{refund.id}</p>
//                 <h4>{refund.customer}</h4>
//                 <p className="text-sm text-slate-400">{refund.product}</p>
//               </div>

//               <div className="text-right">
//                 <p className="text-emerald-400">{refund.amount}</p>
//                 <p className="text-xs text-slate-400">{refund.date}</p>
//               </div>
//             </div>

//             <div className="flex justify-between mt-4 items-center">
//               <span className={getStatusBadge(refund.status)}>
//                 {refund.status.replaceAll("_", " ")}
//               </span>

//               <div className="flex gap-2">

//                 {/* APPROVE + REJECT */}
//                 {refund.status === "DEALER_PENDING" && (
//                   <>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleApprove(refund.id);
//                       }}
//                       disabled={loadingId === refund.id}
//                       className="bg-emerald-500 px-3 py-1 text-xs rounded flex items-center gap-1"
//                     >
//                       {loadingId === refund.id ? (
//                         <Loader2 className="w-3 h-3 animate-spin" />
//                       ) : (
//                         "Approve"
//                       )}
//                     </button>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setRejectModal(refund.id);
//                       }}
//                       className="bg-rose-500 px-3 py-1 text-xs rounded"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {/* VIEW */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedCase(refund);
//                   }}
//                   className="text-cyan-400 text-xs flex items-center gap-1"
//                 >
//                   View <ChevronRight size={14} />
//                 </button>

//               </div>
//             </div>

//             <p className="text-xs text-slate-400 mt-2">{refund.reason}</p>
//           </div>
//         ))}
//       </div>

//       {/* CASE MODAL */}
//       {selectedCase && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//           <div className="bg-[#0f172a] p-6 rounded-xl w-[550px] relative">

//             <button
//               onClick={() => setSelectedCase(null)}
//               className="absolute top-4 right-4 text-slate-400"
//             >
//               <X />
//             </button>

//             <h3 className="text-lg font-bold mb-4">Case Details</h3>

//             <p><b>ID:</b> {selectedCase.id}</p>
//             <p><b>Customer:</b> {selectedCase.customer}</p>
//             <p><b>Product:</b> {selectedCase.product}</p>
//             <p><b>Status:</b> {selectedCase.status}</p>

//             <Timeline status={selectedCase.status} />

//             {/* Images */}
//             <div className="mt-4">
//               <p className="text-sm font-semibold mb-2">Damage Images</p>
//               <div className="flex gap-2">
//                 {selectedCase.images.map((img, i) => (
//                   <img key={i} src={img} className="w-20 h-20 rounded border" />
//                 ))}
//               </div>
//             </div>

//             {/* Invoice */}
//             <div className="mt-4">
//               <a href={selectedCase.invoice} target="_blank" className="text-cyan-400 underline">
//                 View Invoice
//               </a>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* REJECT MODAL */}
//       {rejectModal && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//           <div className="bg-[#0f172a] p-6 rounded-xl w-[400px]">

//             <h3 className="font-bold mb-3">Reject Reason</h3>

//             <textarea
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="w-full p-2 bg-slate-800 rounded mb-4"
//               placeholder="Enter reason..."
//             />

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setRejectModal(null)}>Cancel</button>
//               <button onClick={handleReject} className="bg-rose-500 px-4 py-1 rounded">
//                 Submit
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }







import React, { useState } from "react";
import { 
  ChevronRight, 
  Loader2, 
  X, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Truck, 
  RefreshCcw, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type RefundType = {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: 'DEALER_PENDING' | 'DISTRIBUTOR_PENDING' | 'DEALER_REJECTED' | 'REPLACEMENT_INITIATED' | 'REFUND_COMPLETED';
  amount: string;
  reason: string;
  images: string[];
  invoice: string;
  type: 'REFUND' | 'REPLACEMENT';
};

const initialRefunds: RefundType[] = [
  {
    id: "TC-WR-2026-000245",
    customer: "Alex Rivera",
    product: "Pro-Series Head Stud Kit",
    date: "2025-03-15",
    status: "DEALER_PENDING",
    amount: "₹18,500",
    reason: "Thread deformation noticed during installation",
    images: ["https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=100"],
    invoice: "#INV-9921",
    type: 'REPLACEMENT'
  },
  {
    id: "TC-WR-2026-000246",
    customer: "Sarah Jenkins",
    product: "Main Stud Kit Elite",
    date: "2025-03-16",
    status: "REPLACEMENT_INITIATED",
    amount: "₹12,400",
    reason: "Wrong SKU delivered",
    images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100"],
    invoice: "#INV-8842",
    type: 'REPLACEMENT'
  }
];

export default function RefundsWarranty() {
  const [refunds, setRefunds] = useState<RefundType[]>(initialRefunds);
  const [selectedCase, setSelectedCase] = useState<RefundType | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // ✅ Status Badge Logic
  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border";
    switch (status) {
      case 'REFUND_COMPLETED':
      case 'REPLACEMENT_INITIATED':
        return cn(base, "bg-emerald-500/10 text-emerald-400 border-emerald-500/20");
      case 'DEALER_PENDING':
      case 'DISTRIBUTOR_PENDING':
        return cn(base, "bg-amber-500/10 text-amber-400 border-amber-500/20");
      case 'DEALER_REJECTED':
        return cn(base, "bg-rose-500/10 text-rose-400 border-rose-500/20");
      default:
        return cn(base, "bg-slate-800 text-slate-400 border-slate-700");
    }
  };

  const handleApprove = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setRefunds((prev) => prev.map((r) => r.id === id ? { ...r, status: "DISTRIBUTOR_PENDING" } : r));
      setLoadingId(null);
    }, 1200);
  };

  return (
    <div className="text-white space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">Returns & Warranty</h2>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Manage replacement requests and evidence</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-[10px] font-black transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus size={16} /> CREATE RETURN REQUEST
        </button>
      </div>

      {/* STATS QUICK VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Cases</p>
                <h3 className="text-2xl font-black">12</h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-2xl"><Loader2 className="text-amber-400" size={20}/></div>
        </div>
        <div className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Replacements</p>
                <h3 className="text-2xl font-black text-emerald-400">08</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl"><RefreshCcw className="text-emerald-400" size={20}/></div>
        </div>
        <div className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Refunds</p>
                <h3 className="text-2xl font-black text-blue-400">04</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-2xl"><Truck className="text-blue-400" size={20}/></div>
        </div>
      </div>

      {/* LIST OF REQUESTS */}
      <div className="space-y-4">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            onClick={() => setSelectedCase(refund)}
            className="group p-6 bg-[#0f172a] border border-slate-800 rounded-[32px] cursor-pointer hover:border-cyan-500/50 transition-all relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                   {refund.type === 'REPLACEMENT' ? <RefreshCcw className="text-cyan-400" /> : <Truck className="text-blue-400" />}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-cyan-500 font-bold">{refund.id}</p>
                  <h4 className="font-black text-lg text-white group-hover:text-cyan-400 transition">{refund.customer}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{refund.product}</p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between md:text-right">
                <p className="text-xl font-black text-white">{refund.amount}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{refund.date}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6 items-center pt-4 border-t border-slate-800/50">
              <span className={getStatusBadge(refund.status)}>
                {refund.status.replaceAll("_", " ")}
              </span>

              <div className="flex gap-3">
                {refund.status === "DEALER_PENDING" && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApprove(refund.id); }}
                      disabled={loadingId === refund.id}
                      className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white px-4 py-1.5 text-[10px] font-black uppercase rounded-lg border border-emerald-500/20 transition-all"
                    >
                      {loadingId === refund.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify & Forward"}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setRejectModal(refund.id); }}
                      className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-4 py-1.5 text-[10px] font-black uppercase rounded-lg border border-rose-500/20 transition-all"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="text-slate-500 group-hover:text-white flex items-center gap-1 text-[10px] font-black uppercase">
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE REQUEST MODAL (Skeleton) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <div className="bg-[#0f172a] w-full max-w-2xl rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
               <h3 className="text-xl font-black uppercase tracking-tighter">New Return Request</h3>
               <button onClick={() => setIsCreateModalOpen(false)}><X className="text-slate-500 hover:text-white" /></button>
            </div>
            <div className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Product SKU</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-cyan-500" placeholder="e.g. TC-HSK-2000" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Invoice Number</label>
                        <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-cyan-500" placeholder="#INV-000" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Reason for Return</label>
                    <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm h-24 outline-none focus:border-cyan-500" placeholder="Describe the issue in detail..." />
                </div>

                {/* Evidence Upload Section */}
                <div className="border-2 border-dashed border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center group hover:border-cyan-500/50 transition-all cursor-pointer">
                    <Upload className="text-slate-600 group-hover:text-cyan-400 mb-2" size={32} />
                    <p className="text-xs font-bold text-slate-400">Upload Evidence (Photo/Video)</p>
                    <p className="text-[9px] text-slate-600 uppercase mt-1">Max size 10MB per file</p>
                </div>

                <button className="w-full bg-cyan-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all">
                    Submit Return Request
                </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW CASE MODAL (Track Status) */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <div className="bg-[#0f172a] w-full max-w-4xl rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95">
             <div className="w-full md:w-1/3 bg-slate-900/50 p-10 border-r border-slate-800">
                <div className="p-4 bg-cyan-500/10 rounded-3xl w-fit mb-6"><ImageIcon className="text-cyan-400" size={32} /></div>
                <h3 className="text-2xl font-black uppercase leading-tight">{selectedCase.customer}</h3>
                <p className="text-cyan-500 font-mono text-xs mt-1">{selectedCase.id}</p>
                
                <div className="mt-10 space-y-6">
                    <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Evidence Provided</p>
                        <div className="flex gap-2">
                            {selectedCase.images.map((img, i) => (
                                <img key={i} src={img} className="w-20 h-20 rounded-2xl border border-slate-800 object-cover" alt="evidence" />
                            ))}
                        </div>
                    </div>
                </div>
             </div>

             <div className="flex-1 p-10 relative">
                <button onClick={() => setSelectedCase(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X /></button>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                    <Truck size={14} /> Tracking Case Status
                </h4>

                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                    {[
                        { step: "Request Initiated", desc: "Customer raised return for " + selectedCase.product, done: true },
                        { step: "Dealer Verification", desc: "Pending review by your team", done: selectedCase.status !== 'DEALER_PENDING' },
                        { step: "Distributor Check", desc: "Final quality check by warehouse", done: selectedCase.status.includes('REPLACEMENT') || selectedCase.status.includes('REFUND') },
                        { step: "Resolution", desc: "Replacement sent or Refund issued", done: selectedCase.status.includes('COMPLETED') || selectedCase.status.includes('INITIATED') }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 relative">
                            <div className={cn(
                                "w-6 h-6 rounded-full border-4 border-[#0f172a] z-10",
                                item.done ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-slate-800"
                            )} />
                            <div>
                                <h5 className={cn("text-sm font-black uppercase tracking-tight", item.done ? "text-white" : "text-slate-600")}>{item.step}</h5>
                                <p className="text-xs text-slate-500 font-bold">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                   <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black text-slate-500 uppercase">Update Resolution</p>
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic">{selectedCase.type}</span>
                   </div>
                   <p className="text-sm font-bold text-slate-300 italic">"Final testing in progress for the reported SKU defect."</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[110] p-4">
          <div className="bg-[#0f172a] p-8 rounded-[32px] w-full max-w-md border border-slate-800 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-rose-500 flex items-center gap-2">
                <AlertCircle /> Reject Case
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-bold uppercase tracking-widest">State the reason for rejecting this claim</p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl mb-6 text-sm outline-none focus:border-rose-500 h-32"
              placeholder="e.g. Damage not covered under warranty policy..."
            />

            <div className="flex justify-end gap-3">
              <button className="px-6 py-2 text-xs font-black uppercase text-slate-500" onClick={() => setRejectModal(null)}>Cancel</button>
              <button className="bg-rose-500 px-8 py-3 rounded-xl text-xs font-black uppercase shadow-lg shadow-rose-500/20" onClick={() => {
                   setRefunds(prev => prev.map(r => r.id === rejectModal ? {...r, status: 'DEALER_REJECTED'} : r));
                   setRejectModal(null);
              }}>
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}