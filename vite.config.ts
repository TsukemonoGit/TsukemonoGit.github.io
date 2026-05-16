import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		{
			name: 'generate-data',
			buildStart() {
				execSync('node scripts/generate-data.js', { stdio: 'inherit', cwd: __dirname });
			}
		}
	],
	ssr: {
		noExternal: []
	}
});
