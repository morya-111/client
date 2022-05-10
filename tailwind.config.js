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
				greyText: "#424242",
				bgGrey100: "rgba(168, 168, 168, 1)",
				bgGrey45: "rgba(168, 168, 168, 0.45)",
				bgGrey32: "rgba(168, 168, 168, 0.32)",
				bgGrey22: "rgba(168, 168, 168, 0.22)",
			},
			screens: {
				bigMonitor: "1600px",
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
			backgroundImage: {
				"shelf-bg": "url('assets/about/shelf_bg.png')",
			},
			dropShadow: {
				"3xl": "0 2px 3px rgba(255, 255, 255, 0.25)",
			},
		},
		fontFamily: {
			sans: ["Nunito", "sans-serif"],
			imFell: ["IM Fell English", "serif"],
			martel: ["Martel Sans", "sans-serif"],
		},
	},
	variants: {
		extend: { animation: ["responsive", "motion-safe", "motion-reduce"] },
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
