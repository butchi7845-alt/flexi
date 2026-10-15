import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, Truck, Sparkles, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { formatVND, FREE_SHIPPING_THRESHOLD } from '../utils/cartLogic.ts';
import { ShoeSvgRenderer } from '../components/ShoeSvgRenderer.tsx';

interface CartPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    showToast,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      showToast('Vui lòng nhập mã giảm giá', 'warning');
      return;
    }
    applyPromoCode(inputCode);
    showToast(`Đã áp dụng mã: ${inputCode.toUpperCase()}`, 'info');
    setInputCode('');
  };

  const progressToFreeShip = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-[#E2DFD2] text-[#174D7A] flex items-center justify-center mx-auto">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
            Giỏ Hàng Đang Trống
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Bạn chưa thêm sản phẩm nào vào giỏ. Hãy ghé thăm bộ sưu tập dép sục kinh điển hoặc thử sức tạo bản phối cá tính trong 2D Studio nhé!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('product', 'clog-core')}
            className="px-6 py-3 bg-[#174D7A] text-white font-bold text-sm rounded-2xl hover:bg-[#123e63] transition-colors cursor-pointer"
          >
            Xem FLEXI Clog Classic
          </button>
          <button
            onClick={() => onNavigate('studio')}
            className="px-6 py-3 bg-[#F06423] text-white font-bold text-sm rounded-2xl hover:bg-[#d65319] transition-colors cursor-pointer flex items-center gap-2"
          >
            <Sparkles size={16} /> Mở 2D Custom Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2DFD2]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-xs text-gray-500">
            {items.reduce((s, i) => s + i.quantity, 0)} sản phẩm đang chờ thanh toán
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Trash2 size={14} /> Xóa toàn bộ giỏ hàng
        </button>
      </div>

      {/* Free shipping progress notification */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2DFD2] shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-[#174D7A]">
            <Truck size={16} className="text-[#F06423]" />
            {remainingForFreeShip === 0 ? (
              <span className="text-green-700 font-bold">
                Chúc mừng! Đơn hàng của bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN toàn quốc.
              </span>
            ) : (
              <span>
                Mua thêm <span className="font-bold text-[#F06423]">{formatVND(remainingForFreeShip)}</span> để được Miễn phí giao hàng!
              </span>
            )}
          </span>
          <span className="font-bold text-gray-500">{progressToFreeShip}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#F06423] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShip}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.itemKey}
              className="bg-white rounded-3xl p-5 border border-[#E2DFD2] shadow-xs flex flex-col sm:flex-row gap-5 items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-24 h-24 rounded-2xl bg-[#F4F5F1] p-2 flex items-center justify-center shrink-0 border border-gray-100">
                  <ShoeSvgRenderer
                    category="clog"
                    view="side"
                    baseColorHex={item.colorHex}
                    patternId={item.customDesign?.patternId}
                    charms={item.customDesign?.charms}
                    customText={item.customDesign?.customText}
                    className="w-full h-full scale-125"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-[#231F20]">
                    {item.productName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    <span
                      className="w-3 h-3 rounded-full border border-gray-300 inline-block"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    <span>{item.colorName}</span>
                    <span>&bull;</span>
                    <span className="font-black text-[#174D7A]">Size {item.size}</span>
                  </div>

                  {item.isCustom && item.customDesign && (
                    <div className="text-[11px] text-[#F06423] font-medium bg-[#F06423]/10 px-2 py-0.5 rounded-md inline-block">
                      ★ Bản phối Studio: {item.customDesign.charms.length} charm
                      {item.customDesign.customText ? ` & khắc "${item.customDesign.customText}"` : ''}
                    </div>
                  )}

                  <div className="text-xs text-gray-400">
                    Đơn giá: {formatVND(item.unitPrice)}
                  </div>
                </div>
              </div>

              {/* Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-[#F4F5F1] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.itemKey, -1)}
                    aria-label="Giảm số lượng"
                    className="p-2 hover:bg-gray-200 text-[#231F20] cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#231F20] min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.itemKey, 1)}
                    aria-label="Tăng số lượng"
                    className="p-2 hover:bg-gray-200 text-[#231F20] cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-base font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                    {formatVND(item.unitPrice * item.quantity)}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.itemKey)}
                  aria-label="Xóa sản phẩm"
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <button
              onClick={() => onNavigate('collection')}
              className="text-xs font-bold text-[#174D7A] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} /> Tiếp tục mua sắm thêm sản phẩm khác
            </button>
          </div>
        </div>

        {/* Right: Order Summary & Voucher (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-sm space-y-5">
            <h3 className="font-bold text-base text-[#231F20] font-['Plus_Jakarta_Sans']">
              Tóm Tắt Đơn Hàng
            </h3>

            {/* Voucher Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Mã ưu đãi / Voucher:</label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="VD: FLEXI2026"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs uppercase font-bold rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#174D7A] hover:bg-[#123e63] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-xl border border-green-200">
                  <span className="font-semibold">Mã: {promoCode}</span>
                  <button
                    onClick={removePromoCode}
                    className="text-red-500 font-bold hover:underline cursor-pointer"
                  >
                    Gỡ
                  </button>
                </div>
              )}

              <div className="text-[11px] text-gray-500">
                Gợi ý: Nhập <span className="font-mono text-[#F06423] font-bold">FLEXI2026</span> để giảm 10%!
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Tạm tính hàng hóa:</span>
                <span className="font-semibold text-[#231F20]">{formatVND(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Giảm giá khuyến mãi:</span>
                  <span>-{formatVND(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-bold">Miễn phí</span>
                  ) : (
                    formatVND(shipping)
                  )}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-gray-100 text-[#231F20]">
                <span className="text-sm font-bold">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                  {formatVND(total)}
                </span>
              </div>
            </div>

            {/* Proceed to checkout */}
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-4 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Tiến Hành Thanh Toán</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
