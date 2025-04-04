import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Import Semantic UI CSS
import 'semantic-ui-css/semantic.min.css';

const fontStyles = `
  /* Custom PeoChain Theme Variables */
  :root {
    --peo-primary: #6b996d;
    --peo-secondary: #58875b;
    --peo-accent: #445e45;
    --peo-background: #eaf0ea;
    --peo-text: #2d4b2e;
    --peo-muted: #8aad8c;
    --peo-border: #d5e3d6;
    --peo-chart-1: #6b996d;
    --peo-chart-2: #58875b;
    --peo-chart-3: #445e45;
    --peo-chart-4: #eaf0ea;
    --peo-chart-5: #2d4b2e;
  }

  *::-webkit-scrollbar, *::-webkit-scrollbar-track {
    display: none;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--peo-background);
    color: var(--peo-text);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    color: var(--peo-text);
  }

  /* Custom Semantic UI Overrides */
  .ui.primary.button,
  .ui.primary.buttons .button {
    background-color: var(--peo-primary);
  }

  .ui.secondary.button,
  .ui.secondary.buttons .button {
    background-color: var(--peo-secondary);
  }

  .ui.segment {
    border-color: var(--peo-border);
  }
`;

// Add custom styles
const style = document.createElement('style');
style.textContent = fontStyles;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
