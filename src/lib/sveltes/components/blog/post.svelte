<script lang="ts">
	export let path: string = '';
	export let name: string = '';
	export let date: string = '';
	export let tags: string[] = ['none'];

	$: if (tags.length == 0)
		tags = ['uncategorized'];
</script>

<a class="post link--color" href="/blog/{path}">
	<div class="post__wrapper">
		<div class="post__description">
			<div class="post__description-title-text">{name}</div>
			<span class="post__description-date"
			>{new Date(date).toLocaleDateString('en-us', {
				weekday: 'long',
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
			</span>
			<div class="post_description-tag-wrapper">
				{#each tags as tag}
					<span class="post__description-tag-item">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</a>

<style lang="scss">
  .post {
    position: relative;
    width: calc(100% - 130px);

    background: rgb(var(--Overlay0));
    border-radius: 0.5rem;
    border: 1px solid rgba(var(--Subtext0), 0.2);
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);

    transition: all 0.2s ease;

    .post__wrapper {

      .post__description {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        row-gap: 4px;

        padding: 10px;

        .post__description-title-text {
          font-size: 1.7rem;
          margin-bottom: 0.5rem;
          color: rgb(var(--Text));
        }

        .post__description-date {
          color: rgb(var(--Subtext0));
        }

        .post_description-tag-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          font-size: 12px;

          .post__description-tag-item {
            color: rgb(var(--Subtext0));
            background-color: rgb(var(--Overlay2));
            padding: 5px;
            border-radius: 5px;
          }
        }
      }
    }

    &:hover {
      transform: scale(1.01);
      background-color: rgb(var(--Overlay1));
      border: 1px solid rgba(var(--Green), 0.6);
    }
  }

  .link--color {
    &:hover {
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 720px) {
    .post {
      margin: 0;
      width: calc(100% - 20px) !important;

      .post__description-title-text {
        font-size: 1.2rem;
      }

      .post__description-date {
        font-size: 0.8rem;
      }
    }
  }

</style>