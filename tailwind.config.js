/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  screens: {
    'widescreen': { 'raw': '(min-aspect-ratio: 3/2)' },
    'tallscreen': { 'raw': '(max-aspect-ratio: 13/20)' },
  },
  plugins: [],
}