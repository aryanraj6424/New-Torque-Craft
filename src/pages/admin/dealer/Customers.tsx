
import React, { useState, useEffect } from 'react';
import { 
  Search, X, Download, Printer, QrCode 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import jsPDF from "jspdf";

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomerData([
      {
        id: 'KA',
        name: 'Kumar Auto',
        email: 'kumar@auto.com',
        phone: '+91 98111 00001',
        location: 'Gurgaon, IN',
        invoice: 'TC-INV-001',
        qr: 'TC-QR-8821',
        gst: '07AAGFF2194N1Z1',
        payment: 'UPI',
        dealer: 'Torque Craft Gurgaon',
        products: [
          { name: 'Brake Kit', qty: 1, price: 25000 },
          { name: 'Oil Filter', qty: 2, price: 5000 }
        ]
      }
    ]);
  }, []);

  const getTotal = (products) => {
    return products.reduce((sum, p) => sum + p.qty * p.price, 0);
  };

  // ✅ PDF DOWNLOAD
  const downloadPDF = (c) => {
    const doc = new jsPDF();

    doc.text("TORQUE CRAFT INVOICE", 20, 20);
    doc.text(`Invoice: ${c.invoice}`, 20, 30);
    doc.text(`Customer: ${c.name}`, 20, 40);

    let y = 60;
    c.products.forEach((p) => {
      doc.text(`${p.name} x${p.qty}`, 20, y);
      doc.text(`₹${p.qty * p.price}`, 150, y);
      y += 10;
    });

    const total = getTotal(c.products);
    doc.text(`Total: ₹${total}`, 20, y + 10);

    doc.save(`${c.invoice}.pdf`);
  };

  // ✅ EMAIL (DUMMY API)
  const sendEmail = async (c) => {
    await fetch("/api/send-invoice", {
      method: "POST",
      body: JSON.stringify(c)
    });
    alert("Invoice sent to email!");
  };

  // ✅ REFUND API
  const requestRefund = async (c) => {
    await fetch("/api/refund", {
      method: "POST",
      body: JSON.stringify({ invoice: c.invoice })
    });
    alert("Refund requested!");
  };

  const filtered = customerData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 text-white">

      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className="w-full p-3 bg-slate-900 rounded-xl mb-6"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((c,i)=>(
          <div key={i} className="p-5 bg-slate-900 rounded-xl">
            <h3>{c.name}</h3>
            <button 
              onClick={()=>setSelectedCustomer(c)}
              className="mt-3 bg-cyan-500 px-4 py-2 rounded"
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">

          <div className="bg-white text-black w-full max-w-4xl p-8 rounded-xl relative">

            <button onClick={()=>setSelectedCustomer(null)} className="absolute top-4 right-4">
              <X/>
            </button>

            {/* HEADER */}
            <h1 className="text-2xl font-bold text-center mb-6">Dealer Invoice</h1>

            <div className="grid grid-cols-3 text-sm mb-6">
              <div>
                <p className="font-bold">Billed By</p>
                <p>Torque Craft</p>
                <p>Gurgaon</p>
              </div>

              <div>
                <p className="font-bold">Billed To</p>
                <p>{selectedCustomer.name}</p>
                <p>{selectedCustomer.phone}</p>
              </div>

              <div className="text-right">
                <p>Invoice: {selectedCustomer.invoice}</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* PRODUCTS TABLE */}
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-200">
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.products.map((p,i)=>(
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.qty}</td>
                    <td>₹{p.price}</td>
                    <td>₹{p.qty*p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL */}
            <div className="text-right mt-6">
              <p>Subtotal: ₹{getTotal(selectedCustomer.products)}</p>
              <p>GST 18%: ₹{(getTotal(selectedCustomer.products)*0.18).toFixed(0)}</p>
              <p className="font-bold text-lg">
                Total: ₹{(getTotal(selectedCustomer.products)*1.18).toFixed(0)}
              </p>
            </div>

            {/* QR */}
            <div className="mt-6 flex items-center gap-3">
              <QrCode/>
              <span>{selectedCustomer.qr}</span>
              <button 
                onClick={()=>alert("Warranty Verified")}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Verify Warranty
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <button 
                onClick={()=>downloadPDF(selectedCustomer)}
                className="bg-cyan-600 px-4 py-2 rounded flex gap-2"
              >
                <Download size={16}/> PDF
              </button>

              <button 
                onClick={()=>window.print()}
                className="bg-gray-700 px-4 py-2 rounded flex gap-2"
              >
                <Printer size={16}/> Print
              </button>

              <button 
                onClick={()=>sendEmail(selectedCustomer)}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Email
              </button>

              <button 
                onClick={()=>requestRefund(selectedCustomer)}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Refund
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}