import React, { useState } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Maximize2, 
  X,
  CreditCard,
  Heart,
  Smile
} from 'lucide-react';

interface StoryScene {
  id: number;
  badge: string;
  title: string;
  body: string[];
  callout?: string;
  screenshotLabel: string;
  screenshotPlaceholderText: string;
  screenshotKey: string;
}

const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    badge: "The Opening Move",
    title: "our first time meeting",
    body: [
      "It all started with a mutual friend.",
      "He knew how much I loved music, especially japanese of music, and told me he knew someone who was pretty much like me. Same interests, same hobbies, similar personality etc etc. He thought we'd get along, so he told me to go for it.",
      "So I got your Discord. And then... I had absolutely no idea what to say.",
      "I eventually went with:",
      "\"Hi, how are you doing? I just wanted to know where your profile picture is from, if you don't mind me asking.\"",
      "And you immediately saw through me.",
      "\"Haha, that's so funny. It's Berserk.\"",
      "The funny part? I couldn't have cared less about your profile picture. I just wanted to talk to you. I needed an excuse, and apparently, that was the best I could come up with."
    ],
    callout: "\"Haha, that's so funny. It's Berserk.\" — I just wanted an excuse to talk to you.",
    screenshotLabel: "Her Berserk Profile Picture Placeholder",
    screenshotPlaceholderText: "Her original Berserk profile picture reference placeholder.\nClick to upload the actual image.",
    screenshotKey: "pfp"
  },
  {
    id: 2,
    badge: "The Awkward Start",
    title: "Creating Something Out of Nothing",
    body: [
      "My first impression of you was that you were confusing, funny, unpredictable, and especially daring. you had no filters",
      "You just said whatever came to mind. You genuinely didn't seem to care what I would think, and id never spoken to someone quite like you before.",
      "You'd casually come out with things like \"Oh, let me peg you\" or \"Do you like pegging?\" or \"Do you like sounding u faggot\"",
      "It was weird, unexpected, and somehow really funny. I don't know, there was just something about the way you talked that stuck with me.",
      "But the beginning was also awkward. Really awkward.",
      "I kept trying to figure out whether you actually wanted to talk to me, whether you wanted to be friends, or whether you were just replying because I kept texting you.",
      "And you weren't exactly making it easy for me either. Sometimes I genuinely felt like I was carrying the entire conversation.",
      "I remember thinking that I was trying to create something out of nothing.",
      "And somehow, despite all that, I kept coming back.",
      "Definitely a memorable beginning."
    ],
    callout: "\"I remember thinking that I was trying to create something out of nothing. And somehow, despite all that, I kept coming back.\"",
    screenshotLabel: "Discord Screenshot: The Awkward Talk",
    screenshotPlaceholderText: "Discord screenshot slot:\n'Don't make this awkward' & 'create something out of nothing' chat.\nClick to upload screenshot.",
    screenshotKey: "awkward_chat"
  },
  {
    id: 3,
    badge: "Day Two or Three",
    title: "The Credit Card Test",
    body: [
      "So, on this screenshot, you can see that I told you that we would make a good duo, just like in League.",
      "And you told me, \"I'll pass, I don't work with fags.\" 😭 ( u ended up dating the fag )",
      "I really thought you were dominant at the time. Like, not as submissive as you are right now.",
      "And directly after that, you said \"u said u would give me everything.\"",
      "And yeah, you wanted my credit card, which is memorable",
      "You were funny, and you're still funny. You're beautiful. I love you."
    ],
    callout: "\"u said u would give me everything.\" — And yeah, you wanted my credit card.",
    screenshotLabel: "Discord Screenshot: The Credit Card Joke",
    screenshotPlaceholderText: "Discord screenshot slot:\nThe credit-card joke conversation.\nClick to upload screenshot.",
    screenshotKey: "credit_card_chat"
  }
];

