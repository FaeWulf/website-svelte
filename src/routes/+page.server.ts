export async function load() {
	const monitor = {
		domain: process.env.MONITOR_DOMAIN,
		id: process.env.MONITOR_ID
	};

	return {
		meta: {
			title: 'HQ',
			description: "Faewulf's landing page. Includes information you might find useful about me! :/",
			keywords: ['faewulf', 'hq', 'bio', 'landing page', 'portfolio'],
			canonical: 'https://faewulf.xyz/'
		},
		monitor
	};
}
