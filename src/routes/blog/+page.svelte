<script lang="ts">
	import { goto } from '$app/navigation';
	import Title from '$lib/sveltes/neonTitle.svelte';
	export let data;

	function gotoParams(index: number) {
		goto(`?idx=${index}`);
	}
</script>

<svelte:head>
	<title>Faewulf's Basement | Blog</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title subtitle="Blog" />

	{#await data.callback.data}
		Loading...
	{:then data}
		<div class="container">
			{#each data.posts as post (post.name)}
				<a class="post" href="/blog/{post.name.replaceAll(' ', '-')}">
					<div class="post-title">{post.name}</div>
					<span class="post-date"
						>Posted on {post.date.toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}</span
					>
				</a>
			{/each}
		</div>
		<div class="pagination">
			<button disabled={data.idx <= 1} on:click={() => gotoParams(data.idx - 1)}> Prev </button>
			<div>{data.idx} / {data.totalPage}</div>
			<button disabled={data.idx >= data.totalPage} on:click={() => gotoParams(data.idx + 1)}>
				Next
			</button>
		</div>
	{/await}
</div>

<style>
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		font-family: 'Pixel Nes', 'Tahoma';
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
		row-gap: 20px;
		margin-top: 20px;
		flex: 1;
	}

	.pagination {
		width: 100%;
		height: 50px;
		display: flex;
		gap: 20px;
		justify-content: center;
		align-items: center;
	}

	.post {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: calc(100% - 130px);
		margin-left: 50px;
		margin-right: 50px;

		border-top: 4px solid rgba(var(--Text), 0.2);
		padding-left: 30px;
		padding-top: 10px;

		row-gap: 5px;
	}

	a {
		color: rgb(var(--Peach));
	}

	a:hover {
		color: rgb(var(--Red));
	}

	.post-title {
		font-size: 1.7rem;
		word-spacing: -0.5rem;
	}

	.post-date {
		color: rgb(var(--Text));
	}

	@media only screen and (max-width: 720px) {
		.post {
			margin: 0;
			padding-left: 15px;
			width: calc(100% - 15px);
		}

		.post-title {
			font-size: 1.2rem;
		}

		.post-date {
			font-size: 0.8rem;
		}
	}
</style>
