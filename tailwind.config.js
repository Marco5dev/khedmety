import { Config } from "tailwindcss";
import daisyui from "daisyui";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-main": "radial-gradient(circle farthest-corner at 49.7% 0.3%,rgba(150, 72, 37, 1) 0%,rgba(32, 29, 32, 1) 68.7%)",
        "gradient-main-light": "radial-gradient( circle farthest-corner at 49.7% 0.3%,  rgba(205,162,112,1) 0%, rgba(255,255,255,1) 68.7% )"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        logo: {
          primary: "#cda270",
          secondary: "#964825",
          accent: "#8c9462",
          neutral: "#201d20",
          "base-100": "#ffffff",
        },
      },
      "business"
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "logo", // name of one of the included themes for dark mode
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
};

export default config;