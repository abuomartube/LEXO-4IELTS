import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic, MicOff, Send, ChevronRight, RotateCcw, Timer, Trophy,
  MessageSquare, Loader2, CheckCircle, AlertCircle, BookOpen, Sparkles,
  Volume2, VolumeX, ArrowLeft
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────────────────────

const TOPICS = [
  "Weather","Seasons","Nature","Animals","Environment","Plants","Oceans","Mountains","Forests","Climate change",
  "Daily routine","Food & cooking","Sports","Music","Reading","Shopping","Fashion","Sleep habits","Morning routines","Cooking",
  "Eating out","Street food","Diets","Exercise habits","Weekend activities",
  "Friends","Family","Neighbors","Childhood","Relationships","Social media","Festivals","Celebrations","Weddings","Traditions","Community","Volunteering",
  "Hometown","Travel","Cities","Villages","Parks","Museums","Restaurants","Airports","Hotels","Beaches","Markets","Landmarks",
  "School","University","Teachers","Studying","Online learning","Libraries","Exams","Scholarships","Subjects","Homework",
  "Work","Career goals","Money","Success","Ambition","Retirement","Future plans","Business","Job interviews","Salaries","Working from home","Entrepreneurship",
  "Internet","Phones","AI","Games","Transportation","Space","Innovation","Social apps","Online shopping","Robots","Electric cars","Smart homes",
  "Health","Exercise","Mental health","Hobbies","Relaxation","Happiness","Stress","Sleep","Hospitals","Medicine","Healthy eating","Work-life balance",
  "Movies","Art","Photography","Languages","Cultural heritage","History","Books","Music genres","Theater","Dance","Crafts","Architecture",
  "Kindness","Leadership","Patience","Honesty","Personal ambition","Creativity","Decision making","Risk taking","Role models","Heroes","Memories","Dreams","Personal goals",
];

const CUE_CARDS: Record<string, string> = {
  "Weather":"a time when the weather had a strong effect on your plans or mood",
  "Seasons":"a season of the year that is special or meaningful to you",
  "Nature":"a place in nature that you find beautiful or peaceful",
  "Animals":"an animal that you find interesting or that has been important to you",
  "Environment":"something you or others do to help protect the environment",
  "Plants":"a plant, flower, or garden that you find meaningful",
  "Oceans":"a memorable experience you had near the sea or ocean",
  "Mountains":"a mountain or outdoor landscape you have visited or would like to visit",
  "Forests":"a forest, park, or green area that you enjoy or find interesting",
  "Climate change":"something you have noticed about climate change or its effects",
  "Daily routine":"a typical day in your life",
  "Food & cooking":"a meal or dish that is special to you",
  "Sports":"a sport or physical activity you enjoy or have tried",
  "Music":"a song, artist, or type of music that is meaningful to you",
  "Reading":"a book, article, or story that impressed or influenced you",
  "Shopping":"a purchase or shopping experience you remember well",
  "Fashion":"an item of clothing or style that is meaningful to you",
  "Sleep habits":"a sleep habit or bedtime routine that you follow",
  "Morning routines":"your morning routine or a morning that stands out in your memory",
  "Cooking":"a dish you enjoy cooking or a cooking experience you remember",
  "Eating out":"a restaurant or café that you have enjoyed visiting",
  "Street food":"a type of street food or local snack that you enjoy",
  "Diets":"a change in eating habits or diet that has affected your life",
  "Exercise habits":"a form of exercise or physical activity you do regularly",
  "Weekend activities":"something you enjoy doing at the weekend",
  "Friends":"a close friend and your friendship with them",
  "Family":"a family member who has been important to you",
  "Neighbors":"a neighbour or someone who lives near you that you find interesting",
  "Childhood":"a memory or experience from your childhood that stands out",
  "Relationships":"an important relationship in your life and what makes it special",
  "Social media":"a social media platform or online community you use",
  "Festivals":"a festival or cultural event you have attended or celebrated",
  "Celebrations":"a celebration or special occasion that you remember well",
  "Weddings":"a wedding or marriage ceremony you have attended or know about",
  "Traditions":"a tradition in your family or culture that is meaningful to you",
  "Community":"a community group, club, or organisation you are part of or know about",
  "Volunteering":"a time when you or someone you know volunteered to help others",
  "Hometown":"a place you grew up in or know very well",
  "Travel":"a journey or trip that was particularly memorable",
  "Cities":"a city you have visited or would like to visit",
  "Villages":"a village or small town you have visited or heard about",
  "Parks":"a park or outdoor public space you enjoy",
  "Museums":"a museum, gallery, or cultural site you have visited",
  "Restaurants":"a restaurant or place to eat that you have enjoyed",
  "Airports":"an experience you had at an airport or while travelling",
  "Hotels":"a hotel or place you have stayed that was memorable",
  "Beaches":"a beach or coastal area you have visited or would like to visit",
  "Markets":"a market or street bazaar you have visited",
  "Landmarks":"a famous landmark or historical site you have seen",
  "School":"a school, teacher, or learning experience from your past",
  "University":"a university or higher education experience",
  "Teachers":"a teacher or mentor who has had a positive impact on you",
  "Studying":"a subject or topic you have studied and found interesting",
  "Online learning":"an online course, video, or learning platform you have used",
  "Libraries":"a library or place where you like to study or read",
  "Exams":"an important exam or test you have taken",
  "Scholarships":"a scholarship, award, or academic achievement you know about",
  "Subjects":"a school subject you found interesting or challenging",
  "Homework":"a homework task or assignment you remember from school",
  "Work":"a job or work experience that has been important to you",
  "Career goals":"a career goal or professional ambition you have",
  "Money":"something money-related that has taught you an important lesson",
  "Success":"a success or achievement you are proud of",
  "Ambition":"an ambition or dream you have for the future",
  "Retirement":"an older person you know and their life after retirement",
  "Future plans":"a plan or goal you have for the near or distant future",
  "Business":"a business idea you have or an entrepreneur you admire",
  "Job interviews":"a job interview or application process you have experienced",
  "Salaries":"a job or career that you think should be better paid",
  "Working from home":"an experience of working or studying from home",
  "Entrepreneurship":"an entrepreneur or small business that you admire",
  "Internet":"a website, app, or online service that has changed your daily life",
  "Phones":"a mobile phone or device that has been important to you",
  "AI":"a use of artificial intelligence that you find interesting or useful",
  "Games":"a video game, board game, or online game you enjoy",
  "Transportation":"a form of transport or journey that stands out in your memory",
  "Space":"something related to space exploration that fascinates you",
  "Innovation":"a recent invention or technological innovation you find impressive",
  "Social apps":"a social media app or online platform you use regularly",
  "Online shopping":"an experience you have had with online shopping",
  "Robots":"a robot or automated machine that you have seen or read about",
  "Electric cars":"an electric vehicle or new type of transport you find interesting",
  "Smart homes":"a smart device or home technology you use or find interesting",
  "Health":"a health habit or practice that has been important in your life",
  "Exercise":"a form of exercise or physical activity that you enjoy",
  "Mental health":"something that helps you relax or maintain your mental wellbeing",
  "Hobbies":"a hobby or free-time activity that you enjoy",
  "Relaxation":"a way you like to relax and unwind after a busy day",
  "Happiness":"something or someone that makes you feel genuinely happy",
  "Stress":"a stressful situation and how you dealt with it",
  "Sleep":"a sleep routine or experience related to sleep that you remember",
  "Hospitals":"an experience you or someone close to you had in a hospital",
  "Medicine":"a medical advance or treatment that you find impressive",
  "Healthy eating":"a healthy food or eating habit that you practice or admire",
  "Work-life balance":"something you do to maintain a healthy balance between work and personal life",
  "Movies":"a film or movie that has had an impact on you",
  "Art":"a painting, sculpture, or work of art that you find meaningful",
  "Photography":"a photograph or photographer that has impressed you",
  "Languages":"a language you have learned or would like to learn",
  "Cultural heritage":"a cultural tradition or heritage that you find fascinating",
  "History":"a historical event or period that you find fascinating",
  "Books":"a book that has made a strong impression on you",
  "Music genres":"a style of music or genre that you enjoy",
  "Theater":"a live performance or theatre show you have seen",
  "Dance":"a type of dance or dancing experience you enjoy or admire",
  "Crafts":"a craft, art project, or creative activity you enjoy",
  "Architecture":"a building or architectural style that you find impressive",
  "Kindness":"an act of kindness that you have witnessed or experienced",
  "Leadership":"a leader or person in authority you admire",
  "Patience":"a time when patience helped you or someone else succeed",
  "Honesty":"a time when honesty made an important difference in a situation",
  "Personal ambition":"a personal ambition or aspiration that drives you forward",
  "Creativity":"a creative person or creative project that you admire",
  "Decision making":"an important decision you have made that changed your life",
  "Risk taking":"a risk you or someone you know took and what happened as a result",
  "Role models":"a person who has been a role model or inspiration to you",
  "Heroes":"a hero or admirable person from real life or history",
  "Memories":"a childhood or family memory that is special to you",
  "Dreams":"a dream or aspiration you have had since you were young",
  "Personal goals":"a personal goal you are working towards right now",
};

