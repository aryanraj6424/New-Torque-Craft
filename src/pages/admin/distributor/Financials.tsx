import React, { useState, useMemo } from "react";
import { 
  Wallet, FileText, IndianRupee, History, 
  ArrowUpRight, ArrowDownLeft, Search, 
  Download, AlertCircle, CheckCircle2, X, Send,
  Package, Truck, Clock, ChevronRight, BarChart3
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
interface PaymentLog {
  id: string;
  dealerName: string;
  amount: number;
  type: "Collection" | "Credit Note" | "Outstanding";
  status: "Settled" | "Pending" | "Failed";
  date: string;
  reference: string;
  orderId: string;
  items: number;
  location: string;
}

// --- Expanded Production Dummy Data ---
const INITIAL_FINANCIALS: PaymentLog[] = [
  { id: "TXN-9021", dealerName: "Apex Motors Noida", amount: 45000, type: "Collection", status: "Settled", date: "2026-03-22", reference: "UPI-8821", orderId: "ORD-552", items: 12, location: "Sector 62, Noida" },
  { id: "TXN-8840", dealerName: "Global Auto Parts", amount: 12000, type: "Credit Note", status: "Settled", date: "2026-03-20", reference: "CN-102", orderId: "ORD-610", items: 4, location: "Gurugram, HR" },
  { id: "TXN-7731", dealerName: "SR Auto House", amount: 85000, type: "Outstanding", status: "Pending", date: "2026-03-18", reference: "INV-442", orderId: "ORD-991", items: 28, location: "Rohini, Delhi" },
  { id: "TXN-6612", dealerName: "Elite Wheels", amount: 125000, type: "Collection", status: "Settled", date: "2026-03-15", reference: "NEFT-990", orderId: "ORD-221", items: 45, location: "Ludhiana, PB" },
  { id: "TXN-5501", dealerName: "Zenith Spares", amount: 32000, type: "Outstanding", status: "Failed", date: "2026-03-12", reference: "INV-882", orderId: "ORD-104", items: 8, location: "Pune, MH" },
];

export default function DealerFinancials() {
  const [logs] = useState<PaymentLog[]>(INITIAL_FINANCIALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  
  // UI States
  const [activeModal, setActiveModal] = useState<"CreditNote" | "Reminder" | "Report" | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<PaymentLog | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.dealerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            log.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All" || log.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, logs]);

  const handleAction = (type: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveModal(null);
      alert(`${type} processed successfully.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-8 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* HEADER: Dealer Payments Collection Context */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <Wallet className="text-indigo-400" size={26} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white underline decoration-indigo-500/40 decoration-4 underline-offset-8">Financial Hub</h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1 font-mono">Real-time Dealer Payment Collection</p>
        </div>

        <div className="flex gap-3">
            <button 
              onClick={() => setActiveModal("Report")}
              className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <BarChart3 size={14} className="group-hover:text-indigo-400" /> Outstanding Report
            </button>
            <button 
              onClick={() => handleAction("Global Sync")}
              className="px-6 py-4 bg-indigo-600 border border-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/20"
            >
              <Download size={14} /> {isProcessing ? "SYNCING..." : "Export Logs"}
            </button>
        </div>
      </header>

      {/* METRICS: Live Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Net Collections" value="₹24.82L" icon={<ArrowDownLeft className="text-emerald-400" />} trend="+18% vs prev" />
        <StatCard label="Active Outstanding" value="₹8.4L" icon={<AlertCircle className="text-red-400" />} trend="High Priority" />
        <StatCard label="Credit Note Pool" value="₹1.2L" icon={<FileText className="text-indigo-400" />} trend="Within Cap" />
      </div>

      {/* PAYMENT LOGS: Transaction Ledger */}
      <div className="bg-slate-950/40 border border-slate-800/50 rounded-[3rem] backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <History size={16} className="text-indigo-500" /> Payment Logs
            </h2>
            <div className="h-6 w-[1px] bg-slate-800 hidden md:block" />
            <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/50">
              {["All", "Collection", "Credit Note", "Outstanding"].map((t) => (
                <button 
                  key={t} 
                  onClick={() => setFilterType(t)} 
                  className={cn(
                    "text-[9px] font-black uppercase px-5 py-2.5 rounded-xl transition-all", 
                    filterType === t ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input 
              type="text" 
              placeholder="FILTER BY DEALER, REF OR ID..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full bg-slate-900/50 border border-slate-800/50 rounded-2xl py-4 pl-14 pr-6 text-[11px] font-bold uppercase tracking-wider outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] bg-slate-900/30 border-b border-slate-800/50">
                <th className="px-10 py-6">Transaction ID</th>
                <th className="px-6 py-6">Dealer & Region</th>
                <th className="px-6 py-6">Value (INR)</th>
                <th className="px-6 py-6">Log Type</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/20">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => setSelectedDealer(log)}
                  className="group hover:bg-indigo-500/[0.03] transition-all cursor-pointer"
                >
                  <td className="px-10 py-8 font-mono text-[11px] font-black text-indigo-400 group-hover:translate-x-1 transition-transform">#{log.id}</td>
                  <td className="px-6 py-8">
                    <span className="text-sm font-black text-slate-100 uppercase block tracking-tight">{log.dealerName}</span>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{log.location} • {log.date}</span>
                  </td>
                  <td className="px-6 py-8 font-mono font-black text-base italic tracking-tighter">
                    <span className={log.type === "Collection" ? "text-emerald-400" : log.type === "Outstanding" ? "text-red-400" : "text-white"}>
                      {log.type === "Credit Note" ? "(-)" : ""} ₹{log.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-8"><TypeBadge type={log.type} /></td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-2 h-2 rounded-full", log.status === "Settled" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]")} />
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{log.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="p-3 bg-slate-900 rounded-xl inline-block group-hover:bg-indigo-600 transition-colors">
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERACTIVE DRAWER: Payment & Dispatch Details */}
      {selectedDealer && (
        <div className="fixed inset-0 z-[3000] flex justify-end">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedDealer(null)} />
          <div className="relative w-full max-w-2xl bg-[#030816] border-l border-slate-800 shadow-2xl h-full animate-in slide-in-from-right duration-500 overflow-y-auto">
            <div className="p-10 space-y-10 pb-32">
              <div className="flex justify-between items-center">
                <div className="p-4 bg-slate-900 rounded-2xl cursor-pointer hover:bg-red-500/10 hover:text-red-500 transition-all" onClick={() => setSelectedDealer(null)}><X size={24}/></div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Master Ledger</p>
                  <p className="text-xs font-mono font-black text-indigo-500 tracking-widest">{selectedDealer.reference}</p>
                </div>
              </div>

              {/* DISPATCH STYLE CARD */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-indigo-500/20 rounded-[3rem] p-10 space-y-8 relative overflow-hidden ring-1 ring-white/5 shadow-3xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
                
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-full tracking-widest border border-indigo-500/20">
                      {selectedDealer.type}
                    </span>
                    <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none decoration-indigo-500 underline underline-offset-8">{selectedDealer.dealerName}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Clock size={14} className="text-indigo-500" /> Issued on {selectedDealer.date}
                    </p>
                  </div>
                  <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl shadow-inner">
                    <Package className="text-indigo-400" size={32} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-800/50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Order Reference</p>
                    <p className="text-xl font-black text-white">{selectedDealer.orderId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Items Count</p>
                    <p className="text-xl font-black text-white">{selectedDealer.items} SKU Units</p>
                  </div>
                </div>

                <div className="pt-10 flex justify-between items-center gap-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Amount Due</p>
                      <p className="text-4xl font-black text-white italic tracking-tighter">₹{selectedDealer.amount.toLocaleString()}</p>
                   </div>
                   <button 
                    onClick={() => handleAction("Dispatch")}
                    className="flex-1 bg-white text-black px-8 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-400 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95"
                   >
                      {selectedDealer.type === "Outstanding" ? "Authorize Dispatch" : "Confirm Settlement"}
                   </button>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-slate-800" /> Transaction Audit Trail
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Invoice Finalized", detail: "Generated via Torque ERP", status: "done" },
                    { label: "Dealer Notified", detail: "Sent via WhatsApp/SMS", status: "done" },
                    { label: "Payment Status", detail: selectedDealer.status, status: selectedDealer.status === "Settled" ? "done" : "pending" },
                    { label: "Shipment Release", detail: "Pending Approval", status: "pending" }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 relative group">
                      <div className="flex flex-col items-center">
                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center z-10", step.status === "done" ? "bg-indigo-500 border-indigo-400 text-white" : "bg-slate-950 border-slate-800 text-slate-800")}>
                          {step.status === "done" && <CheckCircle2 size={12} />}
                        </div>
                        {i !== 3 && <div className="w-[2px] h-12 bg-slate-800 group-hover:bg-indigo-500/30 transition-colors" />}
                      </div>
                      <div className="space-y-1">
                        <p className={cn("text-xs font-black uppercase tracking-widest", step.status === "done" ? "text-white" : "text-slate-600")}>{step.label}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTION PANELS: Credit Notes & Outstanding Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActionPanel 
          title="Outstanding Management" 
          description="Identify high-risk dealers and automate recovery alerts for payments past 15-day cycle." 
          buttonLabel="Send Bulk Alerts" 
          onClick={() => setActiveModal("Reminder")} 
          color="border-red-500/20 shadow-red-900/5 hover:bg-red-500/[0.02]" 
          icon={<Send className="text-red-500" size={24} />}
        />
        <ActionPanel 
          title="Limited Credit Notes" 
          description="Issue reconciliation credits for warranty claims or damaged shipments. Multi-level approval required." 
          buttonLabel="Draft Credit Note" 
          onClick={() => setActiveModal("CreditNote")} 
          color="border-indigo-500/20 shadow-indigo-900/5 hover:bg-indigo-500/[0.02]" 
          icon={<FileText className="text-indigo-400" size={24} />}
        />
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, value, icon, trend }: any) {
  return (
    <div className="bg-[#0b1224]/80 border border-slate-800/60 p-8 rounded-[3rem] space-y-5 hover:border-indigo-500/40 transition-all group relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
      <div className="flex justify-between items-start">
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform shadow-xl">{icon}</div>
        <span className="text-[9px] font-black text-slate-500 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 uppercase tracking-widest">{trend}</span>
      </div>
      <div>
        <h4 className="text-4xl font-black text-white italic tracking-tighter leading-none mb-1 group-hover:translate-x-1 transition-transform">{value}</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const styles: any = {
    Collection: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    "Credit Note": "text-indigo-400 bg-indigo-500/5 border-indigo-500/20",
    Outstanding: "text-red-400 bg-red-500/5 border-red-500/20"
  };
  return <span className={cn("px-4 py-1.5 rounded-xl text-[9px] font-black uppercase border tracking-[0.2em]", styles[type])}>{type}</span>;
}

function ActionPanel({ title, description, buttonLabel, onClick, color, icon }: any) {
  return (
    <div className={cn("p-10 bg-[#0b1224]/40 border rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-8 group transition-all duration-500 backdrop-blur-sm", color)}>
      <div className="flex items-center gap-6 text-center md:text-left">
        <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800/50 hidden md:block group-hover:shadow-2xl transition-all">{icon}</div>
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase italic text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">{title}</h3>
          <p className="text-[11px] font-bold text-slate-500 max-w-sm uppercase tracking-wide leading-relaxed">{description}</p>
        </div>
      </div>
      <button onClick={onClick} className="whitespace-nowrap px-10 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95">
        {buttonLabel}
      </button>
    </div>
  );
}