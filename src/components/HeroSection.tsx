import React from 'react';
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
        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest text-[#111] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6C5CFF] animate-pulse" />
            NEW SEASON • SS25 TECH EDIT
          </div>

          <h1 className="mt-6 text-[44px] md:text-[80px] lg:text-[96px] leading-[0.95] tracking-[-0.03em] font-[800] max-w-full break-words text-[#111]">
            TECH
            <br />
            / THAT
            <br />
            <span className="text-[#6C5CFF]">THINKS.</span>
          </h1>

          <p className="mt-6 max-w-[520px] text-[16px] md:text-[18px] leading-[1.5] text-black/60">
            A curated lab of tools that disappear. Smartphones, speakers, glasses, consoles — edited for obsessives, not algorithms.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          </div>

          {/* Value props */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[520px]">
            {[
              { k: '4.9/5', v: 'Avg rating from 38k reviews' },
              { k: '2YR', v: 'Warranty included, no questions' },
              { k: '$299+', v: 'Free express shipping' },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-[20px] bg-white border border-black/5 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)]"
              >
                <p className="text-[20px] font-[800] tracking-tight text-[#111]">
                  {item.k}
                </p>
                <p className="text-[12px] text-black/60 leading-[1.3] mt-1 font-medium">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Layered 3D Art Composition */}
        <div className="relative lg:h-[620px] h-[520px] mt-4 lg:mt-0 overflow-hidden rounded-[32px] max-w-full">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,#6C5CFF18,transparent)]" />

          {/* Layer 1: iPhone 15 Pro */}
          <div
            onClick={() => onSelectProduct(iphone)}
            className="absolute left-[8%] top-[8%] w-[72%] md:w-[68%] tilt-1 cursor-pointer transition-transform duration-500 hover:rotate-0 hover:scale-105 z-10"
          >
            <div className="rounded-[32px] bg-white border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-4">
              <div
                className={`rounded-[24px] aspect-[4/3] bg-gradient-to-br ${iphone.images[0].gradient} grid place-items-center text-[96px] select-none`}
              >
                {iphone.images[0].emoji}
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
            </div>
          </div>

          {/* Layer 2: Ray-Ban Meta Glasses */}
          <div
            onClick={() => onSelectProduct(glasses)}
            className="absolute right-[2%] top-[30%] w-[64%] md:w-[60%] tilt-2 cursor-pointer transition-transform duration-500 hover:rotate-0 hover:scale-105 z-20"
          >
            <div className="rounded-[32px] bg-[#111] text-white border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] p-4">
              <div
                className={`rounded-[24px] aspect-[4/3] bg-gradient-to-br ${glasses.images[0].gradient} grid place-items-center text-[84px] select-none`}
              >
                {glasses.images[0].emoji}
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
            </div>
          </div>

          {/* Layer 3: Audio Week badge card */}
          <div
            onClick={onExploreSale}
            className="absolute left-[20%] bottom-[4%] w-[58%] md:w-[52%] tilt-3 cursor-pointer transition-transform duration-500 hover:rotate-0 hover:scale-105 z-30"
          >
            <div className="rounded-[32px] bg-[#E8FF5A] border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3">
              <div className="rounded-[20px] aspect-[1/1] bg-gradient-to-br from-white to-[#E8FF5A] grid place-items-center text-[64px] select-none">
                🎧
              </div>
              <div className="px-2 py-2">
                <p className="font-bold text-[13px] text-[#111]">Audio Week • Curated</p>
                <p className="text-[11px] text-black/70 font-medium">
                  WH-1000XM5 + more • up to 40% off
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Down Badge */}
          <div className="absolute right-2 top-[55%] hidden md:flex w-[88px] h-[88px] rounded-full bg-white border border-black/10 shadow-xl items-center justify-center pointer-events-none z-30">
            <div className="text-center leading-none">
              <p className="text-[11px] font-bold tracking-widest text-[#111]">SCROLL</p>
              <p className="text-[22px] text-[#111] mt-0.5">↓</p>
            </div>
          </div>
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
