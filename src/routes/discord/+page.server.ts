import { redirect } from '@sveltejs/kit';

export async function load() {
	const fetchData = await fetch(process.env.PUBLIC_server + '/api/v1/discord/invite').then((res) => res.json());

	if (fetchData.data)
		throw redirect(307, fetchData.data);

	return {
		success: fetchData.data
	};
}
