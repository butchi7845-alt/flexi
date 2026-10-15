import React from 'react';
import { CheckCircle2, Package, Printer, ArrowRight, Truck, Clock, ShieldCheck } from 'lucide-react';
import type { Order } from '../types/index.ts';
import { formatVND } from '../utils/cartLogic.ts';

interface OrderSuccessPageProps {
  order: Order | null;
  onNavigate: (view: string, param?: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onNavigate }) => {
  const handlePrint = () => {
    window.print();
  };

  const sampleOrder: Order = order || {
    id: 'FX-88492',
    createdAt: new Date().toLocaleString('vi-VN'),
    customer: {
      fullName: 'Khách hàng Demo',
      phone: '0987 654 321',
      address: '124 Nguyễn Huệ, Phường Bến Nghé',
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      paymentMethod: 'vietqr',
    },
    items: [],
    subtotal: 499000,
    discount: 0,
    shipping: 0,
    total: 499000,
    status: 'confirmed',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Success Hero Header */}
      <div className="bg-white rounded-3xl p-8 border border-[#E2DFD2] shadow-sm text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto ring-8 ring-green-50 animate-bounce">
          <CheckCircle2 size={44} />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full">
            Đặt hàng thành công (Demo Prototype)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans'] pt-2">
            Cảm Ơn Bạn Đã Trải Nghiệm FLEXI!
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Mã đơn hàng của bạn là <span className="font-mono font-bold text-[#F06423] text-base">{sampleOrder.id}</span>. Đơn hàng kiểm thử đã được lưu vào hệ thống và giỏ hàng của bạn đã được giải phóng.
          </p>
        </div>

        {/* Tracking Timeline */}
        <div className="pt-6 border-t border-gray-100 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#174D7A] text-white flex items-center justify-center mx-auto text-xs font-bold">
                ✓
              </div>
              <div className="font-bold text-[#174D7A]">Đã nhận đơn</div>
              <div className="text-[10px] text-gray-400">Hôm nay</div>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#F06423] text-white flex items-center justify-center mx-auto text-xs font-bold">
                <Package size={14} />
              </div>
              <div className="font-bold text-[#F06423]">Đang chuẩn bị</div>
              <div className="text-[10px] text-gray-400">Đóng gói bọc hạt</div>
            </div>

            <div className="space-y-1.5 opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-xs font-bold">
                <Truck size={14} />
              </div>
              <div className="font-semibold text-gray-600">Đang giao hàng</div>
              <div className="text-[10px] text-gray-400">2-3 ngày tới</div>
            </div>

            <div className="space-y-1.5 opacity-60">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-xs font-bold">
                ★
              </div>
              <div className="font-semibold text-gray-600">Giao thành công</div>
              <div className="text-[10px] text-gray-400">Đổi trả 30 ngày</div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Receipt Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6 print:border-none print:shadow-none">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#231F20] font-['Plus_Jakarta_Sans']">
              Chi Tiết Biên Lai Xuất Kho Demo
            </h3>
            <span className="text-xs text-gray-500">Thời gian: {sampleOrder.createdAt}</span>
          </div>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#231F20] flex items-center gap-1.5 transition-colors cursor-pointer print:hidden"
          >
            <Printer size={15} /> In phiếu đơn
          </button>
        </div>

        {/* Customer info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 bg-[#F4F5F1] p-4 rounded-2xl">
          <div>
            <span className="font-bold text-[#231F20]">Khách hàng:</span> {sampleOrder.customer.fullName}
          </div>
          <div>
            <span className="font-bold text-[#231F20]">Số điện thoại:</span> {sampleOrder.customer.phone}
          </div>
          <div className="sm:col-span-2">
            <span className="font-bold text-[#231F20]">Địa chỉ nhận hàng:</span> {sampleOrder.customer.address}, {sampleOrder.customer.district}, {sampleOrder.customer.city}
          </div>
          <div>
            <span className="font-bold text-[#231F20]">Hình thức thanh toán:</span>{' '}
            {sampleOrder.customer.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : sampleOrder.customer.paymentMethod === 'cod' ? 'Tiền mặt khi nhận (COD)' : 'Ví điện tử'}
          </div>
        </div>

        {/* Financial summary */}
        <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
          <div className="flex justify-between">
            <span>Tạm tính đơn hàng:</span>
            <span className="font-semibold text-[#231F20]">{formatVND(sampleOrder.subtotal)}</span>
          </div>
          {sampleOrder.discount > 0 && (
            <div className="flex justify-between text-green-600 font-semibold">
              <span>Khuyến mãi voucher:</span>
              <span>-{formatVND(sampleOrder.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span>{sampleOrder.shipping === 0 ? 'Miễn phí' : formatVND(sampleOrder.shipping)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-gray-100 text-[#231F20]">
            <span className="text-sm font-bold">Tổng thanh toán:</span>
            <span className="text-2xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
              {formatVND(sampleOrder.total)}
            </span>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#174D7A] shrink-0" />
          <span>Cam kết: Đôi dép của bạn được bảo hành phôi bọt EVA chống nứt gãy và hỗ trợ đổi size miễn phí trong 30 ngày.</span>
        </div>
      </div>

      {/* Return home / collection CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3.5 bg-[#174D7A] hover:bg-[#123e63] text-white font-bold text-sm rounded-2xl transition-colors cursor-pointer text-center"
        >
          Về Trang Chủ FLEXI
        </button>
        <button
          onClick={() => onNavigate('collection')}
          className="px-6 py-3.5 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Khám Phá Thêm Mẫu Dép Khác</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
