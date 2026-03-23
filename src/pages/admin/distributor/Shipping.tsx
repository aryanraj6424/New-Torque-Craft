// import React, { useState, useEffect } from "react";
// import { 
//   Truck, Package, Search, Upload, CheckCircle2, 
//   ExternalLink, ArrowRight, ShieldCheck, Clock,
//   ChevronRight, X, Image as ImageIcon, FileText
// } from "lucide-react";
// import { cn } from "../../../lib/utils";

// // --- Types ---
// type ShipStatus = "Pending" | "Shipped" | "Delivered";

// interface Shipment {
//   id: string;
//   orderId: string;
//   dealerName: string;
//   items: number;
//   amount: number;
//   status: ShipStatus;
//   courier?: string;
//   trackingId?: string;
//   dispatchDate?: string;
//   proofUrl?: string;
// }

// const INITIAL_SHIPMENTS: Shipment[] = [
//   { id: "SHIP-8821", orderId: "ORD-552", dealerName: "Nitro Wheels Performance", items: 12, amount: 45000, status: "Pending" },
//   { id: "SHIP-9902", orderId: "ORD-610", dealerName: "Elite Carbon Spares", items: 4, amount: 12500, status: "Shipped", courier: "BlueDart", trackingId: "BD77210092", dispatchDate: "2026-03-22" },
// ];

// export default function Shipping() {
//   const [shipments, setShipments] = useState<Shipment[]>(() => {
//     const saved = localStorage.getItem("torque_shipping");
//     return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Form State
//   const [shippingForm, setShippingForm] = useState({
//     courier: "",
//     trackingId: "",
//     proof: null as File | null
//   });

//   useEffect(() => {
//     localStorage.setItem("torque_shipping", JSON.stringify(shipments));
//   }, [shipments]);

//   const handleUpdateShipping = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedShipment) return;

//     setShipments(prev => prev.map(s => 
//       s.id === selectedShipment.id 
//         ? { 
//             ...s, 
//             status: "Shipped", 
//             courier: shippingForm.courier, 
//             trackingId: shippingForm.trackingId,
//             dispatchDate: new Date().toISOString().split('T')[0],
//             proofUrl: shippingForm.proof ? "uploaded_proof_placeholder.jpg" : undefined
//           } 
//         : s
//     ));
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const confirmDelivery = (id: string) => {
//     if(confirm("Confirm that items have been delivered to the dealer?")) {
//       setShipments(prev => prev.map(s => s.id === id ? { ...s, status: "Delivered" } : s));
//     }
//   };

//   const resetForm = () => {
//     setShippingForm({ courier: "", trackingId: "", proof: null });
//     setSelectedShipment(null);
//   };

//   const filtered = shipments.filter(s => 
//     s.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     s.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-10 text-slate-200">
      
//       {/* HEADER */}
//       <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
//               <Truck className="text-blue-400" size={28} />
//             </div>
//             <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Logistics Hub</h1>
//           </div>
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1">Outbound Delivery Management</p>
//         </div>

//         <div className="relative group w-full lg:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//           <input 
//             type="text" 
//             placeholder="SEARCH SHIPMENT OR DEALER..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[11px] font-black uppercase tracking-widest focus:border-blue-500/50 outline-none transition-all"
//           />
//         </div>
//       </header>

//       {/* SHIPMENT LIST */}
//       <div className="grid grid-cols-1 gap-4">
//         {filtered.map((ship) => (
//           <div key={ship.id} className="group relative bg-slate-900/20 border border-slate-800/50 rounded-3xl p-6 hover:bg-slate-800/30 transition-all backdrop-blur-md">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              
//               <div className="flex items-center gap-6">
//                 <div className={cn(
//                   "w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors",
//                   ship.status === "Pending" ? "bg-amber-500/5 border-amber-500/20 text-amber-500" :
//                   ship.status === "Shipped" ? "bg-blue-500/5 border-blue-500/20 text-blue-500" :
//                   "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
//                 )}>
//                   <Package size={24} />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ship.id}</span>
//                     <span className={cn(
//                       "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
//                       ship.status === "Pending" ? "text-amber-400 border-amber-500/30" :
//                       ship.status === "Shipped" ? "text-blue-400 border-blue-500/30" :
//                       "text-emerald-400 border-emerald-500/30"
//                     )}>{ship.status}</span>
//                   </div>
//                   <h3 className="text-xl font-black text-white italic uppercase">{ship.dealerName}</h3>
//                   <div className="flex gap-4 mt-1">
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order: {ship.orderId}</span>
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Items: {ship.items}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* ACTION AREA */}
//               <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
//                 {ship.status === "Pending" && (
//                   <button 
//                     onClick={() => { setSelectedShipment(ship); setIsModalOpen(true); }}
//                     className="flex-1 lg:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
//                   >
//                     Dispatch Now
//                   </button>
//                 )}
                
