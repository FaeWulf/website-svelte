<script lang="ts">

	import { img_preview } from '$lib/store';
	import { fade, scale } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	let isFullscreen = false;
	let imgSrc = '';

	img_preview.subscribe((url) => {
		if (url.length > 0) {
			imgSrc = url;
			isFullscreen = true;
		}
	});

	const closeFullscreen = () => {
		isFullscreen = false;
		imgSrc = '';
		img_preview.set('');
	};
</script>

{#if isFullscreen}
	<div class="image-previewer-wrapper">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="image-previewer__bg" on:click={closeFullscreen} transition:fade={{duration: 200}} />
		<img class="image-previewer__img" src={imgSrc} alt="Fullscreen preview"
				 transition:scale={{duration: 350, easing: backInOut}} />
	</div>
{/if}

<style lang="scss">
  .image-previewer-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .image-previewer__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }

    .image-previewer__img {
      max-width: 70%;
      max-height: 70%;
      border-radius: 5px;
      z-index: 1000;
    }
  }
</style>