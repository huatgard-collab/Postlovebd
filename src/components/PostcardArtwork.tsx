import React from 'react';

interface PostcardArtworkProps {
  imageKey: string;
  mood?: string;
  className?: string;
}

export const PostcardArtwork: React.FC<PostcardArtworkProps> = ({
  imageKey,
  className = '',
}) => {
  // Return tailored vintage illustrations with authentic antique engraving/sepia tones
  switch (imageKey) {
    case 'rainy-love':
    case 'umbrella-rain':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241a15] ${className}`}>
          {/* Sepia tone rainy street scene */}
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c221a" />
                <stop offset="60%" stopColor="#3d2c20" />
                <stop offset="100%" stopColor="#1e1510" />
              </linearGradient>
              <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e8ba62" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#e8ba62" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#e8ba62" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#rainSky)" />
            {/* Street lamp light glow */}
            <circle cx="110" cy="110" r="70" fill="url(#lampGlow)" />
            <circle cx="310" cy="130" r="50" fill="url(#lampGlow)" />
            {/* Rain lines */}
            <g stroke="#dcc5a2" strokeWidth="0.8" opacity="0.35">
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={i}
                  x1={(i * 15) % 400}
                  y1={(i * 23) % 200}
                  x2={((i * 15) % 400) - 12}
                  y2={((i * 23) % 200) + 40}
                />
              ))}
            </g>
            {/* Victorian Lamp Post */}
            <path d="M108,280 L112,280 L111,120 L118,110 L102,110 L109,120 Z" fill="#130c07" />
            <polygon points="103,110 117,110 115,90 105,90" fill="#fbe49d" opacity="0.9" />
            <polygon points="100,90 120,90 110,75" fill="#130c07" />
            {/* Couple under Umbrella silhouette */}
            <path
              d="M190,195 Q230,165 270,195 Q230,185 190,195 Z"
              fill="#18110b"
            />
            <path d="M230,180 L230,225" stroke="#18110b" strokeWidth="2" />
            {/* Figures */}
            <circle cx="218" cy="208" r="6" fill="#18110b" />
            <circle cx="236" cy="206" r="6.5" fill="#18110b" />
            <path d="M212,216 Q220,240 216,280 L242,280 Q240,240 244,216 Z" fill="#18110b" />
            {/* Cobblestone reflections */}
            <ellipse cx="230" cy="282" rx="45" ry="4" fill="#e8ba62" opacity="0.25" />
            <ellipse cx="110" cy="282" rx="35" ry="3" fill="#e8ba62" opacity="0.3" />
          </svg>
        </div>
      );

    case 'old-letter':
    case 'quill-paper':
    case 'vintage-postmark':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#2b1e16] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="parchmentGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3d2a1c" />
                <stop offset="100%" stopColor="#22150d" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#parchmentGrad)" />
            {/* Envelope shape */}
            <path d="M60,90 L340,90 L200,190 Z" fill="#4d3523" opacity="0.6" stroke="#c59b27" strokeWidth="0.75" />
            <path d="M60,90 L60,230 L340,230 L340,90 L200,190 Z" fill="#3a2719" opacity="0.8" stroke="#c59b27" strokeWidth="0.75" />
            <path d="M60,230 L160,150" stroke="#c59b27" strokeWidth="0.5" opacity="0.4" />
            <path d="M340,230 L240,150" stroke="#c59b27" strokeWidth="0.5" opacity="0.4" />
            {/* Wax Seal */}
            <circle cx="200" cy="188" r="19" fill="#7a1c24" />
            <circle cx="200" cy="188" r="15" fill="#8e242d" stroke="#541217" strokeWidth="1" />
            <path d="M195,188 Q200,181 205,188 Q200,195 195,188 Z" fill="#d4af37" opacity="0.85" />
            {/* Antique Postmark */}
            <circle cx="300" cy="130" r="28" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />
            <text x="300" y="125" fill="#d4af37" fontSize="8" fontFamily="serif" textAnchor="middle" opacity="0.75">DHAKA G.P.O.</text>
            <text x="300" y="138" fill="#d4af37" fontSize="9" fontFamily="serif" fontWeight="bold" textAnchor="middle" opacity="0.8">1968</text>
            {/* Airmail Stripes on corner */}
            <line x1="60" y1="90" x2="90" y2="90" stroke="#7a1c24" strokeWidth="3" />
            <line x1="95" y1="90" x2="125" y2="90" stroke="#253858" strokeWidth="3" />
            <line x1="130" y1="90" x2="160" y2="90" stroke="#7a1c24" strokeWidth="3" />
            {/* Quill pen */}
            <path d="M320,60 Q340,110 370,170 Q350,140 330,100 Z" fill="#d8c19d" opacity="0.75" />
            <line x1="330" y1="100" x2="280" y2="210" stroke="#927349" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'rose-love':
    case 'gallery-antique-rose':
    case 'vintage-books-rose':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241317] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="roseBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e141a" />
                <stop offset="100%" stopColor="#15090b" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#roseBg)" />
            {/* Botanical frame elements */}
            <circle cx="200" cy="150" r="95" fill="none" stroke="#c59b27" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
            <circle cx="200" cy="150" r="105" fill="none" stroke="#c59b27" strokeWidth="0.5" opacity="0.25" />
            {/* Rose center & petals */}
            <g transform="translate(200, 140)">
              {/* Leaves */}
              <path d="M0,40 Q-45,60 -60,40 Q-40,20 0,25" fill="#32452b" opacity="0.8" />
              <path d="M0,40 Q45,60 60,40 Q40,20 0,25" fill="#32452b" opacity="0.8" />
              <line x1="0" y1="35" x2="0" y2="110" stroke="#32452b" strokeWidth="2.5" />
              {/* Petal layers */}
              <path d="M-40,0 Q-30,-50 0,-45 Q30,-50 40,0 Q0,45 -40,0 Z" fill="#6d1720" />
              <path d="M-30,-5 Q-20,-40 0,-35 Q20,-40 30,-5 Q0,35 -30,-5 Z" fill="#881f2b" />
              <path d="M-20,-2 Q-10,-28 0,-25 Q10,-28 20,-2 Q0,25 -20,-2 Z" fill="#a72837" />
              <circle cx="0" cy="-6" r="10" fill="#c33647" />
              <circle cx="0" cy="-6" r="5" fill="#e25d6e" />
            </g>
          </svg>
        </div>
      );

    case 'moonlight-night':
    case 'gallery-midnight-moon':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#111923] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c1219" />
                <stop offset="60%" stopColor="#192534" />
                <stop offset="100%" stopColor="#0b1016" />
              </linearGradient>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#f5deb3" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f5deb3" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#nightGrad)" />
            {/* Stars */}
            <circle cx="60" cy="50" r="1" fill="#fff" opacity="0.8" />
            <circle cx="140" cy="30" r="1.5" fill="#fdf0cd" opacity="0.9" />
            <circle cx="280" cy="45" r="1" fill="#fff" opacity="0.7" />
            <circle cx="340" cy="70" r="1.2" fill="#fff" opacity="0.8" />
            <circle cx="80" cy="110" r="0.8" fill="#fff" opacity="0.6" />
            {/* Glowing Vintage Moon */}
            <circle cx="200" cy="85" r="50" fill="url(#moonGlow)" />
            <circle cx="200" cy="85" r="28" fill="#fef5dd" stroke="#e0caa0" strokeWidth="1" />
            {/* River water */}
            <path d="M0,200 Q100,195 200,200 T400,200 L400,300 L0,300 Z" fill="#0d1824" />
            {/* Moon reflection */}
            <g opacity="0.4">
              <ellipse cx="200" cy="215" rx="30" ry="2" fill="#fdf0cd" />
              <ellipse cx="200" cy="230" rx="45" ry="2.5" fill="#fdf0cd" />
              <ellipse cx="200" cy="245" rx="35" ry="2" fill="#fdf0cd" />
              <ellipse cx="200" cy="260" rx="20" ry="1.5" fill="#fdf0cd" />
            </g>
            {/* Silhouette shoreline & pine/palm trees */}
            <path d="M0,195 Q90,185 140,200 L0,230 Z" fill="#080c10" />
            <path d="M260,200 Q330,185 400,195 L400,230 Z" fill="#080c10" />
          </svg>
        </div>
      );

    case 'river-sunset':
    case 'sea-sunset':
    case 'sunset-boat':
    case 'gallery-sunset-silhouette':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#2d1b15] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a1c17" />
                <stop offset="45%" stopColor="#7a341d" />
                <stop offset="70%" stopColor="#c57430" />
                <stop offset="100%" stopColor="#2c1611" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#sunsetGrad)" />
            {/* Golden Sun setting */}
            <circle cx="200" cy="165" r="35" fill="#fce5a2" opacity="0.9" />
            {/* Horizon water */}
            <rect x="0" y="180" width="400" height="120" fill="#24130e" opacity="0.9" />
            <ellipse cx="200" cy="190" rx="55" ry="3" fill="#fce5a2" opacity="0.5" />
            <ellipse cx="200" cy="205" rx="40" ry="2" fill="#fce5a2" opacity="0.4" />
            <ellipse cx="200" cy="220" rx="30" ry="2" fill="#fce5a2" opacity="0.3" />
            {/* Traditional Bengali Boat Silhouette (নৌকা) */}
            <g transform="translate(180, 160)">
              <path d="M-40,28 Q0,38 40,28 Q20,38 -20,38 Z" fill="#130805" />
              <path d="M-15,26 L-15,16 Q0,12 15,16 L15,26 Z" fill="#130805" />
              <line x1="30" y1="12" x2="35" y2="35" stroke="#130805" strokeWidth="2" />
              <circle cx="28" cy="18" r="4" fill="#130805" />
            </g>
          </svg>
        </div>
      );

    case 'vintage-cafe':
    case 'gramophone-melody':
    case 'gallery-old-coffee':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241710] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e7be69" />
                <stop offset="50%" stopColor="#9b7324" />
                <stop offset="100%" stopColor="#624410" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="#1c120c" />
            {/* Antique Coffee Cup or Gramophone horn */}
            <circle cx="200" cy="150" r="85" fill="none" stroke="#c59b27" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
            {/* Gramophone horn */}
            <path d="M140,110 Q240,60 270,110 Q250,170 170,140 Z" fill="url(#brassGrad)" opacity="0.85" />
            <path d="M145,130 L130,170 L150,170 Z" fill="#624410" />
            {/* Wooden Base Box */}
            <rect x="110" y="170" width="80" height="35" rx="3" fill="#382113" stroke="#c59b27" strokeWidth="0.75" />
            <circle cx="150" cy="187" r="8" fill="#c59b27" opacity="0.8" />
            {/* Steam/Musical swirls */}
            <path d="M260,80 Q280,60 275,40" stroke="#d8bc88" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M280,95 Q305,75 300,55" stroke="#d8bc88" strokeWidth="1.2" fill="none" opacity="0.4" />
          </svg>
        </div>
      );

    case 'railway-vintage':
    case 'couple-lantern':
    case 'hariken-lamp':
    default:
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241a14] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-85" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="warmVintageGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#352318" />
                <stop offset="100%" stopColor="#180f0a" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#warmVintageGrad)" />
            {/* Ornate Vintage Filigree corner borders */}
            <g stroke="#c59b27" strokeWidth="1" fill="none" opacity="0.6">
              <path d="M30,50 Q50,50 50,30" />
              <path d="M25,60 Q60,60 60,25" />
              <path d="M370,50 Q350,50 350,30" />
              <path d="M375,60 Q340,60 340,25" />
              <path d="M30,250 Q50,250 50,270" />
              <path d="M25,240 Q60,240 60,275" />
              <path d="M370,250 Q350,250 350,270" />
              <path d="M375,240 Q340,240 340,275" />
            </g>
            {/* Central Antique medallion */}
            <circle cx="200" cy="150" r="75" fill="#2d1c13" stroke="#c59b27" strokeWidth="1" opacity="0.75" />
            <circle cx="200" cy="150" r="68" fill="none" stroke="#c59b27" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
            {/* Vintage Post Icon */}
            <path d="M175,135 L225,135 L200,155 Z" fill="#7a1c24" opacity="0.8" />
            <path d="M175,135 L175,165 L225,165 L225,135 Z" fill="none" stroke="#c59b27" strokeWidth="1" />
            <text x="200" y="180" fill="#dfbe7e" fontSize="10" fontFamily="serif" textAnchor="middle" letterSpacing="2">POSTLOVEBD</text>
            <text x="200" y="195" fill="#a48149" fontSize="8" fontFamily="serif" textAnchor="middle">ARCHIVE 1952</text>
          </svg>
        </div>
      );
  }
};
