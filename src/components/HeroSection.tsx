import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { products } from '../data/products';

interface HeroSectionProps {
  onExploreInventory: () => void;
  onExploreSale: () => void;
  onSelectProduct: (product: any) => void;
  onQuickAdd: (product: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreInventory,
  onExploreSale,
  onSelectProduct,
  onQuickAdd,
}) => {
  const iphone = products[0];
  const glasses = products[8];

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-16 pb-6 overflow-hidden">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest text-[#111] shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6C5CFF] animate-pulse" />
            NEW SEASON • SS25 TECH EDIT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[44px] md:text-[80px] lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-[800] max-w-full break-words text-[#111]"
          >
            TECH
            <br />
            / THAT
            <br />
            <span className="text-[#6C5CFF]">THINKS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[520px] text-[16px] md:text-[18px] leading-[1.5] text-black/60"
          >
            A curated lab of tools that disappear. Smartphones, speakers, glasses, consoles — edited for obsessives, not algorithms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={onExploreInventory}
              className="h-[48px] px-7 rounded-full bg-[#111] text-white font-bold text-[14px] flex items-center gap-2 hover:bg-black transition shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              SHOP INVENTORY <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExploreSale}
              className="h-[48px] px-7 rounded-full bg-white border border-black/10 font-bold text-[14px] hover:bg-black/5 transition shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              SALE • UP TO 40% OFF
            </button>
            <span className="text-[12px] text-black/40 font-medium ml-1">
              ↳ 24 products • free 30-day returns
            </span>
          </motion.div>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-[520px]"
          >
            {[
              { k: '4.9/5', v: 'Avg rating from 38k reviews' },
              { k: '2YR', v: 'Warranty included, no questions' },
              { k: '$299+', v: 'Free express shipping' },
            ].map((item, index) => (
              <motion.div
                key={item.k}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-[20px] bg-white border border-black/5 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)]"
              >
                <p className="text-[20px] font-[800] tracking-tight text-[#111]">
                  {item.k}
                </p>
                <p className="text-[12px] text-black/60 leading-[1.3] mt-1 font-medium">
                  {item.v}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Layered 3D Art Composition with Floating Animations */}
        <div className="relative lg:h-[620px] h-[520px] mt-4 lg:mt-0 overflow-hidden rounded-[32px] max-w-full">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,#6C5CFF18,transparent)]" />

          {/* Layer 1: iPhone 15 Pro */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0],
              rotate: [-2, 0, -2]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.3 },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" }
            }}
            onClick={() => onSelectProduct(iphone)}
            className="absolute left-[8%] top-[8%] w-[72%] md:w-[68%] cursor-pointer z-10"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 0 }}
              className="rounded-[32px] bg-white border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-4 transition-shadow hover:shadow-[0_40px_100px_rgba(108,92,255,0.18)]"
            >
              <div className="rounded-[24px] aspect-[4/3] overflow-hidden bg-black/5 relative">
                <img
                  src="./hero-images/smartphone-1.jpg"
                  alt={iphone.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[14px] text-[#111]">{iphone.name}</p>
                  <p className="text-[12px] text-black/50">
                    {iphone.brand} • ${iphone.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(iphone);
                  }}
                  className="w-9 h-9 rounded-full bg-[#111] text-white grid place-items-center hover:bg-black shadow-sm"
                  aria-label="Add iPhone to cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Layer 2: Ray-Ban Meta Glasses */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 6 }}
            animate={{ 
              opacity: 1, 
              y: [0, 10, 0],
              rotate: [3, 5, 3]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 },
              rotate: { repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1 }
            }}
            onClick={() => onSelectProduct(glasses)}
            className="absolute right-[2%] top-[30%] w-[64%] md:w-[60%] cursor-pointer z-20"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 0 }}
              className="rounded-[32px] bg-[#111] text-white border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] p-4 transition-shadow hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
            >
              <div className="rounded-[24px] aspect-[4/3] overflow-hidden bg-white/5 relative">
                <img
                  src="./hero-images/meta-glasses.jpg"
                  alt={glasses.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[14px] text-white">{glasses.name}</p>
                  <p className="text-[12px] text-white/60">New Drop • Spatial</p>
                </div>
                <span className="bg-[#E8FF5A] text-black text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  NEW
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Layer 3: Audio Week badge card */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -3 }}
            animate={{ 
              opacity: 1, 
              y: [0, -12, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.5 },
              y: { repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 2 },
              rotate: { repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 2 }
            }}
            onClick={onExploreSale}
            className="absolute left-[20%] bottom-[4%] w-[58%] md:w-[52%] cursor-pointer z-30"
          >
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 0 }}
              className="rounded-[32px] bg-[#E8FF5A] border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3 transition-shadow hover:shadow-[0_30px_80px_rgba(232,255,90,0.3)]"
            >
              <div className="rounded-[20px] aspect-[1/1] overflow-hidden bg-black/5 relative">
                <img
                  src="./hero-images/headphones.jpg"
                  alt="Audio Week"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-2 py-2">
                <p className="font-bold text-[13px] text-[#111]">Audio Week • Curated</p>
                <p className="text-[11px] text-black/70 font-medium">
                  WH-1000XM5 + more • up to 40% off
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Down Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-2 top-[55%] hidden md:flex w-[88px] h-[88px] rounded-full bg-white border border-black/10 shadow-xl items-center justify-center pointer-events-none z-30"
          >
            <div className="text-center leading-none">
              <p className="text-[11px] font-bold tracking-widest text-[#111]">SCROLL</p>
              <motion.p 
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-[22px] text-[#111] mt-0.5"
              >
                ↓
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="mt-10 md:mt-6 w-full border-y border-black/10 bg-white overflow-hidden max-w-full">
        <div className="flex animate-marquee whitespace-nowrap py-3 w-max select-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 text-[13px] font-bold tracking-widest px-6 text-[#111]"
            >
              <span>FREE SHIPPING OVER $299</span>
              <span className="w-1 h-1 rounded-full bg-black" />
              <span>2 YEAR WARRANTY</span>
              <span className="w-1 h-1 rounded-full bg-black" />
              <span>30 DAY RETURNS</span>
              <span className="w-1 h-1 rounded-full bg-black" />
              <span className="text-[#6C5CFF]">NOVA LAB • EDITED TECH</span>
              <span className="w-1 h-1 rounded-full bg-black" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};