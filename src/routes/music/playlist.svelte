<script lang="ts">
	import VirtualList from '$lib/sveltes/virtualList.svelte';
	import type { track } from '$lib/types';
	export let id: string;
	export let search = '';
	export let playList: track[];

	//for random choose function
	export let currentList: any;

	//vars
	let selectedItem: string | null = null;
	let scrollToIdx: number;

	//dynamic
	$: list =
		search.length > 0
			? playList.filter((track) => {
					return (
						track.title.toLocaleLowerCase().match(`${search}.*`) ||
						track.artist.toLocaleLowerCase().match(`${search}.*`)
					);
			  })
			: playList;

	$: currentList = list;
	$: currentList = currentList;
	$: selectedItem = id;
	$: jump(id);

	function jump(id: string) {
		const idx = currentList.findIndex((E: any) => E.ID == id);
		if (idx != -1) scrollToIdx = idx;

		//dump idea
		/*
		let correctPosition = document.getElementById(id);
		let delta = new Date().getTime();
		while (!correctPosition) {
			correctPosition = document.getElementById(id);
			if (correctPosition) {
				correctPosition.scrollIntoView();
				console.log(delta);
			}
			const tick = new Date().getTime();

			if (tick - delta > 500) break;
		}
		*/
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<VirtualList items={list} let:item bind:scrollToIdx>
	<div
		class="track"
		class:active={selectedItem == item.ID}
		on:click={() => {
			id = item.ID;
			selectedItem = item.ID;
		}}
		id={item.ID}
	>
		{item.title}
		<div class="duration">
			{item.time}
		</div>
		<div class="artist">
			{item.artist}
		</div>
		{#if selectedItem == item.ID}
			<div class="playing">➤</div>
		{/if}
	</div>
</VirtualList>

<style>
	.track {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-top: 1px solid rgba(var(--Overlay0), 0.4);
		font-weight: 600;
		padding: 10px 20px 10px 20px;

		cursor: pointer;
	}

	.track:hover,
	.active {
		background: rgba(var(--Surface2), 0.4);
	}

	.playing {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.duration {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		margin-right: 20px;
	}
</style>
