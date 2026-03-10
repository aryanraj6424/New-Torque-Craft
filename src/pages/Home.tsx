import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Users, Gauge, Zap, Sparkles } from 'lucide-react';
import products from '../data/products.json';
import FitmentSearchAI from '../components/FitmentSearchAI';

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486497395402-74117b71a39b?auto=format&fit=crop&w=1920&q=80&grayscale=true" 
            alt="Engine Hero" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/80 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[1px] w-12 bg-brand-red" />
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.4em]">Precision Engineering</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight italic mb-8 leading-[0.95] uppercase">
              Crafted for <span className="text-brand-red">Quality.</span><br />
              Built for <span className="text-brand-blue">Performance.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed max-w-xl font-light">
              Torque Craft manufactures precision-engineered automotive components, including high-strength head and main stud kits for high-performance diesel platforms. Engineered to exceed rigorous industry standards.
            </p>
            {/* <div className="flex flex-wrap gap-6">
              <Link to="/shop" className="btn-hero-blue flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest font-bold">
                Shop Catalog <ChevronRight size={18} />
              </Link>
              <Link to="/verify" className="btn-hero-red px-8 py-4 text-sm uppercase tracking-widest font-bold">
                Verify Authenticity
              </Link>
            </div> */}


            <div className="flex flex-wrap gap-6">
  {/* Shop Catalog Button */}
  <Link 
    to="/shop" 
    className="btn-hero-blue flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest font-bold hover:border-brand-red hover:shadow-[0_0_25px_rgba(227,30,36,0.6)] hover:bg-brand-red/10 transition-all duration-300"
  >
    Shop Catalog <ChevronRight size={18} />
  </Link>

  {/* Verify Authenticity Button */}
  <Link 
    to="/verify" 
    className="btn-hero-blue flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest font-bold hover:border-brand-red hover:shadow-[0_0_25px_rgba(227,30,36,0.6)] hover:bg-brand-red/10 transition-all duration-300"
  >
    Verify Authenticity
  </Link>
</div>
          </motion.div>
        </div>
      </section>

      {/* AI Fitment Search Module */}
      <section className="relative z-20 md:-mt-24 mt-12 px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
              <Sparkles className="text-brand-red" size={14} />
              <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest">AI Fitment Engine</span>
            </div>
            <h2 className="text-xl font-display font-black italic uppercase tracking-tight">
              Find Your <span className="text-brand-red">Exact</span> Fitment
            </h2>
          </div>
          <FitmentSearchAI />
        </div>
      </section>

      {/* Feature Strip Old one */}
      {/* <section className="bg-black/80 border-y border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="text-brand-red" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-xs tracking-wider">QR Authentication</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Genuine Product Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Users className="text-brand-blue" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-xs tracking-wider">Dealer Program</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">B2B Pricing & Bulk Orders</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Gauge className="text-brand-red" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-xs tracking-wider">Dyno Tested</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Guaranteed Power Output</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Zap className="text-brand-blue" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-xs tracking-wider">Fast Shipping</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Global Logistics Network</p>
            </div>
          </div>
        </div>
      </section> */}




      {/* Feature Strip - Updated with Highlighted Scratch Background */}


