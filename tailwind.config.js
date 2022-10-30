/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: false,
        base: false,
        utils: true,
        logs: false,
        rtl: false,
        prefix: '',
        darkTheme: 'dark',
    },
};
