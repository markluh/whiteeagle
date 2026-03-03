
import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../index';
import { Product } from '../types';
import { fetchProducts, createProduct, deleteProduct } from '../services/apiService';

const Shop: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [newProduct, setNewProduct] = useState({
    name: '', price: 0, description: '', image: '', category: 'Finishing'
  });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const categories = ['All', 'Finishing', 'Structural', 'Insulation', 'Raw Materials', 'Decor', 'Landscaping'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createProduct(newProduct);
      setProducts([created, ...products]);
      setNewProduct({ name: '', price: 0, description: '', image: '', category: 'Finishing' });
    } catch (error) {
      alert('Failed to create product');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product from shop?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const addToCart = (name: string) => {
    setCartCount(prev => prev + 1);
    alert(`${name} has been added to your quote request.`);
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-5xl font-black font-serif uppercase mb-6 tracking-tighter">White Eagle Depot</h1>
            <p className="text-zinc-500 max-w-2xl">Premium structural and finishing components curated for modern homes and breathtaking landscapes.</p>
          </div>
          <div className="bg-black text-white px-6 py-3 flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest">Quote Request</span>
            <span className="bg-[#064e3b] w-6 h-6 rounded-full flex items-center justify-center text-[10px]">{cartCount}</span>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mb-12 p-8 bg-black text-white rounded-sm shadow-2xl border-b-4 border-[#064e3b]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#064e3b]">Administrator: Inventory Management</h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input 
                type="text" placeholder="Product Name" className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-[#064e3b]" required
                value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <input 
                type="number" placeholder="Price ($)" className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-[#064e3b]" required
                value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
              />
              <select 
                className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-[#064e3b]"
                value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input 
                type="text" placeholder="Image URL (e.g. picsum.photos)" className="bg-zinc-900 border border-zinc-800 p-4 text-xs text-white focus:outline-none focus:border-[#064e3b]" required
                value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              />
              <textarea 
                placeholder="Product Specifications & Description" className="md:col-span-3 bg-zinc-900 border border-zinc-800 p-4 text-xs text-white h-16 focus:outline-none focus:border-[#064e3b]" required
                value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
              <button type="submit" className="bg-[#064e3b] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all h-full">
                Register Item
              </button>
            </form>
          </div>
        )}

        <div className="mb-12">
          <div className="flex flex-wrap gap-4 border-b border-zinc-100 pb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-black text-white' 
                    : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="group flex flex-col">
              <div className="aspect-square bg-zinc-100 relative overflow-hidden mb-6">
                <img 
                  src={product.image || 'https://picsum.photos/seed/placeholder/600/600'} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm">
                  {product.category}
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="absolute bottom-4 right-4 bg-red-600 text-white text-[8px] font-black uppercase px-4 py-2 hover:bg-red-700 transition-colors shadow-2xl z-10"
                  >
                    Remove Listing
                  </button>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-sm uppercase tracking-tight text-black">{product.name}</h3>
                  <div className="flex text-[#064e3b] text-[10px]">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                </div>
                <p className="text-zinc-400 text-xs mb-6 line-clamp-2 h-8 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                  <span className="text-xl font-black text-black">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <button 
                    onClick={() => addToCart(product.name)}
                    className="bg-[#064e3b] text-white text-[9px] font-black uppercase px-6 py-3 hover:bg-black transition-all tracking-[0.1em]"
                  >
                    Add to Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center text-zinc-300">
            <p className="text-lg font-serif italic">No items currently available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
