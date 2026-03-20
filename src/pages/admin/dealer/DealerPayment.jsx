// import React, { useState } from 'react';
// import { 
//   CreditCard, Search, Filter,
//   MoreVertical, DollarSign, Download, AlertTriangle
// } from 'lucide-react';

// const DealerPayment = () => {

//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [dateFilter, setDateFilter] = useState("");
//   const [search, setSearch] = useState("");

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

//   // 🔥 FILTER LOGIC (ADVANCED)
//   const filtered = transactions.filter(t => {
//     const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
//     const matchDate = !dateFilter || t.date === dateFilter;
//     const matchSearch =
//       t.customer.toLowerCase().includes(search.toLowerCase()) ||
//       t.product.toLowerCase().includes(search.toLowerCase()) ||
//       t.id.toLowerCase().includes(search.toLowerCase());

//     return matchStatus && matchDate && matchSearch;
//   });

//   // 🔥 EXPORT CSV (IMPROVED)
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

//   // 🔥 DATE DIFFERENCE (FOR DELAY)
//   const isDelayed = (date) => {
//     const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
//     return diff > 2; // 2 days delay
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

//           {/* STATUS FILTER */}
//           <select 
//             onChange={(e)=>setStatusFilter(e.target.value)}
//             className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
//           >
//             <option value="ALL">All</option>
//             <option value="COMPLETED">Completed</option>
//             <option value="PENDING">Pending</option>
//           </select>

//           {/* DATE */}
//           <input 
//             type="date"
//             onChange={(e)=>setDateFilter(e.target.value)}
//             className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
//           />

//           {/* EXPORT */}
//           <button 
//             onClick={exportCSV}
//             className="flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-lg text-sm hover:bg-cyan-500 transition"
//           >
//             <Download size={16}/> EXPORT
//           </button>

//         </div>
//       </div>

//       {/* BANK STATUS */}
//       <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
//         bankLinked ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
//       }`}>
//         {bankLinked ? "✅ Bank Account Linked" : "❌ Bank Not Linked"}
//       </div>

//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition">
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

//         {/* EMPTY STATE */}
//         {filtered.length === 0 && (
//           <div className="p-10 text-center text-slate-500">
//             No transactions found 🚫
//           </div>
//         )}

//         <div className="divide-y divide-slate-800">
//           {filtered.map((item) => {

//             const gst = (item.amount * 0.18).toFixed(0);
//             const net = item.amount - gst;
//             const delay = item.status === "PENDING" && isDelayed(item.date);

//             return (
//               <div key={item.id} className="p-6 flex justify-between items-center hover:bg-[#1e293b]/40 transition group">

//                 {/* LEFT */}
//                 <div>
//                   <p className="font-bold">{item.customer}</p>
//                   <p className="text-xs text-slate-500">{item.product}</p>
//                   <p className="text-[10px] text-slate-600">{item.id}</p>
//                 </div>

//                 {/* AMOUNT */}
//                 <div className="text-right">
//                   <p className="text-emerald-400 font-bold">₹{item.amount}</p>
//                   <p className="text-xs text-slate-500">GST: ₹{gst}</p>
//                   <p className="text-xs text-slate-400">Net: ₹{net}</p>
//                 </div>

//                 {/* STATUS */}
//                 <div>
//                   <span className={`px-3 py-1 text-xs rounded-full font-bold ${
//                     item.status === "COMPLETED"
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-yellow-500/20 text-yellow-400"
//                   }`}>
//                     {item.status}
//                   </span>
//                 </div>

//                 {/* DELAY ALERT */}
//                 {delay && (
//                   <div className="flex items-center gap-1 text-red-400 text-xs font-semibold">
//                     <AlertTriangle size={14}/> Delayed
//                   </div>
//                 )}

//                 {/* ACTION */}
//                 <button className="opacity-0 group-hover:opacity-100 transition">
//                   <MoreVertical size={16}/>
//                 </button>

//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default DealerPayment;


import React, { useState } from 'react';
import { 
  CreditCard, Search,
  MoreVertical, DollarSign, Download, AlertTriangle, X
} from 'lucide-react';

