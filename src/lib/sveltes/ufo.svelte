<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	let mouseX = 0,
		mouseY = 0,
		mouseOnScreen = false;

	let innerHeight: number, innerWidth: number;
	//ufo
	let ufo = spring(
		{ x: -50, y: -50 },
		{
			stiffness: 0.03,
			damping: 1
		}
	);
	let ufoX = -50,
		ufoY = -50;
	let ufoLean = 0;
	let ufoLastMove: Date = new Date();

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

			console.log(currentTime.getTime() - ufoLastMove?.getTime());

			if (currentTime.getTime() - ufoLastMove?.getTime() > 500) {
				const ret = document.getElementById('ufo_home');
				if (ret) {
					const pos = ret.getBoundingClientRect();
					setUFOCoords(pos.x - 8, pos.y - 10);
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
	}

	//dynamic
	$: setUFOCoords(mouseX, mouseY);

	ufo.subscribe((E) => {
		const deltaX = E.x - ufoX;
		const deltaY = E.y - ufoY;
		ufoX = E.x;
		ufoY = E.y;

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
	});
</script>

<img
	src="/gifs/ufo.gif"
	alt="ufo"
	class="ufo"
	draggable="false"
	style="top: {$ufo.y}px; left: {$ufo.x}px; transform: rotateZ({ufoLean == -1
		? '-30deg'
		: ufoLean == 1
		? '30deg'
		: '0deg'});"
/>
<svelte:window bind:innerHeight bind:innerWidth />

<style>
	.ufo {
		position: fixed;
		pointer-events: none;
		z-index: 10;
	}

	p {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 15px;
	}
</style>
