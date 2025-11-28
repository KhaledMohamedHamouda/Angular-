// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // يحدد المسارات التي يجب على Tailwind مسحها ضوئياً للعثور على الكلاسات المستخدمة
    // المسار الافتراضي لـ Angular:
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            // ⬅️ تعريفات الرسوم المتحركة (keyframes)
            keyframes: {
                typing: {
                    // يبدأ عرض النص من صفر
                    "0%": { width: "0%" },
                    // ينتهي النص بالظهور الكامل
                    "100%": { width: "100%" },
                },
                blink: {
                    // تأثير المؤشر الوامض
                    "0%, 100%": { "border-right-color": "transparent" },
                    "50%": { "border-right-color": "white" },
                },
                "fade-in-up": {
                    // يبدأ العنصر مخفياً وأسفل قليلاً
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    // ينتهي العنصر بالظهور الكامل في مكانه
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            // ⬅️ تطبيق الرسوم المتحركة (animation utility classes)
            animation: {
                // يتم تطبيقه على العنوان الرئيسي (H1)
                typing: "typing 3.5s steps(40, end) forwards",
                // مؤشر وامض - لا ينتهي
                blink: "blink 0.75s step-end infinite",
                // يستخدم للظهور العام
                "fade-in-up": "fade-in-up 1s ease-out forwards",
                // يستخدم للظهور بتأخير على العبارة التكميلية
                "fade-in-up-delay-1": "fade-in-up 1s ease-out forwards 0.5s",
            },
        },
    },
    plugins: [],
};