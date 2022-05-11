module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin : "'Josefin Sans', sans-serif",
      },
      colors : {
        primary : {
          0 : 'hsl(236, 33%, 92%)',
          50 : 'hsl(234, 11%, 52%)',
          100 : 'hsl(220, 98%, 61%)',
          150 : 'hsl(233, 14%, 35%)',
          200 : 'hsl(0, 0%, 98%)',
          250 : 'hsl(237, 14%, 26%)',
          300 : 'hsl(236, 33%, 92%)',
          350 : 'hsl(233, 11%, 84%)',
          400 : 'hsl(236, 9%, 61%)',
          450 : 'hsl(235, 19%, 35%)',
          500 :  'hsl(235, 21%, 11%)',
          550 : 'hsl(235, 24%, 19%)',
          600 : 'hsl(234, 39%, 85%)',
          650 : 'hsl(192, 100%, 67%)',
          700 : 'hsl(280, 87%, 65%)'
        }
      }
    },
  },
  plugins: [],
}