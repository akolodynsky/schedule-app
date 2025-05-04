/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter_regular: ['Inter-Regular'],
        inter_medium: ['Inter-Medium'],
        inter_semibold: ['Inter-SemiBold'],
        inter_bold: ['Inter-Bold'],
      },
      colors: {
        primary: '#6f4bf7',
        light: {
          100: '#efeff9',
          200: '#929298',
          300: '#6b6f85',
        },
        dark: {
          100: '#1a1a24',
          200: '#242333',
        },
        light_bg: 'rgba(111,75,247,0.3)',
      }
    },
  },
  plugins: [],
}