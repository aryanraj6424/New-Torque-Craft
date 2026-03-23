
// import React, { useState } from 'react';
// import { 
//   Package, Search, Filter, Plus,
//   AlertTriangle, ArrowUpRight, Layers,
//   MoreVertical, X, Upload
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const inventoryItems = [
//   { id: 'INV-001', name: 'CyberCore X1', category: 'Processors', stock: 45, minStock: 10, price: 1200, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-002', name: 'NeoLink v4', category: 'Networking', stock: 8, minStock: 15, price: 750, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-003', name: 'FutureVision', category: 'Displays', stock: 0, minStock: 5, price: 1500, image: 'https://via.placeholder.com/50' },
// ];

// export default function Inventory() {

//   const [items, setItems] = useState(inventoryItems);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [showLowStock, setShowLowStock] = useState(false);

//   // 🔥 NEW STATES
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [editItem, setEditItem] = useState(null);

//   // STATUS
//   const getStatus = (item) => {
//     if (item.stock === 0) return "OUT_OF_STOCK";
//     if (item.stock <= item.minStock) return "LOW_STOCK";
//     return "IN_STOCK";
//   };

//   // FILTER
//   const filteredItems = items.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = category === "All" || item.category === category;
//     const matchesLowStock = !showLowStock || getStatus(item) === "LOW_STOCK";
//     return matchesSearch && matchesCategory && matchesLowStock;
//   });

//   // STATS
//   const totalItems = items.length;
//   const lowStock = items.filter(i => getStatus(i) === "LOW_STOCK").length;
//   const outOfStock = items.filter(i => getStatus(i) === "OUT_OF_STOCK").length;
//   const totalValue = items.reduce((sum, i) => sum + (i.price * i.stock), 0);

//   // ✅ STOCK UPDATE
//   const updateStock = (id, value) => {
//     setItems(items.map(i =>
//       i.id === id ? { ...i, stock: i.stock + value } : i
//     ));
//   };

//   // ✅ SAVE EDIT
//   const saveEdit = () => {
//     setItems(items.map(i => i.id === editItem.id ? editItem : i));
//     setEditItem(null);
//   };

//   // ✅ CSV UPLOAD (UI)
//   const handleCSV = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     alert("CSV Uploaded (connect backend)");
//   };

//   return (
//     <div className="space-y-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white uppercase">Inventory Management</h2>

//         <div className="flex gap-3">

//           {/* CSV */}
//           <label className="bg-purple-600 px-4 py-2 rounded-xl text-white text-sm flex gap-2 cursor-pointer">
//             <Upload size={16}/> CSV
//             <input type="file" hidden onChange={handleCSV}/>
//           </label>

//           <button 
//             onClick={() => setShowLowStock(!showLowStock)}
//             className="bg-slate-800 px-5 py-2 rounded-xl text-white text-sm"
//           >
//             Low Stock
//           </button>

//           <button className="bg-cyan-500 px-5 py-2 rounded-xl text-white text-sm flex gap-2">
//             <Plus size={16}/> Add Product
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <Stat label="Total Products" value={totalItems} />
//         <Stat label="Low Stock" value={lowStock} />
//         <Stat label="Out of Stock" value={outOfStock} />
//         <Stat label="Inventory Value" value={`₹${totalValue}`} />
//       </div>

//       {/* SEARCH */}
//       <div className="flex gap-4">
//         <input 
//           placeholder="Search product..."
//           value={search}
//           onChange={(e)=>setSearch(e.target.value)}
//           className="flex-1 p-3 bg-slate-900 rounded-xl text-white"
//         />

//         <select 
//           value={category}
//           onChange={(e)=>setCategory(e.target.value)}
//           className="p-3 bg-slate-900 text-white rounded-xl"
//         >
//           <option>All</option>
//           <option>Processors</option>
//           <option>Networking</option>
//           <option>Displays</option>
//           <option>Cooling</option>
//         </select>
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#0f172a] rounded-2xl p-6">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-slate-400 text-sm">
//               <th>Product</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredItems.map((item, i) => {
//               const status = getStatus(item);

//               return (
//                 <tr key={i} className="border-t border-slate-800 cursor-pointer"
//                     onClick={() => setSelectedItem(item)}>

//                   <td className="py-4 flex items-center gap-3">
//                     <img src={item.image} className="w-10 h-10 rounded"/>
//                     <div>
//                       <p className="text-white">{item.name}</p>
//                       <p className="text-xs text-slate-500">{item.id}</p>
//                     </div>
//                   </td>

//                   <td className="text-slate-400">{item.category}</td>

//                   <td className="text-white">₹{item.price}</td>

//                   {/* STOCK CONTROL */}
//                   <td onClick={(e)=>e.stopPropagation()}>
//                     <div className="flex gap-2 items-center">
//                       <button onClick={()=>updateStock(item.id,-1)}>-</button>
//                       {item.stock}
//                       <button onClick={()=>updateStock(item.id,1)}>+</button>
//                     </div>
//                   </td>

//                   <td>
//                     <span className={cn(
//                       "px-3 py-1 text-xs rounded-full font-bold",
//                       status === "IN_STOCK" && "bg-green-500/20 text-green-400",
//                       status === "LOW_STOCK" && "bg-yellow-500/20 text-yellow-400",
//                       status === "OUT_OF_STOCK" && "bg-red-500/20 text-red-400"
//                     )}>
//                       {status.replace("_"," ")}
//                     </span>
//                   </td>

//                   <td onClick={(e)=>e.stopPropagation()}>
//                     <button onClick={()=>setEditItem(item)} className="p-2 hover:bg-slate-800 rounded">
//                       <MoreVertical size={16}/>
//                     </button>
//                   </td>

//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 PRODUCT MODAL */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
//           <div className="bg-white text-black p-6 w-96 rounded">
//             <button onClick={()=>setSelectedItem(null)}><X/></button>

//             <h2 className="text-xl font-bold">{selectedItem.name}</h2>
//             <p>Category: {selectedItem.category}</p>
//             <p>Stock: {selectedItem.stock}</p>
//             <p>Price: ₹{selectedItem.price}</p>

//             <button 
//               onClick={()=>setEditItem(selectedItem)}
//               className="bg-blue-500 text-white px-4 py-2 mt-4"
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       )}

