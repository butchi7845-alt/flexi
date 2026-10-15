import React, { useState } from 'react';
import { Compass, Layers, CheckCircle2, ArrowRight, ExternalLink, Filter } from 'lucide-react';
import { FLEXI_SITEMAP_ITEMS } from '../data/sitemapData.ts';

interface SitemapPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    'all',
    'Trang chính',
    'Sản phẩm',
    'Cá nhân hóa',
    'Thương mại',
    'Cẩm nang',
    'Thương hiệu & Hỗ trợ',
    'Chính sách',
  ];

  const filteredItems = FLEXI_SITEMAP_ITEMS.filter(
    (item) => filterCategory === 'all' || item.category === filterCategory
  );

  const handleJump = (file: string) => {
    switch (file) {
      case 'index.html':
        onNavigate('home');
        break;
      case 'product-clog-core.html':
        onNavigate('product', 'clog-core');
        break;
      case 'custom-studio.html':
        onNavigate('studio');
        break;
      case 'cart.html':
        onNavigate('cart');
        break;
      case 'checkout.html':
        onNavigate('checkout');
        break;
      case 'don-hang-demo.html':
        onNavigate('order-success');
        break;
      case 'blog-size-care.html':
        onNavigate('blog-detail', 'blog-size-care');
        break;
      case 'blog-phoi-do.html':
        onNavigate('blog-detail', 'blog-phoi-do');
        break;
      case 'blog-charm.html':
        onNavigate('blog-detail', 'blog-charm');
        break;
      case 'about-flexi.html':
        onNavigate('about');
        break;
      case 'huong-dan-mua-hang.html':
        onNavigate('policy', 'guide');
        break;
      case 'chinh-sach-giao-hang-doi-tra.html':
        onNavigate('policy', 'shipping');
        break;
      case 'chinh-sach-bao-mat.html':
        onNavigate('policy', 'privacy');
        break;
      case 'dieu-khoan-su-dung.html':
        onNavigate('policy', 'terms');
        break;
      case 'tim-kiem.html':
        onNavigate('search');
        break;
      case 'so-do-website.html':
        onNavigate('sitemap');
        break;
      default:
        onNavigate('home');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Header */}
      <div className="bg-[#174D7A] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-lg border-2 border-[#F06423]/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F06423] text-white text-xs font-black uppercase tracking-wider">
            <Compass size={13} /> Sơ Đồ Kiến Trúc Thông Tin (IA v4)
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Plus_Jakarta_Sans']">
            Sơ Đồ Toàn Trang & Kiểm Thử Hệ Thống (16 Trang)
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Hệ thống website prototype FLEXI v4 được tổ chức theo kiến trúc thông tin hướng tác vụ. Tất cả 16 tệp HTML và chức năng tương ứng đều đã được tích hợp đầy đủ, không có liên kết đứt gãy và hỗ trợ kiểm thử tương tác tức thì.
          </p>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 items-center bg-white p-2 rounded-2xl border border-[#E2DFD2] shadow-2xs">
        <span className="text-xs font-bold text-gray-500 px-3 flex items-center gap-1.5">
          <Filter size={14} /> Lọc theo nhóm:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#F06423] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'Tất cả 16 trang' : cat}
          </button>
        ))}
      </div>

      {/* Sitemap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#174D7A] bg-[#174D7A]/10 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> {item.status}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-gray-400">#{item.file}</span>
                <h3 className="font-bold text-base text-[#231F20] font-['Plus_Jakarta_Sans'] group-hover:text-[#F06423] transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Features list */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Chức năng chính:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 bg-[#F4F5F1] text-gray-700 rounded-md text-[10px] font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleJump(item.file)}
              className="w-full py-2.5 bg-[#F4F5F1] group-hover:bg-[#174D7A] text-[#174D7A] group-hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>Mở & Kiểm Thử Trang Này</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
