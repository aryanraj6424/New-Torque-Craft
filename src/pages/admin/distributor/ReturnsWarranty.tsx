import React, { useState, useEffect, useMemo } from "react";
import { 
  ShieldCheck, Clock, CheckCircle2, 
  Image as ImageIcon, Send, Search, 
  Filter, UserCheck, X, AlertTriangle,
  Eye, Download, ArrowUpRight
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
interface WarrantyCase {
  id: string;
  dealerName: string;
  customerName: string;
  productSerial: string;
  claimAmount: number;
  reason: string;
  status: "Pending" | "Verified" | "Approved" | "Forwarded" | "Rejected";
  dateSubmitted: string;
  evidenceCount: number;
  priority: "High" | "Medium" | "Low";
}

const INITIAL_CASES: WarrantyCase[] = [
  { 
    id: "WR-4021", 
    dealerName: "Apex Motors Noida", 
    customerName: "Rahul Sharma", 
    productSerial: "TC-9921-X1", 
    claimAmount: 4500, 
    reason: "Manufacturing Defect - LED Unit", 
    status: "Pending", 
    dateSubmitted: "2026-03-22",
    evidenceCount: 3,
    priority: "Low" 
  },
  { 
    id: "WR-3950", 
    dealerName: "Global Auto Parts", 
    customerName: "John Doe", 
    productSerial: "TC-8840-Y2", 
    claimAmount: 28000, 
    reason: "Structural Integrity Issue", 
    status: "Verified", 
    dateSubmitted: "2026-03-20",
    evidenceCount: 5,
    priority: "High" 
  },
];

export default function ReturnsWarranty() {
  // Persistence Logic for Production
  const [cases, setCases] = useState<WarrantyCase[]>(() => {
    const saved = localStorage.getItem("torque_warranty_cases");
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<WarrantyCase | null>(null);

  useEffect(() => {
    localStorage.setItem("torque_warranty_cases", JSON.stringify(cases));
  }, [cases]);

  // --- Core Features: Approve / Forward / Verify ---
  const handleAction = (id: string, action: "Approve" | "Forward" | "Verify" | "Reject") => {
    setCases(prev => prev.map(c => {
      if (c.id === id) {
        if (action === "Approve") return { ...c, status: "Approved" };
        if (action === "Forward") return { ...c, status: "Forwarded" };
        if (action === "Verify") return { ...c, status: "Verified" };
        if (action === "Reject") return { ...c, status: "Rejected" };
      }
      return c;
    }));
    setSelectedCase(null);
  };

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesSearch = c.productSerial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.dealerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, cases]);

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 space-y-8 text-slate-200">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <ShieldCheck className="text-emerald-400" size={24} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white underline decoration-emerald-500/30">Claims Engine</h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] pl-1 font-mono">Operations Control Panel</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Track Case Status: Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-emerald-500/50"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
            <option value="Approved">Approved</option>
            <option value="Forwarded">Forwarded</option>
          </select>

          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="SERIAL / DEALER ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-emerald-500/50 outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {/* CASE STATUS TRACKER (Production Metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard label="Active Queue" value={cases.filter(c => c.status === "Pending").length} icon={<Clock className="text-orange-400" />} />
        <StatusCard label="Total Verified" value={cases.filter(c => c.status === "Verified").length} icon={<ShieldCheck className="text-blue-400" />} />
        <StatusCard label="Final Approved" value={cases.filter(c => c.status === "Approved").length} icon={<CheckCircle2 className="text-emerald-400" />} />
        <StatusCard label="Admin Review" value={cases.filter(c => c.status === "Forwarded").length} icon={<Send className="text-indigo-400" />} />
      </div>

      {/* REVIEW DEALER CASES: TABLE */}
      <div className="bg-slate-900/20 border border-slate-800/50 rounded-[2rem] backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800/50 bg-slate-900/40 flex justify-between items-center">
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <Filter size={14} /> Submission Queue ({filteredCases.length})
          </h2>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-[#0b1224]">
                <th className="px-8 py-5 border-b border-slate-800">Case Identifier</th>
                <th className="px-6 py-5 border-b border-slate-800">Dealer Authority</th>
                <th className="px-6 py-5 border-b border-slate-800 text-center">Priority</th>
                <th className="px-6 py-5 border-b border-slate-800">Claim Value</th>
                <th className="px-6 py-5 border-b border-slate-800">Status</th>
                <th className="px-8 py-5 border-b border-slate-800 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredCases.map((item) => (
                <tr 
                  key={item.id} 
                  className="group hover:bg-emerald-500/[0.03] transition-colors cursor-pointer" 
                  onClick={() => setSelectedCase(item)}
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white font-mono leading-none mb-1">#{item.id}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{item.productSerial}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-200 uppercase tracking-tight">{item.dealerName}</span>
                      <span className="text-[9px] text-slate-600 font-bold tracking-widest">{item.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={cn(
                      "text-[10px] font-black uppercase italic",
                      item.priority === "High" ? "text-red-500" : "text-slate-600"
                    )}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-mono font-bold text-emerald-500">
                    ₹{item.claimAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-6">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCases.length === 0 && (
            <div className="p-20 text-center text-slate-600 font-black uppercase tracking-[0.3em] text-xs">
              No matching records found
            </div>
          )}
        </div>
      </div>

      {/* VERIFY EVIDENCE: MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-end bg-black/90 backdrop-blur-md transition-all">
          <div className="w-full max-w-2xl h-full bg-[#0b1224] border-l border-slate-800 p-8 flex flex-col gap-8 shadow-[ -20px_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <span className="bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase italic">Live Case</span>
                   <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Review #{selectedCase.id}</h2>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Serial: {selectedCase.productSerial}</p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full text-slate-500 transition-colors"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-10">
              {/* Evidence Verification Grid */}
              <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                  <ImageIcon size={14} className="text-emerald-500" /> Evidence Authenticity ({selectedCase.evidenceCount} Files)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(selectedCase.evidenceCount)].map((_, i) => (
                    <div key={i} className="group relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/5 opacity-50">
                         <ImageIcon size={30} className="text-slate-800" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex gap-2 w-full">
                          <button className="flex-1 bg-white/10 backdrop-blur-md py-2 rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-1 hover:bg-white/20 transition-all"><Eye size={12} /> View</button>
                          <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20"><Download size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Functional Details */}
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Reported Issue" value={selectedCase.reason} span />
                <DetailItem label="Dealer Entity" value={selectedCase.dealerName} />
                <DetailItem label="Claim Amount" value={`₹${selectedCase.claimAmount.toLocaleString()}`} color="text-emerald-400 font-mono" />
              </div>

              {/* Case Tracking Status */}
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50 space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Audit Trail</h4>
                <div className="space-y-4 relative before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                  <TimelineStep title="Dealer Submission" date={selectedCase.dateSubmitted} active />
                  <TimelineStep title="Logic Verification" date="Verified by AI Engine" active={selectedCase.status !== "Pending"} />
                  <TimelineStep title="Final Resolution" date={selectedCase.status} active={["Approved", "Forwarded", "Rejected"].includes(selectedCase.status)} />
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex gap-4 pt-6 border-t border-slate-800">
              {selectedCase.claimAmount < 10000 ? (
                <button 
                  onClick={() => handleAction(selectedCase.id, "Approve")}
                  className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck size={18} /> Approve Small Case
                </button>
              ) : (
                <button 
                  onClick={() => handleAction(selectedCase.id, "Forward")}
                  className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Forward to Admin
                </button>
              )}
              <button 
                onClick={() => handleAction(selectedCase.id, "Verify")}
                className="px-8 py-5 bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- PRODUCTION UI COMPONENTS ---

function StatusCard({ label, value, icon }: any) {
  return (
    <div className="bg-[#0b1224] border border-slate-800/50 p-6 rounded-[2rem] space-y-3 transition-all hover:border-emerald-500/20 hover:bg-slate-900/40 group">
      <div className="p-2 bg-slate-800/50 rounded-xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h4 className="text-2xl font-black text-white italic">{value}</h4>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function TimelineStep({ title, date, active }: { title: string, date: string, active?: boolean }) {
  return (
    <div className="flex items-start gap-4 pl-4">
      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-800")} />
      <div>
        <p className={cn("text-[10px] font-black uppercase", active ? "text-slate-200" : "text-slate-600")}>{title}</p>
        <p className="text-[9px] font-bold text-slate-500 italic">{date}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value, span, color }: any) {
  return (
    <div className={cn("bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50", span && "col-span-2")}>
      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-xs font-bold uppercase", color || "text-slate-300")}>{value}</p>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const themes: any = {
    Pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Verified: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Forwarded: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={cn("px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border", themes[status])}>
      {status}
    </span>
  );
}