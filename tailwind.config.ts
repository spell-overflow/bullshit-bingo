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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
