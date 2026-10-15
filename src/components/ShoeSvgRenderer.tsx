import React from 'react';
import type { PlacedCharm, ProductCategory } from '../types/index.ts';
import { CharmSvgRenderer } from './CharmSvgRenderer.tsx';

interface ShoeSvgRendererProps {
  category?: ProductCategory;
  view?: 'side' | 'top' | 'sole';
  baseColorHex: string;
  patternId?: string;
  patternOpacity?: number;
  customText?: string;
  textColor?: string;
  textFont?: string;
  textPosition?: 'strap' | 'lateral';
  charms?: PlacedCharm[];
  selectedHoleIndex?: number | null;
  onHoleClick?: (holeIndex: number) => void;
  className?: string;
  interactive?: boolean;
}

// 5 standard charm anchor positions on the clog toe box (top view)
export const CLOG_TOP_HOLES = [
  { index: 0, x: 260, y: 170, label: 'Lỗ 1 (Mũi trái)' },
  { index: 1, x: 340, y: 155, label: 'Lỗ 2 (Mũi giữa)' },
  { index: 2, x: 410, y: 180, label: 'Lỗ 3 (Mũi phải)' },
  { index: 3, x: 300, y: 230, label: 'Lỗ 4 (Trung tâm trái)' },
  { index: 4, x: 380, y: 225, label: 'Lỗ 5 (Trung tâm phải)' },
];

// Side view charm spots on upper vamp
export const CLOG_SIDE_HOLES = [
  { index: 0, x: 330, y: 175, label: 'Lỗ 1' },
  { index: 1, x: 375, y: 180, label: 'Lỗ 2' },
  { index: 2, x: 420, y: 190, label: 'Lỗ 3' },
  { index: 3, x: 350, y: 215, label: 'Lỗ 4' },
  { index: 4, x: 395, y: 220, label: 'Lỗ 5' },
];

