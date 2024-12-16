import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-node';
//import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			directives: {
				'script-src': [
					'self',
					'https://www.youtube.com',
					'https://s.ytimg.com',
					'http://www.youtube.com/iframe_api',
					'https://uptime.faewulf.xyz/tracker.js'
				],
				'frame-src': ['self', 'https://www.youtube.com', 'https://www.youtube-nocookie.com']
			},
			reportOnly: {
				'script-src': [
					'self',
					'https://www.youtube.com',
					'https://s.ytimg.com',
					'http://www.youtube.com/iframe_api',
					'https://uptime.faewulf.xyz/tracker.js'
				],
				'frame-src': ['self', 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
				'report-uri': ['/']
			}
		}
	}
};

export default config;
