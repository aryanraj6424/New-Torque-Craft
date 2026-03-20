// import React from 'react';
// import { 
//   Package, 
//   Search, 
//   Filter, 
//   ChevronRight, 
//   Plus,
//   AlertTriangle,
//   ArrowUpRight,
//   ArrowDownRight,
//   MoreVertical,
//   Layers
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const inventoryItems = [
//   { id: 'INV-001', name: 'CyberCore X1', category: 'Processors', stock: 45, minStock: 10, price: '$1,200', status: 'IN_STOCK' },
//   { id: 'INV-002', name: 'NeoLink v4', category: 'Networking', stock: 8, minStock: 15, price: '$750', status: 'LOW_STOCK' },
//   { id: 'INV-003', name: 'FutureVision', category: 'Displays', stock: 0, minStock: 5, price: '$1,500', status: 'OUT_OF_STOCK' },
//   { id: 'INV-004', name: 'TurboBoost Pro', category: 'Cooling', stock: 120, minStock: 20, price: '$950', status: 'IN_STOCK' },
//   { id: 'INV-005', name: 'MegaDrive Kit', category: 'Storage', stock: 32, minStock: 10, price: '$600', status: 'IN_STOCK' },
//   { id: 'INV-006', name: 'Quantum Chipset', category: 'Processors', stock: 5, minStock: 10, price: '$2,100', status: 'LOW_STOCK' },
// ];

// export default function Inventory() {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-white tracking-tight uppercase">INVENTORY MANAGEMENT</h2>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-xs font-black text-white transition-all">
//             <Filter className="w-4 h-4" />
//             FILTER INVENTORY
//           </button>
//           <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl text-xs font-black text-white shadow-lg shadow-cyan-500/20 transition-all group">
//             <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
//             ADD NEW ITEM
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: 'Total Items', value: '482', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
//           { label: 'Low Stock', value: '12', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
//           { label: 'Out of Stock', value: '3', icon: Package, color: 'text-rose-400', bg: 'bg-rose-500/10' },
//           { label: 'Inventory Value', value: '$428K', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
//         ].map((stat, i) => (
//           <div key={i} className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
//             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
//               <stat.icon className={cn("w-6 h-6", stat.color)} />
//             </div>
//             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
//             <h4 className="text-2xl font-black text-white">{stat.value}</h4>
//           </div>
//         ))}
//       </div>

//       <div className="p-8 rounded-3xl bg-[#0f172a] border border-slate-800/50 shadow-2xl shadow-black/50 overflow-hidden relative">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
//               <Package className="w-5 h-5 text-blue-400" />
//             </div>
//             <h3 className="text-xl font-bold text-white">Stock Inventory</h3>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
//               <input 
//                 type="text" 
//                 placeholder="Search inventory..." 
//                 className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all w-full md:w-64"
//               />
//             </div>
//             <select className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all cursor-pointer">
//               <option>All Categories</option>
//               <option>Processors</option>
//               <option>Displays</option>
//               <option>Networking</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto -mx-8">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-800/50">
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">ITEM ID</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">PRODUCT NAME</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">CATEGORY</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">STOCK LEVEL</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">UNIT PRICE</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">STATUS</th>
//                 <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800/30">
//               {inventoryItems.map((item, i) => (
//                 <tr key={i} className="group hover:bg-slate-800/20 transition-colors">
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-black text-white tracking-tight">{item.id}</span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-bold text-white">{item.name}</span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-medium text-slate-400">{item.category}</span>
//                   </td>
//                   <td className="px-8 py-6 text-center">
//                     <div className="flex flex-col items-center">
//                       <span className={cn(
//                         "text-sm font-black",
//                         item.stock <= item.minStock ? "text-amber-400" : "text-cyan-400"
//                       )}>{item.stock}</span>
//                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Min: {item.minStock}</span>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <span className="text-sm font-bold text-slate-400">{item.price}</span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className={cn(
//                       "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
//                       item.status === 'IN_STOCK' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
//                       item.status === 'LOW_STOCK' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
//                       "bg-rose-500/10 text-rose-400 border border-rose-500/20"
//                     )}>
//                       {item.status.replace('_', ' ')}
//                     </div>
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
//                         <Plus className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
//                         <MoreVertical className="w-4 h-4" />
//                       </button>
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





// import React, { useState } from 'react';
// import { 
//   Package, 
//   Search, 
//   Filter, 
//   Plus,
//   AlertTriangle,
//   ArrowUpRight,
//   Layers,
//   MoreVertical
// } from 'lucide-react';
// import { cn } from '@/src/lib/utils';

// const inventoryItems = [
//   { id: 'INV-001', name: 'CyberCore X1', category: 'Processors', stock: 45, minStock: 10, price: 1200, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-002', name: 'NeoLink v4', category: 'Networking', stock: 8, minStock: 15, price: 750, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-003', name: 'FutureVision', category: 'Displays', stock: 0, minStock: 5, price: 1500, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-004', name: 'TurboBoost Pro', category: 'Cooling', stock: 120, minStock: 20, price: 950, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-005', name: 'MegaDrive Kit', category: 'Storage', stock: 32, minStock: 10, price: 600, image: 'https://via.placeholder.com/50' },
//   { id: 'INV-006', name: 'Quantum Chipset', category: 'Processors', stock: 5, minStock: 10, price: 2100, image: 'https://via.placeholder.com/50' },
// ];

// export default function Inventory() {

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [showLowStock, setShowLowStock] = useState(false);

//   // 🔥 STATUS LOGIC
//   const getStatus = (item) => {
//     if (item.stock === 0) return "OUT_OF_STOCK";
//     if (item.stock <= item.minStock) return "LOW_STOCK";
//     return "IN_STOCK";
//   };

//   // 🔥 FILTER LOGIC
//   const filteredItems = inventoryItems.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = category === "All" || item.category === category;
//     const matchesLowStock = !showLowStock || getStatus(item) === "LOW_STOCK";
//     return matchesSearch && matchesCategory && matchesLowStock;
//   });

//   // 🔥 STATS
//   const totalItems = inventoryItems.length;
//   const lowStock = inventoryItems.filter(i => getStatus(i) === "LOW_STOCK").length;
//   const outOfStock = inventoryItems.filter(i => getStatus(i) === "OUT_OF_STOCK").length;
//   const totalValue = inventoryItems.reduce((sum, i) => sum + (i.price * i.stock), 0);

//   return (
//     <div className="space-y-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white uppercase">Inventory Management</h2>

//         <div className="flex gap-3">
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

//       {/* SEARCH + FILTER */}
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
//                 <tr key={i} className="border-t border-slate-800">

//                   {/* PRODUCT */}
//                   <td className="py-4 flex items-center gap-3">
//                     <img src={item.image} className="w-10 h-10 rounded"/>
//                     <div>
//                       <p className="text-white">{item.name}</p>
//                       <p className="text-xs text-slate-500">{item.id}</p>
//                     </div>
//                   </td>

//                   <td className="text-slate-400">{item.category}</td>

//                   <td className="text-white">₹{item.price}</td>

//                   <td className="text-white">{item.stock}</td>

//                   {/* STATUS */}
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

//                   {/* ACTIONS */}
//                   <td>
//                     <button className="p-2 hover:bg-slate-800 rounded">
//                       <MoreVertical size={16}/>
//                     </button>
//                   </td>

//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>

//       </div>

//     </div>
//   );
// }

// // STAT CARD
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
  Package, Search, Filter, Plus,
  AlertTriangle, ArrowUpRight, Layers,
  MoreVertical, X, Upload
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const inventoryItems = [
  { id: 'INV-001', name: 'CyberCore X1', category: 'Processors', stock: 45, minStock: 10, price: 1200, image: 'https://via.placeholder.com/50' },
  { id: 'INV-002', name: 'NeoLink v4', category: 'Networking', stock: 8, minStock: 15, price: 750, image: 'https://via.placeholder.com/50' },
  { id: 'INV-003', name: 'FutureVision', category: 'Displays', stock: 0, minStock: 5, price: 1500, image: 'https://via.placeholder.com/50' },
];

export default function Inventory() {

  const [items, setItems] = useState(inventoryItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showLowStock, setShowLowStock] = useState(false);

  // 🔥 NEW STATES
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // STATUS
  const getStatus = (item) => {
    if (item.stock === 0) return "OUT_OF_STOCK";
    if (item.stock <= item.minStock) return "LOW_STOCK";
    return "IN_STOCK";
  };

  // FILTER
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    const matchesLowStock = !showLowStock || getStatus(item) === "LOW_STOCK";
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  // STATS
  const totalItems = items.length;
  const lowStock = items.filter(i => getStatus(i) === "LOW_STOCK").length;
  const outOfStock = items.filter(i => getStatus(i) === "OUT_OF_STOCK").length;
  const totalValue = items.reduce((sum, i) => sum + (i.price * i.stock), 0);

  // ✅ STOCK UPDATE
  const updateStock = (id, value) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, stock: i.stock + value } : i
    ));
  };

  // ✅ SAVE EDIT
  const saveEdit = () => {
    setItems(items.map(i => i.id === editItem.id ? editItem : i));
    setEditItem(null);
  };

  // ✅ CSV UPLOAD (UI)
  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    alert("CSV Uploaded (connect backend)");
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white uppercase">Inventory Management</h2>

        <div className="flex gap-3">

          {/* CSV */}
          <label className="bg-purple-600 px-4 py-2 rounded-xl text-white text-sm flex gap-2 cursor-pointer">
            <Upload size={16}/> CSV
            <input type="file" hidden onChange={handleCSV}/>
          </label>

          <button 
            onClick={() => setShowLowStock(!showLowStock)}
            className="bg-slate-800 px-5 py-2 rounded-xl text-white text-sm"
          >
            Low Stock
          </button>

          <button className="bg-cyan-500 px-5 py-2 rounded-xl text-white text-sm flex gap-2">
            <Plus size={16}/> Add Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Total Products" value={totalItems} />
        <Stat label="Low Stock" value={lowStock} />
        <Stat label="Out of Stock" value={outOfStock} />
        <Stat label="Inventory Value" value={`₹${totalValue}`} />
      </div>

      {/* SEARCH */}
      <div className="flex gap-4">
        <input 
          placeholder="Search product..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="flex-1 p-3 bg-slate-900 rounded-xl text-white"
        />

        <select 
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="p-3 bg-slate-900 text-white rounded-xl"
        >
          <option>All</option>
          <option>Processors</option>
          <option>Networking</option>
          <option>Displays</option>
          <option>Cooling</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#0f172a] rounded-2xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm">
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, i) => {
              const status = getStatus(item);

              return (
                <tr key={i} className="border-t border-slate-800 cursor-pointer"
                    onClick={() => setSelectedItem(item)}>

                  <td className="py-4 flex items-center gap-3">
                    <img src={item.image} className="w-10 h-10 rounded"/>
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.id}</p>
                    </div>
                  </td>

                  <td className="text-slate-400">{item.category}</td>

                  <td className="text-white">₹{item.price}</td>

                  {/* STOCK CONTROL */}
                  <td onClick={(e)=>e.stopPropagation()}>
                    <div className="flex gap-2 items-center">
                      <button onClick={()=>updateStock(item.id,-1)}>-</button>
                      {item.stock}
                      <button onClick={()=>updateStock(item.id,1)}>+</button>
                    </div>
                  </td>

                  <td>
                    <span className={cn(
                      "px-3 py-1 text-xs rounded-full font-bold",
                      status === "IN_STOCK" && "bg-green-500/20 text-green-400",
                      status === "LOW_STOCK" && "bg-yellow-500/20 text-yellow-400",
                      status === "OUT_OF_STOCK" && "bg-red-500/20 text-red-400"
                    )}>
                      {status.replace("_"," ")}
                    </span>
                  </td>

                  <td onClick={(e)=>e.stopPropagation()}>
                    <button onClick={()=>setEditItem(item)} className="p-2 hover:bg-slate-800 rounded">
                      <MoreVertical size={16}/>
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 PRODUCT MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white text-black p-6 w-96 rounded">
            <button onClick={()=>setSelectedItem(null)}><X/></button>

            <h2 className="text-xl font-bold">{selectedItem.name}</h2>
            <p>Category: {selectedItem.category}</p>
            <p>Stock: {selectedItem.stock}</p>
            <p>Price: ₹{selectedItem.price}</p>

            <button 
              onClick={()=>setEditItem(selectedItem)}
              className="bg-blue-500 text-white px-4 py-2 mt-4"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {/* 🔥 EDIT MODAL */}
      {editItem && (

        
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white text-black p-6 w-96 rounded">

            <h2>Edit Product</h2>

            <input
              value={editItem.name}
              onChange={(e)=>setEditItem({...editItem, name:e.target.value})}
              className="w-full border p-2"
            />

            <input
              value={editItem.price}
              onChange={(e)=>setEditItem({...editItem, price:e.target.value})}
              className="w-full border p-2 mt-2"
            />

            <button onClick={saveEdit} className="bg-green-500 px-4 py-2 mt-4">
              Save
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

// STAT
function Stat({label, value}) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <h3 className="text-xl text-white font-bold">{value}</h3>
    </div>
  );
}