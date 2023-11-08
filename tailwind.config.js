/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./MainScreen.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "01-blue-mission": "#92CDD0",
        "01-creator-light": "#86B6B9",
        "01-creator-light-secondary": "#D3ECED",
        "01-creator-dark": "#4B6465",
        "01-creator-dark-secondary": "#394E50",
        "01-creator-background-color": "#2E6297",
        "01-creator-background-dark-color": "#101828",
        "02-purple-mission": "#2E6297",
        "02-collector-dark": "#1C3C59",
        "03-green-mission": "#00B0AD",
        "03-storer-icon": "#1E5355",
        "03-storer-light": "#80D8D6",
        "04-green-dark": "#47A8AB",
      },
    },
  },
  plugins: [],
};
