import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "curious-blue": {
          "50": "#F5FBFC",
          "100": "#E8F6FA",
          "200": "#CBEAF5",
          "300": "#ADDAED",
          "400": "#76B8DE",
          "500": "#4696d2",
          "600": "#397FBD",
          "700": "#27619C",
          "800": "#19467D",
          "900": "#0E305E",
          "950": "#061A3D",
        },
        pine: {
          "50": "#EBF7F7",
          "100": "#DAF2F1",
          "200": "#A4DBD8",
          "300": "#77C7C2",
          "400": "#2F9E95",
          "500": "#007468",
          "600": "#006959",
          "700": "#005744",
          "800": "#004531",
          "900": "#003321",
          "950": "#002113",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
