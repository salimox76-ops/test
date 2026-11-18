import React, { useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, BookOpen, Heart, Crown, Gift, RotateCcw } from 'lucide-react';

export const Chapter8Surprise: React.FC = () => {
  const { setIsArchiveOpen, goToChapter } = useBirthday();

  useEffect(() => {
    sound.playChime(987); // B5

    // Multi-burst celebration confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#ffe4e6', '#facc15', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerConfettiBlast = () => {
    sound.playChime(1175);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#ffffff', '#e11d48'],
    });
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/cake_backdrop_1794071412244.jpg"
          alt="Golden Celebration"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#1a0510]/85 to-[#080205]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-rose-300/30 animate-pulse"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 95}%`,
              width: `${(i % 3) + 3}px`,
              height: `${(i % 3) + 3}px`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-700">
        {/* Crown & 21 Badge */}
        <div className="flex flex-col items-center">
          <div className="relative p-4 rounded-full bg-gradient-to-b from-[#881337] to-[#4c0519] border-2 border-[#fb7185] text-[#fef08a] shadow-[0_0_35px_rgba(244,63,94,0.4)] mb-2">
            <Crown className="w-10 h-10" />
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#e11d48] text-white text-[11px] font-mono font-bold border border-white/20">
              21
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
            <span>Chapter VIII · The Grand Finale</span>
            <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
          </div>
        </div>

        {/* Main Grand Announcement */}
        <div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fff1f2] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Happy 21st Birthday, My Love
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl text-[#fda4af] mt-2">
            November 23, 2026
          </p>
        </div>

        {/* The 21st Birthday Keepsake Scroll Card */}
        <div className="w-full rounded-2xl bg-[#14040d]/90 border border-[#f43f5e]/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] uppercase tracking-wider">
            <Heart className="w-4 h-4 text-[#fb7185] fill-[#fb7185]" />
            <span>Officially 21</span>
          </div>

          <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed max-w-xl">
            "I hope I get to celebrate many more birthdays with you. Not just through a screen, but right beside you, stealing a bite of your cake and annoying you like I always do."
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#fda4af]/70 pt-2 border-t border-white/10 w-full">
            <span>🎂 21 Years Old</span>
            <span>·</span>
            <span>🎮 Briar Master</span>
            <span>·</span>
            <span>✨ Nov 23, 2026</span>
            <span>·</span>
            <span>🐾 Forever My Favourite</span>
          </div>

          {/* Confetti Trigger */}
          <button
            onClick={triggerConfettiBlast}
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a0b1b] hover:bg-[#40112a] border border-[#f43f5e]/40 text-xs font-serif text-[#fecdd3] hover:text-white transition-all shadow-md active:scale-95"
          >
            <Gift className="w-4 h-4 text-[#fb7185]" />
            <span>More Birthday Fireworks! 🎉</span>
          </button>
        </div>

        {/* Actions: Archive & Revisit */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
          <button
            onClick={() => setIsArchiveOpen(true)}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore The Chapter Archive</span>
          </button>

          <button
            onClick={() => goToChapter(1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1b0511] hover:bg-[#2c081c] border border-white/15 text-xs font-serif text-[#fda4af] transition-colors"
            title="Start from the Entrance again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay From Beginning</span>
          </button>
        </div>
      </div>
    </div>
  );
};
