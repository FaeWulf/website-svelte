<script>
	import '$lib/styles/styles_blog.css';
	import '$lib/styles/style_blog_code.css';
	import { page } from '$app/stores';
	export let data;
</script>

<h1>{data.callback.name}</h1>
<div id="blog-content">{@html data.callback.content}</div>
<a href={$page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'))}>Back</a>

<style>
	#blog-content {
		border: 1px solid rgba(var(--Text), 0.2);
		width: 100%;
		height: 100%;
		background-color: rgba(var(--Surface0), 0.4);
		backdrop-filter: blur(10px);

		border-radius: 5px;
	}

	a {
		margin: 20px;
		font-family: 'Pixel Nes', 'Tahoma';
		font-size: 1.4rem;
	}
</style>
