import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const fontStyles = `
  :root {
    --background: 134 20% 90%;
    --foreground: 142 16% 27%;
    --card: 0 0% 100%;
    --card-foreground: 142 16% 27%;
    --popover: 0 0% 100%;
    --popover-foreground: 142 16% 27%;
    --primary: 135 18% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 142 15% 44%;
    --secondary-foreground: 0 0% 100%;
    --muted: 134 20% 95%;
    --muted-foreground: 142 16% 45%;
    --accent: 142 15% 44%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 134 12% 85%;
    --input: 134 12% 85%;
    --ring: 135 18% 53%;
    --radius: 0.5rem;
    
    --chart-1: 135 18% 53%;
    --chart-2: 142 15% 44%;
    --chart-3: 142 20% 36%;
    --chart-4: 134 20% 90%;
    --chart-5: 142 16% 27%;
  }

  *::-webkit-scrollbar, *::-webkit-scrollbar-track {
    display: none;
  }

  body {
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
`;

// Add custom styles
const style = document.createElement('style');
style.textContent = fontStyles;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
