import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import {
  ESSAY_TEMPLATES, LINKING_PHRASES,
  type EssayTemplate, type TemplateStep, type SampleParagraph, type LinkingCategory,
} from "@/data/writing-templates";
import {
  ChevronDown, ChevronRight, ArrowLeft, PenTool, BookOpen,
  CheckCircle2, XCircle, Lightbulb, Search, X, Star, Copy, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };
  return { copied, copy };
}

function HighlightedText({ text, phrases }: { text: string; phrases: string[] }) {
  if (!phrases.length) return <span>{text}</span>;

  const parts: { text: string; highlight: boolean }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestPhrase = "";
    for (const p of phrases) {
      const idx = remaining.toLowerCase().indexOf(p.toLowerCase());
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        earliestPhrase = p;
      }
    }
    if (earliest === -1) {
      parts.push({ text: remaining, highlight: false });
      break;
    }
    if (earliest > 0) parts.push({ text: remaining.slice(0, earliest), highlight: false });
    parts.push({ text: remaining.slice(earliest, earliest + earliestPhrase.length), highlight: true });
    remaining = remaining.slice(earliest + earliestPhrase.length);
  }

  return (
    <span>
      {parts.map((p, i) =>
        p.highlight ? (
          <mark key={i} className="bg-primary/15 text-primary font-semibold rounded px-0.5">{p.text}</mark>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </span>
  );
}

function SampleBlock({ sample, stepIndex }: { sample: SampleParagraph; stepIndex: number }) {
  const { copied, copy } = useCopy();
  const id = `sample-${stepIndex}`;

  return (
    <div className="space-y-2 mt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
          <Star className="w-3.5 h-3.5" />
          {sample.label} — Band {sample.band}
        </div>
        <button
          onClick={() => copy(sample.text, id)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied === id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied === id ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm leading-relaxed text-foreground">
        <HighlightedText text={sample.text} phrases={sample.highlightedPhrases} />
      </div>
      <div className="bg-muted/40 border border-border rounded-xl px-4 py-2.5 text-xs text-muted-foreground leading-relaxed">
        <span className="font-bold text-foreground">💡 Why this works: </span>
        {sample.commentary}
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: TemplateStep; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground text-sm">{step.step}</div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{step.description}</div>
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm text-muted-foreground">{step.description}</p>

          <div className="space-y-1.5">
            <div className="text-xs font-bold text-primary uppercase tracking-wider">Sentence Starters</div>
            <div className="flex flex-wrap gap-1.5">
              {step.sentenceStarters.map((s, i) => (
                <span key={i} className="inline-block bg-primary/10 text-primary text-xs font-medium rounded-lg px-2.5 py-1.5 italic">
                  "{s}"
                </span>
              ))}
            </div>
          </div>

          <SampleBlock sample={step.sample} stepIndex={index} />
        </div>
      )}
    </div>
  );
}

function TemplateDetail({ template, onBack }: { template: EssayTemplate; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"structure" | "dos">("structure");

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Templates
      </button>

      <div className="bg-card border border-border rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{template.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-foreground">{template.title}</h1>
              <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{template.taskType}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{template.titleAr}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <div className="bg-muted/50 border border-border rounded-xl px-4 py-3">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Example Question</div>
          <p className="text-sm font-medium text-foreground italic">"{template.questionExample}"</p>
        </div>
      </div>

      <div className="flex gap-1 bg-muted/50 rounded-2xl p-1">
        <button
          onClick={() => setActiveTab("structure")}
          className={cn(
            "flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all",
            activeTab === "structure" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          📝 Structure & Samples
        </button>
        <button
          onClick={() => setActiveTab("dos")}
          className={cn(
            "flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all",
            activeTab === "dos" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          ✅ Do's & Don'ts
        </button>
      </div>

      {activeTab === "structure" && (
        <div className="space-y-3">
          {template.structure.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
          <p className="text-center text-xs text-muted-foreground pt-2">
            💡 Click each step to see sentence starters and a Band 7-8 sample paragraph
          </p>
        </div>
      )}

      {activeTab === "dos" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              Do's
            </div>
            <ul className="space-y-2">
              {template.doList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold">
              <XCircle className="w-5 h-5" />
              Don'ts
            </div>
            <ul className="space-y-2">
              {template.dontList.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function LinkingPhraseCard({ category }: { category: LinkingCategory }) {
  const [expanded, setExpanded] = useState(false);
  const { copied, copy } = useCopy();

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
      >
        <span className="text-xl">{category.icon}</span>
        <div className="flex-1">
          <span className="font-bold text-foreground text-sm">{category.name}</span>
          <span className="text-xs text-muted-foreground ml-2">{category.phrases.length} phrases</span>
        </div>
        {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {category.phrases.map((p, i) => {
            const id = `${category.name}-${i}`;
            return (
              <div key={i} className="bg-muted/30 border border-border rounded-xl px-3 py-2.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">"{p.phrase}"</span>
                  <button
                    onClick={() => copy(p.phrase, id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copied === id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{p.usage}</p>
                <p className="text-xs text-foreground italic bg-muted/50 rounded-lg px-2.5 py-1.5">"{p.example}"</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function WritingTemplatesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"templates" | "linking">("templates");
  const [search, setSearch] = useState("");

  const selectedTemplate = useMemo(
    () => ESSAY_TEMPLATES.find((t) => t.id === selectedId) ?? null,
    [selectedId]
  );

  const filteredTemplates = useMemo(() => {
    if (!search.trim()) return ESSAY_TEMPLATES;
    const q = search.toLowerCase();
    return ESSAY_TEMPLATES.filter(
      (t) => t.title.toLowerCase().includes(q) || t.taskType.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [search]);

  const filteredLinking = useMemo(() => {
    if (!search.trim()) return LINKING_PHRASES;
    const q = search.toLowerCase();
    return LINKING_PHRASES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.phrases.some((p) => p.phrase.toLowerCase().includes(q) || p.usage.toLowerCase().includes(q))
    );
  }, [search]);

  const totalPhrases = LINKING_PHRASES.reduce((sum, c) => sum + c.phrases.length, 0);

  if (selectedTemplate) {
    return (
      <Layout>
        <TemplateDetail template={selectedTemplate} onBack={() => setSelectedId(null)} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-card border border-border rounded-3xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <PenTool className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Writing Templates</h1>
            <p className="text-muted-foreground mt-1">
              Essay structures, linking phrases & Band 7-8 sample paragraphs
            </p>
            <p className="text-sm text-muted-foreground mt-0.5" dir="rtl" lang="ar">
              قوالب المقالات وعبارات الربط مع فقرات نموذجية بمستوى Band 7-8
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-primary">{ESSAY_TEMPLATES.length}</div>
              <div className="text-xs text-muted-foreground">Templates</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-primary">{LINKING_PHRASES.length}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-primary">{totalPhrases}</div>
              <div className="text-xs text-muted-foreground">Phrases</div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-muted/50 rounded-2xl p-1">
          <button
            onClick={() => setActiveSection("templates")}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all",
              activeSection === "templates" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            📝 Essay Templates
          </button>
          <button
            onClick={() => setActiveSection("linking")}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-bold transition-all",
              activeSection === "linking" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            🔗 Linking Phrases
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeSection === "templates" ? "Search templates..." : "Search phrases..."}
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {activeSection === "templates" && (
          <div className="space-y-3">
            {filteredTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className="w-full bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground group-hover:text-primary transition-colors">{t.title}</span>
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t.taskType}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{t.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-medium text-muted-foreground">{t.structure.length} steps</div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto mt-1" />
                  </div>
                </div>
              </button>
            ))}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No templates match "{search}"</p>
              </div>
            )}
          </div>
        )}

        {activeSection === "linking" && (
          <div className="space-y-3">
            {filteredLinking.map((c, i) => (
              <LinkingPhraseCard key={i} category={c} />
            ))}
            {filteredLinking.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No phrases match "{search}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
