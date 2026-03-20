// import React, { useState, useEffect } from 'react';
// import { 
//   History, Search, ChevronRight, Download, CheckCircle2, 
//   Clock, AlertCircle, X, Zap, QrCode, Printer, FileText
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// export default function OrderHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderList, setOrderList] = useState([]);

//   // Torque Craft Database Simulation
//   useEffect(() => {
//     const mockOrders = [
//       { id: 'ORD-2026-001', customer: 'Alex Rivera', initials: 'AR', product: 'CyberCore X1', quantity: 2, price: 2598, status: 'PAID', date: '2026-01-15', qr: 'TC-QR-9901', email: 'alex@cyber.com' },
//       { id: 'ORD-2026-002', customer: 'Sarah Chen', initials: 'SC', product: 'NeoLink v4', quantity: 1, price: 899, status: 'PAID', date: '2026-02-10', qr: 'TC-QR-9902', email: 'sarah@link.com' },
//       { id: 'ORD-2026-004', customer: 'Elena Gilbert', initials: 'EG', product: 'NeoLink v4', quantity: 1, price: 899, status: 'PENDING', date: '2026-03-01', qr: 'TC-QR-9904', email: 'elena@vamp.com' },
//       { id: 'ORD-2026-007', customer: 'David Kim', initials: 'DK', product: 'MegaDrive Kit', quantity: 1, price: 799, status: 'FAILED', date: '2026-03-10', qr: 'TC-QR-9907', email: 'david@kim.com' },
//     ];
//     setOrderList(mockOrders);
//   }, []);

//   // Filter Logic
//   const filteredOrders = orderList.filter(order => {
//     const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All Status" || order.status === statusFilter.toUpperCase();
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white tracking-tight uppercase italic">ORDER <span className="text-slate-500">HISTORY</span></h2>
//         <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-all shadow-lg active:scale-95">
//           <Download className="w-4 h-4" /> EXPORT LOGS
//         </button>
//       </div>

//       <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl relative overflow-hidden">
//         {/* Search & Filter Bar */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
//               <History className="w-5 h-5 text-cyan-400" />
//             </div>
//             <h3 className="text-xl font-bold text-white tracking-tight uppercase">Master Ledger</h3>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//               <input 
//                 type="text" 
//                 placeholder="Search by ID or Name..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-64"
//               />
//             </div>
//             <select 
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all cursor-pointer appearance-none"
//             >
//               <option>All Status</option>
//               <option>Paid</option>
//               <option>Pending</option>
//               <option>Failed</option>
//             </select>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="overflow-x-auto -mx-8">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-800/50">
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">ORDER ID</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">CUSTOMER</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PRODUCT</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">TOTAL</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">STATUS</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">ACTION</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/30">
//               {filteredOrders.map((order, i) => (
//                 <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-black text-white italic tracking-tighter">{order.id}</span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all">
//                         {order.initials}
//                       </div>
//                       <span className="text-sm font-bold text-white">{order.customer}</span>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-medium text-slate-400">{order.product} <span className="text-[10px] text-slate-600 font-bold">x{order.quantity}</span></span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-black text-emerald-400">${order.price.toLocaleString()}</span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className={cn(
//                       "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
//                       order.status === 'PAID' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
//                       order.status === 'PENDING' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
//                       "bg-red-500/10 text-red-400 border border-red-500/20"
//                     )}>
//                       {order.status === 'PAID' ? <CheckCircle2 size={12} /> : 
//                        order.status === 'PENDING' ? <Clock size={12} /> : 
//                        <AlertCircle size={12} />}
//                       {order.status}
//                     </div>
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <button 
//                       onClick={() => setSelectedOrder(order)}
//                       className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 ml-auto group/btn active:scale-90"
//                     >
//                       VIEW INVOICE
//                       <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MASTER INVOICE MODAL --- */}
//       {selectedOrder && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
//           <div className="bg-[#0f172a] border border-slate-700 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
//             <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white bg-slate-800 p-2 rounded-full z-20"><X size={18} /></button>
            
//             <div className="p-10 space-y-6">
//               <div className="flex justify-between items-start border-b border-slate-800 pb-6">
//                 <div>
//                   <h3 className="text-2xl font-black text-white italic">TORQUE CRAFT</h3>
//                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Transaction Verified</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-cyan-400 uppercase tracking-tighter">{selectedOrder.id}</p>
//                   <p className="text-[10px] text-slate-500 italic uppercase font-bold">{selectedOrder.date}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6 text-left">
//                 <div>
//                   <p className="text-[9px] text-slate-600 font-black uppercase mb-1">Customer Details</p>
//                   <p className="text-white font-bold text-sm">{selectedOrder.customer}</p>
//                   <p className="text-xs text-slate-500">{selectedOrder.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-[9px] text-slate-600 font-black uppercase mb-1">Traceability Hub</p>
//                   <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg">
//                     <QrCode size={14} className="text-amber-500" />
//                     <span className="text-[10px] font-mono text-slate-400">{selectedOrder.qr}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Zap className="text-cyan-400" size={16} />
//                   <div>
//                     <p className="text-xs font-black text-white uppercase tracking-tight">{selectedOrder.product}</p>
//                     <p className="text-[9px] text-slate-500 font-bold">Qty: {selectedOrder.quantity}</p>
//                   </div>
//                 </div>
//                 <p className="text-sm font-black text-white">${selectedOrder.price.toLocaleString()}</p>
//               </div>

