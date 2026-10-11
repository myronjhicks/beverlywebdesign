import type { Config } from "tailwindcss";

/**
 * Iteration v2 tokens live in app/globals.css (@theme).
 * This file is kept for editor tooling and is not the Tailwind v4 source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3EEE4",
        elevated: "#FFFFFF",
        ink: "#17211C",
        signal: "#A63D1D",
        line: "#D5CDBD",
        mute: "#4B524C",
      },
    },
  },
  plugins: [],
};

export default config;
