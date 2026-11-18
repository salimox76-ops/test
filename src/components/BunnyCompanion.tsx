import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Sparkles, X } from 'lucide-react';

export const BunnyCompanion: React.FC = () => {
  const { currentChapter, bunnyThought, triggerBunnyEasterEgg, setBunnyThought } = useBirthday();
  const [isWiggling, setIsWiggling] = useState(false);

  // Don't show in Chapter 1 entrance to keep entrance mysterious
  if (currentChapter === 1) return null;

  const handleClick = () => {
    setIsWiggling(true);
    triggerBunnyEasterEgg();
    setTimeout(() => setIsWiggling(false), 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech bubble thought */}
      {bunnyThought && (
        <div className="pointer-events-auto mb-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative rounded-2xl bg-[#1f0b14]/90 backdrop-blur-md border border-[#fb7185]/40 px-3.5 py-2.5 shadow-xl text-xs text-[#ffe4e6] leading-relaxed">
            <button
              onClick={() => setBunnyThought(null)}
              className="absolute -top-1.5 -right-1.5 rounded-full bg-[#3f1222] p-0.5 text-[#fda4af] hover:text-white transition-colors border border-[#fb7185]/30"
              title="Close note"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185] shrink-0 mt-0.5" />
              <span>{bunnyThought}</span>
            </div>
            {/* Speech bubble downward pointer */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-[#1f0b14]/90 border-r border-b border-[#fb7185]/40" />
          </div>
        </div>
      )}

      {/* Bunny Avatar Button */}
      <button
        onClick={handleClick}
        className={`pointer-events-auto group relative flex items-center justify-center p-2 rounded-full transition-transform active:scale-95 hover:scale-110 ${
          isWiggling ? 'animate-bounce' : ''
        }`}
        title="Tap the bunny companion for sweet thoughts!"
      >
        <div className="absolute inset-0 rounded-full bg-[#fb7185]/20 blur-md group-hover:bg-[#fb7185]/40 transition-colors" />
        
        {/* Adorable SVG White Bunny */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-b from-[#2e0e1a] to-[#15050c] border border-[#f43f5e]/50 p-1 flex items-center justify-center shadow-lg">
          <svg
            viewBox="0 0 100 100"
            className="w-10 h-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {/* Ears */}
            <ellipse
              cx="36"
              cy="28"
              rx="9"
              ry="24"
              fill="#ffffff"
              stroke="#fecdd3"
              strokeWidth="2"
              className="transition-transform duration-300 origin-bottom group-hover:rotate-[-6deg]"
            />
            <ellipse cx="36" cy="28" rx="5" ry="16" fill="#fecdd3" />
            
            <ellipse
              cx="64"
              cy="28"
              rx="9"
              ry="24"
              fill="#ffffff"
              stroke="#fecdd3"
              strokeWidth="2"
              className="transition-transform duration-300 origin-bottom group-hover:rotate-[6deg]"
            />
            <ellipse cx="64" cy="28" rx="5" ry="16" fill="#fecdd3" />

            {/* Head */}
            <circle cx="50" cy="62" r="28" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />

            {/* Rosy Cheeks */}
            <circle cx="34" cy="68" r="5" fill="#fda4af" opacity="0.7" />
            <circle cx="66" cy="68" r="5" fill="#fda4af" opacity="0.7" />

            {/* Cute Eyes */}
            <circle cx="41" cy="58" r="3.5" fill="#1e1b4b" />
            <circle cx="42" cy="56.5" r="1.2" fill="#ffffff" />
            
            <circle cx="59" cy="58" r="3.5" fill="#1e1b4b" />
            <circle cx="60" cy="56.5" r="1.2" fill="#ffffff" />

            {/* Nose & Mouth */}
            <polygon points="50,65 47,62 53,62" fill="#fb7185" />
            <path
              d="M47 67 Q50 70 53 67"
              stroke="#fb7185"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Little Red Bow under chin */}
            <path
              d="M44 79 C40 76, 40 82, 44 80 L50 81 L56 80 C60 82, 60 76, 56 79 Z"
              fill="#e11d48"
            />
            <circle cx="50" cy="80" r="2" fill="#ffe4e6" />
          </svg>
        </div>
      </button>
    </div>
  );
};
