import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, ArrowUpRight, ArrowDownLeft, 
  Receipt, Wallet, ArrowRightLeft, CheckCircle2, 
  AlertCircle, TrendingUp, Download, Search, X,
  History, DollarSign, Plus, Filter, Trash2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Production Types ---
type TransactionStatus = 'Settled' | 'Pending' | 'Flagged';
type TransactionType = 'Payment' | 'Credit Note' | 'Settlement';

interface LedgerEntry {
  id: string;
  date: string;
  from: string;
  to: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  invoiceId: string;
}

const INITIAL_LEDGER: LedgerEntry[] = [
  { id: 'TXN-9021', date: '2026-03-24', from: 'Vikas Auto (Dealer)', to: 'Rajesh Diesel (Dist)', amount: 45000, type: 'Payment', status: 'Settled', invoiceId: 'INV-882' },
  { id: 'TXN-9022', date: '2026-03-23', from: 'Rajesh Diesel (Dist)', to: 'Torque Admin', amount: 125000, type: 'Settlement', status: 'Pending', invoiceId: 'INV-880' },
  { id: 'TXN-9023', date: '2026-03-22', from: 'Torque Admin', to: 'Vikas Auto (Dealer)', amount: 2500, type: 'Credit Note', status: 'Settled', invoiceId: 'CR-102' },
];

