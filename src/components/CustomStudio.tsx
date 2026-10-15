import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Shuffle,
  ShoppingBag,
  Eye,
  Type,
  Palette,
  Check,
  Trash2,
  HelpCircle,
  Footprints,
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { FLEXI_COLORS, FLEXI_PATTERNS, FLEXI_CHARMS } from '../data/charmsAndDecor.ts';
import { ShoeSvgRenderer, CLOG_TOP_HOLES } from './ShoeSvgRenderer.tsx';
import { CharmSvgRenderer } from './CharmSvgRenderer.tsx';
import { formatVND, calculateItemPrice, CHARM_UNIT_PRICE, ENGRAVING_FEE } from '../utils/cartLogic.ts';
import type { PlacedCharm, ProductCategory } from '../types/index.ts';

interface CustomStudioProps {
  onNavigate: (view: string, param?: string) => void;
  initialSize?: number;
}

export const CustomStudio: React.FC<CustomStudioProps> = ({ onNavigate, initialSize = 39 }) => {
  const { addCustomItem, setIsSizeGuideOpen, showToast } = useCart();

  const [category, setCategory] = useState<ProductCategory>('clog');
  const [viewAngle, setViewAngle] = useState<'side' | 'top' | 'sole'>('top');
  const [baseColor, setBaseColor] = useState(FLEXI_COLORS[0]);
  const [selectedPatternId, setSelectedPatternId] = useState<string | undefined>(undefined);
  const [patternOpacity, setPatternOpacity] = useState<number>(0.75);

  const [customText, setCustomText] = useState<string>('');
  const [selectedFont, setSelectedFont] = useState<string>("'Plus Jakarta Sans', sans-serif");
  const [textColor, setTextColor] = useState<string>('#231F20');
  const [textPosition, setTextPosition] = useState<'strap' | 'lateral'>('strap');

  const [charms, setCharms] = useState<PlacedCharm[]>([
    { instanceId: 'init-1', charmId: 'flower', holeIndex: 1, x: 340, y: 155 },
    { instanceId: 'init-2', charmId: 'smiley', holeIndex: 3, x: 300, y: 230 },
  ]);
  const [selectedHoleIndex, setSelectedHoleIndex] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(initialSize);
  const [activeTab, setActiveTab] = useState<'color' | 'pattern' | 'text' | 'charms'>('charms');

  const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  // Base price according to category
  const basePrice = category === 'clog' ? 499000 : category === 'sandal' ? 459000 : 389000;
  const hasEngraving = Boolean(customText.trim());
  const totalPrice = calculateItemPrice(basePrice, charms.length, hasEngraving);

  // Hole click handler
  const handleHoleClick = (holeIndex: number) => {
    setSelectedHoleIndex(holeIndex);
    setActiveTab('charms');
    showToast(`Đã chọn vị trí Lỗ ${holeIndex + 1}. Hãy chọn charm từ danh mục bên dưới!`, 'info');
  };

  // Add or replace charm in target hole
  const handleSelectCharm = (charmId: string) => {
    // If no hole selected, pick the first free hole (0 to 4)
    let targetHole = selectedHoleIndex;
    if (targetHole === null) {
      const occupiedHoles = charms.map((c) => c.holeIndex);
      const freeHole = [0, 1, 2, 3, 4].find((idx) => !occupiedHoles.includes(idx));
      if (freeHole === undefined) {
        showToast('Đã gắn tối đa 5 charm! Bạn hãy gỡ bớt charm hoặc chọn lỗ để thay thế.', 'warning');
        return;
      }
      targetHole = freeHole;
    }

    const anchor = CLOG_TOP_HOLES[targetHole];
    const newCharm: PlacedCharm = {
      instanceId: `charm-${Date.now()}-${Math.random()}`,
      charmId,
      holeIndex: targetHole,
      x: anchor.x,
      y: anchor.y,
    };

    setCharms((prev) => {
      const filtered = prev.filter((c) => c.holeIndex !== targetHole);
      return [...filtered, newCharm];
    });

    setSelectedHoleIndex(null);
    showToast(`Đã gắn charm thành công vào vị trí ${targetHole + 1}!`, 'success');
  };

  const handleRemoveCharm = (holeIndex: number) => {
    setCharms((prev) => prev.filter((c) => c.holeIndex !== holeIndex));
    showToast(`Đã gỡ charm tại vị trí ${holeIndex + 1}`, 'info');
  };

  // Randomize preset (Surprise Me!)
  const handleRandomize = () => {
    // Random color
    const randColor = FLEXI_COLORS[Math.floor(Math.random() * FLEXI_COLORS.length)];
    setBaseColor(randColor);

    // Random pattern (50% chance)
    if (Math.random() > 0.5) {
      const randPattern = FLEXI_PATTERNS[Math.floor(Math.random() * FLEXI_PATTERNS.length)];
      setSelectedPatternId(randPattern.id);
    } else {
      setSelectedPatternId(undefined);
    }

    // 2 to 4 random charms
    const count = 2 + Math.floor(Math.random() * 3);
    const shuffledHoles = [0, 1, 2, 3, 4].sort(() => 0.5 - Math.random()).slice(0, count);
    const newCharms: PlacedCharm[] = shuffledHoles.map((holeIdx) => {
      const randCharm = FLEXI_CHARMS[Math.floor(Math.random() * FLEXI_CHARMS.length)];
      const anchor = CLOG_TOP_HOLES[holeIdx];
      return {
        instanceId: `rand-${Date.now()}-${holeIdx}`,
        charmId: randCharm.id,
        holeIndex: holeIdx,
        x: anchor.x,
        y: anchor.y,
      };
    });
    setCharms(newCharms);

    showToast('Đã tạo ngẫu nhiên bản phối mới!', 'success');
  };

  // Reset to default clean state
  const handleReset = () => {
    setBaseColor(FLEXI_COLORS[0]);
    setSelectedPatternId(undefined);
    setCustomText('');
    setCharms([]);
    setSelectedHoleIndex(null);
    showToast('Đã làm mới bản thiết kế', 'info');
  };

  // Save & Add to Cart
  const handleAddToCart = () => {
    addCustomItem({
      baseProductId: category === 'clog' ? 'clog-core' : category === 'slide' ? 'slide-cloud' : 'sandal-active',
      productName: category === 'clog' ? 'FLEXI Clog Classic' : category === 'slide' ? 'FLEXI Slide Cloud' : 'FLEXI Sandal Active',
      baseColor: baseColor.name,
      colorHex: baseColor.hex,
      size: selectedSize,
      patternId: selectedPatternId,
      patternOpacity,
      customText: customText.trim() || undefined,
      textColor,
      textFont: selectedFont,
      textPosition,
      charms,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-[#174D7A] to-[#1F6298] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border-2 border-[#F06423]/40">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F06423] text-white text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} /> 2D Custom Studio v4
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-['Plus_Jakarta_Sans'] tracking-tight">
            Xưởng Tùy Biến Cá Nhân Hóa FLEXI
          </h1>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Tự do sáng tạo phong cách dép sục của riêng bạn! Chọn màu phôi, áp dụng họa tiết vector, đính tối đa 5 charm độc quyền và khắc chữ dập nổi theo yêu cầu.
          </p>
        </div>
        {/* Subtle decorative background graphic */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none text-9xl font-black font-['Plus_Jakarta_Sans']">
          FLEXI
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 2D Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DFD2] shadow-sm relative overflow-hidden">
            {/* View angle & Model selector pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
              {/* Category tabs */}
              <div className="flex bg-[#F4F5F1] p-1 rounded-2xl border border-gray-200">
                <button
                  onClick={() => setCategory('clog')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    category === 'clog'
                      ? 'bg-[#174D7A] text-white shadow-sm'
                      : 'text-[#231F20] hover:text-[#174D7A]'
                  }`}
                >
                  Clog Classic
                </button>
                <button
                  onClick={() => setCategory('slide')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    category === 'slide'
                      ? 'bg-[#174D7A] text-white shadow-sm'
                      : 'text-[#231F20] hover:text-[#174D7A]'
                  }`}
                >
                  Slide Cloud
                </button>
                <button
                  onClick={() => setCategory('sandal')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    category === 'sandal'
                      ? 'bg-[#174D7A] text-white shadow-sm'
                      : 'text-[#231F20] hover:text-[#174D7A]'
                  }`}
                >
                  Sandal Active
                </button>
              </div>

              {/* Angle switchers (for Clog) */}
              {category === 'clog' && (
                <div className="flex items-center gap-1.5 bg-[#F4F5F1] p-1 rounded-2xl border border-gray-200 text-xs">
                  <button
                    onClick={() => setViewAngle('side')}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      viewAngle === 'side' ? 'bg-white text-[#F06423] shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    Mặt bên
                  </button>
                  <button
                    onClick={() => setViewAngle('top')}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      viewAngle === 'top' ? 'bg-white text-[#F06423] shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    Nhìn từ trên
                  </button>
                  <button
                    onClick={() => setViewAngle('sole')}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      viewAngle === 'sole' ? 'bg-white text-[#F06423] shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    Mặt đế
                  </button>
                </div>
              )}
            </div>

            {/* Instruction tooltip badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-[11px] mb-2">
              <Sparkles size={12} className="text-[#F06423]" />
              <span>Mẹo: Nhấp trực tiếp vào các lỗ tròn trên dép để gắn hoặc thay đổi vị trí charm!</span>
            </div>

            {/* SVG Render Viewport */}
            <div className="w-full flex items-center justify-center min-h-[340px] sm:min-h-[400px] select-none py-4">
              <ShoeSvgRenderer
                category={category}
                view={viewAngle}
                baseColorHex={baseColor.hex}
                patternId={selectedPatternId}
                patternOpacity={patternOpacity}
                customText={customText}
                textColor={textColor}
                textFont={selectedFont}
                textPosition={textPosition}
                charms={charms}
                selectedHoleIndex={selectedHoleIndex}
                onHoleClick={handleHoleClick}
                interactive={true}
                className="w-full h-auto drop-shadow-xl"
              />
            </div>

            {/* Quick Actions (Randomize, Reset, Angle hint) */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomize}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#231F20] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shuffle size={14} className="text-[#F06423]" />
                  <span>Ngẫu nhiên (Surprise Me)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Đặt lại</span>
                </button>
              </div>

              <div className="text-[11px] text-gray-500 font-medium">
                {charms.length}/5 Charm đã gắn
              </div>
            </div>
          </div>

          {/* Placed Charms Bar */}
          {charms.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-[#E2DFD2] shadow-xs space-y-2">
              <div className="text-xs font-bold text-[#174D7A] flex items-center justify-between">
                <span>Charm đang gắn trên dép ({charms.length}/5):</span>
                <span className="text-[11px] text-gray-400">Nhấp biểu tượng thùng rác để gỡ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {charms.map((pc) => {
                  const charmInfo = FLEXI_CHARMS.find((c) => c.id === pc.charmId);
                  return (
                    <div
                      key={pc.instanceId}
                      className="px-3 py-1.5 bg-[#F4F5F1] rounded-xl border border-gray-200 flex items-center gap-2 text-xs"
                    >
                      <span>{charmInfo?.emoji || '★'}</span>
                      <span className="font-bold text-[#231F20]">{charmInfo?.vietnameseName}</span>
                      <span className="text-[10px] text-gray-500">(Lỗ {pc.holeIndex + 1})</span>
                      <button
                        onClick={() => handleRemoveCharm(pc.holeIndex)}
                        aria-label="Gỡ charm"
                        className="text-gray-400 hover:text-red-500 ml-1 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Customization Controls & Live Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2DFD2] shadow-sm space-y-6">
            {/* Control Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-[#F4F5F1] p-1 rounded-2xl border border-gray-200">
              <button
                onClick={() => setActiveTab('charms')}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  activeTab === 'charms' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600 hover:text-[#174D7A]'
                }`}
              >
                <Sparkles size={14} />
                <span>16 Charm</span>
              </button>
              <button
                onClick={() => setActiveTab('color')}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  activeTab === 'color' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600 hover:text-[#174D7A]'
                }`}
              >
                <Palette size={14} />
                <span>Màu phôi</span>
              </button>
              <button
                onClick={() => setActiveTab('pattern')}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  activeTab === 'pattern' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600 hover:text-[#174D7A]'
                }`}
              >
                <Eye size={14} />
                <span>Họa tiết</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  activeTab === 'text' ? 'bg-[#174D7A] text-white shadow-xs' : 'text-gray-600 hover:text-[#174D7A]'
                }`}
              >
                <Type size={14} />
                <span>Khắc chữ</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CHARMS */}
            {activeTab === 'charms' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#231F20]">Chọn charm để gắn ({charms.length}/5):</span>
                  <span className="text-[#F06423] font-bold">+25.000 ₫ / charm</span>
                </div>

                {selectedHoleIndex !== null && (
                  <div className="p-2.5 rounded-xl bg-[#F06423]/10 border border-[#F06423]/30 text-xs text-[#F06423] font-bold flex items-center justify-between">
                    <span>Đang gán charm vào vị trí Lỗ {selectedHoleIndex + 1}</span>
                    <button
                      onClick={() => setSelectedHoleIndex(null)}
                      className="underline text-xs cursor-pointer"
                    >
                      Hủy chọn lỗ
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {FLEXI_CHARMS.map((charm) => (
                    <button
                      key={charm.id}
                      onClick={() => handleSelectCharm(charm.id)}
                      className="p-2 bg-[#F4F5F1] hover:bg-white hover:border-[#F06423] border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group shadow-2xs hover:scale-105"
                      title={charm.vietnameseName}
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        <CharmSvgRenderer charmId={charm.id} size={36} />
                      </div>
                      <span className="text-[10px] font-bold text-[#231F20] text-center line-clamp-1">
                        {charm.vietnameseName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: COLOR */}
            {activeTab === 'color' && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-xs font-bold text-[#231F20]">
                  Phôi màu dép hiện tại: <span className="text-[#174D7A]">{baseColor.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {FLEXI_COLORS.map((c) => {
                    const isSelected = baseColor.hex === c.hex;
                    return (
                      <button
                        key={c.hex}
                        onClick={() => setBaseColor(c)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-black/10 shrink-0 shadow-xs flex items-center justify-center"
                          style={{ backgroundColor: c.hex }}
                        >
                          {isSelected && <Check size={14} className={c.hex === '#1C1C1E' ? 'text-white' : 'text-[#231F20]'} />}
                        </div>
                        <span className="text-xs font-bold text-[#231F20] truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PATTERN */}
            {activeTab === 'pattern' && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-xs font-bold text-[#231F20]">Họa tiết vector độc quyền:</div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedPatternId(undefined)}
                    className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedPatternId === undefined
                        ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    Trơn (Không họa tiết)
                  </button>
                  {FLEXI_PATTERNS.map((p) => {
                    const isSelected = selectedPatternId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPatternId(p.id)}
                        className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#F06423] bg-[#F06423]/5 ring-2 ring-[#F06423]'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#231F20]">{p.vietnameseName}</span>
                        <span className="text-[10px] text-gray-500">{p.name}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedPatternId && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Độ đậm họa tiết:</span>
                      <span className="font-bold">{Math.round(patternOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1"
                      step="0.05"
                      value={patternOpacity}
                      onChange={(e) => setPatternOpacity(parseFloat(e.target.value))}
                      className="w-full accent-[#F06423] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 4: TEXT ENGRAVING */}
            {activeTab === 'text' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#231F20]">Khắc chữ dập nổi:</span>
                  <span className="text-[#F06423] font-bold">+30.000 ₫</span>
                </div>
                <div>
                  <input
                    type="text"
                    maxLength={14}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    placeholder="VD: MINH ANH, FLEXI 26, GOOD VIBES"
                    className="w-full px-4 py-2.5 text-sm uppercase font-bold rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423]"
                  />
                  <div className="text-[11px] text-gray-500 mt-1">Tối đa 14 ký tự (tự động viết hoa).</div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#231F20]">Vị trí khắc:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => setTextPosition('strap')}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        textPosition === 'strap'
                          ? 'border-[#F06423] bg-[#F06423]/10 text-[#F06423]'
                          : 'border-gray-200'
                      }`}
                    >
                      Quai hậu (Heel Strap)
                    </button>
                    <button
                      onClick={() => setTextPosition('lateral')}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        textPosition === 'lateral'
                          ? 'border-[#F06423] bg-[#F06423]/10 text-[#F06423]'
                          : 'border-gray-200'
                      }`}
                    >
                      Thành bên (Lateral Wall)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY SIZE SELECTION */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#231F20]">
                  Kích cỡ giày: <span className="text-[#174D7A] font-black">EU {selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#F06423] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <HelpCircle size={13} /> Hướng dẫn đo size
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#174D7A] text-white border-[#174D7A] shadow-xs'
                        : 'bg-[#F4F5F1] text-[#231F20] border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE BREAKDOWN & ADD TO CART CTA */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Giá phôi dép cơ bản ({category === 'clog' ? 'Clog' : category === 'slide' ? 'Slide' : 'Sandal'}):</span>
                  <span className="font-semibold text-[#231F20]">{formatVND(basePrice)}</span>
                </div>
                {charms.length > 0 && (
                  <div className="flex justify-between">
                    <span>Phụ kiện ({charms.length} charm x 25.000 ₫):</span>
                    <span className="font-semibold text-[#F06423]">+{formatVND(charms.length * CHARM_UNIT_PRICE)}</span>
                  </div>
                )}
                {hasEngraving && (
                  <div className="flex justify-between">
                    <span>Khắc tên cá nhân hóa:</span>
                    <span className="font-semibold text-[#F06423]">+{formatVND(ENGRAVING_FEE)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                  <span className="text-sm font-bold text-[#231F20]">Tổng giá trị bản phối:</span>
                  <span className="text-2xl font-black text-[#F06423] font-['Plus_Jakarta_Sans']">
                    {formatVND(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#F06423] hover:bg-[#d65319] text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <ShoppingBag size={20} />
                <span>Thêm Bản Phối Vào Giỏ Hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
