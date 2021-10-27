module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				dark: "#132C33",
				semiDark: "#126E82",
				semiLight: "#51C4D3",
				light: "#D8E3E7",
			},
			keyframes: {
				scale: {
					"0%, 100%": { transform: "scale(1)" },

					"70%": { transform: "scale(1.1)" },
				},
			},
			animation: {
				"scale-reveal": "scale 0.5s ease-in-out ",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
