// import React, { useState } from 'react';
// import { 
//   CreditCard, Search,
//   MoreVertical, DollarSign, Download, AlertTriangle, X
// } from 'lucide-react';

// const DealerPayment = () => {

//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [dateFilter, setDateFilter] = useState("");
//   const [search, setSearch] = useState("");

//   // 🔥 NEW STATE (DETAIL MODAL)
//   const [selectedTxn, setSelectedTxn] = useState(null);

//   const bankLinked = true;

//   const stats = [
//     { title: "TOTAL PAYMENTS", value: "₹4,25,000", icon: <CreditCard className="text-cyan-400" /> },
//     { title: "PENDING SETTLEMENTS", value: "₹35,000", icon: <DollarSign className="text-amber-400" /> },
//     { title: "COMPLETED", value: "₹3,90,000", icon: <CreditCard className="text-emerald-400" /> },
//     { title: "REFUNDS", value: "₹8,500", icon: <CreditCard className="text-rose-400" /> },
//   ];

//   const transactions = [
//     { id: "TXN-9021", customer: "Alex Rivera", product: "CyberCore X1", amount: 1200, status: "COMPLETED", date: "2025-03-15" },
//     { id: "TXN-8842", customer: "Sarah Jenkins", product: "NeoLink v4", amount: 750, status: "PENDING", date: "2025-03-14" },
//     { id: "TXN-7782", customer: "Rahul Sharma", product: "TurboBoost", amount: 1500, status: "PENDING", date: "2025-03-10" },
//   ];

//   const filtered = transactions.filter(t => {
//     const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
//     const matchDate = !dateFilter || t.date === dateFilter;
//     const matchSearch =
//       t.customer.toLowerCase().includes(search.toLowerCase()) ||
//       t.product.toLowerCase().includes(search.toLowerCase()) ||
//       t.id.toLowerCase().includes(search.toLowerCase());

//     return matchStatus && matchDate && matchSearch;
//   });

//   const exportCSV = () => {
//     const header = "ID,Customer,Product,Amount,Status,Date\n";
//     const rows = filtered
//       .map(t => `${t.id},${t.customer},${t.product},${t.amount},${t.status},${t.date}`)
//       .join("\n");

//     const blob = new Blob([header + rows], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "payments.csv";
//     link.click();
//   };

//   const isDelayed = (date) => {
//     const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
//     return diff > 2;
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
//         <h2 className="text-2xl font-bold uppercase">Payment Management</h2>

//         <div className="flex gap-3 flex-wrap">

//           {/* SEARCH */}
//           <div className="relative">
//             <Search size={16} className="absolute left-3 top-2.5 text-slate-500"/>
//             <input 
//               placeholder="Search..."
//               value={search}
//               onChange={(e)=>setSearch(e.target.value)}
//               className="bg-[#1e293b] pl-8 pr-3 py-2 rounded-lg text-sm"
//             />
//           </div>

//           <select 
//             onChange={(e)=>setStatusFilter(e.target.value)}
//             className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
//           >
//             <option value="ALL">All</option>
//             <option value="COMPLETED">Completed</option>
//             <option value="PENDING">Pending</option>
//           </select>

//           {/* <input 
//             type="date"
//             onChange={(e)=>setDateFilter(e.target.value)}
//             className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
//           /> */}

//           <button 
//             onClick={exportCSV}
//             className="flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-lg text-sm hover:bg-cyan-500 transition"
//           >
//             <Download size={16}/> EXPORT
//           </button>

//         </div>
//       </div>


//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800">
//             {stat.icon}
//             <p className="text-xs text-slate-500 mt-2">{stat.title}</p>
//             <h3 className="text-xl font-bold">{stat.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* TRANSACTIONS */}
//       <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden">

//         <div className="p-6 border-b border-slate-800 flex justify-between">
//           <h4 className="font-semibold">Recent Transactions</h4>
//           <span className="text-xs text-slate-500">{filtered.length} Results</span>
//         </div>

//         <div className="divide-y divide-slate-800">
//           {filtered.map((item) => {

//             const tax = (item.amount * 0.18).toFixed(0);
//             const net = item.amount - tax;
//             const delay = item.status === "PENDING" && isDelayed(item.date);

//             return (
//               <div 
//                 key={item.id}
//                 onClick={()=>setSelectedTxn(item)}
//                 className="p-6 flex justify-between items-center hover:bg-[#1e293b]/40 transition cursor-pointer"
//               >

//                 <div>
//                   <p className="font-bold">{item.customer}</p>
//                   <p className="text-xs text-slate-500">{item.product}</p>
//                   <p className="text-[10px] text-slate-600">{item.id}</p>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-emerald-400 font-bold">₹{item.amount}</p>
//                   <p className="text-xs text-slate-500">TAX: ₹{tax}</p>
//                   <p className="text-xs text-slate-400">Net: ₹{net}</p>
//                 </div>