const TOTAL_TOPICS = TOPICS.length;
const PART_LIMITS = { 1: 8, 2: 1, 3: 4 };
const PREP_TIME = 60;
const USED_TOPICS_KEY = "churchill_used_topics";
const TTS_SPEED_KEY = "churchill_tts_speed";
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "971500000000";

const VOICE_INTRO = "Welcome to Churchill AI. I am your personal IELTS Speaking Examiner. Please relax, speak naturally, and let's begin your practice session.";
const GOODBYE_MESSAGE = "This has been Churchill AI. Thank you for practising today. Keep going, stay consistent, and your band score will improve. Goodbye and good luck.";

const SPEED_OPTIONS = [
  { value: 0.75, label: "🐢 Slow", arabic: "بطيء" },
  { value: 1.0,  label: "▶️ Normal", arabic: "طبيعي" },
  { value: 1.25, label: "🐇 Fast",  arabic: "سريع" },
] as const;

// ── Types ────────────────────────────────────────────────────────────────────

interface Message { role: "user" | "assistant"; content: string; }
interface ReportData {
  overallBand: number;
  fluencyCoherence: { band: number; comment: string };
  lexicalResource: { band: number; comment: string };
  grammaticalRange: { band: number; comment: string };
  pronunciation: { band: number; tips: string[] };
  topVocab: string[];
  strengths: string[];
  improvements: string[];
}
type SessionMode = "voice" | "text";
interface TranscriptEntry { part: 1|2|3; question: string; answer: string; correction:string|null; suggestion:string|null; vocab:string|null; band:string|null; }
type Phase = "idle"|"part1"|"part2-prep"|"part2-answer"|"part3"|"report-loading"|"complete";
interface SessionState { topic:string; part:1|2|3; answeredCount:number; messages:Message[]; phase:Phase; report:ReportData|null; partDone:boolean; }

// ── Helpers ──────────────────────────────────────────────────────────────────

function pickTopic() {
  const raw = localStorage.getItem(USED_TOPICS_KEY);
  let used: string[] = [];
  try { used = JSON.parse(raw ?? "[]"); } catch { used = []; }
  const available = TOPICS.filter(t => !used.includes(t));
  const cycleComplete = available.length === 0;
  const pool = cycleComplete ? [...TOPICS] : available;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const newUsed = cycleComplete ? [chosen] : [...used, chosen];
  localStorage.setItem(USED_TOPICS_KEY, JSON.stringify(newUsed));
  return { topic: chosen, sessionNumber: cycleComplete ? 1 : newUsed.length };
}

function loadSpeed(): number {
  try { const v = parseFloat(localStorage.getItem(TTS_SPEED_KEY) ?? ""); if ([0.75,1.0,1.25].includes(v)) return v; } catch { /* ignore */ }
  return 1.0;
}

function parseFeedback(text: string) {
  const lines = text.split("\n");
  const examinerLines: string[] = [];
  let correction: string|null = null, suggestion: string|null = null, vocab: string|null = null, band: string|null = null;
  for (const line of lines) {
    if (line.includes("❌") && line.includes("→")) correction = line.trim();
    else if (line.includes("💡")) suggestion = line.trim();
    else if (line.includes("📝")) vocab = line.trim();
    else if (line.includes("⭐")) band = line.trim();
    else examinerLines.push(line);
  }
  const examinerText = examinerLines.join("\n").replace(/\*\*\[PART[123]_DONE\]\*\*/g,"").replace(/—\s*$/gm,"").trim();
  return { examinerText, correction, suggestion, vocab, band };
}

function stripForTts(text: string) {
  return text.replace(/\*\*\[PART[123]_DONE\]\*\*/g,"").replace(/\*\*(.*?)\*\*/g,"$1").replace(/\*(.*?)\*/g,"$1").replace(/^---+$/gm,"").replace(/^#{1,6}\s/gm,"").replace(/\n{3,}/g,"\n\n").trim();
}

async function callMessageStream(messages: Message[], topic: string, part: number, questionNum: number, isStart: boolean, onChunk: (t:string)=>void): Promise<string> {
  const res = await fetch("/api/message", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ messages, topic, part, questionNum, isStart }) });
  if (!res.ok) throw new Error("API error");
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let full = "", buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n"); buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]" || payload === "[ERROR]") continue;
      try { const { delta } = JSON.parse(payload) as { delta: string }; full += delta; onChunk(full); } catch { /* ignore */ }
    }
  }
  return full;
}

async function callReport(messages: Message[], topic: string): Promise<ReportData> {
  const res = await fetch("/api/report", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ messages, topic }) });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.report as ReportData;
}

// ── Sub-components ───────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const NAVY = "#0D1B3E";

function PartIndicator({ part, phase }: { part:1|2|3; phase:Phase }) {
  const parts = [{ n:1, label:"Introduction" },{ n:2, label:"Long Turn" },{ n:3, label:"Discussion" }] as const;
  return (
    <div className="flex items-center gap-1 rounded-2xl p-1" style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)" }}>
      {parts.map((p,i) => {
        const done = phase !== "idle" && p.n < part;
        const active = phase !== "idle" && p.n === part;
        return (
          <div key={p.n} className="flex items-center gap-1 flex-1">
            <div className={`flex-1 rounded-xl px-3 py-2 text-center transition-all`} style={active ? { background: GOLD, color: NAVY } : done ? { background:"rgba(74,222,128,0.15)", color:"#4ade80" } : { color:"rgba(255,255,255,0.4)" }}>
              <div className="flex items-center justify-center gap-1.5">
                {done && <CheckCircle className="w-3 h-3" />}
                <span className="text-xs font-bold">Part {p.n}</span>
              </div>
              <div className="text-[10px] opacity-75 hidden sm:block">{p.label}</div>
            </div>
            {i < 2 && <ChevronRight className="w-3 h-3 shrink-0" style={{ color:"rgba(255,255,255,0.3)" }} />}
          </div>
        );
      })}
    </div>
  );
}

function AIChatBubble({ content }: { content: string }) {
  const { examinerText, correction, suggestion, vocab, band } = parseFeedback(content);
  const hasFeedback = correction || suggestion || vocab || band;
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: GOLD }}>
        <Mic className="w-4 h-4" style={{ color: NAVY }} />
      </div>
      <div className="max-w-[85%] space-y-2">
        {examinerText && (
          <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-white whitespace-pre-wrap" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)" }}>
            {examinerText}
          </div>
        )}
        {hasFeedback && (
          <div className="rounded-2xl px-4 py-3 space-y-2.5" style={{ background:"rgba(0,0,0,0.25)", border:"1px solid rgba(255,255,255,0.1)" }}>
            {correction && (
              <div className="rounded-xl px-3 py-2 text-sm" style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)" }}>
                <span className="text-red-400">{correction.split("→")[0]?.trim()}</span>
                <span className="text-white/50 mx-2">→</span>
                <span className="text-green-400 font-semibold">{correction.split("→")[1]?.trim()}</span>
              </div>
            )}
            {suggestion && <div className="rounded-xl px-3 py-2 text-sm text-teal-300" style={{ background:"rgba(20,184,166,0.1)", border:"1px solid rgba(20,184,166,0.3)" }}>{suggestion}</div>}
            {vocab && <div className="text-sm text-sky-300 px-1">{vocab}</div>}
            {band && <div className="text-sm font-bold px-1" style={{ color: GOLD }}>{band}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function UserChatBubble({ content }: { content: string }) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed text-white whitespace-pre-wrap" style={{ background: GOLD, color: NAVY }}>
        {content}
      </div>
    </div>
  );
}

