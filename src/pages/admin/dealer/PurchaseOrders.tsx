import React from 'react';
import { 
  ClipboardList, 
  Search, 
  Plus, 
  ChevronRight, 
  Download,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const purchaseOrders = [
  { id: 'PO-2025-001', date: '2025-01-10', distributor: 'TechSupply Co.', product: 'CyberCore X1', quantity: 50, price: '$1,100', total: '$55,000', status: 'PAID', invoice: 'INV-001' },
  { id: 'PO-2025-002', date: '2025-02-05', distributor: 'Global Components Inc.', product: 'NeoLink v4', quantity: 100, price: '$650', total: '$65,000', status: 'PAID', invoice: 'INV-002' },
  { id: 'PO-2025-003', date: '2025-02-20', distributor: 'TechSupply Co.', product: 'FutureVision', quantity: 75, price: '$1,350', total: '$101,250', status: 'PENDING', invoice: 'INV-003' },
  { id: 'PO-2025-004', date: '2025-03-01', distributor: 'MegaDistributor Ltd.', product: 'TurboBoost Pro', quantity: 25, price: '$850', total: '$21,250', status: 'PAID', invoice: 'INV-004' },
  { id: 'PO-2025-005', date: '2025-03-08', distributor: 'TechSupply Co.', product: 'MegaDrive Kit', quantity: 40, price: '$550', total: '$22,000', status: 'PAID', invoice: 'INV-005' },
  { id: 'PO-2025-006', date: '2025-03-12', distributor: 'Global Components Inc.', product: 'CyberCore X1', quantity: 30, price: '$1,120', total: '$33,600', status: 'PAID', invoice: 'INV-006' },
];

export default function PurchaseOrders() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">PURCHASE ORDERS</h2>
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all group">
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          NEW PURCHASE ORDER
        </button>
      </div>

      <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50 overflow-hidden relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Purchase Orders</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search POs..." 
                className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-64"
              />
            </div>
            <select className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PO ID</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">DISTRIBUTOR NAME</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PRODUCT NAME</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">QUANTITY (QTY)</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PRICE (DEALER)</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">TOTAL AMOUNT</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PAYMENT STATUS</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">INVOICE</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {purchaseOrders.map((po, i) => (
                <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white tracking-tight">{po.id}</span>
                      <span className="text-[10px] font-bold text-slate-500">{po.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-white">{po.distributor}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-slate-400">{po.product}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-black text-cyan-400">{po.quantity}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-400">{po.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-emerald-400">{po.total}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                      po.status === 'PAID' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    )}>
                      {po.status === 'PAID' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {po.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="flex items-center gap-2 text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors">
                      <FileText className="w-4 h-4" />
                      {po.invoice}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 ml-auto group/btn">
                      View Details
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing 1-6 of 47 purchase orders</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-400 hover:text-white transition-all">Previous</button>
            <button className="w-10 h-10 rounded-xl bg-cyan-500 text-white text-xs font-black shadow-lg shadow-cyan-500/20">1</button>
            <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-400 hover:text-white transition-all">2</button>
            <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-400 hover:text-white transition-all">3</button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black text-slate-400 hover:text-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
