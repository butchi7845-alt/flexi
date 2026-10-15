import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Compass, HelpCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { itemCount, setIsCartOpen, setIsSearchOpen, setIsSizeGuideOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'product', label: 'Clog Classic', param: 'clog-core' },
    { id: 'studio', label: '2D Custom Studio', badge: 'Mới' },
    { id: 'collection', label: 'Bộ sưu tập' },
    { id: 'blogs', label: 'Cẩm nang' },
    { id: 'about', label: 'Về FLEXI' },
    { id: 'sitemap', label: 'Sơ đồ web' },
  ];

  const handleLinkClick = (id: string, param?: string) => {
    onNavigate(id, param);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F5F1]/90 backdrop-blur-md border-b border-[#E2DFD2] transition-colors">
      {/* Top micro banner */}
      <div className="bg-[#174D7A] text-white text-xs py-1.5 px-4 font-medium text-center flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#F06423]" />
        <span>FLEXI v4: Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000 ₫ &bull; Đổi trả trong 30 ngày</span>
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="ml-2 underline text-[#F06423] hover:text-white cursor-pointer transition-colors"
        >
          Xem bảng đo size
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Slogan */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#174D7A] flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-105 transition-transform border-2 border-[#F06423]">
            F
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight text-[#231F20] font-['Plus_Jakarta_Sans'] leading-none">
              FLEXI<span className="text-[#F06423]">.</span>
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-[#174D7A] uppercase mt-0.5">
              STEP INTO YOUR DAY
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.param)}
                className={`relative text-sm font-semibold transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#F06423]'
                    : 'text-[#231F20] hover:text-[#174D7A]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[#F06423] text-white">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F06423] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Tìm kiếm toàn trang"
            className="p-2.5 rounded-full hover:bg-black/5 text-[#231F20] transition-colors cursor-pointer"
          >
            <Search size={20} />
          </button>

          {/* Size guide quick icon */}
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            aria-label="Hướng dẫn chọn size"
            title="Bảng đo size chân"
            className="hidden sm:flex p-2.5 rounded-full hover:bg-black/5 text-[#231F20] transition-colors cursor-pointer"
          >
            <HelpCircle size={20} />
          </button>

          {/* Shopping Cart button with live badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Giỏ hàng (${itemCount} sản phẩm)`}
            className="relative p-2.5 rounded-full bg-[#174D7A] text-white hover:bg-[#123e63] transition-transform hover:scale-105 shadow-sm cursor-pointer"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="cart-count absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 text-xs font-black rounded-full bg-[#F06423] text-white flex items-center justify-center border-2 border-[#F4F5F1] shadow-sm animate-pulse-slow">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu di động"
            className="lg:hidden p-2 rounded-lg text-[#231F20] hover:bg-black/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F5F1] border-b border-[#E2DFD2] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.param)}
              className="w-full text-left py-2.5 text-base font-semibold text-[#231F20] hover:text-[#F06423] flex items-center justify-between border-b border-black/5 cursor-pointer"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#F06423] text-white">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setIsSizeGuideOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-bold rounded-lg border border-[#174D7A] text-[#174D7A] text-center"
            >
              Bảng đo size chân
            </button>
            <button
              onClick={() => {
                onNavigate('sitemap');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#174D7A] text-white text-center flex items-center justify-center gap-1"
            >
              <Compass size={14} /> Sơ đồ 16 trang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