//                 <div>
//                   <span className={`px-3 py-1 text-xs rounded-full font-bold ${
//                     item.status === "COMPLETED"
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-yellow-500/20 text-yellow-400"
//                   }`}>
//                     {item.status}
//                   </span>
//                 </div>

//                 {delay && (
//                   <div className="flex items-center gap-1 text-red-400 text-xs">
//                     <AlertTriangle size={14}/> Delayed
//                   </div>
//                 )}

//                 <MoreVertical size={16}/>
//               </div>
//             );
//           })}
//         </div>

//       </div>

//       {/* 🔥 TRANSACTION DETAIL MODAL */}
//       {selectedTxn && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
//           <div className="bg-[#0f172a] w-[500px] p-6 rounded-2xl border border-slate-700">

//             <div className="flex justify-between mb-4">
//               <h3 className="text-lg font-bold">Transaction Details</h3>
//               <button onClick={()=>setSelectedTxn(null)}><X/></button>
//             </div>

//             <p className="text-sm text-slate-400">ID: {selectedTxn.id}</p>

//             <div className="mt-4 space-y-2">
//               <p><b>Customer:</b> {selectedTxn.customer}</p>
//               <p><b>Product:</b> {selectedTxn.product}</p>
//               <p><b>Date:</b> {selectedTxn.date}</p>
//             </div>

//             {/* BILL */}
//             <div className="mt-6 border-t border-slate-700 pt-4 space-y-2 text-sm">
//               <p>Amount: ₹{selectedTxn.amount}</p>
//               <p>TAX (18%): ₹{(selectedTxn.amount * 0.18).toFixed(0)}</p>
//               <p>Platform Fee: ₹{(selectedTxn.amount * 0.05).toFixed(0)}</p>
//               <p className="font-bold text-emerald-400">
//                 Net Settlement: ₹{(selectedTxn.amount * 0.77).toFixed(0)}
//               </p>
//             </div>

//             {/* STATUS FLOW */}
//             <div className="mt-6">
//               <p className="text-xs text-slate-500 mb-2">Payment Flow</p>
//               <div className="flex justify-between text-xs">
//                 <span>Paid</span>
//                 <span>Processing</span>
//                 <span className="text-emerald-400">Settled</span>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default DealerPayment;




