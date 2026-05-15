/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        dark: "#0f0f0f",

        card: "rgba(255,255,255,0.05)",

        accent: "#ff8c42",

        accent2: "#ff5e3a",

        muted: "#9ca3af",

      },

      boxShadow: {

        luxury:
          "0 10px 40px rgba(0,0,0,0.35)",

        glow:
          "0 0 60px rgba(255,140,66,0.35)",

      },

      borderRadius: {

        luxury: "32px",

      },

      fontFamily: {

        sans: [
          "Plus Jakarta Sans",
          "sans-serif",
        ],

      },

      transitionTimingFunction: {

        smooth:
          "cubic-bezier(0.22, 1, 0.36, 1)",

      },

      backdropBlur: {

        xs: "2px",

      },

    },
  },

  plugins: [],
};