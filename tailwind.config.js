// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // ... (باقي الإعدادات)
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#135bec",
                "background-light": "#f6f6f8",
                "background-dark": "#101622",
            },
            fontFamily: {
                // 💡 التغيير هنا: استخدام 'sans' ليكون الخط الافتراضي
                "sans": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}