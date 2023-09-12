<script>
	import '$lib/styles/styles_blog.css';
	import '$lib/styles/style_blog_code.css';
	export let data;
</script>

<h1>{data.callback.name}</h1>
<div id="blog-content">{@html data.callback.content}</div>
<div id="blog-bg" />

<style>
	#blog-content {
		border: 1px solid rgba(var(--Text), 0.2);
		width: 100%;
		height: 100%;
		background-color: rgba(var(--Surface0), 0.4);
		backdrop-filter: blur(10px);

		border-radius: 10px;
	}

	#blog-bg {
		position: absolute;
		z-index: -100;
	}
</style>
