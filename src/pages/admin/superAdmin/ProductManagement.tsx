import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Package, Tag, ShieldCheck, QrCode, Power, PowerOff,
  MoreVertical, Layers, BarChart3, Trash2, X, Check, AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  batchNo: string;
  warrantyMonths: number;
  qrMapped: number;
  totalUnits: number;
  status: 'Active' | 'Inactive';
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 'PROD-001', name: 'Aviation Turbine GFX', sku: 'GFX-990-DELUXE', category: 'Engines', batchNo: 'B2026-X1', warrantyMonths: 24, qrMapped: 150, totalUnits: 200, status: 'Active' },
  { id: 'PROD-002', name: 'High-Lift Wing Flap', sku: 'FLAP-H7', category: 'Structure', batchNo: 'B2026-Z9', warrantyMonths: 12, qrMapped: 45, totalUnits: 100, status: 'Inactive' },
  { id: 'PROD-003', name: 'Avionics Smart Panel', sku: 'AV-SP-V2', category: 'Electronics', batchNo: 'B2025-A5', warrantyMonths: 36, qrMapped: 210, totalUnits: 250, status: 'Active' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(['Engines', 'Structure', 'Electronics']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState<'SKU' | 'Category' | 'Warranty' | null>(null);
  
  // Form States
  const [newSku, setNewSku] = useState({ name: '', sku: '', category: 'Engines', batch: '', warranty: 12 });
  const [newCat, setNewCat] = useState('');

  // --- Handlers ---
  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
    ));
  };

  const handleAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `PROD-00${products.length + 1}`,
      name: newSku.name,
      sku: newSku.sku,
      category: newSku.category,
      batchNo: newSku.batch,
      warrantyMonths: newSku.warranty,
      qrMapped: 0,
      totalUnits: 100,
      status: 'Active'
    };
    setProducts([product, ...products]);
    setShowModal(null);
    setNewSku({ name: '', sku: '', category: 'Engines', batch: '', warranty: 12 });
  };

  const handleAddCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
    }
  };

  const deleteCategory = (catName: string) => {
    setCategories(categories.filter(c => c !== catName));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Reusable Modal ---
  const ActionModal = ({ title, onClose, children }: any) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0B0F18] border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-sm font-black uppercase tracking-widest text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              INVENTORY <span className="text-cyan-500">PRO</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-2">Centralized SKU & Batch Control</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowModal('Category')}
              className="flex items-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
            >
              <Layers size={14} className="text-cyan-500" /> Categories
            </button>
            <button 
              onClick={() => setShowModal('SKU')}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20"
            >
              <Plus size={14} /> New SKU
            </button>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Filter by SKU or Product Name..."
              className="w-full bg-[#0B0F18] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-[#0B0F18] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><BarChart3 size={18} /></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active</span>
            </div>
            <span className="text-xl font-black text-white">{products.filter(p => p.status === 'Active').length}</span>
          </div>
          <div className="bg-[#0B0F18] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg"><QrCode size={18} /></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">QR Synced</span>
            </div>
            <span className="text-xl font-black text-white">82%</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "bg-[#0B0F18] border rounded-[2rem] p-6 relative group transition-all duration-500 shadow-2xl",
                  product.status === 'Active' ? "border-slate-800/50 hover:border-cyan-500/40" : "border-red-900/20 opacity-60 grayscale"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-500 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                    <Package size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleStatus(product.id)}
                      className={cn(
                        "p-3 rounded-xl transition-all",
                        product.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      )}
                    >
                      {product.status === 'Active' ? <Power size={18} /> : <PowerOff size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-black text-lg tracking-tight uppercase italic">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-black text-cyan-600 tracking-widest uppercase">{product.sku}</span>
                      <div className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase">{product.category}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                      <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Batch ID</p>
                      <p className="text-[11px] font-bold text-slate-300">{product.batchNo}</p>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                      <p className="text-[8px] font-black text-slate-600 uppercase mb-1">Warranty</p>
                      <p className="text-[11px] font-bold text-slate-300">{product.warrantyMonths} Months</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/50">
                     <div className="flex justify-between text-[10px] font-bold mb-2">
                        <span className="text-slate-500 uppercase">QR Mapping</span>
                        <span className="text-cyan-500">{product.qrMapped}/{product.totalUnits}</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <motion.div 
                          className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${(product.qrMapped/product.totalUnits)*100}%` }}
                        />
                     </div>
                  </div>

                  <button className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="text-cyan-500" /> Warranty Rules
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- MODALS --- */}
        <AnimatePresence>
          {showModal === 'SKU' && (
            <ActionModal title="Register New SKU" onClose={() => setShowModal(null)}>
              <form onSubmit={handleAddSku} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Product Details</label>
                  <input 
                    required
                    type="text" placeholder="Product Name (e.g. Smart Hub)" 
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition-all"
                    value={newSku.name}
                    onChange={(e) => setNewSku({...newSku, name: e.target.value})}
                  />
                  <input 
                    required
                    type="text" placeholder="SKU ID (e.g. SH-001X)" 
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition-all"
                    value={newSku.sku}
                    onChange={(e) => setNewSku({...newSku, sku: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Category</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 appearance-none"
                      value={newSku.category}
                      onChange={(e) => setNewSku({...newSku, category: e.target.value})}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Batch No</label>
                    <input 
                      required
                      type="text" placeholder="B-2026" 
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm outline-none focus:border-cyan-500 transition-all"
                      value={newSku.batch}
                      onChange={(e) => setNewSku({...newSku, batch: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-cyan-600 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-4 hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20">
                  Initialize SKU Mapping
                </button>
              </form>
            </ActionModal>
          )}

          {showModal === 'Category' && (
            <ActionModal title="Category Master" onClose={() => setShowModal(null)}>
              <div className="space-y-4">
                <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {categories.map(cat => (
                    <div key={cat} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl border border-slate-800 group hover:border-slate-700 transition-all">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">{cat}</span>
                      <button 
                        onClick={() => deleteCategory(cat)}
                        className="text-slate-600 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-800">
                  <input 
                    type="text" placeholder="New Category..." 
                    className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm outline-none focus:border-cyan-500"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button 
                    onClick={handleAddCategory}
                    className="p-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white transition-all shadow-lg shadow-cyan-500/10"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </ActionModal>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}