//                 {ship.status === "Shipped" && (
//                   <>
//                     <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
//                       <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Tracking ID</p>
//                       <p className="text-[12px] text-blue-400 font-bold">{ship.trackingId}</p>
//                     </div>
//                     <button 
//                       onClick={() => confirmDelivery(ship.id)}
//                       className="flex-1 lg:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
//                     >
//                       Confirm Delivery
//                     </button>
//                   </>
//                 )}

//                 {ship.status === "Delivered" && (
//                   <div className="flex items-center gap-2 text-emerald-400 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
//                     <CheckCircle2 size={16} />
//                     <span className="text-[11px] font-black uppercase tracking-widest">COMPLETED</span>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DISPATCH MODAL */}
//       {isModalOpen && selectedShipment && (
//         <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
//           <div className="bg-[#0f172a] border border-slate-800 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl">
//             <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
//               <div>
//                 <h3 className="text-xl font-black uppercase italic text-blue-400">Initialize Shipment</h3>
//                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Assignment for {selectedShipment.id}</p>
//               </div>
//               <button onClick={resetForm} className="p-3 hover:bg-slate-800 rounded-full transition-colors text-slate-400"><X /></button>
//             </div>

//             <form onSubmit={handleUpdateShipping} className="p-10 space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Assign Courier */}
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Assign Courier</label>
//                   <select 
//                     required
//                     value={shippingForm.courier}
//                     onChange={(e) => setShippingForm({...shippingForm, courier: e.target.value})}
//                     className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-[12px] font-medium text-white focus:border-blue-500/50 outline-none appearance-none"
//                   >
//                     <option value="" className="bg-slate-900">Select Carrier</option>
//                     <option value="BlueDart" className="bg-slate-900">BlueDart Logistics</option>
//                     <option value="Delhivery" className="bg-slate-900">Delhivery Pro</option>
//                     <option value="DTDC" className="bg-slate-900">DTDC Express</option>
//                     <option value="Ecom Express" className="bg-slate-900">Ecom Express</option>
//                   </select>
//                 </div>

//                 {/* Tracking Details */}
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Tracking Details</label>
//                   <input 
//                     required
//                     type="text"
//                     placeholder="ENTER AWB / TRACKING ID"
//                     value={shippingForm.trackingId}
//                     onChange={(e) => setShippingForm({...shippingForm, trackingId: e.target.value})}
//                     className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-[12px] font-medium text-white focus:border-blue-500/50 outline-none placeholder:text-slate-700"
//                   />
//                 </div>
//               </div>

