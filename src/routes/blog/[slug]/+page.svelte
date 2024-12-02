<script lang="ts">
	import '$lib/styles/styles_blog.css';
	import '$lib/styles/style_blog_code.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';

	//comments component
	import Giscus from '@giscus/svelte';
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';
	import LoadingCircle from '$lib/sveltes/components/custom/loadingCircle.svelte';

	export let data;
	let postData: any;
	onMount(async () => {
		const url = $apiURL;
		const fetchBlog = await fetch(url + '/api/v1/blog/' + data.id).then((res) => res.json());
		postData = fetchBlog.data;
	});
</script>

<MetaTags
	title={data.id.replaceAll('-', ' ').replaceAll('.md', '') + ' | Faewulf'}
	description={data.id.replaceAll('-', ' ').replaceAll('.md', '')}
	keywords={['faewulf', 'blog', data.id.replaceAll('-', ' ').replaceAll('.md', '')]}
	canonical="https://faewulf.xyz/blog/{data.id}"
/>

{#if postData}
	<h1>{data.id.replaceAll('-', ' ').replaceAll('.md', '')}</h1>
	<h3 class="post__edit-date">
		Last edit on {new Date(postData.updatedAt).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})}
	</h3>
	<div class="post__description-tag-wrapper">
		<div class="post__description-tag-title">Tags:</div>
		{#each postData.tags as tag}
			<div class="post__description-tag">{tag}</div>
		{:else}
			<div class="post__description-tag">none</div>
		{/each}
	</div>
	<div id="blog-content">
		{@html postData.content}
	</div>
{:else}
	<LoadingCircle />
{/if}
<a class="post__back-link" href={$page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/'))}>Back</a>
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
    width: 100%;
    height: 100%;
    background-color: rgba(var(--Overlay0), 1);

    border: 1px solid rgba(var(--Subtext0), 0.2);
    border-radius: 0.5rem;

    box-shadow: 10px 10px 15px rgba(black, 0.2);

    z-index: 5;
  }

  .post__edit-date {
    width: 100%;
    font-size: 15px;
    opacity: 0.6;
    margin-bottom: 5px;
  }

  .post__back-link {
    margin: 20px;
    font-family: 'Pixel Nes', 'Tahoma';
    font-size: 1.4rem;
  }

  :global(giscus-widget) {
    z-index: 5;
  }

  .post__description-tag-wrapper {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;

    gap: 6px;
    flex-wrap: wrap;

    .post__description-tag-title {
      font-size: 15px;
      opacity: 0.9;
      border: none;
      background: none;
      color: rgb(var(--Subtext0));
    }

    .post__description-tag {
      background-color: rgba(var(--Overlay1), 1);
      border: 1px solid rgba(var(--Subtext0), 0.3);
      padding: 5px;
      border-radius: 0.5rem;
      opacity: 0.8;
    }
  }
</style>
