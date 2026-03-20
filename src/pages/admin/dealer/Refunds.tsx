// // import React from 'react';
// // import { 
// //   RotateCcw, 
// //   Search, 
// //   Filter, 
// //   ChevronRight, 
// //   Calendar,
// //   User,
// //   Package,
// //   CheckCircle2,
// //   Clock,
// //   AlertCircle,
// //   MoreVertical,
// //   DollarSign
// // } from 'lucide-react';
// // import { cn } from '@/src/lib/utils';

// // const refundRequests = [
// //   { id: 'RF-5021', customer: 'Alex Rivera', product: 'CyberCore X1', date: '2025-03-15', status: 'APPROVED', amount: '$1,200', reason: 'Defective Unit' },
// //   { id: 'RF-5022', customer: 'Sarah Jenkins', product: 'NeoLink v4', date: '2025-03-16', status: 'PENDING', amount: '$750', reason: 'Changed Mind' },
// //   { id: 'RF-5023', customer: 'Michael Chen', product: 'FutureVision', date: '2025-03-17', status: 'REJECTED', amount: '$1,500', reason: 'Out of Warranty' },
// //   { id: 'RF-5024', customer: 'Elena Rodriguez', product: 'TurboBoost Pro', date: '2025-03-18', status: 'IN_PROGRESS', amount: '$950', reason: 'Shipping Damage' },
// //   { id: 'RF-5025', customer: 'David Kim', product: 'MegaDrive Kit', date: '2025-03-18', status: 'PENDING', amount: '$600', reason: 'Defective Unit' },
// // ];

