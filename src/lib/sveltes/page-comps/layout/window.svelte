<script lang="ts">
	import { onMount } from 'svelte';
	import Bonsai from '$lib/sveltes/page-comps/layout/bonsai.svelte';
	import Console from '$lib/sveltes/page-comps/layout/console.svelte';
	import Chat from '$lib/sveltes/page-comps/layout/chat.svelte';
	import { app3rd } from '$lib/store';

	import Controller from '$lib/sveltes/page-comps/boids/controller.svelte';

	export let windowToggle: boolean = true;
	export let windowOntop: boolean = false;

	let innerHeightb4 = 0;
	let innerWidthb4 = 0;
	let innerHeight: number, innerWidth: number;
	let windowEl: HTMLElement;
	let window_x = -500;
	let window_y = -500;

	let selectTab = 3;
	let totalTabs = [
		{ id: 0, name: 'Bonsai' },
		{ id: 1, name: 'Console' },
		{ id: 3, name: 'Chat' },
		{ id: 2, name: '...' }
	];

	// based on totalTabs id
	// bonasi, console, ..., chat
	$: tabsNotification = [false, true, false, true];

	app3rd.subscribe((value) => {
		if (value != '') selectTab = 2;
	});

	//for mouseDrag
	let initialMouseX: number, initialMouseY: number, initialWindowX: number, initialWindowY: number;

	//function
	function onMouseDown(event: MouseEvent) {
		initialMouseX = event.clientX;
		initialMouseY = event.clientY;
		initialWindowX = windowEl.offsetLeft;
		initialWindowY = windowEl.offsetTop;

		document.addEventListener('pointermove', onMouseMove);
		document.addEventListener('pointerup', onMouseUp);
	}

	function onMouseUp() {
		document.removeEventListener('pointermove', onMouseMove);
		document.removeEventListener('pointerup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		const windowSize = windowEl.getBoundingClientRect();
		// let newX = window_x + e.movementX,
		// 	newY = window_y + e.movementY;
		let newX = initialWindowX + e.clientX - initialMouseX,
			newY = initialWindowY + e.clientY - initialMouseY;

		let top = 0,
			left = 0,
			bottom = innerHeight - windowSize.height,
			right = innerWidth - windowSize.width;

		// window_x value will in between left and right
		window_x = Math.min(Math.max(newX, left), right);
		window_y = Math.min(Math.max(newY, top), bottom);

		innerHeightb4 = innerHeight;
		innerWidthb4 = innerWidth;
	}

	function onToggleButtonClick() {
		windowToggle = false;
	}

	function onWindowResize(e: UIEvent) {
		const windowSize = windowEl.getBoundingClientRect();
		let deltaWidth = innerWidth - innerWidthb4;
		let deltaHeight = innerHeight - innerHeightb4;

		let newX = windowSize.left + deltaWidth,
			newY = windowSize.top + deltaHeight;

		let top = 0,
			left = 0,
			bottom = innerHeight - windowSize.height,
			right = innerWidth - windowSize.width;

		window_x = Math.min(Math.max(newX, left), right);
		window_y = Math.min(Math.max(newY, top), bottom);

		innerWidthb4 = innerWidth;
		innerHeightb4 = innerHeight;
	}

	function onClickTab(index: number) {
		selectTab = index;

		//remove notification from console tabs
		tabsNotification[index] = false;
		tabsNotification = tabsNotification;
	}

	onMount(() => {
		if (innerWidth < 1000) {
			windowToggle = false;
		}

		innerHeightb4 = innerHeight;
		innerWidthb4 = innerWidth;

		const windowSizeQuery = Math.min(innerWidth / 3, innerHeight / 2);
		windowEl.style.width = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';
		windowEl.style.height = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';

		const windowSize = windowEl.getBoundingClientRect();
		window_x = innerWidth - (windowSize.width + 5);
		window_y = innerHeight - (windowSize.height + 5);
	});
</script>

<div
	tabindex="-1"
	id="window"
	class="window"
	class:hide={!windowToggle}
	class:ontop={windowOntop}
	style:top="{window_y}px"
	style:left="{window_x}px"
	bind:this={windowEl}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="titlebar" on:pointerdown={onMouseDown}>
		<div class="tab">
			{#each totalTabs as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="item" class:selected={selectTab == tab.id} on:click={() => onClickTab(tab.id)}>
					<div>
						{tab.name}
					</div>
					{#if selectTab == tab.id}
						<div class="dummy" />
					{/if}
					<div class="notification" class:show={tabsNotification[tab.id]}></div>
				</div>
			{/each}
		</div>
		<div class="toggle">
			<button class="button" on:click={onToggleButtonClick}>-</button>
		</div>
	</div>
	<div class="content">
		<div class:selected={selectTab == 0}>
			<Bonsai />
		</div>
		<div class:selected={selectTab == 1}>
			<Console />
		</div>
		<div class:selected={selectTab == 2}>
			{#if $app3rd == 'boids'}
				<Controller />
			{/if}
		</div>
		<div class:selected={selectTab == 3}>
			<Chat />
		</div>
	</div>
</div>

<svelte:window bind:innerHeight bind:innerWidth on:resize={onWindowResize} />

<style lang="scss">
	.window {
		position: fixed;
		width: 350px;
		height: 350px;
		min-width: 220px;
		min-height: 220px;
		opacity: 0.6;

		border: 1px solid rgba(var(--Green), 0.3);
		border-radius: 4px;

		resize: both;
		overflow: scroll;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 30px 1fr;
		grid-template-areas:
			'titlebar'
			'content';

		transition:
		//	backdrop-filter 2s cubic-bezier(0.075, 0.82, 0.165, 1),
			opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1),
			box-shadow 2s cubic-bezier(0.075, 0.82, 0.165, 1);

		animation: 0.3s show ease-in-out;

		//prevent selection
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		&.hide {
			pointer-events: none;
			animation: 0.3s hide ease-in-out forwards;
		}

		&.ontop {
			z-index: 5;
		}

		&:focus,
		&:hover {
			border: 1px solid rgba(var(--Green), 0.4);
			opacity: 1;
			background: rgba(var(--Crust), 0.4);
			//backdrop-filter: blur(2px);
			//-webkit-backdrop-filter: blur(2px);
			z-index: 10;
			box-shadow: 0 0 20px #000;
		}

		.titlebar {
			grid-area: titlebar;
			position: relative;
			background: rgb(var(--Crust));
			cursor: grab;

			.toggle {
				position: absolute;
				right: 0;
				top: 0;
				aspect-ratio: 1 / 1;
				height: 100%;
				width: auto;
				display: flex;
				justify-content: center;
				align-items: center;

				.button {
					width: 50%;
					height: 50%;

					border: none;
					border-radius: 50%;
					background: rgb(var(--Red));
					color: rgb(var(--Crust));
					cursor: pointer;

					line-height: 0;

					&:hover {
						opacity: 0.5;
					}
				}
			}

			.tab {
				box-sizing: border-box;
				padding-left: 10px;
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: nowrap;

				justify-content: flex-start;
				align-items: end;
				gap: 1px;

				user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;

				.item {
					position: relative;
					height: 20px;
					width: 20%;

					border: 1px solid rgba(var(--Text), 0.3);
					border-bottom: none;
					border-radius: 5px 5px 0px 0;

					text-align: center;
					font-size: 0.8rem;
					font-weight: 600;

					background: none;
					color: rgba(var(--Text), 0.5);
					opacity: 0.5;
					cursor: pointer;

					display: flex;
					justify-content: center;
					align-items: center;

					> div {
						overflow: hidden;
						box-sizing: border-box;
						padding-left: 5px;
						padding-right: 5px;
					}

					&.selected {
						color: rgba(var(--Green), 1);
						border: 1px solid rgba(var(--Green), 0.3);
						border-bottom: none;
						opacity: 1;
						min-width: fit-content;
					}

					.dummy {
						position: absolute;
						bottom: -1px;
						left: 0;
						display: block;
						width: 100%;
						height: 1px;
						background: rgb(var(--Crust));
					}

					.notification {
						position: absolute;
						top: -4px;
						right: -4px;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background: rgb(var(--Green));

						display: none;

						animation:
							blink 1s step-end infinite,
							shake 1.2s ease-in infinite;

						&.show {
							display: block;
						}
					}
				}
			}
		}

		.content {
			border-top: 1px solid rgba(var(--Green), 0.3);
			grid-area: content;
			overflow: scroll;

			> div {
				display: none;
				&.selected {
					display: inline;
				}
			}
		}
	}

	@keyframes hide {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.4);
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.6;
		}
	}

	@keyframes blink {
		0% {
			background: rgb(var(--Red));
		}
		50% {
			background: rgb(var(--Green));
		}
		100% {
			background: rgb(var(--Red));
		}
	}

	@keyframes shake {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(0, -2px);
		}
		45% {
			transform: translate(0, 1px);
		}
		65% {
			transform: translate(0, -1px);
		}
		85% {
			transform: translate(0, 2px);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
