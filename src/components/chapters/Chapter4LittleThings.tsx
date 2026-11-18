import React, { useState, useEffect } from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { sound } from '../../utils/audio';
import { 
  Sparkles, 
  Music, 
  Image as ImageIcon, 
  Mail, 
  Play, 
  Pause, 
  ExternalLink, 
  X, 
  ChevronRight,
  Eye,
  Upload,
  Plus,
  MessageSquare,
  Smile,
  Edit3
} from 'lucide-react';

type SubSection = 'cats_bunnies' | 'pictures_screenshots' | 'inside_jokes' | 'music' | 'notes';

interface MediaItem {
  id: string;
  type: 'photo' | 'screenshot';
  title: string;
  caption: string;
  imageSrc?: string;
}

interface InsideJoke {
  id: string;
  title: string;
  punchline: string;
  tag: string;
}

interface CustomSong {
  id: number;
  title: string;
  artist: string;
  dedicatedReason: string;
  spotifyUri?: string;
  accentNoteFreq: number;
}

interface SecretNote {
  id: number;
  envelopeTitle: string;
  secretText: string;
  opened: boolean;
}

const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'shot_1',
    type: 'screenshot',
    title: 'The Credit Card Test',
    caption: 'Day 2 or 3 on Discord · "Prove you care by giving me your credit card"',
    imageSrc: undefined
  },
  {
    id: 'shot_2',
    type: 'screenshot',
    title: '"Don\'t Make This Awkward"',
    caption: '"I was trying to create something out of nothing."',
    imageSrc: undefined
  },
  {
    id: 'photo_1',
    type: 'photo',
    title: 'Our Photo Placeholder 1',
    caption: 'Click to upload our first real picture together.',
    imageSrc: '/src/assets/images/storybook_cover_1794071410328.jpg'
  },
  {
    id: 'photo_2',
    type: 'photo',
    title: 'Our Photo Placeholder 2',
    caption: 'Click to upload your favorite memory with her.',
    imageSrc: '/src/assets/images/cake_backdrop_1794071412244.jpg'
  }
];

const DEFAULT_JOKES: InsideJoke[] = [
  {
    id: 'joke_1',
    title: 'The Credit Card Test',
    punchline: 'Testing my dedication on day two by asking for my card numbers. Boldest move in Discord history.',
    tag: 'Classic'
  },
  {
    id: 'joke_2',
    title: 'Briar Tower Diving',
    punchline: 'Zero vision, five enemies, half HP... "I\'m going in, don\'t worry." (Famous last words before ace).',
    tag: 'League'
  },
  {
    id: 'joke_3',
    title: 'The Sleepy Denial',
    punchline: '"I\'m literally not even tired" while yawning so hard the microphone clips.',
    tag: 'Bedtime'
  },
  {
    id: 'joke_4',
    title: 'She Caught Feelings First',
    punchline: 'She can argue about this until our 80th anniversary, but we both know the truth.',
    tag: 'Fact'
  }
];

const DEFAULT_SONGS: CustomSong[] = [
  {
    id: 1,
    title: "About You",
    artist: "The 1975",
    dedicatedReason: "Our music taste overlap that started the whole conversation.",
    spotifyUri: "https://open.spotify.com/track/1P8sqgerhqcpHQIiquk05l",
    accentNoteFreq: 659.25,
  },
  {
    id: 2,
    title: "Song Placeholder 2",
    artist: "[ Artist Placeholder ]",
    dedicatedReason: "[ Click 'Edit Songs' to paste our song title & Spotify link ]",
    spotifyUri: "https://open.spotify.com",
    accentNoteFreq: 783.99,
  },
  {
    id: 3,
    title: "Song Placeholder 3",
    artist: "[ Artist Placeholder ]",
    dedicatedReason: "[ Click 'Edit Songs' to customize this track ]",
    spotifyUri: "https://open.spotify.com",
    accentNoteFreq: 880.00,
  }
];

