<script lang="ts">
	import ImagePreview from '$lib/components/custom/ImagePreview/ImagePreview.svelte';
	import { sanitizeHTML } from '$lib/utils';

	export let name: string;
	export let description: string;
	export let img: string;
	export let version: string[];
	export let disabled: boolean = false;

	img = '/images/diversity/temp.gif';

	if (description)
		description = description.replaceAll('\n', '<br/>');
</script>

<div class="entry-wrapper">
	<div class="entry__img-wrapper">
		<ImagePreview>
			<img class="entry__img" src="{img}" alt="temp.webp" />
		</ImagePreview>
	</div>
	<div class="entry__info-wrapper">
		<h2 class="entry__info-name"> ✪ {name}</h2>
		{#if description}
			<p class="entry__info-description">{@html sanitizeHTML(description)}</p>

		{/if}
		<div class="entry__info-tag-wrapper">
			{#if version}
				{#each version as tag, index (tag)}
					<p class="entry__info-tag-version">{tag}</p>
				{/each}
			{/if}
			{#if disabled}
				<p class="entry__info-tag-disabled">❌ Disabled by default</p>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">

  .entry-wrapper {
    width: 100%;

    border-radius: 0.5rem;
    border: 1px solid var(--color-border-0);
    background: rgba(var(--Overlay1), 1);
    box-shadow: 2px 2px 10px rgba(black, 0.4);
    padding: 5px;
    box-sizing: border-box;

    display: flex;
    gap: 5px;
    z-index: 1;

    .entry__img-wrapper {
      position: relative;
      aspect-ratio: 1/1;
      height: 280px;
      width: auto;
      overflow: hidden;

      border-radius: 0.5rem;

      .entry__img {
        position: absolute;
        height: 100%;
        width: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .entry__info-wrapper {
      padding: 5px 5px 5px 15px;
      display: flex;
      flex: 1;
      flex-direction: column;
      border-left: 1px solid var(--color-border-0);

      .entry__info-name {
        margin-top: 0;
      }

      .entry__info-description {
        margin-top: 0;
        flex: 1;
      }

      .entry__info-tag-wrapper {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;

        color: rgba(var(--Subtext0), 1);
        font-size: 0.9rem;

        .entry__info-tag-version,
        .entry__info-tag-disabled {
          margin: 0;
          border: 1px solid var(--color-border-0);
          border-radius: 0.5rem;
          padding: 5px 10px 5px 10px;
        }
      }
    }

  }

  @media (max-width: 720px) {

    .entry-wrapper {
      width: 100%;
      max-width: 280px;
      flex-direction: column;

      .entry__img-wrapper {
        aspect-ratio: 3/2;
        width: 100%;
        height: auto;
        padding: 5px;
      }

      .entry__info-wrapper {
        border-left: none;
        border-top: 1px solid var(--color-border-0);
      }
    }
  }

</style>

