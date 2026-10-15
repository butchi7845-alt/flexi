import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  Truck,
  CreditCard,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { formatVND } from '../utils/cartLogic.ts';
import type { Order, OrderCustomerInfo } from '../types/index.ts';

interface CheckoutPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOrderCreated: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderCreated }) => {
  const { items, subtotal, discount, shipping, total, promoCode, clearCart, showToast } = useCart();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hồ Chí Minh',
    district: '',
    paymentMethod: 'vietqr',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên người nhận';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại nhận hàng';
    } else if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (9 - 11 chữ số)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ giao hàng cụ thể';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng nhập Quận / Huyện';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast('Giỏ hàng trống! Vui lòng chọn sản phẩm trước.', 'warning');
      onNavigate('collection');
      return;
    }

    if (!validate()) {
      showToast('Vui lòng điền đầy đủ các thông tin giao hàng bắt buộc!', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `FX-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toLocaleString('vi-VN'),
        customer: { ...formData },
        items: [...items],
        subtotal,
        discount,
        shipping,
        total,
        promoCode: promoCode || undefined,
        status: 'confirmed',
      };

      // Save to localStorage for demo persistence
      try {
        localStorage.setItem(`flexi_last_order`, JSON.stringify(newOrder));
      } catch {
        // ignore
      }

      onOrderCreated(newOrder);
      clearCart();
      setIsSubmitting(false);
      onNavigate('order-success', orderId);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="border-b border-[#E2DFD2] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
          Thanh Toán Đơn Hàng (Demo Sandbox)
        </h1>
        <p className="text-xs text-gray-500">
          Xác nhận thông tin giao hàng và chọn phương thức thanh toán mô phỏng
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Customer & Delivery Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Shipping Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-base text-[#231F20] font-['Plus_Jakarta_Sans']">
                  Thông Tin Giao Hàng
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Họ và tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    } focus:outline-none focus:border-[#F06423]`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500">{errors.fullName}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.phone ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    } focus:outline-none focus:border-[#F06423]`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-500">{errors.phone}</span>
                  )}
                </div>

                {/* Email (Optional) */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Email nhận thông báo mã đơn hàng (Tùy chọn)
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423]"
                  />
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Tỉnh / Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423] bg-white cursor-pointer"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">TP. Hà Nội</option>
                    <option value="Đà Nẵng">TP. Đà Nẵng</option>
                    <option value="Cần Thơ">TP. Cần Thơ</option>
                    <option value="Hải Phòng">TP. Hải Phòng</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Khác">Tỉnh / Thành phố khác</option>
                  </select>
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Quận / Huyện <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Quận 1, Cầu Giấy, Hải Châu..."
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.district ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    } focus:outline-none focus:border-[#F06423]`}
                  />
                  {errors.district && (
                    <span className="text-[11px] text-red-500">{errors.district}</span>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Số nhà, tên đường, tòa nhà hoặc ngõ..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                      errors.address ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                    } focus:outline-none focus:border-[#F06423]`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-500">{errors.address}</span>
                  )}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Ghi chú cho shipper (Tùy chọn)</label>
                  <textarea
                    rows={2}
                    placeholder="Giao giờ hành chính, gọi trước khi giao..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <span className="w-6 h-6 rounded-full bg-[#174D7A] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-base text-[#231F20] font-['Plus_Jakarta_Sans']">
                  Phương Thức Thanh Toán
                </h3>
              </div>

              {/* Prototype warning banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Lưu ý mô phỏng (Prototype Demo):</span> Đây là phiên bản kiểm thử trải nghiệm người dùng v4. Mã QR hoặc các nút thanh toán là giả lập hiển thị an toàn, hệ thống <span className="font-bold">KHÔNG</span> trừ tiền thật và không yêu cầu cung cấp mã PIN/OTP cá nhân.
                </div>
              </div>

              <div className="space-y-3">
                {/* Method 1: VietQR Mock */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: 'vietqr' })}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'vietqr'
                      ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'vietqr'}
                    onChange={() => {}}
                    className="mt-1 accent-[#F06423]"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#231F20] flex items-center gap-1.5">
                        <QrCode size={16} className="text-[#174D7A]" /> Chuyển khoản nhanh VietQR 24/7 (Mô phỏng)
                      </span>
                      <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        Khuyên dùng
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500">
                      Tự động tạo mã QR động kèm số tiền và mã đơn hàng định danh.
                    </p>

                    {formData.paymentMethod === 'vietqr' && (
                      <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
                        {/* Mock QR graphic */}
                        <div className="w-28 h-28 bg-gray-50 border-2 border-dashed border-[#174D7A] rounded-xl flex flex-col items-center justify-center p-2 text-center shrink-0">
                          <QrCode size={48} className="text-[#174D7A]" />
                          <span className="text-[9px] font-bold text-[#F06423] mt-1">VIETQR DEMO</span>
                        </div>
                        <div className="text-xs space-y-1 text-gray-600">
                          <div>
                            <span className="font-bold text-[#231F20]">Ngân hàng:</span> MB Bank (Quân Đội)
                          </div>
                          <div>
                            <span className="font-bold text-[#231F20]">Số tài khoản:</span> 9999.8888.FLEXI (Demo)
                          </div>
                          <div>
                            <span className="font-bold text-[#231F20]">Chủ tài khoản:</span> CONG TY TNHH FLEXI VIETNAM
                          </div>
                          <div>
                            <span className="font-bold text-[#231F20]">Nội dung:</span> FX-XXXXX (Tự động điền)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 2: COD */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => {}}
                    className="mt-1 accent-[#F06423]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#231F20] flex items-center gap-1.5">
                      <Truck size={16} className="text-[#174D7A]" /> Thanh toán khi nhận hàng (COD)
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Kiểm tra hàng trước khi thanh toán tiền mặt cho nhân viên giao hàng.
                    </p>
                  </div>
                </label>

                {/* Method 3: MoMo / E-Wallet */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: 'momo' })}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'momo'
                      ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={() => {}}
                    className="mt-1 accent-[#F06423]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#231F20] flex items-center gap-1.5">
                      <CreditCard size={16} className="text-[#174D7A]" /> Ví điện tử MoMo / ZaloPay
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Thanh toán liên kết ví điện tử một chạm tiện lợi.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Submit (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-sm space-y-5">
              <h3 className="font-bold text-base text-[#231F20] font-['Plus_Jakarta_Sans'] pb-2 border-b border-gray-100">
                Đơn Hàng ({items.reduce((s, i) => s + i.quantity, 0)} món)
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.itemKey} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-[#174D7A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.quantity}x
                      </span>
                      <div className="truncate">
                        <div className="font-bold text-[#231F20] truncate">{item.productName}</div>
                        <div className="text-[11px] text-gray-400">
                          {item.colorName} • Size {item.size}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-[#231F20] shrink-0">
                      {formatVND(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-[#231F20]">{formatVND(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Ưu đãi voucher ({promoCode}):</span>
                    <span>-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-bold">Miễn phí</span> : formatVND(shipping)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-gray-100 text-[#231F20]">
                  <span className="text-sm font-bold">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                    {formatVND(total)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#F06423] hover:bg-[#d65319] disabled:bg-gray-400 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Lock size={16} />
                <span>{isSubmitting ? 'Đang tạo đơn hàng...' : 'Xác Nhận Đặt Hàng Ngay'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-green-600" />
                <span>Bảo mật dữ liệu 100% &bull; Đổi trả 30 ngày an tâm</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
