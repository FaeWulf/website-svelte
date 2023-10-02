<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';

	let view: HTMLCanvasElement;

	onMount(() => {
		const app = new PIXI.Application({
			view: view,
			resizeTo: document.body,
			backgroundColor: 0x141414
		});

		const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');
		bunny.anchor.set(0.5);

		bunny.x = app.screen.width / 2;
		bunny.y = app.screen.height / 2;

		app.stage.addChild(bunny);

		// Listen for animate update
		app.ticker.add((delta) => {
			// just for fun, let's rotate mr rabbit a little
			// delta is 1 if running at 100% performance
			// creates frame-independent transformation
			bunny.rotation += 0.1 * delta;
		});
	});
</script>

<canvas bind:this={view} />

<style lang="scss">
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