export default function FinancialClosure() {
  // --- State Management ---
  const [ledger, setLedger] = useState<LedgerEntry[]>(INITIAL_LEDGER);
  const [activeFilter, setActiveFilter] = useState<TransactionStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<LedgerEntry | null>(null);
  const [isCreditNoteModalOpen, setIsCreditNoteModalOpen] = useState(false);

  // --- Logic: Search & Filter ---
  const filteredLedger = useMemo(() => {
    return ledger.filter(txn => {
      const matchesFilter = activeFilter === 'All' || txn.status === activeFilter;
      const matchesSearch = 
        txn.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery, ledger]);

  // --- Actions: Functional Buttons ---
  const handleSettlement = (id: string) => {
    setLedger(prev => prev.map(t => t.id === id ? { ...t, status: 'Settled' } : t));
    setSelectedTxn(null);
    alert(`Transaction ${id} has been settled successfully.`);
  };

  const handleCreateCreditNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEntry: LedgerEntry = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      from: 'Torque Admin',
      to: formData.get('to') as string,
      amount: Number(formData.get('amount')),
      type: 'Credit Note',
      status: 'Pending',
      invoiceId: `CR-${Math.floor(100 + Math.random() * 900)}`,
    };
    setLedger([newEntry, ...ledger]);
    setIsCreditNoteModalOpen(false);
  };

  const handleExport = () => {
    const dataString = JSON.stringify(filteredLedger, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Financial_Report_${new Date().toLocaleDateString()}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans selection:bg-emerald-500/30">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
              FINANCIAL <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">CLOSURE</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-2">Enterprise Settlement Management</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handleExport}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 border border-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 transition-all active:scale-95"
            >
              <Download size={16} /> Export
            </button>
            <button 
              onClick={() => setIsCreditNoteModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all active:scale-95"
            >
              <Plus size={16} /> New Credit Note
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Receivables" value={`₹${(ledger.reduce((acc, curr) => acc + curr.amount, 0) / 100000).toFixed(1)}L`} icon={<ArrowDownLeft className="text-emerald-400" />} trend="+12%" />
          <StatCard title="Pending Items" value={ledger.filter(t => t.status === 'Pending').length.toString()} icon={<History className="text-orange-400" />} trend="Alert" />
          <StatCard title="Credit Limit" value="₹5.0L" icon={<CreditCard className="text-cyan-400" />} trend="Static" />
          <StatCard title="System Health" value="98%" icon={<TrendingUp className="text-purple-400" />} trend="Stable" />
        </div>

        {/* Table Container */}
        <div className="bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-slate-800 flex flex-wrap justify-between items-center gap-6 bg-slate-950/40">
            <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/50">
              {(['All', 'Settled', 'Pending', 'Flagged'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                    activeFilter === tab ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative group flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={14} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, Invoice or Party..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-bold text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800/50">
                  <th className="p-6">Transaction Flow</th>
                  <th className="p-6">Meta Data</th>
                  <th className="p-6">Type</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {filteredLedger.length > 0 ? filteredLedger.map((txn) => (
                  <tr 
                    key={txn.id} 
                    className="group hover:bg-emerald-500/[0.02] transition-colors cursor-pointer" 
                    onClick={() => setSelectedTxn(txn)}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-black text-white italic truncate max-w-[100px]">{txn.from}</span>
                        <ArrowRightLeft size={12} className="text-slate-700 shrink-0" />
                        <span className="text-[11px] font-black text-white italic truncate max-w-[100px]">{txn.to}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-[10px] font-bold text-slate-400 leading-none">{txn.id}</p>
                      <p className="text-[8px] text-slate-600 font-black uppercase mt-1.5">Ref: {txn.invoiceId}</p>
                    </td>
                    <td className="p-6">
                      <span className={cn(
                        "text-[8px] font-black uppercase px-2.5 py-1 rounded-md border",
                        txn.type === 'Payment' ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                        txn.type === 'Credit Note' ? "border-orange-500/20 text-orange-500 bg-orange-500/5" : "border-cyan-500/20 text-cyan-500 bg-cyan-500/5"
                      )}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="p-6 font-black text-white italic text-sm">
                      ₹{txn.amount.toLocaleString()}
                    </td>
                    <td className="p-6">
                      <div className={cn(
                        "flex items-center gap-2 text-[9px] font-black uppercase",
                        txn.status === 'Settled' ? "text-emerald-500" : "text-orange-500"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", txn.status === 'Settled' ? "bg-emerald-500" : "bg-orange-500 animate-pulse")} />
                        {txn.status}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2.5 hover:bg-slate-900 rounded-xl text-slate-500 hover:text-emerald-500 transition-all border border-transparent hover:border-slate-800">
                        <Receipt size={16}/>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-20 text-center">
                      <AlertCircle className="mx-auto text-slate-800 mb-4" size={40} />
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No transactions match your criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL: Credit Note Creation */}
      <AnimatePresence>
        {isCreditNoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCreditNoteModalOpen(false)} />
            <motion.form 
              onSubmit={handleCreateCreditNote}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="relative w-full max-w-lg bg-[#0B0F18] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-xl font-black text-white italic uppercase mb-8">Initiate Credit Note</h2>
              <div className="space-y-5">
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Recipient Party</label>
                  <input name="to" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-emerald-500" placeholder="e.g. Vikas Auto" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Credit Amount (₹)</label>
                  <input name="amount" type="number" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-emerald-500" placeholder="0.00" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsCreditNoteModalOpen(false)} className="flex-1 py-4 border border-slate-800 text-slate-500 rounded-xl text-[10px] font-black uppercase hover:bg-slate-900 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500 transition-all">Generate Note</button>
                </div>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Transaction Details & Settlement */}
      <AnimatePresence>
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedTxn(null)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative w-full max-w-xl bg-[#0B0F18] border border-slate-800 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <button onClick={() => setSelectedTxn(null)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
              </div>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-[1.5rem] flex items-center justify-center text-emerald-500 shadow-inner">
                  <DollarSign size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Settlement Flow</h2>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1.5">{selectedTxn.id}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <DetailBox label="Debited From" value={selectedTxn.from} />
                  <DetailBox label="Credited To" value={selectedTxn.to} />
                </div>

                <div className="p-8 bg-slate-950 border border-slate-800/50 rounded-[2rem]">
                  <p className="text-[10px] font-black text-slate-600 uppercase mb-4 tracking-widest">Amount to Reconcile</p>
                  <div className="flex justify-between items-end">
                    <p className="text-4xl font-black text-white italic tracking-tighter">₹{selectedTxn.amount.toLocaleString()}</p>
                    <span className={cn(
                      "text-[9px] font-black uppercase px-3 py-1 rounded-full border",
                      selectedTxn.status === 'Settled' ? "border-emerald-500 text-emerald-500" : "border-orange-500 text-orange-500"
                    )}>{selectedTxn.status}</span>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  {selectedTxn.status === 'Pending' && (
                    <button 
                      onClick={() => handleSettlement(selectedTxn.id)}
                      className="w-full py-5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all active:scale-95"
                    >
                      Authorize Settlement
                    </button>
                  )}
                  <button className="w-full py-5 bg-slate-900 border border-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-600 transition-all">
                    Download Ledger Statement
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Production Ready Helper Components ---
function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-[#0B0F18] border border-slate-800 p-7 rounded-[2.5rem] hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-slate-900 rounded-[1.2rem] border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">{icon}</div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black tracking-tighter border",
          trend.includes('+') ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20"
        )}>{trend}</div>
      </div>
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-3xl font-black text-white italic tracking-tighter">{value}</p>
    </div>
  );
}

function DetailBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-5 bg-slate-950/40 border border-slate-800/60 rounded-2xl">
      <p className="text-[8px] font-black text-slate-600 uppercase mb-2 tracking-widest">{label}</p>
      <p className="text-xs text-white font-black italic uppercase tracking-tight truncate">{value}</p>
    </div>
  );
}