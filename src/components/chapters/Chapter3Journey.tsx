import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { Sparkles, Shield, Heart, Compass, ChevronRight, Edit3 } from 'lucide-react';

interface JourneyMilestone {
  category: string;
  badgeIcon: string;
  title: string;
  timeframe: string;
  story: string;
  reflection: string;
  lesson: string;
}

const DEFAULT_MILESTONES: JourneyMilestone[] = [
  {
    category: "Milestone 1",
    badgeIcon: "💬",
    title: "Late Night Calls & No Sleep",
    timeframe: "[ Memory Placeholder ]",
    story:
      "We went from that awkward first message to talking until 4 AM almost every night. Neither of us wanted to hang up first, even when we had to wake up early the next day.",
    reflection:
      "It became obvious pretty quickly that talking to you was the highlight of my day.",
    lesson: "What I learned: When you find someone you actually want to talk to for hours, you hold on to them."
  },
  {
    category: "Milestone 2",
    badgeIcon: "🛡️",
    title: "Handling Bad Days Together",
    timeframe: "[ Memory Placeholder ]",
    story:
      "Whenever one of us was stressed out, tired, or in a terrible mood, we learned how to deal with it. No drama, just being there, listening, and giving each other space when needed.",
    reflection:
      "Being able to talk through things without making it weird proved we're an actual team.",
    lesson: "What I learned: Having someone who has your back when things get frustrating is everything."
  },
  {
    category: "Milestone 3",
    badgeIcon: "🎮",
    title: "Games, Calls & Normal Life",
    timeframe: "[ Daily Life Placeholder ]",
    story:
      "All the small stuff: screensharing on Discord, you yelling at your Briar games, sending each other dumb memes, and arguing about who's ordering what food.",
    reflection:
      "Honestly, the random ordinary days are the ones I like most.",
    lesson: "What I learned: You don't need fancy plans when you're with the right person."
  },
  {
    category: "Milestone 4",
    badgeIcon: "🎂",
    title: "Turning 21",
    timeframe: "November 23, 2026",
    story:
      "And now you're officially 21. Seeing how much we've both grown since that first awkward text is crazy to think about. I'm really proud of who you are.",
    reflection:
      "You're turning 21, and I'm just happy I get to be here celebrating with you.",
    lesson: "What I learned: You're my favourite person, and that hasn't changed for a second."
  }
];

export const Chapter3Journey: React.FC = () => {
  const { nextChapter } = useBirthday();
  const [activeIdx, setActiveIdx] = useState(0);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(DEFAULT_MILESTONES);
  const [isEditing, setIsEditing] = useState(false);

  const current = milestones[activeIdx];

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#080205]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4c0519]/40 via-[#18040d]/60 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f43f5e]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Chapter III · Our Odyssey</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] mt-1 tracking-tight">
              Our Journey Together
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#fda4af]/70 mt-1">
              "The chapters we’ve lived, the storms we weathered, and the bond that only grew deeper."
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a]/60 hover:bg-[#431029] text-xs text-[#fecdd3] transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#fb7185]" />
            <span>{isEditing ? "Done Editing" : "Personalize Notes"}</span>
          </button>
        </div>

        {/* Milestone Steps Carousel Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                activeIdx === idx
                  ? 'bg-gradient-to-br from-[#881337] to-[#4c0519] border-[#fb7185] text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]'
                  : 'bg-[#15040d]/80 border-white/10 text-[#fda4af]/70 hover:bg-[#200714] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{m.badgeIcon}</span>
                <span className="text-[10px] font-mono text-[#fb7185] uppercase">
                  {m.category}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-serif font-semibold truncate text-[#ffe4e6]">
                {m.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Milestone Hero Card */}
        <div className="rounded-2xl bg-[#13030b]/90 border border-[#f43f5e]/30 backdrop-blur-md p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          {isEditing ? (
            /* Editing form */
            <div className="flex flex-col gap-4 text-xs">
              <span className="font-mono text-[#fb7185] uppercase tracking-wider">
                Editing Milestone: {current.title}
              </span>
              <div>
                <label className="text-white/60 block mb-1">Milestone Title:</label>
                <input
                  type="text"
                  value={current.title}
                  onChange={e => {
                    const next = [...milestones];
                    next[activeIdx].title = e.target.value;
                    setMilestones(next);
                  }}
                  className="w-full bg-[#1b0511] border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-white/60 block mb-1">Timeframe / Date:</label>
                <input
                  type="text"
                  value={current.timeframe}
                  onChange={e => {
                    const next = [...milestones];
                    next[activeIdx].timeframe = e.target.value;
                    setMilestones(next);
                  }}
                  className="w-full bg-[#1b0511] border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-white/60 block mb-1">Story & Memory:</label>
                <textarea
                  rows={4}
                  value={current.story}
                  onChange={e => {
                    const next = [...milestones];
                    next[activeIdx].story = e.target.value;
                    setMilestones(next);
                  }}
                  className="w-full bg-[#1b0511] border border-white/20 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-white/60 block mb-1">What this taught us / Reflection:</label>
                <textarea
                  rows={3}
                  value={current.lesson}
                  onChange={e => {
                    const next = [...milestones];
                    next[activeIdx].lesson = e.target.value;
                    setMilestones(next);
                  }}
                  className="w-full bg-[#1b0511] border border-white/20 rounded p-2 text-white"
                />
              </div>
            </div>
          ) : (
            /* Cinematic View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Story Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#881337]/50 border border-[#f43f5e]/30 text-[11px] font-mono text-[#fecdd3]">
                    {current.category}
                  </span>
                  <span className="text-xs font-mono text-[#fda4af]/60">
                    {current.timeframe}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffe4e6] leading-snug">
                  {current.title}
                </h3>

                <p className="font-serif text-base sm:text-lg text-[#fce7f3]/90 leading-relaxed pt-2">
                  {current.story}
                </p>

                <div className="pt-2">
                  <div className="font-serif italic text-sm text-[#fda4af] pl-4 border-l-2 border-[#e11d48]">
                    "{current.reflection}"
                  </div>
                </div>
              </div>

              {/* Reflection & Key Lesson Box (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-xl bg-[#230716]/60 border border-[#f43f5e]/30 p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#fb7185]" />
                    <span>What We Discovered</span>
                  </div>
                  <p className="font-serif italic text-sm sm:text-base text-[#ffe4e6] leading-relaxed">
                    {current.lesson}
                  </p>
                </div>

                <div className="rounded-xl bg-[#18040e]/60 border border-white/10 p-5 flex items-center gap-4">
                  <div className="p-3 rounded-full bg-[#881337]/30 text-[#fb7185] shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/50 uppercase">Teamwork Promise</div>
                    <div className="font-serif text-xs sm:text-sm text-[#fda4af] mt-0.5">
                      "Side by side through every level, every boss fight, every sunrise."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Card Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#fda4af]/60">
              <Heart className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Milestone {activeIdx + 1} of {milestones.length}</span>
            </div>

            {activeIdx < milestones.length - 1 ? (
              <button
                onClick={() => setActiveIdx(prev => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-serif transition-colors"
              >
                <span>Next Milestone</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextChapter}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-md"
              >
                <span>Continue To The Little Things</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
