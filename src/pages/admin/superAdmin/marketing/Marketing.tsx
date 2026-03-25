import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, 
  TicketPercent, 
  Users2, 
  Rocket, 
  Share2, 
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Import your sub-components here
import PromoCode from './PromoCode';
import Influencers from './Influencers';
import Campaigns from './Campaigns';
import ReferralTracking from './ReferralTracking';
import BannerAndOffer from './BannerandOffer';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MARKETING_SECTIONS = [
  { id: 'promo', name: 'Promo Codes', icon: TicketPercent, component: <PromoCode /> },
  { id: 'influencer', name: 'Influencers', icon: Users2, component: <Influencers /> },
  { id: 'campaign', name: 'Campaigns', icon: Rocket, component: <Campaigns /> },
  { id: 'referral', name: 'Referral Tracking', icon: Share2, component: <ReferralTracking /> },
  { id: 'banner', name: 'Banner & Offers', icon: ImageIcon, component: <BannerAndOffer /> },
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('promo');

  return (
    <div className="min-h-screen bg-[#05070A] p-6 lg:p-10 text-slate-300">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section - Same as Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/50 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-4">
              <Megaphone className="text-cyan-500" size={32} />
              Marketing Control Center
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-1">Growth & Acquisition Engine v1.0</p>
          </div>
        </div>

        {/* Marketing Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MARKETING_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 group relative overflow-hidden",
                  isActive 
                    ? "bg-cyan-500/10 border-cyan-500/50 text-white" 
                    : "bg-[#0B0F18] border-slate-800/50 text-slate-500 hover:border-slate-700"
                )}
              >
                <Icon size={24} className={isActive ? "text-cyan-400" : "group-hover:text-cyan-400"} />
                <span className="text-[10px] font-black uppercase tracking-widest">{section.name}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute -bottom-2 w-full h-1 bg-cyan-500 blur-sm"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B0F18] border border-slate-800/50 rounded-2xl p-8 min-h-[500px]"
            >
              {MARKETING_SECTIONS.find(s => s.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}