// // export default function Refunds() {
// //   return (
// //     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-white tracking-tight uppercase">REFUND MANAGEMENT</h2>
// //         <div className="flex items-center gap-3">
// //           <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-xs font-black text-white transition-all">
// //             <Filter className="w-4 h-4" />
// //             FILTER REFUNDS
// //           </button>
// //           <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all">
// //             NEW REFUND
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         {[
// //           { label: 'Total Refunds', value: '1,284', icon: RotateCcw, color: 'text-blue-400', bg: 'bg-blue-500/10' },
// //           { label: 'Pending Review', value: '42', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
// //           { label: 'Approved', value: '1,156', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
// //           { label: 'Rejected', value: '86', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
// //         ].map((stat, i) => (
// //           <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
// //             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
// //               <stat.icon className={cn("w-6 h-6", stat.color)} />
// //             </div>
// //             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
// //             <h4 className="text-2xl font-black text-white">{stat.value}</h4>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50">
// //         <div className="flex items-center justify-between mb-8">
// //           <h3 className="text-xl font-bold text-white">Active Refund Requests</h3>
// //           <div className="relative group">
// //             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
// //             <input 
// //               type="text" 
// //               placeholder="Search refunds..." 
// //               className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-64"
// //             />
// //           </div>
// //         </div>

// //         <div className="space-y-4">
// //           {refundRequests.map((refund, i) => (
// //             <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
// //               <div className="absolute top-0 right-0 p-4">
// //                 <button className="text-slate-500 hover:text-white transition-colors">
// //                   <MoreVertical className="w-5 h-5" />
// //                 </button>
// //               </div>
              
// //               <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-black text-xs">
// //                     {refund.id}
// //                   </div>
// //                   <div>
// //                     <h5 className="text-sm font-black text-white tracking-tight">{refund.customer}</h5>
// //                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <Package className="w-4 h-4 text-slate-500" />
// //                   <div>
// //                     <p className="text-sm font-bold text-slate-300">{refund.product}</p>
// //                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <DollarSign className="w-4 h-4 text-emerald-400" />
// //                   <div>
// //                     <p className="text-sm font-black text-emerald-400">{refund.amount}</p>
// //                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Refund Amount</p>
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <div className={cn(
// //                     "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
// //                     refund.status === 'APPROVED' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
// //                     refund.status === 'PENDING' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
// //                     refund.status === 'IN_PROGRESS' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
// //                     "bg-rose-500/10 text-rose-400 border border-rose-500/20"
// //                   )}>
// //                     {refund.status.replace('_', ' ')}
// //                   </div>
// //                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 ml-1">{refund.reason}</p>
// //                 </div>

// //                 <div className="text-right">
// //                   <button className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 ml-auto group/btn">
// //                     View Case
// //                     <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
// //                   </button>
// //                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Date: {refund.date}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState } from 'react';
// import { 
//   ChevronRight
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const initialRefunds = [
//   { 
//     id: 'TC-WR-2026-000245', 
//     customer: 'Alex Rivera', 
//     product: 'CyberCore X1', 
//     date: '2025-03-15', 
//     status: 'DEALER_PENDING', 
//     amount: '$1,200', 
//     reason: 'Defective Unit',
//     images: ["https://via.placeholder.com/100"],
//     invoice: "https://via.placeholder.com/150"
//   },
// ];

// export default function Refunds() {
//   const [refunds, setRefunds] = useState(initialRefunds);
//   const [selectedCase, setSelectedCase] = useState<any>(null);
//   const [animating, setAnimating] = useState(false);

//   const handleApprove = (id: string) => {
//     setAnimating(true);

//     setTimeout(() => {
//       setRefunds(prev =>
//         prev.map(r =>
//           r.id === id ? { ...r, status: 'DISTRIBUTOR_PENDING' } : r
//         )
//       );
//       setAnimating(false);
//     }, 1000);
//   };

//   const getStatusStyle = (status: string) => {
//     if (status.includes("APPROVED")) return "text-emerald-400";
//     if (status.includes("PENDING")) return "text-amber-400";
//     if (status.includes("REJECTED")) return "text-rose-400";
//     return "text-blue-400";
//   };

//   const Timeline = ({ status }: any) => {
//     const steps = [
//       "Customer Request",
//       "Dealer Review",
//       "Distributor Verification",
//       "Technical Validation",
//       "Final Decision"
//     ];

//     let activeIndex = 1;
//     if (status.includes("DISTRIBUTOR")) activeIndex = 2;

//     return (
//       <div className="mt-4">
//         {steps.map((step, i) => (
//           <div key={i} className="flex items-center gap-3 mb-2">
//             <div className={cn(
//               "w-3 h-3 rounded-full",
//               i <= activeIndex ? "bg-green-500" : "bg-gray-600"
//             )}></div>
//             <p className="text-sm">{step}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="text-white space-y-6">

//       <h2 className="text-2xl font-bold">Dealer Refund Management</h2>

//       {refunds.map((refund) => (
//         <div 
//           key={refund.id}
//           onClick={() => setSelectedCase(refund)}
//           className="p-5 border border-slate-700 rounded-xl cursor-pointer hover:border-cyan-500"
//         >
//           <p className="text-cyan-400 text-xs">{refund.id}</p>
//           <h4>{refund.customer}</h4>
//           <p className="text-sm">{refund.product}</p>

//           <div className="flex justify-between mt-3">
//             <span className={getStatusStyle(refund.status)}>
//               {refund.status}
//             </span>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleApprove(refund.id);
//               }}
//               className="bg-emerald-500 px-3 py-1 text-xs rounded"
//             >
//               Approve
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* MODAL */}
//       {selectedCase && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
//           <div className="bg-[#0f172a] p-6 rounded-xl w-[500px]">

//             <h3 className="text-lg font-bold mb-3">Case Details</h3>

//             <p><b>ID:</b> {selectedCase.id}</p>
//             <p><b>Customer:</b> {selectedCase.customer}</p>
//             <p><b>Product:</b> {selectedCase.product}</p>

//             {/* 🧭 Timeline */}
//             <Timeline status={selectedCase.status} />

//             {/* 🖼️ Images */}
//             <div className="mt-4">
//               <p className="text-sm font-bold mb-2">Damage Images</p>
//               <div className="flex gap-2">
//                 {selectedCase.images.map((img: string, i: number) => (
//                   <img key={i} src={img} className="w-20 h-20 rounded border" />
//                 ))}
//               </div>
//             </div>

//             {/* 📄 Invoice */}
//             <div className="mt-4">
//               <p className="text-sm font-bold mb-2">Invoice</p>
//               <a href={selectedCase.invoice} target="_blank" className="text-cyan-400 underline">
//                 View Invoice
//               </a>
//             </div>

//             {/* 🚀 Animation */}
//             {animating && (
//               <p className="mt-4 text-amber-400 animate-pulse">
//                 Sending to Distributor...
//               </p>
//             )}

//             <div className="flex justify-end mt-4">
//               <button 
//                 onClick={() => setSelectedCase(null)}
//                 className="bg-cyan-500 px-4 py-1 rounded"
//               >
//                 Close
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




import React, { useState } from "react";
import { ChevronRight, Loader2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

type RefundType = {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: string;
  amount: string;
  reason: string;
  images: string[];
  invoice: string;
};

const initialRefunds: RefundType[] = [
  {
    id: "TC-WR-2026-000245",
    customer: "Alex Rivera",
    product: "CyberCore X1",
    date: "2025-03-15",
    status: "DEALER_PENDING",
    amount: "$1,200",
    reason: "Defective Unit",
    images: ["https://via.placeholder.com/100"],
    invoice: "https://via.placeholder.com/150",
  },
  {
    id: "TC-WR-2026-000246",
    customer: "Sarah Jenkins",
    product: "NeoLink v4",
    date: "2025-03-16",
    status: "DEALER_PENDING",
    amount: "$750",
    reason: "Wrong Product Delivered",
    images: ["https://via.placeholder.com/100"],
    invoice: "https://via.placeholder.com/150",
  },
  {
    id: "TC-WR-2026-000247",
    customer: "Michael Chen",
    product: "FutureVision",
    date: "2025-03-17",
    status: "DISTRIBUTOR_PENDING",
    amount: "$1,500",
    reason: "Damaged During Shipping",
    images: ["https://via.placeholder.com/100"],
    invoice: "https://via.placeholder.com/150",
  },
];

export default function Refunds() {
  const [refunds, setRefunds] = useState<RefundType[]>(initialRefunds);
  const [selectedCase, setSelectedCase] = useState<RefundType | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // ✅ Approve
  const handleApprove = (id: string) => {
    setLoadingId(id);

    setTimeout(() => {
      setRefunds((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "DISTRIBUTOR_PENDING" } : r
        )
      );
      setLoadingId(null);
    }, 1200);
  };

  // ✅ Reject
  const handleReject = () => {
    setRefunds((prev) =>
      prev.map((r) =>
        r.id === rejectModal
          ? { ...r, status: "DEALER_REJECTED", reason: rejectReason }
          : r
      )
    );
    setRejectModal(null);
    setRejectReason("");
  };

  // ✅ Status Badge
  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-xs rounded-full font-semibold";

    if (status.includes("APPROVED"))
      return cn(base, "bg-emerald-500/10 text-emerald-400");
    if (status.includes("PENDING"))
      return cn(base, "bg-amber-500/10 text-amber-400");
    if (status.includes("REJECTED"))
      return cn(base, "bg-rose-500/10 text-rose-400");

    return cn(base, "bg-blue-500/10 text-blue-400");
  };

  // ✅ Timeline
  const Timeline = ({ status }: { status: string }) => {
    const steps = [
      "Customer Request",
      "Dealer Review",
      "Distributor Verification",
      "Technical Validation",
      "Final Decision",
    ];

    let activeIndex = 1;
    if (status.includes("DISTRIBUTOR")) activeIndex = 2;
    if (status.includes("REJECTED")) activeIndex = 1;

    return (
      <div className="mt-4 space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                i <= activeIndex ? "bg-green-500" : "bg-gray-600"
              )}
            />
            <p className="text-sm text-slate-300">{step}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="text-white space-y-6">

      <h2 className="text-2xl font-bold">Dealer Refund Management</h2>

      {/* LIST */}
      <div className="space-y-4">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            onClick={() => setSelectedCase(refund)}
            className="p-5 bg-[#0f172a] border border-slate-800 rounded-xl cursor-pointer hover:border-cyan-500 transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-cyan-400 font-semibold">{refund.id}</p>
                <h4>{refund.customer}</h4>
                <p className="text-sm text-slate-400">{refund.product}</p>
              </div>

              <div className="text-right">
                <p className="text-emerald-400">{refund.amount}</p>
                <p className="text-xs text-slate-400">{refund.date}</p>
              </div>
            </div>

            <div className="flex justify-between mt-4 items-center">
              <span className={getStatusBadge(refund.status)}>
                {refund.status.replaceAll("_", " ")}
              </span>

              <div className="flex gap-2">

                {/* APPROVE + REJECT */}
                {refund.status === "DEALER_PENDING" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(refund.id);
                      }}
                      disabled={loadingId === refund.id}
                      className="bg-emerald-500 px-3 py-1 text-xs rounded flex items-center gap-1"
                    >
                      {loadingId === refund.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "Approve"
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRejectModal(refund.id);
                      }}
                      className="bg-rose-500 px-3 py-1 text-xs rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* VIEW */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCase(refund);
                  }}
                  className="text-cyan-400 text-xs flex items-center gap-1"
                >
                  View <ChevronRight size={14} />
                </button>

              </div>
            </div>

            <p className="text-xs text-slate-400 mt-2">{refund.reason}</p>
          </div>
        ))}
      </div>

      {/* CASE MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-xl w-[550px] relative">

            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 text-slate-400"
            >
              <X />
            </button>

            <h3 className="text-lg font-bold mb-4">Case Details</h3>

            <p><b>ID:</b> {selectedCase.id}</p>
            <p><b>Customer:</b> {selectedCase.customer}</p>
            <p><b>Product:</b> {selectedCase.product}</p>
            <p><b>Status:</b> {selectedCase.status}</p>

            <Timeline status={selectedCase.status} />

            {/* Images */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Damage Images</p>
              <div className="flex gap-2">
                {selectedCase.images.map((img, i) => (
                  <img key={i} src={img} className="w-20 h-20 rounded border" />
                ))}
              </div>
            </div>

            {/* Invoice */}
            <div className="mt-4">
              <a href={selectedCase.invoice} target="_blank" className="text-cyan-400 underline">
                View Invoice
              </a>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-xl w-[400px]">

            <h3 className="font-bold mb-3">Reject Reason</h3>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2 bg-slate-800 rounded mb-4"
              placeholder="Enter reason..."
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setRejectModal(null)}>Cancel</button>
              <button onClick={handleReject} className="bg-rose-500 px-4 py-1 rounded">
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}