const DEFAULT_NOTES: SecretNote[] = [
  {
    id: 1,
    envelopeTitle: "When you feel stressed...",
    secretText: "Take a deep breath and tell me what's bugging you. Even if we just sit in quiet on Discord, I'm right here.",
    opened: false,
  },
  {
    id: 2,
    envelopeTitle: "Random honest thought...",
    secretText: "Sometimes when you're super focused or laughing, I just catch myself thinking how crazy lucky I got with you.",
    opened: false,
  },
  {
    id: 3,
    envelopeTitle: "About your laugh...",
    secretText: "Your unfiltered laugh is literally my favourite sound in the world. Makes any bad day disappear immediately.",
    opened: false,
  },
  {
    id: 4,
    envelopeTitle: "For turning 21...",
    secretText: "Happy 21st birthday. I can't wait for everything we're going to do this year.",
    opened: false,
  }
];

export const Chapter4LittleThings: React.FC = () => {
  const { nextChapter } = useBirthday();
  const [activeTab, setActiveTab] = useState<SubSection>('pictures_screenshots');

  // Cats & Bunnies interactive state
  const [catPurrs, setCatPurrs] = useState(0);
  const [catReaction, setCatReaction] = useState<string | null>(null);
  const [bunnyHops, setBunnyHops] = useState(0);
  const [bunnyReaction, setBunnyReaction] = useState<string | null>(null);

  // Media state (persisted)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('bday_media_items_v2');
    return saved ? JSON.parse(saved) : DEFAULT_MEDIA_ITEMS;
  });
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'screenshot'>('all');

  // Jokes state
  const [jokes, setJokes] = useState<InsideJoke[]>(() => {
    const saved = localStorage.getItem('bday_jokes');
    return saved ? JSON.parse(saved) : DEFAULT_JOKES;
  });

  // Songs state
  const [songs, setSongs] = useState<CustomSong[]>(() => {
    const saved = localStorage.getItem('bday_custom_songs');
    return saved ? JSON.parse(saved) : DEFAULT_SONGS;
  });
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);

  // Notes state
  const [notes, setNotes] = useState<SecretNote[]>(() => {
    const saved = localStorage.getItem('bday_secret_notes');
    return saved ? JSON.parse(saved) : DEFAULT_NOTES;
  });

  // Editing state for modals
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [isEditingJokes, setIsEditingJokes] = useState(false);
  const [isEditingSongs, setIsEditingSongs] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Fullscreen Lightbox
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string; title: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('bday_media_items_v2', JSON.stringify(mediaItems));
  }, [mediaItems]);

  useEffect(() => {
    localStorage.setItem('bday_jokes', JSON.stringify(jokes));
  }, [jokes]);

  useEffect(() => {
    localStorage.setItem('bday_custom_songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('bday_secret_notes', JSON.stringify(notes));
  }, [notes]);

  const handleMediaUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setMediaItems(prev =>
          prev.map(m => (m.id === id ? { ...m, imageSrc: result } : m))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePetCat = () => {
    sound.playPurr();
    setCatPurrs(prev => prev + 1);
    const reactions = [
      "*Purrrrr...* The black cat leans right into your hand.",
      "Soft meow: 'Briar mains get infinite chin scratches!' 🐾",
      "Rolls on its back. Cat approved.",
      "Gentle headbump against your palm."
    ];
    setCatReaction(reactions[Math.floor(Math.random() * reactions.length)]);
  };

  const handleTapBunny = () => {
    sound.playHop();
    setBunnyHops(prev => prev + 1);
    const reactions = [
      "*Hop!* Bunny wiggles its nose at you 🌸",
      "Bunny binkies into the air excitedly!",
      "Bunny holds up a fresh strawberry for your birthday 🍓",
      "Ears perk straight up: 'Happy 21st!' ✨"
    ];
    setBunnyReaction(reactions[Math.floor(Math.random() * reactions.length)]);
  };

  const handleToggleSong = (song: CustomSong) => {
    if (playingSongId === song.id) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(song.id);
      sound.playChime(song.accentNoteFreq);
      setTimeout(() => sound.playChime(song.accentNoteFreq * 1.25), 280);
      setTimeout(() => sound.playChime(song.accentNoteFreq * 1.5), 560);
    }
  };

  const handleOpenNote = (id: number) => {
    sound.playPaperRustle();
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, opened: true } : n))
    );
  };

  const filteredMedia = mediaItems.filter(m => {
    if (mediaFilter === 'all') return true;
    return m.type === mediaFilter;
  });

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#080205]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#50071c]/30 via-[#18040d]/60 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f43f5e]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Chapter IV · Personal Keepsakes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] mt-1 tracking-tight">
              The Little Things
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#fda4af]/80 mt-1">
              "Discord screenshots, inside jokes, pictures, our songs, and quiet notes."
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#190610] border border-[#f43f5e]/30 overflow-x-auto">
            <button
              onClick={() => setActiveTab('pictures_screenshots')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors whitespace-nowrap ${
                activeTab === 'pictures_screenshots'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#fda4af]/70 hover:text-white'
              }`}
            >
              <span>📷 Pictures & Screenshots</span>
            </button>
            <button
              onClick={() => setActiveTab('inside_jokes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors whitespace-nowrap ${
                activeTab === 'inside_jokes'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#fda4af]/70 hover:text-white'
              }`}
            >
              <span>😂 Inside Jokes</span>
            </button>
            <button
              onClick={() => setActiveTab('cats_bunnies')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors whitespace-nowrap ${
                activeTab === 'cats_bunnies'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#fda4af]/70 hover:text-white'
              }`}
            >
              <span>🐾 Cats & Bunnies</span>
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors whitespace-nowrap ${
                activeTab === 'music'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#fda4af]/70 hover:text-white'
              }`}
            >
              <span>🎵 Songs</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-colors whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-[#fda4af]/70 hover:text-white'
              }`}
            >
              <span>💌 Little Notes</span>
            </button>
          </div>
        </div>

        {/* Section Contents */}
        <div className="rounded-2xl bg-[#14040d]/90 border border-[#f43f5e]/30 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          {/* 1. PICTURES & DISCORD SCREENSHOTS */}
          {activeTab === 'pictures_screenshots' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe4e6]">
                    Our Pictures & Discord Screenshots
                  </h3>
                  <p className="font-serif italic text-xs text-[#fda4af]/70">
                    Click any snapshot to enlarge and read conversations clearly. Upload your actual files below.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Filter tabs */}
                  <div className="flex p-0.5 rounded-lg bg-[#200714] border border-white/10 text-xs font-mono">
                    <button
                      onClick={() => setMediaFilter('all')}
                      className={`px-2.5 py-1 rounded ${mediaFilter === 'all' ? 'bg-[#881337] text-white' : 'text-white/60'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setMediaFilter('screenshot')}
                      className={`px-2.5 py-1 rounded ${mediaFilter === 'screenshot' ? 'bg-[#5865f2] text-white' : 'text-white/60'}`}
                    >
                      Discord
                    </button>
                    <button
                      onClick={() => setMediaFilter('photo')}
                      className={`px-2.5 py-1 rounded ${mediaFilter === 'photo' ? 'bg-[#881337] text-white' : 'text-white/60'}`}
                    >
                      Photos
                    </button>
                  </div>

                  <button
                    onClick={() => setIsEditingMedia(!isEditingMedia)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a] text-xs text-[#fecdd3]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingMedia ? "Done" : "Edit Captions"}</span>
                  </button>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMedia.map(item => {
                  const isDiscord = item.type === 'screenshot';

                  return (
                    <div
                      key={item.id}
                      className={`group relative rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 ${
                        isDiscord
                          ? 'bg-[#1e1f22] border-[#5865f2]/40 hover:border-[#5865f2]'
                          : 'bg-[#1f0914] border-rose-900/40 hover:border-[#fb7185]'
                      }`}
                    >
                      {/* Media Image or Upload Box */}
                      <div
                        onClick={() => {
                          if (item.imageSrc) {
                            setLightboxImg({
                              src: item.imageSrc,
                              title: item.title,
                              caption: item.caption,
                            });
                          }
                        }}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-black/50 flex items-center justify-center ${
                          item.imageSrc ? 'cursor-pointer' : ''
                        }`}
                      >
                        {item.imageSrc ? (
                          <>
                            <img
                              src={item.imageSrc}
                              alt={item.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 pointer-events-none">
                              <Eye className="w-4 h-4 text-[#fb7185]" />
                              <span>Click to enlarge & read</span>
                            </div>
                          </>
                        ) : (
                          <div className="p-3 text-center flex flex-col items-center gap-1.5">
                            <MessageSquare className="w-6 h-6 text-[#5865f2]" />
                            <span className="text-[11px] font-mono text-stone-400">
                              No screenshot yet
                            </span>
                          </div>
                        )}

                        {/* Upload button overlay */}
                        <label
                          onClick={e => e.stopPropagation()}
                          className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-[#5865f2] text-white transition-colors cursor-pointer"
                          title="Upload / replace screenshot or picture"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleMediaUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Text info */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className={isDiscord ? 'text-[#5865f2] font-semibold' : 'text-[#fb7185]'}>
                            {isDiscord ? 'DISCORD SCREENSHOT' : 'OUR PHOTO'}
                          </span>
                        </div>
                        {isEditingMedia ? (
                          <div className="flex flex-col gap-1 text-xs">
                            <input
                              type="text"
                              value={item.title}
                              onChange={e => {
                                const val = e.target.value;
                                setMediaItems(prev =>
                                  prev.map(m => (m.id === item.id ? { ...m, title: val } : m))
                                );
                              }}
                              className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={item.caption}
                              onChange={e => {
                                const val = e.target.value;
                                setMediaItems(prev =>
                                  prev.map(m => (m.id === item.id ? { ...m, caption: val } : m))
                                );
                              }}
                              className="bg-black/60 border border-white/20 rounded p-1 text-white text-[11px]"
                            />
                          </div>
                        ) : (
                          <>
                            <h4 className="font-serif font-bold text-sm text-[#ffe4e6] leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#fda4af]/70 mt-0.5 line-clamp-2">
                              {item.caption}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. INSIDE JOKES */}
          {activeTab === 'inside_jokes' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe4e6]">
                    Our Inside Jokes & Rituals
                  </h3>
                  <p className="font-serif italic text-xs text-[#fda4af]/70">
                    The stupid, funny, and completely unhinged moments that are 100% ours.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingJokes(!isEditingJokes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a] text-xs text-[#fecdd3]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingJokes ? "Done" : "Customize Jokes"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jokes.map(joke => (
                  <div
                    key={joke.id}
                    className="rounded-xl bg-[#1d0612] border border-[#f43f5e]/30 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#881337]/50 text-[#fecdd3]">
                          {joke.tag}
                        </span>
                        <Smile className="w-4 h-4 text-[#fb7185]" />
                      </div>
                      {isEditingJokes ? (
                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            type="text"
                            value={joke.title}
                            onChange={e => {
                              const val = e.target.value;
                              setJokes(prev =>
                                prev.map(j => (j.id === joke.id ? { ...j, title: val } : j))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                          <textarea
                            rows={3}
                            value={joke.punchline}
                            onChange={e => {
                              const val = e.target.value;
                              setJokes(prev =>
                                prev.map(j => (j.id === joke.id ? { ...j, punchline: val } : j))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="font-serif text-lg font-bold text-[#ffe4e6]">
                            {joke.title}
                          </h4>
                          <p className="text-sm font-sans text-stone-300 mt-2 leading-relaxed">
                            {joke.punchline}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CATS & BUNNIES */}
          {activeTab === 'cats_bunnies' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-mono text-[#fb7185] tracking-widest uppercase">
                  Our Familiars
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffe4e6] mt-1">
                  The Black Cat & The White Bunny
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#fda4af]/70 mt-1">
                  Click on either companion to pet them and hear them react!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Black Cat */}
                <div
                  onClick={handlePetCat}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#220716] to-[#12040b] border border-[#f43f5e]/40 p-6 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] hover:border-[#fb7185] shadow-xl"
                >
                  <div className="w-full flex justify-between items-center text-xs font-mono text-[#fb7185]">
                    <span>Midnight Familiar</span>
                    <span>Purrs: {catPurrs}</span>
                  </div>

                  <div className="my-6 relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#e11d48]/20 blur-xl group-hover:bg-[#fb7185]/30 transition-colors" />
                    <svg viewBox="0 0 120 120" className="w-32 h-32 drop-shadow-xl transition-transform group-hover:scale-110">
                      <ellipse cx="60" cy="75" rx="38" ry="32" fill="#15050e" stroke="#e11d48" strokeWidth="2" />
                      <polygon points="35,42 22,12 50,28" fill="#1e0714" stroke="#e11d48" strokeWidth="2" />
                      <polygon points="36,38 28,18 48,28" fill="#fb7185" opacity="0.6" />
                      <polygon points="85,42 98,12 70,28" fill="#1e0714" stroke="#e11d48" strokeWidth="2" />
                      <polygon points="84,38 92,18 72,28" fill="#fb7185" opacity="0.6" />
                      <circle cx="60" cy="50" r="28" fill="#190612" stroke="#e11d48" strokeWidth="2" />
                      <ellipse cx="49" cy="48" rx="6" ry="8" fill="#10b981" />
                      <ellipse cx="49" cy="48" rx="2" ry="7" fill="#064e3b" />
                      <circle cx="47.5" cy="45" r="2" fill="#ffffff" />
                      <ellipse cx="71" cy="48" rx="6" ry="8" fill="#10b981" />
                      <ellipse cx="71" cy="48" rx="2" ry="7" fill="#064e3b" />
                      <circle cx="69.5" cy="45" r="2" fill="#ffffff" />
                      <polygon points="60,57 57,54 63,54" fill="#fb7185" />
                      <path d="M57 59 Q60 62 63 59" stroke="#fb7185" strokeWidth="1.5" fill="none" />
                      <line x1="42" y1="56" x2="22" y2="52" stroke="#fecdd3" strokeWidth="1" />
                      <line x1="42" y1="60" x2="24" y2="62" stroke="#fecdd3" strokeWidth="1" />
                      <line x1="78" y1="56" x2="98" y2="52" stroke="#fecdd3" strokeWidth="1" />
                      <line x1="78" y1="60" x2="96" y2="62" stroke="#fecdd3" strokeWidth="1" />
                      <rect x="42" y="72" width="36" height="5" rx="2.5" fill="#e11d48" />
                      <circle cx="60" cy="78" r="4.5" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="text-center w-full">
                    <button className="px-4 py-1.5 rounded-full bg-[#881337] group-hover:bg-[#9f1239] text-xs font-serif text-white transition-colors">
                      Pet the Cat 🐾
                    </button>
                    {catReaction && (
                      <p className="mt-2 text-xs font-serif italic text-[#fecdd3] bg-black/40 p-2 rounded-lg border border-[#f43f5e]/20">
                        {catReaction}
                      </p>
                    )}
                  </div>
                </div>

                {/* White Bunny */}
                <div
                  onClick={handleTapBunny}
                  className="group relative rounded-2xl bg-gradient-to-b from-[#220716] to-[#12040b] border border-[#f43f5e]/40 p-6 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] hover:border-[#fb7185] shadow-xl"
                >
                  <div className="w-full flex justify-between items-center text-xs font-mono text-[#fb7185]">
                    <span>Gentle Blossom Familiar</span>
                    <span>Hops: {bunnyHops}</span>
                  </div>

                  <div className="my-6 relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#fb7185]/20 blur-xl group-hover:bg-[#fb7185]/35 transition-colors" />
                    <svg viewBox="0 0 120 120" className="w-32 h-32 drop-shadow-xl transition-transform group-hover:scale-110">
                      <ellipse cx="44" cy="30" rx="9" ry="26" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />
                      <ellipse cx="44" cy="30" rx="5" ry="18" fill="#fda4af" opacity="0.6" />
                      <ellipse cx="76" cy="30" rx="9" ry="26" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />
                      <ellipse cx="76" cy="30" rx="5" ry="18" fill="#fda4af" opacity="0.6" />
                      <ellipse cx="60" cy="85" rx="36" ry="28" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />
                      <circle cx="60" cy="62" r="26" fill="#ffffff" stroke="#fecdd3" strokeWidth="2" />
                      <circle cx="50" cy="58" r="4" fill="#881337" />
                      <circle cx="51.5" cy="56.5" r="1.5" fill="#ffffff" />
                      <circle cx="70" cy="58" r="4" fill="#881337" />
                      <circle cx="71.5" cy="56.5" r="1.5" fill="#ffffff" />
                      <circle cx="42" cy="67" r="5" fill="#f43f5e" opacity="0.4" />
                      <circle cx="78" cy="67" r="5" fill="#f43f5e" opacity="0.4" />
                      <polygon points="60,65 57,62 63,62" fill="#fb7185" />
                      <path d="M57 66 Q60 69 63 66" stroke="#fb7185" strokeWidth="1.5" fill="none" />
                      <path d="M55 86 C55 80, 65 80, 65 86 C65 92, 60 96, 60 96 C60 96, 55 92, 55 86 Z" fill="#e11d48" />
                    </svg>
                  </div>

                  <div className="text-center w-full">
                    <button className="px-4 py-1.5 rounded-full bg-[#881337] group-hover:bg-[#9f1239] text-xs font-serif text-white transition-colors">
                      Tap the Bunny 🐰
                    </button>
                    {bunnyReaction && (
                      <p className="mt-2 text-xs font-serif italic text-[#fecdd3] bg-black/40 p-2 rounded-lg border border-[#f43f5e]/20">
                        {bunnyReaction}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. OUR SONGS */}
          {activeTab === 'music' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe4e6]">
                    Songs That Mean Something To Us
                  </h3>
                  <p className="font-serif italic text-xs text-[#fda4af]/70">
                    Hand-picked tracks that remind me of you. Edit with our exact songs.
                  </p>
                </div>

                <button
                  onClick={() => setIsEditingSongs(!isEditingSongs)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a] text-xs text-[#fecdd3]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingSongs ? "Done" : "Edit Songs"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {songs.map(song => (
                  <div
                    key={song.id}
                    className="rounded-xl border p-4 bg-[#1b0511] border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono text-[#fb7185] uppercase">
                          Track 0{song.id}
                        </span>
                        <button
                          onClick={() => handleToggleSong(song)}
                          className="p-2 rounded-full bg-[#e11d48] hover:bg-[#f43f5e] text-white"
                          title="Play preview tone"
                        >
                          {playingSongId === song.id ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-white" />
                          )}
                        </button>
                      </div>

                      {isEditingSongs ? (
                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            type="text"
                            value={song.title}
                            placeholder="Song Title"
                            onChange={e => {
                              const val = e.target.value;
                              setSongs(prev =>
                                prev.map(s => (s.id === song.id ? { ...s, title: val } : s))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={song.artist}
                            placeholder="Artist"
                            onChange={e => {
                              const val = e.target.value;
                              setSongs(prev =>
                                prev.map(s => (s.id === song.id ? { ...s, artist: val } : s))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                          <textarea
                            rows={2}
                            value={song.dedicatedReason}
                            placeholder="Why this song is meaningful"
                            onChange={e => {
                              const val = e.target.value;
                              setSongs(prev =>
                                prev.map(s => (s.id === song.id ? { ...s, dedicatedReason: val } : s))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={song.spotifyUri || ''}
                            placeholder="Spotify Link"
                            onChange={e => {
                              const val = e.target.value;
                              setSongs(prev =>
                                prev.map(s => (s.id === song.id ? { ...s, spotifyUri: val } : s))
                              );
                            }}
                            className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="font-serif text-lg font-bold text-[#ffe4e6] mt-2">
                            {song.title}
                          </h4>
                          <p className="text-xs text-[#fda4af]/80">by {song.artist}</p>
                          <p className="font-serif italic text-xs text-[#fecdd3] mt-3">
                            "{song.dedicatedReason}"
                          </p>
                        </>
                      )}
                    </div>

                    {song.spotifyUri && (
                      <div className="mt-4 pt-2 border-t border-white/10 flex justify-end">
                        <a
                          href={song.spotifyUri}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-[#fda4af] hover:text-white flex items-center gap-1"
                        >
                          <span>Open Spotify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. LITTLE NOTES */}
          {activeTab === 'notes' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe4e6]">
                    Sealed Envelopes & Little Notes
                  </h3>
                  <p className="font-serif italic text-xs text-[#fda4af]/70">
                    Click each wax-sealed envelope to unseal the secret note inside.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a] text-xs text-[#fecdd3]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingNotes ? "Done" : "Edit Messages"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => handleOpenNote(note.id)}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                      note.opened
                        ? 'bg-[#2b0a1a] border-[#fb7185] shadow-lg'
                        : 'bg-[#18050f] border-white/15 hover:border-[#f43f5e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className={`w-4 h-4 ${note.opened ? 'text-[#fb7185]' : 'text-white/40'}`} />
                        <span className="text-xs font-mono text-[#fda4af] uppercase tracking-wider">
                          {note.envelopeTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                        {note.opened ? "Opened" : "Click to Unseal"}
                      </span>
                    </div>

                    {isEditingNotes ? (
                      <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          value={note.envelopeTitle}
                          onChange={e => {
                            const val = e.target.value;
                            setNotes(prev =>
                              prev.map(n => (n.id === note.id ? { ...n, envelopeTitle: val } : n))
                            );
                          }}
                          className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                        />
                        <textarea
                          rows={3}
                          value={note.secretText}
                          onChange={e => {
                            const val = e.target.value;
                            setNotes(prev =>
                              prev.map(n => (n.id === note.id ? { ...n, secretText: val } : n))
                            );
                          }}
                          className="bg-black/60 border border-white/20 rounded p-1 text-white text-xs"
                        />
                      </div>
                    ) : note.opened ? (
                      <div className="p-3.5 rounded-xl bg-[#15040d] border border-[#f43f5e]/30 font-serif italic text-sm text-[#ffe4e6] leading-relaxed animate-in fade-in slide-in-from-top-1">
                        "{note.secretText}"
                      </div>
                    ) : (
                      <div className="h-16 flex items-center justify-center rounded-xl bg-black/40 border border-dashed border-white/15 text-xs text-white/40 font-serif italic">
                        Wax stamp intact · Click to reveal
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Chapter Bar */}
        <div className="flex justify-end pt-2">
          <button
            onClick={nextChapter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-md"
          >
            <span>Proceed To Chapter V · The Quiz (10 Questions)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Screenshots and Photos */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#1a1b1e] border border-[#5865f2]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-[#2b2d31] border-b border-white/10">
              <div>
                <h4 className="font-sans font-semibold text-white text-sm sm:text-base">
                  {lightboxImg.title}
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  {lightboxImg.caption}
                </p>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="p-1.5 rounded-lg bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-1 flex items-center justify-center overflow-auto bg-[#1e1f22]">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
