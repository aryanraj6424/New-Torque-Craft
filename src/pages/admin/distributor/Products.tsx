// import React, { useState, useMemo } from "react";
// import { 
//   Package, 
//   Layers, 
//   AlertTriangle, 
//   CheckCircle2, 
//   Search, 
//   Filter, 
//   XCircle,
//   Plus, 
//   MoreVertical, 
//   ExternalLink,
//   Edit3,
//   BarChart3,
//   Settings2
// } from "lucide-react";
// import { cn } from "../../../lib/utils";

// // --- Types ---
// interface Product {
//   id: string;
//   sku: string;
//   name: string;
//   category: string;
//   stock: number;
//   minThreshold: number;
//   status: "In Stock" | "Low Stock" | "Out of Stock";
//   price: string;
// }

// // --- Mock Data ---
// const INITIAL_PRODUCTS: Product[] = [
//   { id: "PRD-101", sku: "TC-DSL-001", name: "High-Torque Diesel Engine", category: "Engines", stock: 45, minThreshold: 10, status: "In Stock", price: "₹1,45,000" },
//   { id: "PRD-102", sku: "TC-TRN-092", name: "6-Speed Transmission Kit", category: "Transmission", stock: 8, minThreshold: 15, status: "Low Stock", price: "₹82,000" },
//   { id: "PRD-103", sku: "TC-BRK-552", name: "Ceramic Brake Pads (Set)", category: "Braking", stock: 0, minThreshold: 5, status: "Out of Stock", price: "₹12,400" },
//   { id: "PRD-104", sku: "TC-SUS-110", name: "Nitrogen Shock Absorbers", category: "Suspension", stock: 112, minThreshold: 20, status: "In Stock", price: "₹34,000" },
//   { id: "PRD-105", sku: "TC-CLT-881", name: "Heavy Duty Clutch Plate", category: "Transmission", stock: 4, minThreshold: 10, status: "Low Stock", price: "₹18,500" },
// ];

// export default function Products() {
//   const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // --- Logic: Search & Filter ---
//   const filteredProducts = useMemo(() => {
//     return products.filter((p) => {
//       const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             p.sku.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesTab = filterStatus === "all" || p.status.replace(/\s+/g, '-').toLowerCase() === filterStatus;
//       return matchesSearch && matchesTab;
//     });
//   }, [searchTerm, filterStatus, products]);

//   return (
//     <div className="min-h-screen bg-[#020617] p-4 md:p-8 space-y-10 text-slate-200">
      
//       {/* 1. Header & Quick Actions */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//         <div>
//           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Inventory Control</h2>
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
//             <span className="w-6 h-[1px] bg-cyan-500"></span> Catalog & SKU Management
//           </p>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="relative flex-1 md:flex-none">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//             <input 
//               type="text" 
//               placeholder="SEARCH SKU OR NAME..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-12 pr-6 text-xs font-bold focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-80"
//             />
//           </div>
//           <button className="flex items-center gap-2 px-5 py-3 bg-cyan-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20">
//             <Plus size={16} /> Add Product
//           </button>
//         </div>
//       </div>

//       {/* 2. Inventory Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard label="Total Products" value={products.length} icon={Package} color="cyan" />
//         <StatCard label="Active SKUs" value="482" icon={Layers} color="purple" />
//         <StatCard label="Low Stock Alert" value={products.filter(p => p.status === "Low Stock").length} icon={AlertTriangle} color="amber" />
//         <StatCard label="Out of Stock" value={products.filter(p => p.status === "Out of Stock").length} icon={XCircle} color="red" />
//       </div>

//       {/* 3. Products Table */}
//       <div className="bg-slate-900/30 border border-slate-800/50 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
//         <div className="p-6 border-b border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><BarChart3 size={20}/></div>
//             <h3 className="font-black uppercase tracking-tight italic">Product Catalog</h3>
//           </div>
          
