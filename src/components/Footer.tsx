import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, HeartHandshake, MapPin, Phone, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast } = useCart();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ', 'warning');
      return;
    }
    showToast('Cảm ơn bạn đã đăng ký nhận bản tin FLEXI Journal! Mã giảm giá 10% đã sẵn sàng.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#231F20] text-[#EFECE6] border-t border-black/20">
      {/* 4 Brand Value Pillars */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Miễn phí giao hàng</div>
              <div className="text-xs text-white/60">Đơn từ 500.000 ₫ toàn quốc</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center shrink-0">
              <RefreshCw size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Đổi trả 30 ngày</div>
              <div className="text-xs text-white/60">Hỗ trợ đổi size & mẫu tận nhà</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">EVA Phylon 2.0</div>
              <div className="text-xs text-white/60">Kháng khuẩn, siêu nhẹ êm</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center shrink-0">
              <HeartHandshake size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Tùy biến Studio 2D</div>
              <div className="text-xs text-white/60">16 Charm & khắc tên độc bản</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand identity col */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#174D7A] border border-[#F06423] flex items-center justify-center text-white font-black text-xl">
              F
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
                FLEXI<span className="text-[#F06423]">.</span>
              </span>
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#F06423] uppercase">
                STEP INTO YOUR DAY
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Thương hiệu dép sục và giày dép phong cách sống hiện đại. Tự do thể hiện cá tính với xưởng tùy biến 2D Studio và vật liệu bọt EVA cải tiến êm ái cho từng bước chân Việt.
          </p>
          <div className="space-y-1.5 text-xs text-white/60 pt-2">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#F06423]" />
              <span>Studio: 124 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#F06423]" />
              <span>Hotline CSKH: 1900 6828 (8:00 - 21:00 hàng ngày)</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Sản phẩm</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <button
                onClick={() => onNavigate('product', 'clog-core')}
                className="hover:text-[#F06423] transition-colors cursor-pointer"
              >
                FLEXI Clog Classic
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('collection')}
                className="hover:text-[#F06423] transition-colors cursor-pointer"
              >
                FLEXI Slide Cloud
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('collection')}
                className="hover:text-[#F06423] transition-colors cursor-pointer"
              >
                FLEXI Sandal Active
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('studio')}
                className="text-[#F06423] font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                ★ Studio Tùy Biến 2D
              </button>
            </li>
          </ul>
        </div>

        {/* Blog & Support */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Cẩm nang & Hỗ trợ</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <button
                onClick={() => onNavigate('blog-detail', 'blog-size-care')}
                className="hover:text-[#F06423] transition-colors cursor-pointer text-left"
              >
                Cách chọn size & chăm sóc dép
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('blog-detail', 'blog-phoi-do')}
                className="hover:text-[#F06423] transition-colors cursor-pointer text-left"
              >
                Bí quyết phối đồ Streetwear
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('blog-detail', 'blog-charm')}
                className="hover:text-[#F06423] transition-colors cursor-pointer text-left"
              >
                Nghệ thuật phối 16 Charm
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policy', 'shipping')}
                className="hover:text-[#F06423] transition-colors cursor-pointer text-left"
              >
                Chính sách giao hàng & đổi trả
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('policy', 'terms')}
                className="hover:text-[#F06423] transition-colors cursor-pointer text-left"
              >
                Điều khoản & Bảo mật
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Sitemap Button */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Nhận ưu đãi độc quyền</h4>
          <p className="text-xs text-white/60">
            Nhận ngay voucher giảm 10% (mã <span className="font-mono text-[#F06423] font-bold">FLEXI2026</span>) và thông báo các đợt phát hành charm giới hạn:
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email của bạn..."
                className="w-full pl-9 pr-3 py-2 bg-white/10 rounded-xl text-xs text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-[#F06423]"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Gửi
            </button>
          </form>

          {/* Quick jump to Sitemap */}
          <div className="pt-2">
            <button
              onClick={() => onNavigate('sitemap')}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/90 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Compass size={14} className="text-[#F06423]" />
              <span>Xem sơ đồ kiến trúc 16 trang (Sitemap)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer note */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3">
        <div>
          &copy; {new Date().getFullYear()} FLEXI Footwear Co. All rights reserved. Slogan "STEP INTO YOUR DAY".
        </div>
        <div className="text-center sm:text-right text-[11px] text-white/40">
          Môi trường nguyên mẫu giao diện (Prototype v4). Mã QR thanh toán là minh họa mô phỏng, không giao dịch tiền thật.
        </div>
      </div>
    </footer>
  );
};
