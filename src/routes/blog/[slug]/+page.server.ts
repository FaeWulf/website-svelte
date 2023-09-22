import { error } from '@sveltejs/kit';
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
//import { markedEmoji } from "marked-emoji";
//import emojis from '$lib/emoji.json'

import hljs from 'highlight.js';

import { getPosts, getPostsData } from '$lib/files.js';

const marked = new Marked(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

export async function load({ params }) {
	//finding post matches params
	const post = (await getPosts()).find((name) => name.replaceAll(" ", "-").replace('.md', "") === params.slug);

	//if not found any exist post
	if (!post) throw error(404, "Ehh, I don't think I made this post.. yet..");

	//read file
	const callback = async () => {
		const data = await getPostsData()
		const result = data[params.slug]

		return ({
			name: post.replace('.md', ""),
			content: marked.parse(result)
		})
	}

	return {
		streamed: {
			callback: callback()
		}
	};
}