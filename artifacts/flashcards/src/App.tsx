import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme-context";
import { PasswordGate } from "@/components/password-gate";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { setStudentEmailGetter } from "@workspace/api-client-react";

const Home = lazy(() => import("@/pages/home"));
const Study = lazy(() => import("@/pages/study"));
const Browse = lazy(() => import("@/pages/browse"));
const ProgressPage = lazy(() => import("@/pages/progress"));
const Quiz = lazy(() => import("@/pages/quiz"));
const AdminPage = lazy(() => import("@/pages/admin"));
const Synonyms = lazy(() => import("@/pages/synonyms"));
const Antonyms = lazy(() => import("@/pages/antonyms"));
const EssayChecker = lazy(() => import("@/pages/essay-checker"));
const WritingHistory = lazy(() => import("@/pages/writing-history"));
const Stories = lazy(() => import("@/pages/stories"));
const Speaking = lazy(() => import("@/pages/speaking"));
const PhrasalVerbs = lazy(() => import("@/pages/phrasal-verbs"));
const ReadingTest = lazy(() => import("@/pages/reading-test"));
const ListeningTest = lazy(() => import("@/pages/listening-test"));
const WeakWords = lazy(() => import("@/pages/weak-words"));
const SpeakingTopics = lazy(() => import("@/pages/speaking-topics"));
const WritingTemplates = lazy(() => import("@/pages/writing-templates"));
const TeacherDashboard = lazy(() => import("@/pages/teacher-dashboard"));
const MockTest = lazy(() => import("@/pages/mock-test"));
const Grammar = lazy(() => import("@/pages/grammar"));
const Lessons = lazy(() => import("@/pages/lessons"));
const SentenceBuilder = lazy(() => import("@/pages/sentence-builder"));
const FlipIt = lazy(() => import("@/pages/flip-it"));
const SpellIt = lazy(() => import("@/pages/spell-it"));
const NotFound = lazy(() => import("@/pages/not-found"));

setStudentEmailGetter(() => {
  try {
    const raw = localStorage.getItem("4ielts_email");
    if (!raw) return null;
    const { email, token } = JSON.parse(raw);
    if (!email || !token) return null;
    return { email, token };
  } catch { return null; }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route path="/teacher" component={TeacherDashboard} />
        <Route>
          <PasswordGate>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/lessons" component={Lessons} />
              <Route path="/study" component={Study} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/browse" component={Browse} />
              <Route path="/progress" component={ProgressPage} />
              <Route path="/synonyms" component={Synonyms} />
              <Route path="/antonyms" component={Antonyms} />
              <Route path="/phrasal-verbs" component={PhrasalVerbs} />
              <Route path="/essay-checker" component={EssayChecker} />
              <Route path="/writing-history" component={WritingHistory} />
              <Route path="/listening-test" component={ListeningTest} />
              <Route path="/reading-test" component={ReadingTest} />
              <Route path="/stories" component={Stories} />
              <Route path="/speaking" component={Speaking} />
              <Route path="/speaking-topics" component={SpeakingTopics} />
              <Route path="/writing-templates" component={WritingTemplates} />
              <Route path="/weak-words" component={WeakWords} />
              <Route path="/grammar" component={Grammar} />
              <Route path="/mock-test" component={MockTest} />
              <Route path="/sentence-builder" component={SentenceBuilder} />
              <Route path="/flip-it" component={FlipIt} />
              <Route path="/spell-it" component={SpellIt} />
              <Route component={NotFound} />
            </Switch>
          </PasswordGate>
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={base}>
            <Router />
            <PwaInstallPrompt />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
