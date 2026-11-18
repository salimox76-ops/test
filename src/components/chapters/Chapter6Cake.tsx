import React, { useState, useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Utensils, RotateCcw, ChevronRight, Heart } from 'lucide-react';

interface CandleConfig {
  id: number;
  x: number; // percentage in cake container
  y: number; // percentage in cake container
  height: number;
  color: string;
}

// 21 Candles carefully positioned across the two tiers so every single candle is unobstructed
const CANDLE_LAYOUT: CandleConfig[] = [
  // Top tier arc (7 candles)
  { id: 0, x: 32, y: 16, height: 38, color: '#f43f5e' },
  { id: 1, x: 38, y: 14, height: 42, color: '#fb7185' },
  { id: 2, x: 44, y: 12, height: 44, color: '#f43f5e' },
  { id: 3, x: 50, y: 11, height: 46, color: '#facc15' }, // Center royal candle
  { id: 4, x: 56, y: 12, height: 44, color: '#f43f5e' },
  { id: 5, x: 62, y: 14, height: 42, color: '#fb7185' },
  { id: 6, x: 68, y: 16, height: 38, color: '#f43f5e' },

  // Bottom tier lower left arc (7 candles)
  { id: 7, x: 18, y: 44, height: 40, color: '#f43f5e' },
  { id: 8, x: 23, y: 41, height: 42, color: '#fb7185' },
  { id: 9, x: 28, y: 39, height: 44, color: '#f43f5e' },
  { id: 10, x: 33, y: 38, height: 45, color: '#facc15' },
  { id: 11, x: 38, y: 37, height: 45, color: '#fb7185' },
  { id: 12, x: 43, y: 38, height: 44, color: '#f43f5e' },
  { id: 13, x: 48, y: 39, height: 43, color: '#fb7185' },

  // Bottom tier lower right arc (7 candles)
  { id: 14, x: 52, y: 39, height: 43, color: '#fb7185' },
  { id: 15, x: 57, y: 38, height: 44, color: '#f43f5e' },
  { id: 16, x: 62, y: 37, height: 45, color: '#facc15' },
  { id: 17, x: 67, y: 38, height: 45, color: '#fb7185' },
  { id: 18, x: 72, y: 39, height: 44, color: '#f43f5e' },
  { id: 19, x: 77, y: 41, height: 42, color: '#fb7185' },
  { id: 20, x: 82, y: 44, height: 40, color: '#f43f5e' },
];

