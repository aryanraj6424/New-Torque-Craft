
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, X, Download, Printer, QrCode 
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';
// import jsPDF from "jspdf";

// export default function Customers() {
//   const [customerData, setCustomerData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   useEffect(() => {
//     setCustomerData([
//       {
//         id: 'KA',
//         name: 'Kumar Auto',
//         email: 'kumar@auto.com',
//         phone: '+91 98111 00001',
//         location: 'Gurgaon, IN',
//         invoice: 'TC-INV-001',
//         qr: 'TC-QR-8821',
//         gst: '07AAGFF2194N1Z1',
//         payment: 'UPI',
//         dealer: 'Torque Craft Gurgaon',
//         products: [
//           { name: 'Brake Kit', qty: 1, price: 25000 },
//           { name: 'Oil Filter', qty: 2, price: 5000 }
//         ]
//       }
//     ]);
//   }, []);

//   const getTotal = (products) => {
//     return products.reduce((sum, p) => sum + p.qty * p.price, 0);
//   };

//   // ✅ PDF DOWNLOAD
//   const downloadPDF = (c) => {
//     const doc = new jsPDF();

//     doc.text("TORQUE CRAFT INVOICE", 20, 20);
//     doc.text(`Invoice: ${c.invoice}`, 20, 30);
//     doc.text(`Customer: ${c.name}`, 20, 40);

//     let y = 60;
//     c.products.forEach((p) => {
//       doc.text(`${p.name} x${p.qty}`, 20, y);
//       doc.text(`₹${p.qty * p.price}`, 150, y);
//       y += 10;
//     });

//     const total = getTotal(c.products);
//     doc.text(`Total: ₹${total}`, 20, y + 10);

//     doc.save(`${c.invoice}.pdf`);
//   };

//   // ✅ EMAIL (DUMMY API)
//   const sendEmail = async (c) => {
//     await fetch("/api/send-invoice", {
//       method: "POST",
//       body: JSON.stringify(c)
//     });
//     alert("Invoice sent to email!");
//   };

//   // ✅ REFUND API
//   const requestRefund = async (c) => {
//     await fetch("/api/refund", {
//       method: "POST",
//       body: JSON.stringify({ invoice: c.invoice })
//     });
//     alert("Refund requested!");
//   };

//   const filtered = customerData.filter(c =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 text-white">

//       <input
//         placeholder="Search"
//         value={searchTerm}
//         onChange={(e)=>setSearchTerm(e.target.value)}
//         className="w-full p-3 bg-slate-900 rounded-xl mb-6"
//       />