//               {/* Upload Dispatch Proof */}
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Upload Dispatch Proof</label>
//                 <div className="relative group cursor-pointer">
//                   <input 
//                     type="file" 
//                     accept="image/*"
//                     onChange={(e) => setShippingForm({...shippingForm, proof: e.target.files?.[0] || null})}
//                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
//                   />
//                   <div className={cn(
//                     "border-2 border-dashed border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 transition-all group-hover:border-blue-500/50",
//                     shippingForm.proof && "border-emerald-500/50 bg-emerald-500/5"
//                   )}>
//                     {shippingForm.proof ? (
//                       <>
//                         <ShieldCheck className="text-emerald-400" size={40} />
//                         <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{shippingForm.proof.name}</p>
//                       </>
//                     ) : (
//                       <>
//                         <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
//                           <Upload size={24} />
//                         </div>
//                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Drag image or click to upload<br/><span className="text-slate-700 text-[8px]">Max Size: 5MB (JPG/PNG)</span></p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
//               >
//                 Confirm Dispatch
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { 
  Truck, Package, Search, Upload, CheckCircle2, 
  X, ShieldCheck, MapPin, Calendar, Hash, ExternalLink,
  ChevronRight, Camera, Info
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
type ShipStatus = "Pending" | "Shipped" | "Delivered";

interface Shipment {
  id: string;
  orderId: string;
  dealerName: string;
  items: number;
  amount: number;
  status: ShipStatus;
  courier?: string;
  trackingId?: string;
  dispatchDate?: string;
  proofUrl?: string;
}

const INITIAL_SHIPMENTS: Shipment[] = [
  { id: "SHIP-8821", orderId: "ORD-552", dealerName: "Nitro Wheels Performance", items: 12, amount: 45000, status: "Pending" },
  { id: "SHIP-9902", orderId: "ORD-610", dealerName: "Elite Carbon Spares", items: 4, amount: 12500, status: "Shipped", courier: "BlueDart", trackingId: "BD77210092", dispatchDate: "22/03/2026" },
];

export default function Shipping() {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem("torque_shipping");
    return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
  });
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals & Panels
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);

  // Form State for Dispatching
  const [shippingForm, setShippingForm] = useState({ 
    courier: "", 
    trackingId: "", 
    proof: null as File | null 
  });

  useEffect(() => {
    localStorage.setItem("torque_shipping", JSON.stringify(shipments));
  }, [shipments]);

  const handleUpdateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    setShipments(prev => prev.map(s => 
      s.id === selectedShipment.id 
        ? { 
            ...s, 
            status: "Shipped", 
            courier: shippingForm.courier, 
            trackingId: shippingForm.trackingId,
            dispatchDate: new Date().toLocaleDateString('en-GB'),
            proofUrl: shippingForm.proof ? URL.createObjectURL(shippingForm.proof) : undefined
          } 
        : s
    ));
    resetForm();
  };

  const confirmDelivery = (id: string) => {
    if(confirm("Confirm delivery? This will mark the order as completed.")) {
      setShipments(prev => prev.map(s => s.id === id ? { ...s, status: "Delivered" } : s));
    }
  };

  const resetForm = () => {
    setShippingForm({ courier: "", trackingId: "", proof: null });
    setSelectedShipment(null);
    setIsDispatchModalOpen(false);
    setIsViewPanelOpen(false);
  };

  const filtered = shipments.filter(s => 
    s.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-10 text-slate-200 overflow-x-hidden">
      
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Truck className="text-blue-400" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Logistics Hub</h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1 text-nowrap">Torque Craft Distribution</p>
        </div>

        <div className="relative group w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="SEARCH BY ID OR DEALER..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[11px] font-black uppercase tracking-widest focus:border-blue-500/50 outline-none transition-all"
          />
        </div>
      </header>

      {/* SHIPMENT LIST */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((ship) => (
          <div key={ship.id} className="group relative bg-slate-900/20 border border-slate-800/50 rounded-3xl p-6 hover:bg-slate-800/40 transition-all backdrop-blur-md">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              
              {/* Clickable Card Info */}
              <div 
                className="flex items-center gap-6 flex-1 cursor-pointer"
                onClick={() => { setSelectedShipment(ship); setIsViewPanelOpen(true); }}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110",
                  ship.status === "Pending" ? "bg-amber-500/5 border-amber-500/20 text-amber-500" :
                  ship.status === "Shipped" ? "bg-blue-500/5 border-blue-500/20 text-blue-500" :
                  "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                )}>
                  <Package size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ship.id}</span>
                    <span className={cn(
                      "text-[8px] font-black uppercase px-2 py-0.5 rounded border",
                      ship.status === "Pending" ? "text-amber-400 border-amber-500/30" :
                      ship.status === "Shipped" ? "text-blue-400 border-blue-500/30" :
                      "text-emerald-400 border-emerald-500/30"
                    )}>{ship.status}</span>
                  </div>
                  <h3 className="text-xl font-black text-white italic uppercase group-hover:text-blue-400 transition-colors">{ship.dealerName}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Items: {ship.items}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Order: {ship.orderId}</span>
                  </div>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                {ship.status === "Pending" && (
                  <button 
                    onClick={() => { setSelectedShipment(ship); setIsDispatchModalOpen(true); }}
                    className="flex-1 lg:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
                  >
                    Assign & Dispatch
                  </button>
                )}
                
                {ship.status === "Shipped" && (
                  <button 
                    onClick={() => confirmDelivery(ship.id)}
                    className="flex-1 lg:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                  >
                    Confirm Delivery
                  </button>
                )}

                {ship.status === "Delivered" && (
                  <div className="flex items-center gap-2 text-emerald-400 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 size={16} />
                    <span className="text-[11px] font-black uppercase tracking-widest">COMPLETED</span>
                  </div>
                )}
                
                <button 
                  onClick={() => { setSelectedShipment(ship); setIsViewPanelOpen(true); }}
                  className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"
                >
                  <Info size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- SIDE VIEW PANEL (DETAILS) --- */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full max-w-md bg-[#0b1224] border-l border-slate-800 z-[600] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] p-8 flex flex-col gap-8",
        isViewPanelOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-white">Logistics Data</h2>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Snapshot for {selectedShipment?.id}</p>
          </div>
          <button onClick={() => setIsViewPanelOpen(false)} className="p-3 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><X /></button>
        </div>

        {selectedShipment && (
          <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {/* Dealer Header */}
            <div className="bg-slate-900/80 p-6 rounded-[2.5rem] border border-slate-800">
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Destination Dealer</span>
              <h4 className="text-xl font-black text-white italic uppercase mt-1">{selectedShipment.dealerName}</h4>
              <div className="flex justify-between mt-4 pt-4 border-t border-slate-800/50">
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-xs font-bold text-slate-300 mt-0.5">{selectedShipment.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Value</p>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">₹{selectedShipment.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 gap-3">
              <DetailItem icon={<MapPin size={16}/>} label="Courier Service" value={selectedShipment.courier || "Not Assigned"} />
              <DetailItem icon={<ExternalLink size={16}/>} label="Tracking Number" value={selectedShipment.trackingId || "Wait for Dispatch"} className={selectedShipment.trackingId ? "text-blue-400" : ""} />
              <DetailItem icon={<Calendar size={16}/>} label="Dispatch Date" value={selectedShipment.dispatchDate || "Pending"} />
            </div>

            {/* Dispatch Proof Image */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Digital Dispatch Proof</p>
              {selectedShipment.proofUrl ? (
                <div className="rounded-[2rem] border border-slate-800 overflow-hidden bg-slate-900 group relative">
                   <img src={selectedShipment.proofUrl} alt="Proof" className="w-full h-56 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
                     <span className="text-[10px] font-black uppercase tracking-widest bg-blue-600 px-4 py-2 rounded-full shadow-xl">Verified Document</span>
                   </div>
                </div>
              ) : (
                <div className="h-40 border-2 border-dashed border-slate-800/50 rounded-[2rem] flex flex-col items-center justify-center text-slate-600 gap-2">
                  <Camera size={24} className="opacity-20" />
                  <span className="italic text-[10px] uppercase font-bold tracking-widest">Awaiting Verification</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- DISPATCH MODAL --- */}
      {isDispatchModalOpen && selectedShipment && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-[#0f172a] border border-slate-800 rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black italic">!</div>
                <h3 className="text-xl font-black uppercase italic text-white tracking-tight">Dispatch Protocol</h3>
              </div>
              <button onClick={() => setIsDispatchModalOpen(false)} className="p-3 hover:bg-slate-800 rounded-full text-slate-500 transition-colors"><X /></button>
            </div>
            
            <form onSubmit={handleUpdateShipping} className="p-10 space-y-8">
               <div className="space-y-6">
                  {/* Courier Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">1. Assign Courier</label>
                    <select 
                      required
                      value={shippingForm.courier}
                      onChange={(e) => setShippingForm({...shippingForm, courier: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:border-blue-500/50 outline-none appearance-none transition-all cursor-pointer"
                    >
                      <option value="">Select Carrier...</option>
                      <option value="BlueDart">BlueDart Express</option>
                      <option value="Delhivery">Delhivery Pro</option>
                      <option value="DTDC">DTDC International</option>
                    </select>
                  </div>

                  {/* Tracking Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">2. Tracking ID</label>
                    <input 
                      required
                      placeholder="ENTER AWB OR TRACKING CODE"
                      value={shippingForm.trackingId}
                      onChange={(e) => setShippingForm({...shippingForm, trackingId: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:border-blue-500/50 outline-none placeholder:text-slate-700 transition-all font-mono tracking-wider"
                    />
                  </div>

                  {/* Proof Upload */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">3. Dispatch Proof</label>
                    <div className="relative group cursor-pointer">
                      <input 
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => setShippingForm({...shippingForm, proof: e.target.files?.[0] || null})}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className={cn(
                        "border-2 border-dashed border-slate-800 rounded-3xl p-6 flex items-center justify-center gap-4 transition-all group-hover:bg-slate-800/30",
                        shippingForm.proof && "border-blue-500/50 bg-blue-500/5"
                      )}>
                        {shippingForm.proof ? (
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="text-blue-400" size={20} />
                            <span className="text-[10px] font-black uppercase text-blue-400 truncate max-w-[200px]">{shippingForm.proof.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-300">
                            <Upload size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Click to upload photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
               </div>

               <button 
                type="submit" 
                className="w-full py-5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-3xl font-black uppercase text-[12px] tracking-[0.3em] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
               >
                 Confirm Logistics
               </button>
            </form>
           </div>
        </div>
      )}
    </div>
  );
}

// Helper Component for Details
function DetailItem({ icon, label, value, className }: { icon: any, label: string, value: string, className?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
        <span className="text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
      </div>
      <span className={cn("text-[11px] font-bold text-slate-200 tracking-wide", className)}>{value}</span>
    </div>
  );
}