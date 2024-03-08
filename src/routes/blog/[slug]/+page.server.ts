export async function load({ params, url }) {
	return {
		id: params.slug,
		host: url.host,
		protocol: url.protocol
	};
}
