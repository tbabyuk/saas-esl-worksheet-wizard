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
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
          primary: "#122154",
          secondary: "#81ADC8",
          accent: "#F9627D"
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
        "primary-light": "#2c3e7c",
        "custom-green": "#23CE6B"
      }
    }
  }
};
