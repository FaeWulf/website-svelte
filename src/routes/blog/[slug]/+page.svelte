<script lang="ts">
	import '$lib/styles/styles_blog.css';
	import '$lib/styles/style_blog_code.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';

	export let data;
	let postData: any;
	onMount(async () => {
		const url = $apiURL;
		const fetchBlog = await fetch(url + '/api/v1/blog/' + data.id).then((res) => res.json());
		postData = fetchBlog.data;
	});
</script>

{#if postData}
	<h1>{data.id.replaceAll('-', ' ').replaceAll('.md', '')}</h1>
	<h3 class="edit-date">
		Last edit on {new Date(postData.createdAt.mtime).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})}
	</h3>
	<div id="blog-content">
		{@html postData.content}
	</div>
{:else}
	<div>Loading...</div>
{/if}
<a href={$page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'))}>Back</a>

<style lang="scss">
	#blog-content {
		border: 1px solid rgba(var(--Text), 0.2);
		width: 100%;
		height: 100%;
		background-color: rgba(var(--Mantle), 1);
		//backdrop-filter: blur(10px);

		border-radius: 5px;

		z-index: 5;
	}

	.edit-date {
		font-size: 15px;
		opacity: 0.6;
	}

	a {
		margin: 20px;
		font-family: 'Pixel Nes', 'Tahoma';
		font-size: 1.4rem;
	}
</style>
