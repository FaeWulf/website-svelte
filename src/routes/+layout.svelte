<script lang="ts">
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

	$: onHideDistractingComps_Changes(data.hideDistractingComps);

	function onHideDistractingComps_Changes(pseudo: any) {
		if (windowToggle) windowToggle = pseudo;
	}
</script>

<div class="app">
	{#if data.hideDistractingComps}
		<Background />
	{/if}
	<Header bind:windowToggle />
	<Ufo />

	<Window bind:windowToggle />
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

<style lang="scss">
	.app {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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

		p {
			margin: 0;
		}
	}

	@media (min-width: 480px) {
		footer {
			padding: 0 0;
		}
	}
</style>
