
import React, { useState } from 'react';
import { PROJECTS, PRODUCTS } from '../constants';
import { getBuildingAdvice } from '../services/apiService';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    const result = await getBuildingAdvice(query);
    setAiResponse(result || "No response received.");
    setLoading(false);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="White Eagle Architecture"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#064e3b] px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              White Eagle Home Decor & Landscaping
            </span>
            <h1 className="text-6xl md:text-8xl font-black font-serif leading-tight mb-8">
              Dream. <br/> <span className="text-green-500">Lifestyle.</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-10 font-light leading-relaxed">
              Elevate your surroundings with our elite home decor solutions and master-grade landscaping designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#/portfolio" className="bg-white text-black px-10 py-4 font-bold uppercase text-sm text-center hover:bg-[#064e3b] hover:text-white transition-all shadow-2xl">
                Our Projects
              </a>
              <a href="#/shop" className="border border-white text-white px-10 py-4 font-bold uppercase text-sm text-center hover:bg-white hover:text-black transition-all">
                The Material Shop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white px-4 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-black uppercase font-serif mb-6">Unrivaled <br/> Craftsmanship</h2>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              White Eagle has been at the forefront of luxury home transformations for over two decades. We specialize in the synthesis of structural integrity and aesthetic grace, ensuring every project is a masterpiece of modern living.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-black text-[#064e3b] mb-1">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Projects Done</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-[#064e3b] mb-1">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Client Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#064e3b] -z-10 opacity-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="White Eagle Project" 
              className="w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* AI Consulting Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black font-serif uppercase mb-6 leading-tight">
              Design <br/> <span className="text-green-500">Concierge</span>
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Consult with our AI-powered architect for instant advice on landscaping, interior trends, and building materials.
            </p>
            <div className="relative">
              <textarea 
                placeholder="Ask our AI about decor or landscaping..."
                className="w-full bg-zinc-900 border border-zinc-800 p-6 rounded-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#064e3b] transition-all min-h-[120px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={handleAskAI}
                disabled={loading}
                className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 font-bold uppercase text-xs hover:bg-[#064e3b] hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Consulting...' : 'Ask Expert'}
              </button>
            </div>
            {aiResponse && (
              <div className="mt-8 p-6 bg-[#064e3b]/10 text-white border-l-8 border-[#064e3b] animate-fade-in shadow-2xl">
                <p className="font-medium text-sm leading-relaxed">{aiResponse}</p>
              </div>
            )}
          </div>
          <div className="hidden lg:block relative group">
            <img 
              src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Interior Concept" 
              className="w-full shadow-2xl transition-all duration-700 opacity-60 group-hover:opacity-100"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
