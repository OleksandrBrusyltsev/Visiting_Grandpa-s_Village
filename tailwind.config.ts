import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Mak"', 'Arial', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-hamburgers')],
}

export default config
