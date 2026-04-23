import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Hide the LEXO splash once the app has painted.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const splash = document.getElementById("lexo-splash");
    if (splash) {
      splash.classList.add("hide");
      setTimeout(() => splash.remove(), 400);
    }
  });
});

// ── Service Worker registration (production only) ──
// PWA features are inert in dev so they never interfere with HMR or desktop development.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* registration failed — fail silently, the web app still works */
    });
  });
}
