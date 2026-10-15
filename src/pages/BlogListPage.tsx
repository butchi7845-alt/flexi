import React from 'react';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogs.ts';
import { useCart } from '../context/CartContext.tsx';

interface BlogListPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      <div className="border-b border-[#E2DFD2] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D7A]/10 text-[#174D7A] text-xs font-black uppercase">
          <BookOpen size={13} /> FLEXI Journal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
          Cẩm Nang Sử Dụng & Xu Hướng Phong Cách
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Tất tần tật về cách chọn size dép chuẩn xác, bí quyết bảo quản chất liệu EVA và những gợi ý mix-and-match thời thượng từ stylist của FLEXI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map((art) => (
          <div
            key={art.id}
            onClick={() => onNavigate('blog-detail', art.id)}
            className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#174D7A] to-[#256ea8] text-white p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <span className="text-xs font-bold bg-[#F06423] text-white px-3 py-1 rounded-full self-start">
                  {art.category}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-2xl font-black opacity-30 select-none">
                  FLEXI
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {art.readTime}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {art.publishDate}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#231F20] group-hover:text-[#F06423] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#174D7A] font-bold">
              <span>Đọc toàn bộ bài viết</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BlogDetailPageProps {
  articleId?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  articleId = 'blog-size-care',
  onNavigate,
}) => {
  const { showToast } = useCart();
  const article = BLOG_ARTICLES.find((a) => a.id === articleId) || BLOG_ARTICLES[0];

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Đã sao chép liên kết bài viết vào bộ nhớ tạm!', 'success');
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('blogs')}
          className="text-xs font-bold text-[#174D7A] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft size={14} /> Quay lại danh sách cẩm nang
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-[#E2DFD2] pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-white bg-[#174D7A] px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <Clock size={13} /> {article.readTime}
          </span>
          <span className="text-gray-300">&bull;</span>
          <span className="flex items-center gap-1 text-gray-500">
            <Calendar size={13} /> {article.publishDate}
          </span>
          <span className="text-gray-300">&bull;</span>
          <span className="flex items-center gap-1 text-gray-500">
            <User size={13} /> {article.author}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#231F20] font-['Plus_Jakarta_Sans'] leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed bg-white p-4 rounded-2xl border-l-4 border-[#F06423]">
          "{article.summary}"
        </p>
      </div>

      {/* Article Body Content */}
      <div className="space-y-8 text-sm sm:text-base text-gray-800 leading-relaxed">
        {article.content.map((sec, idx) => (
          <section key={idx} className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DFD2] shadow-2xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#174D7A] font-['Plus_Jakarta_Sans']">
              {sec.heading}
            </h2>

            {sec.body.map((p, pIdx) => (
              <p key={pIdx} className="text-gray-700 leading-relaxed text-sm">
                {p}
              </p>
            ))}

            {sec.callout && (
              <div className="p-4 rounded-2xl bg-[#F06423]/10 border border-[#F06423]/30 text-xs sm:text-sm text-[#F06423] font-semibold flex items-start gap-2.5">
                <Sparkles size={18} className="shrink-0 mt-0.5" />
                <div>{sec.callout}</div>
              </div>
            )}

            {sec.subsections && (
              <div className="space-y-3 pt-2">
                {sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 space-y-1">
                    <h3 className="font-bold text-sm text-[#231F20]">{sub.title}</h3>
                    {sub.body.map((bText, bIdx) => (
                      <p key={bIdx} className="text-xs text-gray-600 leading-relaxed">
                        {bText}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Bottom CTA & Share */}
      <div className="p-6 bg-gradient-to-r from-[#174D7A] to-[#123e63] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-base font-['Plus_Jakarta_Sans']">
            Sẵn sàng trải nghiệm dép sục FLEXI?
          </h4>
          <p className="text-xs text-white/70">
            Khám phá 6 gam màu kinh điển hoặc thử sức tùy biến trong 2D Studio.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('product', 'clog-core')}
            className="px-4 py-2.5 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Mua Clog Classic
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 size={14} /> Chia sẻ
          </button>
        </div>
      </div>
    </article>
  );
};
