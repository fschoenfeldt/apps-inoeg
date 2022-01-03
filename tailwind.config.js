// @ts-check

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 **/
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.tsx",
    "./src/**/*.mdx",
    "../../common/ui/src/**/*.tsx",
    "./common/ui/src/**/*.tsx",
  ],

  theme: {
    container: {
      center: true,
      padding: false,
    },

    borderRadius: {
      DEFAULT: "1rem",
    },

    fontFamily: {
      sans: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
      title: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
      body: ["IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
    },

    boxShadow: {
      box: "0px 2px 6px rgba(0, 0, 0, 0.25)",
      appointment: "0px 4px 11px rgba(0, 0, 0, 0.25)",
      appointment2: "0px 12px 16px rgba(0, 0, 0, 0.25)",
      provider: "0px 0px 8px #77A9FF",
    },

    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#1B1B1B",
        primary: "#0E7FCE",
        notice: "#FFF1C0",
        error: "#DA1E28",
        aa_blau: "#0067AF",
        highlight: "#0E7FCE",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