//       {/* 🔥 EDIT MODAL */}
//       {editItem && (

        
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
//           <div className="bg-white text-black p-6 w-96 rounded">

//             <h2>Edit Product</h2>

//             <input
//               value={editItem.name}
//               onChange={(e)=>setEditItem({...editItem, name:e.target.value})}
//               className="w-full border p-2"
//             />

//             <input
//               value={editItem.price}
//               onChange={(e)=>setEditItem({...editItem, price:e.target.value})}
//               className="w-full border p-2 mt-2"
//             />

//             <button onClick={saveEdit} className="bg-green-500 px-4 py-2 mt-4">
//               Save
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// // STAT
// function Stat({label, value}) {
//   return (
//     <div className="bg-slate-900 p-4 rounded-xl text-center">
//       <p className="text-xs text-slate-400">{label}</p>
//       <h3 className="text-xl text-white font-bold">{value}</h3>
//     </div>
//   );
// }








import React, { useState } from 'react';
import { 
  Package, Search, Filter, Info, 
  Tag, Box, X, Save, ShieldCheck, Zap 
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  engineType: "DIESEL" | "GAS" | "UNIVERSAL";
  price: number;
  stock: number;
  status: string;
  specs: { [key: string]: string };
  description: string;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [engineFilter, setEngineFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  // Updated Data based on your images
  const [inventory, setInventory] = useState<Product[]>([
    {
      id: "SKU-HSK-01",
      name: "Pro-Series Head Stud Kit",
      sku: "TC-HSK-2000",
      category: "HEAD STUD KIT",
      engineType: "DIESEL",
      price: 18500,
      stock: 25,
      status: "In Stock",
      specs: { material: "8740 Chrome Moly", tensile: "200,000 psi", thread: "Rolled J-form" },
      description: "Premium head stud kit for extreme cylinder pressures in diesel performance applications."
    },
    {
      id: "SKU-MSK-02",
      name: "Main Stud Kit Elite",
      sku: "TC-MSK-9921",
      category: "MAIN STUD KIT",
      engineType: "GAS",
      price: 12400,
      stock: 15,
      status: "In Stock",
      specs: { material: "ARP2000", coating: "Black Oxide", compatibility: "Gas V8 Blocks" },
      description: "Essential for maintaining crankshaft alignment and preventing main cap walk."
    },
    {
      id: "SKU-ACC-03",
      name: "Ultra-Torque Fastener Lube",
      sku: "TC-ACC-004",
      category: "ACCESSORIES",
      engineType: "UNIVERSAL",
      price: 1200,
      stock: 150,
      status: "In Stock",
      specs: { size: "10oz Tube", temp: "High Temp Stable", friction: "Precision Load" },
      description: "Specifically formulated to get exact torque readings on high-performance fasteners."
    }
  ]);

  const categories = ["ALL", "HEAD STUD KIT", "MAIN STUD KIT", "PRO SERIES", "ACCESSORIES"];
  const engines = ["ALL", "DIESEL", "GAS"];

  const filteredProducts = inventory.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesEngine = engineFilter === "ALL" || p.engineType === engineFilter;
    return matchesSearch && matchesCategory && matchesEngine;
  });

  const handleUpdatePrice = (id: string, newPrice: string) => {
    const priceNum = Number(newPrice);
    if (!isNaN(priceNum)) {
      setInventory(prev => prev.map(p => p.id === id ? { ...p, price: priceNum } : p));
      if(selectedProduct) setSelectedProduct({...selectedProduct, price: priceNum});
      setIsEditingPrice(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-200 p-4">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Torque Craft Catalog</h2>
          <p className="text-slate-500 text-sm">SKU Management & Dealer Pricing</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              placeholder="Search SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 bg-[#0f172a] border border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-[10px] font-black tracking-widest border transition-all",
                categoryFilter === cat ? "bg-cyan-500 border-cyan-400 text-white" : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 border-t border-slate-800 pt-4">
          <span>ENGINE TYPE:</span>
          {engines.map(eng => (
            <button
              key={eng}
              onClick={() => setEngineFilter(eng)}
              className={cn(
                "px-3 py-1 rounded-md border text-[9px]",
                engineFilter === eng ? "border-cyan-500 text-cyan-400 bg-cyan-500/5" : "border-slate-800 text-slate-500"
              )}
            >
              {eng}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="group bg-[#0f172a] border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                <Box className="text-cyan-400" size={24} />
              </div>
              <span className="text-[9px] font-black px-2 py-1 bg-slate-950 rounded border border-slate-800 text-cyan-500">
                {item.engineType}
              </span>
            </div>

            <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition">{item.name}</h3>
            <p className="text-[10px] font-mono text-slate-500">{item.sku}</p>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-black">Dealer Price</p>
                <p className="text-xl font-black text-white">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-500 uppercase font-black">Stock</p>
                <p className="text-sm font-bold text-slate-300">{item.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[999] p-4">
          <div className="bg-[#0f172a] w-full max-w-4xl rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Left Side */}
            <div className="w-full md:w-2/5 bg-slate-900/50 p-10 border-r border-slate-800">
              <div className="inline-block p-4 bg-cyan-500/10 rounded-3xl mb-6">
                <Zap className="text-cyan-400" size={48} />
              </div>
              <h2 className="text-3xl font-black uppercase text-white">{selectedProduct.name}</h2>
              <p className="text-cyan-400 font-mono mt-2">{selectedProduct.sku}</p>
              
              <div className="mt-8 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Engine Application</p>
                <p className="text-sm font-bold text-white tracking-widest">{selectedProduct.engineType} ENGINE</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 p-10 relative">
              <button onClick={() => {setSelectedProduct(null); setIsEditingPrice(false);}} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                <X size={24} />
              </button>

              <div className="space-y-8">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Specs</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-[11px]">
                        <p className="text-slate-500 uppercase font-black">{key}</p>
                        <p className="font-bold text-slate-200">{val}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Pricing Management</p>
                    <button onClick={() => setIsEditingPrice(!isEditingPrice)} className="text-cyan-400 text-[10px] font-black uppercase">Edit</button>
                  </div>
                  
                  <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 flex justify-between items-center">
                    <div>
                      {isEditingPrice ? (
                        <div className="flex items-center gap-2">
                          <input type="number" id="pUpdate" defaultValue={selectedProduct.price} className="bg-slate-900 border border-cyan-500 rounded px-2 py-1 w-32 text-white font-black" />
                          <button onClick={() => {
                            const val = (document.getElementById('pUpdate') as HTMLInputElement).value;
                            handleUpdatePrice(selectedProduct.id, val);
                          }} className="bg-cyan-500 p-2 rounded"><Save size={16}/></button>
                        </div>
                      ) : (
                        <h3 className="text-3xl font-black text-white">₹{selectedProduct.price.toLocaleString()}</h3>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 uppercase font-black">Qty Available</p>
                      <h3 className="text-2xl font-black text-slate-400">{selectedProduct.stock}</h3>
                    </div>
                  </div>
                </section>
                
                <button className="w-full bg-cyan-500 py-4 rounded-2xl text-[10px] font-black uppercase text-white shadow-xl shadow-cyan-500/10 hover:bg-cyan-400 transition-all">
                  Generate Bulk Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
