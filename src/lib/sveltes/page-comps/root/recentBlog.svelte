<script lang="ts">
	import { apiURL } from '$lib/store';
	import { onMount } from 'svelte';

	let blogs: any;
	onMount(async () => {
		const url = $apiURL;
		const fetchBlogs = await fetch(url + '/api/v1/blog?page=1&maxPerPage=5').then((res) =>
			res.json()
		);
		blogs = fetchBlogs.data.data;
	});
</script>

<div class="title" id="infotabs-recentblog">📝 Recent blog</div>
{#if blogs}
	{#each blogs as blog (blog.name)}
		<a class="post" href="/blog/{blog.path}">
			<div class="name">{blog.name}</div>
			<div class="date">
				{new Date(blog.date).toLocaleDateString('en-us', {
					weekday: 'long',
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})}
			</div>
		</a>
	{/each}
{:else}
	<div>Loading...</div>
{/if}
<div class="dummy" />

<style lang="scss">
	.title {
		flex-basis: 100%;
		text-align: center;
		background-color: rgb(var(--Base));
		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		font-weight: 600;
	}

	.post {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		padding: 5px;

		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
		color: rgb(var(--Text));
		text-decoration: none;

		&:hover {
			color: rgb(var(--Green));
			font-weight: bold;
		}

		> .date {
			font-size: 0.8rem;
			opacity: 0.6;
		}
	}

	.dummy {
		height: 20px;
		flex-basis: 100%;
	}
</style>
