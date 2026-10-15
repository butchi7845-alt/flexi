import React, { useState } from 'react';
import { X, Ruler, Footprints, AlertCircle, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const SIZE_TABLE = [
  { eu: 36, cm: 22.5, usMen: '4.5', usWomen: '6' },
  { eu: 37, cm: 23.0, usMen: '5', usWomen: '6.5' },
  { eu: 38, cm: 24.0, usMen: '6', usWomen: '7.5' },
  { eu: 39, cm: 24.5, usMen: '6.5', usWomen: '8' },
  { eu: 40, cm: 25.5, usMen: '7.5', usWomen: '9' },
  { eu: 41, cm: 26.0, usMen: '8', usWomen: '9.5' },
  { eu: 42, cm: 27.0, usMen: '9', usWomen: '10.5' },
  { eu: 43, cm: 27.5, usMen: '9.5', usWomen: '11' },
  { eu: 44, cm: 28.0, usMen: '10', usWomen: '11.5' },
  { eu: 45, cm: 28.5, usMen: '11', usWomen: '12.5' },
];

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [userFootLength, setUserFootLength] = useState<string>('');
  const [recommendedSize, setRecommendedSize] = useState<number | null>(null);

  if (!isSizeGuideOpen) return null;

  const handleCalculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const length = parseFloat(userFootLength);
    if (isNaN(length) || length < 20 || length > 31) {
      return;
    }
    // Formula: length + 0.5cm tolerance
    const targetCm = length + 0.6;
    const match = SIZE_TABLE.find((row) => row.cm >= targetCm) || SIZE_TABLE[SIZE_TABLE.length - 1];
    setRecommendedSize(match.eu);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F4F5F1] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        {/* Header */}
        <div className="sticky top-0 bg-[#F4F5F1] z-10 px-6 py-5 border-b border-[#E2DFD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#174D7A] text-white flex items-center justify-center">
              <Ruler size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#231F20] font-['Plus_Jakarta_Sans']">
                Bảng Quy Đổi & Hướng Dẫn Đo Size FLEXI
              </h3>
              <p className="text-xs text-[#231F20]/60">Chuẩn phom bàn chân người Việt</p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Đóng cửa sổ"
            className="p-2 rounded-full hover:bg-black/5 text-[#231F20] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Interactive Calculator */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2DFD2] shadow-sm">
            <h4 className="text-sm font-bold text-[#174D7A] flex items-center gap-2 mb-2">
              <Footprints size={18} className="text-[#F06423]" />
              Tìm size tự động theo chiều dài chân:
            </h4>
            <form onSubmit={handleCalculateSize} className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Ví dụ: 24.2 (cm)"
                  value={userFootLength}
                  onChange={(e) => setUserFootLength(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#F06423]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-[#174D7A] text-white text-sm font-bold rounded-xl hover:bg-[#123e63] transition-colors cursor-pointer"
              >
                Gợi ý Size
              </button>
            </form>

            {recommendedSize && (
              <div className="mt-3 p-3 rounded-xl bg-[#F06423]/10 border border-[#F06423]/30 flex items-center justify-between">
                <span className="text-sm font-medium text-[#231F20]">
                  Gợi ý chuẩn nhất cho chiều dài <span className="font-bold">{userFootLength} cm</span>:
                </span>
                <span className="text-base font-black text-[#F06423] px-3 py-1 bg-white rounded-lg shadow-sm border border-[#F06423]">
                  Size EU {recommendedSize}
                </span>
              </div>
            )}
          </div>

          {/* Size Conversion Table */}
          <div>
            <h4 className="text-sm font-bold text-[#231F20] mb-3">Bảng quy đổi kích cỡ chi tiết:</h4>
            <div className="overflow-x-auto rounded-2xl border border-[#E2DFD2] bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#174D7A] text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold">Size EU</th>
                    <th className="py-3 px-4 font-bold">Chiều dài bàn chân (cm)</th>
                    <th className="py-3 px-4 font-bold">US Nam</th>
                    <th className="py-3 px-4 font-bold">US Nữ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {SIZE_TABLE.map((row) => (
                    <tr
                      key={row.eu}
                      className={recommendedSize === row.eu ? 'bg-[#F06423]/15 font-bold text-[#F06423]' : 'hover:bg-gray-50'}
                    >
                      <td className="py-2.5 px-4">{row.eu}</td>
                      <td className="py-2.5 px-4">{row.cm} cm</td>
                      <td className="py-2.5 px-4">{row.usMen}</td>
                      <td className="py-2.5 px-4">{row.usWomen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5 Steps Guide */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#231F20]">5 Bước đo bàn chân chuẩn xác tại nhà:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E2DFD2] flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#174D7A] text-white font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <span className="font-bold text-[#231F20]">Đặt giấy A4:</span> Cố định giấy sát mép chân tường trên sàn cứng.
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2DFD2] flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#174D7A] text-white font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <span className="font-bold text-[#231F20]">Đặt chân đứng:</span> Gót tựa nhẹ vào tường, dồn trọng lực tự nhiên.
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2DFD2] flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#174D7A] text-white font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <span className="font-bold text-[#231F20]">Vạch ngón dài nhất:</span> Giữ bút chì vuông góc 90° vạch ngang đầu ngón.
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2DFD2] flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#174D7A] text-white font-bold flex items-center justify-center shrink-0">4</span>
                <div>
                  <span className="font-bold text-[#231F20]">Đo khoảng cách (L):</span> Lấy thước đo milimet từ mép tường đến vạch ngón.
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E2DFD2] flex gap-2.5 sm:col-span-2">
                <span className="w-5 h-5 rounded-full bg-[#F06423] text-white font-bold flex items-center justify-center shrink-0">5</span>
                <div>
                  <span className="font-bold text-[#231F20]">Quy tắc cộng thêm:</span> Bàn chân bình thường: L + 0.5cm. Bàn chân bè dày hoặc thích mang kèm vớ: L + 1.0cm rồi tra bảng trên.
                </div>
              </div>
            </div>
          </div>

          {/* Important care warning */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Lưu ý quan trọng:</span> Bọt EVA Phylon rất bền nhưng nhạy cảm với nhiệt độ cao quá 50°C. Tránh phơi nắng gắt hoặc để trong cốp xe để không làm dép bị co nhiệt!
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-[#E2DFD2] bg-white rounded-b-3xl flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#174D7A] hover:bg-[#123e63] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Đã hiểu, đóng bảng size
          </button>
        </div>
      </div>
    </div>
  );
};
