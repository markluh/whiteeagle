
import React, { useState, useEffect } from 'react';
import { PRODUCTS, PROJECTS } from '../constants';
import { Review } from '../types';
import { fetchReviews, createReview, summarizeReviews } from '../services/apiService';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [form, setForm] = useState({ author: '', rating: 5, content: '', target: 'Company' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const data = await fetchReviews();
    setReviews(data);
    
    // Get summary
    setIsSummarizing(true);
    const text = await summarizeReviews(data.map(r => r.content));
    setSummary(text || "We are proud of our commitment to excellence.");
    setIsSummarizing(false);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newReview = await createReview({
        author: form.author,
        rating: form.rating,
        content: form.content,
        date: new Date().toISOString().split('T')[0],
        targetId: form.target
      });
      setReviews([newReview, ...reviews]);
      setForm({ author: '', rating: 5, content: '', target: 'Company' });
      
      // Refresh summary
      const updatedReviews = [newReview, ...reviews];
      setIsSummarizing(true);
      const text = await summarizeReviews(updatedReviews.map(r => r.content));
      setSummary(text);
      setIsSummarizing(false);
    } catch (error) {
      alert('Failed to submit review');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Summary & Submission */}
          <div className="lg:col-span-1">
            <h1 className="text-5xl font-black font-serif uppercase mb-6">Feedback</h1>
            <div className="w-20 h-2 bg-[#064e3b] mb-12"></div>
            
            <div className="bg-[#064e3b] p-8 text-white mb-12">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 opacity-70">AI Sentiment Summary</h3>
              {isSummarizing ? (
                <div className="animate-pulse flex space-y-2 flex-col">
                  <div className="h-4 bg-green-800 w-full"></div>
                  <div className="h-4 bg-green-800 w-2/3"></div>
                </div>
              ) : (
                <p className="text-lg italic leading-relaxed font-serif">"{summary}"</p>
              )}
            </div>

            <div className="bg-white border border-zinc-100 p-8">
              <h3 className="text-sm font-black uppercase tracking-widest mb-8">Leave a Review</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition-colors"
                    value={form.author}
                    onChange={e => setForm({...form, author: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-2">Rating</label>
                  <select 
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition-colors bg-white"
                    value={form.rating}
                    onChange={e => setForm({...form, rating: Number(e.target.value)})}
                  >
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-2">Target</label>
                  <select 
                    className="w-full border-b border-zinc-200 py-2 focus:outline-none focus:border-black transition-colors bg-white"
                    value={form.target}
                    onChange={e => setForm({...form, target: e.target.value})}
                  >
                    <option value="Company">General Company</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.id}>Product: {p.name}</option>)}
                    {PROJECTS.map(p => <option key={p.id} value={p.id}>Project: {p.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 mb-2">Comments</label>
                  <textarea 
                    required
                    className="w-full border border-zinc-200 p-4 focus:outline-none focus:border-black transition-colors min-h-[100px]"
                    value={form.content}
                    onChange={e => setForm({...form, content: e.target.value})}
                  />
                </div>
                <button className="w-full bg-black text-white font-black uppercase py-4 text-xs tracking-[0.2em] hover:bg-[#064e3b] transition-all">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Right: Review List */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-zinc-100 pb-12">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{review.date}</span>
                    <div className="flex text-yellow-500 text-sm">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-4 uppercase">{review.author}</h4>
                  <p className="text-zinc-600 leading-relaxed font-light mb-4">{review.content}</p>
                  {review.targetId !== 'Company' && (
                    <span className="inline-block bg-zinc-100 text-[9px] font-black px-2 py-1 uppercase tracking-tighter">
                      Verified Review for {review.targetId.startsWith('pr') ? 'Product' : 'Project'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
