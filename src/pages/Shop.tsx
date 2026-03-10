// import { useState } from 'react';
// import { Search, Filter, ChevronRight, Star } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import products from '../data/products.json';

// const Shop = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const filteredProducts = products.filter(p => 
//     (selectedCategory === 'All' || p.category === selectedCategory) &&
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col md:flex-row gap-12">
//           {/* Sidebar Filters */}
//           <aside className="w-full md:w-64 flex-shrink-0">
//             <div className="sticky top-32">
//               <div className="mb-10">
//                 <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
//                   <Filter size={18} className="text-brand-red" /> Filters
//                 </h3>
//                 <div className="space-y-4">
//                   {['All', 'Engines', 'Turbochargers', 'Fuel Systems'].map(cat => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectedCategory(cat)}
//                       className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all ${selectedCategory === cat ? 'bg-brand-red text-white glow-red' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-10">
//                 <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Price Range</h4>
//                 <input type="range" className="w-full accent-brand-red" min="0" max="10000" />
//                 <div className="flex justify-between text-[10px] text-white/40 mt-2 uppercase tracking-tighter">
//                   <span>$0</span>
//                   <span>$10,000+</span>
//                 </div>
//               </div>

//               <div className="metallic-card p-6">
//                 <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2 italic">Pro Tip</h4>
//                 <p className="text-[10px] text-white/40 leading-relaxed">
//                   Use the vehicle selector on the home page to filter by exact compatibility.
//                 </p>
//               </div>
//             </div>
//           </aside>

//           {/* Product Grid Area */}
//           <div className="flex-grow">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//               <div className="relative w-full md:w-96">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search parts, SKUs, engines..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-red transition-all"
//                 />
//               </div>
//               <div className="flex items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
//                 <span>Showing {filteredProducts.length} Results</span>
//                 <select className="bg-transparent border-none focus:ring-0 text-white font-bold cursor-pointer">
//                   <option>Newest First</option>
//                   <option>Price: Low to High</option>
//                   <option>Price: High to Low</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredProducts.map((product) => (
//                 <motion.div
//                   layout
//                   key={product.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="group metallic-card overflow-hidden flex flex-col"
//                 >
//                   <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
//                     <img 
//                       src={product.image} 
//                       alt={product.name} 
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
//                       referrerPolicy="no-referrer"
//                     />
//                     <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
//                       {product.sku}
//                     </div>
//                   </Link>
//                   <div className="p-6 flex-grow flex flex-col">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-display font-bold text-lg group-hover:text-brand-red transition-colors leading-tight">
//                         {product.name}
//                       </h3>
//                     </div>
//                     <div className="flex items-center gap-1 mb-4">
//                       {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-brand-blue text-brand-blue" />)}
//                       <span className="text-[10px] text-white/30 ml-2">(24 Reviews)</span>
//                     </div>
//                     <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
//                       <span className="text-2xl font-display font-black italic text-white">
//                         ${product.price.toLocaleString()}
//                       </span>
//                       <Link to={`/product/${product.id}`} className="text-brand-red hover:text-white transition-colors">
//                         <ChevronRight size={24} />
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;


// import { useState } from 'react';
// import { Search, Filter, ChevronRight, Star } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence for smoother filtering
// import { Link } from 'react-router-dom';
// import products from '../data/products.json';

// const Shop = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   // SMART FILTER LOGIC: 
//   // Ye check karega ki selected category ya to 'Category' field mein ho 
//   // ya fir product ke 'Name' mein (Jaise "Head Stud Kit")
//   const filteredProducts = products.filter(p => {
//     const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesCategory = selectedCategory === 'All' || 
//                             p.category === selectedCategory || 
//                             p.name.toLowerCase().includes(selectedCategory.toLowerCase());
    
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col md:flex-row gap-12">
          
//           {/* Sidebar Filters */}
//           <aside className="w-full md:w-64 flex-shrink-0">
//             <div className="sticky top-32">
//               <div className="mb-10">
//                 <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-white">
//                   <Filter size={18} className="text-brand-red" /> Filters
//                 </h3>
//                 <div className="space-y-4">
//                   {/* Updated categories to match your actual product names/data */}
//                   {['All', 'Head Stud Kit', 'Main Stud Kit', 'Engine Components'].map(cat => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectedCategory(cat)}
//                       className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all border ${
//                         selectedCategory === cat 
//                         ? 'bg-brand-red text-white border-brand-red shadow-[0_0_15px_rgba(255,51,51,0.3)]' 
//                         : 'text-white/50 border-white/5 hover:text-white hover:bg-white/5'
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-10">
//                 <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Price Range</h4>
//                 <input type="range" className="w-full accent-brand-red" min="0" max="10000" />
//                 <div className="flex justify-between text-[10px] text-white/40 mt-2 uppercase tracking-tighter">
//                   <span>$0</span>
//                   <span>$10,000+</span>
//                 </div>
//               </div>

//               <div className="metallic-card p-6 border border-white/5 bg-white/[0.02]">
//                 <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-2 italic">Pro Tip</h4>
//                 <p className="text-[10px] text-white/40 leading-relaxed">
//                   Use the SKU search for faster part identification. All kits include heavy-duty washers.
//                 </p>
//               </div>
//             </div>
//           </aside>

//           {/* Product Grid Area */}
//           <div className="flex-grow">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//               <div className="relative w-full md:w-96">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search parts, SKUs, engines..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-brand-red transition-all"
//                 />
//               </div>
//               <div className="flex items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
//                 <span>Showing {filteredProducts.length} Results</span>
//                 <select className="bg-transparent border-none focus:ring-0 text-white font-bold cursor-pointer outline-none">
//                   <option className="bg-navy-deep">Newest First</option>
//                   <option className="bg-navy-deep">Price: Low to High</option>
//                   <option className="bg-navy-deep">Price: High to Low</option>
//                 </select>
//               </div>
//             </div>

