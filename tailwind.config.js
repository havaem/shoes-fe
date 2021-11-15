module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				black12: "#121212",
				black1f: "#1f1f1f",
				whitee2: "#e2e2e2",
				blue40: "#40BFFF",
				bluebc: "#BCDDFE",
				blue33: "#33A0FF",
				redff: "#FF4858",
				redfb: "#FB7181",
				gray37: "#373737",
				grayfa: "#FAFAFB",
				gray22: "#22262A",
				grayf6: "#f6f6f6",
				gray90: "#9098B1",
				grayfb: "#fbfbfb",
				grayf1: "#F1F3F4",
				grayc1: "#C1C8CE",
				gray3a: "#3a3b3c",
				gray24: "#242526",
				yellowff: "#FFC600",
			},
			spacing: {
				25: "100px",
			},
			lineHeight: {
				11: "2.75rem",
				12: "3rem",
				13: "3.25rem",
				"3/2": "150%",
				"9/5": "180%",
			},
			letterSpacing: {
				"1/2": "0.5px",
			},
			borderWidth: {
				3: "3px",
				5: "5px",
			},
		},
		screens: {
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
