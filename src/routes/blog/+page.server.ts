import { error } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import path from 'path';

export async function load({ url }) {
    const pathname = path.resolve()
    let files = await fs.readdir(path.resolve(pathname + "/src/lib/articles/"))

    //if not found any exist post
    if (!files) throw error(404, "Well, I just straight up lazy");

    let posts = []
    for (let i = 0; i < files.length; i++) {
        const filePath = path.resolve(pathname + "/src/lib/articles/" + files[i])
        //const file = await fs.readFile(filePath)
        const date = await fs.stat(filePath)
        posts.push({
            name: files[i].replaceAll(".md", ""),
            date: date.birthtime
        })
    }

    posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime())

    const max = 7
    const totalPage = Math.ceil(posts.length / max)
    let idx = Number(url.searchParams.get('idx'))

    if (!idx || Number.isNaN(idx))
        idx = 1

    //limit check
    idx = Math.max(1, Math.min(idx, totalPage));

    posts = posts.slice((idx - 1) * max, idx * max)

    return {
        posts,
        idx,
        totalPage
    };
}