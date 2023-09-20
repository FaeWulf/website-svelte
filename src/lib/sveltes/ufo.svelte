<script lang="ts">
	import { spring } from 'svelte/motion';
	import { ufoBubble } from '$lib/store';
	import { beforeUpdate, onMount } from 'svelte';
	import BubbleChat from './ufo/bubbleChat.svelte';

	let mouseX = 0,
		mouseY = 0,
		mouseOnScreen = false;

	let innerHeight: number, innerWidth: number;

	//ufo
	let ufoOptions = {
		stiffness: 0.03,
		damping: 1
	};
	let ufo = spring({ x: -50, y: -50 }, ufoOptions);
	let ufoX = -50,
		ufoY = -50;
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

			if (currentTime.getTime() - ufoLastMove?.getTime() > 500 && !ufoIdle) {
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
		if (x >= 0 && x <= innerWidth && y >= 0 && y <= innerHeight) ufo.update(() => ({ x: x, y: y }));
	}

	//dynamic
	$: setUFOCoords(mouseX, mouseY);
	$: temp(ufoX, ufoY);
	$: updateUFO($ufo.x, $ufo.y);

	function temp(x: number, y: number) {
		if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) console.log(x + ', ' + y);
	}

	function updateUFO(x: number, y: number) {
		if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) {
			ufo.set({
				x: x > innerWidth ? innerWidth : x < 0 ? 0 : x,
				y: y > innerHeight ? innerHeight : y < 0 ? 0 : y
			});
			console.log($ufo.x + ', ' + $ufo.y);
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
	}
</script>

<button
	on:click={() => {
		ufoBubble.set('Also Check my playlist! I think this is good! A lot of songs are good :)');
	}}
	style="position: absolute; z-index: 100;"
	>reset
</button>

<button
	on:click={() => {
		ufoBubble.set('Also Check my project!');
	}}
	style="position: absolute; z-index: 100; left: 100px"
	>set
</button>
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
