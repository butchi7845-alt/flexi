import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { formatVND } from '../utils/cartLogic.ts';
import { ShoeSvgRenderer } from './ShoeSvgRenderer.tsx';

interface CartDrawerProps {
  onNavigate: (view: string, param?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromoCode(inputCode);
    showToast(`Đã kiểm tra mã: ${inputCode.toUpperCase()}`, 'info');
    setInputCode('');
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
  };

  const handleGoToCartPage = () => {
    setIsCartOpen(false);
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F4F5F1] shadow-2xl flex flex-col border-l border-[#E2DFD2]">
          {/* Header */}
          <div className="p-5 border-b border-[#E2DFD2] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#174D7A] text-white flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#231F20] text-base font-['Plus_Jakarta_Sans']">
                  Giỏ Hàng Của Bạn
                </h3>
                <span className="text-xs text-[#231F20]/60">
                  {items.length === 0 ? 'Chưa có sản phẩm' : `${items.reduce((s, i) => s + i.quantity, 0)} sản phẩm trong giỏ`}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Đóng giỏ hàng"
              className="p-2 rounded-full hover:bg-black/5 text-[#231F20] cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#E2DFD2] flex items-center justify-center text-[#174D7A]">
                  <ShoppingBag size={36} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-[#231F20] text-lg">Giỏ hàng đang trống</h4>
                  <p className="text-xs text-[#231F20]/60 max-w-xs">
                    Hãy khám phá bộ sưu tập dép sục kinh điển hoặc thử tự thiết kế trong 2D Studio nhé!
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('product', 'clog-core');
                    }}
                    className="w-full py-2.5 bg-[#174D7A] text-white text-xs font-bold rounded-xl hover:bg-[#123e63] cursor-pointer"
                  >
                    Xem FLEXI Clog Classic
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('studio');
                    }}
                    className="w-full py-2.5 bg-[#F06423] text-white text-xs font-bold rounded-xl hover:bg-[#d65319] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={14} /> Vào 2D Custom Studio
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-[#231F20]/60 pb-1">
                  <span>Danh sách sản phẩm</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={12} /> Xóa tất cả
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.itemKey}
                    className="bg-white rounded-2xl p-3.5 border border-[#E2DFD2] shadow-xs flex gap-3 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-[#F4F5F1] flex items-center justify-center p-1 overflow-hidden shrink-0 border border-gray-100">
                      {item.isCustom && item.customDesign ? (
                        <ShoeSvgRenderer
                          category="clog"
                          view="side"
                          baseColorHex={item.colorHex}
                          patternId={item.customDesign.patternId}
                          charms={item.customDesign.charms}
                          customText={item.customDesign.customText}
                          className="w-full h-full scale-125"
                        />
                      ) : (
                        <ShoeSvgRenderer
                          category="clog"
                          view="side"
                          baseColorHex={item.colorHex}
                          className="w-full h-full scale-125"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-xs font-bold text-[#231F20] truncate">
                            {item.productName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.itemKey)}
                            aria-label={`Xóa ${item.productName}`}
                            className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#231F20]/70 mt-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span>{item.colorName}</span>
                          <span>&bull;</span>
                          <span className="font-bold text-[#174D7A]">Size {item.size}</span>
                        </div>

                        {item.isCustom && item.customDesign && (
                          <div className="mt-1 text-[10px] text-[#F06423] font-medium bg-[#F06423]/10 px-2 py-0.5 rounded-md inline-block">
                            ★ {item.customDesign.charms.length} Charm • {item.customDesign.customText ? `Khắc "${item.customDesign.customText}"` : 'Họa tiết riêng'}
                          </div>
                        )}
                      </div>

                      {/* Price & Quantity Adjuster */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                        <span className="text-xs font-black text-[#F06423]">
                          {formatVND(item.unitPrice * item.quantity)}
                        </span>

                        <div className="flex items-center border border-gray-200 rounded-lg bg-[#F4F5F1] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.itemKey, -1)}
                            aria-label="Giảm số lượng"
                            className="p-1 hover:bg-gray-200 text-[#231F20] cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#231F20] min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemKey, 1)}
                            aria-label="Tăng số lượng"
                            className="p-1 hover:bg-gray-200 text-[#231F20] cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer with totals & action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E2DFD2] bg-white space-y-4 shadow-lg">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nhập mã FLEXI2026..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase rounded-xl border border-gray-200 focus:outline-none focus:border-[#F06423]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#174D7A] text-white text-xs font-bold rounded-xl hover:bg-[#123e63] cursor-pointer"
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
                    Gỡ bỏ
                  </button>
                </div>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-[#231F20]/80">
                <div className="flex justify-between">
                  <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} món)</span>
                  <span className="font-semibold">{formatVND(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Ưu đãi giảm giá</span>
                    <span>-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí giao hàng</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-bold">Miễn phí (Toàn quốc)</span> : formatVND(shipping)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-[#231F20] pt-2 border-t border-gray-100">
                  <span>Tổng thanh toán</span>
                  <span className="text-[#F06423] font-['Plus_Jakarta_Sans']">{formatVND(total)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2">
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3.5 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Tiến Hành Đặt Hàng</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handleGoToCartPage}
                  className="w-full py-2 bg-transparent hover:bg-black/5 text-[#174D7A] font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Xem giỏ hàng chi tiết & voucher
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
