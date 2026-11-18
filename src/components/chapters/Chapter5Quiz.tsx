import React, { useState } from 'react';
import { useBirthday, QuizQuestion } from '../../context/BirthdayContext';
import { 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Edit3,
  X,
  Check
} from 'lucide-react';

export const Chapter5Quiz: React.FC = () => {
  const {
    nextChapter,
    quizQuestions,
    updateQuizQuestion,
    resetQuizQuestionsToDefault,
    quizCurrentQuestion,
    quizAnswers,
    quizSubmitted,
    selectAnswer,
    submitAnswer,
    nextQuizQuestion,
    resetQuiz,
  } = useBirthday();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  const current = quizQuestions[quizCurrentQuestion] || quizQuestions[0];
  const isLastQuestion = quizCurrentQuestion === quizQuestions.length - 1;
  const isSubmitted = quizSubmitted[current.id];
  const selectedIdx = quizAnswers[current.id];
  const isCorrect = selectedIdx === current.correctIndex;

  // Calculate total score
  const totalCorrect = quizQuestions.reduce((acc, q) => {
    return quizSubmitted[q.id] && quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const allCompleted = quizQuestions.every(q => quizSubmitted[q.id]);

  const handleOpenEditor = (q: QuizQuestion) => {
    setEditingQuestion({ ...q, options: [...q.options] });
    setIsEditorOpen(true);
  };

  const handleSaveEditor = () => {
    if (editingQuestion) {
      updateQuizQuestion(editingQuestion);
      setIsEditorOpen(false);
      setEditingQuestion(null);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 select-none overflow-y-auto">
      {/* Background with dark crimson atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#080205]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#580b22]/30 via-[#18040d]/60 to-[#080205]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f43f5e]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#fb7185] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
              <span>Chapter V · Relationship Quiz</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffe4e6] mt-1 tracking-tight">
              A Little Quiz
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#fda4af]/80 mt-1">
              "10 questions about us, inside jokes, and how we actually feel."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#fb7185] bg-[#2a0b1a] px-3 py-1 rounded-full border border-[#f43f5e]/30">
              Score: {totalCorrect} / {quizQuestions.length}
            </span>
            <button
              onClick={() => handleOpenEditor(current)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#f43f5e]/40 bg-[#2b0a1a] text-xs text-[#fecdd3] hover:text-white transition-colors"
              title="Edit current question"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Question</span>
            </button>
          </div>
        </div>

        {/* Quiz Card */}
        {!allCompleted ? (
          <div className="rounded-2xl bg-[#14040d]/90 border border-[#f43f5e]/30 backdrop-blur-md p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            {/* Question Header & Counter */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#fb7185] uppercase tracking-wider">
                Question {quizCurrentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {quizQuestions.map((q, idx) => (
                  <span
                    key={q.id}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      idx === quizCurrentQuestion
                        ? 'bg-[#fb7185] ring-2 ring-[#fb7185]/40'
                        : quizSubmitted[q.id]
                        ? quizAnswers[q.id] === q.correctIndex
                          ? 'bg-emerald-500'
                          : 'bg-rose-400'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#ffe4e6] leading-snug">
              {current.question}
            </h3>

            {/* Answer Choices */}
            <div className="flex flex-col gap-3">
              {current.options.map((opt, idx) => {
                const isOptionSelected = selectedIdx === idx;
                let optionStyle = 'bg-[#1b0511] border-white/15 text-[#fce7f3] hover:border-[#fb7185]/50';

                if (isSubmitted) {
                  if (idx === current.correctIndex) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                  } else if (isOptionSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    optionStyle = 'bg-[#13030b]/60 border-white/5 text-white/40';
                  }
                } else if (isOptionSelected) {
                  optionStyle = 'bg-[#881337] border-[#fb7185] text-white shadow-md';
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => selectAnswer(current.id, idx)}
                    className={`p-4 rounded-xl border text-left transition-all font-sans text-sm sm:text-base flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && idx === current.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isOptionSelected && !isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback reaction message */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-xl border font-sans text-sm sm:text-base animate-in fade-in slide-in-from-top-1 ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-mono text-xs font-bold mb-1 uppercase tracking-wider">
                  {isCorrect ? "✨ Spot on:" : "🐾 Teasing reaction:"}
                </div>
                "{isCorrect ? current.correctMessage : current.wrongMessage}"
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-white/50">
                {!isSubmitted ? "Pick an option & lock it in" : "Reaction revealed!"}
              </span>

              {!isSubmitted ? (
                <button
                  disabled={selectedIdx === undefined}
                  onClick={() => submitAnswer(current.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-serif font-medium transition-all ${
                    selectedIdx !== undefined
                      ? 'bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white shadow-md hover:scale-105 active:scale-95'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Lock In Answer
                </button>
              ) : !isLastQuestion ? (
                <button
                  onClick={nextQuizQuestion}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-serif transition-colors"
                >
                  <span>Next Question ({quizCurrentQuestion + 2}/10)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={nextQuizQuestion}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-xs font-serif transition-colors"
                >
                  <span>View Final Results</span>
                  <Trophy className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Trophy Screen */
          <div className="rounded-2xl bg-[#14040d]/90 border border-[#f43f5e]/30 backdrop-blur-md p-8 text-center shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
            <div className="p-4 rounded-full bg-gradient-to-b from-amber-500/30 to-rose-500/20 border border-amber-400/40 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)]">
              <Trophy className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#fb7185] uppercase tracking-widest">
                Final Result: {totalCorrect} / {quizQuestions.length}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#ffe4e6] mt-1">
                Verdict: Certified 100% Mine
              </h3>
              <p className="font-sans text-stone-300 text-sm sm:text-base max-w-md mx-auto mt-2 leading-relaxed">
                Whether you got every single one right or tried arguing about who caught feelings first, you know our story inside out. You're my favourite person.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2b0a1a] hover:bg-[#431029] border border-[#f43f5e]/40 text-xs font-serif text-[#fda4af] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>

              <button
                onClick={nextChapter}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-serif font-medium transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Proceed to The 21st Birthday Cake</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Question Editor Modal */}
      {isEditorOpen && editingQuestion && (
        <div
          onClick={() => setIsEditorOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#180510] border border-[#f43f5e]/50 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif text-lg font-bold text-[#ffe4e6]">
                Edit Question #{editingQuestion.id}
              </h4>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 rounded-lg bg-white/10 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-white/60 block mb-1">Question:</label>
              <textarea
                rows={2}
                value={editingQuestion.question}
                onChange={e => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                className="w-full bg-black/60 border border-white/20 rounded p-2 text-white font-sans text-xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/60 block">Answer Choices & Correct Option:</label>
              {editingQuestion.options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingQuestion({ ...editingQuestion, correctIndex: optIdx })}
                    className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 ${
                      editingQuestion.correctIndex === optIdx
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {editingQuestion.correctIndex === optIdx ? "CORRECT" : "Option " + (optIdx + 1)}
                  </button>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => {
                      const nextOpts = [...editingQuestion.options];
                      nextOpts[optIdx] = e.target.value;
                      setEditingQuestion({ ...editingQuestion, options: nextOpts });
                    }}
                    className="flex-1 bg-black/60 border border-white/20 rounded p-1.5 text-white font-sans text-xs"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-emerald-400 block mb-1">Reaction for Correct Answer:</label>
              <input
                type="text"
                value={editingQuestion.correctMessage}
                onChange={e => setEditingQuestion({ ...editingQuestion, correctMessage: e.target.value })}
                className="w-full bg-black/60 border border-emerald-500/40 rounded p-2 text-white font-sans text-xs"
              />
            </div>

            <div>
              <label className="text-rose-400 block mb-1">Reaction for Wrong Answer:</label>
              <input
                type="text"
                value={editingQuestion.wrongMessage}
                onChange={e => setEditingQuestion({ ...editingQuestion, wrongMessage: e.target.value })}
                className="w-full bg-black/60 border border-rose-500/40 rounded p-2 text-white font-sans text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={resetQuizQuestionsToDefault}
                className="text-[11px] text-white/40 hover:text-white underline"
              >
                Reset to default
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditor}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#e11d48] text-white hover:bg-[#f43f5e]"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
