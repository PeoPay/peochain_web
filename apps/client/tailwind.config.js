/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, "src/**/*.{ts,tsx,js,jsx}"),
    path.join(__dirname, "index.html")
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slideUp": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
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
        "fadeIn": "fadeIn 0.5s ease-in-out",
        "slideUp": "slideUp 0.5s ease-in-out",
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
}
