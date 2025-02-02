declare module "astro:actions" {
	type Actions = typeof import("/home/ronan/mariana/src/actions")["server"];

	export const actions: Actions;
}