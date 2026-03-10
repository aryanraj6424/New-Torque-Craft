import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, ChevronRight, ShoppingCart, Heart, Share2, CheckCircle2, Star, User, MessageSquare, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products.json';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  
  // Mock reviews state
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Mike R.', rating: 5, comment: 'Absolute beast of an engine. The power delivery is smooth and consistent.', date: '2 weeks ago' },
    { id: 2, user: 'Sarah T.', rating: 4, comment: 'Great build quality. Installation was straightforward with the included guide.', date: '1 month ago' }
  ]);
  
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      user: user?.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Just now'
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
    alert('Thank you for your review! It has been posted.');
  };

  return (
    <div className="pt-32 pb-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 mb-12">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden metallic-card p-2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden metallic-card p-1 cursor-pointer hover:border-brand-red transition-colors">
                  <img src={`https://loremflickr.com/400/400/engine,detail,metal?lock=${i + 50}`} alt="Engine Detail" className="w-full h-full object-cover rounded-md opacity-50 hover:opacity-100" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-blue/20 text-brand-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand-blue/30">
                In Stock
              </span>
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black italic uppercase mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-display font-black italic text-brand-red">
                ${product.price.toLocaleString()}
              </span>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Financing available</span>
                <span className="text-xs font-bold text-white/80">As low as $450/mo</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-brand-blue" size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Vehicle Compatibility</span>
              </div>
              <ul className="space-y-2">
                {product.compatibility.map(v => (
                  <li key={v} className="text-xs text-white/60 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-blue" /> {v}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-white/60 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className={`btn-primary flex-grow flex items-center justify-center gap-3 transition-all ${added ? 'bg-green-600 glow-blue' : ''}`}
              >
                {added ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button className="btn-secondary px-6 flex items-center justify-center">
                <Heart size={20} />
              </button>
              <button className="btn-secondary px-6 flex items-center justify-center">
                <Share2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="text-brand-red" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">3 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="text-brand-blue" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free LTL Freight</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="text-brand-red" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
          <div className="flex border-b border-white/10 mb-10 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'specs' ? 'border-brand-red text-white' : 'border-transparent text-white/30 hover:text-white'}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'reviews' ? 'border-brand-red text-white' : 'border-transparent text-white/30 hover:text-white'}`}
            >
              Reviews ({reviews.length})
            </button>
            <button 
              onClick={() => setActiveTab('guide')}
              className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'guide' ? 'border-brand-red text-white' : 'border-transparent text-white/30 hover:text-white'}`}
            >
              Installation Guide
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div 
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                <div className="space-y-6">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{key}</span>
                      <span className="text-sm font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="metallic-card p-10">
                  <h3 className="text-xl font-display font-bold italic uppercase mb-6">Compare Performance</h3>
                  <p className="text-sm text-white/50 mb-8 leading-relaxed">
                    Our Torque Craft engines are built with precision tolerances that exceed OEM specifications. Each unit is hot-tested and dyno-verified before shipment.
                  </p>
                  <Link to="/shop" className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                    View Comparison Chart <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div 
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="text-2xl font-display font-black italic uppercase mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex text-brand-red">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= 4.8 ? "currentColor" : "none"} />)}
                      </div>
                      <span className="text-sm font-bold">4.8 out of 5</span>
                    </div>
                  </div>
                  {isAuthenticated ? (
                    <button 
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="btn-primary py-2 px-6 text-xs"
                    >
                      {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                    </button>
                  ) : (
                    <Link to="/login" className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">
                      Login to write a review
                    </Link>
                  )}
                </div>

                {showReviewForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="metallic-card p-8 border-brand-blue/30"
                  >
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(i => (
                            <button 
                              key={i} 
                              type="button"
                              onClick={() => setNewReview({...newReview, rating: i})}
                              className={`transition-colors ${i <= newReview.rating ? 'text-brand-red' : 'text-white/10'}`}
                            >
                              <Star size={24} fill={i <= newReview.rating ? "currentColor" : "none"} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Your Review</label>
                        <textarea 
                          required
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                          placeholder="Share your experience with this product..."
                          className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-brand-red min-h-[120px]"
                        />
                      </div>
                      <button type="submit" className="btn-primary py-3 px-8 text-xs">Submit Review</button>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-8">
                  {reviews.map(review => (
                    <div key={review.id} className="metallic-card p-8 border-white/5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-blue">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{review.user}</p>
                            <div className="flex text-brand-red">
                              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill={i <= review.rating ? "currentColor" : "none"} />)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed italic">"{review.comment}"</p>
                      <div className="mt-4 flex items-center gap-4">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-brand-blue transition-colors">Helpful (12)</button>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-brand-red transition-colors">Report</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'guide' && (
              <motion.div 
                key="guide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  <div className="metallic-card p-8 border-brand-blue/20">
                    <h3 className="text-xl font-display font-bold italic uppercase mb-6 flex items-center gap-3">
                      <FileText className="text-brand-blue" /> Installation Overview
                    </h3>
                    <div className="space-y-4 text-sm text-white/60 leading-relaxed">
                      <p>Installation of the {product.name} requires advanced mechanical knowledge and specialized tools. We highly recommend professional installation by a certified diesel technician.</p>
                      <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red flex items-start gap-3">
                        <ShieldCheck size={20} className="flex-shrink-0" />
                        <p className="text-xs font-bold uppercase tracking-wider">Warning: Improper installation may void your 3-year warranty and cause severe engine damage.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Step-by-Step Instructions</h4>
                    {[
                      { step: 1, title: 'Preparation', desc: 'Drain all fluids and disconnect battery. Ensure vehicle is on a stable lift.' },
                      { step: 2, title: 'Removal', desc: 'Remove existing engine assembly and inspect mounts for wear.' },
                      { step: 3, title: 'Integration', desc: 'Align the new Torque Craft unit and torque all bolts to factory specifications.' },
                      { step: 4, title: 'Fluid Fill', desc: 'Fill with high-performance synthetic oil and coolant. Prime the fuel system.' }
                    ].map(item => (
                      <div key={item.step} className="metallic-card p-6 flex gap-6 items-start">
                        <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-display font-bold text-navy-deep flex-shrink-0">{item.step}</div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wider mb-1">{item.title}</p>
                          <p className="text-xs text-white/50">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="metallic-card p-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Resources</h4>
                    <div className="space-y-4">
                      <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-white/10 transition-all">
                        <span>Full PDF Manual</span>
                        <Download size={16} className="text-brand-blue" />
                      </button>
                      <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-white/10 transition-all">
                        <span>Torque Specs Sheet</span>
                        <Download size={16} className="text-brand-blue" />
                      </button>
                      <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-white/10 transition-all">
                        <span>Video Tutorial</span>
                        <Share2 size={16} className="text-brand-red" />
                      </button>
                    </div>
                  </div>
                  <div className="metallic-card p-8 border-glow-blue">
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Need Help?</h4>
                    <p className="text-xs text-white/40 mb-6">Our technical support team is available 24/7 for installation assistance.</p>
                    <button className="btn-primary w-full py-3 text-[10px]">Contact Tech Support</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
