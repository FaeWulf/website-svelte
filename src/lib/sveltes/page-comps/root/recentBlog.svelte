<script lang="ts">
	import { apiURL } from '$lib/store';
	import { onMount } from 'svelte';

	let blogs: any;
	onMount(async () => {
		const url = $apiURL;
		const fetchBlogs = await fetch(url + '/api/v1/blog?page=1&maxPerPage=5').then((res) => res.json());
		blogs = fetchBlogs.data.data;
	});
</script>

<div class="title" id="infotabs-recentblog">📝 Recent blog</div>
{#if blogs}
	{#each blogs as blog (blog.name)}
		<a class="post" href="/blog/{blog.path}">
			<div class="text-wrapper">
				<div class="text">
					<div class="name">{blog.name}</div>
					<div class="date">
						{new Date(blog.date).toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</div>
				</div>
			</div>
			<div class="highlight text-wrapper">
				<div class="text">
					<div class="name">{blog.name}</div>
					<div class="date">
						{new Date(blog.date).toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</div>
				</div>
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
		height: fit-content;

		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
		color: rgb(var(--Text));
		text-decoration: none;
		overflow: hidden;

		> div.text-wrapper {
			width: 100%;
			height: fit-content;

			.text {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				align-content: flex-start;

				padding: 5px;

				> .date {
					font-size: 0.8rem;
					opacity: 0.6;
				}
			}

			&.highlight {
				position: absolute;
				top: 0;
				left: 0;

				width: 0;

				flex-wrap: nowrap;
				text-wrap: nowrap;

				overflow: hidden;

				background-color: rgba(var(--Green), 1);
				color: black;

				transition: width 0.4s ease;
			}
		}

		&:hover {
			div.highlight {
				width: 100%;
			}
		}
	}

	.dummy {
		height: 20px;
		flex-basis: 100%;
	}
</style>
