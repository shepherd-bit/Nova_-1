import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

interface PromoBannersProps {
  onExploreAudio: () => void;
  onExploreWearables: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({
  onExploreAudio,
  onExploreWearables,
}) => {
  const audioProducts = products.filter((p) => p.superCategory === 'Audio').slice(0, 3);
  const glasses = products[8]; // Ray-Ban Meta Glasses

  return (
    <section id="promos" className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 overflow-hidden">
      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-3 sm:gap-4 md:gap-6">
        
        {/* Banner 1: Audio Week */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] sm:rounded-[32px] bg-[#111] text-white p-5 sm:p-8 md:p-10 relative overflow-hidden min-h-[290px] sm:min-h-[360px] md:min-h-[420px] flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.15)] group"
        >
          {/* Animated Ambient Background Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-[20%] -top-[10%] w-[70%] h-[70%] rounded-full bg-[#6C5CFF] blur-[80px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.35, 0.25]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-[10%] bottom-[-20%] w-[60%] h-[60%] rounded-full bg-[#E8FF5A] blur-[90px] pointer-events-none" 
          />

          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex bg-white text-black text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full tracking-wide sm:tracking-widest shadow-sm"
            >
              SALE WEEK • LIVE NOW
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-[27px] sm:text-[34px] md:text-[54px] leading-[1.0] font-[800] tracking-[-0.02em]"
            >
              UP TO 40%
              <br />
              OFF / AUDIO
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 sm:mt-4 max-w-[380px] text-white/60 text-[12px] sm:text-[15px] leading-[1.5]"
            >
              Sony, Bose, Apple, Nothing — our entire listening lab. Ends Sunday midnight PST.
            </motion.p>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-4 sm:gap-6 mt-4 sm:mt-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                onClick={onExploreAudio}
                className="h-10 sm:h-[48px] px-3 sm:px-6 rounded-full bg-white text-black font-bold text-[10px] sm:text-[14px] hover:bg-white/90 transition shadow-sm cursor-pointer"
              >
                SHOP COLLECTION — 12 ITEMS
              </button>
            </motion.div>

            <div className="hidden md:grid grid-cols-3 gap-3">
              {audioProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`w-[84px] h-[84px] rounded-[20px] bg-gradient-to-br ${item.images[0].gradient} grid place-items-center text-3xl border border-white/10 shadow-sm`}
                >
                  {item.images[0].emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Banner 2: Glasses Gen 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] sm:rounded-[32px] bg-[#E8FF5A] p-5 sm:p-8 md:p-10 relative overflow-hidden min-h-[290px] sm:min-h-[360px] md:min-h-[420px] flex flex-col justify-between border border-black/10 max-w-full shadow-[0_20px_60px_rgba(232,255,90,0.2)] group"
        >
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 -top-10 w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full bg-white/60 blur-[1px] pointer-events-none" 
          />

          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex bg-[#111] text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-1 rounded-full tracking-wide sm:tracking-widest shadow-sm"
            >
              NEW DROP
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 sm:mt-6 text-[25px] sm:text-[30px] md:text-[44px] leading-[1.05] font-[800] tracking-[-0.02em] text-[#111]"
            >
              GLASSES
              <br />
              GEN 2
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2.5 sm:mt-3 text-[12px] sm:text-[14px] leading-[1.5] text-black/70 max-w-[300px]"
            >
              Ray-Ban Meta + Vision Pro lab. Spatial, POV, AI — try in store or 30-day home trial.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 mt-4 sm:mt-6"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-[56%] aspect-[4/3] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-black/5 border border-black/10 shadow-md relative"
            >
              <img
                src="./promo-banner-image/sales-rayban.jpg"
                alt={glasses.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[12px] sm:text-[14px] text-[#111]">From $329</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="button"
                  onClick={onExploreWearables}
                  className="mt-2 h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-[#111] text-white font-bold text-[10px] sm:text-[12px] hover:bg-black transition shadow-sm cursor-pointer"
                >
                  EXPLORE WEARABLES
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};