//           <div className="flex bg-black/40 p-1 rounded-xl border border-slate-800">
//             {["all", "in-stock", "low-stock", "out-of-stock"].map((tab) => (
//               <button 
//                 key={tab}
//                 onClick={() => setFilterStatus(tab)}
//                 className={cn(
//                   "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
//                   filterStatus === tab ? "bg-cyan-500 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
//                 )}
//               >
//                 {tab.replace('-', ' ')}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/50">
//                 <th className="px-8 py-5">Product Info</th>
//                 <th className="px-6 py-5">SKU Mapping</th>
//                 <th className="px-6 py-5 text-center">Availability</th>
//                 <th className="px-6 py-5 text-center">Status</th>
//                 <th className="px-6 py-5">Unit Price</th>
//                 <th className="px-8 py-5 text-right">Settings</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/30">
//               {filteredProducts.map((p) => (
//                 <tr key={p.id} className="group hover:bg-slate-800/20 transition-colors">
//                   <td className="px-8 py-6">
//                     <div className="font-black text-white uppercase text-sm group-hover:text-cyan-400 transition-colors">
//                       {p.name}
//                     </div>
//                     <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter italic">Category: {p.category}</div>
//                   </td>
//                   <td className="px-6 py-6">
//                     <div className="flex items-center gap-2">
//                       <code className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[10px] text-cyan-500 font-mono">
//                         {p.sku}
//                       </code>
//                       <Settings2 size={12} className="text-slate-600 cursor-pointer hover:text-white" />
//                     </div>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <div className="text-sm font-black text-slate-300 tabular-nums">{p.stock}</div>
//                     <div className="text-[9px] text-slate-600 uppercase font-bold">Min: {p.minThreshold}</div>
//                   </td>
//                   <td className="px-6 py-6 text-center">
//                     <ProductStatusBadge status={p.status} />
//                   </td>
//                   <td className="px-6 py-6 font-black text-emerald-400 text-sm tracking-tight">{p.price}</td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex justify-end gap-2">
//                       <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all"><Edit3 size={16}/></button>
//                       <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all"><MoreVertical size={16}/></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Internal Components ---

// function StatCard({ label, value, icon: Icon, color }: any) {
//   const colors: any = {
//     cyan: "text-cyan-400 bg-cyan-400/10",
//     purple: "text-purple-400 bg-purple-400/10",
//     amber: "text-amber-400 bg-amber-400/10",
//     red: "text-red-400 bg-red-400/10",
//   };
//   return (
//     <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-3xl backdrop-blur-sm">
//       <div className={cn("w-10 h-10 flex items-center justify-center rounded-xl mb-4", colors[color])}>
//         <Icon size={20} />
//       </div>
//       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
//       <h4 className="text-2xl font-black mt-1 text-white tabular-nums">{value}</h4>
//     </div>
//   );
// }

// function ProductStatusBadge({ status }: { status: Product["status"] }) {
//   const styles: any = {
//     "In Stock": "text-emerald-400 bg-emerald-400/5 border-emerald-400/20",
//     "Low Stock": "text-amber-400 bg-amber-400/5 border-amber-400/20",
//     "Out of Stock": "text-red-400 bg-red-400/5 border-red-400/20",
//   };
//   return (
//     <span className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border", styles[status])}>
//       {status}
//     </span>
//   );
// }




import React, { useState, useMemo } from "react";
import { 
  Package, Layers, AlertTriangle, Search, 
  Plus, MoreVertical, Edit3, BarChart3, 
  Settings2, HardDrive, Cpu, X, Trash2, Save
} from "lucide-react";
import { cn } from "../../../lib/utils";

