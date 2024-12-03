<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import type { rune, runeData } from './type';
	import { tooltip } from '$lib/utils';
	import { quintOut } from 'svelte/easing';
	import runes from '$lib/data/isaac_rune.json';
	import { sticky } from 'tippy.js';

	export let runeList: runeData[];
	export let rune: rune;

	export let position: {
		x: number;
		y: number;
		bagX: number;
		bagY: number;
		selecting: boolean;
	};

	let offsetX = position.x;
	let offsetY = position.y;

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let rune_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;

	let showRune = false;

	let runeWrapper: HTMLElement;

	let runeIcon: any = undefined;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		isClicked = true;
		initialX = event.clientX - offsetX;
		initialY = event.clientY - offsetY;

		position.selecting = true;

		window.addEventListener('pointermove', handleMouseMove);
		window.addEventListener('pointerup', handleMouseUp);

		//bring moving rune to top
		//get rune index from runeList
		let runeIndex = runeList.findIndex((runeItem, index) => {
			return runeItem.data.name == rune.name;
		});

		if (runeIndex > -1) {
			//remove rune from runeList
			runeList.splice(runeIndex, 1);
			runeList = [...runeList, { position, data: rune }];
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			const newX = event.clientX - initialX;
			const newY = event.clientY - initialY;

			isClickedThreshold += Math.sqrt(Math.pow(newX - offsetX, 2) + Math.pow(newY - offsetY, 2));

			offsetX = newX;
			offsetY = newY;
			position.x = offsetX;
			position.y = offsetY;

			let top = 0,
				left = 0,
				bottom = window.innerHeight - runeWrapper.getBoundingClientRect().height,
				right = window.innerWidth - runeWrapper.getBoundingClientRect().width;

			runeWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			runeWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;
			rune_Zindex = 2;

			if (isClickedThreshold > 10) {
				isClicked = false;
			}
		}
	}

	function handleMouseUp() {
		if (isClicked) {
			showRune = true;
			//holder

			setTimeout(() => {
				showRune = false;
			}, 500);
		} else {
			//
		}

		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		rune_Zindex = 1;

		position.selecting = false;

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	onMount(() => {
		/*
		const runeBoundingClientRect = runeWrapper.getBoundingClientRect();
		offsetX = runeBoundingClientRect.left;
		offsetY = runeBoundingClientRect.top;
		*/

		runeWrapper.style.top = `${position.y}px`;
		runeWrapper.style.left = `${position.x}px`;
		offsetX = position.x;
		offsetY = position.y;

		let runeIndex = runes.findIndex((runeItem, index) => {
			return runeItem.name == rune.path;
		});

		if (runeIndex > -1) {
			runeIcon = runes[runeIndex].sprite;
		}
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	in:fly={{
		y: position.bagY - position.y,
		x: position.bagX - position.x,
		duration: 500
	}}
	out:fly={{
		y: 10
	}}
	on:pointerdown={handleMouseDown}
	bind:this={runeWrapper}
	class="rune"
	draggable="false"
	style:z-index={rune_Zindex}
>
	<div
		class="rune-front"
		use:tooltip={{
			content: rune.description,
			animation: 'scale',
			theme: 'catppuccin',
			trigger: 'click',
			placement: 'bottom',
			plugins: [sticky]
		}}
	>
		<img
			draggable="false"
			src="/images/isaac/stone_sprites.png"
			alt={rune.name}
			style="object-position: {rune.sprite.x}px {rune.sprite.y}px;"
			use:tooltip={{
				content: rune.name,
				animation: 'scale',
				theme: 'catppuccin',
				plugins: [sticky]
			}}
		/>
		{#if showRune && runeIcon}
			<img
				in:fly={{ easing: quintOut, duration: 500, x: -8, y: 13 }}
				out:fade
				src="/images/isaac/rune_sprites.png"
				alt=""
				draggable="false"
				class="rune-icon"
				style="object-position: {runeIcon.x}px {runeIcon.y}px;"
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.rune {
		position: absolute;
		width: 60px;
		height: 72px;
		touch-action: none;
		transition:
			transform 1.5s cubic-bezier(0.075, 0.82, 0.165, 1),
			box-shadow 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: transparent;

		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		cursor: grab;

		&:hover {
			transform: scale(1.2);
		}

		.rune-front {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		img {
			width: 60px;
			height: 72px;
			image-rendering: pixelated;
			image-rendering: -moz-crisp-edges;
			image-rendering: crisp-edges;
			object-fit: none;

			object-position: -0 -0;
		}

		img.rune-icon {
			position: absolute;
			top: -20px;
			right: -20px;
			width: 45px;
			height: 45px;
			image-rendering: pixelated;
			image-rendering: -moz-crisp-edges;
			image-rendering: crisp-edges;
			object-fit: none;
			object-position: -0 -0;
			transform: scale(1.5);
		}
	}
</style>
