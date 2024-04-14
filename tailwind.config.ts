import { join } from "path";
import type { Config } from "tailwindcss";
import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";

const config = {
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
	],
	theme: {
		container: {
			center: true,
			padding: "2rem"
		},
		extend: {}
	},
	plugins: [
		skeleton({
			themes: { preset: ["crimson"] }
		}),
		forms
	]
} satisfies Config;

export default config;
