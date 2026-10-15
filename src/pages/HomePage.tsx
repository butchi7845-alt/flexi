import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  Footprints,
  ChevronRight,
  Flame,
  Plus,
  Compass,
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { FLEXI_PRODUCTS } from '../data/products.ts';
import { BLOG_ARTICLES } from '../data/blogs.ts';
import { ShoeSvgRenderer } from '../components/ShoeSvgRenderer.tsx';
import { formatVND } from '../utils/cartLogic.ts';
import type { ProductCategory } from '../types/index.ts';

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { setIsSizeGuideOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredProducts = FLEXI_PRODUCTS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const faqs = [
    {
      q: 'Dép sục FLEXI có bị co rút khi phơi nắng không?',
      a: 'Chất liệu bọt EVA Phylon 2.0 rất bền bỉ và êm ái nhưng nhạy cảm với nhiệt độ cao quá 50°C. Để bảo vệ dép tối đa, bạn chỉ nên làm khô tự nhiên nơi thoáng gió râm mát, tuyệt đối không phơi trực tiếp dưới nắng gắt giữa trưa hoặc để trong cốp xe máy.',
    },
    {
      q: 'Làm thế nào để chọn đúng size nếu chân tôi bè ngang?',
      a: 'Nếu bạn có bàn chân bè dày hoặc thích mang kèm vớ (tất) dệt kim cao cổ, hãy cộng thêm 0.5 - 1.0cm vào chiều dài bàn chân thực tế trước khi tra cứu bảng size. Bạn có thể mở bảng hướng dẫn đo size chân ở góc trên website để tự tính toán tự động.',
    },
    {
      q: 'Chính sách đổi size trong 30 ngày diễn ra như thế nào?',
      a: 'FLEXI hỗ trợ đổi size hoàn toàn miễn phí trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện dép còn nguyên tem mác và chưa qua sử dụng ngoài trời. Shipper sẽ mang đôi size mới đến tận nhà đổi cho bạn.',
    },
    {
      q: 'Tôi có thể gắn tối đa bao nhiêu charm trên Studio 2D?',
      a: 'Bạn có thể gắn tối đa 5 charm tại các lỗ thông khí trung tâm và hai bên mu dép để đảm bảo sự cân đối thẩm mỹ và không cản trở luồng đối lưu không khí của bàn chân.',
    },
  ];

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#174D7A] via-[#1E5D90] to-[#0D3859] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black tracking-wider text-[#F06423] uppercase">
              <Sparkles size={14} className="text-[#F06423]" />
              <span>Phiên Bản Prototype v4 Mới Nhất</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black font-['Plus_Jakarta_Sans'] tracking-tight leading-none text-white">
                STEP INTO <br />
                <span className="text-[#F06423]">YOUR DAY.</span>
              </h1>
              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed pt-2">
                Dòng dép sục và giày dép phong cách sống chuẩn phom chân người Việt. Trải nghiệm bước đi êm ái cùng công nghệ hạt bọt EVA Phylon 2.0 và xưởng tùy biến 2D Studio đậm chất riêng.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button
                onClick={() => onNavigate('product', 'clog-core')}
                className="px-7 py-4 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Khám Phá Clog Classic</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => onNavigate('studio')}
                className="px-7 py-4 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-2xl backdrop-blur-md border border-white/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles size={18} className="text-[#F06423]" />
                <span>Mở 2D Custom Studio</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#F06423]" />
                <span>Freeship từ 500.000 ₫</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-[#F06423]" />
                <span>Đổi size 30 ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-amber-400 fill-amber-400" />
                <span>4.9/5 (1.200+ đánh giá)</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Large Clog with Charms (6 Cols) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="w-full max-w-md lg:max-w-lg relative animate-float">
              {/* Soft glow circle behind */}
              <div className="absolute inset-0 bg-[#F06423]/25 rounded-full filter blur-3xl transform scale-75" />

              <ShoeSvgRenderer
                category="clog"
                view="side"
                baseColorHex="#EFECE6"
                customText="FLEXI 26"
                charms={[
                  { instanceId: 'h-1', charmId: 'flower', holeIndex: 1, x: 340, y: 155 },
                  { instanceId: 'h-2', charmId: 'smiley', holeIndex: 3, x: 300, y: 230 },
                ]}
                className="w-full h-auto drop-shadow-2xl relative z-10"
              />

              {/* Floating label pills */}
              <div className="absolute top-4 left-0 sm:left-4 z-20 bg-white/90 backdrop-blur-md text-[#231F20] px-3.5 py-1.5 rounded-2xl text-xs font-bold shadow-md border border-white/40 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                <span>Bọt EVA Phylon 2.0 Siêu Êm</span>
              </div>

              <div className="absolute bottom-6 right-0 sm:right-4 z-20 bg-[#231F20]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl text-xs font-bold shadow-md border border-white/20 flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#F06423]" />
                <span>16 Charm Tùy Biến</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTER & PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#F06423]">
              Dòng Sản Phẩm Mới Nhất
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
              Bộ Sưu Tập Giày Dép FLEXI
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-white p-1 rounded-2xl border border-[#E2DFD2] shadow-2xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#174D7A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#174D7A]'
              }`}
            >
              Tất cả mẫu
            </button>
            <button
              onClick={() => setSelectedCategory('clog')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'clog'
                  ? 'bg-[#174D7A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#174D7A]'
              }`}
            >
              Dép Sục (Clog)
            </button>
            <button
              onClick={() => setSelectedCategory('slide')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'slide'
                  ? 'bg-[#174D7A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#174D7A]'
              }`}
            >
              Slide Quai Ngang
            </button>
            <button
              onClick={() => setSelectedCategory('sandal')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'sandal'
                  ? 'bg-[#174D7A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#174D7A]'
              }`}
            >
              Sandal Thể Thao
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-[#E2DFD2] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Product Preview Image with multi-color switch */}
                <div
                  onClick={() => onNavigate('product', prod.id)}
                  className="w-full h-52 bg-[#F4F5F1] rounded-2xl flex items-center justify-center p-4 cursor-pointer relative overflow-hidden group-hover:bg-[#EFECE6] transition-colors"
                >
                  {prod.isBestSeller && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#F06423] text-white text-[10px] font-black uppercase tracking-wider">
                      Best Seller
                    </span>
                  )}
                  {prod.isNew && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#174D7A] text-white text-[10px] font-black uppercase tracking-wider">
                      Mẫu Mới
                    </span>
                  )}

                  <ShoeSvgRenderer
                    category={prod.category}
                    view="side"
                    baseColorHex={prod.variants[0]?.colorHex || '#EFECE6'}
                    className="w-full h-full scale-110 group-hover:scale-120 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1.5 mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="flex text-amber-400">
                      <Star size={13} fill="currentColor" />
                    </span>
                    <span className="font-bold text-gray-700">{prod.rating}</span>
                    <span>({prod.reviewCount})</span>
                  </div>

                  <h3
                    onClick={() => onNavigate('product', prod.id)}
                    className="font-bold text-base text-[#231F20] hover:text-[#F06423] transition-colors cursor-pointer"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-1">{prod.tagline}</p>

                  {/* Available color swatches */}
                  <div className="flex items-center gap-1.5 pt-2">
                    {prod.variants.slice(0, 5).map((v) => (
                      <span
                        key={v.colorName}
                        title={v.colorName}
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    ))}
                    {prod.variants.length > 5 && (
                      <span className="text-[10px] text-gray-400 font-bold">
                        +{prod.variants.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">Giá niêm yết:</div>
                  <div className="text-base font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                    {formatVND(prod.basePrice)}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('product', prod.id)}
                  className="px-3.5 py-2 bg-[#174D7A] hover:bg-[#123e63] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Xem Chi Tiết</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 2D CUSTOM STUDIO TEASER SPOTLIGHT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#231F20] to-[#121010] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F06423] text-white text-xs font-black uppercase tracking-wider">
                <Sparkles size={14} /> Trải Nghiệm Độc Bản
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-['Plus_Jakarta_Sans'] leading-tight">
                Tự Thiết Kế Dép Sục <br />
                <span className="text-[#F06423]">Trong 2D Custom Studio.</span>
              </h2>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Đừng chỉ mua một đôi dép thông thường! Với FLEXI Custom Studio, bạn có thể tự do biến hóa với 8 phôi màu, 6 họa tiết thời thượng, khắc tên hoặc nickname của chính mình, cùng thư viện 16 charm sinh động.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-white/80 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F06423] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Chọn phôi màu & họa tiết</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F06423] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>Gắn 16 mẫu Charm 2D</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F06423] text-white flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Khắc tên dập nổi quai hậu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F06423] text-white flex items-center justify-center font-bold text-[10px]">4</span>
                  <span>Lưu giỏ & nhận hàng tận tay</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('studio')}
                  className="px-8 py-4 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <Sparkles size={18} />
                  <span>Trải Nghiệm Studio Ngay Bây Giờ</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Studio Teaser Graphic */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm sm:max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="text-center text-xs font-bold text-[#F06423] pb-2">
                  ★ Bản phối minh họa Studio 2D
                </div>
                <ShoeSvgRenderer
                  category="clog"
                  view="top"
                  baseColorHex="#FFB6C1"
                  patternId="star-doodle"
                  customText="FLEXI"
                  charms={[
                    { instanceId: 't-1', charmId: 'flower', holeIndex: 0, x: 260, y: 170 },
                    { instanceId: 't-2', charmId: 'smiley', holeIndex: 1, x: 340, y: 155 },
                    { instanceId: 't-3', charmId: 'heart', holeIndex: 2, x: 410, y: 180 },
                    { instanceId: 't-4', charmId: 'lightning', holeIndex: 3, x: 300, y: 230 },
                    { instanceId: 't-5', charmId: 'rainbow', holeIndex: 4, x: 380, y: 225 },
                  ]}
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG JOURNAL GUIDES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#F06423]">
              Cẩm Nang & Phong Cách
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
              FLEXI Journal & Cẩm Nang Mang Dép
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blogs')}
            className="text-xs font-bold text-[#174D7A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Xem tất cả bài viết</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => onNavigate('blog-detail', article.id)}
              className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-[#174D7A] bg-[#174D7A]/10 px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-[#231F20] group-hover:text-[#F06423] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#174D7A] font-bold">
                <span>Đọc cẩm nang chi tiết</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-[#F06423]">
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2DFD2] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#231F20] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full bg-[#F4F5F1] flex items-center justify-center shrink-0 text-gray-500 transition-transform ${
                      isOpen ? 'rotate-45 text-[#F06423]' : ''
                    }`}
                  >
                    <Plus size={14} />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SITEMAP IA BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#174D7A] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423] text-white flex items-center justify-center shrink-0">
              <Compass size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-['Plus_Jakarta_Sans']">
                Kiến Trúc Thông Tin & Sơ Đồ Toàn Trang (16 Trang)
              </h3>
              <p className="text-xs text-white/70">
                Xem chi tiết sơ đồ cây IA v4, trạng thái kiểm thử chức năng và các luồng hành trình người dùng.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('sitemap')}
            className="px-6 py-3 bg-white text-[#174D7A] hover:bg-gray-100 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Khám Phá Sơ Đồ Web
          </button>
        </div>
      </section>
    </div>
  );
};
