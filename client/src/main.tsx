import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load web fonts
const webFonts = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
`;

// Add web fonts
const style = document.createElement('style');
style.textContent = webFonts;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
