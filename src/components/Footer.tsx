import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onToast }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onToast('Please enter a valid email address');
      return;
    }
    onToast("You're on the list — first drop notification incoming");
    setEmail('');
  };

  const footerGroups = [
    {
      title: 'Lab',
      links: ['Journal', 'Stores — NYC / LDN', 'Repair', 'Careers'],
    },
    {
      title: 'Shop',
      links: ['All inventory', 'Audio Week', 'Gift cards', 'Trade-in'],
    },
    {
      title: 'Help',
      links: ['Shipping & returns', 'Warranty', 'Contact', 'Privacy / Terms'],
    },
  ];

  return (
    <footer className="mt-10 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 grid md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] gap-10">
        {/* Brand info & Newsletter */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[13px]">
              N
            </div>
            <span className="font-[800] text-[18px] tracking-tight text-[#111]">NOVA•</span>
          </div>

          <p className="mt-4 text-[14px] leading-[1.5] text-black/60 max-w-[360px]">
            Tech that thinks. A lab-store for people who care about materials, sound, and the space between.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-[360px]">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for product drops"
              className="h-11 flex-1 rounded-full bg-[#FAF9F6] border border-black/10 px-4 text-[13px] outline-none focus:border-black/30 text-[#111]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-full bg-[#111] text-white text-[13px] font-bold hover:bg-black transition shadow-sm"
            >
              JOIN
            </button>
          </form>
        </div>

        {/* Navigation columns */}
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[12px] font-bold tracking-widest text-[#111] uppercase">
              {group.title}
            </p>
            <div className="mt-4 space-y-2 text-[14px] text-black/60">
              {group.links.map((link) => (
                <p
                  key={link}
                  onClick={() => onToast(`${link} requested`)}
                  className="hover:text-black cursor-pointer transition"
                >
                  {link}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5 py-6 px-6 md:px-10 mx-auto max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-black/40">
        <span>
          © 2025 NOVA LAB INC. Built for the unconventional. Off-white #FAF9F6 / Electric #6C5CFF / Lime #E8FF5A.
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#6C5CFF]" /> Designed like Apple + Aritzia + Teenage Engineering
        </span>
      </div>
    </footer>
  );
};
