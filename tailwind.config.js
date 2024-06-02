/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        bumblebee: {
          ...require("daisyui/src/theming/themes")["bumblebee"],
          primary: "#0B4F6C",
          secondary: "#66A182",
          accent: "#C97064",
        }
      }
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        lora: ["var(--font-lora)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        "wizard-white": "#FFFCFF",
        "custom-green": "#23CE6B",
        "wizard-blue": "#94B0DA"
      }
    }
  }
};
