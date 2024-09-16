module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      inset: {
        '10pe': '10%',
        '25': '100px',
      }
    },
  },
  plugins: [],
}
