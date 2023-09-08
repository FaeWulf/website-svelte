<script>
	import { cubicOut } from 'svelte/easing';
	import '../styles/styles.css';
	import Background from './background.svelte';
	import Header from './header.svelte';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<div class="app">
	<Background />
	<Header />
	<main>
		{#key data.url}
			<div in:fade={{ duration: 1000, easing: cubicOut }} class="main">
				<slot />
			</div>
		{/key}
	</main>

	<footer>
		<!--p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p-->
	</footer>
</div>

<style>
	.app {
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
		box-sizing: border-box;
	}

	.main {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;

		justify-content: center;
		align-items: center;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0px;
	}

	/*
	footer a {
		font-weight: bold;
	}
	*/

	@media (min-width: 480px) {
		footer {
			padding: 0 0;
		}
	}
</style>
