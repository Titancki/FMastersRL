import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "futura": ['Futura LT', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
