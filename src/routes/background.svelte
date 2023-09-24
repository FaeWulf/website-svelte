<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Star, ShootingStar } from './background';
	import type { bgItem } from './background';
	//import { spring } from 'svelte/motion';

	export let background_color = '#110E19AA';

	// background
	let innerHeight: number, innerWidth: number;
	let background: HTMLCanvasElement;

	//background entity
	let entities: bgItem[] = [];

	onMount(() => {
		//background
		let bgCtx = background.getContext('2d')!,
			width = innerWidth,
			height = innerHeight;

		refreshOnSizeChange(innerHeight, innerWidth);

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);

			width = innerWidth;
			height = innerHeight;

			bgCtx.fillStyle = background_color;
			bgCtx.clearRect(0, 0, width, height);
			bgCtx.fillStyle = '#ffffff';
			bgCtx.strokeStyle = '#ffffff';

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
		for (var i = 0; i < height / 2; i++) {
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

<canvas bind:this={background} width={innerWidth} height={innerHeight} draggable="false" />

<svelte:window bind:innerHeight bind:innerWidth />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -99;
		width: 100%;
		height: 100%;
	}
</style>
