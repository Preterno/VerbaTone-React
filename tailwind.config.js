/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#00ADB5",
        secondary: "#112031",
        text: "#F0F3F4",
        lighter: "#E2F1E7",
        accent: "#345B63",
        "primary-dark": "#008c94", 
        "accent-light": "#3d6b75", 
      },
      boxShadow: {
        "custom-sm": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-md": "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus"],
      boxShadow: ["hover", "focus"],
    },
  },
  plugins: [],
};
