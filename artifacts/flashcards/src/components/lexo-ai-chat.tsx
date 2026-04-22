import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2, Trash2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isWelcome?: boolean;
}

const STORAGE_KEY = "lexo_ai_chat_history";
const EMAIL_STORAGE_KEY = "4ielts_email";
const MAX_HISTORY = 40;
const MAX_OUTBOUND = 20;

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  isWelcome: true,
  content:
    "Hi! I'm **LEXO AI** — your personal IELTS tutor. Ask me anything about the exam: vocabulary, grammar, writing tips, speaking strategies, band scores, or how to prepare.\n\nأهلاً! اسألني أي سؤال عن الآيلتس.",
};

function getAuthHeaders(): Record<string, string> {
  try {
    const raw = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (!raw) return {};
    const { email, token } = JSON.parse(raw);
    if (!email || !token) return {};
    return { "X-Student-Email": email, "X-Student-Token": token };
  } catch {
    return {};
  }
}

const SUGGESTED_QUESTIONS = [
  "How is the IELTS Writing scored?",
  "Tips for the Speaking test",
  "What's the difference between Academic and General IELTS?",
  "How can I improve my vocabulary for Band 7?",
];

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME_MESSAGE];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as ChatMessage[];
    }
  } catch {
    // ignore
  }
  return [WELCOME_MESSAGE];
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
  } catch {
    // ignore
  }
}

function renderInline(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <strong key={`b-${i++}`} className="font-semibold">
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const lines = message.content.split("\n");
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-teal-600 text-white rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        }`}
      >
        {lines.map((line, idx) => {
          const trimmed = line.trimStart();
          if (trimmed.startsWith("- ")) {
            return (
              <div key={idx} className="flex gap-2 py-0.5">
                <span className="shrink-0 text-teal-500">•</span>
                <span>{renderInline(trimmed.slice(2))}</span>
              </div>
            );
          }
          if (line === "") return <div key={idx} className="h-1.5" />;
          return <div key={idx}>{renderInline(line)}</div>;
        })}
      </div>
    </div>
  );
}

export function LexoAiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNewBadge, setHasNewBadge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
    if (!open && bubbleRef.current) {
      bubbleRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, textarea, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("lexo_ai_bubble_hint_shown");
    if (!dismissed && messages.length <= 1) {
      setHasNewBadge(true);
    }
  }, [messages.length]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError("");
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const payload = nextMessages
        .filter((m) => !m.isWelcome)
        .slice(-MAX_OUTBOUND)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/lexo-ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      const data = (await res.json()) as { reply: string };
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setMessages(nextMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const resetChat = () => {
    if (loading) return;
    setMessages([WELCOME_MESSAGE]);
    setError("");
  };

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasNewBadge(false);
        sessionStorage.setItem("lexo_ai_bubble_hint_shown", "1");
      }
      return next;
    });
  };

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <>
      {/* Floating bubble button (LEXO AI) */}
      {!open && (
        <button
          ref={bubbleRef}
          onClick={toggleOpen}
          aria-label="Open LEXO AI chat"
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-sky-600 shadow-xl shadow-teal-500/40 flex items-center justify-center text-white hover:scale-110 hover:shadow-2xl transition-all group focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/40"
        >
          <MessageCircle className="w-6 h-6" />
          {hasNewBadge && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-background animate-pulse" />
          )}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask LEXO AI
          </span>
        </button>
      )}

      {/* Small floating WhatsApp icon button — sits above the AI chat bubble with a clear gap */}
      {!open && (
        <a
          href="https://wa.me/4ielts"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="fixed left-5 bottom-5 z-40 w-10 h-10 rounded-full bg-[#25D366] shadow-md flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.003a9.87 9.87 0 01-5.031-1.378l-.36-.214-3.742.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64.001 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0012.04 0C5.46 0 .104 5.355.101 11.934a11.9 11.9 0 001.594 5.945L0 24l6.305-1.654a11.93 11.93 0 005.732 1.459h.005c6.582 0 11.937-5.355 11.94-11.935a11.86 11.86 0 00-3.529-8.382z" />
          </svg>
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp
          </span>
        </a>
      )}

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="LEXO AI chat"
          className="fixed z-50 bg-card border border-border shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200
            inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] sm:rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-teal-500 to-sky-600 text-white shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-base leading-tight">LEXO AI</h3>
              <p className="text-xs text-white/80">Your IELTS tutor · مساعد الآيلتس</p>
            </div>
            <button
              onClick={resetChat}
              disabled={loading}
              aria-label="Clear conversation"
              className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors disabled:opacity-40"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={toggleOpen}
              aria-label="Close chat"
              className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/30"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                  <span className="text-xs text-muted-foreground">LEXO AI is thinking…</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl px-4 py-2 text-sm text-rose-700 dark:text-rose-300">
                  {error}
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="pt-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground px-1">Try asking:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left px-3 py-2 rounded-xl bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors border border-border"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about IELTS, grammar, vocabulary…"
                rows={1}
                maxLength={2000}
                disabled={loading}
                className="flex-1 resize-none px-4 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 max-h-32"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-700 disabled:bg-muted disabled:text-muted-foreground text-white flex items-center justify-center shrink-0 transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 px-2">
              LEXO AI can make mistakes. For essay grading, use Orwell AI.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
