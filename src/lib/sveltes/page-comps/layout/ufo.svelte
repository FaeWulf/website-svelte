<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import BubbleChat from '$lib/sveltes/ufo/bubbleChat.svelte';
	export let toggleMovement = true;

	let x = 500,
		y = 500,
		previousX = x,
		previousY = y;

	let ufo: HTMLElement;

	let ufoLean = 0;
	let ufoLastMove: Date = new Date();
	let ufoIdle = false;
	let ufoReady = false;
	let intervalInstance: string | number | NodeJS.Timeout | undefined;

	//fuctions

	function onPointerMove(event: MouseEvent) {
		if (!toggleMovement) return;

		(x = event.clientX), (y = event.clientY);

		moveUfo(x, y);
	}

	function moveUfo(x: number, y: number, delay = 15000, doLean = true, doBounce = true) {
		const deltaX = x - previousX;
		const deltaY = y - previousY;

		previousX = x;
		previousY = y;

		if (doLean) {
			//base on X first
			if (deltaX < -1) ufoLean = -1;
			else if (deltaX > 1) ufoLean = 1;
			else ufoLean = 0;

			//then Y
			if (ufoLean == 0) {
				if (deltaY < -1) ufoLean = 1;
				else if (deltaY > 1) ufoLean = -1;
				else ufoLean = 0;
			}
		}

		//idle time calculate
		ufoLastMove = new Date();
		ufoIdle = false;

		const ufoSpeed = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / 0.0005;

		if (ufo) {
			ufo.animate(
				{
					left: `${x}px`,
					top: `${y}px`
				},
				{
					duration: delay ? delay : ufoSpeed,
					easing: doBounce ? 'cubic-bezier(.47,1.64,.41,.8)' : 'ease-in-out',
					fill: 'forwards'
				}
			);
		}
	}

	onMount(() => {
		const ret = document.getElementById('ufo_home');
		if (ret) {
			const pos = ret.getBoundingClientRect();
			//setUFOCoords(pos.x - 8, pos.y - 10);
			const ufoHomeX = pos.x - 8;
			const ufoHomeY = pos.y - 10;

			moveUfo(ufoHomeX, ufoHomeY, 1000, true, false);

			let newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() - 10);
			ufoLastMove = newDate;
			ufoIdle = false;
		}

		intervalInstance = setInterval(() => {
			const currentTime = new Date();

			if (ufoIdle) ufoLean = 0;

			if (currentTime.getTime() - ufoLastMove?.getTime() > 4000 && !ufoIdle) {
				const ret = document.getElementById('ufo_home');
				if (ret) {
					const pos = ret.getBoundingClientRect();
					moveUfo(pos.x - 8, pos.y - 10, 1000, true, false);
					ufoLastMove = new Date();
					ufoIdle = true;
				}
			}
		}, 500);

		ufoReady = true;
	});

	onDestroy(() => {
		clearInterval(intervalInstance);
	});
</script>

{#if ufoReady}
	<div class="ufo" bind:this={ufo}>
		<img src="/gifs/ufo.gif" alt="ufo" draggable="false" style="transform: rotateZ({ufoLean == -1 ? '-30deg' : ufoLean == 1 ? '30deg' : '0deg'});" />
		<BubbleChat />
	</div>
{/if}

<svelte:body
	on:mousemove={(event) => {
		onPointerMove(event);
	}}
/>

<style lang="scss">
	.ufo {
		position: fixed;
		pointer-events: none;
		z-index: 20;

		user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
