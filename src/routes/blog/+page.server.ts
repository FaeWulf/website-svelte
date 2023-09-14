import { error } from '@sveltejs/kit';

import { files, sorted_posts } from '$lib/files.js';

export const prerender = true

export async function load({ url }) {

    //if not found any exist post
    if (!files) throw error(404, "Well, I just straight up lazy");

    const max = 7
    const totalPage = Math.ceil(sorted_posts.length / max)
    let idx = Number(url.searchParams.get('idx'))

    if (!idx || Number.isNaN(idx))
        idx = 1

    //limit check
    idx = Math.max(1, Math.min(idx, totalPage));

    let posts = sorted_posts.slice((idx - 1) * max, idx * max)

    return {
        posts,
        idx,
        totalPage
    };
}