<script lang="ts">
	import { onMount } from 'svelte';
	import { tooltip } from '$lib/utils';
	import type { cardData, runeData } from './type';

	export let cardList: cardData[] = [];
	export let runeList: runeData[] = [];

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let box_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;
	let wobble = false;

	let boxWrapper: HTMLElement;

	//funcitona
	function handleScreenMouseMove(event: MouseEvent) {
		let selectedCardIndex = cardList.findIndex((card) => card.position.selecting == true);

		if (selectedCardIndex == -1) return;

		const boxWrapperRect = boxWrapper.getBoundingClientRect();
		const selectedCard = cardList[selectedCardIndex];

		const cardWidth = 60;
		const cardHeight = 77;

		if (
			selectedCard.position.x + cardWidth >= boxWrapperRect.left &&
			selectedCard.position.x <= boxWrapperRect.right &&
			selectedCard.position.y + cardHeight >= boxWrapperRect.top &&
			selectedCard.position.y <= boxWrapperRect.bottom
		) {
			selectedCard.position.glow = true;
		} else {
			selectedCard.position.glow = false;
		}
	}

	function handleScreenMouseUp(event: MouseEvent) {
		//because last selected card is always the last element, you can check that fucntion in card.svelte
		const selectedCard = cardList[cardList.length - 1];
		const boxWrapperRect = boxWrapper.getBoundingClientRect();

		const cardWidth = 60;
		const cardHeight = 77;

		//delete the card
		if (
			selectedCard &&
			selectedCard.position.x + cardWidth >= boxWrapperRect.left &&
			selectedCard.position.x <= boxWrapperRect.right &&
			selectedCard.position.y + cardHeight >= boxWrapperRect.top &&
			selectedCard.position.y <= boxWrapperRect.bottom
		) {
			cardList.pop();

			wobble = true;
			setTimeout(() => {
				wobble = false;
			}, 500);
		}

		//rune delete
		const selectedRune = runeList[runeList.length - 1];
		const runeWidth = 60;
		const runeHeight = 72;

		if (
			selectedRune &&
			selectedRune.position.x + runeWidth >= boxWrapperRect.left &&
			selectedRune.position.x <= boxWrapperRect.right &&
			selectedRune.position.y + runeHeight >= boxWrapperRect.top &&
			selectedRune.position.y <= boxWrapperRect.bottom
		) {
			runeList.pop();

			wobble = true;
			setTimeout(() => {
				wobble = false;
			}, 500);
		}
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
				bottom = window.innerHeight - boxWrapper.getBoundingClientRect().height,
				right = window.innerWidth - boxWrapper.getBoundingClientRect().width;

			box_Zindex = 2;
			boxWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			boxWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;

			if (isClickedThreshold > 10) {
				isClicked = false;
			}
		}
	}

	function handleMouseUp() {
		if (isClicked) {
			/*
			wobble = true;

			setTimeout(() => {
				wobble = false;
			}, 500);
			*/
		}

		//reset
		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		box_Zindex = 1;

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	onMount(() => {
		const boxBoundingClientRect = boxWrapper.getBoundingClientRect();
		offsetX = boxBoundingClientRect.left + 80;
		offsetY = boxBoundingClientRect.top + 80;

		boxWrapper.style.top = `${offsetY}px`;
		boxWrapper.style.left = `${offsetX}px`;

		window.addEventListener('pointermove', handleScreenMouseMove);
		window.addEventListener('pointerup', handleScreenMouseUp);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
	on:pointerdown={handleMouseDown}
	bind:this={boxWrapper}
	class="box"
	class:active={wobble}
	draggable="false"
	src="/images/isaac/items/box.png"
	style:z-index={box_Zindex}
	alt="The Box"
	use:tooltip={{
		content: 'Throw unuse cards, rune, stone in here',
		animation: 'scale',
		theme: 'catppuccin'
	}}
/>

<style lang="scss">
	.box {
		position: absolute;

		width: 100px;

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
			animation: 0.5s wobble infinite ease;
		}
	}

	@keyframes wobble {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
