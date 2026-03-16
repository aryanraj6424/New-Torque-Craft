

import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, ShieldCheck, Gauge, Package, Settings, LogOut, ChevronRight, Facebook, Instagram, Twitter, Youtube, LogIn, ChevronDown, X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import QRVerify from './pages/QRVerify';
import WarrantyDashboard from './pages/WarrantyDashboard';
import Checkout from './pages/Checkout';

// --- Updated Admin Imports ---
import Dealer from './pages/admin/dealer/Dealer';
import Distributor from './pages/admin/distributor/Distributor';
import SuperAdmin from './pages/admin/superAdmin/SuperAdmin';
// ----------------------------

import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import About from './pages/About';
import OurWork from './pages/OurWork';
import DealerApplication from './pages/DealerApplication';
import DistributorApplication from './pages/DistributorApplication';
import FAQ from './pages/FAQ';
import Policies from './pages/Policies';
import ScrollToTop from "./components/ScrollToTop";
import PartnershipLogos from './components/PartnershipLogos';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout, isAuthenticated, isAdmin, isSuperAdmin, isBusiness, isCustomer } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      label: 'Shop',
      sub: [
        { label: 'Head Stud Kit', path: '/shop?cat=Head Stud Kit' },
        { label: 'Main Stud Kit', path: '/shop?cat=Main Stud Kit' },
        { label: 'Pro Series', path: '/shop?cat=Pro Series' },
        { label: 'Accessories', path: '/shop?cat=Accessories' },
      ]
    },
    {
      label: 'Engines',
      sub: [
        { label: 'Diesel Engine', path: '/shop?cat=Diesel' },
        { label: 'Gas Engine', path: '/shop?cat=Gas' },
      ]
    },
    {
      label: 'Warranty',
      sub: [
        { label: 'Verify Authenticity', path: '/verify' },
        { label: 'Register Warranty', path: '/verify' },
        { label: 'Warranty Policy', path: '/policies/refund' },
        { label: 'Report Counterfeit', path: '/contact' },
      ]
    },
    {
      label: 'Business',
      sub: [
        { label: 'Dealer Application', path: '/dealer-application' },
        { label: 'Distributor Application', path: '/distributor-application' },
        { label: 'Dealer Login', path: '/login' },
        { label: 'Distributor Login', path: '/login' },
      ]
    },
    {
      label: 'Support',
      sub: [
        { label: 'Shipping & Returns', path: '/policies/refund' },
        { label: 'Returns/RMA', path: '/policies/refund' },
        { label: 'Contact', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
      ]
    },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B0F18]/90 backdrop-blur-md border-b border-white/10 py-3' 
    : 'bg-gradient-to-b from-[#0B0F18] to-transparent py-6'}`}>
      <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className="text-xl sm:text-3xl font-black font-display tracking-tighter italic">
            <span className="text-white">TORQUE </span>
            <span className="text-brand-red">CRAFT</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center ml-auto mr-12 gap-8 text-sm font-bold uppercase tracking-[0.2em] text-white/90">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <button 
                onMouseEnter={() => setActiveDropdown(item.label)}
                className={`flex items-center gap-1.5 hover:text-brand-red transition-colors ${activeDropdown === item.label ? 'text-brand-red' : ''}`}
              >
                {item.label} <ChevronDown size={14} strokeWidth={3} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-4 w-48 bg-navy-deep border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="block px-4 py-3 text-[10px] hover:bg-white/5 hover:text-brand-red transition-all rounded"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {/* Updated Portal Links Logic */}
          {isSuperAdmin ? (
            <Link to="/admin/super-admin" className="hover:text-brand-blue transition-colors text-brand-blue">HQ Portal</Link>
          ) : isBusiness ? (
            <Link to={user?.role === 'distributor' ? "/admin/distributor" : "/admin/dealer"} className="hover:text-brand-red transition-colors text-brand-red">Business Portal</Link>
          ) : isCustomer ? (
            <Link to="/dashboard" className="hover:text-brand-blue transition-colors text-brand-blue">My Garage</Link>
          ) : null}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to={isSuperAdmin ? "/admin/super-admin" : isBusiness ? (user?.role === 'distributor' ? "/admin/distributor" : "/admin/dealer") : "/dashboard"} className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                <User size={28} />
                <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-widest">{user?.name}</span>
              </Link>
              <button onClick={handleLogout} className="hidden sm:block text-white/70 hover:text-brand-red transition-colors">
                <LogOut size={28} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/login" className="text-white/70 hover:text-brand-red transition-colors flex items-center gap-2">
                <User size={28} />
                <span className="hidden lg:inline text-[12px] font-bold uppercase tracking-widest">Login</span>
              </Link>
              <Link to="/signup" className="hidden sm:flex btn-primary py-2.5 px-8 text-[12px] font-black uppercase tracking-[0.2em] ">
                Join
              </Link>
            </div>
          )}

          <Link to="/checkout" className="text-white/70 hover:text-white transition-colors relative">
            <ShoppingCart size={28} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-white/70 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <span className="text-xl font-black font-display tracking-tighter italic">
                  <span className="text-white">TORQUE</span>
                  <span className="text-brand-red">CRAFT</span>
                </span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/70">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-10 space-y-10">
              {navItems.map((item) => (
                <div key={item.label} className="space-y-6">
                  <p className="text-[11px] font-black text-brand-red uppercase tracking-[0.3em] border-l-2 border-brand-red pl-4">{item.label}</p>
                  <div className="grid grid-cols-1 gap-4 pl-4">
                    {item.sub.map((sub) => (
                      <Link 
                        key={sub.label} 
                        to={sub.path} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xl font-display font-bold uppercase italic text-white/70 hover:text-white flex items-center justify-between group"
                      >
                        {sub.label}
                        <ChevronRight size={20} strokeWidth={3} className="text-white/20 group-hover:text-brand-red transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
    
  );
};


const Footer = () => {
  return (
    <footer className="bg-[#070A10] border-t border-white/10  pb-12">
      <PartnershipLogos/>
      <br />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-3xl font-black font-display tracking-tighter italic">
              <span className="text-white">TORQUE </span>
              <span className="text-brand-red">CRAFT</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-md">
            Precision-engineered head and main stud kits for high-performance diesel platforms. Crafted for quality. Built for performance.
          </p>
          <div className="flex gap-6">
            <Facebook size={18} className="text-white/30 hover:text-brand-red cursor-pointer transition-colors" />
            <Instagram size={18} className="text-white/30 hover:text-brand-red cursor-pointer transition-colors" />
            <Twitter size={18} className="text-white/30 hover:text-brand-red cursor-pointer transition-colors" />
            <Youtube size={18} className="text-white/30 hover:text-brand-red cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
          <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-bold">
            <li><Link to="/shop" className="hover:text-brand-red transition-colors">Shop</Link></li>
            <li><Link to="/shop?cat=Diesel" className="hover:text-brand-red transition-colors">Engines</Link></li>
            <li><Link to="/verify" className="hover:text-brand-red transition-colors">Warranty</Link></li>
            <li><Link to="/dealer-application" className="hover:text-brand-red transition-colors">Business</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Company</h4>
          <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest font-bold">
            <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
            <li><Link to="/our-work" className="hover:text-brand-red transition-colors">Our Work</Link></li>
            <li><Link to="/faq" className="hover:text-brand-red transition-colors">FAQ</Link></li>
            <li><Link to="/policies/terms" className="hover:text-brand-red transition-colors">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold uppercase tracking-widest text-[10px] mb-8">Newsletter</h4>
          <p className="text-xs text-white/40 mb-6 leading-relaxed">Get the latest performance updates and exclusive offers.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded px-4 py-2 text-xs w-full focus:outline-none focus:border-brand-red transition-colors" />
            <button className="bg-brand-red px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12 border-t border-white/5 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-[9px] md:text-[10px] 
            text-white/40 
            uppercase 
            tracking-[0.25em] md:tracking-[0.4em] 
            font-display 
            border border-white/5 
            px-5 py-2.5 md:px-8 md:py-3
            rounded-full 
            bg-[#0B0F18]/40 
            backdrop-blur-sm
            text-center
            transition-all duration-500
            hover:border-brand-red/40 hover:bg-brand-red/5 hover:text-white/70
            cursor-default">
            © 2026 <span className="text-white/90 font-bold tracking-widest">TORQUE CRAFT</span> 
            <span className="hidden md:inline mx-3 opacity-30">|</span> 
            <br className="block md:hidden mb-1" />
            <span className="font-light">All Rights Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-navy-deep text-white selection:bg-brand-red selection:text-white">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/verify" element={<QRVerify />} />
                <Route path="/warranty" element={<WarrantyDashboard />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Updated Admin Routes */}
                <Route path="/admin/dealer" element={<Dealer />} />
                <Route path="/admin/distributor" element={<Distributor />} />
                <Route path="/admin/super-admin" element={<SuperAdmin />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-work" element={<OurWork />} />
                <Route path="/dealer-application" element={<DealerApplication />} />
                <Route path="/distributor-application" element={<DistributorApplication />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/policies/:type" element={<Policies />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}