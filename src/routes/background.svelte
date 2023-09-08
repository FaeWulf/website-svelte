<script lang="ts">
	import { onMount } from 'svelte';
	import { Star, ShootingStar } from './background';
	import type { bgItem } from './background';
	export let background_color = '#110E19AA';

	onMount(() => {
		let requestAnimationFrame = window.requestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;

		let background = <HTMLCanvasElement>document.getElementById('background'),
			bgCtx = background?.getContext('2d')!,
			width = window.innerWidth,
			height = window.innerHeight;
		background.width = width;
		background.height = height;

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

<canvas id="background" draggable="false" />

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -99;
	}
</style>
