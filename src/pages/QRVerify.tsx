import { useState } from 'react';
import { QrCode, Upload, ShieldCheck, AlertTriangle, Calendar, User, Package, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import warrantyData from '../data/warranty.json';

const QRVerify = () => {
  const [serial, setSerial] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      const found = warrantyData.find(w => w.serial === serial);
      setResult(found || 'not_found');
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-navy-deep relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-6"
          >
            <QrCode size={48} className="text-brand-red" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-black italic uppercase mb-4">Product Verification</h1>
          <p className="text-white/50">Enter your serial number or upload a QR code to verify authenticity and warranty status.</p>
        </div>

        <div className="metallic-card p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Enter Serial Number (e.g. TC-QR-12345)"
                value={serial}
                onChange={(e) => setSerial(e.target.value.toUpperCase())}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-4 px-6 text-white focus:outline-none focus:border-brand-red transition-all uppercase font-mono tracking-widest"
              />
            </div>
            <button
              onClick={handleVerify}
              disabled={isVerifying || !serial}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
            >
              {isVerifying ? 'Verifying...' : 'Verify Now'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-white/30 mb-8">
            <div className="h-[1px] flex-grow bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest">OR</span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>

          <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-brand-blue transition-colors cursor-pointer group">
            <Upload size={32} className="mx-auto text-white/20 group-hover:text-brand-blue mb-4 transition-colors" />
            <p className="text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Upload QR Code Image</p>
            <p className="text-[10px] text-white/20 mt-2">Supports JPG, PNG, PDF</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {result === 'not_found' ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 flex items-start gap-6">
                  <div className="p-3 rounded-lg bg-red-500/20">
                    <AlertTriangle className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold uppercase mb-2 text-red-500">Invalid Serial Number</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      We could not find this serial number in our database. Please check the number and try again. If you believe this is an error, contact technical support.
                    </p>
                  </div>
                </div>
              ) : result.activated ? (
                <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-lg bg-brand-blue/20">
                      <ShieldCheck className="text-brand-blue" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold uppercase text-brand-blue">Genuine Product Verified</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Warranty Status: Active</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Package size={16} className="text-white/30" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Product</p>
                          <p className="text-sm font-bold">{result.productName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-white/30" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Registered To</p>
                          <p className="text-sm font-bold">{result.customerName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-white/30" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Activation Date</p>
                          <p className="text-sm font-bold">{result.activationDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={16} className="text-brand-red" />
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Warranty Expiry</p>
                          <p className="text-sm font-bold text-brand-red">{result.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-lg bg-white/10">
                      <Package className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold uppercase">Product Not Yet Activated</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Genuine Product: {result.productName}</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mb-8 leading-relaxed">
                    This genuine Torque Craft component has not been registered. Activate your warranty now to protect your investment.
                  </p>
                  <button 
                    onClick={() => {
                      alert('Warranty activation process started. Please complete your profile.');
                      window.location.href = '/warranty';
                    }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Activate Warranty <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QRVerify;
