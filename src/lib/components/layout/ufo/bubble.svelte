<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	import { ufoBubble } from '$lib/store';
	import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';

	let bubbleHTML: HTMLElement, ufoBoundingHTML: HTMLElement, bubbleArrowHTML: HTMLElement;
	let storeContent = { message: '', timeout: 0 };

	let message = '';
	let timeout = 0;
	const default_timeout = 1000 * 5;

	//dynamics
	$: toggleBubbleChat(storeContent);

	//stores
	ufoBubble.subscribe((E) => {
		storeContent = E;
	});

	function toggleBubbleChat(storeContent : {message: string; timeout: number}) {
		message = storeContent.message;
		timeout = storeContent.timeout ?? default_timeout;
	}

	const customBounceEasing = (t) => {
		// Simple bounce easing
		return t < 0.5
			? (1 - Math.cos(t * Math.PI * 2)) * 0.5
			: Math.pow(2, -10 * (t - 0.5)) * Math.sin((t - 0.5) * (2 * Math.PI) / 0.3) + 1;
	};

	onMount(() => {

		// Update bubble orientation based on the target element's position
		let lastTime = Date.now();
		const updateBubbleOrientation = () => {
			let delta = Date.now() - lastTime;
			lastTime = Date.now();

			//only process if timeout > 0 (aka showing bubble)
			timeout -= delta;

			if (timeout < 0) {
				timeout = 0;
			} else {
				const virtualEl = {
					getBoundingClientRect() {
						return ufoBoundingHTML.getBoundingClientRect();
					}
				};


				if (virtualEl && bubbleHTML)
					computePosition(virtualEl, bubbleHTML, {
						placement: 'top-start',
						middleware: [
							offset({ crossAxis: -10, mainAxis: 5 }),
							flip(), shift(),
							arrow({ element: bubbleArrowHTML })
						]
					}).then(({ x, y, middlewareData, placement }) => {

						//bubble it self
						Object.assign(bubbleHTML.style, {
							top: `${y}px`,
							left: `${x}px`
						});

						const side = placement.split('-')[0];

						const staticSide = {
							top: 'bottom',
							right: 'left',
							bottom: 'top',
							left: 'right'
						}[side];

						//Arrow
						if (middlewareData.arrow) {
							const { x, y } = middlewareData.arrow;

							Object.assign(bubbleArrowHTML.style, {
								left: x != null ? `${x}px` : '',
								top: y != null ? `${y}px` : '',
								// Ensure the static side gets unset when
								// flipping to other placements' axes.
								right: '',
								bottom: '',
								[staticSide]: `${-15 / 2}px`,
								transform: 'rotate(45deg)'
							});
						}
					});
			}

			requestAnimationFrame(updateBubbleOrientation);
		};

		const request_handle = requestAnimationFrame(updateBubbleOrientation);

		return () => {
			cancelAnimationFrame(request_handle);
		};
	});

</script>

<div class="bubble-chat__ufo-bounding" bind:this={ufoBoundingHTML} />

{#if timeout > 0}
	<div transition:scale={{easing: customBounceEasing, duration: 400}} class="bubble-chat__message-box"
			 bind:this={bubbleHTML}>
		<div class="bubble-chat__message-arrow" bind:this={bubbleArrowHTML} />
		<div class="bubble-chat__message-text behavior--not-click-through">
			{@html message}
		</div>
	</div>
{/if}

<style lang="scss">

  .bubble-chat__ufo-bounding {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bubble-chat__message-box {
    position: fixed;
    max-width: 300px;

    border-radius: 0.5rem;
    border: 1px solid var(--color-border-primary);

    background: rgba(var(--Overlay0, 1));

    filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5));

    .bubble-chat__message-arrow {
      position: absolute;
      width: 15px;
      height: 15px;
      background: rgba(var(--Overlay0), 1);
      border: 1px solid var(--color-border-primary);
      z-index: -1;
    }

    .bubble-chat__message-text {
      padding: 8px;
      background: rgba(var(--Overlay0), 1);
      border-radius: 0.5rem;
    }
  }
</style>
