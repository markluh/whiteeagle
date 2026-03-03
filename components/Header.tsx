
import React, { useState, useContext } from 'react';
import { AdminContext } from '../index';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, toggleAdmin } = useContext(AdminContext);

  const navItems = [
    { label: 'Home', href: '#/' },
    { label: 'Projects', href: '#/portfolio' },
    { label: 'Shop', href: '#/shop' },
    { label: 'Gallery', href: '#/gallery' },
    { label: 'Reviews', href: '#/reviews' },
  ];

  // Placeholder for the Eagle Logo provided by user
  const logoUrl = "https://images.squarespace-cdn.com/content/v1/5c5ef94470452d590a996d99/1550005510461-X8B6D8T8E9P0Y9Z1W5S2/White-Eagle-Logo.png?format=1500w";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-zinc-100 text-black z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border border-zinc-200">
              <img src={logoUrl} alt="White Eagle Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase font-serif block leading-none">White Eagle</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">Home Decor & Landscaping</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-xs font-black hover:text-[#064e3b] transition-colors uppercase tracking-widest py-2"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={toggleAdmin}
              className={`px-4 py-2 rounded-sm font-black text-[9px] uppercase tracking-widest transition-all ${
                isAdmin ? 'bg-black text-white' : 'bg-[#064e3b] text-white hover:bg-black'
              }`}
            >
              {isAdmin ? 'Exit Admin' : 'Admin Area'}
            </button>
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-zinc-100 text-[#111]"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 absolute top-full left-0 w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 border-b border-zinc-100"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <button 
                onClick={() => { toggleAdmin(); setIsOpen(false); }}
                className="w-full bg-[#064e3b] text-white py-4 rounded-sm font-black uppercase text-xs tracking-widest"
              >
                {isAdmin ? 'Exit Admin' : 'Admin Area'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
