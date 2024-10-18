import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                white: 'rgb(254, 254, 254)',
                black: 'rgb(12, 12, 12)',
                'total-black': 'rgb(0, 0, 0)',
                'base-green': 'rgb(63, 85, 64)',
                'dark-green': 'rgb(61, 73, 63)',
                'natural-dark': 'rgb(100, 88, 65)',
                nude: 'rgb(194, 191, 183)',
                'natural-orange': 'rgb(180, 133, 79)',
                gray: 'rgb(97, 97, 97)',
                'gray-light': 'rgb(179, 179, 179)',
                error: 'rgb(168, 14, 14)',
                'calendar-bcg': 'rgb(239, 235, 231)',
            },
            screens: {
                pc: '1440px',
            },
        },
    },
    plugins: [],
};
export default config;