export const Chapter2Beginning: React.FC = () => {
  const { nextChapter } = useBirthday();
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  // Stored screenshots (persisted in localStorage for easy replacement)
  const [screenshots, setScreenshots] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('bday_discord_screenshots');
    return saved ? JSON.parse(saved) : {};
  });

  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  const scene = STORY_SCENES[activeSceneIdx];

  const handleImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setScreenshots(prev => {
          const next = { ...prev, [key]: result };
          localStorage.setItem('bday_discord_screenshots', JSON.stringify(next));
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson visual novel atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/storybook_cover_1794071410328.jpg"
          alt="Atmospheric Desk"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#1a0510]/85 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f43f5e]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Chapter II · Origin Story</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] mt-1 tracking-tight">
              How We Met
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#fda4af]/80 mt-1">
              "A mutual friend, a fake excuse about a profile picture, and an awkwardly perfect beginning."
            </p>
          </div>

          {/* Scene Stepper Indicator */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1a0610] border border-[#f43f5e]/30">
            {STORY_SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSceneIdx(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeSceneIdx === idx
                    ? 'bg-[#881337] text-white font-bold shadow-sm'
                    : 'text-[#fda4af]/60 hover:text-white'
                }`}
              >
                0{s.id}
              </button>
            ))}
          </div>
        </div>

        {/* Scene Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl bg-[#14040d]/90 border border-[#f43f5e]/30 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          {/* Left Column: Dedicated Screenshot / Discord Slot (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#fb7185] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{scene.screenshotLabel}</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">Discord Archive</span>
            </div>

            {/* Screenshot Container Frame */}
            <div className="relative group rounded-xl overflow-hidden bg-[#1e1f22] border border-[#5865f2]/40 shadow-xl aspect-[4/3] flex items-center justify-center">
              {screenshots[scene.screenshotKey] ? (
                <div className="relative w-full h-full">
                  <img
                    src={screenshots[scene.screenshotKey]}
                    alt={scene.screenshotLabel}
                    className="w-full h-full object-contain bg-[#2b2d31]"
                  />
                  {/* Hover Actions: Enlarge & Replace */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        setLightboxImg({
                          src: screenshots[scene.screenshotKey],
                          title: scene.screenshotLabel,
                        })
                      }
                      className="p-2.5 rounded-full bg-[#5865f2] hover:bg-[#4752c4] text-white transition-transform active:scale-90"
                      title="Open full view"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <label className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-transform active:scale-90 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(scene.screenshotKey, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                /* Styled Discord Frame Placeholder */
                <label className="w-full h-full p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#2b2d31] transition-colors border-2 border-dashed border-[#5865f2]/30 rounded-xl m-2">
                  <div className="p-3 rounded-full bg-[#5865f2]/20 text-[#5865f2] mb-3 group-hover:scale-110 transition-transform">
                    {scene.id === 3 ? (
                      <CreditCard className="w-6 h-6 text-[#fb7185]" />
                    ) : (
                      <MessageSquare className="w-6 h-6 text-[#5865f2]" />
                    )}
                  </div>
                  <p className="text-xs font-mono text-stone-300 whitespace-pre-line leading-relaxed">
                    {scene.screenshotPlaceholderText}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#5865f2] hover:bg-[#4752c4] text-[11px] font-sans font-medium text-white transition-colors shadow">
                    <Upload className="w-3 h-3" />
                    <span>Upload Screenshot</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(scene.screenshotKey, e)}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-[11px] font-mono text-[#fda4af]/60 italic text-center">
              Dedicated spot for our real chat screenshot · Click to enlarge or replace
            </p>
          </div>

          {/* Right Column: Natural Story Prose & Dialogue (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-[#f43f5e]/20 lg:pl-8 pt-6 lg:pt-0">
            <div className="flex flex-col gap-5">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#881337]/50 border border-[#f43f5e]/30 text-[11px] font-mono text-[#fecdd3]">
                  {scene.badge} · Scene {activeSceneIdx + 1} of {STORY_SCENES.length}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffe4e6] mt-2">
                  {scene.title}
                </h3>
              </div>

              {/* Natural Prose Paragraphs */}
              <div className="flex flex-col gap-3 font-sans text-stone-200 text-sm sm:text-base leading-relaxed">
                {scene.body.map((p, pIdx) => (
                  <p key={pIdx} className="tracking-wide">
                    {p}
                  </p>
                ))}
              </div>

              {/* Callout Quote */}
              {scene.callout && (
                <div className="rounded-xl bg-[#230816]/70 border-l-4 border-[#e11d48] p-4 text-[#fecdd3] font-serif italic text-sm sm:text-base">
                  {scene.callout}
                </div>
              )}
            </div>

            {/* Scene Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <button
                disabled={activeSceneIdx === 0}
                onClick={() => setActiveSceneIdx(prev => prev - 1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors ${
                  activeSceneIdx > 0
                    ? 'text-[#fda4af] hover:text-white bg-white/5 hover:bg-white/10'
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Scene</span>
              </button>

              {activeSceneIdx < STORY_SCENES.length - 1 ? (
                <button
                  onClick={() => setActiveSceneIdx(prev => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-serif transition-all shadow-md"
                >
                  <span>Next Scene</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={nextChapter}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-md"
                >
                  <span>Continue to Our Journey</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1e1f22] border border-[#5865f2]/40 rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center"
          >
            <div className="w-full flex justify-between items-center pb-3 border-b border-white/10 mb-3">
              <span className="font-mono text-xs text-white/80">{lightboxImg.title}</span>
              <button
                onClick={() => setLightboxImg(null)}
                className="p-1 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={lightboxImg.src}
              alt="Discord Screenshot"
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
