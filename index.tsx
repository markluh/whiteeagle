
import React, { useState, useEffect, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';

// Admin Context to handle "Admin Mode" globally for the demo
export const AdminContext = createContext({
  isAdmin: false,
  toggleAdmin: () => {}
});

const App = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleAdmin = () => setIsAdmin(!isAdmin);

  const renderPage = () => {
    switch (route) {
      case '#/': return <Home />;
      case '#/portfolio': return <Portfolio />;
      case '#/shop': return <Shop />;
      case '#/gallery': return <Gallery />;
      case '#/reviews': return <Reviews />;
      default: return <Home />;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
      <div className={`min-h-screen flex flex-col ${isAdmin ? 'bg-zinc-50' : 'bg-white'}`}>
        {isAdmin && (
          <div className="bg-green-600 text-white text-[10px] font-bold text-center py-1 uppercase tracking-widest fixed top-0 w-full z-[60]">
            Administrator Session Active
          </div>
        )}
        <Header />
        <main className={`flex-grow ${isAdmin ? 'pt-6' : ''}`}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AdminContext.Provider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