export const Chapter6Cake: React.FC = () => {
  const {
    nextChapter,
    candles,
    extinguishCandle,
    extinguishAllCandles,
    cakeSliceState,
    cutCake,
    takeBite,
    resetCake,
  } = useBirthday();

  const [recentlyExtinguished, setRecentlyExtinguished] = useState<number | null>(null);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Candles count
  const candlesLeft = candles.filter(c => c).length;
  const allOut = candlesLeft === 0;

  // Fire celebration when all 21 are extinguished
  useEffect(() => {
    if (allOut && !hasCelebrated) {
      setHasCelebrated(true);
      sound.playChime(1046); // High C6
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#fbbf24', '#ffffff'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.2, y: 0.7 },
          colors: ['#e11d48', '#fda4af', '#f59e0b'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.8, y: 0.7 },
          colors: ['#e11d48', '#fda4af', '#f59e0b'],
        });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [allOut, hasCelebrated]);

  const handleCandleClick = (idx: number) => {
    if (!candles[idx]) return;
    setRecentlyExtinguished(idx);
    extinguishCandle(idx);
    setTimeout(() => {
      setRecentlyExtinguished(null);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/cake_backdrop_1794071412244.jpg"
          alt="Velvet Celebration"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#1a0510]/80 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
            <span>Chapter VI · The Centerpiece</span>
            <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] tracking-tight">
            The 21st Birthday Cake
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#fda4af]/80 mt-1 max-w-md mx-auto">
            {allOut
              ? "All 21 wishes cast into the stars! Cut a celebratory slice below."
              : "Click each of the 21 glowing candles to extinguish them and make your wishes."}
          </p>

          {/* Candle Counter Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#200713]/90 border border-[#f43f5e]/40 shadow-lg text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${allOut ? 'bg-emerald-400' : 'bg-[#fb7185] animate-ping'}`} />
            <span className="text-[#ffe4e6]">
              {allOut
                ? "✨ All 21 Candles Extinguished!"
                : `${candlesLeft} of 21 Candles Remaining`}
            </span>
            {!allOut && (
              <button
                onClick={extinguishAllCandles}
                className="ml-2 text-[10px] text-[#fb7185] hover:text-white underline transition-colors cursor-pointer"
                title="Extinguish all 21 candles in one wish"
              >
                (Blow all out)
              </button>
            )}
          </div>
        </div>

        {/* Cake Container with 21 Candles */}
        <div className="relative w-full max-w-xl aspect-[4/3] flex items-center justify-center">
          {/* Ambient Candle Glow Backdrop */}
          {!allOut && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-500/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />
          )}

          {/* SVG Illustrated Cake */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 500 400"
              className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            >
              {/* Silver & Gold Pedestal Stand */}
              <ellipse cx="250" cy="370" rx="200" ry="25" fill="#1f0a14" stroke="#e11d48" strokeWidth="2" />
              <ellipse cx="250" cy="365" rx="180" ry="20" fill="#2d0f1e" stroke="#fb7185" strokeWidth="1" />
              <path d="M220 365 L225 340 L275 340 L280 365 Z" fill="#3f1329" />
              <ellipse cx="250" cy="340" rx="195" ry="22" fill="#fff5f6" stroke="#fda4af" strokeWidth="2" />

              {/* TIER 1: Bottom Layer (White Ivory Cream with Red Velvet Ribbon) */}
              {/* Bottom tier base body */}
              <path
                d="M80 250 C80 250, 80 330, 80 330 C80 355, 420 355, 420 330 L420 250 Z"
                fill="#fdfbf9"
                stroke="#fce7f3"
                strokeWidth="1.5"
              />
              {/* Shadow gradient on bottom tier */}
              <path
                d="M80 250 C80 250, 80 330, 80 330 C120 355, 180 355, 250 350 L250 250 Z"
                fill="#f7efe9"
                opacity="0.5"
              />
              {/* Crimson Velvet Ribbon at bottom tier base */}
              <path
                d="M80 320 C120 335, 380 335, 420 320 L420 330 C380 355, 80 355, 80 330 Z"
                fill="#be123c"
              />
              {/* Delicate Quilted Crosshatch fondant lines */}
              <path
                d="M100 260 L140 320 M140 260 L180 320 M180 260 L220 320 M220 260 L260 320 M260 260 L300 320 M300 260 L340 320 M340 260 L380 320"
                stroke="#fecdd3"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              <path
                d="M140 320 L100 260 M180 320 L140 260 M220 320 L180 260 M260 320 L220 260 M300 320 L260 260 M340 320 L300 260 M380 320 L340 260"
                stroke="#fecdd3"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              {/* Tier 1 top surface ellipse */}
              <ellipse cx="250" cy="250" rx="170" ry="24" fill="#fffafb" stroke="#fecdd3" strokeWidth="1.5" />

              {/* Strawberries & Whipped rosettes around Tier 1 border */}
              {[100, 130, 160, 340, 370, 400].map((x, i) => (
                <g key={`berry-${i}`}>
                  {/* Strawberry */}
                  <path
                    d={`M${x - 8} 250 C${x - 8} 242, ${x + 8} 242, ${x + 8} 250 C${x + 8} 258, ${x} 264, ${x} 264 C${x} 264, ${x - 8} 258, ${x - 8} 250 Z`}
                    fill="#e11d48"
                  />
                  {/* Leaves */}
                  <polygon points={`${x},241 ${x - 5},238 ${x + 5},238`} fill="#15803d" />
                  <circle cx={x - 2} cy={249} r="0.8" fill="#fef08a" />
                  <circle cx={x + 2} cy={251} r="0.8" fill="#fef08a" />
                  {/* Cream rosette */}
                  <circle cx={x + 12} cy={252} r="5" fill="#ffffff" stroke="#fce7f3" strokeWidth="0.8" />
                </g>
              ))}

              {/* TIER 2: Top Layer (White Cream with Cascading Crimson Drips) */}
              <path
                d="M140 150 C140 150, 140 230, 140 230 C140 250, 360 250, 360 230 L360 150 Z"
                fill="#ffffff"
                stroke="#fce7f3"
                strokeWidth="1.5"
              />
              {/* Top tier surface ellipse */}
              <ellipse cx="250" cy="150" rx="110" ry="18" fill="#fff9fb" stroke="#fecdd3" strokeWidth="1.5" />

              {/* Cascading Ruby Glaze Drip */}
              <path
                d="M140 150 Q160 170 175 158 Q190 185 205 160 Q225 178 245 162 Q265 188 285 160 Q305 182 325 160 Q345 174 360 150"
                fill="#be123c"
                stroke="#9f1239"
                strokeWidth="1"
              />

              {/* Sugar Figurines on top: Little Black Cat & Sweet White Bunny */}
              <g transform="translate(230, 115) scale(0.65)">
                {/* Mini Cat figurine */}
                <ellipse cx="-15" cy="35" rx="14" ry="12" fill="#1a0610" stroke="#f43f5e" strokeWidth="1" />
                <circle cx="-15" cy="22" r="10" fill="#1a0610" stroke="#f43f5e" strokeWidth="1" />
                <polygon points="-22,18 -26,8 -17,14" fill="#1a0610" />
                <polygon points="-8,18 -4,8 -13,14" fill="#1a0610" />
                <circle cx="-19" cy="21" r="1.5" fill="#34d399" />
                <circle cx="-11" cy="21" r="1.5" fill="#34d399" />
                {/* Tiny red ribbon */}
                <path d="-18 31 L -12 31" stroke="#e11d48" strokeWidth="2" />

                {/* Mini Bunny figurine */}
                <ellipse cx="15" cy="36" rx="13" ry="11" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
                <circle cx="15" cy="23" r="9" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
                <ellipse cx="11" cy="9" rx="3" ry="9" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
                <ellipse cx="19" cy="9" rx="3" ry="9" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
                <circle cx="12" cy="22" r="1.5" fill="#881337" />
                <circle cx="18" cy="22" r="1.5" fill="#881337" />
                {/* Tiny sugar heart between them */}
                <path
                  d="M0 26 C-4 22, -6 28, 0 32 C6 28, 4 22, 0 26 Z"
                  fill="#e11d48"
                />
              </g>

              {/* 21st Birthday Gold Emblem Plaque */}
              <g transform="translate(250, 290)">
                <ellipse cx="0" cy="0" rx="36" ry="18" fill="#1c0712" stroke="#d97706" strokeWidth="2" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#fbbf24"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="'Playfair Display', serif"
                  letterSpacing="1"
                >
                  21
                </text>
              </g>
            </svg>

            {/* 21 Interactive Clickable Candles Placed Over the SVG */}
            {CANDLE_LAYOUT.map((cfg, idx) => {
              const isLit = candles[idx];
              const isRecentBlow = recentlyExtinguished === idx;

              return (
                <div
                  key={cfg.id}
                  onClick={() => handleCandleClick(idx)}
                  className="absolute z-20 cursor-pointer group flex flex-col items-center -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${cfg.x}%`,
                    top: `${cfg.y}%`,
                  }}
                  title={isLit ? `Candle #${idx + 1} (Click to extinguish & make a wish!)` : `Extinguished #${idx + 1}`}
                >
                  {/* Flame & Glow or Smoke */}
                  <div className="relative w-6 h-8 flex items-center justify-center">
                    {isLit ? (
                      /* Animated Flickering Flame */
                      <div className="relative animate-flame flex flex-col items-center">
                        {/* Outer Glow Halo */}
                        <div className="absolute w-8 h-8 rounded-full bg-amber-400/30 blur-md pointer-events-none" />
                        
                        {/* Realistic SVG Candle Flame */}
                        <svg width="14" height="22" viewBox="0 0 14 22">
                          <defs>
                            <linearGradient id={`flame-grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#fff" />
                              <stop offset="25%" stopColor="#fef08a" />
                              <stop offset="65%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M7 0 C12 6, 14 13, 7 22 C0 13, 2 6, 7 0 Z"
                            fill={`url(#flame-grad-${idx})`}
                          />
                          {/* Inner white-hot core */}
                          <ellipse cx="7" cy="14" rx="2.5" ry="5" fill="#ffffff" />
                        </svg>
                      </div>
                    ) : (
                      /* Smoke particle animation when blown out */
                      <div className="relative flex flex-col items-center">
                        {isRecentBlow && (
                          <div className="absolute -top-3 w-4 h-8 animate-smoke pointer-events-none">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300/60 blur-xs" />
                            <div className="w-3.5 h-3.5 rounded-full bg-slate-400/40 blur-xs mt-1" />
                          </div>
                        )}
                        {/* Extinguished wick with tiny glowing ember */}
                        <div className="w-0.5 h-2.5 bg-stone-700" />
                        <div className="w-1 h-1 rounded-full bg-rose-900/60 -mt-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Candle Wick */}
                  {isLit && <div className="w-0.5 h-1.5 bg-stone-900 -mt-1" />}

                  {/* Candle Body */}
                  <div
                    className="w-2.5 rounded-t-sm shadow-sm transition-transform duration-200 group-hover:scale-105"
                    style={{
                      height: `${cfg.height * 0.7}px`,
                      background: `repeating-linear-gradient(45deg, ${cfg.color}, ${cfg.color} 3px, #ffffff 3px, #ffffff 6px)`,
                      border: '0.5px solid rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cake Cutting & Eating Experience Area */}
        <div className="w-full max-w-xl rounded-2xl bg-[#15040d]/90 border border-[#f43f5e]/30 p-6 flex flex-col items-center gap-4 text-center shadow-xl">
          {cakeSliceState === 'uncut' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] uppercase">
                <Utensils className="w-4 h-4" />
                <span>Ceremonial Cake Cutting</span>
              </div>
              <p className="font-serif italic text-sm text-[#fce7f3]/90 max-w-md">
                {allOut
                  ? "The candles are out, the magic is sealed. Now, cut your official 21st birthday slice!"
                  : "Blow out all 21 candles to unlock the cake-cutting knife."}
              </p>
              <button
                disabled={!allOut}
                onClick={cutCake}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-serif font-medium transition-all ${
                  allOut
                    ? 'bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-[#fb7185]/50'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Cut The First Slice</span>
              </button>
            </div>
          ) : (
            /* Interactive Slice on Dessert Plate */
            <div className="flex flex-col items-center gap-4 w-full animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between w-full border-b border-white/10 pb-2">
                <span className="text-xs font-mono text-[#fb7185] uppercase">
                  Your 21st Birthday Slice
                </span>
                <span className="text-xs font-mono text-white/50">
                  {cakeSliceState === 'cut' && "Click the slice to take bite 1/3"}
                  {cakeSliceState === 'bite1' && "Click again for bite 2/3"}
                  {cakeSliceState === 'bite2' && "Click again for final bite 3/3"}
                  {cakeSliceState === 'bite3' && "One last sweet taste!"}
                  {cakeSliceState === 'eaten' && "✨ Finished to the last crumb!"}
                </span>
              </div>

              {/* Porcelain Dessert Plate with Interactive Slice */}
              <div
                onClick={cakeSliceState !== 'eaten' ? takeBite : undefined}
                className={`relative w-64 h-44 rounded-full bg-gradient-to-b from-[#2a0e1c] to-[#12040b] border-2 border-[#fb7185]/50 flex items-center justify-center shadow-2xl p-4 transition-transform ${
                  cakeSliceState !== 'eaten' ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
                }`}
                title={cakeSliceState !== 'eaten' ? "Click to take a delicious bite!" : "All eaten!"}
              >
                {cakeSliceState !== 'eaten' ? (
                  /* SVG Slice with progressive bite marks */
                  <svg viewBox="0 0 160 120" className="w-40 h-32 drop-shadow-xl">
                    {/* Cake Slice Wedge */}
                    <path
                      d={
                        cakeSliceState === 'cut'
                          ? "M30 30 L130 50 L80 100 Z"
                          : cakeSliceState === 'bite1'
                          ? "M30 30 L110 46 Q95 60 105 70 L80 100 Z"
                          : cakeSliceState === 'bite2'
                          ? "M30 30 L85 45 Q75 60 85 75 L65 85 Z"
                          : "M30 30 L55 42 Q48 55 55 65 L45 70 Z"
                      }
                      fill="#fff9fa"
                      stroke="#fecdd3"
                      strokeWidth="1.5"
                    />
                    {/* Red Velvet Sponge Layers */}
                    <path
                      d={
                        cakeSliceState === 'cut'
                          ? "M30 30 L80 100 L80 110 L30 40 Z"
                          : cakeSliceState === 'bite1'
                          ? "M30 30 L75 95 L75 105 L30 40 Z"
                          : cakeSliceState === 'bite2'
                          ? "M30 30 L60 80 L60 90 L30 40 Z"
                          : "M30 30 L45 65 L45 75 L30 40 Z"
                      }
                      fill="#be123c"
                    />
                    {/* White Cream Frosting inside */}
                    <line x1="30" y1="35" x2="70" y2="90" stroke="#ffffff" strokeWidth="2.5" />
                    <line x1="30" y1="38" x2="68" y2="98" stroke="#ffffff" strokeWidth="2.5" />

                    {/* Fresh Strawberry Topper on slice */}
                    {cakeSliceState !== 'bite3' && (
                      <g transform="translate(75, 45)">
                        <path d="M-6 -6 C-6 -12, 6 -12, 6 -6 C6 2, 0 8, 0 8 C0 8, -6 2, -6 -6 Z" fill="#e11d48" />
                        <polygon points="0,-12 -3,-15 3,-15" fill="#15803d" />
                      </g>
                    )}

                    {/* Crumbs */}
                    <circle cx="110" cy="85" r="1.5" fill="#e11d48" />
                    <circle cx="120" cy="95" r="1.2" fill="#be123c" />
                    <circle cx="95" cy="102" r="1.8" fill="#fda4af" />
                  </svg>
                ) : (
                  /* Empty plate with crumbs & sweet message */
                  <div className="flex flex-col items-center text-center">
                    <Heart className="w-8 h-8 text-[#fb7185] fill-[#fb7185] animate-bounce" />
                    <span className="font-serif italic text-sm text-[#ffe4e6] mt-2">
                      "Delicious strawberry velvet! Absolutely cleared."
                    </span>
                    <span className="text-[11px] font-mono text-[#fda4af]/70 mt-1">
                      Ready for the personal letter in Chapter VII.
                    </span>
                  </div>
                )}
              </div>

              {cakeSliceState !== 'eaten' && (
                <button
                  onClick={takeBite}
                  className="px-4 py-1.5 rounded-full bg-[#881337] hover:bg-[#9f1239] text-xs font-serif text-white transition-colors"
                >
                  Take A Bite 🍓
                </button>
              )}
            </div>
          )}

          {/* Reset or Advance Controls */}
          <div className="flex items-center justify-between w-full pt-4 border-t border-white/10">
            <button
              onClick={resetCake}
              className="flex items-center gap-1.5 text-xs font-serif text-[#fda4af]/60 hover:text-white transition-colors"
              title="Relight all 21 candles to experience again"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relight Candles</span>
            </button>

            <button
              onClick={nextChapter}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <span>Read The Birthday Letter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
