import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "futura": ['Futura LT', 'sans-serif']
      },
      backgroundImage: {
        'bg_img': "url('app/assets/bg_img.png')",
      },
      margin: {
        auto: 'auto',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