// --- Types ---
interface ProductSpecs {
  Engine: string;
  Displacement: string;
  Years: string;
  Material: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  manufacturer: string;
  compatibility: string[];
  image: string;
  description: string;
  specs: ProductSpecs;
  engineCode: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "tc-ms-cum-59-12v-01",
    name: "Main Stud Kit – Cummins 5.9L 12V",
    sku: "TC-MS-CUM-59-12V-01",
    category: "Engine Components",
    price: 299.00,
    stock: 25,
    manufacturer: "Cummins",
    compatibility: ["Ram 2500 (1994-1998)"],
    image: "https://loremflickr.com/800/600/engine,part?lock=2",
    description: "High-strength main stud kit.",
    specs: { Engine: "12V Cummins", Displacement: "5.9L", Years: "1994-1998", Material: "8740 Chrome Moly" },
    engineCode: "12V"
  }
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "", sku: "", price: 0, stock: 0, engineCode: "", category: "Engine Components"
  });

  // --- Handlers ---
  
  // Open Modal for New Product
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", sku: "", price: 0, stock: 0, engineCode: "", category: "Engine Components" });
    setIsModalOpen(true);
  };

  // Open Modal for Editing Existing Product
  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return alert("Basic details are required!");

    if (editingId) {
      // Logic: Update existing product
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
    } else {
      // Logic: Add new product
      const productToAdd: Product = {
        ...(formData as Product),
        id: `tc-${Math.random().toString(36).substr(2, 9)}`,
        image: "https://loremflickr.com/800/600/engine,part?lock=" + Math.random(),
        specs: { Engine: "TBD", Displacement: "TBD", Years: "TBD", Material: "TBD" },
        compatibility: [],
        manufacturer: "Torque Craft",
        description: ""
      };
      setProducts([productToAdd, ...products]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.engineCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 space-y-10 text-slate-200 relative">
      
      {/* SHARED MODAL (Add & Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
              <h3 className="font-black uppercase tracking-widest text-cyan-400 italic">
                {editingId ? "Update Product" : "New Performance Part"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all" placeholder="Enter product title..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">SKU</label>
                  <input required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all" placeholder="TC-CODE-01" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Engine Code</label>
                  <input value={formData.engineCode} onChange={e => setFormData({...formData, engineCode: e.target.value})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all" placeholder="e.g. 12V / 24V" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Price ($)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Stock</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-xs focus:border-cyan-500 outline-none transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-900/20 active:scale-[0.98]">
                <Save size={18} /> {editingId ? "Commit Changes" : "Deploy to Inventory"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Product Master</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 italic flex items-center gap-2">
            <span className="w-6 h-[1px] bg-cyan-500"></span> Torque Craft Performance Database
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="SEARCH BY SKU, NAME OR ENGINE..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 transition-all w-full md:w-96 outline-none backdrop-blur-md"
            />
          </div>
          <button onClick={openAddModal} className="p-4 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20 active:scale-90">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Catalog" value={products.length} icon={Package} color="cyan" />
        <StatCard label="In Stock Units" value={products.reduce((acc, p) => acc + p.stock, 0)} icon={HardDrive} color="emerald" />
        <StatCard label="Live Valuation" value={`$${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`} icon={Layers} color="purple" />
        <StatCard label="Alerts" value={products.filter(p => p.stock < 10).length} icon={AlertTriangle} color="amber" />
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/30 border border-slate-800/50 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-900/60">
                <th className="px-10 py-7 border-b border-slate-800/50">Item Profile</th>
                <th className="px-6 py-7 text-center border-b border-slate-800/50">Stock</th>
                <th className="px-6 py-7 text-center border-b border-slate-800/50">Price</th>
                <th className="px-10 py-7 text-right border-b border-slate-800/50">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-slate-800/40 transition-all duration-300">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-800 bg-black flex-shrink-0 group-hover:border-cyan-500/30 transition-all shadow-lg">
                        <img src={p.image} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity scale-110" />
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors italic">{p.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-black text-cyan-500 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 tracking-widest">{p.sku}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase italic opacity-60">{p.engineCode}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className={cn("text-sm font-black tabular-nums tracking-tighter", p.stock < 10 ? "text-amber-400" : "text-emerald-400")}>{p.stock}</div>
                    <div className="text-[9px] text-slate-600 font-black uppercase">Available</div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="text-sm font-black text-white tabular-nums tracking-tighter">${p.price.toFixed(2)}</div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button onClick={() => openEditModal(p)} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-cyan-400 hover:border-cyan-500 transition-all shadow-lg"><Edit3 size={16}/></button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-slate-900 border border-slate-800 text-red-500/40 rounded-xl hover:text-red-500 hover:border-red-500/50 transition-all shadow-lg"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component remains the same
function StatCard({ label, value, icon: Icon, color }: any) {
  const colorMap: any = {
    cyan: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  };
  return (
    <div className="p-6 bg-slate-900/50 border border-slate-800/50 rounded-[2.5rem] shadow-xl group hover:border-slate-700 transition-all backdrop-blur-sm">
      <div className={cn("w-12 h-12 flex items-center justify-center rounded-2xl mb-4 border transition-transform group-hover:scale-110", colorMap[color])}>
        <Icon size={22} />
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black mt-1 text-white tabular-nums">{value}</h4>
    </div>
  );
}