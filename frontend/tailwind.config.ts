import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: { sans: ["var(--font-roboto)", "Roboto", "sans-serif"] },
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d8f0ff",
          500: "#29a9e1",
          600: "#1d8fc2",
          700: "#166f98",
        },
        navy: { 800: "#16294d", 900: "#0f2140", 950: "#0a1730" },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#29a9e1", foreground: "#ffffff" },
        secondary: { DEFAULT: "#0f2140", foreground: "#ffffff" },
        muted: { DEFAULT: "#f1f5f9", foreground: "#64748b" },
        accent: { DEFAULT: "#eef9ff", foreground: "#0f2140" },
        card: { DEFAULT: "#ffffff", foreground: "#0f2140" },
      },
      borderRadius: { lg: "0.75rem", md: "0.6rem", sm: "0.45rem" },
      boxShadow: { soft: "0 8px 30px rgba(15,33,64,.08)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