//       <div className="grid md:grid-cols-3 gap-6">
//         {filtered.map((c,i)=>(
//           <div key={i} className="p-5 bg-slate-900 rounded-xl">
//             <h3>{c.name}</h3>
//             <button 
//               onClick={()=>setSelectedCustomer(c)}
//               className="mt-3 bg-cyan-500 px-4 py-2 rounded"
//             >
//               View Invoice
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {selectedCustomer && (
//         <div className="fixed inset-0 bg-black/80 flex justify-center items-center">

//           <div className="bg-white text-black w-full max-w-4xl p-8 rounded-xl relative">

//             <button onClick={()=>setSelectedCustomer(null)} className="absolute top-4 right-4">
//               <X/>
//             </button>

//             {/* HEADER */}
//             <h1 className="text-2xl font-bold text-center mb-6">Dealer Invoice</h1>

//             <div className="grid grid-cols-3 text-sm mb-6">
//               <div>
//                 <p className="font-bold">Billed By</p>
//                 <p>Torque Craft</p>
//                 <p>Gurgaon</p>
//               </div>

//               <div>
//                 <p className="font-bold">Billed To</p>
//                 <p>{selectedCustomer.name}</p>
//                 <p>{selectedCustomer.phone}</p>
//               </div>

//               <div className="text-right">
//                 <p>Invoice: {selectedCustomer.invoice}</p>
//                 <p>{new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             {/* PRODUCTS TABLE */}
//             <table className="w-full text-sm border">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th>Product</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedCustomer.products.map((p,i)=>(
//                   <tr key={i}>
//                     <td>{p.name}</td>
//                     <td>{p.qty}</td>
//                     <td>₹{p.price}</td>
//                     <td>₹{p.qty*p.price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* TOTAL */}
//             <div className="text-right mt-6">
//               <p>Subtotal: ₹{getTotal(selectedCustomer.products)}</p>
//               <p>GST 18%: ₹{(getTotal(selectedCustomer.products)*0.18).toFixed(0)}</p>
//               <p className="font-bold text-lg">
//                 Total: ₹{(getTotal(selectedCustomer.products)*1.18).toFixed(0)}
//               </p>
//             </div>

//             {/* QR */}
//             <div className="mt-6 flex items-center gap-3">
//               <QrCode/>
//               <span>{selectedCustomer.qr}</span>
//               <button 
//                 onClick={()=>alert("Warranty Verified")}
//                 className="bg-green-500 px-3 py-1 rounded"
//               >
//                 Verify Warranty
//               </button>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-4 mt-6">
//               <button 
//                 onClick={()=>downloadPDF(selectedCustomer)}
//                 className="bg-cyan-600 px-4 py-2 rounded flex gap-2"
//               >
//                 <Download size={16}/> PDF
//               </button>

//               <button 
//                 onClick={()=>window.print()}
//                 className="bg-gray-700 px-4 py-2 rounded flex gap-2"
//               >
//                 <Printer size={16}/> Print
//               </button>

//               <button 
//                 onClick={()=>sendEmail(selectedCustomer)}
//                 className="bg-blue-500 px-4 py-2 rounded"
//               >
//                 Email
//               </button>

//               <button 
//                 onClick={()=>requestRefund(selectedCustomer)}
//                 className="bg-red-500 px-4 py-2 rounded"
//               >
//                 Refund
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
  Search, X, Download, Printer, QrCode, UserPlus, 
  History, ShieldCheck, Mail, Phone, MapPin, FileText, ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import jsPDF from "jspdf";

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

  useEffect(() => {
    // Dummy Data with Order History
    setCustomerData([
      {
        id: 'C-8821',
        name: 'Kumar Auto',
        email: 'kumar@auto.com',
        phone: '+91 98111 00001',
        location: 'Gurgaon, Haryana',
        gst: '07AAGFF2194N1Z1',
        joinDate: '12 Jan 2026',
        orders: [
          { id: 'TC-INV-001', date: '2026-03-19', amount: 35000, status: 'Delivered', qr: 'TC-QR-8821', products: [{ name: 'Brake Kit', qty: 1, price: 25000 }, { name: 'Oil Filter', qty: 2, price: 5000 }] },
          { id: 'TC-INV-084', date: '2026-02-10', amount: 12000, status: 'Delivered', qr: 'TC-QR-1102', products: [{ name: 'Brake Pads', qty: 2, price: 6000 }] }
        ]
      },
      {
        id: 'C-9902',
        name: 'Sharma Logistics',
        email: 'info@sharma.com',
        phone: '+91 98222 11112',
        location: 'Okhla, Delhi',
        gst: '07BBGFF3344M1Z2',
        joinDate: '05 Feb 2026',
        orders: [
          { id: 'TC-INV-099', date: '2026-03-21', amount: 48000, status: 'Processing', qr: 'TC-QR-9902', products: [{ name: 'Suspension Kit', qty: 1, price: 48000 }] }
        ]
      }
    ]);
  }, []);

  const getTotal = (products) => products.reduce((sum, p) => sum + p.qty * p.price, 0);

  const downloadPDF = (customer, order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("TORQUE CRAFT INVOICE", 20, 20);
    doc.setFontSize(10);
    doc.text(`Invoice: ${order.id}`, 20, 30);
    doc.text(`Customer: ${customer.name}`, 20, 36);
    doc.text(`Date: ${order.date}`, 20, 42);
    
    let y = 60;
    order.products.forEach((p) => {
      doc.text(`${p.name} x${p.qty}`, 20, y);
      doc.text(`₹${p.qty * p.price}`, 150, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    doc.text(`Grand Total: ₹${getTotal(order.products) * 1.18}`, 20, y + 10);
    doc.save(`${order.id}.pdf`);
  };

  const filtered = customerData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Customers</h2>
          <p className="text-slate-400 text-sm">Manage database and purchase history</p>
        </div>
        
        <button 
          onClick={() => alert("Open Customer Entry Form")}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 text-sm uppercase"
        >
          <UserPlus size={18} /> Customer Entry
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
          placeholder="Search by name, phone or ID..."
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-[#0f172a] border border-slate-800 rounded-2xl focus:border-cyan-500 outline-none transition-all shadow-inner"
        />
      </div>

      {/* CUSTOMER GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedCustomer(c)}
            className="group p-6 bg-[#0f172a] border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
               <ChevronRight className="text-cyan-400" />
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-black text-xl border border-cyan-500/20">
                {c.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{c.name}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{c.id}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={14} className="text-slate-600" /> {c.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} className="text-slate-600" /> {c.location}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Total Orders: {c.orders.length}</span>
              <span className="text-cyan-400 text-xs font-bold">VIEW PROFILE</span>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOMER PROFILE MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-[#0f172a] border border-slate-800 text-slate-200 w-full max-w-5xl rounded-3xl relative shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            <button onClick={() => setSelectedCustomer(null)} className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition">
              <X size={24} />
            </button>

            {/* LEFT SIDE: CUSTOMER INFO */}
            <div className="w-full md:w-80 bg-slate-900/50 p-8 border-r border-slate-800">
              <div className="w-20 h-20 rounded-2xl bg-cyan-500 flex items-center justify-center text-3xl font-black text-white mb-6 shadow-xl shadow-cyan-500/20">
                {selectedCustomer.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-black uppercase">{selectedCustomer.name}</h2>
              <p className="text-cyan-400 font-bold text-sm mb-6">{selectedCustomer.id}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Contact Information</label>
                  <p className="text-sm mt-1 flex items-center gap-2"><Mail size={14} /> {selectedCustomer.email}</p>
                  <p className="text-sm mt-1 flex items-center gap-2"><Phone size={14} /> {selectedCustomer.phone}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">GST Number</label>
                  <p className="text-sm mt-1 font-mono text-slate-300">{selectedCustomer.gst}</p>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Customer Since</label>
                  <p className="text-sm mt-1">{selectedCustomer.joinDate}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: HISTORY & WARRANTY */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-8">
                <h3 className="flex items-center gap-2 text-lg font-black uppercase tracking-tight mb-4 text-white">
                  <History className="text-cyan-400" size={20} /> Order History
                </h3>
                
                <div className="space-y-3">
                  {selectedCustomer.orders.map((order, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-200">{order.id}</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded border border-emerald-500/20 uppercase">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{order.date} • ₹{order.amount.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => downloadPDF(selectedCustomer, order)}
                          className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 transition"
                        >
                          <Download size={14} /> Invoice PDF
                        </button>
                        <button 
                          onClick={() => alert(`Warranty Check for ${order.qr}`)}
                          className="flex-1 sm:flex-none bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-cyan-500/20 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 transition"
                        >
                          <ShieldCheck size={14} /> Warranty Check
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WARRANTY QR QUICK SECTION */}
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <QrCode className="text-black" size={32} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-sm">Quick QR Verification</h4>
                    <p className="text-xs text-slate-400">Scan product QR to verify instant warranty</p>
                  </div>
                </div>
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                  Scan Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}