//             {/* Empty State handling */}
//             {filteredProducts.length === 0 ? (
//               <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
//                 <p className="text-white/20 uppercase tracking-widest font-bold">No parts found matching your selection.</p>
//                 <button 
//                   onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} 
//                   className="mt-4 text-brand-red font-bold uppercase text-xs hover:text-white transition-colors"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 <AnimatePresence>
//                   {filteredProducts.map((product) => (
//                     <motion.div
//                       layout
//                       key={product.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.95 }}
//                       transition={{ duration: 0.3 }}
//                       className="group metallic-card overflow-hidden flex flex-col border border-white/5 bg-white/[0.02]"
//                     >
//                       <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
//                         <img 
//                           src={product.image} 
//                           alt={product.name} 
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
//                           referrerPolicy="no-referrer"
//                         />
//                         <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10 text-white">
//                           {product.sku}
//                         </div>
//                       </Link>
                      
//                       <div className="p-6 flex-grow flex flex-col">
//                         <div className="flex justify-between items-start mb-2">
//                           <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-red transition-colors leading-tight italic uppercase">
//                             {product.name}
//                           </h3>
//                         </div>
                        
//                         <div className="flex items-center gap-1 mb-4">
//                           {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-brand-red text-brand-red" />)}
//                           <span className="text-[10px] text-white/30 ml-2">(24 Reviews)</span>
//                         </div>

//                         {/* Extra Info (Engine Code) for better UI */}
//                         <div className="mb-4">
//                            <span className="text-[10px] px-2 py-1 bg-brand-red/10 text-brand-red rounded font-black uppercase italic">
//                              {product.engineCode || 'High Performance'}
//                            </span>
//                         </div>

//                         <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
//                           <span className="text-2xl font-display font-black italic text-white">
//                             ${product.price.toLocaleString()}
//                           </span>
//                           <Link to={`/product/${product.id}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-red hover:bg-brand-red hover:text-white transition-all">
//                             <ChevronRight size={24} />
//                           </Link>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;








import { useState } from 'react';
import { Search, Filter, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                            p.category === selectedCategory || 
                            p.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#000000] relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, 
           backgroundSize: '45px 45px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters - Styled to match image_0ca274.jpg */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <div className="mb-10">
                <h3 className="text-lg font-display font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-white italic">
                  <Filter size={18} className="text-brand-red" /> Filters
                </h3>
                <div className="space-y-2">
                  {['All', 'Head Stud Kit', 'Main Stud Kit', 'Engine Components'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                        selectedCategory === cat 
                        ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5 italic">Price Range</h4>
                <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-red" min="0" max="10000" />
                <div className="flex justify-between text-[10px] text-white/40 mt-3 font-black tracking-widest">
                  <span>$0</span>
                  <span>$10,000+</span>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-red mb-2 italic">Pro Tip</h4>
                <p className="text-[9px] text-white/40 leading-relaxed uppercase">
                  Use the SKU search for faster part identification. All kits include heavy-duty washers.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="SEARCH PARTS, SKUS, ENGINES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-[10px] font-black tracking-widest text-white focus:outline-none focus:border-brand-red transition-all uppercase"
                />
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black italic">
                Showing {filteredProducts.length} High-Performance Components
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    // CARD DESIGN: Home page style (image_0cace3.jpg)
                    className={`group relative p-1 rounded-[20px] transition-all duration-500 hover:scale-[1.02] ${
                      index % 2 === 0 
                      ? 'hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]' 
                      : 'hover:shadow-[0_0_30px_rgba(0,183,255,0.2)]'
                    }`}
                  >
                    {/* Glowing Outline (Exactly like Home Page) */}
                    <div className={`absolute inset-0 rounded-[20px] border-2 transition-colors duration-500 ${
                      index % 2 === 0 ? 'border-brand-red/20 group-hover:border-brand-red' : 'border-brand-blue/20 group-hover:border-brand-blue'
                    }`}></div>

                    <div className="bg-[#050505] rounded-[18px] p-5 h-full flex flex-col relative z-10 overflow-hidden">
                      
                      {/* SKU Badge style from image_0ca274.jpg */}
                      <div className="absolute top-4 left-4 z-20 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] font-black text-white tracking-tighter uppercase">
                        {product.sku}
                      </div>

                      <Link to={`/product/${product.id}`} className="block aspect-square rounded-xl overflow-hidden mb-6 bg-[#111] relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                      </Link>
                      
                      <h3 className="font-display font-black text-sm text-white mb-2 leading-tight italic uppercase tracking-tight h-10 overflow-hidden group-hover:text-brand-red transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-brand-red text-brand-red" />)}
                        <span className="text-[9px] font-black text-white/20 ml-2 uppercase italic tracking-widest">(24 Reviews)</span>
                      </div>

                      {/* Engine Code Tag */}
                      <div className="mb-6">
                         <span className={`text-[8px] px-2 py-1 rounded font-black uppercase italic tracking-widest ${
                           index % 2 === 0 ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-blue/10 text-brand-blue'
                         }`}>
                           {product.engineCode || 'TSI: 220K PSI'}
                         </span>
                      </div>

                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                        <span className="text-2xl font-display font-black italic text-white leading-none">
                          ${product.price.toLocaleString()}
                        </span>
                        
                        {/* "Shop Now" styled button from Home cards */}
                        <Link to={`/product/${product.id}`} className={`px-4 py-2 rounded font-black text-[10px] uppercase italic transition-all ${
                          index % 2 === 0 
                          ? 'bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white' 
                          : 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white'
                        }`}>
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;