const DealerPayment = () => {

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");

  // 🔥 NEW STATE (DETAIL MODAL)
  const [selectedTxn, setSelectedTxn] = useState(null);

  const bankLinked = true;

  const stats = [
    { title: "TOTAL PAYMENTS", value: "₹4,25,000", icon: <CreditCard className="text-cyan-400" /> },
    { title: "PENDING SETTLEMENTS", value: "₹35,000", icon: <DollarSign className="text-amber-400" /> },
    { title: "COMPLETED", value: "₹3,90,000", icon: <CreditCard className="text-emerald-400" /> },
    { title: "REFUNDS", value: "₹8,500", icon: <CreditCard className="text-rose-400" /> },
  ];

  const transactions = [
    { id: "TXN-9021", customer: "Alex Rivera", product: "CyberCore X1", amount: 1200, status: "COMPLETED", date: "2025-03-15" },
    { id: "TXN-8842", customer: "Sarah Jenkins", product: "NeoLink v4", amount: 750, status: "PENDING", date: "2025-03-14" },
    { id: "TXN-7782", customer: "Rahul Sharma", product: "TurboBoost", amount: 1500, status: "PENDING", date: "2025-03-10" },
  ];

  const filtered = transactions.filter(t => {
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchDate = !dateFilter || t.date === dateFilter;
    const matchSearch =
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.product.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchDate && matchSearch;
  });

  const exportCSV = () => {
    const header = "ID,Customer,Product,Amount,Status,Date\n";
    const rows = filtered
      .map(t => `${t.id},${t.customer},${t.product},${t.amount},${t.status},${t.date}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payments.csv";
    link.click();
  };

  const isDelayed = (date) => {
    const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return diff > 2;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-bold uppercase">Payment Management</h2>

        <div className="flex gap-3 flex-wrap">

          {/* SEARCH */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-500"/>
            <input 
              placeholder="Search..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-[#1e293b] pl-8 pr-3 py-2 rounded-lg text-sm"
            />
          </div>

          <select 
            onChange={(e)=>setStatusFilter(e.target.value)}
            className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
          >
            <option value="ALL">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
          </select>

          {/* <input 
            type="date"
            onChange={(e)=>setDateFilter(e.target.value)}
            className="bg-[#1e293b] px-3 py-2 rounded-lg text-sm"
          /> */}

          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-lg text-sm hover:bg-cyan-500 transition"
          >
            <Download size={16}/> EXPORT
          </button>

        </div>
      </div>


      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0f172a] p-6 rounded-2xl border border-slate-800">
            {stat.icon}
            <p className="text-xs text-slate-500 mt-2">{stat.title}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden">

        <div className="p-6 border-b border-slate-800 flex justify-between">
          <h4 className="font-semibold">Recent Transactions</h4>
          <span className="text-xs text-slate-500">{filtered.length} Results</span>
        </div>

        <div className="divide-y divide-slate-800">
          {filtered.map((item) => {

            const tax = (item.amount * 0.18).toFixed(0);
            const net = item.amount - tax;
            const delay = item.status === "PENDING" && isDelayed(item.date);

            return (
              <div 
                key={item.id}
                onClick={()=>setSelectedTxn(item)}
                className="p-6 flex justify-between items-center hover:bg-[#1e293b]/40 transition cursor-pointer"
              >

                <div>
                  <p className="font-bold">{item.customer}</p>
                  <p className="text-xs text-slate-500">{item.product}</p>
                  <p className="text-[10px] text-slate-600">{item.id}</p>
                </div>

                <div className="text-right">
                  <p className="text-emerald-400 font-bold">₹{item.amount}</p>
                  <p className="text-xs text-slate-500">TAX: ₹{tax}</p>
                  <p className="text-xs text-slate-400">Net: ₹{net}</p>
                </div>

                <div>
                  <span className={`px-3 py-1 text-xs rounded-full font-bold ${
                    item.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {item.status}
                  </span>
                </div>

                {delay && (
                  <div className="flex items-center gap-1 text-red-400 text-xs">
                    <AlertTriangle size={14}/> Delayed
                  </div>
                )}

                <MoreVertical size={16}/>
              </div>
            );
          })}
        </div>

      </div>

      {/* 🔥 TRANSACTION DETAIL MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-[#0f172a] w-[500px] p-6 rounded-2xl border border-slate-700">

            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Transaction Details</h3>
              <button onClick={()=>setSelectedTxn(null)}><X/></button>
            </div>

            <p className="text-sm text-slate-400">ID: {selectedTxn.id}</p>

            <div className="mt-4 space-y-2">
              <p><b>Customer:</b> {selectedTxn.customer}</p>
              <p><b>Product:</b> {selectedTxn.product}</p>
              <p><b>Date:</b> {selectedTxn.date}</p>
            </div>

            {/* BILL */}
            <div className="mt-6 border-t border-slate-700 pt-4 space-y-2 text-sm">
              <p>Amount: ₹{selectedTxn.amount}</p>
              <p>TAX (18%): ₹{(selectedTxn.amount * 0.18).toFixed(0)}</p>
              <p>Platform Fee: ₹{(selectedTxn.amount * 0.05).toFixed(0)}</p>
              <p className="font-bold text-emerald-400">
                Net Settlement: ₹{(selectedTxn.amount * 0.77).toFixed(0)}
              </p>
            </div>

            {/* STATUS FLOW */}
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2">Payment Flow</p>
              <div className="flex justify-between text-xs">
                <span>Paid</span>
                <span>Processing</span>
                <span className="text-emerald-400">Settled</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default DealerPayment;