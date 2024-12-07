<script lang="ts">
	import VirtualList from '$lib/components/custom/virtualList.svelte';
	import type { track } from '$lib/types';
	import { onMount } from 'svelte';

	export let id: string;
	export let search = '';
	export let playList: { index: number; data: track }[];

	//for random choose function
	export let currentList: any;

	//vars
	let selectedItem: string | null = null;
	let scrollToIdx: number;

	onMount(() => {
		currentList = playList;
	});

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
					track.data.title.toLocaleLowerCase().match(`${search}.*`) ||
					track.data.artist.toLocaleLowerCase().match(`${search}.*`) ||
					search.includes(track.index.toString())
				);
			})
			: playList;

	$: currentList = list;
	//toamkeit when shuffle, the list will be refresh
	$: currentList = currentList;
	$: selectedItem = id;
	$: jump(id);

	function jump(id: string) {
		const idx = currentList.findIndex((E: any) => E.data.ID == id);
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

<VirtualList items={list} let:item bind:scrollToIdx>
	<button
		class="behavior--reset-button track"
		class:track--active={selectedItem === item.data.ID}
		on:click={() => {
			id = item.data.ID;
			selectedItem = item.data.ID;
		}}
		id={item.data.ID}
	>
		<img
			draggable="false"
			class="track__thumbnail-img"
			src="https://img.youtube.com/vi/{item.data.ID}/default.jpg"
			alt="thumbnail"
		/>
		<div class="track__left-elements-wrapper">
			<div class="title">
				<span class="track__index-text">{item.index}</span> - {item.data.title}
			</div>
			<div class="track__artist-text">
				{item.data.artist}
			</div>
		</div>
		<div class="track__right-elements-wrapper">
			<div class="track__duration-text">
				{item.data.time}
			</div>
			<img draggable="false" class="track__hype-level-img" src="/gifs/{gif[item.data.fav - 1]}.gif" alt="rating" />
		</div>
		{#if selectedItem === item.data.ID}
			<div class="track__playing-indicator">➤</div>
		{/if}
	</button>
</VirtualList>

<style lang="scss">
  .track {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    text-align: left;

    margin-bottom: 10px;

    background: rgba(var(--Overlay0), 1);
    border-radius: 0.5rem;
    border-top: 1px solid rgba(var(--Overlay0), 0.4);
    font-weight: 600;
    padding: 5px 20px 5px 20px;

    box-shadow: rgba(0, 0, 0, 0.25) 0 2px 4px 0;

    outline: 2px solid transparent;
    outline-offset: -2px;

    cursor: pointer;

    &:focus,
    &:hover,
    &--active {
      background: rgb(var(--Overlay2));
    }

    .track__thumbnail-img {
      width: 40px;
      height: 40px;
      margin: 5px;
    }

    .track__left-elements-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 5px;
      justify-content: center;
      flex: 1;


      .track__index-text {
        color: rgba(var(--Subtext0));
      }

      .track__artist-text {
        font-size: 0.8rem;
        color: rgba(var(--Subtext0));
      }
    }

    .track__right-elements-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .track__duration-text {
        color: rgba(var(--Subtext0));
      }

      .track__hype-level-img {
        width: 40px;
        margin: 5px 0 5px 5px;
      }
    }
  }

  .track__playing-indicator {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }

  @media (max-width: 720px) {
    .track__hype-level-img {
      display: none;
    }
  }
</style>
