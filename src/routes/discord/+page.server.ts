import { redirect } from '@sveltejs/kit';
import { PUBLIC_server } from '$env/static/public';

export async function load() {
	const fetchData = await fetch(PUBLIC_server + '/api/v1/discord/invite').then((res) => res.json());

	if (fetchData.data) throw redirect(307, fetchData.data);

	return {
		success: fetchData.data,
		meta: {
			title: 'Discord invite',
			description: "Invite link to faewulf's Discord",
			keywords: ['discord invite', 'faewulf', 'discord']
		}
	};
}
