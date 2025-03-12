import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		proxy: {
			'/lich/weapons': {
				target: 'https://api.warframe.market/v2',
				changeOrigin: true,
				secure: true
			}
		}
	}
});
