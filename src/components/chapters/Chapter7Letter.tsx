import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { sound } from '../../utils/audio';
import { Sparkles, Mail, Heart, Edit3, ChevronRight, RotateCcw } from 'lucide-react';

const DEFAULT_LETTER_TEXT = `Hey,

Happy 21st birthday.

I still laugh thinking about how this all started. Some mutual friend mentioning you had good music taste, me awkwardly adding your Discord with zero clue what to say, and then panicking with: "I really like your profile picture. Where's it from?"

I really didn't care about the picture at all. I just wanted an excuse to talk to you.

And even when things were painfully awkward and you told me not to make it weird, I knew I wanted you in my life. You were funny, unpredictable, and completely comfortable saying whatever was on your mind. Then on day two or three you literally asked for my credit card to prove I cared. That was the moment I knew you were something else.

And for the record: you definitely got attached first. Don't even try to deny it.

Fast forward to now, and you're turning 21 today. Seeing you grow, hearing that unhinged real laugh of yours, watching you dive into enemy towers on Briar, and just being close to you is my favourite part of life. When you fall asleep talking to me or lean against my chest, everything feels right.

I'm really lucky to have you. Seriously.

I hope 21 brings you everything you want and more. I'll be right here cheering for you, teasing you, getting you food when you're stressed, and reminding you every day how much you mean to me.

Happy birthday, beautiful. Love you.`;

export const Chapter7Letter: React.FC = () => {
  const { nextChapter, envelopeOpen, openEnvelope, resetEnvelope } = useBirthday();
  const [letterText, setLetterText] = useState(DEFAULT_LETTER_TEXT);
  const [isEditing, setIsEditing] = useState(false);

  const handleWaxClick = () => {
    openEnvelope();
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/storybook_cover_1794071410328.jpg"
          alt="Vintage Desk"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#1a0510]/85 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="text-center w-full flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#f43f5e]/20 pb-4 gap-3">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Chapter VII · Intimate Words</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] mt-1 tracking-tight">
              The Birthday Letter
            </h2>
            <p className="font-serif italic text-sm text-[#fda4af]/70 mt-1">
              "Wax-sealed and penned just for your 21st milestone."
            </p>
          </div>

          {envelopeOpen && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a]/60 hover:bg-[#431029] text-xs text-[#fecdd3] transition-all self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>{isEditing ? "Save & View Letter" : "Edit Letter Text"}</span>
            </button>
          )}
        </div>

        {/* Sealed Envelope State */}
        {!envelopeOpen ? (
          <div
            onClick={handleWaxClick}
            className="group relative cursor-pointer my-6 w-full max-w-md aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#2a0e1c] via-[#1a0610] to-[#10030a] border-2 border-[#fb7185]/40 shadow-[0_20px_50px_rgba(244,63,94,0.25)] hover:shadow-[0_25px_60px_rgba(244,63,94,0.4)] p-8 flex flex-col items-center justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Top Envelope Flap Shadow */}
            <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none">
              <div className="w-full h-full border-b-2 border-[#fb7185]/20 bg-[#351224]/30 transform -skew-y-3 origin-top-left" />
            </div>

            <div className="w-full flex justify-between items-center text-xs font-mono text-[#fda4af]/60">
              <span className="tracking-widest uppercase">To: My Favorite Person</span>
              <span>Nov 23, 2026</span>
            </div>

            {/* Red Wax Seal Stamp with Cat / Heart Emblem */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#dc2626] via-[#991b1b] to-[#450a0a] border-2 border-[#f87171] shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center transition-transform group-hover:scale-110">
                {/* Wax irregular drip edge */}
                <div className="absolute -inset-1 rounded-full bg-[#b91c1c]/40 blur-xs" />
                <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow">
                  {/* Wax Seal Heart & Cat Ears */}
                  <path
                    d="M10 12 L14 18 C15.5 17 18 16.5 20 16.5 C22 16.5 24.5 17 26 18 L30 12 L29 19 C31 21 32 24 32 27 C32 32 26 35 20 35 C14 35 8 32 8 27 C8 24 9 21 11 19 Z"
                    fill="#450a0a"
                    stroke="#fca5a5"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M17 25 C15 22, 13 26, 20 31 C27 26, 25 22, 23 25 Z"
                    fill="#fca5a5"
                  />
                </svg>
              </div>
              <span className="mt-3 font-serif italic text-xs text-[#fecdd3] group-hover:text-white transition-colors">
                Click wax seal to break & unfold letter
              </span>
            </div>

            <div className="w-full text-center text-[11px] font-mono text-[#fb7185]/70 tracking-widest uppercase">
              Sealed with eternal devotion · Turning 21
            </div>
          </div>
        ) : (
          /* Unfolded Letter on Aged Parchment */
          <div className="w-full rounded-2xl bg-[#fffbf2] text-stone-900 border-4 border-[#e2d5c3] shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 flex flex-col gap-6 animate-in zoom-in-95 duration-700 relative overflow-hidden">
            {/* Parchment inner gold hairline border */}
            <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none rounded-xl" />

            {/* Vintage Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="font-mono text-xs text-stone-500 tracking-widest uppercase">
                November 23, 2026 · On Your 21st Birthday
              </span>
              <Heart className="w-4 h-4 text-[#e11d48] fill-[#e11d48]" />
            </div>

            {/* Letter Content or Editor */}
            {isEditing ? (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono text-stone-600">
                  Paste or write your personal letter below:
                </span>
                <textarea
                  rows={14}
                  value={letterText}
                  onChange={e => setLetterText(e.target.value)}
                  className="w-full p-4 rounded-lg bg-stone-50 border border-stone-300 font-serif text-base text-stone-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <div className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed whitespace-pre-line tracking-wide">
                  {letterText}
                </div>
              </div>
            )}

            {/* Letter Footer Signature */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-stone-600 font-serif italic text-sm">
              <button
                onClick={resetEnvelope}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-seal in envelope</span>
              </button>

              <button
                onClick={nextChapter}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-xs font-serif font-medium hover:shadow-lg transition-all"
              >
                <span>Continue to The Final Surprise</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
