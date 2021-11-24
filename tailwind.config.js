module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	variants: {
		extend: {},
	},
	plugins: [],

	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				dark: "#132C33",
				semiDark: "#126E82",
				semiLight: "#51C4D3",
				light: "#D8E3E7",
			},
			screens: {
				bigMonitor: "1600px",
			},
		},
	},
};
