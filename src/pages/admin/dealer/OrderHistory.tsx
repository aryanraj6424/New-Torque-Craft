
// import React, { useState, useEffect } from 'react';
// import { 
//   History, Search, ChevronRight, Download, CheckCircle2, 
//   Clock, AlertCircle, X, QrCode, Printer
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';
// import jsPDF from "jspdf";

// export default function OrderHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderList, setOrderList] = useState([]);

//   useEffect(() => {
//     setOrderList([
//       {
//         id: 'ORD-2026-001',
//         customer: 'Kumar Auto',
//         phone: '+91 98111 00001',
//         email: 'kumar@auto.com',
//         address: '2/22, North Street, Gurgaon, India',
//         dealer: 'Torque Craft Gurgaon',
//         dealerAddress: 'Sector 45, Gurgaon, Haryana',
//         product: 'Brake Kit',
//         quantity: 2,
//         price: 25000,
//         status: 'PAID',
//         date: '2026-03-19',
//         qr: 'TC-QR-8821',
//         gst: '07AAGFF2194N1Z1'
//       }
//     ]);
//   }, []);

//   const getTotal = (o) => o.price * o.quantity;

//   const downloadPDF = (o) => {
//     const doc = new jsPDF();

//     doc.text("TORQUE CRAFT INVOICE", 20, 20);
//     doc.text(`Invoice: ${o.id}`, 20, 30);
//     doc.text(`Customer: ${o.customer}`, 20, 40);
//     doc.text(`Address: ${o.address}`, 20, 50);

//     doc.text(`${o.product} x${o.quantity}`, 20, 70);
//     doc.text(`₹${getTotal(o)}`, 150, 70);

//     const gst = getTotal(o) * 0.18;
//     const total = getTotal(o) + gst;

//     doc.text(`Subtotal: ₹${getTotal(o)}`, 20, 90);
//     doc.text(`GST 18%: ₹${gst}`, 20, 100);
//     doc.text(`Total: ₹${total}`, 20, 110);

//     doc.save(`${o.id}.pdf`);
//   };

//   const filteredOrders = orderList.filter(order => {
//     const matchesSearch =
//       order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.id.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "All Status" || order.status === statusFilter.toUpperCase();

//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-8 p-6 text-white">

//       <h2 className="text-2xl font-bold">ORDER HISTORY</h2>

//       <input
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e)=>setSearchTerm(e.target.value)}
//         className="w-full p-3 bg-slate-900 rounded-xl"
//       />

//       {/* TABLE */}
//       <table className="w-full mt-6">
//         <thead>
//           <tr className="text-left text-slate-400 text-xs">
//             <th>ID</th>
//             <th>Customer</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredOrders.map((o,i)=>(
//             <tr key={i} className="border-b border-slate-800">
//               <td>{o.id}</td>
//               <td>{o.customer}</td>
//               <td>₹{getTotal(o)}</td>
//               <td>
//                 <span className={cn(
//                   o.status === "PAID" && "text-green-400",
//                   o.status === "PENDING" && "text-yellow-400",
//                   "font-bold"
//                 )}>
//                   {o.status}
//                 </span>
//               </td>
//               <td>
//                 <button onClick={()=>setSelectedOrder(o)} className="text-cyan-400">
//                   VIEW
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* MODAL */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4">

//           <div className="bg-white text-black w-full max-w-4xl p-8 rounded-xl relative">

//             <button onClick={()=>setSelectedOrder(null)} className="absolute top-4 right-4">
//               <X/>
//             </button>

//             {/* HEADER */}
//             <h1 className="text-2xl font-bold text-center mb-6">Dealer Invoice</h1>

//             <div className="grid grid-cols-3 text-sm mb-6 border-b pb-4">
              
//               {/* BILLED BY */}
//               <div>
//                 <p className="font-bold">Billed By</p>
//                 <p>{selectedOrder.dealer}</p>
//                 <p>{selectedOrder.dealerAddress}</p>
//                 <p>GST: {selectedOrder.gst}</p>
//               </div>

//               {/* BILLED TO */}
//               <div>
//                 <p className="font-bold">Billed To</p>
//                 <p>{selectedOrder.customer}</p>
//                 <p>{selectedOrder.phone}</p>
//                 <p>{selectedOrder.email}</p>
//                 <p>{selectedOrder.address}</p>
//               </div>

//               {/* INVOICE */}
//               <div className="text-right">
//                 <p>Invoice: {selectedOrder.id}</p>
//                 <p>{selectedOrder.date}</p>
//               </div>
//             </div>

//             {/* TABLE */}
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th>Product</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{selectedOrder.product}</td>
//                   <td>{selectedOrder.quantity}</td>
//                   <td>₹{selectedOrder.price}</td>
//                   <td>₹{getTotal(selectedOrder)}</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* TOTAL */}
//             <div className="text-right mt-6">
//               <p>Subtotal: ₹{getTotal(selectedOrder)}</p>
//               <p>GST 18%: ₹{(getTotal(selectedOrder)*0.18).toFixed(0)}</p>
//               <p className="text-xl font-bold">
//                 Total: ₹{(getTotal(selectedOrder)*1.18).toFixed(0)}
//               </p>
//             </div>

