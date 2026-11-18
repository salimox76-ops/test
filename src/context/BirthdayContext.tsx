import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctMessage: string;
  wrongMessage: string;
}

export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Be completely honest: who actually caught feelings first?",
    options: [
      "You did (and it wasn't even close)",
      "I did, obviously",
      "It happened at the exact same second",
      "Our mutual friend forced us into it"
    ],
    correctIndex: 0,
    correctMessage: "Exactly. You got attached first. Don't even try to argue about this one.",
    wrongMessage: "Nice try, but you know you got attached first. We both remember it."
  },
  {
    id: 2,
    question: "Who is your undisputed, chaotic main champion in League of Legends?",
    options: [
      "Briar (no thoughts, just diving into towers)",
      "Jinx (running around with rockets)",
      "Ahri (charm into full combo)",
      "Yuumi (staying AFK on someone's shoulder)"
    ],
    correctIndex: 0,
    correctMessage: "Briar, always. Running into the whole enemy team with zero fear and 100% frenzy.",
    wrongMessage: "Wait, are you trolling? You play Briar like your life depends on it."
  },
  {
    id: 3,
    question: "What was the very first thing I ever texted you on Discord?",
    options: [
      "\"Hi, how are you doing? I just wanted to know where your profile picture is from, if you don't mind me asking.\"",
      "\"Hey, our friend told me you like the same music as me.\"",
      "\"Can you carry me in League?\"",
      "\"I had no idea what to say, so hi.\""
    ],
    correctIndex: 0,
    correctMessage: "Yup! And you saw right through me: \"Haha, that's so funny. It's Berserk.\" I just needed an excuse to talk to you.",
    wrongMessage: "Nope! I went with: \"Hi, how are you doing? I just wanted to know where your profile picture is from...\""
  },
  {
    id: 4,
    question: "On like day two or three of talking, how did you suggest I prove that I cared?",
    options: [
      "By giving you my credit card details",
      "By buying you a Discord Nitro subscription",
      "By writing a five-paragraph essay about you",
      "By sending you an embarrassing selfie"
    ],
    correctIndex: 0,
    correctMessage: "Haha yes! You casually asked for my credit card. Boldest move I'd ever seen.",
    wrongMessage: "Nope, you straight up asked for my credit card to prove I cared. Classic you."
  },
  {
    id: 5,
    question: "When things were still painfully awkward at the start, what did I tell you I was trying to do?",
    options: [
      "\"I'm trying to create something out of nothing.\"",
      "\"I'm just trying to make a friend here.\"",
      "\"I don't even know what we are doing.\"",
      "\"I'm trying not to mess this up.\""
    ],
    correctIndex: 0,
    correctMessage: "\"Trying to create something out of nothing.\" And look at what it turned into.",
    wrongMessage: "Nope! You told me 'don't make this awkward' and I said I was trying to create something out of nothing."
  },
  {
    id: 6,
    question: "What's something you do that drives me crazy, but I secretly love?",
    options: [
      "When you pretend you're not sleepy while literally nodding off",
      "When you blame lag every single time you die in game",
      "When you steal my clothes and act like they were always yours",
      "When you send me 15 reels in a row without saying anything"
    ],
    correctIndex: 0,
    correctMessage: "You'll swear you're wide awake with your eyes half-closed. It's the cutest thing ever.",
    wrongMessage: "That's funny too, but you denying you're sleepy while yawning every 10 seconds is unbeatable."
  },
  {
    id: 7,
    question: "If we had an entire day completely alone with zero plans or distractions, what would I want us to do?",
    options: [
      "Stay in bed together all day, order food, and forget the rest of the world exists",
      "Go on a packed 12-hour road trip with an itinerary",
      "Spend 8 hours straight grinding ranked games",
      "Go to a crowded party"
    ],
    correctIndex: 0,
    correctMessage: "100%. Just us, zero noise, blankets, snacks, and nowhere else to be.",
    wrongMessage: "Definitely not! All I want is a day in bed with you, food, and zero outside world."
  },
  {
    id: 8,
    question: "What's my absolute favourite thing about being physically close to you?",
    options: [
      "The way you fit perfectly against my chest, and how warm and safe you feel",
      "Checking how freezing your hands are",
      "Stealing your body heat when it's cold",
      "Having someone to rest my chin on"
    ],
    correctIndex: 0,
    correctMessage: "When you just sink into me and relax. There's honestly no better feeling in the world.",
    wrongMessage: "I mean your hands ARE cold, but the real answer is how safe and comfortable it feels holding you."
  },
  {
    id: 9,
    question: "What is one thing about you that I could literally never get tired of?",
    options: [
      "That soft, sleepy voice you have when you're half-awake and whispering to me",
      "The funny faces you make when you're concentrating",
      "Your random theories about the most random topics",
      "How comfortable you are saying whatever comes to your mind"
    ],
    correctIndex: 0,
    correctMessage: "That sleepy, quiet voice of yours late at night is my favourite thing to hear.",
    wrongMessage: "I love all of those, but your quiet sleepy voice when we talk late at night is my favourite."
  },
  {
    id: 10,
    question: "What's something you do that instantly makes me smile, no matter what kind of mood I'm in?",
    options: [
      "That real, unfiltered laugh you do when something catches you off guard",
      "That smug little look you get when you know you won an argument",
      "Threatening to bite me for no reason",
      "Sending me the most unhinged memes at 2 AM"
    ],
    correctIndex: 0,
    correctMessage: "Your genuine laugh fixes my mood in two seconds flat. Every single time.",
    wrongMessage: "Threatening to bite is a close second, but your real laugh always wins."
  }
];

