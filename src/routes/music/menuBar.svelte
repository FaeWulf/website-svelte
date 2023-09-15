<script lang="ts">
	import type { track } from '$lib/types';
	import { tooltip, shuffleArray } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createSingleton } from 'tippy.js';
	import 'tippy.js/animations/scale.css';

	export let search: string;
	export let autoplayActive = false;
	export let autoNextActive = false;
	export let randomActive = false;
	export let currentList: track[];

	//track id
	export let id;

	let tippyInstances: any[] = [];
	onMount(() => {
		const singleton = createSingleton(tippyInstances, {
			moveTransition: 'transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
			delay: 50,
			theme: 'catppuccin',
			animation: 'scale'
		});
	});

	//function
	function chooseRandom() {
		const randomIndex = Math.floor(Math.random() * currentList.length);
		id = currentList[randomIndex].ID;
	}

	function shuffleList() {
		currentList = currentList.sort(() => Math.random() - 0.5);
	}
</script>

<div class="tab-track-toolbar">
	<input
		class="searchBar"
		type="search"
		bind:value={search}
		placeholder="Search with track, artist"
		use:tooltip={{ instancesHolder: tippyInstances }}
		title="Search for tracks"
	/>

	<button
		use:tooltip={{ instancesHolder: tippyInstances }}
		class:active={autoplayActive}
		on:click={() => (autoplayActive = !autoplayActive)}
		title="Auto play on click"
	>
		A
	</button>

	<button
		use:tooltip={{ instancesHolder: tippyInstances }}
		on:click={() => shuffleList()}
		title="Shuffle current list"
	>
		S
	</button>
	<button
		use:tooltip={{ instancesHolder: tippyInstances }}
		class:active={autoNextActive}
		on:click={() => (autoNextActive = !autoNextActive)}
		title="Autoplay next track"
	>
		N
	</button>
	<button
		use:tooltip={{ instancesHolder: tippyInstances }}
		class:active={randomActive}
		on:click={() => chooseRandom()}
		title="Choose Random"
	>
		R
	</button>
</div>

<style>
	.tab-track-toolbar {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid rgba(var(--Overlay0), 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 10px;
	}

	.searchBar {
		width: 100%;
		height: 30px;
		margin: 0 0px 0 20px;
		border: 1px solid rgba(var(--Overlay0), 0.4);
		color: var(--Text);
		background: rgba(var(--Overlay2), 0.4);
	}

	button {
		width: 40px;
		height: 30px;
		background: rgba(var(--Overlay2), 0.4);
		color: rgb(var(--Text));
		font-family: 'Pixel Nes', 'Tahoma';
		border: 1px solid rgba(var(--Yellow), 0.6);
	}

	button:hover {
		background: rgba(var(--Surface0), 1);
	}

	button.active {
		border: 2px solid rgba(var(--Green), 1);
	}

	.searchBar:focus {
		outline: 1px solid rgba(var(--Lavender), 0.8);
		border: none;
	}
</style>
