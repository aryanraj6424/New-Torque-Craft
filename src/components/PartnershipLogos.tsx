// import React from 'react';
// import { motion } from 'framer-motion';

// const PartnershipLogos = () => {
//   const partners = [
//     {
//       name: "PRI Pro Member",
//       img: "/Association1.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(51,102,255,0.4)]",
//       borderColor: "group-hover:border-brand-blue/40",
//       accent: "bg-brand-blue"
//     },
//     {
//       name: "SEMA TORA",
//       img: "/Association2.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     },
//     {
//       name: "SEMA Member",
//       img: "/Association3.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     },
//     {
//       name: "SEMA MPMC",
//       img: "/Association4.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     }
//   ];

//   return (
//     <section className="py-20 bg-navy-deep border-t border-white/5 relative overflow-hidden">
//       {/* Background Subtle Accents */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Header - Styled like your 'Fitment Engine' header */}
//         <div className="flex flex-col items-center mb-16 text-center">
//           <div className="flex items-center gap-2 mb-3">
//             <div className="w-8 h-[1px] bg-brand-red/50"></div>
//             <span className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-brand-red italic">
//               Industry Accredited
//             </span>
//             <div className="w-8 h-[1px] bg-brand-red/50"></div>
//           </div>
//           <h2 className="font-display text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase italic">
//             Official <span className="text-brand-red">Pro</span> Partners
//           </h2>
//         </div>

//         {/* Logo Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {partners.map((partner, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className={`group relative metallic-card p-8 flex flex-col items-center justify-center h-40 border border-white/5 bg-white/[0.02] rounded-xl transition-all duration-500 hover:bg-white/[0.04] ${partner.borderColor} ${partner.glowColor}`}
//             >
//               <img 
//                 src={partner.img} 
//                 alt={partner.name}
//                 className="h-14 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
//               />
              
//               {/* Bottom Glow Bar - Matches your 'Selection' indicator */}
//               <div className={`absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-[2px] ${partner.accent} group-hover:w-2/3 transition-all duration-500 shadow-[0_0_15px_rgba(255,51,51,0.8)]`} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PartnershipLogos;


// import React from 'react';
// import { motion } from 'framer-motion';

// const PartnershipLogos = () => {
//   const partners = [
//     {
//       name: "PRI Pro Member",
//       img: "/Association1.png", // Make sure images are in 'public' folder
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(51,102,255,0.4)]",
//       borderColor: "group-hover:border-brand-blue/40",
//       accent: "bg-brand-blue"
//     },
//     {
//       name: "SEMA TORA",
//       img: "/Association2.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     },
//     {
//       name: "SEMA Member",
//       img: "/Association3.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     },
//     {
//       name: "SEMA MPMC",
//       img: "/Association4.png",
//       glowColor: "group-hover:shadow-[0_-8px_20px_-6px_rgba(255,51,51,0.4)]",
//       borderColor: "group-hover:border-brand-red/40",
//       accent: "bg-brand-red"
//     }
//   ];

//   return (
//     <section className="py-24 bg-navy-deep border-t border-white/5 relative overflow-hidden">
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         <div className="flex flex-col items-center mb-16 text-center">
        
  
//           <h2 className="font-display text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
//             Official <span className="text-brand-red">Pro</span> Partners
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           {partners.map((partner, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className={`group relative metallic-card p-4 md:p-6 flex flex-col items-center justify-center h-44 md:h-52 border border-white/5 bg-white/[0.02] rounded-xl transition-all duration-500 hover:bg-white/[0.04] ${partner.borderColor} ${partner.glowColor} overflow-hidden`}
//             >
//               <img 
//                 src={partner.img} 
//                 alt={partner.name}
//                 // LOGO SIZE INCREASED: Changed h-14 to h-24/h-28
//                 className="h-20 md:h-28 w-full object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
//               />
              
//               <div className={`absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-[3px] ${partner.accent} group-hover:w-full transition-all duration-500 shadow-[0_0_20px_rgba(255,51,51,0.9)]`} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PartnershipLogos;





import React from 'react';
import { motion } from 'framer-motion';

const PartnershipLogos = () => {
  const partners = [
    { name: "PRI Pro", img: "/Association1.png" },
    { name: "SEMA TORA", img: "/Association2.png" },
    { name: "SEMA Member", img: "/Association3.png" },
    { name: "SEMA MPMC", img: "/Association4.png" },
    // Loop continuity ke liye repeats
    { name: "PRI Pro", img: "/Association1.png" },
    { name: "SEMA TORA", img: "/Association2.png" },
    { name: "SEMA Member", img: "/Association3.png" },
    { name: "SEMA MPMC", img: "/Association4.png" },
  ];

  return (
    // bg-[#000000] se pura black background set kiya gaya hai
    <section className="py-24 bg-[#000000] relative overflow-hidden border-t border-white/5">
      
      {/* Background Technical Grid - Opacity thodi kam rakhi hai taaki black depth bani rahe */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, 
           backgroundSize: '50px 50px' }}>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-black italic tracking-[0.25em] text-white">
            INDUSTRY <span className="text-brand-red">STANDARDS</span>
          </h2>
          <div className="h-[2px] w-24 bg-brand-red mx-auto mt-3 shadow-[0_0_10px_#ff0000]"></div>
        </div>

        {/* Infinite Marquee Container */}
        <div className="flex overflow-hidden select-none group">
          <motion.div 
            className="flex flex-nowrap gap-16 md:gap-24 min-w-full items-center py-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {partners.map((partner, index) => (
              <div key={index} className="relative flex-shrink-0 group/logo px-4">
                {/* Subtle Radial Glow on Hover */}
                <div className="absolute inset-0 bg-white/5 blur-[50px] rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                
                <img 
                  src={partner.img} 
                  alt={partner.name}
                  // Grayscale hata diya gaya hai (Original Colors)
                  className="h-24 md:h-32 w-auto object-contain opacity-80 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500 cursor-pointer"
                />
                
                {/* Technical Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-all duration-300">
                  <span className="text-[9px] font-bold tracking-[4px] text-brand-red uppercase whitespace-nowrap italic">
                    VERIFIED PARTNER
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Side Fades - Pure Black to Transparent Gradient */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#000000] to-transparent z-20"></div>
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#000000] to-transparent z-20"></div>
      <br /><br />
      <hr />
    </section>
  );
};

export default PartnershipLogos;