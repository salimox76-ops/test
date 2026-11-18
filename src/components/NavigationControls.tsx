import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  MousePointer, 
  Heart
} from 'lucide-react';

export const CHAPTER_METADATA = [
  { id: 1, title: "The Entrance", subtitle: "Something waiting for you" },
  { id: 2, title: "How We Met", subtitle: "The profile picture excuse & Discord" },
  { id: 3, title: "Our Journey", subtitle: "Everything we've been through" },
  { id: 4, title: "The Little Things", subtitle: "Screenshots, inside jokes & songs" },
  { id: 5, title: "A Little Quiz", subtitle: "10 questions about us" },
  { id: 6, title: "The Birthday Cake", subtitle: "21 candles to blow out" },
  { id: 7, title: "The Letter", subtitle: "A message from me to you" },
  { id: 8, title: "The Final Surprise", subtitle: "Happy 21st Birthday" },
];

export const NavigationControls: React.FC = () => {
  const {
    currentChapter,
    nextChapter,
    prevChapter,
    goToChapter,
    isMuted,
    toggleMute,
    isCatCursorActive,
    toggleCatCursor,
    isArchiveOpen,
    setIsArchiveOpen,
  } = useBirthday();

  const currentMeta = CHAPTER_METADATA[currentChapter - 1] || CHAPTER_METADATA[0];

  return (
    <>
      {/* Top Bar — Cinematic, discreet, dark burgundy aesthetic */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-gradient-to-b from-[#080305]/90 via-[#080305]/60 to-transparent backdrop-blur-sm pointer-events-auto">
        {/* Left: Brand title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToChapter(1)}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="font-serif italic text-lg sm:text-xl font-semibold tracking-wide text-[#fce7f3] group-hover:text-[#fb7185] transition-colors">
              To 21
            </span>
            <span className="hidden sm:inline text-xs tracking-widest uppercase text-[#9f1239] font-mono">
              · Nov 23, 2026
            </span>
          </button>
        </div>

        {/* Center: Discreet Chapter Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5">
            {CHAPTER_METADATA.map(ch => (
              <button
                key={ch.id}
                onClick={() => goToChapter(ch.id)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  ch.id === currentChapter
                    ? 'w-6 bg-[#fb7185]'
                    : ch.id < currentChapter
                    ? 'w-2 bg-[#be123c]/60 hover:bg-[#be123c]'
                    : 'w-2 bg-[#4c0519]/40 hover:bg-[#9f1239]'
                }`}
                title={`Chapter ${ch.id}: ${ch.title}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono tracking-widest text-[#f43f5e] font-medium">
            {currentChapter.toString().padStart(2, '0')} / 08
          </span>
          <span className="text-xs text-[#fda4af]/80 hidden lg:inline font-serif italic">
            — {currentMeta.title}
          </span>
        </div>

        {/* Right: Sound, Cursor & Archive Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
              !isMuted
                ? 'bg-[#881337]/40 border-[#f43f5e]/50 text-[#fecdd3] shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-[#1a060e]/60 border-white/10 text-white/60 hover:text-white hover:border-white/20'
            }`}
            title={!isMuted ? "Mute music & ambient sounds" : "Unmute romantic music box & sounds"}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-[#fb7185]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-mono text-[11px]">{!isMuted ? "Sound On" : "Sound Off"}</span>
          </button>

          {/* Cat Cursor Toggle */}
          <button
            onClick={toggleCatCursor}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
              isCatCursorActive
                ? 'bg-[#881337]/30 border-[#f43f5e]/40 text-[#fecdd3]'
                : 'bg-[#1a060e]/60 border-white/10 text-white/50 hover:text-white'
            }`}
            title="Toggle Cat Paw Cursor"
          >
            <MousePointer className="w-3.5 h-3.5 text-[#fda4af]" />
            <span className="text-[11px] font-mono">Paw</span>
          </button>

          {/* Chapter Archive Toggle */}
          <button
            onClick={() => setIsArchiveOpen(!isArchiveOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#881337]/70 to-[#4c0519]/70 hover:from-[#9f1239] hover:to-[#881337] border border-[#f43f5e]/40 text-xs text-white transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#fda4af]" />
            <span className="font-serif tracking-wide text-xs">Archive</span>
          </button>
        </div>
      </header>

      {/* Floating Side Arrow Navigation (Desktop) */}
      {currentChapter > 1 && (
        <button
          onClick={prevChapter}
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#1c0812]/70 hover:bg-[#3f0f22]/90 border border-[#f43f5e]/30 text-[#fda4af] hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 group backdrop-blur-sm"
          title="Previous Chapter (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {currentChapter < 8 && (
        <button
          onClick={nextChapter}
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#1c0812]/70 hover:bg-[#3f0f22]/90 border border-[#f43f5e]/30 text-[#fda4af] hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 group backdrop-blur-sm"
          title="Next Chapter (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Bottom Bar — Discreet Navigation & Progress */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-2.5 bg-gradient-to-t from-[#080305]/95 via-[#080305]/70 to-transparent backdrop-blur-sm pointer-events-auto">
        {/* Previous Button */}
        <div>
          {currentChapter > 1 ? (
            <button
              onClick={prevChapter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif text-[#fda4af]/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Ch. {currentChapter - 1}: {CHAPTER_METADATA[currentChapter - 2].title}</span>
            </button>
          ) : (
            <span className="text-[11px] text-[#9f1239] font-mono tracking-wider flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#f43f5e]" /> Chapter I
            </span>
          )}
        </div>

        {/* Center: Keyboard hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/40">
          <span>Use</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 text-[10px]">→</kbd>
          <span>to navigate</span>
        </div>

        {/* Next Button */}
        <div>
          {currentChapter < 8 ? (
            <button
              onClick={nextChapter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif text-[#fda4af]/90 hover:text-white hover:bg-[#881337]/40 border border-[#f43f5e]/30 transition-all shadow-sm"
            >
              <span>Next: {CHAPTER_METADATA[currentChapter].title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif text-[#fecdd3] hover:text-white bg-[#881337]/50 border border-[#f43f5e]/50 transition-all"
            >
              <span>View Chapter Archive</span>
              <BookOpen className="w-3.5 h-3.5 text-[#fb7185]" />
            </button>
          )}
        </div>
      </footer>
    </>
  );
};
