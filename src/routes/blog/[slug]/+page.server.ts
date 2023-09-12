import { error } from '@sveltejs/kit';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
//import { markedEmoji } from "marked-emoji";
//import emojis from '$lib/emoji.json'

import hljs from 'highlight.js';
import fs from 'node:fs/promises'
import path from 'path';

const marked = new Marked(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

/*
marked.use(markedEmoji({
	emojis,
	unicode: false
}));
*/

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