const { FaRegIdBadge } = require("react-icons/fa6");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            width: {
                1100: "1100px",
            },
            backgroundColor: {
                primary: "#F5F5F5",
                secondary: "#1266dd",
                third: "#F73859",
                "overlay-30": "rgba(0,0,0,0.6)",
            },
            flex: {
                3: "3 3 0%",
            },
        },
    },
    plugins: [],
};
