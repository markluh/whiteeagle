
import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../index';
import { GalleryItem } from '../types';
import { fetchGallery, createGalleryItem, deleteGalleryItem } from '../services/apiService';

const Gallery: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');
  const [newItem, setNewItem] = useState({ url: '', caption: '', tag: 'Construction' });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    const data = await fetchGallery();
    setGallery(data);
    setLoading(false);
  };

  const tags = ['All', 'Construction', 'Infrastructure', 'Design', 'Green Energy', 'Planning', 'Landscape', 'Interior'];

  const filteredGallery = activeTag === 'All' 
    ? gallery 
    : gallery.filter(item => item.tag === activeTag);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.url) return;
    try {
      const item = await createGalleryItem(newItem);
      setGallery([item, ...gallery]);
      setNewItem({ url: '', caption: '', tag: 'Construction' });
    } catch (error) {
      alert('Failed to add gallery item');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently remove this visual from the White Eagle collection?')) {
      try {
        await deleteGalleryItem(id);
        setGallery(gallery.filter(item => item.id !== id));
      } catch (error) {
        alert('Failed to delete gallery item');
      }
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-black font-serif uppercase mb-6 tracking-tighter">Visual Heritage</h1>
          <p className="text-zinc-500 max-w-2xl mb-12">A curated collection of our transformative landscaping and high-end home decoration projects.</p>
          
          {isAdmin && (
            <div className="mb-12 p-8 bg-[#064e3b]/5 border-2 border-[#064e3b] rounded-sm shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-[#064e3b]">Administrator: Media Curation</h3>
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input 
                  type="text" 
                  placeholder="Image Source URL" 
                  className="bg-white border p-4 text-xs focus:outline-none focus:border-[#064e3b] shadow-inner"
                  value={newItem.url}
                  onChange={e => setNewItem({...newItem, url: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Descriptive Caption" 
                  className="bg-white border p-4 text-xs focus:outline-none focus:border-[#064e3b] shadow-inner"
                  value={newItem.caption}
                  onChange={e => setNewItem({...newItem, caption: e.target.value})}
                />
                <select 
                  className="bg-white border p-4 text-xs focus:outline-none focus:border-[#064e3b] shadow-inner"
                  value={newItem.tag}
                  onChange={e => setNewItem({...newItem, tag: e.target.value})}
                >
                  {tags.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button type="submit" className="bg-[#064e3b] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                  Add to Heritage
                </button>
              </form>
            </div>
          )}

          <div className="flex flex-wrap gap-8 border-b border-zinc-100 pb-12">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${
                  activeTag === tag 
                    ? 'text-black border-black' 
                    : 'text-zinc-300 border-transparent hover:text-black hover:border-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
          {filteredGallery.map(item => (
            <div key={item.id} className="relative break-inside-avoid group cursor-pointer overflow-hidden bg-black shadow-2xl">
              <img 
                src={item.url || 'https://picsum.photos/seed/placeholder/800/800'} 
                alt={item.caption}
                className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-80 group-hover:opacity-100 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-[#064e3b] text-[9px] font-black uppercase tracking-[0.2em] mb-2">{item.tag}</span>
                <h3 className="text-white text-lg font-serif font-bold italic mb-4">{item.caption || 'Untitled Vision'}</h3>
                {isAdmin && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    className="mt-2 bg-red-600/90 text-white text-[8px] font-black uppercase px-4 py-2 w-fit hover:bg-red-700 transition-colors shadow-2xl backdrop-blur-sm"
                  >
                    Delete Asset
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="py-40 text-center text-zinc-300">
            <p className="text-xl font-serif font-light italic">The gallery is awaiting your next masterpiece.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