//             {/* QR */}
//             <div className="mt-6 flex items-center gap-3">
//               <QrCode/>
//               <span>{selectedOrder.qr}</span>
//               <button className="bg-green-500 px-3 py-1 rounded text-white">
//                 Verify Warranty
//               </button>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-4 mt-6">
//               <button 
//                 onClick={()=>downloadPDF(selectedOrder)}
//                 className="bg-cyan-600 px-4 py-2 rounded text-white flex gap-2"
//               >
//                 <Download size={16}/> PDF
//               </button>

//               <button 
//                 onClick={()=>window.print()}
//                 className="bg-gray-700 px-4 py-2 rounded text-white flex gap-2"
//               >
//                 <Printer size={16}/> Print
//               </button>
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
  Clock, AlertCircle, X, QrCode, Printer, Plus, FileText, User
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import jsPDF from "jspdf";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);

  // Dummy Data
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
      },
      {
        id: 'ORD-2026-002',
        customer: 'Sharma Logistics',
        phone: '+91 98222 11112',
        email: 'info@sharmalog.com',
        address: 'Plot 45, Phase 3, Okhla, Delhi',
        dealer: 'Torque Craft Delhi',
        dealerAddress: 'Okhla Ind. Area',
        product: 'Suspension Struts',
        quantity: 4,
        price: 12000,
        status: 'PENDING',
        date: '2026-03-21',
        qr: 'TC-QR-9902',
        gst: '07BBGFF3344M1Z2'
      }
    ]);
  }, []);

  const getTotal = (o) => o.price * o.quantity;

  const downloadPDF = (o) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("TORQUE CRAFT - OFFICIAL INVOICE", 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${o.id}`, 20, 35);
    doc.text(`Date: ${o.date}`, 20, 42);
    
    doc.line(20, 48, 190, 48); // Horizontal Line

    doc.text("BILLED TO:", 20, 58);
    doc.text(`${o.customer}`, 20, 65);
    doc.text(`${o.address}`, 20, 72);
    doc.text(`Phone: ${o.phone}`, 20, 79);

    doc.text("ITEM DETAILS:", 20, 95);
    doc.text(`${o.product} (x${o.quantity})`, 20, 105);
    doc.text(`Base Amount: ₹${getTotal(o)}`, 140, 105);

    const gst = getTotal(o) * 0.18;
    const total = getTotal(o) + gst;

    doc.text(`GST (18%): ₹${gst}`, 140, 115);
    doc.setFontSize(14);
    doc.text(`Final Total: ₹${total}`, 140, 130);

    doc.save(`Invoice_${o.id}.pdf`);
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
    <div className="space-y-6 text-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ORDERS</h2>
          <p className="text-slate-400 text-sm">Manage, track, and create new orders</p>
        </div>
        
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-sm">
          <Plus size={18} /> CREATE ORDER
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            placeholder="Search by Order ID or Customer name..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-slate-800 rounded-xl focus:border-cyan-500 outline-none transition"
          />
        </div>
        <select 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-slate-300"
        >
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-800">
                <th className="p-4 font-bold">Order Details</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((o, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <p className="font-bold text-sm text-cyan-400">{o.id}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{o.date}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {o.customer.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{o.customer}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">₹{getTotal(o).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">Incl. GST</p>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider",
                      o.status === "PAID" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    )}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(o)}
                      className="p-2 hover:bg-cyan-500/10 rounded-lg text-slate-400 hover:text-cyan-400 transition"
                      title="View Details"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL (View Status + Customer Details + Invoice) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-[#0f172a] border border-slate-800 text-slate-200 w-full max-w-2xl rounded-2xl relative shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-3">
                <FileText className="text-cyan-400" />
                <h3 className="text-lg font-bold uppercase tracking-tight">Order Details</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer & Status Section */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Customer Details</label>
                  <p className="text-lg font-bold mt-1">{selectedOrder.customer}</p>
                  <p className="text-sm text-slate-400 mt-1">{selectedOrder.email}</p>
                  <p className="text-sm text-slate-400">{selectedOrder.phone}</p>
                  <p className="text-xs text-slate-500 mt-2 italic">{selectedOrder.address}</p>
                </div>
                <div className="text-right">
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Order Status</label>
                  <div className="mt-2 flex flex-col items-end gap-2">
                    <span className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest",
                      selectedOrder.status === "PAID" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    )}>
                      {selectedOrder.status}
                    </span>
                    <p className="text-[10px] text-slate-500">Last updated: {selectedOrder.date}</p>
                  </div>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold">{selectedOrder.product}</span>
                  <span className="text-sm text-slate-400">Qty: {selectedOrder.quantity}</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span>₹{getTotal(selectedOrder).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">GST (18%)</span>
                    <span>₹{(getTotal(selectedOrder)*0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-cyan-400 pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span>₹{(getTotal(selectedOrder)*1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => downloadPDF(selectedOrder)}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Download size={18} /> INVOICE DOWNLOAD
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Printer size={18} /> PRINT
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}