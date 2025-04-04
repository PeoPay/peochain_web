import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

// Define PeoChain theme colors
const colors = {
  peochain: {
    primary: "#6b996d",
    secondary: "#58875b",
    accent: "#445e45",
    background: "#eaf0ea",
    text: "#2d4b2e",
    muted: "#8aad8c",
    border: "#d5e3d6",
    chart1: "#6b996d",
    chart2: "#58875b",
    chart3: "#445e45",
    chart4: "#eaf0ea",
    chart5: "#2d4b2e",
  }
};

// Define fonts
const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
};

// Create Chakra UI theme
const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: "peochain.background",
        color: "peochain.text",
      },
      "*::-webkit-scrollbar, *::-webkit-scrollbar-track": {
        display: "none",
      },
    }
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "peochain.primary",
          color: "white",
          _hover: {
            bg: "peochain.secondary",
          },
        },
        secondary: {
          bg: "peochain.secondary",
          color: "white",
          _hover: {
            bg: "peochain.accent",
          },
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
