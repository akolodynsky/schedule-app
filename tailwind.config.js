/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
  content: [
    "./App.{js, jsx, ts, tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/components/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/components/ui/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/screens/**/*.{js,jsx,ts,tsx}",
    "./node_modules/nativewind/dist/**/*.{js,ts}",
  ],
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