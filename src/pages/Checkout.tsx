import { useState } from 'react';
import { CheckCircle2, CreditCard, MapPin, ShoppingBag, ChevronRight, Truck, ShieldCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const steps = [
    { id: 1, name: 'Cart', icon: ShoppingBag },
    { id: 2, name: 'Address', icon: MapPin },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Confirm', icon: CheckCircle2 },
  ];

  const handleCompleteOrder = () => {
    clearCart();
    setStep(4);
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-navy-deep flex flex-col items-center justify-center px-6">
        <div className="metallic-card p-12 text-center max-w-md">
          <ShoppingBag size={48} className="mx-auto text-white/20 mb-6" />
          <h2 className="text-2xl font-display font-black italic uppercase mb-4">Your Cart is Empty</h2>
          <p className="text-white/50 mb-8">Looks like you haven't added any performance parts to your build yet.</p>
          <Link to="/shop" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-16 max-w-3xl mx-auto">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-grow last:flex-grow-0">
              <div className="flex flex-col items-center gap-2 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? 'bg-brand-red border-brand-red text-white glow-red' : 'bg-white/5 border-white/10 text-white/30'}`}>
                  <s.icon size={18} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 whitespace-nowrap ${step >= s.id ? 'text-white' : 'text-white/30'}`}>
                  {s.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-[2px] flex-grow mx-4 transition-all duration-500 ${step > s.id ? 'bg-brand-red' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="metallic-card p-8"
                >
                  <h2 className="text-2xl font-display font-black italic uppercase mb-8">Review Your Cart</h2>
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6 py-6 border-b border-white/10 last:border-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-black flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <span className="font-display font-black italic text-brand-red">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-white/40 uppercase tracking-widest mb-4">SKU: {item.sku}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-white/10 rounded overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-white/5 transition-colors"
                              >-</button>
                              <span className="px-4 py-1 text-sm border-x border-white/10">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-white/5 transition-colors"
                              >+</button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/30 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-end">
                    <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                      Shipping Details <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="metallic-card p-8"
                >
                  <h2 className="text-2xl font-display font-black italic uppercase mb-8">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">First Name</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Last Name</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Address</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">City</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Zip Code</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                  </div>
                  <div className="mt-12 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">
                      Payment Method <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="metallic-card p-8"
                >
                  <h2 className="text-2xl font-display font-black italic uppercase mb-8">Payment Details</h2>
                  <div className="space-y-6">
                    <div className="p-4 border border-brand-red bg-brand-red/5 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="text-brand-red" />
                        <span className="text-sm font-bold uppercase tracking-wider">Credit / Debit Card</span>
                      </div>
                      <div className="w-4 h-4 rounded-full border-4 border-brand-red" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Card Number</label>
                      <input type="text" placeholder="**** **** **** ****" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">CVV</label>
                        <input type="text" placeholder="***" className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-brand-red outline-none" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex justify-between">
                    <button onClick={() => setStep(2)} className="text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Back</button>
                    <button onClick={handleCompleteOrder} className="btn-primary flex items-center gap-2">
                      Complete Order <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="metallic-card p-12 text-center"
                >
                  <div className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="text-brand-blue" size={40} />
                  </div>
                  <h2 className="text-3xl font-display font-black italic uppercase mb-4">Order Confirmed!</h2>
                  <p className="text-white/50 mb-8 max-w-md mx-auto">
                    Your performance build is underway. We've sent a confirmation email with your order details and tracking information.
                  </p>
                  <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-10 max-w-sm mx-auto">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Order Number</p>
                    <p className="text-lg font-mono font-bold tracking-widest">#TC-8829-XQ</p>
                  </div>
                  <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                    Back to Shop <ChevronRight size={18} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <div className="metallic-card p-8 sticky top-32">
                <h3 className="text-lg font-display font-bold italic uppercase mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping (LTL Freight)</span>
                    <span className="text-brand-blue font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Total</span>
                    <span className="text-3xl font-display font-black italic text-brand-red">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest">
                    <Truck size={14} className="text-brand-blue" /> Secure White-Glove Delivery
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-brand-red" /> 256-Bit SSL Encrypted
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
