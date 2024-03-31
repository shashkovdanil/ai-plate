import { platformSelect } from 'nativewind/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        main: ['MartianMono_500Medium'],
        main600: ['MartianMono_600SemiBold'],
        main800: ['MartianMono_800ExtraBold'],
        system: platformSelect({
          ios: 'sans-serif',
          android: 'sans-serif',
          default: 'ui-sans-serif',
        }),
      },
    },
  },
  plugins: [],
}
