/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark:      "#0D0F1A",
          light:     "#F0F3F8",
          muted:     "#CBD5E1",
          mid:       "#475569",
          primary:   "#ADEBB3",
          secondary: "#59D99D",
        },
      },
    },
    plugins: [],
  };
  