<script lang="ts">
	import { elasticInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ufoBubble } from '$lib/store';
	import { SystemManager } from 'pixi.js';
	import * as timers from 'node:timers';

	export let parent: HTMLElement;

	const default_timeout = 1000 * 5;
	$: message = '';
	$: timeout = 0;

	let bubble: HTMLElement;
	let bubbleOffsetX: number = 0,
		bubbleOffsetY: number = 0
	;

	$: current_orientation = 'top left';
	let tickSize = 20;

	let clientWidth, clientHeight;

	//dynamics
	$: toggleBubbleChat(storeContent);
	let storeContent = {message: "", timeout: 0};

	//stores
	ufoBubble.subscribe((E) => {
		storeContent = E;
	});

	function toggleBubbleChat(storeContent : {message: string; timeout: number}) {
			message = storeContent.message;
			timeout = storeContent.timeout ?? default_timeout;
	}

	onMount(() => {
		// Update bubble orientation based on the target element's position
		let lastTime = Date.now();
		const updateBubbleOrientation = () => {
			let delta = Date.now() - lastTime;
			lastTime = Date.now();

			//only process if timeout > 0 (aka showing bubble)
				timeout -= delta;

				if (timeout < -100)
					timeout = -100;


				if (parent && bubble && timeout > 0) {
					const rect = parent.getBoundingClientRect();
					const bubbleRect = bubble.getBoundingClientRect();

					const rightOverflow = rect.right + bubbleRect.width > window.innerWidth;
					const leftOverflow = rect.left - bubbleRect.width < 0;
					const topOverflow = rect.top - bubbleRect.height < 0;
					const bottomOverflow = rect.bottom + bubbleRect.height > window.innerHeight;

					if (rightOverflow) {
						current_orientation = bottomOverflow ? 'right bottom' : 'right top';
					} else if (leftOverflow) {
						current_orientation = bottomOverflow ? 'left bottom' : 'left top';
					} else if (topOverflow) {
						current_orientation = rect.left < window.innerWidth / 2 ? 'top right' : 'top left';
					} else if (bottomOverflow) {
						current_orientation = rect.left < window.innerWidth / 2 ? 'bottom right' : 'bottom left';
					}
			}

			requestAnimationFrame(updateBubbleOrientation);
		};

		const request_handle = requestAnimationFrame(updateBubbleOrientation);

		return () => {
			cancelAnimationFrame(request_handle);
		};
	});

	function updatePosition(currentPosition: string, timeout: number) {
		if (!bubble)
			return;
		switch (currentPosition) {
			case 'bottom left': {
				bubbleOffsetX = 0;
				bubbleOffsetY = -bubble.getBoundingClientRect().height - parent.clientHeight;
				break;
			}
			case 'bottom right': {
				bubbleOffsetX = -bubble.getBoundingClientRect().width + parent.clientWidth;
				bubbleOffsetY = -bubble.getBoundingClientRect().height - parent.clientHeight;
				break;
			}
			case 'top left': {
				bubbleOffsetX = 0;
				bubbleOffsetY = 0;
				break;
			}
			case 'top right': {
				bubbleOffsetX = -bubble.getBoundingClientRect().width + parent.clientWidth;
				bubbleOffsetY = 0;
				break;
			}

			case 'right top': {
				bubbleOffsetX = -bubble.getBoundingClientRect().width;
				bubbleOffsetY = -parent.clientHeight;
				break;
			}

			case 'right bottom': {
				bubbleOffsetX = -bubble.getBoundingClientRect().width;
				bubbleOffsetY = -bubble.getBoundingClientRect().height;
				break;
			}

			case 'left top': {
				bubbleOffsetX = parent.clientWidth;
				bubbleOffsetY = -parent.clientHeight;
				break;
			}

			case 'left bottom': {
				bubbleOffsetX = parent.clientWidth;
				bubbleOffsetY = -bubble.getBoundingClientRect().height;
				break;
			}
		}
	}

	$: updatePosition(current_orientation, timeout);

</script>

{#if timeout > 0}
	<div class="bubble" bind:this={bubble} transition:scale={{easing: elasticInOut, duration: 1500}} bind:clientWidth
			 bind:clientHeight style="left: {bubbleOffsetX}px; top: {bubbleOffsetY}px">
		<svg width={clientWidth} height={clientHeight} viewBox="0 0 {clientWidth} {clientHeight}">
			<rect x=0 y=0 width={clientWidth} height={clientHeight} rx=5></rect>

			{#if current_orientation === "bottom left"}
				<path d="M{tickSize*2},{clientHeight} h-{tickSize} v{tickSize} Z" />
			{:else if current_orientation === "bottom right"}
				<path d="M{clientWidth-(2*tickSize)},{clientHeight} h{tickSize} v{tickSize} Z" />
			{:else if current_orientation === "top left"}
				<path d="M{tickSize*2},0 h-{tickSize} v-{tickSize} z" />
			{:else if current_orientation === "top right"}
				<path d="M{clientWidth-(2*tickSize)},0 h{tickSize} v-{tickSize} Z" />
			{:else if current_orientation === "right top"}
				<path d="M{clientWidth},{tickSize} h{tickSize} l-{tickSize},{tickSize} Z" />
			{:else if current_orientation === "right bottom"}
				<path d="M{clientWidth},{clientHeight-tickSize} h{tickSize} l-{tickSize},-{tickSize} Z" />
			{:else if current_orientation === "left top"}
				<path d="M0,{tickSize} h-{tickSize} l{tickSize},{tickSize} Z" />
			{:else if current_orientation === "left bottom"}
				<path d="M0,{clientHeight-tickSize} h-{tickSize} l{tickSize},-{tickSize} Z" />
			{/if}
		</svg>

		<div class="bubble__text-wrapper">
			<p>{message}</p>
		</div>
	</div>
{/if}

<style lang="scss">
  .bubble {

    .bubble__text-wrapper {
      padding: 0 7px 0 7px;
      width: 200px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 0.8rem;
    }
  }

  .bubble svg {
    overflow: visible;
    position: absolute;
    left: 0;
    z-index: -1;

    filter: drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.2));
  }

  rect, path {
    fill: rgba(var(--Overlay2), 1);
  }
</style>