export const ShoeSvgRenderer: React.FC<ShoeSvgRendererProps> = ({
  category = 'clog',
  view = 'side',
  baseColorHex = '#EFECE6',
  patternId,
  patternOpacity = 0.8,
  customText,
  textColor = '#231F20',
  textFont = "'Plus Jakarta Sans', sans-serif",
  textPosition = 'strap',
  charms = [],
  selectedHoleIndex = null,
  onHoleClick,
  className = 'w-full h-auto max-h-[460px]',
  interactive = false,
}) => {
  // Pattern SVG definitions
  const renderPatternDefs = () => (
    <defs>
      {/* Star Doodle Pattern */}
      <pattern id="pattern-star-doodle" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M 15 5 L 18 12 L 25 13 L 20 18 L 22 25 L 15 21 L 8 25 L 10 18 L 5 13 L 12 12 Z"
          fill="none"
          stroke="#1E293B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="45" cy="40" r="3" fill="#1E293B" />
        <path d="M 40 15 L 45 25 M 48 18 L 38 22" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M 45 45 L 47 50 L 52 51 L 48 54 L 49 59 L 45 56 L 41 59 L 42 54 L 38 51 L 43 50 Z"
          fill="#1E293B"
          opacity="0.3"
        />
      </pattern>

      {/* Dripping Star Pattern */}
      <pattern id="pattern-dripping-star" width="70" height="70" patternUnits="userSpaceOnUse">
        <path
          d="M 25 10 L 28 20 L 38 20 L 30 26 L 33 36 L 25 30 L 17 36 L 20 26 L 12 20 L 22 20 Z"
          fill="#0F172A"
        />
        <path d="M 24 30 Q 25 45 25 48 A 2 2 0 0 0 27 48 Q 27 45 26 30" fill="#0F172A" />
        <path d="M 20 28 Q 21 38 21 42 A 1.5 1.5 0 0 0 23 42 Q 22 38 21 28" fill="#0F172A" />
      </pattern>

      {/* Halftone Band Pattern */}
      <pattern id="pattern-halftone-band" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="#0F172A" />
        <circle cx="20" cy="10" r="3.5" fill="#0F172A" />
        <circle cx="30" cy="10" r="5" fill="#0F172A" />
        <circle cx="10" cy="25" r="2.5" fill="#0F172A" />
        <circle cx="20" cy="25" r="4.5" fill="#0F172A" />
        <circle cx="30" cy="25" r="6" fill="#0F172A" />
      </pattern>

      {/* Zebra Print */}
      <pattern id="pattern-zebra" width="100" height="100" patternUnits="userSpaceOnUse">
        <path
          d="M 0 10 Q 30 15 50 8 T 100 12 L 100 24 Q 60 18 30 28 T 0 20 Z"
          fill="#18181B"
        />
        <path
          d="M 0 45 Q 40 40 70 52 T 100 48 L 100 60 Q 50 68 20 54 T 0 58 Z"
          fill="#18181B"
        />
        <path
          d="M 10 75 Q 40 85 80 78 L 90 90 Q 50 96 20 88 Z"
          fill="#18181B"
        />
      </pattern>

      {/* Leopard Wild */}
      <pattern id="pattern-leopard" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M 10 15 C 8 8 20 5 24 12 C 26 16 22 22 18 20 C 15 19 12 21 10 15 Z"
          fill="#78350F"
          stroke="#1C1917"
          strokeWidth="2"
        />
        <path
          d="M 40 35 C 38 30 46 25 50 30 C 53 34 49 42 43 40 Z"
          fill="#78350F"
          stroke="#1C1917"
          strokeWidth="2"
        />
        <circle cx="45" cy="15" r="3" fill="#1C1917" />
        <circle cx="20" cy="45" r="3.5" fill="#1C1917" />
      </pattern>

      {/* Lightning Pattern */}
      <pattern id="pattern-lightning" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon
          points="25,5 12,28 22,28 18,48 35,22 24,22"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="1"
        />
        <polygon
          points="50,25 40,42 47,42 44,58 58,38 50,38"
          fill="#0F172A"
          opacity="0.2"
        />
      </pattern>

      {/* Soft drop shadows */}
      <filter id="shoe-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.14" />
      </filter>
      <filter id="charm-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
      </filter>
    </defs>
  );

  // ================= CLOG: SIDE VIEW =================
  if (category === 'clog' && view === 'side') {
    return (
      <svg viewBox="0 0 600 380" className={className}>
        {renderPatternDefs()}
        {/* Ground contact shadow */}
        <ellipse cx="310" cy="326" rx="230" ry="18" fill="#CBD5E1" opacity="0.6" />

        <g filter="url(#shoe-shadow)">
          {/* Outsole / Lug bottom */}
          <path
            d="M 120 280 C 130 315 200 325 320 325 C 440 325 500 310 520 270 C 500 278 430 282 320 282 C 190 282 135 275 120 280 Z"
            fill="#334155"
          />
          {/* Outsole lugs */}
          <path d="M 170 320 L 190 320 M 230 324 L 255 324 M 310 325 L 340 325 M 390 323 L 420 323 M 460 315 L 485 310" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

          {/* Thick Midsole */}
          <path
            d="M 108 245 C 105 270 120 295 160 305 C 230 312 390 312 480 292 C 515 284 532 265 528 240 C 490 252 410 258 310 258 C 190 258 130 248 108 245 Z"
            fill="#E2E8F0"
          />
          {/* Midsole stripe detail */}
          <path d="M 125 270 Q 310 285 515 260" fill="none" stroke="#94A3B8" strokeWidth="3" opacity="0.7" />

          {/* Main Clog Vamp Body */}
          <path
            d="M 105 240 C 95 200 130 160 190 150 C 230 142 270 135 340 145 C 420 156 490 185 530 220 C 545 235 540 255 525 260 C 475 250 400 245 310 245 C 200 245 130 248 105 240 Z"
            fill={baseColorHex}
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Apply pattern if selected */}
          {patternId && (
            <path
              d="M 105 240 C 95 200 130 160 190 150 C 230 142 270 135 340 145 C 420 156 490 185 530 220 C 545 235 540 255 525 260 C 475 250 400 245 310 245 C 200 245 130 248 105 240 Z"
              fill={`url(#pattern-${patternId})`}
              opacity={patternOpacity}
            />
          )}

          {/* Footbed lip / rim */}
          <path
            d="M 140 170 C 180 158 220 155 255 160 C 240 175 200 185 155 185 Z"
            fill="#1E293B"
            opacity="0.15"
          />

          {/* Heel Pivoting Strap */}
          <path
            d="M 190 185 C 130 175 100 185 85 205 C 75 220 80 240 95 245 C 105 235 125 210 190 195 Z"
            fill={baseColorHex}
            stroke="#64748B"
            strokeWidth="2"
          />
          {/* Strap highlight */}
          <path
            d="M 185 188 C 130 180 102 192 90 208"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            opacity="0.5"
          />

          {/* Hinge Rivet with embossed FLEXI 'F' */}
          <g transform="translate(192, 192)">
            <circle cx="0" cy="0" r="14" fill="#0F172A" />
            <circle cx="0" cy="0" r="11" fill="#F06423" />
            <text
              x="0"
              y="5"
              fontSize="12"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              fill="#FFFFFF"
            >
              F
            </text>
          </g>

          {/* Ventilation Ports on lateral side */}
          {CLOG_SIDE_HOLES.map((hole) => {
            const placed = charms.find((c) => c.holeIndex === hole.index);
            const isSelected = selectedHoleIndex === hole.index;

            return (
              <g
                key={hole.index}
                className={interactive ? 'cursor-pointer group' : ''}
                onClick={() => onHoleClick && onHoleClick(hole.index)}
              >
                {/* Hole cut-out */}
                <ellipse
                  cx={hole.x}
                  cy={hole.y}
                  rx="11"
                  ry="9"
                  fill="#0F172A"
                  stroke={isSelected ? '#F06423' : '#475569'}
                  strokeWidth={isSelected ? '3' : '1.5'}
                  className="transition-all"
                />
                {/* Hole shadow depth */}
                <ellipse cx={hole.x} cy={hole.y - 1} rx="8" ry="6" fill="#000000" opacity="0.4" />

                {/* Interactive indicator ring */}
                {interactive && !placed && (
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r="15"
                    fill="none"
                    stroke="#F06423"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="opacity-0 group-hover:opacity-100 transition-opacity animate-spin"
                  />
                )}

                {/* Placed Charm */}
                {placed && (
                  <CharmSvgRenderer
                    charmId={placed.charmId}
                    size={46}
                    x={hole.x - 23}
                    y={hole.y - 23}
                    className="transition-transform hover:scale-110 filter drop-shadow-md"
                  />
                )}
              </g>
            );
          })}

          {/* Custom Embossed Text on lateral wall or strap */}
          {customText && (
            <text
              x={textPosition === 'strap' ? 120 : 360}
              y={textPosition === 'strap' ? 220 : 275}
              fill={textColor}
              fontFamily={textFont}
              fontSize="16"
              fontWeight="800"
              letterSpacing="2"
              transform={textPosition === 'strap' ? 'rotate(18 120 220)' : ''}
              className="select-none uppercase drop-shadow-sm"
            >
              {customText}
            </text>
          )}
        </g>
      </svg>
    );
  }

  // ================= CLOG: TOP (AERIAL) VIEW =================
  if (category === 'clog' && view === 'top') {
    return (
      <svg viewBox="0 0 600 400" className={className}>
        {renderPatternDefs()}
        {/* Drop shadow */}
        <ellipse cx="320" cy="210" rx="190" ry="140" fill="#CBD5E1" opacity="0.6" filter="blur(8px)" />

        <g filter="url(#shoe-shadow)">
          {/* Outer silhouette of clog top */}
          <path
            d="M 170 190 C 170 130 220 90 320 85 C 440 80 500 130 515 200 C 500 270 440 320 320 315 C 220 310 170 270 170 210 Z"
            fill={baseColorHex}
            stroke="#94A3B8"
            strokeWidth="3"
          />

          {/* Inner footbed opening */}
          <path
            d="M 190 200 C 190 160 210 140 250 140 C 275 140 285 160 285 200 C 285 240 275 260 250 260 C 210 260 190 240 190 200 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {/* Insole textured massage dots */}
          <circle cx="230" cy="180" r="2" fill="#94A3B8" />
          <circle cx="250" cy="180" r="2" fill="#94A3B8" />
          <circle cx="230" cy="200" r="2" fill="#94A3B8" />
          <circle cx="250" cy="200" r="2" fill="#94A3B8" />
          <circle cx="230" cy="220" r="2" fill="#94A3B8" />
          <circle cx="250" cy="220" r="2" fill="#94A3B8" />

          {/* Insole FLEXI Logo */}
          <text
            x="240"
            y="205"
            fontSize="10"
            fontWeight="900"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            textAnchor="middle"
            fill="#64748B"
            letterSpacing="1"
            transform="rotate(-90 240 205)"
          >
            FLEXI
          </text>

          {/* Pattern overlay */}
          {patternId && (
            <path
              d="M 170 190 C 170 130 220 90 320 85 C 440 80 500 130 515 200 C 500 270 440 320 320 315 C 220 310 170 270 170 210 Z"
              fill={`url(#pattern-${patternId})`}
              opacity={patternOpacity}
            />
          )}

          {/* Toe ridge highlight */}
          <path
            d="M 330 100 Q 450 110 490 195"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            opacity="0.4"
          />

          {/* Ventilation / Charm Ports (Top view) */}
          {CLOG_TOP_HOLES.map((hole) => {
            const placed = charms.find((c) => c.holeIndex === hole.index);
            const isSelected = selectedHoleIndex === hole.index;

            return (
              <g
                key={hole.index}
                className={interactive ? 'cursor-pointer group' : ''}
                onClick={() => onHoleClick && onHoleClick(hole.index)}
              >
                {/* Port ring */}
                <circle
                  cx={hole.x}
                  cy={hole.y}
                  r="13"
                  fill="#0F172A"
                  stroke={isSelected ? '#F06423' : '#475569'}
                  strokeWidth={isSelected ? '3' : '2'}
                  className="transition-all"
                />
                <circle cx={hole.x} cy={hole.y} r="10" fill="#000000" opacity="0.6" />

                {interactive && !placed && (
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r="18"
                    fill="none"
                    stroke="#F06423"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"
                  />
                )}

                {/* Placed Charm */}
                {placed && (
                  <CharmSvgRenderer
                    charmId={placed.charmId}
                    size={50}
                    x={hole.x - 25}
                    y={hole.y - 25}
                    className="transition-transform hover:scale-110 filter drop-shadow-md"
                  />
                )}
              </g>
            );
          })}

          {/* Custom text tag */}
          {customText && (
            <text
              x="440"
              y="205"
              fill={textColor}
              fontFamily={textFont}
              fontSize="16"
              fontWeight="900"
              letterSpacing="2"
              textAnchor="middle"
              className="select-none uppercase drop-shadow"
            >
              {customText}
            </text>
          )}
        </g>
      </svg>
    );
  }

  // ================= CLOG: SOLE (TREAD) VIEW =================
  if (category === 'clog' && view === 'sole') {
    return (
      <svg viewBox="0 0 600 380" className={className}>
        <ellipse cx="300" cy="200" rx="180" ry="110" fill="#CBD5E1" opacity="0.5" filter="blur(6px)" />
        <g>
          {/* Sole shape */}
          <path
            d="M 160 190 C 160 130 200 100 300 95 C 420 90 480 130 495 190 C 480 250 420 290 300 285 C 200 280 160 250 160 190 Z"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="3"
          />
          {/* Deep flex grooves (Tread) */}
          {[130, 160, 190, 220, 250].map((y, idx) => (
            <path
              key={idx}
              d={`M 260 ${y} Q 360 ${y + 5} 450 ${y}`}
              fill="none"
              stroke="#334155"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          {/* Heel Pod */}
          <ellipse cx="205" cy="190" rx="28" ry="36" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          <text
            x="205"
            y="195"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            fill="#94A3B8"
          >
            EVA
          </text>

          {/* Central Logo stamp */}
          <g transform="translate(350, 190)">
            <rect x="-35" y="-16" width="70" height="32" rx="16" fill="#F06423" />
            <text
              x="0"
              y="5"
              fontSize="12"
              fontWeight="900"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              textAnchor="middle"
              fill="#FFFFFF"
            >
              FLEXI
            </text>
          </g>

          <text
            x="440"
            y="195"
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            fill="#64748B"
          >
            39
          </text>
        </g>
      </svg>
    );
  }

  // ================= SLIDE / SANDAL VIEW =================
  return (
    <svg viewBox="0 0 600 380" className={className}>
      {renderPatternDefs()}
      <ellipse cx="300" cy="310" rx="210" ry="16" fill="#CBD5E1" opacity="0.6" />

      <g filter="url(#shoe-shadow)">
        {/* Outsole */}
        <path
          d="M 130 260 C 130 295 190 310 320 310 C 440 310 495 295 510 260 C 480 270 420 272 320 272 C 200 272 150 265 130 260 Z"
          fill="#334155"
        />
        {/* Thick Comfort Footbed */}
        <path
          d="M 120 230 C 115 255 130 278 180 286 C 240 292 380 292 460 280 C 495 272 515 255 510 230 C 470 240 400 245 320 245 C 200 245 140 235 120 230 Z"
          fill="#E2E8F0"
        />

        {/* Wide Slide Strap */}
        <path
          d="M 240 245 C 235 170 280 150 360 150 C 430 150 460 180 460 245 C 420 242 380 240 350 240 C 300 240 260 242 240 245 Z"
          fill={baseColorHex}
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {patternId && (
          <path
            d="M 240 245 C 235 170 280 150 360 150 C 430 150 460 180 460 245 C 420 242 380 240 350 240 C 300 240 260 242 240 245 Z"
            fill={`url(#pattern-${patternId})`}
            opacity={patternOpacity}
          />
        )}

        {/* Embossed text or logo on slide strap */}
        <text
          x="350"
          y="205"
          fill={customText ? textColor : '#64748B'}
          fontFamily={customText ? textFont : "'Plus Jakarta Sans', sans-serif"}
          fontSize={customText ? '18' : '22'}
          fontWeight="900"
          letterSpacing="2"
          textAnchor="middle"
          className="uppercase select-none"
        >
          {customText || (category === 'sandal' ? 'FLEXI ACTIVE' : 'FLEXI')}
        </text>

        {/* If category is sandal, add ankle strap */}
        {category === 'sandal' && (
          <path
            d="M 160 240 C 150 170 190 140 240 145 C 255 147 250 165 235 165 C 195 165 175 190 180 240 Z"
            fill="#334155"
            stroke="#1E293B"
            strokeWidth="2"
          />
        )}
      </g>
    </svg>
  );
};
