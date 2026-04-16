import { useState } from "react";
import { Layout } from "@/components/layout";
import { grammarTopics, type GrammarTopic, type GrammarExercise } from "@/data/grammar-data";
import {
  BookText, ChevronRight, ChevronLeft, CheckCircle2, XCircle,
  RotateCcw, Sparkles, ArrowRight
} from "lucide-react";

function TopicCard({ topic, onClick }: { topic: GrammarTopic; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/40 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${topic.iconBg} flex items-center justify-center shrink-0`}>
          <BookText className={`w-6 h-6 ${topic.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
            {topic.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{topic.description}</p>
          <p className="text-xs text-muted-foreground mt-1" dir="rtl" lang="ar">{topic.titleAr}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {topic.rules.length} rules
        </span>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {topic.exercises.length} exercises
        </span>
      </div>
    </button>
  );
}

function RulesSection({ topic }: { topic: GrammarTopic }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Sparkles className={`w-5 h-5 ${topic.color}`} />
        Key Rules
      </h3>
      {topic.rules.map((r, i) => (
        <div key={i} className="bg-muted/50 border border-border rounded-xl p-4">
          <p className="text-sm font-semibold text-foreground mb-1.5">
            <span className={`${topic.color} font-extrabold mr-1.5`}>{i + 1}.</span>
            {r.rule}
          </p>
          <p className="text-sm text-muted-foreground italic pl-5">
            {r.example}
          </p>
        </div>
      ))}
    </div>
  );
}

function ExerciseView({
  exercise,
  index,
  total,
  selectedAnswer,
  onSelect,
}: {
  exercise: GrammarExercise;
  index: number;
  total: number;
  selectedAnswer: number | null;
  onSelect: (idx: number) => void;
}) {
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === exercise.correctIndex;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Question {index + 1} of {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-primary w-4" : i < index ? "bg-primary/40" : "bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-lg font-bold text-foreground leading-relaxed">
        {exercise.question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exercise.options.map((opt, i) => {
          let cls = "bg-card border border-border hover:border-primary/40 text-foreground";
          if (answered) {
            if (i === exercise.correctIndex) cls = "bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-300";
            else if (i === selectedAnswer && !isCorrect) cls = "bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300";
            else cls = "bg-card border border-border text-muted-foreground opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => !answered && onSelect(i)}
              disabled={answered}
              className={`${cls} rounded-xl p-4 text-left font-medium transition-all text-sm flex items-center gap-3 disabled:cursor-default`}
            >
              <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {answered && i === exercise.correctIndex && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
              {answered && i === selectedAnswer && !isCorrect && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`rounded-xl p-4 ${isCorrect ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"}`}>
          <p className="text-sm font-bold text-foreground mb-1">
            {isCorrect ? "✅ Correct!" : "❌ Not quite — here's why:"}
          </p>
          <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
          <p className="text-xs text-muted-foreground mt-1" dir="rtl" lang="ar">{exercise.explanationAr}</p>
        </div>
      )}
    </div>
  );
}

function TopicDetail({ topic, onBack }: { topic: GrammarTopic; onBack: () => void }) {
  const [phase, setPhase] = useState<"rules" | "practice" | "results">("rules");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(topic.exercises.length).fill(null));

  const score = answers.filter((a, i) => a === topic.exercises[i].correctIndex).length;

  const handleSelect = (optIndex: number) => {
    const next = [...answers];
    next[currentQ] = optIndex;
    setAnswers(next);
  };

  const handleNext = () => {
    if (currentQ < topic.exercises.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase("results");
    }
  };

  const handleRestart = () => {
    setPhase("rules");
    setCurrentQ(0);
    setAnswers(new Array(topic.exercises.length).fill(null));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Back to all topics"
          className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-foreground">{topic.title}</h2>
          <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">{topic.titleAr}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${topic.iconBg} flex items-center justify-center shrink-0`}>
          <BookText className={`w-6 h-6 ${topic.color}`} />
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
      <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">{topic.descriptionAr}</p>

      {phase === "rules" && (
        <>
          <RulesSection topic={topic} />
          <button
            onClick={() => setPhase("practice")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
          >
            Start Practice
            <ArrowRight className="w-4 h-4" />
          </button>
        </>
      )}

      {phase === "practice" && (
        <>
          <ExerciseView
            exercise={topic.exercises[currentQ]}
            index={currentQ}
            total={topic.exercises.length}
            selectedAnswer={answers[currentQ]}
            onSelect={handleSelect}
          />
          {answers[currentQ] !== null && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
              >
                {currentQ < topic.exercises.length - 1 ? "Next Question" : "See Results"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {phase === "results" && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${score >= 4 ? "bg-green-100 dark:bg-green-900/20" : score >= 3 ? "bg-amber-100 dark:bg-amber-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
            <span className="text-3xl font-extrabold">
              {score}/{topic.exercises.length}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-foreground">
            {score === topic.exercises.length ? "Perfect Score! 🎉" : score >= 4 ? "Great Job! 💪" : score >= 3 ? "Good Effort! 👍" : "Keep Practicing! 📚"}
          </h3>
          <p className="text-muted-foreground">
            {score === topic.exercises.length
              ? "You've mastered this grammar topic!"
              : score >= 3
                ? "Review the rules for the ones you missed and try again."
                : "Go through the rules carefully and give it another shot."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              All Topics
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {selectedTopic ? (
          <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
        ) : (
          <>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <BookText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-foreground">IELTS Grammar</h1>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Master the most common grammar mistakes in IELTS Writing and Speaking. Each topic includes key rules and 5 practice exercises.
                </p>
                <p className="text-sm text-muted-foreground mt-1" dir="rtl" lang="ar">
                  أتقن الأخطاء النحوية الأكثر شيوعاً في كتابة ومحادثة الآيلتس. كل موضوع يتضمن قواعد رئيسية و5 تمارين تطبيقية.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grammarTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} onClick={() => setSelectedTopic(topic)} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
