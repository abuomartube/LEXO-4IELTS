import { Mic, BookOpen, Trophy, MessageSquare, ChevronRight, Star } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "971500000000";

interface Props {
  onStart: () => void;
}

export default function Landing({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #0D1B3E 0%, #132244 60%, #0D1B3E 100%)" }}>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#C9A84C,#e8c96a)" }}>
            <Mic className="w-4 h-4 text-navy-900" style={{ color: "#0D1B3E" }} />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">Churchill AI</span>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          تواصل واتساب
        </a>
      </header>

      {/* ── HERO ── */}
      <main className="flex-1 flex flex-col items-center px-4 pt-12 pb-8 gap-10">

        {/* Portrait + name */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div
            className="rounded-3xl overflow-hidden border-4 shadow-2xl"
            style={{ width: 160, height: 200, borderColor: "rgba(201,168,76,0.5)" }}
          >
            <img
              src="/churchill.png"
              alt="Churchill AI"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
              Churchill <span style={{ color: "#C9A84C" }}>AI</span>
            </h1>
            <p className="text-white/70 text-lg font-medium">
              Your Personal IELTS Speaking Examiner
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
              ))}
              <span className="text-white/50 text-xs ml-1">AI-powered · Free to try</span>
            </div>
          </div>
        </div>

        {/* Intro quote */}
        <div
          className="w-full max-w-lg rounded-2xl px-5 py-4 text-center text-sm text-white/85 leading-relaxed italic border"
          style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.25)" }}
        >
          "Hi, this is Churchill AI. I am here to enhance your speaking skills and help you achieve your target IELTS band score. Let's begin."
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
          {[
            { icon: <BookOpen className="w-4 h-4" />, label: "120 Topics" },
            { icon: <MessageSquare className="w-4 h-4" />, label: "3 IELTS Parts" },
            { icon: <Mic className="w-4 h-4" />, label: "Voice Mode" },
            { icon: <Trophy className="w-4 h-4" />, label: "Band Score Report" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl text-center text-xs font-semibold"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ color: "#C9A84C" }}>{f.icon}</span>
              <span className="text-white/80">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Part info */}
        <div className="w-full max-w-lg space-y-2 text-sm">
          {[
            { n: "1", label: "Introduction", desc: "8 personal questions about the topic" },
            { n: "2", label: "Long Turn", desc: "1 minute to prepare + 1–2 minute talk" },
            { n: "3", label: "Discussion", desc: "4 abstract analytical questions" },
          ].map((p) => (
            <div
              key={p.n}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                style={{ background: "linear-gradient(135deg,#C9A84C,#e8c96a)", color: "#0D1B3E" }}
              >
                {p.n}
              </span>
              <div>
                <span className="font-semibold text-white">Part {p.n} — {p.label}</span>
                <p className="text-white/50">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-lg flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#C9A84C,#e8c96a)", color: "#0D1B3E" }}
          >
            <Mic className="w-5 h-5" />
            ابدأ جلسة تحدث الآن
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-white/40">
            Powered by GPT-4o + Whisper · All 3 IELTS Speaking Parts
          </p>
        </div>
      </main>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm interested in Churchill AI IELTS Speaking Practice.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-semibold text-sm text-white transition-all hover:scale-105 z-50"
        style={{ background: "#25D366" }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="hidden sm:inline">واتساب</span>
      </a>
    </div>
  );
}
