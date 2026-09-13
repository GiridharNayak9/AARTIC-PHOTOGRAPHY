import React from 'react';

interface AarticLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  interactive?: boolean;
}

export const AarticLogo: React.FC<AarticLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  interactive = false,
}) => {
  const sizeMap = {
    sm: { h: 'h-10', w: 'w-auto', viewBox: '0 0 800 800' },
    md: { h: 'h-14', w: 'w-auto', viewBox: '0 0 800 800' },
    lg: { h: 'h-24', w: 'w-auto', viewBox: '0 0 800 800' },
    hero: { h: 'h-48 md:h-64', w: 'w-auto', viewBox: '0 0 800 800' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id="aartic-brand-logo"
      className={`relative inline-flex flex-col items-center select-none group ${className}`}
    >
      <svg
        className={`${currentSize.h} ${currentSize.w} transition-transform duration-500 ${
          interactive ? 'group-hover:scale-105 group-hover:rotate-[0.5deg]' : ''
        }`}
        viewBox={currentSize.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Rich 24k Gold Gradients */}
          <linearGradient id="aarticGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B8" />
            <stop offset="25%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#C29329" />
            <stop offset="75%" stopColor="#F3DC87" />
            <stop offset="100%" stopColor="#966718" />
          </linearGradient>

          <linearGradient id="aarticGoldHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9C741F" />
            <stop offset="35%" stopColor="#FCE79D" />
            <stop offset="70%" stopColor="#DFB84E" />
            <stop offset="100%" stopColor="#FFF9E0" />
          </linearGradient>

          <linearGradient id="aarticGoldDeep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A661C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#553D0C" />
          </linearGradient>

          <radialGradient id="aarticApertureDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#050505" />
            <stop offset="75%" stopColor="#15120B" />
            <stop offset="100%" stopColor="#2E2412" />
          </radialGradient>

          {/* Drop Shadow for Gold Relief */}
          <filter id="aarticGleamFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#FFE899" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#aarticGleamFilter)">
          {/* Top viewfinder & dial bump */}
          <path d="M 285 344 L 325 344 L 333 355 L 277 355 Z" fill="url(#aarticGoldHighlight)" />
          <rect x="290" y="338" width="30" height="6" rx="2" fill="url(#aarticGoldPrimary)" />

          {/* Camera body outer frame */}
          <rect
            x="235"
            y="355"
            width="330"
            height="200"
            rx="22"
            ry="22"
            fill="none"
            stroke="url(#aarticGoldPrimary)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Monogram A Left Leg with Serif */}
          <polygon
            points="380,215 412,215 284,580 248,580 248,568 284,568 375,225"
            fill="url(#aarticGoldHighlight)"
          />

          {/* Monogram A Right Leg with Serif */}
          <polygon
            points="398,215 428,215 542,568 574,568 574,580 500,580 405,225"
            fill="url(#aarticGoldPrimary)"
          />

          {/* Monogram A Top Apex Cap */}
          <polygon points="376,215 404,162 432,215" fill="url(#aarticGoldHighlight)" />

          {/* Center Circular Shutter Housing */}
          <circle
            cx="400"
            cy="485"
            r="64"
            fill="url(#aarticApertureDark)"
            stroke="url(#aarticGoldPrimary)"
            strokeWidth="5"
          />

          {/* 8 Aperture Iris Blades */}
          <g transform="translate(400, 485)">
            <path d="M 0 -60 A 60 60 0 0 1 42 -42 L 18 -10 Z" fill="url(#aarticGoldPrimary)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M 42 -42 A 60 60 0 0 1 60 0 L 10 18 Z" fill="url(#aarticGoldHighlight)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M 60 0 A 60 60 0 0 1 42 42 L -10 18 Z" fill="url(#aarticGoldPrimary)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M 42 42 A 60 60 0 0 1 0 60 L -18 10 Z" fill="url(#aarticGoldHighlight)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M 0 60 A 60 60 0 0 1 -42 42 L -18 -10 Z" fill="url(#aarticGoldPrimary)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M -42 42 A 60 60 0 0 1 -60 0 L -10 -18 Z" fill="url(#aarticGoldHighlight)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M -60 0 A 60 60 0 0 1 -42 -42 L 10 -18 Z" fill="url(#aarticGoldPrimary)" stroke="#1a150c" strokeWidth="1.2" />
            <path d="M -42 -42 A 60 60 0 0 1 0 -60 L 18 -10 Z" fill="url(#aarticGoldHighlight)" stroke="#1a150c" strokeWidth="1.2" />
            {/* Deep Camera Pupil Core */}
            <circle cx="0" cy="0" r="16" fill="#040404" stroke="url(#aarticGoldPrimary)" strokeWidth="2.5" />
          </g>

          {/* Sweeping Iris Swoosh Blade over the Letter A */}
          <path
            d="M 312 448 C 348 402, 460 392, 522 452 C 572 502, 628 534, 660 526 C 624 544, 556 522, 506 468 C 444 402, 358 412, 312 448 Z"
            fill="url(#aarticGoldHighlight)"
          />

          {/* AARTIC Wordmark Typography */}
          <text
            x="400"
            y="660"
            textAnchor="middle"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="64"
            fontWeight="700"
            letterSpacing="24"
            fill="url(#aarticGoldHighlight)"
          >
            AARTIC
          </text>

          {showSubtitle && (
            <>
              {/* Left Accent Rule */}
              <line
                x1="170"
                y1="710"
                x2="270"
                y2="710"
                stroke="url(#aarticGoldPrimary)"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              {/* Subtitle Text */}
              <text
                x="400"
                y="716"
                textAnchor="middle"
                fontFamily="'Cinzel', sans-serif"
                fontSize="20"
                fontWeight="600"
                letterSpacing="12"
                fill="url(#aarticGoldPrimary)"
              >
                PHOTOGRAPHY
              </text>
              {/* Right Accent Rule */}
              <line
                x1="530"
                y1="710"
                x2="630"
                y2="710"
                stroke="url(#aarticGoldPrimary)"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
