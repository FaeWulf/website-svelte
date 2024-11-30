<script lang="ts">
	import stone from '$lib/data/isaac_stone.json';
	import runes from '$lib/data/isaac_rune.json';
	import { onMount } from 'svelte';
	import { shuffleArray, tooltip } from '$lib/utils';
	import type { runeData } from './type';

	export let runeList: runeData[] = [];

	let runesData: {
		name: string;
		path: string;
		description: string;
		sprite: { x: number; y: number };
	}[] = [];

	stone.forEach((element) => {
		if (element.name == 'Rune1') {
			const runesName = ['Hagalaz', 'Jera', 'Ehwaz', 'Dagaz'];

			runesName.forEach((name) => {
				runesData.push({
					name: 'Rune of ' + name,
					path: name,
					description: runes[runes.findIndex((rune) => rune.name == name)].description,
					sprite: {
						x: -60,
						y: -0
					}
				});
			});
		} else if (element.name == 'Rune2') {
			const runesName = ['Ansuz', 'Perthro', 'Berkano', 'Algiz'];
			runesName.forEach((name) => {
				runesData.push({
					name: 'Rune of ' + name,
					path: name,
					description: runes[runes.findIndex((rune) => rune.name == name)].description,
					sprite: {
						x: -120,
						y: -0
					}
				});
			});
		} else {
			runesData.push(element);
		}
	});

	shuffleBag();

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let rune_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;
	let wobble = false;

	let runeWrapper: HTMLElement;

	//funcitona
	function drawRune() {
		let rune = runesData.pop();
		if (rune)
			runeList = [
				...runeList,
				{
					position: {
						x: offsetX + (Math.random() * 40 - 40) + 50,
						y: offsetY - (Math.random() * 50 + 100),
						bagX: offsetX,
						bagY: offsetY,
						selecting: false
					},
					data: rune
				}
			];
	}

	function shuffleBag() {
		shuffleArray(runesData);
	}

	//document function event

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		isClicked = true;
		initialX = event.clientX - offsetX;
		initialY = event.clientY - offsetY;

		window.addEventListener('pointermove', handleMouseMove);
		window.addEventListener('pointerup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const newX = event.clientX - initialX;
			const newY = event.clientY - initialY;

			isClickedThreshold += Math.sqrt(Math.pow(newX - offsetX, 2) + Math.pow(newY - offsetY, 2));

			offsetX = newX;
			offsetY = newY;

			let top = 0,
				left = 0,
				bottom = window.innerHeight - runeWrapper.getBoundingClientRect().height,
				right = window.innerWidth - runeWrapper.getBoundingClientRect().width;

			rune_Zindex = 2;
			runeWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			runeWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;

			if (isClickedThreshold > 10) {
				isClicked = false;
			}
		}
	}

	function handleMouseUp() {
		if (isClicked) {
			wobble = true;

			setTimeout(() => {
				wobble = false;
			}, 500);

			drawRune();
		}

		//reset
		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		rune_Zindex = 1;

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	onMount(() => {
		const runeBoundingClientRect = runeWrapper.getBoundingClientRect();
		offsetX = runeBoundingClientRect.left + 80;
		offsetY = runeBoundingClientRect.top;

		runeWrapper.style.top = `${offsetY}px`;
		runeWrapper.style.left = `${offsetX}px`;
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
	on:pointerdown={handleMouseDown}
	bind:this={runeWrapper}
	class="rune"
	class:active={wobble}
	draggable="false"
	src="/images/isaac/items/rune_bag.png"
	style:z-index={rune_Zindex}
	alt="Rune bag"
	use:tooltip={{ content: 'Click to get a rune/soul', animation: 'scale', theme: 'catppuccin' }}
/>

<style lang="scss">
	.rune {
		position: absolute;
		touch-action: none;
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;

		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

		cursor: grab;

		&:hover {
			transform: scale(1.2);
		}

		&.active {
			animation: 0.5s wobble infinite;
		}
	}

	@keyframes wobble {
		0% {
			transform: translateX(0) rotate(0deg);
		}
		20% {
			transform: translateX(-5px) rotate(-5deg);
		}
		40% {
			transform: translateX(5px) rotate(5deg);
		}
		60% {
			transform: translateX(-5px) rotate(-5deg);
		}
		80% {
			transform: translateX(5px) rotate(5deg);
		}
		100% {
			transform: translateX(0) rotate(0deg);
		}
	}
</style>
