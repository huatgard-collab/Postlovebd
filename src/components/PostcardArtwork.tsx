import React, { useState } from 'react';

interface PostcardArtworkProps {
  imageKey: string;
  mood?: string;
  className?: string;
}

export const PostcardArtwork: React.FC<PostcardArtworkProps> = ({
  imageKey,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  // Check if imageKey is a direct URL or local asset path
  const isDirectImage =
    imageKey &&
    !imgError &&
    (imageKey.startsWith('http://') ||
      imageKey.startsWith('https://') ||
      imageKey.startsWith('data:') ||
      imageKey.startsWith('blob:') ||
      imageKey.startsWith('/') ||
      imageKey.startsWith('./') ||
      /\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i.test(imageKey));

  if (isDirectImage) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#241a14] ${className}`}>
        <img
          src={imageKey}
          alt="Postcard Artwork"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover select-none"
          loading="lazy"
        />
        {/* Subtle vintage overlay on images */}
        <div className="absolute inset-0 bg-[#2b180d]/15 mix-blend-multiply pointer-events-none" />
      </div>
    );
  }

  // Authentic Vintage Illustrations for each template key
  switch (imageKey) {
    case 'rainy-love':
    case 'umbrella-rain':
    case 'gallery-rain-serenade':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241a15] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c221a" />
                <stop offset="60%" stopColor="#3d2c20" />
                <stop offset="100%" stopColor="#1e1510" />
              </linearGradient>
              <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e8ba62" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#e8ba62" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#e8ba62" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="url(#rainSky)" />
            <circle cx="110" cy="110" r="70" fill="url(#lampGlow)" />
            <circle cx="310" cy="130" r="50" fill="url(#lampGlow)" />
            {/* Rain lines */}
            <g stroke="#dcc5a2" strokeWidth="0.8" opacity="0.4">
              {Array.from({ length: 32 }).map((_, i) => (
                <line
                  key={i}
                  x1={(i * 15) % 400}
                  y1={(i * 23) % 200}
                  x2={((i * 15) % 400) - 12}
                  y2={((i * 23) % 200) + 40}
                />
              ))}
            </g>
            {/* Lamp Post */}
            <path d="M108,280 L112,280 L111,120 L118,110 L102,110 L109,120 Z" fill="#130c07" />
            <polygon points="103,110 117,110 115,90 105,90" fill="#fbe49d" opacity="0.9" />
            <polygon points="100,90 120,90 110,75" fill="#130c07" />
            {/* Couple under Umbrella */}
            <path d="M190,195 Q230,165 270,195 Q230,185 190,195 Z" fill="#18110b" />
            <path d="M230,180 L230,225" stroke="#18110b" strokeWidth="2" />
            <circle cx="218" cy="208" r="6" fill="#18110b" />
            <circle cx="236" cy="206" r="6.5" fill="#18110b" />
            <path d="M212,216 Q220,240 216,280 L242,280 Q240,240 244,216 Z" fill="#18110b" />
            <ellipse cx="230" cy="282" rx="45" ry="4" fill="#e8ba62" opacity="0.3" />
            <ellipse cx="110" cy="282" rx="35" ry="3" fill="#e8ba62" opacity="0.35" />
          </svg>
        </div>
      );

    case 'window-rain':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#1f1915] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="winRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e242b" />
                <stop offset="100%" stopColor="#12161a" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#winRain)" />
            {/* Distant street lights blur */}
            <circle cx="90" cy="110" r="18" fill="#e8ba62" opacity="0.3" filter="blur(4px)" />
            <circle cx="220" cy="140" r="24" fill="#d97736" opacity="0.25" filter="blur(5px)" />
            <circle cx="330" cy="90" r="14" fill="#e8ba62" opacity="0.2" filter="blur(3px)" />
            {/* Wooden Window Panes */}
            <rect x="20" y="20" width="360" height="260" fill="none" stroke="#362217" strokeWidth="12" rx="2" />
            <line x1="200" y1="20" x2="200" y2="280" stroke="#362217" strokeWidth="8" />
            <line x1="20" y1="150" x2="380" y2="150" stroke="#362217" strokeWidth="8" />
            {/* Rain droplets trickling on glass */}
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={i}
                d={`M${40 + ((i * 37) % 320)},${40 + ((i * 29) % 190)} Q${42 + ((i * 37) % 320)},${55 + ((i * 29) % 190)} ${40 + ((i * 37) % 320)},${70 + ((i * 29) % 190)}`}
                stroke="#cdd8e3"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.5"
                fill="none"
              />
            ))}
            {/* Steaming Tea Cup on Window sill */}
            <rect x="20" y="260" width="360" height="20" fill="#2d1c13" />
            <path d="M280,260 L285,230 L315,230 L320,260 Z" fill="#e8d8c3" opacity="0.9" />
            <path d="M315,236 Q326,244 316,252" stroke="#e8d8c3" strokeWidth="2" fill="none" />
            <path d="M295,225 Q290,215 295,205" stroke="#e8d8c3" strokeWidth="1.2" opacity="0.6" fill="none" />
            <path d="M305,225 Q310,215 305,205" stroke="#e8d8c3" strokeWidth="1.2" opacity="0.6" fill="none" />
          </svg>
        </div>
      );

    case 'lotus-rain':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#17241d] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lotusPond" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2f26" />
                <stop offset="100%" stopColor="#0d1b15" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#lotusPond)" />
            {/* Rain water ripple rings */}
            <ellipse cx="120" cy="180" rx="40" ry="10" fill="none" stroke="#8cb89f" strokeWidth="0.8" opacity="0.5" />
            <ellipse cx="120" cy="180" rx="70" ry="18" fill="none" stroke="#8cb89f" strokeWidth="0.5" opacity="0.3" />
            <ellipse cx="290" cy="220" rx="50" ry="12" fill="none" stroke="#8cb89f" strokeWidth="0.8" opacity="0.5" />
            {/* Large Lotus Leaf (পদ্মপাতা) */}
            <ellipse cx="200" cy="200" rx="110" ry="45" fill="#2d523f" stroke="#1d382a" strokeWidth="2" />
            <path d="M200,200 L270,185" stroke="#416e57" strokeWidth="1.5" />
            <path d="M200,200 L130,190" stroke="#416e57" strokeWidth="1.5" />
            <path d="M200,200 L210,240" stroke="#416e57" strokeWidth="1.5" />
            <circle cx="210" cy="195" r="4" fill="#a4d4bc" opacity="0.8" />
            {/* Blooming Pink Lotus (পদ্মফুল) */}
            <g transform="translate(190, 130)">
              <path d="M0,40 Q-35,10 -15,-20 Q0,20 0,40 Z" fill="#b94364" />
              <path d="M0,40 Q35,10 15,-20 Q0,20 0,40 Z" fill="#b94364" />
              <path d="M0,40 Q-20,0 0,-30 Q20,0 0,40 Z" fill="#de6b8c" />
              <path d="M0,40 Q-10,-5 0,-25 Q10,-5 0,40 Z" fill="#f49cb4" />
              <circle cx="0" cy="5" r="4" fill="#fbd15b" />
            </g>
          </svg>
        </div>
      );

    case 'old-letter':
    case 'quill-paper':
    case 'vintage-postmark':
    case 'gallery-letters-1952':
    case 'gallery-unsent-postcard':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#2b1e16] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
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
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="roseBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e141a" />
                <stop offset="100%" stopColor="#15090b" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#roseBg)" />
            <circle cx="200" cy="150" r="95" fill="none" stroke="#c59b27" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
            <circle cx="200" cy="150" r="105" fill="none" stroke="#c59b27" strokeWidth="0.5" opacity="0.25" />
            <g transform="translate(200, 140)">
              <path d="M0,40 Q-45,60 -60,40 Q-40,20 0,25" fill="#32452b" opacity="0.8" />
              <path d="M0,40 Q45,60 60,40 Q40,20 0,25" fill="#32452b" opacity="0.8" />
              <line x1="0" y1="35" x2="0" y2="110" stroke="#32452b" strokeWidth="2.5" />
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
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
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
            <circle cx="60" cy="50" r="1" fill="#fff" opacity="0.8" />
            <circle cx="140" cy="30" r="1.5" fill="#fdf0cd" opacity="0.9" />
            <circle cx="280" cy="45" r="1" fill="#fff" opacity="0.7" />
            <circle cx="340" cy="70" r="1.2" fill="#fff" opacity="0.8" />
            <circle cx="80" cy="110" r="0.8" fill="#fff" opacity="0.6" />
            <circle cx="200" cy="85" r="50" fill="url(#moonGlow)" />
            <circle cx="200" cy="85" r="28" fill="#fef5dd" stroke="#e0caa0" strokeWidth="1" />
            <path d="M0,200 Q100,195 200,200 T400,200 L400,300 L0,300 Z" fill="#0d1824" />
            <g opacity="0.4">
              <ellipse cx="200" cy="215" rx="30" ry="2" fill="#fdf0cd" />
              <ellipse cx="200" cy="230" rx="45" ry="2.5" fill="#fdf0cd" />
              <ellipse cx="200" cy="245" rx="35" ry="2" fill="#fdf0cd" />
              <ellipse cx="200" cy="260" rx="20" ry="1.5" fill="#fdf0cd" />
            </g>
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
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a1c17" />
                <stop offset="45%" stopColor="#7a341d" />
                <stop offset="70%" stopColor="#c57430" />
                <stop offset="100%" stopColor="#2c1611" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#sunsetGrad)" />
            <circle cx="200" cy="165" r="35" fill="#fce5a2" opacity="0.9" />
            <rect x="0" y="180" width="400" height="120" fill="#24130e" opacity="0.9" />
            <ellipse cx="200" cy="190" rx="55" ry="3" fill="#fce5a2" opacity="0.5" />
            <ellipse cx="200" cy="205" rx="40" ry="2" fill="#fce5a2" opacity="0.4" />
            <ellipse cx="200" cy="220" rx="30" ry="2" fill="#fce5a2" opacity="0.3" />
            {/* Bengali Boat Silhouette */}
            <g transform="translate(180, 160)">
              <path d="M-40,28 Q0,38 40,28 Q20,38 -20,38 Z" fill="#130805" />
              <path d="M-15,26 L-15,16 Q0,12 15,16 L15,26 Z" fill="#130805" />
              <line x1="30" y1="12" x2="35" y2="35" stroke="#130805" strokeWidth="2" />
              <circle cx="28" cy="18" r="4" fill="#130805" />
            </g>
          </svg>
        </div>
      );

    case 'railway-vintage':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#221813] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="railGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2b1a12" />
                <stop offset="100%" stopColor="#120c08" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#railGrad)" />
            {/* Steam billows */}
            <circle cx="150" cy="90" r="35" fill="#544336" opacity="0.4" />
            <circle cx="180" cy="70" r="45" fill="#6d5849" opacity="0.3" />
            <circle cx="220" cy="55" r="50" fill="#4d3b2e" opacity="0.25" />
            {/* Railway track lines converging */}
            <line x1="20" y1="280" x2="180" y2="180" stroke="#8d6836" strokeWidth="3" />
            <line x1="380" y1="280" x2="220" y2="180" stroke="#8d6836" strokeWidth="3" />
            {/* Sleepers */}
            <line x1="60" y1="260" x2="340" y2="260" stroke="#362215" strokeWidth="4" />
            <line x1="90" y1="240" x2="310" y2="240" stroke="#362215" strokeWidth="3.5" />
            <line x1="120" y1="220" x2="280" y2="220" stroke="#362215" strokeWidth="3" />
            <line x1="150" y1="200" x2="250" y2="200" stroke="#362215" strokeWidth="2.5" />
            {/* Locomotive Silhouette front */}
            <rect x="175" y="110" width="50" height="70" rx="4" fill="#140d09" stroke="#c59b27" strokeWidth="0.8" />
            <circle cx="200" cy="140" r="14" fill="#fde68a" opacity="0.9" />
            <rect x="190" y="85" width="20" height="25" fill="#140d09" />
            <path d="M165,180 L235,180 L245,200 L155,200 Z" fill="#1b120c" />
            {/* Platform clock & roof */}
            <path d="M0,110 L120,130 L120,280 L0,280 Z" fill="#1b110b" opacity="0.8" />
            <circle cx="80" cy="150" r="12" fill="#faebd7" stroke="#331c10" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'vintage-cafe':
    case 'gramophone-melody':
    case 'gallery-old-coffee':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241710] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e7be69" />
                <stop offset="50%" stopColor="#9b7324" />
                <stop offset="100%" stopColor="#624410" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="#1c120c" />
            <circle cx="200" cy="150" r="85" fill="none" stroke="#c59b27" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
            <path d="M140,110 Q240,60 270,110 Q250,170 170,140 Z" fill="url(#brassGrad)" opacity="0.9" />
            <path d="M145,130 L130,170 L150,170 Z" fill="#624410" />
            <rect x="110" y="170" width="80" height="35" rx="3" fill="#382113" stroke="#c59b27" strokeWidth="0.75" />
            <circle cx="150" cy="187" r="8" fill="#c59b27" opacity="0.8" />
            <path d="M260,80 Q280,60 275,40" stroke="#d8bc88" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M280,95 Q305,75 300,55" stroke="#d8bc88" strokeWidth="1.2" fill="none" opacity="0.4" />
          </svg>
        </div>
      );

    case 'ring-proposal':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241219] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#1f0e15" />
            {/* Soft romantic glow */}
            <circle cx="200" cy="140" r="90" fill="#691a2a" opacity="0.35" />
            {/* Velvet Ring Box */}
            <rect x="135" y="150" width="130" height="85" rx="10" fill="#4d121e" stroke="#c59b27" strokeWidth="1.5" />
            <rect x="135" y="125" width="130" height="30" rx="6" fill="#691a2a" stroke="#c59b27" strokeWidth="1" />
            {/* Slit in velvet cushion */}
            <ellipse cx="200" cy="185" rx="40" ry="12" fill="#2d0810" />
            {/* Golden Solitaire Ring */}
            <ellipse cx="200" cy="155" rx="26" ry="32" fill="none" stroke="#e8ba62" strokeWidth="5" />
            <polygon points="190,125 210,125 205,115 195,115" fill="#f5f0e6" stroke="#c59b27" strokeWidth="1" />
            {/* Diamond Sparkle */}
            <circle cx="200" cy="115" r="7" fill="#ffffff" />
            <line x1="200" y1="95" x2="200" y2="135" stroke="#fff4cf" strokeWidth="1.5" />
            <line x1="180" y1="115" x2="220" y2="115" stroke="#fff4cf" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'couple-lantern':
    case 'hariken-lamp':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#1c140d] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="harikenLight" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffdb7d" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#d9822b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1a110a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="300" fill="#140d08" />
            <circle cx="200" cy="150" r="110" fill="url(#harikenLight)" />
            {/* Bengali Hariken Lamp / Hurricane Lantern */}
            <g transform="translate(200, 150)">
              {/* Glass Globe */}
              <ellipse cx="0" cy="0" rx="28" ry="38" fill="#fae8b2" opacity="0.8" stroke="#8c5825" strokeWidth="1.5" />
              {/* Flame */}
              <path d="M0,15 Q-8,0 0,-15 Q8,0 0,15 Z" fill="#ff7a18" />
              <path d="M0,12 Q-4,0 0,-8 Q4,0 0,12 Z" fill="#fff5bf" />
              {/* Metal Base & Cap */}
              <rect x="-32" y="36" width="64" height="24" rx="4" fill="#382215" stroke="#c59b27" strokeWidth="1" />
              <rect x="-24" y="-48" width="48" height="15" rx="3" fill="#382215" stroke="#c59b27" strokeWidth="1" />
              <path d="M-36,40 L-36,-20 Q-36,-50 0,-50 Q36,-50 36,-20 L36,40" fill="none" stroke="#2b1a10" strokeWidth="3" />
            </g>
          </svg>
        </div>
      );

    case 'anniversary-vintage':
    case 'gallery-eternal-bond':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241315] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#1c0f11" />
            {/* Intertwined golden wedding bands */}
            <circle cx="175" cy="140" r="45" fill="none" stroke="#e8ba62" strokeWidth="6" />
            <circle cx="225" cy="140" r="45" fill="none" stroke="#d4af37" strokeWidth="6" />
            {/* Ribbon flourish */}
            <path d="M100,200 Q200,160 300,200 Q200,230 100,200 Z" fill="#7a1c24" opacity="0.85" />
            <text x="200" y="206" fill="#fbebd0" fontSize="12" fontFamily="serif" textAnchor="middle" letterSpacing="1">
              TOGETHER FOREVER
            </text>
          </svg>
        </div>
      );

    case 'birthday-vintage':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#201518] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#180e11" />
            <circle cx="200" cy="110" r="50" fill="#fce5a2" opacity="0.25" />
            {/* Vintage Candlestick */}
            <rect x="194" y="110" width="12" height="65" fill="#f5edd6" stroke="#c59b27" strokeWidth="0.8" />
            {/* Flame */}
            <path d="M200,110 Q192,95 200,80 Q208,95 200,110 Z" fill="#ff9900" />
            <circle cx="200" cy="98" r="3" fill="#ffffff" />
            {/* Ornate Brass Holder */}
            <ellipse cx="200" cy="175" rx="35" ry="12" fill="#9b7324" stroke="#e8ba62" strokeWidth="1" />
            <rect x="188" y="170" width="24" height="12" fill="#624410" />
            <path d="M225,175 Q245,175 235,160 Q225,150 215,165" fill="none" stroke="#e8ba62" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case 'typewriter-vintage':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#201814] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#16100d" />
            {/* Typewriter sheet */}
            <rect x="150" y="60" width="100" height="90" fill="#f7efe1" stroke="#d5c1a5" strokeWidth="1" />
            <line x1="160" y1="80" x2="230" y2="80" stroke="#3d291e" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="160" y1="95" x2="240" y2="95" stroke="#3d291e" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="160" y1="110" x2="210" y2="110" stroke="#3d291e" strokeWidth="1.2" strokeDasharray="3 2" />
            {/* Typewriter Body */}
            <path d="M100,180 L130,135 L270,135 L300,180 Z" fill="#2d1e16" stroke="#c59b27" strokeWidth="1" />
            <rect x="90" y="180" width="220" height="55" rx="5" fill="#1c120c" stroke="#c59b27" strokeWidth="1" />
            {/* Round Keys */}
            <g fill="#f2e2cb" stroke="#3d291e" strokeWidth="0.8">
              {Array.from({ length: 8 }).map((_, i) => (
                <circle key={i} cx={115 + i * 24} cy={195} r="6" />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <circle key={i} cx={127 + i * 24} cy={215} r="6" />
              ))}
            </g>
          </svg>
        </div>
      );

    case 'tea-garden':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#16271c] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="teaSun" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7d08a" />
                <stop offset="100%" stopColor="#254734" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#teaSun)" />
            {/* Morning Sun */}
            <circle cx="200" cy="110" r="40" fill="#fff1c2" opacity="0.9" />
            {/* Misty Tea Garden Hills */}
            <path d="M0,170 Q120,130 250,170 T400,160 L400,300 L0,300 Z" fill="#1c3b2b" opacity="0.75" />
            <path d="M0,195 Q140,160 280,205 T400,190 L400,300 L0,300 Z" fill="#142c1f" />
            <path d="M0,225 Q160,190 320,235 T400,220 L400,300 L0,300 Z" fill="#0d1f15" />
          </svg>
        </div>
      );

    case 'palanquin-vintage':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241711] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#1b100a" />
            {/* Long carrying pole */}
            <line x1="30" y1="160" x2="370" y2="160" stroke="#c59b27" strokeWidth="5" strokeLinecap="round" />
            {/* Ornate Wooden Bengali Palanquin Box */}
            <rect x="130" y="110" width="140" height="100" rx="8" fill="#3a2013" stroke="#e8ba62" strokeWidth="1.5" />
            {/* Decorative Arched Window */}
            <path d="M170,185 L170,145 Q200,125 230,145 L230,185 Z" fill="#1b100a" stroke="#c59b27" strokeWidth="1" />
            {/* Palanquin Roof Peak */}
            <path d="M120,115 Q200,85 280,115 Z" fill="#6d1b24" stroke="#c59b27" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'bengali-courtyard':
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#221812] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="300" fill="#170f0a" />
            {/* Zamindar Palace / Thakurbari Brick Arches */}
            <path d="M40,260 L40,110 Q90,70 140,110 L140,260" fill="none" stroke="#7a261d" strokeWidth="12" />
            <path d="M150,260 L150,110 Q200,70 250,110 L250,260" fill="none" stroke="#7a261d" strokeWidth="12" />
            <path d="M260,260 L260,110 Q310,70 360,110 L360,260" fill="none" stroke="#7a261d" strokeWidth="12" />
            {/* Warm Lantern in center arch */}
            <line x1="200" y1="70" x2="200" y2="130" stroke="#c59b27" strokeWidth="1.5" />
            <circle cx="200" cy="140" r="16" fill="#fce5a2" opacity="0.85" />
          </svg>
        </div>
      );

    // Gallery and default fallback illustrations
    case 'gallery-forever-memory':
    case 'gallery-stories-never-end':
    case 'gallery-tumi-chile':
    case 'gallery-kichu-smriti':
    default:
      return (
        <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#241a14] ${className}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover opacity-90" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="warmVintageGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#352318" />
                <stop offset="100%" stopColor="#180f0a" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#warmVintageGrad)" />
            {/* Ornate Vintage Filigree corner borders */}
            <g stroke="#c59b27" strokeWidth="1" fill="none" opacity="0.65">
              <path d="M30,50 Q50,50 50,30" />
              <path d="M25,60 Q60,60 60,25" />
              <path d="M370,50 Q350,50 350,30" />
              <path d="M375,60 Q340,60 340,25" />
              <path d="M30,250 Q50,250 50,270" />
              <path d="M25,240 Q60,240 60,275" />
              <path d="M370,250 Q350,250 350,270" />
              <path d="M375,240 Q340,240 340,275" />
            </g>
            {/* Central Antique Medallion */}
            <circle cx="200" cy="150" r="75" fill="#2d1c13" stroke="#c59b27" strokeWidth="1.2" opacity="0.85" />
            <circle cx="200" cy="150" r="68" fill="none" stroke="#c59b27" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6" />
            {/* Vintage Post Envelope */}
            <path d="M175,132 L225,132 L200,152 Z" fill="#7a1c24" opacity="0.9" />
            <path d="M175,132 L175,165 L225,165 L225,132 Z" fill="none" stroke="#c59b27" strokeWidth="1" />
            <text x="200" y="182" fill="#dfbe7e" fontSize="10" fontFamily="serif" textAnchor="middle" letterSpacing="2">POSTLOVEBD</text>
            <text x="200" y="196" fill="#a48149" fontSize="8" fontFamily="serif" textAnchor="middle">ARCHIVE 1952</text>
          </svg>
        </div>
      );
  }
};
