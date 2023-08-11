/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Montserrat", "sans-serif"],
        },
    },
    important: true,
    plugins: [],
    //corePlugins: {
    //    preflight: false,
    //},
};
