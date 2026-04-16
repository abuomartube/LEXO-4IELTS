import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme-context";
import { PasswordGate } from "@/components/password-gate";
import { setStudentEmailGetter } from "@workspace/api-client-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Study from "@/pages/study";
import Browse from "@/pages/browse";
import ProgressPage from "@/pages/progress";
import Quiz from "@/pages/quiz";
import AdminPage from "@/pages/admin";
import Synonyms from "@/pages/synonyms";
import Antonyms from "@/pages/antonyms";
import EssayChecker from "@/pages/essay-checker";
import Stories from "@/pages/stories";
import Speaking from "@/pages/speaking";
import PhrasalVerbs from "@/pages/phrasal-verbs";
import ReadingTest from "@/pages/reading-test";
import ListeningTest from "@/pages/listening-test";
import WeakWords from "@/pages/weak-words";
import { ExitCommentPopup } from "@/components/exit-comment-popup";

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

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={AdminPage} />
      <Route>
        <PasswordGate>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/study" component={Study} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/browse" component={Browse} />
            <Route path="/progress" component={ProgressPage} />
            <Route path="/synonyms" component={Synonyms} />
            <Route path="/antonyms" component={Antonyms} />
            <Route path="/phrasal-verbs" component={PhrasalVerbs} />
            <Route path="/essay-checker" component={EssayChecker} />
            <Route path="/listening-test" component={ListeningTest} />
            <Route path="/reading-test" component={ReadingTest} />
            <Route path="/stories" component={Stories} />
            <Route path="/speaking" component={Speaking} />
            <Route path="/weak-words" component={WeakWords} />
            <Route component={NotFound} />
          </Switch>
        </PasswordGate>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={base}>
            <Router />
          </WouterRouter>
          <Toaster />
          <ExitCommentPopup />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
