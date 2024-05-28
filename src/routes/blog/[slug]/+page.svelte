<script lang="ts">
	import '$lib/styles/styles_blog.css';
	import '$lib/styles/style_blog_code.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';

	//comments component
	import Giscus from '@giscus/svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;
	let postData: any;
	onMount(async () => {
		const url = $apiURL;
		const fetchBlog = await fetch(url + '/api/v1/blog/' + data.id).then((res) => res.json());
		postData = fetchBlog.data;
	});
</script>

<svelte:head>
	<MetaTags
		title={data.id.replaceAll('-', ' ').replaceAll('.md', '') + ' | Faewulf'}
		description={data.id.replaceAll('-', ' ').replaceAll('.md', '')}
		keywords={['faewulf', 'blog', data.id.replaceAll('-', ' ').replaceAll('.md', '')]}
		canonical="https://faewulf.xyz/blog/{data.id}"
	/>
</svelte:head>

{#if postData}
	<h1>{data.id.replaceAll('-', ' ').replaceAll('.md', '')}</h1>
	<h3 class="edit-date">
		Last edit on {new Date(postData.updatedAt).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})}
	</h3>
	<div class="tag">
		<div class="title">Tags:</div>
		{#each postData.tags as tag}
			<div>{tag}</div>
		{:else}
			<div>none</div>
		{/each}
	</div>
	<div id="blog-content">
		{@html postData.content}
	</div>
{:else}
	<div>Loading...</div>
{/if}
<a href={$page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'))}>Back</a>
<Giscus
	id="comments"
	repo="FaeWulf/blog-discus"
	repoId="R_kgDOLbJ5pg"
	category="Comments"
	categoryId="DIC_kwDOLbJ5ps4CdsPB"
	mapping="title"
	term=""
	strict="1"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	theme="preferred_color_scheme"
	lang="en"
	loading="lazy"
></Giscus>

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
		width: 100%;
		font-size: 15px;
		opacity: 0.6;
		margin-bottom: 5px;
	}

	a {
		margin: 20px;
		font-family: 'Pixel Nes', 'Tahoma';
		font-size: 1.4rem;
	}

	:global(giscus-widget) {
		z-index: 5;
	}

	.tag {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 5px;

		gap: 6px;
		flex-wrap: wrap;

		.title {
			font-size: 15px;
			opacity: 0.9;
			border: none;
			background: none;
		}

		div {
			background-color: rgba(var(--Text), 0.2);
			border: 1px solid rgba(var(--Text), 0.3);
			padding: 5px;
			border-radius: 5px;
			opacity: 0.8;
		}
	}
</style>
