<script lang="ts">
	import { onMount } from 'svelte';
	import { Star, ShootingStar } from './background';
	import type { bgItem } from './background';
	//import { spring } from 'svelte/motion';

	export let background_color = '#110E19AA';

	let innerHeight: number, innerWidth: number;
	let background: HTMLCanvasElement;

	onMount(() => {
		let requestAnimationFrame = window.requestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;

		let bgCtx = background.getContext('2d')!,
			width = innerWidth,
			height = innerHeight;

		let entities: bgItem[] = [];

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

		//animate background
		function animate() {
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
			requestAnimationFrame(animate);
		}

		animate();
	});
</script>

<canvas bind:this={background} width={innerWidth} height={innerHeight} draggable="false" />

<p>{innerHeight} x {innerWidth}</p>

<svelte:window bind:innerHeight bind:innerWidth />

<!-- svelte-ignore a11y-no-static-element-interactions
<svg
	on:mousemove={(e) => {
		coords.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(8)}
	on:mouseup={() => size.set(2)}
>
	<circle cx={$coords.x} cy={$coords.y} r={$size} />
</svg>
 -->
<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -99;
		width: 100%;
		height: 100%;
	}

	p {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 15px;
	}
</style>
