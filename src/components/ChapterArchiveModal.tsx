import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { CHAPTER_METADATA } from './NavigationControls';
import { X, Sparkles, BookOpen } from 'lucide-react';

const CHAPTER_THUMBNAILS: Record<number, { image?: string; icon: string; quote: string }> = {
  1: {
    image: "/src/assets/images/door_entrance_1794071409986.jpg",
    icon: "🚪",
    quote: "Something waiting for you...",
  },
  2: {
    image: "/src/assets/images/storybook_cover_1794071410328.jpg",
    icon: "💬",
    quote: "Where's your profile picture from? (Just an excuse)",
  },
  3: {
    icon: "✨",
    quote: "Every late night and memory we've shared.",
  },
  4: {
    image: "/src/assets/images/cat_bunny_art_1794071410548.jpg",
    icon: "🐾",
    quote: "Screenshots, inside jokes, cats & songs.",
  },
  5: {
    icon: "🎮",
    quote: "10 questions — and you got attached first.",
  },
  6: {
    image: "/src/assets/images/cake_backdrop_1794071412244.jpg",
    icon: "🎂",
    quote: "21 candles to blow out and cake to eat.",
  },
  7: {
    icon: "💌",
    quote: "An honest letter for your 21st.",
  },
  8: {
    icon: "👑",
    quote: "Happy 21st Birthday, November 23, 2026.",
  },
};

export const ChapterArchiveModal: React.FC = () => {
  const { isArchiveOpen, setIsArchiveOpen, goToChapter, currentChapter } = useBirthday();

  if (!isArchiveOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#12050c] border border-[#f43f5e]/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f43f5e]/20 bg-gradient-to-r from-[#200713] to-[#12050c]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#881337]/40 border border-[#f43f5e]/30 text-[#fda4af]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#ffe4e6]">
                The Story Archive
              </h2>
              <p className="text-xs text-[#fda4af]/70 mt-0.5">
                Every chapter is unlocked. Revisit any memory whenever you wish.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsArchiveOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
            title="Close Archive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHAPTER_METADATA.map(ch => {
            const thumb = CHAPTER_THUMBNAILS[ch.id];
            const isCurrent = currentChapter === ch.id;

            return (
              <div
                key={ch.id}
                onClick={() => goToChapter(ch.id)}
                className={`group relative flex flex-col rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isCurrent
                    ? 'border-[#f43f5e] bg-[#290a18] ring-2 ring-[#fb7185]/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'border-white/10 bg-[#190610] hover:border-[#f43f5e]/50 hover:bg-[#230815]'
                }`}
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative h-32 w-full overflow-hidden bg-[#0c0307]">
                  {thumb.image ? (
                    <img
                      src={thumb.image}
                      alt={ch.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#3b0b21] to-[#12040b]">
                      <span className="text-3xl mb-1">{thumb.icon}</span>
                      <span className="text-[11px] font-mono tracking-widest text-[#fda4af]/60 uppercase">
                        Chapter {ch.id}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#190610] via-transparent to-black/30" />
                  
                  {/* Chapter number badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/15 text-[10px] font-mono text-[#fecdd3]">
                    CH. 0{ch.id}
                  </div>

                  {isCurrent && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#be123c] text-[10px] font-sans font-medium text-white flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5" /> Reading
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#ffe4e6] group-hover:text-[#fb7185] transition-colors leading-snug">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-[#fda4af]/60 mt-1 line-clamp-2">
                      {ch.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-[#fda4af]/50 font-serif italic">
                    <span className="truncate">"{thumb.quote}"</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0c0307]/80 flex items-center justify-between text-xs text-[#fda4af]/60">
          <span>Turning 21 · November 23, 2026</span>
          <button
            onClick={() => setIsArchiveOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-serif transition-colors"
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  );
};