<section className="relative z-30 py-12 border-y border-white/5 overflow-hidden">
  {/* Background Scratch Texture */}
  <div className="absolute inset-0 bg-[#1a1a1a]" />
  <div 
    className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" 
    style={{ 
      backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum.png')`,
      backgroundSize: '300px' 
    }} 
  />

  {/* Main Container - Changed max-w-7xl to max-w-none for full width coverage */}
  <div className="relative z-10 w-full px-6 md:px-10">
    {/* Grid with 0 gap and full width items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-0">
      
      {/* Item 1 */}
      <div className="flex items-center justify-center gap-6 group lg:border-r lg:border-white/10 py-4 lg:px-12">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#E31E24] group-hover:shadow-[0_0_15px_rgba(227,30,36,0.4)] transition-all duration-300 shrink-0">
          <ShieldCheck className="text-[#E31E24]" size={28} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-display font-bold uppercase text-[12px] md:text-[13px] tracking-wider text-white leading-tight">QR Authentication</h3>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">Genuine Protection</p>
        </div>
      </div>

      {/* Item 2 */}
      <div className="flex items-center justify-center gap-6 group lg:border-r lg:border-white/10 py-4 lg:px-12">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#003366] group-hover:shadow-[0_0_15px_rgba(0,51,102,0.5)] transition-all duration-300 shrink-0">
          <Users className="text-[#003366]" size={28} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-display font-bold uppercase text-[12px] md:text-[13px] tracking-wider text-white leading-tight">Dealer Program</h3>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">B2B & Bulk Orders</p>
        </div>
      </div>

      {/* Item 3 */}
      <div className="flex items-center justify-center gap-6 group lg:border-r lg:border-white/10 py-4 lg:px-12">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#E31E24] group-hover:shadow-[0_0_15px_rgba(227,30,36,0.4)] transition-all duration-300 shrink-0">
          <Gauge className="text-[#E31E24]" size={28} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-display font-bold uppercase text-[12px] md:text-[13px] tracking-wider text-white leading-tight">Dyno Tested</h3>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">Guaranteed Power</p>
        </div>
      </div>

      {/* Item 4 */}
      <div className="flex items-center justify-center gap-6 group py-4 lg:px-12">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#003366] group-hover:shadow-[0_0_15px_rgba(0,51,102,0.5)] transition-all duration-300 shrink-0">
          <Zap className="text-[#003366]" size={28} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-display font-bold uppercase text-[12px] md:text-[13px] tracking-wider text-white leading-tight">Fast Shipping</h3>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">Global Logistics</p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Popular Categories Old one */}
      {/* <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-display font-bold italic uppercase mb-2 tracking-widest">Popular Engine Categories</h2>
            <div className="w-16 h-1 bg-brand-red mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-lg bg-[#0A0F1E]/60 p-6 flex flex-col items-center text-center transition-all duration-300 ${idx === 0 ? 'border-glow-red' : 'border-glow-blue'}`}
              >
                <h3 className="text-sm font-display font-bold mb-6 uppercase tracking-widest group-hover:text-white transition-colors">
                  {product.name}
                </h3>
                
                <div className="aspect-square w-full mb-8 overflow-hidden rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <Link to={`/product/${product.id}`} className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 ${idx === 0 ? 'bg-brand-red/20 text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white' : 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue hover:text-navy-deep'}`}>
                  Shop Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Popular Categories Section Updated one - Blue to Red Hover Fix */}




