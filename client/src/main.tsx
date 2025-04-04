import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const fontStyles = `
  :root {
    --background: 120 22% 90%;
    --foreground: 134 16% 27%;
    --card: 0 0% 100%;
    --card-foreground: 134 16% 27%;
    --popover: 0 0% 100%;
    --popover-foreground: 134 16% 27%;
    --primary: 135 18% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 142 15% 44%;
    --secondary-foreground: 0 0% 100%;
    --muted: 120 22% 95%;
    --muted-foreground: 134 16% 45%;
    --accent: 120 22% 95%;
    --accent-foreground: 134 16% 27%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 134 16% 85%;
    --input: 134 16% 85%;
    --ring: 135 18% 53%;
    --radius: 0.75rem;
    
    --chart-1: 135 18% 53%;
    --chart-2: 142 15% 44%;
    --chart-3: 139 19% 36%;
    --chart-4: 120 22% 90%;
    --chart-5: 134 16% 27%;
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
