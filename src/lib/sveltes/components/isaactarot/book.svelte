<script lang="ts">
	import cards from '$lib/data/isaac_card.json';
	import { onMount } from 'svelte';
	import { shuffleArray, tooltip } from '$lib/utils';
	import type { cardData } from './type';
	import { fade } from 'svelte/transition';

	export let cardList: cardData[] = [];

	let cardDeck = cards;
	shuffleDeck();

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let book_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;
	let wobble = false;

	let bookWrapper: HTMLElement;

	//funcitona
	function drawCard() {
		let card = cardDeck.pop();
		if (card)
			cardList = [
				...cardList,
				{
					position: {
						x: offsetX + (Math.random() * 40 - 40) + 50,
						y: offsetY - (Math.random() * 50 + 100),
						deckX: offsetX + 30,
						deckY: offsetY,
						glow: false,
						facing: false,
						selecting: false
					},
					data: card
				}
			];
	}

	function shuffleDeck() {
		shuffleArray(cardDeck);
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
				bottom = window.innerHeight - bookWrapper.getBoundingClientRect().height,
				right = window.innerWidth - bookWrapper.getBoundingClientRect().width;

			book_Zindex = 2;
			bookWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			bookWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;

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

			drawCard();
		}

		//reset
		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		book_Zindex = 1;

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	onMount(() => {
		const bookBoundingClientRect = bookWrapper.getBoundingClientRect();
		offsetX = bookBoundingClientRect.left;
		offsetY = bookBoundingClientRect.top;

		bookWrapper.style.top = `${offsetY}px`;
		bookWrapper.style.left = `${offsetX}px`;
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
	on:pointerdown={handleMouseDown}
	bind:this={bookWrapper}
	class="book"
	class:active={wobble}
	draggable="false"
	src="/images/isaac/items/The_Book_of_Sin.png"
	style:z-index={book_Zindex}
	alt="The Book of Sin"
	use:tooltip={{ content: 'Click to draw a card', animation: 'scale', theme: 'catppuccin' }}
/>

<style lang="scss">
	.book {
		position: absolute;
		touch-action: none;
		width: 120px;

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
