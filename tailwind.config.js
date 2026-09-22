/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#133463",
          deep: "#0E2A52",
        },
        gold: {
          DEFAULT: "#C9A13B",
          light: "#E4C878",
        },
        mist: "#F4F7FA",
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