export interface BirthdayContextType {
  currentChapter: number;
  goToChapter: (chapter: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;
  unlockedChapters: number[];
  isArchiveOpen: boolean;
  setIsArchiveOpen: (open: boolean) => void;
  
  // Audio
  isMuted: boolean;
  toggleMute: () => void;

  // Custom Cursor
  isCatCursorActive: boolean;
  toggleCatCursor: () => void;

  // Cake State (Chapter 6)
  candles: boolean[];
  extinguishCandle: (index: number) => void;
  extinguishAllCandles: () => void;
  cakeSliceState: 'uncut' | 'cut' | 'bite1' | 'bite2' | 'bite3' | 'eaten';
  cutCake: () => void;
  takeBite: () => void;
  resetCake: () => void;

  // Letter State (Chapter 7)
  envelopeOpen: boolean;
  openEnvelope: () => void;
  resetEnvelope: () => void;

  // Quiz State (Chapter 5)
  quizQuestions: QuizQuestion[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  updateQuizQuestion: (updated: QuizQuestion) => void;
  resetQuizQuestionsToDefault: () => void;
  quizCurrentQuestion: number;
  quizAnswers: Record<number, number>;
  quizSubmitted: Record<number, boolean>;
  selectAnswer: (questionId: number, optionIndex: number) => void;
  submitAnswer: (questionId: number) => void;
  nextQuizQuestion: () => void;
  resetQuiz: () => void;

  // Bunny companion dialogs
  bunnyThought: string | null;
  setBunnyThought: (thought: string | null) => void;
  triggerBunnyEasterEgg: () => void;
}

const BirthdayContext = createContext<BirthdayContextType | null>(null);

export const BirthdayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState<number>(() => {
    const saved = localStorage.getItem('bday_chapter');
    return saved ? Math.min(Math.max(parseInt(saved, 10), 1), 8) : 1;
  });

  const [unlockedChapters, setUnlockedChapters] = useState<number[]>(() => {
    const saved = localStorage.getItem('bday_unlocked');
    return saved ? JSON.parse(saved) : [1];
  });

  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCatCursorActive, setIsCatCursorActive] = useState(true);

