<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiURL } from '$lib/store.js';
	import Title from '$lib/sveltes/neonTitle.svelte';
	import { parseDiscordEmoji } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';

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

<svelte:head>
	<MetaTags
		title="Blog | Faewulf's Basement"
		description="The blog of Faewulf."
		keywords={['faewulf', 'blog', 'info', 'infomation']}
		canonical="https://faewulf.xyz/blog"
	/>
</svelte:head>

<div class="main">
	<Title subtitle="Blog" />
	{#if randomThought}
		<div class="random-thought">{@html randomThought}</div>
	{/if}
	{#if postData}
		<div class="container">
			{#each postData as post (post.name)}
				<a class="post" href="/blog/{post.path}">
					<div class="text-wrapper">
						<div class="text">
							<div class="post-title">{post.name}</div>
							<span class="post-date"
								>Posted on {new Date(post.date).toLocaleDateString('en-us', {
									weekday: 'long',
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}</span
							>
							<div class="tag">
								{#each post.tags as tag}
									<span class="tag-item">{tag}</span>
								{/each}
							</div>
						</div>
					</div>

					<div class="text-wrapper highlight">
						<div class="text">
							<div class="post-title">{post.name}</div>
							<span class="post-date"
								>Posted on {new Date(post.date).toLocaleDateString('en-us', {
									weekday: 'long',
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}</span
							>
							<div class="tag">
								{#each post.tags as tag}
									<span class="tag-item">{tag}</span>
								{/each}
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="pagination">
			<button disabled={index <= 1} on:click={() => gotoParams(index - 1)}> Prev </button>
			<div>{index} / {totalPage}</div>
			<button disabled={index >= totalPage} on:click={() => gotoParams(index + 1)}> Next </button>
		</div>
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<style lang="scss">
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		font-family: 'Pixel Nes', 'Tahoma';

		.random-thought {
			margin-top: 10px;
			width: 100%;
			text-align: center;
			font-size: 15px;
			opacity: 0.8;
			font-family: var(--font-body);
		}

		.container {
			position: relative;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			row-gap: 20px;
			margin-top: 20px;
			flex: 1;

			.post {
				position: relative;
				width: calc(100% - 130px);
				row-gap: 5px;

				.text-wrapper {
					.text {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;

						border-top: 4px solid rgba(var(--Text), 0.2);

						padding: 10px;

						.post-title {
							font-size: 1.7rem;
							word-spacing: -0.5rem;
						}

						.post-date {
							color: rgb(var(--Text));
						}

						.tag {
							display: flex;
							flex-wrap: wrap;
							gap: 5px;
							font-size: 12px;
							opacity: 0.6;
							.tag-item {
								color: rgb(var(--Text));
								background-color: rgba(var(--Text), 0.2);
								padding: 5px;
								border-radius: 5px;
							}
						}
					}

					&.highlight {
						position: absolute;
						top: 0;
						left: 0;

						width: 0;
						height: 100%;

						flex-wrap: nowrap;
						text-wrap: nowrap;

						overflow: hidden;

						background-color: rgba(var(--Green), 1);
						color: black;

						transition: width 0.4s ease;

						.post-date {
							color: black;
						}
					}
				}

				&:hover {
					div.highlight {
						width: 100%;
					}
				}
			}
		}
	}

	.pagination {
		width: 100%;
		height: 50px;
		display: flex;
		gap: 20px;
		justify-content: center;
		align-items: center;
	}

	a {
		color: rgb(var(--Peach));
	}

	@media only screen and (max-width: 720px) {
		.post {
			margin: 0;
			width: calc(100% - 20px) !important;

			.post-title {
				font-size: 1.2rem;
			}

			.post-date {
				font-size: 0.8rem;
			}
		}
	}
</style>
