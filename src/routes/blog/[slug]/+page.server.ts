export async function load({ params, url }) {
	return {
		id: params.slug.replaceAll('-', ' '),
		host: url.host,
		protocol: url.protocol,
		meta: {
			title: params.slug.replaceAll('-', ' ').replaceAll('.md', ''),
			description: params.slug.replaceAll('-', ' ').replaceAll('.md', ''),
			keywords: ['faewulf', 'blog', params.slug.replaceAll('-', ' ').replaceAll('.md', '')]
		}
	};
}
