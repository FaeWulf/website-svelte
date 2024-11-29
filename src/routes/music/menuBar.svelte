<script lang="ts">
	import type { track } from '$lib/types';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createSingleton } from 'tippy.js';
	import 'tippy.js/animations/scale.css';

	export let search: string;
	export let autoplayActive = false;
	export let autoNextActive = false;
	export let randomActive = false;
	export let currentList: { index: number; data: track }[];

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
		id = currentList[randomIndex].data.ID;
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
		placeholder="Search with track, artist, or id number"
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
		style="margin-right: 10px"
	>
		R
	</button>
</div>

<style lang="scss">
  .tab-track-toolbar {
    width: 100%;
    height: 50px;
    border-radius: 0.5rem;
    border-bottom: 1px solid rgba(var(--Overlay0), 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;

    outline: 2px solid #0000;
    outline-offset: -2px;

    background: rgba(var(--Overlay0), 1);
  }

  .searchBar {
    width: 100%;
    height: 30px;
    margin-left: 10px;
    border-radius: 0.5rem;
    border: 1px solid rgba(var(--Text), 0.2);
    color: var(--Text);
    background: rgba(var(--Overlay1), 1);

    &:focus {
      outline: 1px solid rgba(var(--Lavender), 0.8);
      border: none;
    }
  }

  button {
    width: 40px;
    height: 30px;
    background: rgba(var(--Overlay2), 0.4);
    color: rgb(var(--Text));
    font-family: 'Pixel Nes', 'Tahoma';
    border-radius: 0.5rem;
    border: 1px solid rgba(var(--Yellow), 0.6);

    &:hover {
      background: rgba(var(--Surface0), 1);
    }

    &.active {
      background: rgba(var(--Green), 1);
      color: rgb(var(--Crust));
    }
  }
</style>
