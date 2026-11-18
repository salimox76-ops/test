import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { sound } from '../../utils/audio';
import { Sparkles, KeyRound } from 'lucide-react';

export const Chapter1Entrance: React.FC = () => {
  const { nextChapter, isMuted, toggleMute } = useBirthday();
  const [isOpening, setIsOpening] = useState(false);
  const [handleTurned, setHandleTurned] = useState(false);

  const handleDoorClick = () => {
    if (isOpening) return;
    
    // Auto-enable audio if user hasn't explicitly muted
    if (isMuted) {
      toggleMute();
    }
    
    setHandleTurned(true);
    sound.playDoorOpen();

    setTimeout(() => {
      setIsOpening(true);
    }, 400);

    setTimeout(() => {
      nextChapter();
    }, 2000);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      {/* Background visual novel room with dark crimson atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/door_entrance_1794071409986.jpg"
          alt="Gothic Chamber"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out opacity-60"
          style={{ transform: isOpening ? 'scale(1.12)' : 'scale(1)', willChange: 'transform' }}
          referrerPolicy="no-referrer"
        />
        {/* Dark crimson vignette and dramatic lighting overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a030c]/70 to-black/90 pointer-events-none" />
      </div>

      {/* Ambient floating dust particles / stardust */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-rose-200/40 animate-pulse"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Door Presentation & Visual Center */}
      <div className="relative z-20 flex flex-col items-center max-w-xl mx-auto px-6 text-center">
        {/* Subtitle / Chapter indicator */}
        <div className="mb-4 flex items-center gap-2 text-xs font-mono tracking-widest text-[#fb7185] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
          <span>Chapter I · The Invitation</span>
          <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
        </div>

        {/* Cinematic headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fce7f3] leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Something special is waiting for you...
        </h1>

        <p className="font-serif italic text-base sm:text-xl text-[#fda4af]/80 max-w-md mx-auto mb-10 leading-relaxed drop-shadow">
          A world crafted just for you, celebrating every memory, every laugh, and your 21st milestone.
        </p>

        {/* Interactive Door Gateway Card */}
        <div
          onClick={handleDoorClick}
          className="group relative cursor-pointer flex flex-col items-center justify-center p-8 rounded-2xl bg-[#1c0712]/70 hover:bg-[#2b0a1c]/80 border border-[#f43f5e]/40 hover:border-[#fb7185] transition-all duration-500 shadow-[0_0_40px_rgba(244,63,94,0.25)] hover:shadow-[0_0_60px_rgba(244,63,94,0.45)] hover:-translate-y-1"
          style={{
            perspective: '1000px',
          }}
        >
          {/* Glowing aura behind door */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-[#e11d48]/40 via-[#be123c]/20 to-transparent transition-opacity duration-700 ${
              isOpening ? 'opacity-100 scale-110' : 'opacity-40 group-hover:opacity-75'
            }`}
          />

          {/* SVG Ornate Door with opening animation */}
          <div
            className="relative w-44 sm:w-56 h-64 sm:h-80 transition-transform duration-1000 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              transform: isOpening ? 'rotateY(-75deg) scale(0.95)' : 'rotateY(0deg)',
            }}
          >
            {/* Door Frame & Panels */}
            <svg
              viewBox="0 0 160 240"
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
            >
              {/* Outer Arch Frame */}
              <path
                d="M10 230 L10 60 Q10 10 80 10 Q150 10 150 60 L150 230 Z"
                fill="#240715"
                stroke="#be123c"
                strokeWidth="4"
              />
              {/* Inner Door Panel */}
              <path
                d="M18 226 L18 64 Q18 20 80 20 Q142 20 142 64 L142 226 Z"
                fill="#16030c"
                stroke="#9f1239"
                strokeWidth="2"
              />
              {/* Decorative Gothic Carvings */}
              <path
                d="M30 75 Q80 40 130 75 L130 140 Q80 160 30 140 Z"
                fill="#2a091a"
                stroke="#e11d48"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <path
                d="M30 155 Q80 170 130 155 L130 220 L30 220 Z"
                fill="#220715"
                stroke="#9f1239"
                strokeWidth="1.5"
              />
              {/* Vintage Brass Lockplate */}
              <rect x="118" y="115" width="14" height="34" rx="3" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
              {/* Handle */}
              <g
                className="transition-transform duration-300 origin-center"
                style={{
                  transform: handleTurned ? 'rotate(35deg) translate(2px, 2px)' : 'rotate(0deg)',
                }}
              >
                <circle cx="125" cy="126" r="3" fill="#fef08a" />
                <rect x="122" y="127" width="6" height="12" rx="2" fill="#b45309" />
              </g>
              {/* Keyhole */}
              <circle cx="125" cy="140" r="1.5" fill="#18050e" />
              <polygon points="124,141 126,141 127,146 123,146" fill="#18050e" />

              {/* Cat paw silhouette etched on door */}
              <circle cx="80" cy="100" r="4.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="73" cy="93" r="2.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="87" cy="93" r="2.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="68" cy="100" r="2.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="92" cy="100" r="2.5" fill="#f43f5e" opacity="0.6" />
            </svg>

            {/* Light leaking through door gap when opening */}
            {isOpening && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffe4e6] to-[#fb7185] opacity-90 blur-xl animate-pulse" />
            )}
          </div>

          {/* Action Prompt */}
          <div className="mt-6 flex items-center gap-2 text-sm font-serif italic text-[#fecdd3] group-hover:text-white transition-colors">
            <KeyRound className="w-4 h-4 text-[#fb7185] animate-bounce" />
            <span>Click to unlock the door</span>
          </div>
        </div>

        {/* Small hint */}
        <p className="mt-6 text-xs text-[#fda4af]/50 font-mono">
          Turn your sound on for the best experience · Use arrow keys to explore
        </p>
      </div>

      {/* Cinematic Flash upon entering */}
      {isOpening && (
        <div className="fixed inset-0 z-50 bg-[#fff1f2] animate-in fade-in duration-1000 opacity-90 pointer-events-none" />
      )}
    </div>
  );
};
