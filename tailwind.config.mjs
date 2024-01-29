/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				jost: ['"Jost"'],
			},
			colors: {
				// Using modern `rgb`
				marromTronco: "rgba(170, 145, 117, 1)",
				marromTitulo: "rgba(89, 84, 82, 1)",
				begeCopa: "rgba(226, 221, 200, 1)",
			},
		},
	},
	plugins: [],
}