import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Search, MoreVertical, DollarSign, Download, 
  AlertTriangle, X, Upload, FileText, CheckCircle2, Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const DealerPayment = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Local state for transactions to make them interactive
  const [transactions, setTransactions] = useState([
    { id: "INV-2026-9021", customer: "Kumar Auto", product: "Brake Kit Pro", amount: 25000, status: "COMPLETED", date: "2026-03-15", proof: "receipt_01.jpg" },
    { id: "INV-2026-8842", customer: "Sharma Logistics", product: "NeoLink v4", amount: 15750, status: "PENDING", date: "2026-03-20", proof: null },
    { id: "INV-2026-7782", customer: "Alex Rivera", product: "TurboBoost", amount: 45000, status: "PENDING", date: "2026-03-10", proof: null },
  ]);

  // Derived Stats
  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const outstanding = transactions.filter(t => t.status === "PENDING").reduce((acc, curr) => acc + curr.amount, 0);
  const settled = transactions.filter(t => t.status === "COMPLETED").reduce((acc, curr) => acc + curr.amount, 0);
  const pendingProofCount = transactions.filter(t => t.status === "PENDING" && !t.proof).length;

  const stats = [
    { title: "TOTAL REVENUE", value: `₹${totalRevenue.toLocaleString()}`, icon: <CreditCard className="text-cyan-400" />, trend: "+12%" },
    { title: "OUTSTANDING", value: `₹${outstanding.toLocaleString()}`, icon: <AlertTriangle className="text-rose-400" />, trend: "Action Req" },
    { title: "SETTLED", value: `₹${settled.toLocaleString()}`, icon: <CheckCircle2 className="text-emerald-400" />, trend: "90%" },
    { title: "PENDING PROOF", value: `${pendingProofCount} Invoices`, icon: <Clock className="text-amber-400" />, trend: "High Priority" },
  ];

  // Filtering Logic
  const filtered = transactions.filter(t => {
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Action: Upload Proof Simulation
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const updatedTxns = transactions.map(t => 
        t.id === selectedTxn.id ? { ...t, proof: `proof_${t.id}.pdf` } : t
      );
      setTransactions(updatedTxns);
      setSelectedTxn({ ...selectedTxn, proof: `proof_${selectedTxn.id}.pdf` });
      setUploading(false);
    }, 1000);
  };

  // Action: Settle Payment
  const handleSettle = () => {
    const updatedTxns = transactions.map(t => 
      t.id === selectedTxn.id ? { ...t, status: "COMPLETED" } : t
    );
    setTransactions(updatedTxns);
    setSelectedTxn(null);
    alert("Payment Marked as Settled!");
  };

  // Action: Export CSV
  const exportCSV = () => {
    const headers = "Invoice ID,Customer,Amount,Status,Date\n";
    const data = filtered.map(t => `${t.id},${t.customer},${t.amount},${t.status},${t.date}`).join("\n");
    const blob = new Blob([headers + data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payments_Report_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8 text-slate-200 p-4 md:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Payment Management</h2>
          <p className="text-slate-500 text-sm">Track outstandings and upload settlement proofs</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
            <input 
              placeholder="Search Invoice/Customer..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-[#0f172a] border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-cyan-500 outline-none transition w-full md:w-64"
            />
          </div>
          <button 
            onClick={exportCSV}
            className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl transition"
            title="Export CSV"
          >
            <Download size={20} className="text-cyan-400" />
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={cn(
            "p-6 rounded-2xl border transition-all duration-300",
            stat.title === "OUTSTANDING" ? "bg-rose-500/5 border-rose-500/20" : "bg-[#0f172a] border-slate-800"
          )}>
            <div className="flex justify-between items-start">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">{stat.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 uppercase font-black tracking-widest">{stat.title}</p>
            <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* INVOICE LIST */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center bg-slate-900/30 gap-4">
          <h4 className="font-black uppercase text-xs tracking-widest text-cyan-400">Invoice & Settlement List</h4>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            {["ALL", "PENDING", "COMPLETED"].map((btn) => (
              <button 
                key={btn}
                onClick={() => setStatusFilter(btn)}
                className={cn(
                  "px-4 py-1.5 text-[10px] font-black rounded-md transition-all",
                  statusFilter === btn ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-800/50">
          {filtered.length > 0 ? filtered.map((item) => (
            <div 
              key={item.id}
              onClick={()=>setSelectedTxn(item)}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-cyan-500/[0.02] transition cursor-pointer group gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <FileText size={18} className="text-slate-500 group-hover:text-cyan-400 transition" />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.customer}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{item.id} • {item.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                <div className="text-right">
                  <p className="text-sm font-black">₹{item.amount.toLocaleString()}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter text-right">Gross Amount</p>
                </div>
                
                <div className="w-28 flex flex-col items-end">
                  <span className={cn(
                    "px-3 py-1 text-[10px] rounded-full font-black tracking-widest border uppercase",
                    item.status === "COMPLETED" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    {item.status}
                  </span>
                  {!item.proof && item.status === "PENDING" && (
                    <span className="text-[9px] text-rose-400 mt-1 flex items-center gap-1 font-bold italic">
                      Proof Missing
                    </span>
                  )}
                </div>
                <MoreVertical size={16} className="text-slate-600 hidden sm:block" />
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-slate-500 text-sm uppercase font-black tracking-widest">
              No transactions found
            </div>
          )}
        </div>
      </div>

      {/* PAYMENT UPLOAD MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-[#0f172a] w-full max-w-lg rounded-3xl border border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Invoice Settlement</h3>
              <button onClick={()=>setSelectedTxn(null)} className="p-2 hover:bg-white/10 rounded-full transition text-slate-400"><X size={20}/></button>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Customer</p>
                  <h4 className="text-xl font-black">{selectedTxn.customer}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{selectedTxn.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Amount Due</p>
                  <h4 className="text-2xl font-black text-white">₹{selectedTxn.amount.toLocaleString()}</h4>
                </div>
              </div>

              {/* UPLOAD SECTION */}
              <div className="space-y-3">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Upload Payment Proof</label>
                {selectedTxn.proof ? (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg"><CheckCircle2 className="text-emerald-400" size={20} /></div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Proof Received: {selectedTxn.proof}</span>
                    </div>
                    <button onClick={() => setTransactions(transactions.map(t => t.id === selectedTxn.id ? {...t, proof: null} : t))} className="text-[10px] font-black text-slate-400 underline uppercase">Change</button>
                  </div>
                ) : (
                  <div 
                    onClick={handleUpload}
                    className="group border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-900/30"
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500 border-transparent"></div>
                        <p className="text-[10px] font-black uppercase text-cyan-500">Uploading...</p>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-cyan-500/20 transition mb-3">
                          <Upload className="text-slate-400 group-hover:text-cyan-400" size={24} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest">Click to upload receipt</p>
                        <p className="text-[9px] text-slate-500 mt-1 uppercase italic tracking-tighter">JPG, PNG or PDF (Max 5MB)</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={handleSettle}
                  disabled={!selectedTxn.proof || selectedTxn.status === "COMPLETED"}
                  className="flex-1 bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl text-xs transition-all hover:scale-[1.02] active:scale-95"
                >
                  {selectedTxn.status === "COMPLETED" ? "Payment Settled" : "Verify & Settle Payment"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default DealerPayment;
