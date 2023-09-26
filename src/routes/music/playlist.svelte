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

	/**
	 * 1 Nolgastic
	 * 2 Remix
	 * 3 EDM
	 * 4 Catchy
	 * 5 Favorite artist
	 */
	const gif = ['music1', 'music2', 'music3', 'music4', 'music5'];

	//dynamic
	$: list =
		search && search.length > 0
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
		<img
			draggable="false"
			class="thumbnail"
			src="https://img.youtube.com/vi/{item.ID}/default.jpg"
			alt="thumbnail"
		/>
		<div class="description">
			<div class="title">
				{item.title}
			</div>
			<div class="artist">
				{item.artist}
			</div>
		</div>
		<div class="duration">
			<div>
				{item.time}
			</div>
			<img draggable="false" class="level" src="/gifs/{gif[item.fav - 1]}.gif" alt="rating" />
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
		flex-direction: row;
		gap: 10px;
		border-top: 1px solid rgba(var(--Overlay0), 0.4);
		font-weight: 600;
		padding: 5px 20px 5px 20px;

		cursor: pointer;
	}

	.track:hover,
	.active {
		background: rgba(var(--Surface2), 0.4);
	}

	.artist {
		font-size: 0.8rem;
		color: rgba(var(--Text), 0.5);
	}

	img.level {
		width: 40px;
		margin: 5px 0 5px 5px;
	}

	img.thumbnail {
		width: 40px;
		height: 40px;
		margin: 5px;
	}

	.playing {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.duration {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	.description {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 5px;
		justify-content: center;
		flex: 1;
	}

	@media (max-width: 720px) {
		img.level {
			display: none;
		}
	}
</style>
