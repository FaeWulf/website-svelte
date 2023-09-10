import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import fs from 'node:fs/promises'
import path from 'path';



export async function load({ params }) {
	const pathname = path.resolve()
	let files = await fs.readdir(path.resolve(pathname + "/src/lib/articles/"))

	//finding post matches params
	const post = files.find((name) => name.replaceAll(" ", "-").replace('.md', "") === params.slug);

	//if not found any exist post
	if (!post) throw error(404, "Ehh, I don't think I made this post.. yet..");

	//prepare post for rendering
	//read file
	const data = await fs.readFile(path.resolve(pathname + "/src/lib/articles/" + post), { encoding: 'utf-8' })

	const callback = {
		name: post.replace('.md', ""),
		content: marked.parse(data)
	}

	return {
		callback
	};
}