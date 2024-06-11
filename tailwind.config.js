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
          primary: "#4B4A67",
          secondary: "#8DB580",
          accent: "#F28482",
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
        "wizard-dark-blue": "#2B2B3B",
        "wizard-light-blue": "#4B4A67",
        "wizard-dark-green": "#758d58",
        "wizard-light-green": "#C2CFB2",
        "wizard-white": "#FFFCFF",
      }
    }
  }
};
