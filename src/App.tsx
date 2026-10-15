import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import { SizeGuideModal } from './components/SizeGuideModal.tsx';
import { NotificationToast } from './components/NotificationToast.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';
import { CustomStudio } from './components/CustomStudio.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { OrderSuccessPage } from './pages/OrderSuccessPage.tsx';
import { BlogListPage, BlogDetailPage } from './pages/BlogListPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { SitemapPage } from './pages/SitemapPage.tsx';
import { PolicyPage } from './pages/PolicyPage.tsx';
import type { Order } from './types/index.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('flexi_last_order');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Handle URL hash routing or initial query
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const [view, param] = hash.split('/');
        if (view) {
          setCurrentView(view);
          setViewParam(param);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    window.location.hash = param ? `${view}/${param}` : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'product':
        return <ProductDetailPage productId={viewParam || 'clog-core'} onNavigate={handleNavigate} />;
      case 'studio':
        return <CustomStudio onNavigate={handleNavigate} initialSize={39} />;
      case 'collection':
        return <HomePage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} onOrderCreated={(ord) => setLastOrder(ord)} />;
      case 'order-success':
        return <OrderSuccessPage order={lastOrder} onNavigate={handleNavigate} />;
      case 'blogs':
        return <BlogListPage onNavigate={handleNavigate} />;
      case 'blog-detail':
        return <BlogDetailPage articleId={viewParam || 'blog-size-care'} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;
      case 'policy':
        return <PolicyPage initialTab={viewParam || 'shipping'} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F4F5F1] text-[#231F20] selection:bg-[#F06423] selection:text-white">
        {/* Navigation Bar */}
        <Navbar currentView={currentView} onNavigate={handleNavigate} />

        {/* Main Content Area */}
        <main className="flex-1">
          {renderCurrentView()}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Global Slide-over Drawer & Modals */}
        <CartDrawer onNavigate={handleNavigate} />
        <GlobalSearchModal onNavigate={handleNavigate} />
        <SizeGuideModal />
        <NotificationToast />
      </div>
    </CartProvider>
  );
}
