import React, { useState, useMemo } from "react";
import { 
  BarChart3, PieChart, AlertOctagon, RefreshCcw, 
  TrendingUp, Search, Download, Filter, 
  ChevronRight, Calendar, ArrowUpRight, ArrowDownRight,
  ShieldAlert, UserCheck, MoreHorizontal, FileSpreadsheet, X
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
type ReportType = "Sales" | "Pending" | "Returns" | "Fraud";

interface ReportData {
  id: string;
  entity: string;
  value: number;
  status: "High" | "Medium" | "Low" | "Resolved";
  date: string;
  category: string;
  growth?: number;
  details?: string;
}

const DUMMY_REPORTS: Record<ReportType, ReportData[]> = {
  Sales: [
    { id: "REP-101", entity: "Apex Motors", value: 4500000, status: "High", date: "2026-03", category: "Performance Parts", growth: 12.5, details: "Primary revenue driver: Carbon fiber hoods." },
    { id: "REP-102", entity: "Global Auto", value: 2800000, status: "Medium", date: "2026-03", category: "Accessories", growth: -2.4, details: "Slight dip due to supply chain delays in alloy wheels." },
    { id: "REP-103", entity: "SR Auto House", value: 1200000, status: "Low", date: "2026-03", category: "Engine Components", growth: 5.8, details: "Consistent growth in high-performance intake manifolds." },
  ],
  Pending: [
    { id: "INV-882", entity: "Zenith Spares", value: 85000, status: "High", date: "Overdue 12d", category: "Payment Pending", details: "Awaiting wire transfer confirmation." },
    { id: "INV-901", entity: "Elite Wheels", value: 125000, status: "Medium", date: "Due in 2d", category: "Partial Paid", details: "50% advance received; balance pending dispatch." },
  ],
  Returns: [
    { id: "RET-441", entity: "Apex Motors", value: 12000, status: "Resolved", date: "2026-03-21", category: "Warranty Claim", details: "Manufacturing defect in LED assembly. Replacement shipped." },
    { id: "RET-445", entity: "Metro Spares", value: 4500, status: "Medium", date: "2026-03-19", category: "Damaged in Transit", details: "Logistics insurance claim initiated." },
  ],
  Fraud: [
    { id: "FRD-002", entity: "Unknown IP / Proxy", value: 0, status: "High", date: "2026-03-22", category: "Login Attack", details: "15 failed attempts from non-whitelisted IP (192.168.X.X)." },
    { id: "FRD-009", entity: "Duplicate Serial", value: 150000, status: "High", date: "2026-03-15", category: "Warranty Fraud", details: "Serial #TC-9902 submitted twice across different regions." },
  ]
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState<ReportType>("Sales");
  const [isExporting, setIsExporting] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ReportData | null>(null);

  // --- Logic Fix: Functional Buttons ---
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`SYSTEM: ${activeTab} Ledger has been exported to torque_craft_vault.csv`);
    }, 1200);
  };

  const handleRowAction = (item: ReportData) => {
    setSelectedItem(item);
  };

  const filteredData = useMemo(() => {
    return DUMMY_REPORTS[activeTab].filter(item => 
      item.entity.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeTab, search]);

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-10 space-y-10 text-slate-200 selection:bg-indigo-500/30">
      
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <BarChart3 className="text-indigo-400" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white underline decoration-indigo-500/30 decoration-4 underline-offset-8">Analytics Vault</h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] pl-1 font-mono">Torque Craft Intelligence</p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH LEDGER ID / ENTITY..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-indigo-500 outline-none transition-all focus:ring-4 focus:ring-indigo-500/5"
            />
          </div>
          <button 
            onClick={handleExport}
            className="p-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white shadow-xl transition-all active:scale-95 disabled:opacity-50 group"
            disabled={isExporting}
          >
            {isExporting ? <RefreshCcw size={20} className="animate-spin" /> : <FileSpreadsheet size={20} className="group-hover:rotate-12 transition-transform"/>}
          </button>
        </div>
      </header>

      {/* TABS */}
      <nav className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 border border-slate-800/50 rounded-[2rem] w-fit backdrop-blur-xl">
        {[
          { id: "Sales", label: "Dealer Sales", icon: <TrendingUp size={14}/> },
          { id: "Pending", label: "Payments", icon: <Calendar size={14}/> },
          { id: "Returns", label: "Returns", icon: <RefreshCcw size={14}/> },
          { id: "Fraud", label: "Fraud Summary", icon: <ShieldAlert size={14}/> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ReportType)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
              activeTab === tab.id 
                ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40" 
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* DATA TABLE */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-slate-950/40 border border-slate-800/50 rounded-[3rem] overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/20">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 italic flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-indigo-500" /> Active Ledger // {activeTab}
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-slate-500 uppercase">Live Feed</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800/50 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                    <th className="px-10 py-6">Reference</th>
                    <th className="px-6 py-6">Entity</th>
                    <th className="px-6 py-6 text-right">Valuation</th>
                    <th className="px-10 py-6 text-right">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/20">
                  {filteredData.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => handleRowAction(item)}
                      className="group hover:bg-indigo-500/[0.03] transition-all cursor-pointer border-l-2 border-transparent hover:border-indigo-500"
                    >
                      <td className="px-10 py-8 font-mono text-[11px] text-indigo-400/80 font-black">#{item.id}</td>
                      <td className="px-6 py-8">
                        <p className="text-sm font-black text-white uppercase tracking-tight">{item.entity}</p>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{item.date} • {item.category}</p>
                      </td>
                      <td className="px-6 py-8 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-base font-black text-white italic tracking-tighter">₹{item.value.toLocaleString()}</span>
                          {item.growth !== undefined && (
                            <span className={cn("text-[9px] font-black flex items-center gap-1", item.growth > 0 ? "text-emerald-500" : "text-red-500")}>
                              {item.growth > 0 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                              {Math.abs(item.growth)}%
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all text-slate-500 group-hover:text-white">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <SummaryCard 
            title="Active Volume" 
            value={activeTab === "Sales" ? "₹8.52 Cr" : activeTab === "Fraud" ? "2 Cases" : "₹12.42 L"} 
            desc={`Net ${activeTab} aggregation`}
            icon={activeTab === "Fraud" ? <AlertOctagon className="text-red-500" /> : <TrendingUp className="text-emerald-400" />}
          />
          
          <div className="bg-[#0b1224] border border-slate-800/60 p-10 rounded-[3rem] space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Core Metrics</h4>
            <div className="space-y-5">
              <InsightRow label="Top Performer" value="Apex Motors" />
              <InsightRow label="System Risk" value={activeTab === "Fraud" ? "CRITICAL" : "LOW"} color={activeTab === "Fraud" ? "text-red-500" : "text-emerald-500"} />
              <InsightRow label="Cycle Time" value="4.2 Days" />
            </div>
            <button 
               onClick={() => alert("Directing to Audit Logs...")}
               className="w-full py-5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Master Audit Log
            </button>
          </div>

          {activeTab === "Fraud" && (
            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] space-y-4 animate-pulse">
              <div className="flex items-center gap-3 text-red-500">
                <ShieldAlert size={24} />
                <h4 className="text-xs font-black uppercase tracking-widest italic">Action Required</h4>
              </div>
              <p className="text-[10px] font-bold text-red-400/70 leading-relaxed uppercase tracking-wide">
                Detected anomalous login patterns. Secure account protocols initiated.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedItem(null)} />
          <div className="relative w-full max-w-lg bg-[#030816] border border-slate-800 p-10 rounded-[3rem] shadow-3xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] font-mono">#{selectedItem.id}</p>
                <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">{selectedItem.entity}</h2>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-3 bg-slate-900 rounded-xl text-slate-500 hover:text-white transition-colors"><X size={20}/></button>
            </div>
            
            <div className="space-y-8">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Internal Note</p>
                <p className="text-xs font-bold text-slate-300 uppercase leading-relaxed">{selectedItem.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Status</p>
                    <p className="text-xs font-black text-white uppercase">{selectedItem.status}</p>
                 </div>
                 <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Value</p>
                    <p className="text-xs font-black text-white uppercase italic">₹{selectedItem.value.toLocaleString()}</p>
                 </div>
              </div>

              <button 
                onClick={() => {alert("Report Flagged for Admin Review"); setSelectedItem(null);}}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40"
              >
                Flag for Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SummaryCard({ title, value, desc, icon }: any) {
  return (
    <div className="bg-[#0b1224] border border-slate-800/60 p-10 rounded-[3rem] group hover:border-indigo-500/40 transition-all relative overflow-hidden shadow-2xl">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-[80px]" />
      <div className="flex justify-between items-start mb-8">
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform shadow-xl">
          {icon}
        </div>
        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
          <MoreHorizontal size={14} className="text-slate-600" />
        </div>
      </div>
      <div className="space-y-2 relative z-10">
        <h4 className="text-5xl font-black italic tracking-tighter text-white leading-none">{value}</h4>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{title}</p>
        <p className="text-[9px] font-bold text-indigo-500/80 uppercase mt-4">{desc}</p>
      </div>
    </div>
  );
}

function InsightRow({ label, value, color = "text-slate-200" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-slate-800/40 last:border-0">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className={cn("text-xs font-black uppercase italic", color)}>{value}</span>
    </div>
  );
}