<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import BubbleChat from './ufo/bubbleChat.svelte';

	let mouseX = 0,
		mouseY = 0,
		mouseOnScreen = false;

	let innerHeight: number, innerWidth: number;

	//ufo
	let ufoOptions = {
		stiffness: 0.04,
		damping: 0.8
	};
	let ufo = spring({ x: -50, y: -50 }, ufoOptions);
	let ufoX = 50,
		ufoY = 50;
	let ufoLean = 0;
	let ufoLastMove: Date = new Date();
	let ufoIdle = false;

	onMount(() => {
		//mouse

		window.addEventListener('mousemove', eventMouseMove);
		window.addEventListener('mouseover', function (E) {
			mouseOnScreen = true;
		});

		window.addEventListener('mouseout', function (E) {
			mouseOnScreen = false;
		});

		setInterval(() => {
			const currentTime = new Date();

			if (currentTime.getTime() - ufoLastMove?.getTime() > 5000 && !ufoIdle) {
				const ret = document.getElementById('ufo_home');
				if (ret) {
					const pos = ret.getBoundingClientRect();
					setUFOCoords(pos.x - 8, pos.y - 10);
					ufoLastMove = new Date();
					ufoIdle = true;
				}
			}
		}, 500);
	});

	//functions
	const eventMouseMove = (E: MouseEvent) => {
		mouseX = E.clientX;
		mouseY = E.clientY;
	};

	function setUFOCoords(x: number, y: number) {
		if (x >= 0 && x <= innerWidth && y >= 0 && y <= innerHeight) ufo.set({ x: x, y: y });
		else
			ufo.update(
				() => ({
					x: x > innerWidth ? innerWidth - 5 : x < 0 ? 5 : x,
					y: y > innerHeight ? innerHeight - 5 : y < 0 ? 5 : y
				}),
				{ hard: true }
			);
	}

	//dynamic
	$: setUFOCoords(mouseX, mouseY);

	ufo.subscribe((val) => {
		let x = val.x,
			y = val.y;

		if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) {
			ufo.update(
				() => ({
					x: x > innerWidth ? innerWidth - 5 : x < 0 ? 5 : x,
					y: y > innerHeight ? innerHeight - 5 : y < 0 ? 5 : y
				}),
				{ hard: true }
			);
			//console.log($ufo.x + ', ' + $ufo.y);
			return;
		}

		const deltaX = x - ufoX;
		const deltaY = y - ufoY;

		ufoX = x;
		ufoY = y;

		if (deltaX < -1) ufoLean = -1;
		else if (deltaX > 1) ufoLean = 1;
		else ufoLean = 0;

		if (ufoLean == 0) {
			if (deltaY < -1) ufoLean = -1;
			else if (deltaY > 1) ufoLean = 1;
			else ufoLean = 0;
		}

		//idle time calculate
		ufoLastMove = new Date();
		ufoIdle = false;
	});
</script>

<div
	class="ufo"
	style="
	top: {ufoY < 0 ? 0 : ufoY > innerHeight ? innerHeight : ufoY}px;
	left: {ufoX < 0 ? 0 : ufoX > innerWidth ? innerWidth : ufoX}px;
	"
>
	<img
		src="/gifs/ufo.gif"
		alt="ufo"
		draggable="false"
		style="transform: rotateZ({ufoLean == -1 ? '-30deg' : ufoLean == 1 ? '30deg' : '0deg'});"
	/>
	<BubbleChat />
</div>

<svelte:window bind:innerHeight bind:innerWidth />

<style>
	.ufo {
		position: fixed;
		pointer-events: none;
		z-index: 10;
	}
</style>
