module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"bookex-light": "#D8E3E7",
				"bookex-semi-light": "#51C4D3",
				"bookex-semi-dark": "#126E82",
				"bookex-dark": "#132C33",
				"bookex-grey-text": "#132C33",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