  // Exactly 21 candles for 21st birthday (all true = lit)
  const [candles, setCandles] = useState<boolean[]>(() => Array(21).fill(true));
  const [cakeSliceState, setCakeSliceState] = useState<'uncut' | 'cut' | 'bite1' | 'bite2' | 'bite3' | 'eaten'>('uncut');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  // Quiz state with 10 questions & editing support
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('bday_quiz_questions_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 10) return parsed;
      } catch {
        // Fall back to default
      }
    }
    return DEFAULT_QUIZ_QUESTIONS;
  });

  const [quizCurrentQuestion, setQuizCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});

  // Bunny easter eggs
  const [bunnyThought, setBunnyThought] = useState<string | null>("Hey... you can tap me whenever you want a little reminder 🐰");

  useEffect(() => {
    localStorage.setItem('bday_chapter', currentChapter.toString());
    setUnlockedChapters(prev => {
      if (!prev.includes(currentChapter)) {
        const next = [...prev, currentChapter].sort((a, b) => a - b);
        localStorage.setItem('bday_unlocked', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  }, [currentChapter]);

  useEffect(() => {
    localStorage.setItem('bday_quiz_questions_v2', JSON.stringify(quizQuestions));
  }, [quizQuestions]);

  const updateQuizQuestion = (updated: QuizQuestion) => {
    setQuizQuestions(prev => prev.map(q => q.id === updated.id ? updated : q));
  };

  const resetQuizQuestionsToDefault = () => {
    setQuizQuestions(DEFAULT_QUIZ_QUESTIONS);
    localStorage.removeItem('bday_quiz_questions_v2');
  };

  const goToChapter = (chapter: number) => {
    if (chapter >= 1 && chapter <= 8) {
      setCurrentChapter(chapter);
      setIsArchiveOpen(false);
      sound.playChime(620);
    }
  };

  const nextChapter = () => {
    if (currentChapter < 8) {
      goToChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      goToChapter(currentChapter - 1);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playChime(740);
    }
  };

  const toggleCatCursor = () => {
    setIsCatCursorActive(prev => !prev);
  };

  // Candle interactions
  const extinguishCandle = (index: number) => {
    if (!candles[index]) return;
    sound.playCandleBlow();
    setCandles(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const extinguishAllCandles = () => {
    sound.playCandleBlow();
    setCandles(Array(21).fill(false));
  };

  const cutCake = () => {
    if (cakeSliceState === 'uncut') {
      sound.playCakeCut();
      setCakeSliceState('cut');
    }
  };

  const takeBite = () => {
    sound.playBite();
    if (cakeSliceState === 'cut') setCakeSliceState('bite1');
    else if (cakeSliceState === 'bite1') setCakeSliceState('bite2');
    else if (cakeSliceState === 'bite2') setCakeSliceState('bite3');
    else if (cakeSliceState === 'bite3') setCakeSliceState('eaten');
  };

  const resetCake = () => {
    setCandles(Array(21).fill(true));
    setCakeSliceState('uncut');
    sound.playChime(550);
  };

  const openEnvelope = () => {
    sound.playPaperRustle();
    setEnvelopeOpen(true);
  };

  const resetEnvelope = () => {
    setEnvelopeOpen(false);
  };

  // Quiz methods
  const selectAnswer = (questionId: number, optionIndex: number) => {
    if (quizSubmitted[questionId]) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitAnswer = (questionId: number) => {
    const selected = quizAnswers[questionId];
    if (selected === undefined) return;
    setQuizSubmitted(prev => ({ ...prev, [questionId]: true }));
    const question = quizQuestions.find(q => q.id === questionId);
    if (question && selected === question.correctIndex) {
      sound.playChime(880);
    } else {
      sound.playBoop();
    }
  };

  const nextQuizQuestion = () => {
    if (quizCurrentQuestion < quizQuestions.length - 1) {
      setQuizCurrentQuestion(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setQuizCurrentQuestion(0);
    setQuizAnswers({});
    setQuizSubmitted({});
    sound.playChime(600);
  };

  const bunnyThoughts = [
    "Bunny says: I heard you asked for his credit card on day two... iconic move honestly 💳",
    "Bunny says: Don't let him lie, you know who caught feelings first! 🐰",
    "Bunny whispers: Take your time with the cake candles, make a real wish. 🎂",
    "Bunny says: Happy 21st! You're his favourite person in the whole world. ✨",
    "Bunny says: Briar frenzy into the tower, let's go! 🐾"
  ];

  const triggerBunnyEasterEgg = () => {
    sound.playHop();
    const randomThought = bunnyThoughts[Math.floor(Math.random() * bunnyThoughts.length)];
    setBunnyThought(randomThought);
  };

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        nextChapter();
      } else if (e.key === 'ArrowLeft') {
        prevChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter]);

  return (
    <BirthdayContext.Provider
      value={{
        currentChapter,
        goToChapter,
        nextChapter,
        prevChapter,
        unlockedChapters,
        isArchiveOpen,
        setIsArchiveOpen,
        isMuted,
        toggleMute,
        isCatCursorActive,
        toggleCatCursor,
        candles,
        extinguishCandle,
        extinguishAllCandles,
        cakeSliceState,
        cutCake,
        takeBite,
        resetCake,
        envelopeOpen,
        openEnvelope,
        resetEnvelope,
        quizQuestions,
        setQuizQuestions,
        updateQuizQuestion,
        resetQuizQuestionsToDefault,
        quizCurrentQuestion,
        quizAnswers,
        quizSubmitted,
        selectAnswer,
        submitAnswer,
        nextQuizQuestion,
        resetQuiz,
        bunnyThought,
        setBunnyThought,
        triggerBunnyEasterEgg,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within BirthdayProvider');
  }
  return context;
};
