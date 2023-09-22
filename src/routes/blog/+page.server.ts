import { error } from '@sveltejs/kit';

import { getPosts, getPostsInfos } from '$lib/files.js';

export async function load({ url }) {

    const files = await getPosts();
    //if not found any exist post
    if (!files) throw error(404, "Well, I just straight up lazy");

    let idx = Number(url.searchParams.get('idx'))
    const callback = async () => {
        const max = 7
        const postsInfos = await getPostsInfos();
        const totalPage = Math.ceil(postsInfos.length / max)

        if (!idx || Number.isNaN(idx))
            idx = 1

        //limit check
        idx = Math.max(1, Math.min(idx, totalPage));

        let posts = postsInfos.slice((idx - 1) * max, idx * max)

        return {
            posts,
            idx,
            totalPage
        }
    }



    return {
        callback: {
            data: callback()
        }
    };
}