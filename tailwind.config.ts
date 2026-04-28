import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#D9D8D5',
        'bg-dark': '#ACAB9E',
        taupe: '#896A58',
        'taupe-light': '#A88470',
        'taupe-dark': '#6A5040',
        green: '#567257',
        'green-light': '#6A8A6A',
        'green-dark': '#3E5240',
        dp: '#2A2420',
        border: 'rgba(42,36,32,0.12)',
        'border-mid': 'rgba(42,36,32,0.22)',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        josefin: ['var(--font-josefin)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
