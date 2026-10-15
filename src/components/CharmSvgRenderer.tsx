import React from 'react';

interface CharmSvgProps {
  charmId: string;
  size?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const CharmSvgRenderer: React.FC<CharmSvgProps> = ({
  charmId,
  size = 36,
  x,
  y,
  className = '',
}) => {
  const renderCharmBody = () => {
    switch (charmId) {
      case 'flower':
        return (
          <>
            <defs>
              <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
              </filter>
              <linearGradient id="petal-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
              <radialGradient id="center-grad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
              </radialGradient>
            </defs>
            <g filter="url(#f-shadow)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="50"
                  cy="24"
                  rx="11"
                  ry="18"
                  fill="url(#petal-grad)"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="16" fill="url(#center-grad)" stroke="#CA8A04" strokeWidth="2" />
              <circle cx="45" cy="45" r="3" fill="#FEF08A" opacity="0.8" />
            </g>
          </>
        );

      case 'smiley':
        return (
          <>
            <defs>
              <radialGradient id="smile-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#smile-grad)" stroke="#B45309" strokeWidth="2.5" />
            <ellipse cx="36" cy="40" rx="5" ry="7" fill="#1C1917" />
            <ellipse cx="64" cy="40" rx="5" ry="7" fill="#1C1917" />
            <circle cx="34" cy="38" r="1.8" fill="#FFFFFF" />
            <circle cx="62" cy="38" r="1.8" fill="#FFFFFF" />
            <ellipse cx="28" cy="52" rx="5" ry="3" fill="#F87171" opacity="0.5" />
            <ellipse cx="72" cy="52" rx="5" ry="3" fill="#F87171" opacity="0.5" />
            <path
              d="M 33 55 Q 50 75 67 55"
              fill="none"
              stroke="#1C1917"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        );

      case 'bear':
        return (
          <>
            <defs>
              <radialGradient id="bear-grad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </radialGradient>
            </defs>
            <circle cx="28" cy="30" r="14" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <circle cx="28" cy="30" r="8" fill="#FDE68A" />
            <circle cx="72" cy="30" r="14" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <circle cx="72" cy="30" r="8" fill="#FDE68A" />
            <circle cx="50" cy="54" r="34" fill="url(#bear-grad)" stroke="#92400E" strokeWidth="2" />
            <ellipse cx="50" cy="62" rx="14" ry="11" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
            <path d="M 46 58 L 54 58 L 50 63 Z" fill="#78350F" />
            <path d="M 50 63 L 50 67" stroke="#78350F" strokeWidth="2" />
            <circle cx="38" cy="48" r="4" fill="#1E293B" />
            <circle cx="62" cy="48" r="4" fill="#1E293B" />
            <circle cx="36" cy="46" r="1.5" fill="#FFFFFF" />
            <circle cx="60" cy="46" r="1.5" fill="#FFFFFF" />
          </>
        );

      case 'heart':
        return (
          <>
            <defs>
              <radialGradient id="heart-grad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="60%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#9F1239" />
              </radialGradient>
            </defs>
            <path
              d="M 50 85 C 20 62 10 40 18 24 C 26 10 42 12 50 26 C 58 12 74 10 82 24 C 90 40 80 62 50 85 Z"
              fill="url(#heart-grad)"
              stroke="#881337"
              strokeWidth="2"
            />
            <ellipse cx="32" cy="28" rx="7" ry="4" fill="#FFE4E6" opacity="0.6" transform="rotate(-30 32 28)" />
          </>
        );

      case 'star':
        return (
          <>
            <defs>
              <radialGradient id="star-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="70%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </radialGradient>
            </defs>
            <polygon
              points="50,10 62,38 92,39 67,58 76,88 50,70 24,88 33,58 8,39 38,38"
              fill="url(#star-grad)"
              stroke="#A16207"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </>
        );

      case 'rainbow':
        return (
          <g transform="translate(0, 10)">
            <path d="M 12 65 A 38 38 0 0 1 88 65" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
            <path d="M 20 65 A 30 30 0 0 1 80 65" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
            <path d="M 28 65 A 22 22 0 0 1 72 65" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
            <path d="M 36 65 A 14 14 0 0 1 64 65" fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="20" cy="65" rx="14" ry="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="80" cy="65" rx="14" ry="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          </g>
        );

      case 'lightning':
        return (
          <>
            <defs>
              <linearGradient id="bolt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <polygon
              points="56,8 24,52 48,52 40,92 78,44 54,44"
              fill="url(#bolt-grad)"
              stroke="#B45309"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </>
        );

      case 'eightball':
        return (
          <>
            <defs>
              <radialGradient id="eight-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#090D16" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#eight-grad)" stroke="#0F172A" strokeWidth="2" />
            <circle cx="50" cy="46" r="18" fill="#FFFFFF" />
            <text
              x="50"
              y="53"
              fontSize="20"
              fontWeight="900"
              fontFamily="Arial, sans-serif"
              textAnchor="middle"
              fill="#090D16"
            >
              8
            </text>
            <ellipse cx="36" cy="26" rx="10" ry="5" fill="#FFFFFF" opacity="0.3" transform="rotate(-30 36 26)" />
          </>
        );

      case 'butterfly':
        return (
          <>
            <defs>
              <linearGradient id="wing-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>
            <path d="M 50 48 Q 20 10 12 36 Q 16 56 50 52 Z" fill="url(#wing-grad)" stroke="#581C87" strokeWidth="1.5" />
            <path d="M 50 48 Q 80 10 88 36 Q 84 56 50 52 Z" fill="url(#wing-grad)" stroke="#581C87" strokeWidth="1.5" />
            <path d="M 50 52 Q 22 55 20 74 Q 38 88 50 62 Z" fill="#A855F7" stroke="#581C87" strokeWidth="1.5" />
            <path d="M 50 52 Q 78 55 80 74 Q 62 88 50 62 Z" fill="#A855F7" stroke="#581C87" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="3.5" ry="20" fill="#1E1B4B" />
            <path d="M 49 32 Q 42 22 38 24" fill="none" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
            <path d="M 51 32 Q 58 22 62 24" fill="none" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
          </>
        );

      case 'cherry':
        return (
          <>
            <defs>
              <radialGradient id="cherry-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
            </defs>
            <path d="M 50 18 Q 38 34 35 60" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50 18 Q 58 36 65 62" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50 18 Q 68 14 74 24 Q 64 30 50 18 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <circle cx="34" cy="65" r="18" fill="url(#cherry-grad)" stroke="#991B1B" strokeWidth="2" />
            <circle cx="28" cy="59" r="3" fill="#FECACA" opacity="0.8" />
            <circle cx="66" cy="67" r="18" fill="url(#cherry-grad)" stroke="#991B1B" strokeWidth="2" />
            <circle cx="60" cy="61" r="3" fill="#FECACA" opacity="0.8" />
          </>
        );

      case 'paw':
        return (
          <>
            <defs>
              <radialGradient id="paw-grad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#F43F5E" />
              </radialGradient>
            </defs>
            <ellipse cx="28" cy="34" rx="7" ry="11" fill="url(#paw-grad)" stroke="#BE123C" strokeWidth="2" />
            <ellipse cx="44" cy="24" rx="7" ry="11" fill="url(#paw-grad)" stroke="#BE123C" strokeWidth="2" />
            <ellipse cx="58" cy="24" rx="7" ry="11" fill="url(#paw-grad)" stroke="#BE123C" strokeWidth="2" />
            <ellipse cx="74" cy="34" rx="7" ry="11" fill="url(#paw-grad)" stroke="#BE123C" strokeWidth="2" />
            <path
              d="M 32 64 C 24 50 40 44 50 48 C 60 44 76 50 68 64 C 62 76 38 76 32 64 Z"
              fill="url(#paw-grad)"
              stroke="#BE123C"
              strokeWidth="2.5"
            />
          </>
        );

      case 'dino':
        return (
          <>
            <polygon points="36,26 42,16 46,27" fill="#F59E0B" />
            <polygon points="48,24 54,14 58,26" fill="#F59E0B" />
            <polygon points="60,26 66,18 70,30" fill="#F59E0B" />
            <path
              d="M 30 75 L 30 84 L 38 84 L 38 78 L 54 78 L 54 84 L 62 84 L 62 72 Q 80 72 82 56 Q 84 40 70 30 Q 56 22 42 34 Q 30 46 28 64 Z"
              fill="#10B981"
              stroke="#047857"
              strokeWidth="2.5"
            />
            <ellipse cx="44" cy="62" rx="10" ry="12" fill="#A7F3D0" />
            <circle cx="64" cy="38" r="4" fill="#064E3B" />
            <circle cx="63" cy="36" r="1.5" fill="#FFFFFF" />
            <path d="M 68 46 Q 74 48 72 52" fill="none" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" />
          </>
        );

      case 'bow':
        return (
          <>
            <defs>
              <linearGradient id="bow-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
            </defs>
            <path d="M 50 50 C 35 25 10 30 18 50 C 10 70 35 75 50 50 Z" fill="url(#bow-grad)" stroke="#9F1239" strokeWidth="2" />
            <path d="M 50 50 C 65 25 90 30 82 50 C 90 70 65 75 50 50 Z" fill="url(#bow-grad)" stroke="#9F1239" strokeWidth="2" />
            <path d="M 44 54 Q 32 75 24 85" fill="none" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" />
            <path d="M 56 54 Q 68 75 76 85" fill="none" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="50" cy="50" rx="9" ry="8" fill="#F43F5E" stroke="#881337" strokeWidth="2" />
          </>
        );

      case 'goodvibes':
        return (
          <>
            <defs>
              <linearGradient id="vibes-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <rect x="10" y="24" width="80" height="52" rx="26" fill="url(#vibes-grad)" stroke="#0369A1" strokeWidth="3" />
            <text
              x="50"
              y="45"
              fontSize="12"
              fontWeight="900"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              textAnchor="middle"
              fill="#FFFFFF"
              letterSpacing="1"
            >
              GOOD
            </text>
            <text
              x="50"
              y="62"
              fontSize="13"
              fontWeight="900"
              fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
              textAnchor="middle"
              fill="#FDE047"
              letterSpacing="2"
            >
              VIBES
            </text>
          </>
        );

      case 'avocado':
        return (
          <>
            <path
              d="M 50 16 C 36 16 30 32 26 52 C 22 72 34 86 50 86 C 66 86 78 72 74 52 C 70 32 64 16 50 16 Z"
              fill="#365314"
              stroke="#1A2E05"
              strokeWidth="2.5"
            />
            <path
              d="M 50 22 C 39 22 34 35 31 52 C 28 68 38 80 50 80 C 62 80 72 68 69 52 C 66 35 61 22 50 22 Z"
              fill="#BEF264"
            />
            <circle cx="50" cy="60" r="14" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <ellipse cx="46" cy="56" rx="4" ry="2" fill="#A16207" opacity="0.6" />
          </>
        );

      case 'planet':
        return (
          <>
            <defs>
              <linearGradient id="saturn-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A5B4FC" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <ellipse
              cx="50"
              cy="50"
              rx="44"
              ry="14"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="6"
              strokeOpacity="0.8"
              transform="rotate(-25 50 50)"
            />
            <circle cx="50" cy="50" r="26" fill="url(#saturn-grad)" stroke="#4338CA" strokeWidth="2" />
            <path d="M 28 46 Q 50 54 72 46" fill="none" stroke="#4F46E5" strokeWidth="3" opacity="0.7" />
            <path d="M 32 54 Q 50 62 68 54" fill="none" stroke="#818CF8" strokeWidth="2.5" opacity="0.8" />
            <path
              d="M 12 56 A 44 14 0 0 0 88 44"
              fill="none"
              stroke="#FDE047"
              strokeWidth="5"
              transform="rotate(-25 50 50)"
            />
          </>
        );

      default:
        return (
          <circle cx="50" cy="50" r="40" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
        );
    }
  };

  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      {renderCharmBody()}
    </svg>
  );
};
