import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, History, Heart, Settings, Plus, Trash2, QrCode, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'garage' | 'warranty' | 'orders' | 'wishlist'>('garage');
  const navigate = useNavigate();

  const [garage, setGarage] = useState([
    { id: 1, make: 'Dodge', model: 'Ram 2500', year: '2005', engine: '5.9L Cummins' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="metallic-card p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-display font-black text-brand-blue">{user?.name.charAt(0)}</span>
              </div>
              <h2 className="font-display font-bold uppercase tracking-wider">{user?.name}</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Customer Account</p>
            </div>

            <nav className="metallic-card overflow-hidden">
              <button 
                onClick={() => setActiveTab('garage')}
                className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'garage' ? 'bg-brand-blue/10 text-brand-blue border-l-2 border-brand-blue' : 'text-white/40 hover:bg-white/5'}`}
              >
                <Car size={18} /> Vehicle Garage
              </button>
              <button 
                onClick={() => setActiveTab('warranty')}
                className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'warranty' ? 'bg-brand-red/10 text-brand-red border-l-2 border-brand-red' : 'text-white/40 hover:bg-white/5'}`}
              >
                <ShieldCheck size={18} /> Warranty Service
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white/10 text-white border-l-2 border-white' : 'text-white/40 hover:bg-white/5'}`}
              >
                <History size={18} /> Order History
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'wishlist' ? 'bg-brand-blue/10 text-brand-blue border-l-2 border-brand-blue' : 'text-white/40 hover:bg-white/5'}`}
              >
                <Heart size={18} /> Wishlist
              </button>
              <div className="border-t border-white/5 mt-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-red hover:bg-brand-red/5 transition-all"
                >
                  <Settings size={18} /> Logout
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-6">
            {activeTab === 'garage' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-black italic uppercase">My Garage</h2>
                  <button className="btn-primary flex items-center gap-2 text-xs">
                    <Plus size={16} /> Add Vehicle
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {garage.map(vehicle => (
                    <div key={vehicle.id} className="metallic-card p-6 flex items-center justify-between group">
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
                          <Car size={32} />
                        </div>
                        <div>
                          <h3 className="font-bold uppercase tracking-wider">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{vehicle.engine}</p>
                        </div>
                      </div>
                      <button className="p-2 text-white/20 hover:text-brand-red transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'warranty' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="text-center p-12 metallic-card border-brand-red/20">
                  <div className="inline-block p-6 rounded-3xl bg-brand-red/10 border border-brand-red/20 mb-8">
                    <QrCode size={48} className="text-brand-red" />
                  </div>
                  <h2 className="text-3xl font-display font-black italic uppercase mb-4">Register New Warranty</h2>
                  <p className="text-white/50 text-sm max-w-md mx-auto mb-10">
                    Scan the QR code on your product to activate your lifetime warranty. Your profile details will be auto-filled for a faster experience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary px-10 py-4 flex items-center gap-3">
                      <QrCode size={20} /> Scan QR Code
                    </button>
                    <button className="btn-secondary px-10 py-4 border-white/10 text-white hover:bg-white/5">
                      Enter Serial Manually
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Active Warranties</h3>
                  <div className="metallic-card p-6 flex items-center justify-between border-brand-blue/20">
                    <div className="flex items-center gap-6">
                      <div className="p-3 rounded-lg bg-brand-blue/10 text-brand-blue">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-wider">Head Stud Kit - Cummins 5.9L</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Serial: TC-8829-X1 • Activated: Oct 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[10px] font-bold text-brand-blue uppercase tracking-widest">Active</span>
                      <ArrowRight size={18} className="text-white/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 metallic-card">
                <History size={48} className="text-white/10 mx-auto mb-6" />
                <h2 className="text-xl font-display font-bold uppercase tracking-widest">No Recent Orders</h2>
                <p className="text-white/40 text-xs mt-2">Your order history will appear here once you make a purchase.</p>
                <button onClick={() => navigate('/shop')} className="btn-primary mt-8 px-8">Start Shopping</button>
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 metallic-card">
                <Heart size={48} className="text-white/10 mx-auto mb-6" />
                <h2 className="text-xl font-display font-bold uppercase tracking-widest">Wishlist is Empty</h2>
                <p className="text-white/40 text-xs mt-2">Save products you're interested in for later.</p>
                <button onClick={() => navigate('/shop')} className="btn-primary mt-8 px-8">Browse Catalog</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
