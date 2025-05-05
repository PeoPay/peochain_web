import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceMonitoring } from "@/utils/performance-testing";
import { colors, borderRadius, typography } from "@/lib/design-tokens";

const fontStyles = `
  :root {
    /* Design system variables */
    --radius: ${borderRadius.lg};
    
    /* Legacy variables - keeping for backward compatibility */
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
    font-family: ${typography.fontFamily.sans.join(', ')};
    background-color: ${colors.background.DEFAULT};
    color: ${colors.foreground.DEFAULT};
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.heading.join(', ')};
    font-weight: ${typography.fontWeight.bold};
  }
  
  /* Animation utilities */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${colors.ring};
    outline-offset: 2px;
  }
  
  /* Improved link styles */
  a {
    color: ${colors.primary.DEFAULT};
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  a:hover {
    color: ${colors.primary.foreground};
    text-decoration: underline;
  }
`;

// Add custom styles
const style = document.createElement('style');
style.textContent = fontStyles;
document.head.appendChild(style);

// Initialize performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  initPerformanceMonitoring();
}

// Create root and render app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
