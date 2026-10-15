import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles, Footprints, BookOpen, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { FLEXI_PRODUCTS } from '../data/products.ts';
import { FLEXI_CHARMS } from '../data/charmsAndDecor.ts';
import { BLOG_ARTICLES } from '../data/blogs.ts';
import { FLEXI_SITEMAP_ITEMS } from '../data/sitemapData.ts';
import { removeVietnameseTones, formatVND } from '../utils/cartLogic.ts';

interface GlobalSearchModalProps {
  onNavigate: (view: string, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ onNavigate }) => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const quickKeywords = [
    'Clog Classic',
    'Màu Kem',
    'Hoa cúc',
    'Đo size chân',
    'Phối đồ Y2K',
    'Slide Cloud',
    'Sơ đồ web',
  ];

  const results = useMemo(() => {
    const raw = searchTerm.trim();
    if (!raw) return { products: [], charms: [], blogs: [], pages: [] };

    const norm = removeVietnameseTones(raw);

    const matchedProducts = FLEXI_PRODUCTS.filter(
      (p) =>
        removeVietnameseTones(p.name).includes(norm) ||
        removeVietnameseTones(p.tagline).includes(norm) ||
        removeVietnameseTones(p.description).includes(norm) ||
        p.variants.some((v) => removeVietnameseTones(v.colorName).includes(norm))
    );

    const matchedCharms = FLEXI_CHARMS.filter(
      (c) =>
        removeVietnameseTones(c.name).includes(norm) ||
        removeVietnameseTones(c.vietnameseName).includes(norm) ||
        c.category.includes(norm)
    );

    const matchedBlogs = BLOG_ARTICLES.filter(
      (b) =>
        removeVietnameseTones(b.title).includes(norm) ||
        removeVietnameseTones(b.summary).includes(norm) ||
        removeVietnameseTones(b.category).includes(norm)
    );

    const matchedPages = FLEXI_SITEMAP_ITEMS.filter(
      (s) =>
        removeVietnameseTones(s.title).includes(norm) ||
        removeVietnameseTones(s.description).includes(norm) ||
        s.features.some((f) => removeVietnameseTones(f).includes(norm))
    );

    return {
      products: matchedProducts,
      charms: matchedCharms,
      blogs: matchedBlogs,
      pages: matchedPages,
    };
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    onNavigate('product', id);
  };

  const handleSelectBlog = (id: string) => {
    setIsSearchOpen(false);
    onNavigate('blog-detail', id);
  };

  const handleSelectCharm = () => {
    setIsSearchOpen(false);
    onNavigate('studio');
  };

  const totalFound =
    results.products.length +
    results.charms.length +
    results.blogs.length +
    results.pages.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#F4F5F1] rounded-3xl max-w-3xl w-full shadow-2xl border border-white/20 overflow-hidden my-auto">
        {/* Search Input bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E2DFD2] flex items-center gap-3">
          <Search size={22} className="text-[#174D7A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm sản phẩm, màu sắc, charm, cẩm nang, chính sách..."
            className="flex-1 bg-transparent text-base sm:text-lg font-medium text-[#231F20] placeholder-gray-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#231F20] transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

        {/* Quick keywords */}
        {!searchTerm && (
          <div className="p-6 space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Từ khóa tìm kiếm phổ biến
            </div>
            <div className="flex flex-wrap gap-2">
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setSearchTerm(kw)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2DFD2] hover:border-[#F06423] text-xs font-semibold text-[#231F20] hover:text-[#F06423] transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2DFD2] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => {
                  setIsSearchOpen(false);
                  onNavigate('studio');
                }}
                className="p-3 bg-white rounded-2xl border border-[#E2DFD2] hover:border-[#174D7A] transition-all cursor-pointer flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <div className="font-bold text-[#231F20]">2D Custom Studio</div>
                  <div className="text-gray-500 text-[11px]">Tự thiết kế phối charm & màu</div>
                </div>
              </div>

              <div
                onClick={() => {
                  setIsSearchOpen(false);
                  onNavigate('sitemap');
                }}
                className="p-3 bg-white rounded-2xl border border-[#E2DFD2] hover:border-[#174D7A] transition-all cursor-pointer flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#174D7A]/10 text-[#174D7A] flex items-center justify-center font-bold">
                  <Layers size={18} />
                </div>
                <div>
                  <div className="font-bold text-[#231F20]">Sơ đồ 16 trang</div>
                  <div className="text-gray-500 text-[11px]">Xem toàn bộ kiến trúc IA</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Container */}
        {searchTerm && (
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            <div className="text-xs text-gray-500 font-medium">
              Tìm thấy <span className="font-bold text-[#F06423]">{totalFound}</span> kết quả phù hợp cho "{searchTerm}":
            </div>

            {totalFound === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-sm font-semibold text-gray-700">Không tìm thấy kết quả phù hợp</p>
                <p className="text-xs text-gray-500">
                  Thử tìm kiếm với từ khóa khác như "clog", "kem", "hoa cúc", "size" hoặc duyệt theo sơ đồ web.
                </p>
              </div>
            ) : (
              <>
                {/* Product results */}
                {results.products.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D7A] flex items-center gap-1.5">
                      <Footprints size={14} /> Sản phẩm ({results.products.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {results.products.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.id)}
                          className="p-3 bg-white rounded-2xl border border-[#E2DFD2] hover:border-[#F06423] hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-sm text-[#231F20]">{p.name}</div>
                            <div className="text-xs text-[#F06423] font-black">{formatVND(p.basePrice)}</div>
                            <div className="text-[11px] text-gray-500 line-clamp-1">{p.tagline}</div>
                          </div>
                          <ArrowRight size={16} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Charm results */}
                {results.charms.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D7A] flex items-center gap-1.5">
                      <Sparkles size={14} /> Charm trang trí ({results.charms.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.charms.map((c) => (
                        <button
                          key={c.id}
                          onClick={handleSelectCharm}
                          className="px-3 py-2 bg-white rounded-xl border border-[#E2DFD2] hover:border-[#F06423] flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <span className="text-lg">{c.emoji}</span>
                          <span className="text-xs font-bold text-[#231F20]">{c.vietnameseName}</span>
                          <span className="text-[10px] text-[#F06423] font-bold">25k</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog results */}
                {results.blogs.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D7A] flex items-center gap-1.5">
                      <BookOpen size={14} /> Cẩm nang & Hướng dẫn ({results.blogs.length})
                    </h4>
                    <div className="space-y-2">
                      {results.blogs.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => handleSelectBlog(b.id)}
                          className="p-3 bg-white rounded-2xl border border-[#E2DFD2] hover:border-[#174D7A] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-xs text-[#231F20]">{b.title}</div>
                            <div className="text-[11px] text-gray-500 line-clamp-1">{b.summary}</div>
                          </div>
                          <ArrowRight size={14} className="text-gray-400 shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
