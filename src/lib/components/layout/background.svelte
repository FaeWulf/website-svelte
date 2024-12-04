<script lang="ts">
	import { onMount } from 'svelte';
	import type { bgItem } from '$lib/scripts/page-comps/layout/background';
	import { ShootingStar, Star } from '$lib/scripts/page-comps/layout/background';
	import { isMobile } from '$lib/utils';
	import { theme } from '$lib/store';

	export let background_color = '#110E19AA';

	// background
	let innerHeight: number, innerWidth: number;
	let background: HTMLCanvasElement;

	let numbers_of_stars = 200;

	//background entity
	let entities: bgItem[] = [];

	onMount(() => {
		//background
		let bgCtx = background.getContext('2d')!,
			width = innerWidth,
			height = innerHeight;

		numbers_of_stars = isMobile(window, window.navigator) ? width / 2 : height / 2;

		refreshOnSizeChange(innerHeight, innerWidth);

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);

			width = innerWidth;
			height = innerHeight;

			bgCtx.fillStyle = background_color;
			bgCtx.clearRect(0, 0, width, height);
			if ($theme == 'dark') {
				bgCtx.fillStyle = '#ffffffaa';
				bgCtx.strokeStyle = '#ffffffaa';
			} else {
				bgCtx.fillStyle = '#000000aa';
				bgCtx.strokeStyle = '#000000aa';
			}


			var entLen = entities.length;

			while (entLen--) {
				entities[entLen].update(bgCtx, width, height);
			}
		});

		return {
			destroy() {
				cancelAnimationFrame(frame);
			}
		};
	});

	function refreshOnSizeChange(innerHeight: number, innerWidth: number) {
		let width = innerWidth,
			height = innerHeight;

		entities = [];

		// init stars
		for (var i = 0; i < numbers_of_stars; i++) {
			entities.push(
				new Star({
					x: Math.random() * width,
					y: Math.random() * height
				})
			);
		}

		// Add 2 shooting stars to array
		entities.push(new ShootingStar(width, height));
		entities.push(new ShootingStar(width, height));
	}

	//dynamic vars
	$: refreshOnSizeChange(innerHeight, innerWidth);
</script>

<canvas class="space-canvas" bind:this={background} width={innerWidth} height={innerHeight} draggable="false" />
<div class="overlay" />

<svelte:window bind:innerHeight bind:innerWidth />

<style lang="scss">
  .space-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;
    width: 100%;
    height: 100%;
  }

  .overlay {
    z-index: -100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-size: 100vw 100vh;
    background: var(--color-bg-0) radial-gradient(ellipse at top, var(--color-bg-1) 0%, var(--color-bg-2) 85%) fixed;
  }
</style>
