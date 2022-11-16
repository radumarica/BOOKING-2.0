/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7743DB',
                secondary: '#86D9BC',
            },
        },
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
