import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0b2747",
        navy2: "#071b31",
        brandblue: "#0877bd",
        teal: "#1db79c",
        teal2: "#08a88e",
        ink: "#132e4e",
        muted: "#60738b",
        line: "#e7eef3",
        soft: "#f4fafb",
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
        display: ["Poppins", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(11,39,71,.08)",
      },
      borderRadius: {
        card: "13px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};

export default config;