//               <div className="flex flex-col items-end gap-1 pt-4 border-t border-slate-800">
//                 <p className="text-[10px] font-bold text-slate-500 uppercase">Grand Total (Net)</p>
//                 <p className="text-3xl font-black text-emerald-400 tracking-tighter">${selectedOrder.price.toLocaleString()}</p>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 transition-all">
//                   <Download size={14} /> DOWNLOAD
//                 </button>
//                 <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3.5 rounded-xl font-black text-[10px] uppercase flex items-center justify-center gap-2 transition-all">
//                   <Printer size={14} /> PRINT
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { 
  History, Search, ChevronRight, Download, CheckCircle2, 
  Clock, AlertCircle, X, QrCode, Printer
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import jsPDF from "jspdf";

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    setOrderList([
      {
        id: 'ORD-2026-001',
        customer: 'Kumar Auto',
        phone: '+91 98111 00001',
        email: 'kumar@auto.com',
        address: '2/22, North Street, Gurgaon, India',
        dealer: 'Torque Craft Gurgaon',
        dealerAddress: 'Sector 45, Gurgaon, Haryana',
        product: 'Brake Kit',
        quantity: 2,
        price: 25000,
        status: 'PAID',
        date: '2026-03-19',
        qr: 'TC-QR-8821',
        gst: '07AAGFF2194N1Z1'
      }
    ]);
  }, []);

  const getTotal = (o) => o.price * o.quantity;

  const downloadPDF = (o) => {
    const doc = new jsPDF();

    doc.text("TORQUE CRAFT INVOICE", 20, 20);
    doc.text(`Invoice: ${o.id}`, 20, 30);
    doc.text(`Customer: ${o.customer}`, 20, 40);
    doc.text(`Address: ${o.address}`, 20, 50);

    doc.text(`${o.product} x${o.quantity}`, 20, 70);
    doc.text(`₹${getTotal(o)}`, 150, 70);

    const gst = getTotal(o) * 0.18;
    const total = getTotal(o) + gst;

    doc.text(`Subtotal: ₹${getTotal(o)}`, 20, 90);
    doc.text(`GST 18%: ₹${gst}`, 20, 100);
    doc.text(`Total: ₹${total}`, 20, 110);

    doc.save(`${o.id}.pdf`);
  };

  const filteredOrders = orderList.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-6 text-white">

      <h2 className="text-2xl font-bold">ORDER HISTORY</h2>

      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className="w-full p-3 bg-slate-900 rounded-xl"
      />

      {/* TABLE */}
      <table className="w-full mt-6">
        <thead>
          <tr className="text-left text-slate-400 text-xs">
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((o,i)=>(
            <tr key={i} className="border-b border-slate-800">
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>₹{getTotal(o)}</td>
              <td>
                <span className={cn(
                  o.status === "PAID" && "text-green-400",
                  o.status === "PENDING" && "text-yellow-400",
                  "font-bold"
                )}>
                  {o.status}
                </span>
              </td>
              <td>
                <button onClick={()=>setSelectedOrder(o)} className="text-cyan-400">
                  VIEW
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4">

          <div className="bg-white text-black w-full max-w-4xl p-8 rounded-xl relative">

            <button onClick={()=>setSelectedOrder(null)} className="absolute top-4 right-4">
              <X/>
            </button>

            {/* HEADER */}
            <h1 className="text-2xl font-bold text-center mb-6">Dealer Invoice</h1>

            <div className="grid grid-cols-3 text-sm mb-6 border-b pb-4">
              
              {/* BILLED BY */}
              <div>
                <p className="font-bold">Billed By</p>
                <p>{selectedOrder.dealer}</p>
                <p>{selectedOrder.dealerAddress}</p>
                <p>GST: {selectedOrder.gst}</p>
              </div>

              {/* BILLED TO */}
              <div>
                <p className="font-bold">Billed To</p>
                <p>{selectedOrder.customer}</p>
                <p>{selectedOrder.phone}</p>
                <p>{selectedOrder.email}</p>
                <p>{selectedOrder.address}</p>
              </div>

              {/* INVOICE */}
              <div className="text-right">
                <p>Invoice: {selectedOrder.id}</p>
                <p>{selectedOrder.date}</p>
              </div>
            </div>

            {/* TABLE */}
            <table className="w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedOrder.product}</td>
                  <td>{selectedOrder.quantity}</td>
                  <td>₹{selectedOrder.price}</td>
                  <td>₹{getTotal(selectedOrder)}</td>
                </tr>
              </tbody>
            </table>

            {/* TOTAL */}
            <div className="text-right mt-6">
              <p>Subtotal: ₹{getTotal(selectedOrder)}</p>
              <p>GST 18%: ₹{(getTotal(selectedOrder)*0.18).toFixed(0)}</p>
              <p className="text-xl font-bold">
                Total: ₹{(getTotal(selectedOrder)*1.18).toFixed(0)}
              </p>
            </div>

            {/* QR */}
            <div className="mt-6 flex items-center gap-3">
              <QrCode/>
              <span>{selectedOrder.qr}</span>
              <button className="bg-green-500 px-3 py-1 rounded text-white">
                Verify Warranty
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <button 
                onClick={()=>downloadPDF(selectedOrder)}
                className="bg-cyan-600 px-4 py-2 rounded text-white flex gap-2"
              >
                <Download size={16}/> PDF
              </button>

              <button 
                onClick={()=>window.print()}
                className="bg-gray-700 px-4 py-2 rounded text-white flex gap-2"
              >
                <Printer size={16}/> Print
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}