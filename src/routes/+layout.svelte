<script lang="ts">
	//checking dev mode
	import { dev } from '$app/environment';

	import { cubicOut } from 'svelte/easing';

	//some main styles
	import '$lib/styles/reset.css';
	import '$lib/styles/styles.css';
	import '$lib/styles/hueText.css';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/dist/border.css';
	import '@splidejs/svelte-splide/css';

	import Ufo from '$lib/sveltes/page-comps/layout/ufo.svelte';
	import Window from '$lib/sveltes/page-comps/layout/window.svelte';

	import Background from '$lib/sveltes/page-comps/layout/background.svelte';
	import Header from '$lib/sveltes/page-comps/layout/header.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	// for console open between header and console
	let windowToggle: boolean = true;
	let windowOntop: boolean = false;

	let ufoToggleMovement: boolean;

	$: onHideDistractingComps_Changes(data.hideDistractingComps);
	$: windowOntop = data.windowOnTop;

	function onHideDistractingComps_Changes(pseudo: any) {
		if (windowToggle) windowToggle = pseudo;
	}
</script>

<div class="app">
	{#if data.hideDistractingComps}
		<Background />
	{/if}
	<Header bind:windowToggle bind:ufoToggleMovement />
	<!--Ufo bind:toggleMovement={ufoToggleMovement} /-->
	<Ufo bind:toggleMovement={ufoToggleMovement} />

	<Window bind:windowToggle bind:windowOntop />

	<a class="support-badge" href="/support">
		<img draggable="false" src="/images/badges/support_button_red.webp" alt="support badge" />
	</a>

	<main id="main">
		{#key data.url}
			<div in:fade={{ duration: 1000, easing: cubicOut }} class="main">
				<slot />
			</div>
		{/key}
	</main>

	<footer>
		<p>
			<a href="https://hotlinewebring.club/faewulf/previous">←</a> Hotline Webring
			<a href="https://hotlinewebring.club/faewulf/next">→</a>
		</p>
	</footer>
</div>

<!-- Analytics -->
<svelte:head>
	{#if !dev}
		<script defer src="https://analytics.us.umami.is/script.js" data-website-id="274fa86e-1c19-458a-a9b9-555a24ffe748"></script>
	{/if}
</svelte:head>

<style lang="scss">
	.app {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		.support-badge {
			position: fixed;
			top: 0;
			right: 0;
			z-index: 10;

			//dissable on mobile
			@media (max-width: 550px) {
				display: none;
			}

			img {
				width: 200px;
				transform-origin: center;
				transform: rotate(45deg) translate(60px, -10px);
				transition:
					filter 0.7s cubic-bezier(0.075, 0.82, 0.165, 1),
					transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
				cursor: pointer;

				&:hover {
					filter: hue-rotate(-90deg);
					transform: rotate(45deg) translate(60px, -5px) scale(1.05);
				}
			}
		}

		main {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 1rem;
			width: 100%;
			max-width: 64rem;
			margin: 0 auto;
			margin-top: 50px;
			box-sizing: border-box;

			.main {
				display: flex;
				flex-direction: column;
				width: 100%;
				flex: 1;

				justify-content: center;
				align-items: center;
			}
		}

		footer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0px;
			margin: 5px;
			margin-bottom: 10px;

			-webkit-user-select: none; /* Safari */
			-ms-user-select: none; /* IE 10 and IE 11 */
			user-select: none; /* Standard syntax */

			z-index: 0;

			p {
				margin: 0;
			}

			@media (max-width: 480px) {
				padding: 0 0;
			}
		}
	}
</style>
