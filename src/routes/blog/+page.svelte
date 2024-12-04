<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiURL } from '$lib/store.js';
	import { parseDiscordEmoji } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import MetaTags from '$lib/components/custom/MetaTags.svelte';

	import Title from '$lib/components/custom/neonTitle.svelte';
	import Post from '$lib/components/blog/post.svelte';
	import LoadingCircle from '$lib/components/custom/LoadingCircle.svelte';

	export let data;

	const url = $apiURL;
	const max = 5;

	let postData: Array<any>;
	let totalPage: number;
	let index: number;
	let randomThought: string;

	onMount(async () => {
		const pseudoFetch = await fetch(url + '/api/v1/blog' + `?page=1&maxPerPage=${max}`).then((res) => res.json());
		const maxPage = pseudoFetch.data.maxPage;

		index = Math.max(1, Math.min(data.idx, maxPage)) || 1;

		const fetchBlogs = await fetch(url + '/api/v1/blog' + `?page=${index}&maxPerPage=${max}`).then((res) => res.json());
		postData = fetchBlogs.data.data;

		totalPage = fetchBlogs.data.maxPage;

		const fetchRandomThought = await fetch(url + '/api/v1/discord/randomthought').then((res) => res.json());
		randomThought = '「' + parseDiscordEmoji(fetchRandomThought.data) + '」';
	});

	//dynamic
	$: gotoIndex(data.idx);

	//function
	function gotoParams(index: number) {
		goto(`?idx=${index}`);
	}

	async function gotoIndex(idx: number) {
		const pseudoFetch = await fetch(url + '/api/v1/blog' + `?page=1&maxPerPage=${max}`).then((res) => res.json());
		const maxPage = pseudoFetch.data.maxPage;

		index = Math.max(1, Math.min(idx, maxPage)) || 1;

		const fetchBlogs = await fetch(url + '/api/v1/blog' + `?page=${index}&maxPerPage=${max}`).then((res) => res.json());
		postData = fetchBlogs.data.data;

		totalPage = fetchBlogs.data.maxPage;
	}
</script>

<MetaTags
	title="Blog | Faewulf's Basement"
	description="A personal blog site of Faewulf."
	keywords={['faewulf', 'blog', 'info', 'information']}
	canonical="https://faewulf.xyz/blog"
/>

<div class="main-wrapper">
	<Title subtitle="Blog" />
	{#if randomThought}
		<div class="main__random-thought-text">{@html randomThought}</div>
	{/if}
	{#if postData}
		<div class="main__content-wrapper">
			{#each postData as post (post.name)}
				<Post path={post.path} name={post.name} tags={post.tags} date={post.date} />
			{/each}
		</div>
		<div class="main__pagination">
			<button disabled={index <= 1} on:click={() => gotoParams(index - 1)}> Prev</button>
			<div>{index} / {totalPage}</div>
			<button disabled={index >= totalPage} on:click={() => gotoParams(index + 1)}> Next</button>
		</div>
	{:else}
		<LoadingCircle />
	{/if}
</div>

<style lang="scss">
  .main-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    //font-family: 'Pixel Nes', 'Tahoma';

    .main__random-thought-text {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      font-size: 15px;
      opacity: 0.8;
    }

    .main__content-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      row-gap: 15px;
      margin-top: 20px;
      flex: 1;
    }
  }

  .main__pagination {
    width: 100%;
    height: 50px;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
</style>