<section className="py-24 bg-black relative overflow-hidden">
  {/* Background Texture */}
  <div 
    className="absolute inset-0 opacity-[0.05] pointer-events-none" 
    style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} 
  />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-bold italic uppercase mb-2 tracking-widest text-white">
        Popular Engine Categories
      </h2>
      <div className="w-16 h-1 bg-[#E31E24] mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.slice(0, 6).map((product) => {
        const displayName = product.name.replace(/Torque Craft/gi, "").trim();

        return (
          <motion.div
            key={product.id}
            whileHover={{ y: -10 }}
            /* DEFAULT: Border & Glow using #003366
               HOVER: Switches to Torque Craft Red #E31E24
            */
            className="group relative overflow-hidden rounded-3xl bg-[#0A0F1E]/60 p-8 flex flex-col items-center text-center transition-all duration-300 
                       border-4 border-[#003366]/60 
                       shadow-[0_0_30px_rgba(0,51,102,0.3)] 
                       hover:border-[#E31E24] hover:shadow-[0_0_40px_rgba(227,30,36,0.4)]
                       active:border-[#E31E24] active:shadow-[0_0_40px_rgba(227,30,36,0.4)]"
          >
            {/* Name: #003366 by default, Red on hover */}
            <h3 className="text-sm md:text-base font-display font-bold mb-6 uppercase tracking-widest text-[#003366] group-hover:text-[#E31E24] transition-colors duration-300">
              {displayName}
            </h3>
            
            <div className="aspect-square w-full mb-8 overflow-hidden rounded-2xl bg-black/40 border border-white/5">
              <img 
                src={product.image} 
                alt={displayName} 
                className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Button: Matching #003366 theme */}
            <Link 
              to={`/product/${product.id}`} 
              className="w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 
                         rounded-xl border-2 border-[#003366]/40 text-[#003366] bg-[#003366]/10
                         group-hover:bg-[#E31E24] group-hover:text-white group-hover:border-[#E31E24] group-hover:shadow-[0_0_20px_rgba(227,30,36,0.5)]
                         active:bg-[#E31E24] active:text-white"
            >
              Shop Now
            </Link>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/*                     Join the Network Section                        */}
      {/* <section className="py-24 bg-navy-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-brand-blue/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black italic uppercase tracking-tighter mb-4">
              Join the <span className="text-brand-red">Torque Craft</span> Business  Network
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">choose your precision advantage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="metallic-card p-10 flex flex-col items-center text-center group hover:border-brand-blue/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Users className="text-brand-blue" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase italic mb-4">Performance Enthusiast</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-8">
                Access your private garage, track warranties, and get exclusive early access to new SKU drops.
              </p>
              <Link to="/signup" className="btn-secondary w-full py-3 text-[10px] font-black uppercase tracking-widest border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-navy-deep">
                Create Account
              </Link>
            </div>

            <div className="metallic-card p-10 flex flex-col items-center text-center group hover:border-brand-red/30 transition-all border-brand-red/10">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-brand-red" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase italic mb-4">Authorized Dealer</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-8">
                Join our network of elite shops. Get bulk pricing, priority shipping, and dealer-only support.
              </p>
              <Link to="/dealer-application" className="btn-secondary w-full py-3 text-[10px] font-black uppercase tracking-widest border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white">
                Apply Now
              </Link>
            </div>

            <div className="metallic-card p-10 flex flex-col items-center text-center group hover:border-white/20 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-white/70" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold uppercase italic mb-4">Global Distributor</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-8">
                Scale Torque Craft in your region. Large-scale logistics, global marketing assets, and direct HQ access.
              </p>
              <Link to="/distributor-application" className="btn-secondary w-full py-3 text-[10px] font-black uppercase tracking-widest border-white/10 text-white hover:bg-white/5">
                Partner with Us
              </Link>
            </div>
          </div>
        </div>
      </section> */}


      <section className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
  {/* Background Texture Overlay */}
  <div 
    className="absolute inset-0 opacity-[0.05] pointer-events-none" 
    style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} 
  />
  
  {/* Radial Gradient for depth */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E31E24]/5 via-transparent to-transparent" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl font-display font-black italic uppercase tracking-tighter mb-4 text-white leading-tight">
        Join the <span className="text-[#E31E24]">Torque Craft</span> <br className="md:hidden" /> Business Network
      </h2>
      <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">choose your precision advantage</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {[
        { title: "Performance Enthusiast", desc: "Access your private garage, track warranties, and get exclusive early access to new SKU drops.", link: "/signup", Icon: Users },
        { title: "Authorized Dealer", desc: "Join our network of elite shops. Get bulk pricing, priority shipping, and dealer-only support.", link: "/dealer-application", Icon: ShieldCheck },
        { title: "Global Distributor", desc: "Scale Torque Craft in your region. Large-scale logistics, global marketing assets, and direct HQ access.", link: "/distributor-application", Icon: Zap }
      ].map((card, idx) => (
        <div 
          key={idx} 
          /* UPDATED: 
            1. Border changed from Gray (white/5) to Blue (#003366/60).
            2. Added default blue glow (shadow).
            3. Hover remains Red (#E31E24) as requested.
          */
          className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 rounded-3xl 
                     border-4 border-[#003366]/60 
                     shadow-[0_0_30px_rgba(0,51,102,0.2)]
                     hover:border-[#E31E24] active:border-[#E31E24] 
                     hover:shadow-[0_0_40px_rgba(227,30,36,0.35)] active:shadow-[0_0_40px_rgba(227,30,36,0.35)] 
                     group"
        >
          {/* Icon Box: Changed default border to blue to match */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#E31E24]/5 border border-[#003366]/40 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-active:scale-110 group-hover:border-[#E31E24]/40 transition-all">
            <card.Icon className="text-[#E31E24]" size={idx === 2 ? 28 : 32} />
          </div>

          <h3 className="text-lg md:text-xl font-display font-bold uppercase italic mb-4 text-white tracking-wide group-hover:text-[#E31E24] transition-colors">
            {card.title}
          </h3>
          
          <p className="text-white/40 text-[10px] md:text-[11px] leading-relaxed mb-8 min-h-[3rem] uppercase tracking-wider">
            {card.desc}
          </p>

          <Link 
            to={card.link} 
            className="w-full py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-xl border-2 border-[#003366]/30 text-[#003366] hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24] active:bg-[#E31E24] active:text-white"
          >
            {idx === 0 ? "Create Account" : idx === 1 ? "Apply Now" : "Partner with Us"}
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>
      
    </div>
  );
};

export default Home;
