import React, { useState } from 'react';
import { Truck, RefreshCw, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: string;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="border-b border-[#E2DFD2] pb-4">
        <h1 className="text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
          Chính Sách & Hỗ Trợ Khách Hàng
        </h1>
        <p className="text-xs text-gray-500">
          Thông tin chi tiết về chính sách vận chuyển, đổi trả 30 ngày, bảo mật và hướng dẫn mua hàng
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-[#E2DFD2] shadow-2xs">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'shipping'
              ? 'bg-[#174D7A] text-white shadow-xs'
              : 'text-gray-600 hover:text-[#174D7A]'
          }`}
        >
          <Truck size={14} /> Giao hàng & Đổi trả 30 ngày
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'guide'
              ? 'bg-[#174D7A] text-white shadow-xs'
              : 'text-gray-600 hover:text-[#174D7A]'
          }`}
        >
          <FileText size={14} /> Hướng dẫn mua hàng (5 bước)
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'bg-[#174D7A] text-white shadow-xs'
              : 'text-gray-600 hover:text-[#174D7A]'
          }`}
        >
          <ShieldCheck size={14} /> Chính sách bảo mật
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'terms'
              ? 'bg-[#174D7A] text-white shadow-xs'
              : 'text-gray-600 hover:text-[#174D7A]'
          }`}
        >
          <FileText size={14} /> Điều khoản sử dụng
        </button>
      </div>

      {/* Tab 1: Shipping & Return */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-2xl bg-[#174D7A] text-white flex items-center justify-center">
              <Truck size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#231F20] font-['Plus_Jakarta_Sans']">
                Chính Sách Vận Chuyển & Đổi Trả Trong 30 Ngày
              </h2>
              <span className="text-xs text-gray-400">Áp dụng cho toàn bộ đơn hàng trên hệ thống FLEXI</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-base text-[#174D7A]">1. Chính sách vận chuyển</h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
              <li><span className="font-bold text-[#231F20]">Miễn phí giao hàng:</span> Áp dụng tự động cho mọi đơn hàng có giá trị thanh toán từ 500.000 ₫ trở lên.</li>
              <li><span className="font-bold text-[#231F20]">Phí giao hàng tiêu chuẩn:</span> 30.000 ₫ cho các đơn hàng dưới 500.000 ₫ đối với mọi tỉnh thành trên toàn quốc.</li>
              <li><span className="font-bold text-[#231F20]">Thời gian giao hàng:</span> Nội thành Hà Nội & TP. Hồ Chí Minh từ 1 - 2 ngày làm việc; các tỉnh thành khác từ 2 - 4 ngày làm việc.</li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-bold text-base text-[#174D7A]">2. Quy định đổi size & mẫu trong 30 ngày</h3>
            <p className="text-gray-600">
              FLEXI cam kết hỗ trợ khách hàng đổi size hoặc đổi sang màu sắc khác hoàn toàn miễn phí trong vòng 30 ngày kể từ thời điểm nhận hàng.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F4F5F1] rounded-2xl border border-gray-200">
                <span className="font-bold text-green-700">✓ Điều kiện chấp nhận đổi:</span>
                <p className="text-xs text-gray-600 mt-1">Dép còn nguyên tem mác, hộp đựng nguyên vẹn và chưa qua sử dụng ngoài trời (đế không bị trầy xước).</p>
              </div>
              <div className="p-3 bg-[#F4F5F1] rounded-2xl border border-gray-200">
                <span className="font-bold text-[#F06423]">★ Đổi hàng tận nhà:</span>
                <p className="text-xs text-gray-600 mt-1">Shipper của FLEXI sẽ mang đôi mới đến tận nhà đổi đồng thời thu hồi lại đôi cũ, bạn không cần phải ra bưu cục.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Shopping Guide */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-2xl bg-[#174D7A] text-white flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#231F20] font-['Plus_Jakarta_Sans']">
                Hướng Dẫn Mua Hàng 5 Bước Đơn Giản
              </h2>
              <span className="text-xs text-gray-400">Trải nghiệm mua sắm nhanh chóng và chính xác</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 className="font-bold text-sm text-[#231F20]">Chọn mẫu sản phẩm</h4>
                <p className="text-xs text-gray-600 mt-0.5">Khám phá danh mục dép sục Clog Classic, Slide Cloud hoặc Sandal Active theo phong cách của bạn.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 className="font-bold text-sm text-[#231F20]">Đo và chọn kích cỡ (Size)</h4>
                <p className="text-xs text-gray-600 mt-0.5">Sử dụng bảng đo size chi tiết hoặc tính năng gợi ý size tự động để chọn size EU từ 36 đến 45.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div>
                <h4 className="font-bold text-sm text-[#231F20]">Tùy biến Studio (Nếu muốn)</h4>
                <p className="text-xs text-gray-600 mt-0.5">Mở 2D Custom Studio để tự do gắn tối đa 5 charm độc quyền và khắc tên cá nhân hóa.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
              <div>
                <h4 className="font-bold text-sm text-[#231F20]">Thêm vào giỏ & Áp dụng voucher</h4>
                <p className="text-xs text-gray-600 mt-0.5">Kiểm tra giỏ hàng, nhập mã giảm giá FLEXI2026 và chọn tiến hành đặt hàng.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F06423] text-white font-bold text-xs flex items-center justify-center shrink-0">5</span>
              <div>
                <h4 className="font-bold text-sm text-[#231F20]">Điền địa chỉ & Nhận hàng</h4>
                <p className="text-xs text-gray-600 mt-0.5">Chọn phương thức COD hoặc VietQR mô phỏng, nhận mã đơn hàng định danh và theo dõi trạng thái giao hàng.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Privacy */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-2xl bg-[#174D7A] text-white flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#231F20] font-['Plus_Jakarta_Sans']">
                Chính Sách Bảo Mật Quyền Riêng Tư
              </h2>
              <span className="text-xs text-gray-400">Cam kết bảo vệ dữ liệu người dùng</span>
            </div>
          </div>

          <div className="space-y-4">
            <p>
              FLEXI tôn trọng và cam kết bảo vệ dữ liệu cá nhân của mọi khách hàng. Mọi thông tin cung cấp (Họ tên, Số điện thoại, Địa chỉ nhận hàng) chỉ được sử dụng cho mục đích xử lý đơn hàng và dịch vụ khách hàng.
            </p>
            <p>
              Chúng tôi tuyệt đối không mua bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích quảng cáo thương mại.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Terms */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-2xl bg-[#174D7A] text-white flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#231F20] font-['Plus_Jakarta_Sans']">
                Điều Khoản Sử Dụng Dịch Vụ
              </h2>
              <span className="text-xs text-gray-400">Quy định pháp lý khi trải nghiệm website</span>
            </div>
          </div>

          <div className="space-y-4">
            <p>
              Chào mừng bạn đến với website của FLEXI. Khi truy cập và sử dụng dịch vụ trên website này, bạn đồng ý tuân thủ các quy định về quyền sở hữu trí tuệ, bản quyền hình ảnh sản phẩm và thương hiệu "STEP INTO YOUR DAY".
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Lưu ý bản quyền & nguyên mẫu:</span> Toàn bộ hình ảnh, đồ họa vector SVG và mã nguồn prototype được thiết kế chuyên biệt cho đồ án nhận diện thương hiệu FLEXI v4.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
