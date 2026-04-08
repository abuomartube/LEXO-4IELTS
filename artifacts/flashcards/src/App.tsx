import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme-context";
import { PasswordGate } from "@/components/password-gate";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Study from "@/pages/study";
import Browse from "@/pages/browse";
import ProgressPage from "@/pages/progress";
import Quiz from "@/pages/quiz";
import AdminPage from "@/pages/admin";

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
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
