
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white py-16 px-4 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-3xl font-black font-serif mb-4 uppercase tracking-tighter">White Eagle</h3>
          <p className="text-zinc-500 max-w-md mb-8 leading-relaxed">
            Crafting prestigious living spaces through expert home decor and master-grade landscaping. Based in the heart of excellence since 1998.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#064e3b] hover:border-[#064e3b] transition-all cursor-pointer">
              <span className="text-[10px] font-bold">FB</span>
            </div>
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#064e3b] hover:border-[#064e3b] transition-all cursor-pointer">
              <span className="text-[10px] font-bold">IG</span>
            </div>
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#064e3b] hover:border-[#064e3b] transition-all cursor-pointer">
              <span className="text-[10px] font-bold">IN</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black mb-8 text-[#064e3b] uppercase tracking-[0.3em]">Quick Links</h4>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><a href="#/portfolio" className="hover:text-white transition-colors">Project Portfolio</a></li>
            <li><a href="#/shop" className="hover:text-white transition-colors">Premium Shop</a></li>
            <li><a href="#/gallery" className="hover:text-white transition-colors">Visual Gallery</a></li>
            <li><a href="#/reviews" className="hover:text-white transition-colors">Client Testimonials</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black mb-8 text-[#064e3b] uppercase tracking-[0.3em]">Newsletter</h4>
          <p className="text-xs text-zinc-500 mb-6 leading-loose uppercase tracking-widest">Join our inner circle for exclusive design insights.</p>
          {subscribed ? (
            <div className="p-4 bg-[#064e3b]/20 text-[#064e3b] border border-[#064e3b] text-[10px] font-bold uppercase tracking-widest text-center">
              Welcome to the inner circle.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-zinc-800 px-4 py-3 text-xs focus:outline-none focus:border-[#064e3b] transition-all"
              />
              <button className="bg-white text-black font-black py-3 uppercase text-[10px] tracking-[0.2em] hover:bg-[#064e3b] hover:text-white transition-all">
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[9px] font-bold uppercase tracking-widest">
        <span>&copy; {new Date().getFullYear()} White Eagle Home Decor & Landscapers.</span>
        <span className="mt-4 md:mt-0">Design & Excellence Built-in.</span>
      </div>
    </footer>
  );
};

export default Footer;
