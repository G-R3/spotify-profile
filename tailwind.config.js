module.exports = {
    content: ["./src/**/*.{js,jsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                "spotify-green": "#1DB954",
            },
            gridTemplateColumns: {
                "auto-fit": "repeat(auto-fill, minmax(180px, 1fr))",
            },
        },
    },
    plugins: [],
};
