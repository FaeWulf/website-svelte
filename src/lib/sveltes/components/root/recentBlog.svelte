<script lang="ts">
	import { apiURL } from '$lib/store';
	import { onMount } from 'svelte';
	import LoadingCircle from '$lib/sveltes/components/custom/LoadingCircle.svelte';

	let blogs: any;
	onMount(async () => {
		const fetchBlogs = await fetch($apiURL + '/api/v1/blog?page=1&maxPerPage=5').then((res) => res.json());
		blogs = fetchBlogs.data.data;
	});
</script>

<div class="badge-title" id="js-infotabs-recentblog">📝 Recent blog</div>
{#if blogs}
	{#each blogs as blog (blog.name)}
		<a class="post" href="/blog/{blog.path}">
			<div class="post__wrapper">
				<div class="post__description">
					<div class="post__description-name">{blog.name}</div>
					<div class="post__description-date">
						{new Date(blog.date).toLocaleDateString('en-us', {
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</div>
				</div>
			</div>
			<div class="post__wrapper post__wrapper--highlight">
				<div class="post__description">
					<div class="post__description-name">{blog.name}</div>
					<div class="post__description-date">
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
	<LoadingCircle />
{/if}
<div class="badge-dummy" />

<style lang="scss">
  .badge-title {
    flex-basis: 100%;
    text-align: center;
    background-color: rgb(var(--Overlay1));
    border: 1px var(--color-border-0) solid;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 600;
  }

  .post {
    position: relative;
    width: 100%;
    height: fit-content;

    border: 1px var(--color-border-0) solid;
    border-radius: 5px;
    color: rgb(var(--Text));
    text-decoration: none;
    overflow: hidden;

    > .post__wrapper {
      width: 100%;
      height: fit-content;

      .post__description {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        padding: 5px;

        .post__description-date {
          font-size: 0.8rem;
          color: rgba(var(--Subtext0), 1);
        }
      }

      &--highlight {
        position: absolute;
        top: 0;
        left: 0;

        width: 0;

        flex-wrap: nowrap;
        text-wrap: nowrap;

        overflow: hidden;

        background-color: rgba(var(--Green), 1);
        color: black !important;

        transition: width 0.4s ease;

        .post__description-date {
          color: black !important;
        }
      }
    }

    &:hover {
      .post__wrapper--highlight {
        width: 100%;
      }
    }
  }

  .badge-dummy {
    height: 20px;
    flex-basis: 100%;
  }
</style>
