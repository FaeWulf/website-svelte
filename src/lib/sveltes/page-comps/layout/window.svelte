<script lang="ts">
	import { onMount } from 'svelte';
	import { quintInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import Bonsai from '$lib/sveltes/page-comps/layout/bonsai.svelte';

	export let windowToggle: boolean = true;
	let innerWidth: number, innerHeight: number;
	let windowEl: HTMLElement;
	let window_x = -500;
	let window_y = -500;
	//for mouseDrag

	//function

	function onMouseDown() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function onMouseUp() {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		const windowSize = windowEl.getBoundingClientRect();
		let newX = window_x + e.movementX,
			newY = window_y + e.movementY;

		let top = 0,
			left = 0,
			bottom = innerHeight - windowSize.height,
			right = innerWidth - windowSize.width;

		// window_x value will in between left and right
		window_x = Math.min(Math.max(newX, left), right);
		window_y = Math.min(Math.max(newY, top), bottom);
	}

	function onToggleButtonClick() {
		windowToggle = false;
	}

	onMount(() => {
		if (innerWidth < 1000) {
			windowToggle = false;
		}

		const windowSizeQuery = Math.min(innerWidth / 3, innerHeight / 2);
		windowEl.style.width = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';
		windowEl.style.height = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';

		const windowSize = windowEl.getBoundingClientRect();
		window_x = innerWidth - (windowSize.width + 5);
		window_y = innerHeight - (windowSize.height + 5);
	});
</script>

{#if windowToggle}
	<div
		transition:scale={{ duration: 300, start: 0.5, easing: quintInOut }}
		id="window"
		class="window"
		style:top="{window_y}px"
		style:left="{window_x}px"
		bind:this={windowEl}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="titlebar" on:mousedown={onMouseDown}>
			<div class="toggle">
				<button class="button" on:click={onToggleButtonClick} />
			</div>
		</div>
		<div class="content">
			<Bonsai />
		</div>
	</div>
{/if}

<svelte:window bind:innerHeight bind:innerWidth />

<style lang="scss">
	.window {
		position: fixed;
		width: 350px;
		height: 350px;
		min-width: 180px;
		min-height: 180px;
		z-index: 10;

		border: 1px solid rgba(var(--Green), 0.3);
		border-radius: 4px;
		box-shadow: 0 0 20px #000;

		resize: both;
		overflow: scroll;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 30px 1fr;
		grid-template-areas:
			'titlebar'
			'content';

		.titlebar {
			grid-area: titlebar;
			background: rgb(var(--Crust));
			cursor: grab;

			display: grid;
			grid-template-columns: 1fr 30px;
			grid-template-rows: 1fr;
			grid-template-areas: 'tab toggle';

			.toggle {
				grid-area: toggle;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.content {
			grid-area: content;
			overflow: scroll;
		}

		.button {
			width: 50%;
			height: 50%;

			border: none;
			border-radius: 50%;
			background: rgb(var(--Yellow));

			cursor: pointer;

			&:hover {
				opacity: 0.5;
			}
		}
	}
</style>
