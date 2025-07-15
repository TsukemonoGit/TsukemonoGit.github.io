import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [sveltekit(),tailwindcss(), ],   ssr: {
		noExternal: [],
		external: ['@konemono/nostr-web-components']
	}
});