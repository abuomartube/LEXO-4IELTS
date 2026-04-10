/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B3E",
          50:  "#eceef5",
          100: "#c5cce6",
          200: "#9daad6",
          300: "#7588c6",
          400: "#4d66b6",
          500: "#3a50a0",
          600: "#2d3e7d",
          700: "#202d5a",
          800: "#141e3e",
          900: "#0D1B3E",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50:  "#fdf8ec",
          100: "#f7e9c2",
          200: "#f0d899",
          300: "#e9c870",
          400: "#e2b847",
          500: "#C9A84C",
          600: "#b09440",
          700: "#8d7532",
          800: "#6a5726",
          900: "#473a19",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
