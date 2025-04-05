import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./apps/client/index.html", 
    "./apps/client/src/**/*.{js,jsx,ts,tsx}", 
    "./apps/server/src/**/*.{js,jsx,ts,tsx}",
    "./packages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom PeoChain brand colors
        "accent1": {
          DEFAULT: "#1c824a",
          light: "rgba(28, 130, 74, 0.1)",
          medium: "rgba(28, 130, 74, 0.5)",
        },
        "accent2": {
          DEFAULT: "#1d613c",
          light: "rgba(29, 97, 60, 0.1)",
        },
        "accent3": {
          DEFAULT: "#1e402d",
          light: "rgba(30, 64, 45, 0.1)",
        },
        // Semantic colors
        "success": "#22C55E",
        "warning": "#F59E0B",
        "error": "#EF4444",
        "info": "#3B82F6",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dash": {
          from: { strokeDashoffset: "20" },
          to: { strokeDashoffset: "0" },
        },
        "gentle-pulse": {
          "0%": { opacity: "0.7" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.7" },
        },
        "move-along-path": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dash": "dash 1s linear infinite",
        "gentle-pulse": "gentle-pulse 2s infinite ease-in-out",
        "move-along-path": "move-along-path 2s ease-in-out forwards",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, var(--accent1) 0%, var(--accent2) 100%)",
        "gradient-background": "linear-gradient(135deg, var(--background), rgba(28, 130, 74, 0.05))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
