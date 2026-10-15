import React from 'react';
import { ShieldCheck, Sparkles, Heart, Footprints, Leaf, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Brand Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D7A]/10 text-[#174D7A] text-xs font-black uppercase">
          <Sparkles size={13} className="text-[#F06423]" /> Câu Chuyện Thương Hiệu
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#231F20] font-['Plus_Jakarta_Sans'] tracking-tight">
          FLEXI: Bước Đệm Cho <br />
          <span className="text-[#F06423]">Thế Hệ Năng Động.</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Được khởi nguồn từ niềm đam mê nâng niu từng bước chân người Việt, FLEXI không ngừng đổi mới công nghệ đúc bọt nguyên khối để mang đến sự êm ái, phóng khoáng và tự do thể hiện cá tính riêng.
        </p>
      </div>

      {/* Slogan Philosophy */}
      <div className="bg-[#174D7A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 relative z-10">
          <div className="text-xs font-black tracking-widest text-[#F06423] uppercase">
            TRIẾT LÝ THƯƠNG HIỆU
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Plus_Jakarta_Sans']">
            "STEP INTO YOUR DAY"
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Mỗi ngày mới là một cuộc phiêu lưu của riêng bạn: từ giảng đường, văn phòng sáng tạo cho đến những chuyến du ngoạn cuối tuần. FLEXI tin rằng sự thoải mái nơi bàn chân chính là điểm tựa vững chãi nhất để bạn tự tin bứt phá giới hạn bản thân.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-xs space-y-3">
          <div className="text-sm font-bold text-[#F06423] uppercase">3 Giá trị cốt lõi:</div>
          <div className="space-y-2">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="font-bold text-white">1. Chuẩn phom chân Việt:</span>
              <p className="text-white/70 mt-0.5">Nghiên cứu trên 2.000 dữ liệu quét bàn chân để thiết kế độ dốc và lòng vòm ôm khít tự nhiên.</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="font-bold text-white">2. Công nghệ hạt bọt EVA 2.0:</span>
              <p className="text-white/70 mt-0.5">Tối ưu độ đàn hồi triệt tiêu phản lực khi chạm đất, kháng khuẩn và không lưu giữ mùi mồ hôi.</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="font-bold text-white">3. Tự do tùy biến cá nhân:</span>
              <p className="text-white/70 mt-0.5">Trao quyền sáng tạo không giới hạn qua hệ sinh thái 16 charm và xưởng 2D Studio.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology & Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
            Công Nghệ Bọt Khí EVA Phylon 2.0
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Quy trình sản xuất đúc kín khép kín với các tiêu chuẩn khắt khe về độ bền và an toàn môi trường.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F06423]/10 text-[#F06423] flex items-center justify-center">
              <Footprints size={24} />
            </div>
            <h4 className="font-bold text-base text-[#231F20]">Công Thái Học Triệt Tiêu Phản Lực</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Phần đệm gót dày 3.8cm hấp thụ chấn động tức thì, giảm đến 35% áp lực đè nặng lên các khớp gối và cột sống sau nhiều giờ đi bộ liên tục.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#174D7A]/10 text-[#174D7A] flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-base text-[#231F20]">Kháng Khuẩn & Khử Mùi Odor-Shield</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Các hạt ion kháng khuẩn được tích hợp trực tiếp vào cấu trúc hạt bọt EVA trong quá trình nóng chảy, ngăn ngừa vi khuẩn và nấm mốc phát triển.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <Leaf size={24} />
            </div>
            <h4 className="font-bold text-base text-[#231F20]">Thân Thiện Môi Trường Eco-Flex</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sử dụng 25% hợp chất EVA có nguồn gốc sinh học tái tạo từ bã mía, giảm thiểu phát thải carbon và có khả năng tái chế khép kín.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#231F20] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black font-['Plus_Jakarta_Sans']">
          Sẵn Sàng Cho Bước Chân Mới?
        </h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
          Chọn ngay cho mình một phôi dép yêu thích hoặc tự thiết kế mẫu dép độc bản chỉ có bạn sở hữu.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('product', 'clog-core')}
            className="px-6 py-3.5 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Mua Clog Classic
          </button>
          <button
            onClick={() => onNavigate('studio')}
            className="px-6 py-3.5 bg-[#174D7A] hover:bg-[#123e63] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Mở 2D Custom Studio
          </button>
        </div>
      </div>
    </div>
  );
};
