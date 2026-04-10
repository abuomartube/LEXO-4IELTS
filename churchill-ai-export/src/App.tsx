import { useState } from "react";
import Landing from "./pages/Landing";
import Speaking from "./pages/Speaking";

export type AppScreen = "landing" | "speaking";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("landing");

  if (screen === "speaking") {
    return <Speaking onBack={() => setScreen("landing")} />;
  }

  return <Landing onStart={() => setScreen("speaking")} />;
}