function Part2CueCard({ topic }: { topic: string }) {
  const cue = CUE_CARDS[topic] ?? `something related to ${topic}`;
  return (
    <div className="rounded-2xl p-5 space-y-3" style={{ background:"rgba(201,168,76,0.1)", border:"2px solid rgba(201,168,76,0.35)" }}>
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4" style={{ color: GOLD }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>Cue Card — Part 2</span>
      </div>
      <p className="font-bold text-white text-base">Describe {cue}.</p>
      <div className="space-y-1 text-sm text-white/60">
        <p className="font-semibold text-white/80 text-xs uppercase tracking-wider mb-2">You should say:</p>
        <p>• What it is / who they are</p>
        <p>• When and where you experienced it</p>
        <p>• Why it is important or special to you</p>
        <p>• How it has affected your life</p>
      </div>
      <p className="text-xs text-white/40 italic">You have 1 minute to prepare. Then speak for 1–2 minutes.</p>
    </div>
  );
}

function CountdownTimer({ seconds, onEnd }: { seconds: number; onEnd: ()=>void }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining(prev => { if (prev <= 1) { clearInterval(t); onEnd(); return 0; } return prev-1; }), 1000);
    return () => clearInterval(t);
  }, [onEnd]);
  const pct = (remaining/seconds)*100;
  const urgent = remaining <= 15;
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-colors`} style={urgent ? { background:"rgba(239,68,68,0.1)", borderColor:"rgba(239,68,68,0.4)" } : { background:"rgba(56,189,248,0.1)", borderColor:"rgba(56,189,248,0.3)" }}>
      <Timer className={`w-5 h-5 shrink-0 ${urgent ? "animate-pulse" : ""}`} style={{ color: urgent ? "#ef4444" : "#38bdf8" }} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-white/50">Preparation time</span>
          <span className={`font-bold text-lg tabular-nums ${urgent ? "text-red-400" : "text-sky-300"}`}>{remaining}s</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.1)" }}>
          <div className={`h-full rounded-full transition-all duration-1000`} style={{ width:`${pct}%`, background: urgent ? "#ef4444" : "#38bdf8" }} />
        </div>
      </div>
    </div>
  );
}

function BandBar({ label, band }: { label: string; band: number }) {
  const pct = (band/9)*100;
  const barColor = band>=7 ? "#4ade80" : band>=6 ? GOLD : "#f97316";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-bold tabular-nums text-white">{band}/9</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.1)" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background: barColor }} />
      </div>
    </div>
  );
}

function FinalReport({ report, topic, onNewSession }: { report:ReportData; topic:string; onNewSession:()=>void }) {
  const band = report.overallBand;
  const bandColor = band>=7 ? "#4ade80" : band>=6 ? GOLD : "#f97316";
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="rounded-3xl p-6 text-center" style={{ background:"rgba(201,168,76,0.1)", border:"2px solid rgba(201,168,76,0.3)" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-5 h-5" style={{ color: GOLD }} />
          <span className="text-sm font-bold uppercase tracking-widest text-white/60">Speaking Test Report</span>
        </div>
        <p className="text-sm text-white/50 mb-1">Topic: <strong className="text-white">{topic}</strong></p>
        <div className="text-7xl font-black my-3" style={{ color: bandColor }}>{band}</div>
        <p className="text-white/60 font-semibold">Estimated Band Score</p>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
        <h3 className="font-bold text-white">Detailed Scores</h3>
        <BandBar label="Fluency & Coherence" band={report.fluencyCoherence.band} />
        <BandBar label="Lexical Resource" band={report.lexicalResource.band} />
        <BandBar label="Grammatical Range & Accuracy" band={report.grammaticalRange.band} />
        <BandBar label="Pronunciation (estimated)" band={report.pronunciation.band} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 space-y-3" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
          <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: GOLD }}>Examiner Feedback</h3>
          {[
            { label:"Fluency & Coherence", text:report.fluencyCoherence.comment },
            { label:"Vocabulary", text:report.lexicalResource.comment },
            { label:"Grammar", text:report.grammaticalRange.comment },
          ].map(f => (
            <div key={f.label}>
              <p className="text-xs font-semibold text-white/40 mb-0.5">{f.label}</p>
              <p className="text-sm text-white/80">{f.text}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-white">🗣️ Pronunciation Tips</h3>
            <ul className="space-y-1">{report.pronunciation.tips.map((t,i) => <li key={i} className="text-sm text-white/70 flex items-start gap-2"><span style={{ color: GOLD }} className="mt-0.5">•</span>{t}</li>)}</ul>
          </div>
          <div className="rounded-2xl p-5" style={{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.2)" }}>
            <h3 className="font-bold text-green-400 text-sm mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" />What you did well</h3>
            <ul className="space-y-1">{report.strengths.map((s,i) => <li key={i} className="text-sm text-white/70 flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span>{s}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
        <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: GOLD }} />Top 5 Vocabulary Upgrades</h3>
        <div className="flex flex-wrap gap-2">{report.topVocab.map((w,i) => <span key={i} className="px-3 py-1 text-sm font-medium rounded-full" style={{ background:"rgba(201,168,76,0.15)", color: GOLD, border:"1px solid rgba(201,168,76,0.3)" }}>{w}</span>)}</div>
      </div>

      <div className="rounded-2xl p-5" style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)" }}>
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2" style={{ color: GOLD }}><AlertCircle className="w-4 h-4" />Focus Areas for Next Session</h3>
        <ul className="space-y-1">{report.improvements.map((s,i) => <li key={i} className="text-sm text-white/70 flex items-start gap-2"><span style={{ color: GOLD }} className="mt-0.5">→</span>{s}</li>)}</ul>
      </div>

      <button onClick={onNewSession} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all hover:opacity-90" style={{ background: GOLD, color: NAVY }}>
        <RotateCcw className="w-5 h-5" />Try Again with New Topic
      </button>
    </div>
  );
}

function buildTranscriptText(topic: string, entries: TranscriptEntry[], report: ReportData|null) {
  const date = new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" });
  const lines = ["🎤 CHURCHILL AI","IELTS Speaking Session Report","━━━━━━━━━━━━━━━━━━━━━",`Topic: ${topic}`,`Date: ${date}`,"━━━━━━━━━━━━━━━━━━━━━"];
  let currentPart = 0;
  for (const e of entries) {
    if (e.part !== currentPart) {
      currentPart = e.part;
      const labels: Record<number,string> = { 1:"Part 1 - Introduction", 2:"Part 2 - Long Turn", 3:"Part 3 - Discussion" };
      lines.push("", labels[e.part] ?? `Part ${e.part}`, "");
    }
    if (e.question) lines.push(`Q: ${e.question}`);
    lines.push(`A: ${e.answer}`);
    if (e.correction) lines.push(`✅ ${e.correction}`);
    if (e.suggestion) lines.push(`💡 ${e.suggestion}`);
    if (e.vocab) lines.push(`📝 ${e.vocab}`);
    if (e.band) lines.push(`⭐ ${e.band}`);
    lines.push("");
  }
  if (report) {
    lines.push("","━━━━━━━━━━━━━━━━━━━━━","FINAL REPORT","━━━━━━━━━━━━━━━━━━━━━",`Overall Band: ${report.overallBand}/9`,`Fluency & Coherence: ${report.fluencyCoherence.band}/9`,`Lexical Resource: ${report.lexicalResource.band}/9`,`Grammatical Range: ${report.grammaticalRange.band}/9`);
    if (report.improvements?.length) { lines.push("","Top improvements:"); report.improvements.slice(0,5).forEach((imp,idx) => lines.push(`${idx+1}. ${imp}`)); }
    lines.push("━━━━━━━━━━━━━━━━━━━━━");
  }
  return lines.join("\n");
}

function TranscriptViewer({ topic, entries, report, onClose, onNewSession }: { topic:string; entries:TranscriptEntry[]; report:ReportData|null; onClose:()=>void; onNewSession?:()=>void }) {
  const text = buildTranscriptText(topic, entries, report);
  const date = new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" });
  const partsInTranscript = [...new Set(entries.map(e=>e.part))].length;
  const partCounters: Record<number,number> = {};

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background:"#0D1B3E" }}>
      <div className="shrink-0" style={{ borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: GOLD }}>
              <Mic className="w-4 h-4" style={{ color: NAVY }} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wide">🎤 CHURCHILL AI</h2>
              <p className="text-xs font-semibold" style={{ color: GOLD }}>IELTS Speaking Session Report</p>
            </div>
          </div>
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white/60 hover:bg-white/10 transition-colors">✕</button>
        </div>
        <div className="px-4 pb-3 flex items-center gap-2 flex-wrap text-xs text-white/40">
          <span>{topic}</span><span>·</span><span>{date}</span><span>·</span><span>Part {partsInTranscript} of 3 completed</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {entries.map((e,i) => {
          const isNewPart = e.part !== (entries[i-1]?.part ?? 0);
          if (isNewPart) partCounters[e.part] = 0;
          partCounters[e.part] = (partCounters[e.part] ?? 0)+1;
          const qNum = partCounters[e.part];
          const partLabels: Record<number,string> = { 1:"Part 1 — Introduction", 2:"Part 2 — Long Turn", 3:"Part 3 — Discussion" };
          return (
            <div key={i}>
              {isNewPart && <h3 className="text-sm font-bold mb-2 pb-1" style={{ color: GOLD, borderBottom:"1px solid rgba(201,168,76,0.2)" }}>{partLabels[e.part]}</h3>}
              <div className="rounded-2xl p-3 space-y-1.5 text-sm" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)" }}>
                {e.question && <p className="text-white/40 text-xs"><span className="font-semibold text-white/70">Q{qNum}:</span> {e.question}</p>}
                <p className="font-medium text-white"><span className="font-semibold" style={{ color: GOLD }}>Your answer:</span> {e.answer}</p>
                {e.correction && <p className="text-red-400 text-xs">❌ {e.correction}</p>}
                {e.vocab && <p className="text-sky-400 text-xs">📝 {e.vocab}</p>}
                {e.band && <p className="text-xs font-semibold" style={{ color: GOLD }}>⭐ {e.band}</p>}
              </div>
            </div>
          );
        })}
        {report && (
          <div className="rounded-2xl p-4 text-sm space-y-1.5" style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)" }}>
            <h3 className="font-bold mb-2" style={{ color: GOLD }}>📊 FINAL REPORT</h3>
            <p className="text-base font-bold text-white">Overall Band: {report.overallBand}/9</p>
            <p className="text-white/70">Fluency & Coherence: {report.fluencyCoherence.band}/9</p>
            <p className="text-white/70">Lexical Resource: {report.lexicalResource.band}/9</p>
            <p className="text-white/70">Grammatical Range: {report.grammaticalRange.band}/9</p>
          </div>
        )}
      </div>
      <div className="shrink-0 flex gap-2 p-4" style={{ borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        <button onClick={() => navigator.clipboard.writeText(text)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold text-white/60 hover:bg-white/10 transition-colors" style={{ borderColor:"rgba(255,255,255,0.15)" }}>📋 نسخ النص</button>
        <button onClick={() => { const blob=new Blob([text],{type:"text/plain"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`IELTS_Speaking_${topic.replace(/\s+/g,"_")}.txt`; a.click(); URL.revokeObjectURL(url); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold text-white/60 hover:bg-white/10 transition-colors" style={{ borderColor:"rgba(255,255,255,0.15)" }}>💾 تحميل .txt</button>
        {onNewSession && <button onClick={onNewSession} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ background: GOLD, color: NAVY }}>🔄 جلسة جديدة</button>}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

interface Props { onBack: () => void; }

export default function Speaking({ onBack }: Props) {
  const [session, setSession] = useState<SessionState>({ topic:"", part:1, answeredCount:0, messages:[], phase:"idle", report:null, partDone:false });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [streamingContent, setStreamingContent] = useState<string|null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastTtsText, setLastTtsText] = useState<string|null>(null);
  const [ttsSpeed, setTtsSpeedState] = useState<number>(loadSpeed);
  const [sessionNumber, setSessionNumber] = useState<number>(0);

  // ── Realtime API state ───────────────────────────────────────────────────
  const [rtStatus, setRtStatus] = useState<"idle"|"connecting"|"live"|"done">("idle");
  const [rtMessages, setRtMessages] = useState<{role:"user"|"assistant"; text:string; id:string}[]>([]);
  const [rtStreamText, setRtStreamText] = useState("");
  const [rtIsUserSpeaking, setRtIsUserSpeaking] = useState(false);
  const [rtIsAiSpeaking, setRtIsAiSpeaking] = useState(false);
  const [rtPhase, setRtPhase] = useState<1|2|3>(1);
  const [rtTopic, setRtTopic] = useState("");
  const [rtReport, setRtReport] = useState<ReportData|null>(null);
  const [rtError, setRtError] = useState<string|null>(null);
  const [rtGeneratingReport, setRtGeneratingReport] = useState(false);
  const [sessionMode, setSessionMode] = useState<SessionMode|null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext|null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const rafRef = useRef<number|null>(null);
  const sendTextRef = useRef<((t:string)=>Promise<void>)|null>(null);
  const ttsAudioRef = useRef<HTMLAudioElement|null>(null);
  const sessionRef = useRef(session);
  const startRecordingRef = useRef<(()=>Promise<void>)|null>(null);
  const sessionModeRef = useRef<SessionMode|null>(null);
  const isSpeakingRef = useRef(false);
  const lastTtsTextRef = useRef<string|null>(null);
  const ttsRequestIdRef = useRef(0);
  const ttsEndResolveRef = useRef<(()=>void)|null>(null);
  const ttsSpeedRef = useRef(ttsSpeed);
  const ttsGeneratedSpeedRef = useRef(1.0);
  const sessionGenRef = useRef(0);
  const isProcessingRef = useRef(false);

  // ── Realtime refs ────────────────────────────────────────────────────────
  const rtPcRef = useRef<RTCPeerConnection|null>(null);
  const rtAudioElRef = useRef<HTMLAudioElement|null>(null);
  const rtMicStreamRef = useRef<MediaStream|null>(null);
  const rtConversationRef = useRef<{role:"user"|"assistant"; content:string}[]>([]);
  const rtResponseTextRef = useRef("");
  const rtHandlerRef = useRef<((e: Record<string,unknown>)=>void)|null>(null);
  const rtMessagesEndRef = useRef<HTMLDivElement|null>(null);
  const rtTopicRef = useRef("");

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [session.messages, isLoading, streamingContent]);
  useEffect(() => { sessionRef.current = session; }, [session]);
  useEffect(() => { sessionModeRef.current = sessionMode; }, [sessionMode]);
  useEffect(() => { ttsSpeedRef.current = ttsSpeed; }, [ttsSpeed]);
  useEffect(() => { rtMessagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [rtMessages, rtStreamText]);
  useEffect(() => { rtTopicRef.current = rtTopic; }, [rtTopic]);

  useEffect(() => {
    return () => {
      if (ttsAudioRef.current) { ttsAudioRef.current.pause(); ttsAudioRef.current.src = ""; ttsAudioRef.current = null; }
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current = null;
      rtMicStreamRef.current?.getTracks().forEach(t => t.stop());
      rtPcRef.current?.close();
      if (rtAudioElRef.current) { rtAudioElRef.current.pause(); rtAudioElRef.current.srcObject = null; rtAudioElRef.current.remove(); rtAudioElRef.current = null; }
    };
  }, []);

  const setTtsSpeed = useCallback((speed: number) => {
    setTtsSpeedState(speed);
    localStorage.setItem(TTS_SPEED_KEY, String(speed));
    ttsSpeedRef.current = speed;
    if (ttsAudioRef.current && isSpeakingRef.current) {
      ttsAudioRef.current.playbackRate = Math.max(0.25, Math.min(4.0, speed / ttsGeneratedSpeedRef.current));
    }
  }, []);

  const stopTts = useCallback(() => {
    ttsRequestIdRef.current += 1;
    if (ttsAudioRef.current) { ttsAudioRef.current.pause(); ttsAudioRef.current.src = ""; ttsAudioRef.current = null; }
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    if (ttsEndResolveRef.current) { ttsEndResolveRef.current(); ttsEndResolveRef.current = null; }
  }, []);

  const playTts = useCallback(async (text: string) => {
    if (!text.trim()) return;
    stopTts();
    const clean = stripForTts(text);
    if (!clean) return;
    setLastTtsText(clean);
    lastTtsTextRef.current = clean;
    const myId = ++ttsRequestIdRef.current;
    try {
      const res = await fetch("/api/tts", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ text:clean, speed:ttsSpeedRef.current }) });
      if (myId !== ttsRequestIdRef.current) return;
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (myId !== ttsRequestIdRef.current) { URL.revokeObjectURL(url); return; }
      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      ttsGeneratedSpeedRef.current = ttsSpeedRef.current;
      isSpeakingRef.current = true;
      setIsSpeaking(true);
      await new Promise<void>(resolve => {
        ttsEndResolveRef.current = resolve;
        const triggerMic = () => {
          if (sessionModeRef.current === "voice" && !mediaRecorderRef.current) {
            const s = sessionRef.current;
            if (!s.partDone && (s.phase==="part1"||s.phase==="part2-answer"||s.phase==="part3")) startRecordingRef.current?.();
          }
        };
        audio.onended = () => { URL.revokeObjectURL(url); if (ttsAudioRef.current===audio) ttsAudioRef.current=null; isSpeakingRef.current=false; setIsSpeaking(false); ttsEndResolveRef.current=null; triggerMic(); resolve(); };
        audio.onerror = () => { URL.revokeObjectURL(url); if (ttsAudioRef.current===audio) ttsAudioRef.current=null; isSpeakingRef.current=false; setIsSpeaking(false); ttsEndResolveRef.current=null; triggerMic(); resolve(); };
        audio.play().catch(() => { if (ttsAudioRef.current===audio) ttsAudioRef.current=null; isSpeakingRef.current=false; setIsSpeaking(false); ttsEndResolveRef.current=null; triggerMic(); resolve(); });
      });
    } catch {
      isSpeakingRef.current=false; setIsSpeaking(false);
      if (sessionModeRef.current==="voice"&&!mediaRecorderRef.current) { const s=sessionRef.current; if (!s.partDone&&(s.phase==="part1"||s.phase==="part2-answer"||s.phase==="part3")) startRecordingRef.current?.(); }
    }
  }, [stopTts]);

  const replayTts = useCallback(() => { if (lastTtsText) playTts(lastTtsText); }, [lastTtsText, playTts]);
  const addMessage = useCallback((msg:Message) => { setSession(s=>({...s, messages:[...s.messages,msg]})); }, []);
  void addMessage;

  const startSession = useCallback(async (mode:SessionMode) => {
    sessionGenRef.current+=1; isProcessingRef.current=false; stopTts();
    setSessionMode(mode);
    const { topic, sessionNumber:sNum } = pickTopic();
    setSessionNumber(sNum); setTranscript([]); setShowTranscript(false); setError(null);
    setIsLoading(true); setStreamingContent(""); setLastTtsText(null);
    setSession({ topic, part:1, answeredCount:0, messages:[], phase:"part1", report:null, partDone:false });
    try {
      const reply = await callMessageStream([], topic, 1, 1, true, setStreamingContent);
      setStreamingContent(null);
      setSession(s=>({...s, messages:[{role:"assistant",content:reply}]}));
      const { examinerText } = parseFeedback(reply);
      const q1 = stripForTts(examinerText || reply);
      await playTts(mode==="voice" ? VOICE_INTRO+" "+q1 : q1);
    } catch {
      setStreamingContent(null); setError("Could not connect to Churchill AI. Please try again.");
      setSession(s=>({...s, phase:"idle"}));
    } finally { setIsLoading(false); }
  }, [stopTts, playTts]);

  const processAnswer = useCallback(async (text:string) => {
    if (!text.trim()||isLoading||isProcessingRef.current) return;
    if (session.partDone) return;
    isProcessingRef.current=true;
    const myGen = sessionGenRef.current;
    stopTts(); setInput(""); setError(null);
    const lastAiMsg = [...session.messages].reverse().find(m=>m.role==="assistant");
    const { examinerText:lastQuestion } = lastAiMsg ? parseFeedback(lastAiMsg.content) : { examinerText:"" };
    const userMsg: Message = { role:"user", content:text };
    const newMessages = [...session.messages, userMsg];
    const newAnsweredCount = session.answeredCount+1;
    const limit = PART_LIMITS[session.part];
    const partDoneNow = newAnsweredCount>=limit;
    setSession(s=>({...s, messages:newMessages, answeredCount:newAnsweredCount}));
    setIsLoading(true); setStreamingContent("");
    try {
      const reply = await callMessageStream(newMessages, session.topic, session.part, newAnsweredCount+1, false, setStreamingContent);
      if (myGen!==sessionGenRef.current) return;
      setStreamingContent(null);
      setSession(s=>({...s, messages:[...newMessages,{role:"assistant",content:reply}], partDone:partDoneNow}));
      const { examinerText, correction, suggestion, vocab, band } = parseFeedback(reply);
      setTranscript(prev=>[...prev,{part:session.part, question:lastQuestion||"", answer:text, correction, suggestion, vocab, band}]);
      const ttsText = examinerText||reply;
      if (partDoneNow&&session.part===3) playTts(ttsText).then(()=>playTts(GOODBYE_MESSAGE));
      else playTts(ttsText);
    } catch {
      setStreamingContent(null); setError("Failed to get AI response. Please try again.");
    } finally {
      isProcessingRef.current=false; setIsLoading(false);
      if (sessionModeRef.current==="text") setTimeout(()=>inputRef.current?.focus(),100);
    }
  }, [isLoading, session, stopTts, playTts]);

  useEffect(()=>{ sendTextRef.current=processAnswer; },[processAnswer]);

  const sendMessage = useCallback(async () => { if (!input.trim()||isLoading) return; await processAnswer(input.trim()); }, [input, isLoading, processAnswer]);

  const nextPart = useCallback(async () => {
    if (session.part===1) {
      const cue = CUE_CARDS[session.topic]??`something related to ${session.topic}`;
      const cueMsg: Message = { role:"assistant", content:`**Part 2 — Long Turn**\n\nDescribe ${cue}.\n\nYou should say:\n• What it is / who they are\n• When and where you experienced it\n• Why it is important or special to you\n• How it has affected your life\n\nYou have 1 minute to prepare.` };
      setSession(s=>({...s, part:2, answeredCount:0, messages:[...s.messages,cueMsg], phase:"part2-prep", partDone:false}));
    } else if (session.part===2) {
      setError(null); setIsLoading(true); setStreamingContent("");
      setSession(s=>({...s, part:3, answeredCount:0, phase:"part3", partDone:false}));
      try {
        const reply = await callMessageStream(session.messages, session.topic, 3, 1, true, setStreamingContent);
        setStreamingContent(null);
        setSession(s=>({...s, messages:[...s.messages,{role:"assistant",content:reply}]}));
        const { examinerText } = parseFeedback(reply);
        playTts(examinerText||reply);
      } catch { setStreamingContent(null); setError("Failed to start Part 3. Please try again."); }
      finally { setIsLoading(false); }
    }
  }, [session, playTts]);

  const handleTimerEnd = useCallback(() => { setSession(s=>({...s, phase:"part2-answer"})); setTimeout(()=>inputRef.current?.focus(),100); }, []);

  const viewReport = useCallback(async () => {
    setIsLoading(true); setError(null); setSession(s=>({...s, phase:"report-loading"}));
    try { const report = await callReport(session.messages, session.topic); setSession(s=>({...s, phase:"complete", report})); }
    catch { setError("Failed to generate report. Please try again."); setSession(s=>({...s, phase:"part3"})); }
    finally { setIsLoading(false); }
  }, [session.messages, session.topic]);

  const stopRecording = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current=null; }
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current=null; }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current=null; }
    mediaRecorderRef.current?.stop(); mediaRecorderRef.current=null; setIsRecording(false);
  }, []);

  const stopSession = useCallback(async () => {
    stopRecording(); stopTts(); setIsLoading(false);
    try { await playTts(GOODBYE_MESSAGE); } catch { /* ignore */ }
    setShowTranscript(true);
  }, [stopRecording, stopTts, playTts]);

  const newSession = useCallback(() => {
    sessionGenRef.current+=1; isProcessingRef.current=false; stopTts(); stopRecording();
    setSession({ topic:"", part:1, answeredCount:0, messages:[], phase:"idle", report:null, partDone:false });
    setInput(""); setError(null); setLastTtsText(null); setSessionNumber(0); setSessionMode(null);
    setTranscript([]); setShowTranscript(false);
  }, [stopTts, stopRecording]);

  const startRecording = useCallback(async () => {
    if (mediaRecorderRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
      audioChunksRef.current = [];
      const audioCtx = new AudioContext(); audioCtxRef.current=audioCtx;
      const analyser = audioCtx.createAnalyser(); analyser.fftSize=2048;
      const source = audioCtx.createMediaStreamSource(stream); source.connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      let speechStarted=false; let silenceStart: number|null=null;
      const SILENCE_THRESHOLD=0.012; const SILENCE_DURATION=3000;
      const checkSilence=()=>{
        analyser.getFloatTimeDomainData(buf);
        const rms=Math.sqrt(buf.reduce((s,v)=>s+v*v,0)/buf.length);
        if (rms>=SILENCE_THRESHOLD) { speechStarted=true; silenceStart=null; }
        else if (speechStarted) {
          if (!silenceStart) silenceStart=Date.now();
          else if (Date.now()-silenceStart>=SILENCE_DURATION) { stopRecording(); return; }
        }
        rafRef.current=requestAnimationFrame(checkSilence);
      };
      rafRef.current=requestAnimationFrame(checkSilence);
      const recorder=new MediaRecorder(stream);
      recorder.ondataavailable=(e)=>{ if (e.data.size>0) audioChunksRef.current.push(e.data); };
      recorder.onstop=async()=>{
        stream.getTracks().forEach(t=>t.stop());
        const blob=new Blob(audioChunksRef.current,{type:recorder.mimeType||"audio/webm"});
        if (blob.size<1000) return;
        setIsTranscribing(true);
        try {
          const formData=new FormData(); formData.append("audio",blob,"recording.webm");
          const res=await fetch("/api/transcribe",{method:"POST",body:formData});
          const data=await res.json();
          if (!res.ok) { setError(data.error==="quota_exceeded" ? "⚠️ OpenAI quota exceeded. Add billing at platform.openai.com." : data.message||"Voice transcription failed."); return; }
          if (data.text?.trim()) {
            if (sessionModeRef.current==="voice") sendTextRef.current?.(data.text.trim());
            else { setInput(prev=>prev?prev+" "+data.text.trim():data.text.trim()); setTimeout(()=>{ inputRef.current?.focus(); const el=inputRef.current; if (el) el.setSelectionRange(el.value.length,el.value.length); },50); }
          }
        } catch { setError("Voice transcription failed. Please type your answer instead."); }
        finally { setIsTranscribing(false); }
      };
      mediaRecorderRef.current=recorder; recorder.start(); setIsRecording(true);
    } catch { setError("Microphone access denied. Please allow microphone access and try again."); }
  }, [stopRecording]);

  useEffect(()=>{ startRecordingRef.current=startRecording; },[startRecording]);

  // ── Realtime API (WebRTC) ─────────────────────────────────────────────────

  const handleRtEvent = useCallback((event: Record<string,unknown>) => {
    switch (event.type as string) {
      case "input_audio_buffer.speech_started":
        setRtIsUserSpeaking(true);
        break;
      case "input_audio_buffer.speech_stopped":
        setRtIsUserSpeaking(false);
        break;
      case "response.created":
        setRtIsAiSpeaking(true);
        rtResponseTextRef.current = "";
        setRtStreamText("");
        break;
      case "response.audio_transcript.delta": {
        const delta = (event.delta as string) ?? "";
        rtResponseTextRef.current += delta;
        setRtStreamText(rtResponseTextRef.current);
        break;
      }
      case "response.output_item.done": {
        const item = event.item as {role?:string; content?:{type:string; transcript?:string}[]} | undefined;
        if (item?.role === "assistant") {
          const audioPart = item.content?.find(c => c.type === "audio");
          const text = audioPart?.transcript ?? rtResponseTextRef.current;
          if (text?.trim()) {
            const id = `ai-${Date.now()}-${Math.random()}`;
            setRtMessages(prev => [...prev, { role:"assistant", text, id }]);
            rtConversationRef.current.push({ role:"assistant", content:text });
            const lower = text.toLowerCase();
            if (/part 2|cue card|long turn/.test(lower)) setRtPhase(2);
            else if (/part 3|discussion/.test(lower)) setRtPhase(3);
          }
          setRtStreamText("");
          rtResponseTextRef.current = "";
        }
        break;
      }
      case "response.done":
        setRtIsAiSpeaking(false);
        break;
      case "conversation.item.input_audio_transcription.completed": {
        const userText = ((event.transcript as string) ?? "").trim();
        if (userText) {
          const id = (event.item_id as string) ?? `user-${Date.now()}`;
          setRtMessages(prev => {
            if (prev.some(m => m.id === id)) return prev;
            return [...prev, { role:"user", text:userText, id }];
          });
          rtConversationRef.current.push({ role:"user", content:userText });
        }
        break;
      }
      case "error": {
        const err = event.error as {message?:string} | undefined;
        setRtError(err?.message ?? "Realtime connection error. Please try again.");
        break;
      }
    }
  }, []);

  useEffect(() => { rtHandlerRef.current = handleRtEvent; }, [handleRtEvent]);

  const stopRealtimeSession = useCallback((andReport = false) => {
    rtMicStreamRef.current?.getTracks().forEach(t => t.stop());
    rtMicStreamRef.current = null;
    rtPcRef.current?.close();
    rtPcRef.current = null;
    if (rtAudioElRef.current) {
      rtAudioElRef.current.pause();
      rtAudioElRef.current.srcObject = null;
      rtAudioElRef.current.remove();
      rtAudioElRef.current = null;
    }
    setRtIsAiSpeaking(false);
    setRtIsUserSpeaking(false);
    setRtStreamText("");
    if (andReport) {
      setRtGeneratingReport(true);
      const topic = rtTopicRef.current;
      const msgs = rtConversationRef.current.map(m => ({ role: m.role as "user"|"assistant", content: m.content }));
      callReport(msgs, topic)
        .then(report => setRtReport(report))
        .catch(() => setRtError("Failed to generate report."))
        .finally(() => setRtGeneratingReport(false));
    }
    setRtStatus("done");
  }, []);

  const resetRealtimeSession = useCallback(() => {
    setRtStatus("idle");
    setRtMessages([]);
    setRtStreamText("");
    setRtReport(null);
    setRtError(null);
    setRtPhase(1);
    setRtTopic("");
    rtConversationRef.current = [];
    rtResponseTextRef.current = "";
  }, []);

  const startRealtimeSession = useCallback(async () => {
    const { topic, sessionNumber: sNum } = pickTopic();
    setRtTopic(topic);
    rtTopicRef.current = topic;
    setRtStatus("connecting");
    setRtMessages([]);
    setRtStreamText("");
    setRtReport(null);
    setRtError(null);
    setRtPhase(1);
    setSessionNumber(sNum);
    rtConversationRef.current = [];
    rtResponseTextRef.current = "";

    try {
      const res = await fetch("/api/realtime-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, cue: CUE_CARDS[topic] ?? `something related to ${topic}` }),
      });
      if (!res.ok) throw new Error("Could not create realtime session");
      const { client_secret } = await res.json() as { client_secret: { value: string } };

      const pc = new RTCPeerConnection();
      rtPcRef.current = pc;

      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      document.body.appendChild(audioEl);
      rtAudioElRef.current = audioEl;
      pc.ontrack = (e) => { audioEl.srcObject = e.streams[0]; };

      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      rtMicStreamRef.current = micStream;
      micStream.getTracks().forEach(track => pc.addTrack(track, micStream));

      const dc = pc.createDataChannel("oai-events");
      dc.onopen = () => setRtStatus("live");
      dc.onmessage = (e) => {
        try { rtHandlerRef.current?.(JSON.parse(e.data) as Record<string,unknown>); } catch { /* ignore */ }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
          setRtError("Voice connection lost. Please start a new session.");
          setRtStatus("done");
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
        { method:"POST", body: offer.sdp, headers: { Authorization:`Bearer ${client_secret.value}`, "Content-Type":"application/sdp" } }
      );
      if (!sdpRes.ok) throw new Error("WebRTC negotiation failed — check your OpenAI API key");
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type:"answer", sdp: answerSdp });

    } catch (err: unknown) {
      setRtStatus("idle");
      setRtError(err instanceof Error ? err.message : "Failed to connect. Please try again.");
    }
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) stopRecording();
    else { stopTts(); startRecording(); }
  }, [isRecording, startRecording, stopRecording, stopTts]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const inputDisabled = isLoading||session.phase==="idle"||session.phase==="part2-prep"||session.phase==="report-loading"||session.phase==="complete"||(session.phase!=="part2-answer"&&session.partDone);
  const showNextPartBtn = session.partDone&&!isLoading&&(session.phase==="part1"||session.phase==="part2-answer");
  const showViewReportBtn = session.partDone&&!isLoading&&session.phase==="part3";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #0D1B3E 0%, #132244 60%, #0D1B3E 100%)" }}>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GOLD }}>
            <Mic className="w-3.5 h-3.5" style={{ color: NAVY }} />
          </div>
          <span className="font-bold text-white text-sm">Churchill AI</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background:"rgba(201,168,76,0.15)", color: GOLD }}>IELTS Speaking Examiner</span>
        </div>
        <div className="flex items-center gap-2">
          {(rtTopic || session.topic) && <span className="text-xs text-white/40 hidden sm:inline">Topic: {rtTopic || session.topic}</span>}
          {sessionNumber>0 && <span className="text-xs text-white/40 hidden sm:inline">Session {sessionNumber}/{TOTAL_TOPICS}</span>}
          {(session.phase!=="idle" || rtStatus!=="idle") && (
            <button onClick={rtStatus!=="idle" ? ()=>{ stopRealtimeSession(false); resetRealtimeSession(); } : newSession} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/60 hover:bg-white/10 transition-colors" style={{ border:"1px solid rgba(255,255,255,0.15)" }}>
              <RotateCcw className="w-3 h-3" />New
            </button>
          )}
        </div>
      </header>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-4 overflow-hidden">

        {/* ── REALTIME SESSION ── */}
        {rtStatus !== "idle" && (
          <>
            {/* Connecting */}
            {rtStatus === "connecting" && (
              <div className="flex-1 flex flex-col items-center justify-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full animate-ping absolute inset-0" style={{ background:"rgba(201,168,76,0.3)" }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center relative" style={{ background: GOLD }}>
                    <Mic className="w-8 h-8" style={{ color: NAVY }} />
                  </div>
                </div>
                <p className="text-white font-bold text-lg">Connecting to Churchill AI…</p>
                <p className="text-white/40 text-sm text-center">Setting up real-time voice connection via WebRTC</p>
              </div>
            )}

            {/* Live or Done */}
            {(rtStatus === "live" || rtStatus === "done") && (
              <>
                {/* Part badge + voice status bar */}
                <div className="shrink-0 flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {[1,2,3].map(p => (
                      <div key={p} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all" style={rtPhase === p ? {background:GOLD, color:NAVY} : {background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.3)"}}>
                        Part {p}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {rtStatus === "live" && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${rtIsAiSpeaking ? "animate-pulse" : rtIsUserSpeaking ? "bg-green-400" : "bg-white/20"}`} style={rtIsAiSpeaking ? {background:GOLD} : {}} />
                        <span className="text-xs font-medium" style={rtIsAiSpeaking ? {color:GOLD} : rtIsUserSpeaking ? {color:"#4ade80"} : {color:"rgba(255,255,255,0.4)"}}>
                          {rtIsAiSpeaking ? "Churchill AI is speaking…" : rtIsUserSpeaking ? "Listening to you…" : "Waiting…"}
                        </span>
                      </div>
                    )}
                    {rtStatus === "done" && <span className="text-xs text-white/40">Session ended</span>}
                  </div>
                </div>

                {/* Chat transcript */}
                <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
                  {rtMessages.length === 0 && rtStatus === "live" && (
                    <div className="flex flex-col items-center gap-3 pt-8 text-center">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full animate-ping absolute inset-0" style={{ background:"rgba(201,168,76,0.2)" }} />
                        <div className="w-14 h-14 rounded-full flex items-center justify-center relative" style={{ background:"rgba(201,168,76,0.15)", border:"2px solid rgba(201,168,76,0.4)" }}>
                          <Volume2 className="w-6 h-6" style={{ color: GOLD }} />
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">Churchill AI is introducing the test…</p>
                      <p className="text-white/30 text-xs">Speak naturally — the examiner will hear you automatically</p>
                    </div>
                  )}
                  {rtMessages.map(m => m.role === "assistant"
                    ? <AIChatBubble key={m.id} content={m.text} />
                    : <UserChatBubble key={m.id} content={m.text} />
                  )}
                  {rtStreamText && <AIChatBubble content={rtStreamText + "▌"} />}
                  <div ref={rtMessagesEndRef} />
                </div>

                {/* Error */}
                {rtError && (
                  <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 mb-2" style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)" }}>
                    <AlertCircle className="w-4 h-4 shrink-0" />{rtError}
                  </div>
                )}

                {/* Live controls */}
                {rtStatus === "live" && (
                  <div className="shrink-0 flex gap-2 mt-3">
                    <button onClick={() => stopRealtimeSession(true)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90" style={{ background:"#4ade80", color:NAVY }}>
                      <Trophy className="w-4 h-4" />End &amp; Get Report
                    </button>
                    <button onClick={() => stopRealtimeSession(false)} className="px-4 py-3 rounded-2xl text-sm font-semibold text-white/50 hover:bg-white/10 transition-colors" style={{ border:"1px solid rgba(255,255,255,0.15)" }}>
                      End
                    </button>
                  </div>
                )}

                {/* Done state: report or new session */}
                {rtStatus === "done" && (
                  <div className="shrink-0 mt-3 space-y-3">
                    {rtGeneratingReport && (
                      <div className="flex items-center justify-center gap-3 py-4">
                        <Loader2 className="w-6 h-6 animate-spin" style={{ color: GOLD }} />
                        <span className="text-white/60 font-medium text-sm">Generating your Speaking Report…</span>
                      </div>
                    )}
                    {rtReport && (
                      <>
                        <FinalReport report={rtReport} topic={rtTopic} onNewSession={resetRealtimeSession} />
                        <button onClick={resetRealtimeSession} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white/50 hover:bg-white/10 transition-colors" style={{ border:"1px solid rgba(255,255,255,0.15)" }}>
                          <RotateCcw className="w-4 h-4" />New Session
                        </button>
                      </>
                    )}
                    {!rtReport && !rtGeneratingReport && (
                      <div className="flex gap-2">
                        <button onClick={() => { setRtGeneratingReport(true); callReport(rtConversationRef.current.map(m=>({role:m.role as "user"|"assistant",content:m.content})), rtTopic).then(r=>setRtReport(r)).catch(()=>setRtError("Failed to generate report.")).finally(()=>setRtGeneratingReport(false)); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-90" style={{ background:"#4ade80", color:NAVY }}>
                          <Trophy className="w-4 h-4" />Generate Report
                        </button>
                        <button onClick={resetRealtimeSession} className="px-4 py-3 rounded-2xl text-sm font-semibold text-white/50 hover:bg-white/10 transition-colors" style={{ border:"1px solid rgba(255,255,255,0.15)" }}>
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Part indicator — only shown for classic text/sequential session */}
        {rtStatus === "idle" && session.phase!=="idle"&&session.phase!=="complete"&&session.phase!=="report-loading" && (
          <div className="mb-3 shrink-0">
            <PartIndicator part={session.part} phase={session.phase} />
          </div>
        )}

        {/* ── IDLE ── */}
        {rtStatus === "idle" && session.phase==="idle" && (
          <div className="flex-1 flex flex-col items-center gap-5 overflow-y-auto pb-4">
            <div className="w-full rounded-3xl overflow-hidden flex flex-col items-center text-center px-6 pt-6 pb-5 gap-4" style={{ background:"linear-gradient(160deg,#0D1B3E 0%,#132244 100%)", border:"1px solid rgba(201,168,76,0.2)" }}>
              <div className="rounded-2xl overflow-hidden shrink-0 border-4 shadow-xl" style={{ width:160, height:200, borderColor:"rgba(201,168,76,0.4)" }}>
                <img src="/churchill.png" alt="Churchill AI" className="w-full h-full object-cover object-top" onError={e=>{(e.target as HTMLImageElement).style.display="none";}} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-0.5">Churchill AI</h2>
                <p className="text-xs font-semibold mb-3" style={{ color: GOLD }}>IELTS Speaking Examiner</p>
                <div className="rounded-2xl px-4 py-3 max-w-sm mx-auto" style={{ background:"rgba(255,255,255,0.08)" }}>
                  <p className="text-sm text-white/80 leading-relaxed italic">"Hi, this is Churchill AI. I am here to enhance your speaking skills and help you achieve your target IELTS band score. Let's begin."</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 text-sm w-full">
              {[{icon:"1️⃣",text:"Part 1 — 8 personal questions"},{icon:"2️⃣",text:"Part 2 — 1 minute long turn"},{icon:"3️⃣",text:"Part 3 — 4 discussion questions"}].map(item=>(
                <div key={item.text} className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 justify-center" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <span>{item.icon}</span><span className="font-medium text-white/70">{item.text}</span>
                </div>
              ))}
            </div>

            {rtError && (
              <div className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400" style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)" }}>
                <AlertCircle className="w-4 h-4 shrink-0" />{rtError}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button onClick={startRealtimeSession} className="flex-1 flex flex-col items-center gap-1 px-6 py-4 rounded-2xl font-bold shadow-xl transition-all hover:opacity-90" style={{ background: GOLD, color: NAVY }}>
                <span className="text-2xl">🎤</span>
                <span className="text-base">محادثة صوتية حية</span>
                <span className="text-xs font-normal opacity-70">Real-time · بدون تأخير</span>
              </button>
              <button onClick={()=>startSession("text")} className="flex-1 flex flex-col items-center gap-1 px-6 py-4 rounded-2xl font-bold transition-all hover:bg-white/10" style={{ background:"rgba(255,255,255,0.07)", border:"2px solid rgba(255,255,255,0.15)", color:"white" }}>
                <span className="text-2xl">⌨️</span><span className="text-base">محادثة كتابية</span><span className="text-xs font-normal opacity-50">اكتب إجاباتك يدوياً</span>
              </button>
            </div>
          </div>
        )}

        {/* ── REPORT LOADING ── */}
        {rtStatus === "idle" && session.phase==="report-loading" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin" style={{ color: GOLD }} />
            <p className="text-white/60 font-medium">Generating your Speaking Report…</p>
          </div>
        )}

        {/* ── FINAL REPORT ── */}
        {rtStatus === "idle" && session.phase==="complete"&&session.report && (
          <div className="flex-1 overflow-y-auto space-y-3">
            <FinalReport report={session.report} topic={session.topic} onNewSession={newSession} />
            {transcript.length>0 && (
              <button onClick={()=>setShowTranscript(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white/60 hover:bg-white/10 transition-colors" style={{ border:"1px solid rgba(255,255,255,0.15)" }}>
                📄 عرض النص الكامل للجلسة
              </button>
            )}
          </div>
        )}

        {/* ── ACTIVE SESSION (text / classic voice mode) ── */}
        {rtStatus === "idle" && (session.phase==="part1"||session.phase==="part2-prep"||session.phase==="part2-answer"||session.phase==="part3") && (
          <>
            {/* Speed selector */}
            <div className="shrink-0 flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs text-white/40 font-medium">Examiner speed:</span>
              <div className="flex gap-1">
                {SPEED_OPTIONS.map(opt=>(
                  <button key={opt.value} onClick={()=>setTtsSpeed(opt.value)} title={opt.arabic} className="px-3 py-1 rounded-xl text-xs font-semibold border transition-all" style={ttsSpeed===opt.value ? {background:GOLD,color:NAVY,borderColor:GOLD} : {borderColor:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.5)"}}>
                    {opt.label}<span className="block text-[9px] font-normal opacity-70 leading-tight">{opt.arabic}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
              {session.messages.map((msg,i)=>msg.role==="assistant" ? <AIChatBubble key={i} content={msg.content} /> : <UserChatBubble key={i} content={msg.content} />)}
              {streamingContent!==null && <AIChatBubble content={streamingContent||"…"} />}
              <div ref={chatEndRef} />
            </div>

            {/* Part 2 timer */}
            {session.phase==="part2-prep" && (
              <div className="shrink-0 mt-3">
                <CountdownTimer seconds={PREP_TIME} onEnd={handleTimerEnd} />
                <p className="text-xs text-white/40 text-center mt-2">Read the cue card above. Your answer box will unlock when the timer ends.</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400" style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)" }}>
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            {/* Next part / view report */}
            {(showNextPartBtn||showViewReportBtn) && (
              <div className="shrink-0 mt-3">
                {showNextPartBtn && <button onClick={nextPart} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-sm" style={{ background:GOLD, color:NAVY }}><ChevronRight className="w-5 h-5" />{session.part===1?"Continue to Part 2 →":"Continue to Part 3 →"}</button>}
                {showViewReportBtn && <button onClick={viewReport} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-opacity hover:opacity-90" style={{ background:"#4ade80", color:NAVY }}><Trophy className="w-5 h-5" />View Full Speaking Report</button>}
              </div>
            )}

            {/* ── VOICE MODE ── */}
            {sessionMode==="voice"&&!showNextPartBtn&&!showViewReportBtn && (
              <div className="shrink-0 mt-3 flex flex-col items-center gap-3">
                <div className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium`} style={isSpeaking ? {background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",color:GOLD} : isLoading||streamingContent!==null ? {background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"} : isTranscribing ? {background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",color:"#38bdf8"} : isRecording ? {background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#f87171"} : {background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)"}}>
                  {isSpeaking && <><Volume2 className="w-4 h-4 shrink-0 animate-pulse" />المحكّم يتكلم…</>}
                  {!isSpeaking&&(isLoading||streamingContent!==null) && <><Loader2 className="w-4 h-4 animate-spin shrink-0" />يفكّر المحكّم…</>}
                  {!isSpeaking&&!isLoading&&streamingContent===null&&isTranscribing && <><Loader2 className="w-4 h-4 animate-spin shrink-0" />يحوّل الصوت لنص…</>}
                  {!isSpeaking&&!isLoading&&streamingContent===null&&!isTranscribing&&isRecording && <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />يسجّل… (صمت 3 ثوانٍ → يُرسَل)</>}
                  {!isSpeaking&&!isLoading&&streamingContent===null&&!isTranscribing&&!isRecording && <><Mic className="w-4 h-4 shrink-0" />جاهز لإجابتك…</>}
                </div>
                <button onClick={isSpeaking?stopTts:toggleRecording} disabled={isLoading||isTranscribing} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed`} style={isSpeaking ? {background:"rgba(201,168,76,0.15)",color:GOLD,border:`2px solid rgba(201,168,76,0.4)`} : isRecording ? {background:"#ef4444",color:"white"} : {background:GOLD,color:NAVY}}>
                  {isSpeaking?<VolumeX className="w-9 h-9" />:isRecording?<MicOff className="w-9 h-9" />:<Mic className="w-9 h-9" />}
                </button>
                <p className="text-xs text-white/40 text-center">{isRecording?"اضغط مرة ثانية لإيقاف التسجيل":isSpeaking?"اضغط لمقاطعة المحكّم":"اضغط للتسجيل · يُرسَل تلقائياً"}</p>
                {lastTtsText&&!isRecording&&!isSpeaking&&!isLoading&&!isTranscribing && <button onClick={replayTts} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"><Volume2 className="w-3.5 h-3.5" />إعادة سؤال المحكّم</button>}
                <button onClick={stopSession} disabled={isLoading&&!isSpeaking} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40" style={{ border:"1px solid rgba(239,68,68,0.4)", color:"#f87171" }}>⏹ إنهاء التمرين</button>
              </div>
            )}

            {/* ── TEXT MODE ── */}
            {sessionMode==="text"&&!showNextPartBtn&&!showViewReportBtn && (
              <div className="shrink-0 mt-3 space-y-2">
                {isSpeaking && <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)", color:GOLD }}><Volume2 className="w-4 h-4 shrink-0 animate-pulse" />المحكّم يتكلم — اكتب إجابتك أثناء الاستماع</div>}
                <div className="flex gap-2 items-end">
                  <div className="flex-1 rounded-2xl overflow-hidden transition-colors" style={{ background:"rgba(255,255,255,0.06)", border:`1px solid rgba(255,255,255,0.15)` }}>
                    <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={inputDisabled||isTranscribing} placeholder={session.phase==="part2-prep"?"Waiting for preparation time to end…":"Type your answer here, then press Send ↗"} rows={3} className="w-full px-4 py-3 text-sm bg-transparent text-white placeholder-white/30 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" />
                  </div>
                  <button onClick={sendMessage} disabled={inputDisabled||!input.trim()||isTranscribing} className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm" style={{ background:GOLD, color:NAVY }}>
                    {isLoading?<Loader2 className="w-5 h-5 animate-spin" />:<Send className="w-5 h-5" />}
                  </button>
                </div>
                {lastTtsText&&!isSpeaking&&!isLoading && <button onClick={replayTts} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-1"><Volume2 className="w-3.5 h-3.5" />Replay Churchill AI's last question</button>}
              </div>
            )}

            {/* Hint row */}
            {!session.partDone&&!isLoading&&streamingContent===null&&session.messages.length>0&&session.phase!=="part2-prep" && (
              <div className="shrink-0 flex items-center justify-between text-xs text-white/30 mt-1 px-1">
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />Part {session.part} · {session.answeredCount}/{PART_LIMITS[session.part]} answered</span>
                <span>{sessionMode==="voice"?"🎤 وضع صوتي":"⌨️ وضع كتابي"}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── TRANSCRIPT OVERLAY ── */}
      {showTranscript && (
        <TranscriptViewer topic={session.topic} entries={transcript} report={session.report} onClose={()=>setShowTranscript(false)} onNewSession={()=>{setShowTranscript(false);newSession();}} />
      )}

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to practice IELTS Speaking with Churchill AI.`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-40" style={{ background:"#25D366" }} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
