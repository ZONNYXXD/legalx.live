/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-purple': '#A855F7',
                'dark-bg': '#050505',
            },
            fontFamily: {
                inter: ['var(--font-inter)', 'sans-serif'],
                outfit: ['var(--font-outfit)', 'sans-serif'],
                'plus-jakarta': ['var(--font-plus-jakarta)', 'sans-serif'],
                unbounded: ['var(--font-unbounded)', 'sans-serif'],
                'space-mono': ['var(--font-space-mono)', 'monospace'],
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
                syncopate: ['var(--font-syncopate)', 'sans-serif'],

                // Custom local fonts
                venus: ['var(--font-venus)', 'sans-serif'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
