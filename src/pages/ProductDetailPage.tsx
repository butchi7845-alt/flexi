import React, { useState } from 'react';
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Footprints,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { FLEXI_PRODUCTS, SAMPLE_REVIEWS } from '../data/products.ts';
import { ShoeSvgRenderer } from '../components/ShoeSvgRenderer.tsx';
import { formatVND } from '../utils/cartLogic.ts';

interface ProductDetailPageProps {
  productId?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId = 'clog-core',
  onNavigate,
}) => {
  const { addStandardItem, setIsSizeGuideOpen, setIsCartOpen, showToast } = useCart();

  const product = FLEXI_PRODUCTS.find((p) => p.id === productId) || FLEXI_PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeAngle, setActiveAngle] = useState<'side' | 'top' | 'sole'>('side');
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSizeClick = (size: number) => {
    setSelectedSize(size);
    setValidationError(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Vui lòng chọn kích cỡ (Size) trước khi thêm vào giỏ hàng!');
      showToast('Vui lòng chọn kích cỡ (Size) trước khi thêm vào giỏ hàng!', 'warning');
      return;
    }

    const success = addStandardItem(
      product,
      selectedVariant.colorName,
      selectedVariant.colorHex,
      selectedSize,
      quantity
    );

    if (success) {
      setValidationError(null);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Vui lòng chọn kích cỡ (Size) trước khi tiến hành mua ngay!');
      showToast('Vui lòng chọn kích cỡ (Size) trước khi mua ngay!', 'warning');
      return;
    }

    addStandardItem(
      product,
      selectedVariant.colorName,
      selectedVariant.colorHex,
      selectedSize,
      quantity
    );
    onNavigate('checkout');
  };

  const handleCustomizeInStudio = () => {
    onNavigate('studio');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <button onClick={() => onNavigate('home')} className="hover:text-[#F06423] cursor-pointer">
          Trang chủ
        </button>
        <span>/</span>
        <button onClick={() => onNavigate('collection')} className="hover:text-[#F06423] cursor-pointer">
          Bộ sưu tập
        </button>
        <span>/</span>
        <span className="font-bold text-[#231F20]">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Multi-Angle Interactive Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-8 border border-[#E2DFD2] shadow-sm flex flex-col items-center justify-center relative min-h-[420px]">
            {/* Angle switch badge */}
            <div className="absolute top-4 left-4 z-10 flex gap-2 bg-[#F4F5F1] p-1 rounded-2xl border border-gray-200 text-xs">
              <button
                onClick={() => setActiveAngle('side')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  activeAngle === 'side' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600'
                }`}
              >
                Góc nghiêng (Side)
              </button>
              <button
                onClick={() => setActiveAngle('top')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  activeAngle === 'top' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600'
                }`}
              >
                Nhìn từ trên (Top)
              </button>
              <button
                onClick={() => setActiveAngle('sole')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  activeAngle === 'sole' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600'
                }`}
              >
                Mặt đế (Sole)
              </button>
            </div>

            {/* Bestseller badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#F06423] text-white font-black text-xs rounded-full uppercase tracking-wider shadow-sm">
              Bán chạy nhất
            </div>

            {/* SVG Renderer */}
            <div className="w-full flex items-center justify-center py-6">
              <ShoeSvgRenderer
                category={product.category}
                view={activeAngle}
                baseColorHex={selectedVariant.colorHex}
                className="w-full max-w-lg h-auto"
              />
            </div>

            <div className="text-[11px] text-gray-400 mt-2">
              Màu hiển thị: <span className="font-semibold text-gray-700">{selectedVariant.colorName}</span>
            </div>
          </div>

          {/* Quick banner leading to 2D Studio */}
          <div className="bg-[#174D7A]/5 border border-[#174D7A]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F06423] text-white flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#174D7A]">Muốn tạo dấu ấn riêng với mẫu dép này?</h4>
                <p className="text-[11px] text-gray-600">Thêm họa tiết vẽ tay, khắc tên & gắn 16 charm theo ý bạn trong 2D Studio.</p>
              </div>
            </div>
            <button
              onClick={handleCustomizeInStudio}
              className="px-4 py-2 bg-[#174D7A] hover:bg-[#123e63] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Mở 2D Studio Ngay
            </button>
          </div>
        </div>

        {/* Right Column: Buying Options & Spec (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6">
            {/* Title & Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} đánh giá)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.tagline}
              </p>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                  {formatVND(product.basePrice)}
                </span>
                <span className="text-xs text-gray-400 line-through">599.000 ₫</span>
                <span className="text-xs font-black text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                  Tiết kiệm 17%
                </span>
              </div>
            </div>

            {/* COLOR SELECTION */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#231F20]">
                  Màu sắc: <span className="text-[#174D7A] font-black">{selectedVariant.colorName}</span>
                </span>
                <span className="text-gray-400">6 màu sẵn có</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.colorName === variant.colorName;
                  return (
                    <button
                      key={variant.colorName}
                      onClick={() => setSelectedVariant(variant)}
                      title={variant.colorName}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#F06423] scale-110 shadow-md ring-2 ring-[#F06423]/30'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: variant.colorHex }}
                    >
                      {isSelected && (
                        <Check
                          size={16}
                          className={variant.colorHex === '#1C1C1E' ? 'text-white' : 'text-[#231F20]'}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE SELECTION (MANDATORY GATEKEEPING) */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#231F20]">
                  Kích cỡ (Size EU):{' '}
                  {selectedSize ? (
                    <span className="text-[#F06423] font-black text-sm">{selectedSize}</span>
                  ) : (
                    <span className="text-red-500 font-bold">* Chưa chọn</span>
                  )}
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#174D7A] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <HelpCircle size={14} className="text-[#F06423]" /> Bảng đo size chi tiết
                </button>
              </div>

              {/* Error banner if user skipped size */}
              {validationError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="grid grid-cols-5 gap-2">
                {product.availableSizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSizeClick(sz)}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#174D7A] text-white border-[#174D7A] shadow-sm'
                          : 'bg-[#F4F5F1] text-[#231F20] border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUANTITY & CTAs */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                {/* Quantity counter */}
                <div className="flex items-center border border-gray-200 rounded-2xl bg-[#F4F5F1] px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-gray-600 hover:text-black cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#231F20]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-gray-600 hover:text-black cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#174D7A] hover:bg-[#123e63] text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  <span>Thêm Vào Giỏ</span>
                </button>
              </div>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Mua Ngay (Giao Tận Nơi)
              </button>
            </div>

            {/* Assurance badges */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-gray-600">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#F06423] shrink-0" />
                <span>Giao hàng 2-3 ngày toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-[#F06423] shrink-0" />
                <span>Đổi size miễn phí trong 30 ngày</span>
              </div>
            </div>
          </div>

          {/* Product Specifications Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-sm space-y-4">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full flex items-center justify-between font-bold text-sm text-[#231F20] cursor-pointer"
            >
              <span>Thông số kỹ thuật & Chất liệu</span>
              {showSpecs ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showSpecs && (
              <div className="space-y-3 pt-2 text-xs text-gray-600 border-t border-gray-100">
                <div>
                  <span className="font-bold text-[#231F20]">Chất liệu chính:</span> {product.materials}
                </div>
                <div className="space-y-1.5">
                  <span className="font-bold text-[#231F20]">Tính năng nổi bật:</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 pl-1">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-[#231F20] font-['Plus_Jakarta_Sans']">
              Đánh Giá Của Khách Hàng ({product.reviewCount})
            </h3>
            <p className="text-xs text-gray-500">100% đánh giá từ người mua hàng thực tế</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">4.9 / 5.0</span>
            <div className="text-xs text-gray-500">
              <div>Khuyên dùng: 98%</div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-4 bg-[#F4F5F1] rounded-2xl border border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#231F20]">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full font-bold">
                      Đã mua hàng
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-gray-400">{rev.date}</span>
              </div>
              <div className="flex text-amber-400 text-xs">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
              {rev.userColor && (
                <div className="text-[10px] text-gray-500 font-medium pt-1">
                  Màu đã chọn: <span className="text-[#174D7A]">{rev.userColor}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
