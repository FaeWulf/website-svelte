<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { card, cardData } from './type';
	import { tooltip } from '$lib/utils';
	import { sticky } from 'tippy.js'

	export let cardList: cardData[];
	export let card: card;

	export let position: {
		x: number;
		y: number;
		deckX: number;
		deckY: number;
		glow: boolean;
		//false == back, true == front
		facing: boolean;
		selecting: boolean;
	};

	let offsetX = position.x;
	let offsetY = position.y;

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let card_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;

	let cardWrapper: HTMLElement;

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		isClicked = true;
		initialX = event.clientX - offsetX;
		initialY = event.clientY - offsetY;

		position.selecting = true;

		window.addEventListener('pointermove', handleMouseMove);
		window.addEventListener('pointerup', handleMouseUp);

		//bring moving card to top
		//get card index from cardList
		let cardIndex = cardList.findIndex((cardItem, index) => {
			return cardItem.data.name == card.name;
		});

		if (cardIndex > -1) {
			//remove card from cardList
			cardList.splice(cardIndex, 1);
			cardList = [...cardList, { position, data: card }];
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
				bottom = window.innerHeight - cardWrapper.getBoundingClientRect().height,
				right = window.innerWidth - cardWrapper.getBoundingClientRect().width;

			cardWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			cardWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;
			card_Zindex = 2;

			if (isClickedThreshold > 10) {
				isClicked = false;
			}
		}
	}

	function handleMouseUp() {
		if (isClicked) {
			position.facing = !position.facing;
		} else {
			//asdf
		}

		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		card_Zindex = 1;

		position.selecting = false;

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	onMount(() => {
		/*
		const cardBoundingClientRect = cardWrapper.getBoundingClientRect();
		offsetX = cardBoundingClientRect.left;
		offsetY = cardBoundingClientRect.top;
		*/

		cardWrapper.style.top = `${position.y}px`;
		cardWrapper.style.left = `${position.x}px`;
		offsetX = position.x;
		offsetY = position.y;
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	in:fly={{
		y: position.deckY - position.y,
		x: position.deckX - position.x,
		duration: 500
	}}
	out:fly={{
		y: 10
	}}
	on:pointerdown={handleMouseDown}
	bind:this={cardWrapper}
	class="card"
	class:flip={position.facing}
	class:glow={position.glow}
	draggable="false"
	style:z-index={card_Zindex}
>
	<div class="card-back">
		<img draggable="false" src="/images/isaac/card_sprites.png" style="object-position: -252px -0;" alt="card back" />
	</div>
	<div class="card-front">
		<img
			draggable="false"
			src="/images/isaac/card_sprites.png"
			alt={card.name}
			style="object-position: {card.sprite.x}px {card.sprite.y}px;"
			use:tooltip={{ content: card.name, animation: 'scale', theme: 'catppuccin', plugins: [sticky] }}
		/>
	</div>
</div>

<style lang="scss">
	.card {
		position: absolute;
		width: 63px;
		height: 81px;
		touch-action: none;
		transition:
			transform 1.5s cubic-bezier(0.075, 0.82, 0.165, 1),
			box-shadow 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background-color: transparent;

		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		cursor: grab;
		perspective: 1000px;
		transform-style: preserve-3d;

		&:hover {
			transform: scale(1.2);
		}

		&.flip {
			transform: rotateY(180deg);

			&:hover {
				transform: rotateY(180deg) scale(1.2);
			}
		}

		&.glow {
			box-shadow:
				0 0 0 1px #ffffff80,
				0 0 0 2px #ffffff80;
		}

		.card-front,
		.card-back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			-webkit-backface-visibility: hidden;
			-moz-backface-visibility: hidden;
			backface-visibility: hidden;
		}

		.card-front {
			transform: rotateY(180deg);
		}

		img {
			width: 63px;
			height: 81px;
			image-rendering: pixelated;
			image-rendering: -moz-crisp-edges;
			image-rendering: crisp-edges;
			object-fit: none;

			object-position: -0 -0;
		}
	}
</style>
