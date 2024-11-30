<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { cardData } from './type';
	import { tooltip } from '$lib/utils';
	import { fade } from 'svelte/transition';

	export let cardList: cardData[] = [];

	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let crystal_Zindex = 1;
	let isClickedThreshold = 0;
	let isClicked = false;
	let wobble = false;

	let crystalWrapper: HTMLElement;
	let cardHolder: HTMLElement;
	let cardPick: cardData[] = [];

	let fortuneLine: string = '';
	//funcitons
	function fortuneTell(cards: cardData[]) {
		if (cards.length != 3) return 'Need 3 cards near me...';

		if (cards.some((card) => card.position.facing == false)) {
			return 'Please flip the cards around';
		}

		return cards[0].data.header + ', ' + cards[1].data.punchline + ', ' + cards[2].data.advice;
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
				bottom = window.innerHeight - crystalWrapper.getBoundingClientRect().height,
				right = window.innerWidth - crystalWrapper.getBoundingClientRect().width;

			crystal_Zindex = 2;
			crystalWrapper.style.top = `${Math.min(Math.max(newY, top), bottom)}px`;
			crystalWrapper.style.left = `${Math.min(Math.max(newX, left), right)}px`;

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
		}

		//reset
		isClicked = false;
		isClickedThreshold = 0;
		isDragging = false;
		crystal_Zindex = 1;
		fortuneLine = fortuneTell(cardPick);

		window.removeEventListener('pointermove', handleMouseMove);
		window.removeEventListener('pointerup', handleMouseUp);
	}

	//functions

	function checkCardInside() {
		if (!cardHolder) return;

		const cardHolderBoundingClientRect = cardHolder.getBoundingClientRect();
		cardPick = [];
		for (let i = 0; i < cardList.length; i++) {
			const cardX = cardList[i].position.x;
			const cardY = cardList[i].position.y;
			const cardWidth = 60;
			const cardHeight = 77;

			if (cardPick.length > 2) {
				break;
			}

			//checl if card is intersecting with card holder
			if (
				cardX + cardWidth >= cardHolderBoundingClientRect.left &&
				cardX <= cardHolderBoundingClientRect.right &&
				cardY + cardHeight >= cardHolderBoundingClientRect.top &&
				cardY <= cardHolderBoundingClientRect.bottom
			) {
				cardPick.push(cardList[i]);
			} else if (cardList[i].position.glow) {
				//double check if rejected card is intersecting with card holder
				const index = cardPick.indexOf(cardList[i]);
				if (index > -1) {
					cardPick.splice(index, 1);
				}
			}
		}

		for (let i = 0; i < cardList.length; i++) {
			if (cardPick.indexOf(cardList[i]) === -1) {
				cardList[i].position.glow = false;
			} else cardList[i].position.glow = true;
		}
	}

	//events
	onMount(() => {
		const crystalBoundingClientRect = crystalWrapper.getBoundingClientRect();
		offsetX = crystalBoundingClientRect.left - crystalBoundingClientRect.width - 20;
		offsetY = crystalBoundingClientRect.top;

		crystalWrapper.style.left = `${offsetX}px`;
		crystalWrapper.style.top = `${offsetY}px`;
		document.addEventListener('pointermove', checkCardInside);
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div on:pointerdown={handleMouseDown} bind:this={crystalWrapper} class="crystal" draggable="false" style:z-index={crystal_Zindex}>
	<img
		class:active={wobble}
		draggable="false"
		src="/images/isaac/items/crystalball.png"
		alt={'crystal ball'}
		use:tooltip={{
			content: fortuneLine,
			animation: 'scale',
			theme: 'catppuccin',
			trigger: 'click',
			delay: 500
		}}
	/>

	<div class="card-holder" bind:this={cardHolder} />
</div>

<style lang="scss">
	.crystal {
		position: absolute;
		touch-action: none;
		width: 80px;

		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;

		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		cursor: grab;

		img {
			width: 100%;
			transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

			&:hover {
				transform: scale(1.2);
			}

			&.active {
				animation: 0.5s wobble infinite;
			}
		}

		.card-holder {
			position: absolute;
			width: 300px;
			height: 300px;
			top: -105px;
			left: -110px;

			pointer-events: none;

			border: 1px dashed rgba(var(--Text), 0.2);
			border-radius: 50%;
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
