import { useState } from 'react';
import { Search, Sparkles, Loader2, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import products from '../data/products.json';
import { useNavigate } from 'react-router-dom';

const FitmentSearchAI = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are a technical fitment assistant for Torque Craft, a high-performance automotive parts manufacturer.
        The user is asking: "${query}"
        
        Based on the following product catalog, identify the most relevant products that fit the user's vehicle or requirements.
        If multiple products fit, list them. If none fit, explain why and suggest what they might need.
        
        Catalog Data:
        ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, sku: p.sku, compatibility: p.compatibility, engine: p.engineCode })))}
        
        Return ONLY a JSON array of product IDs that match the query. If no matches, return an empty array [].
        Example: ["tc-head-cummins-59-12", "tc-main-cummins-59-12"]
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const matchedIds = JSON.parse(response.text || '[]');
      const matchedProducts = products.filter(p => matchedIds.includes(p.id));
      
      setResults(matchedProducts);
      if (matchedProducts.length === 0) {
        setError("No exact matches found for your vehicle. Please try refining your search or contact support.");
      }
    } catch (err) {
      console.error('AI Search Error:', err);
      setError("The AI fitment engine is currently under maintenance. Please use the manual filters below.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="metallic-card p-2 md:p-4 border-brand-red/20 shadow-2xl shadow-brand-red/10">
        <form onSubmit={handleSearch} className="flex flex-col md:row gap-4">
          <div className="relative flex-grow">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red">
              <Sparkles size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI: 'I have a 2005 Ram 2500 with a 5.9L Cummins, what head studs do I need?'"
              className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-red transition-all text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="btn-primary px-8 py-4 flex items-center justify-center gap-3 disabled:opacity-50 min-w-[160px]"
          >
            {isSearching ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Search size={20} />
                <span>Search Fitment</span>
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {(results.length > 0 || error) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 space-y-4"
          >
            {error && (
              <div className="flex items-center gap-3 p-4 bg-brand-red/10 border border-brand-red/20 rounded-lg text-brand-red text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {results.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="metallic-card p-4 flex items-center justify-between group cursor-pointer hover:border-brand-red/40 transition-all"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded bg-black/40 overflow-hidden border border-white/10">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider group-hover:text-brand-red transition-colors">{product.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">SKU: {product.sku} • {product.engineCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-white/40 uppercase tracking-widest">MSRP</p>
                    <p className="text-sm font-bold text-brand-red">${product.price.toLocaleString()}</p>
                  </div>
                  <ChevronRight className="text-white/20 group-hover:text-brand-red transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FitmentSearchAI;
