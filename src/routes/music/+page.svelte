<script lang="ts">
	import Title from './title.svelte';
	import Screen from './screen.svelte';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import { onMount } from 'svelte';

	export let data;
	//export let data;

	let id: string, autoPlay: boolean, player: YouTubePlayer;

	//lazy load
	let lazyLoadPlaylist: any;

	//get contaier height
	let containerHeight: number;

	//search string for track search
	let search: string;

	onMount(() => {
		import('./playlist.svelte').then((module) => {
			lazyLoadPlaylist = module.default;
		});
	});

	//auto play and shuffle. random music
</script>

<svelte:head>
	<title>Faewulf's Basement | Music</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title />
	<div class="container" bind:clientHeight={containerHeight}>
		<div class="scrollable" style="height: {containerHeight}px;">
			<Screen bind:autoPlay bind:id bind:player />

			<div class="tab-track">
				<div class="tab-track-title">
					<input
						class="searchBar"
						type="search"
						bind:value={search}
						placeholder="Search with track, artist"
					/>
					<div>Last update {data.lastUpdatePlaylistDate}</div>
				</div>
				<div class="tab-track-playlist">
					<svelte:component
						this={lazyLoadPlaylist}
						{...$$props}
						bind:id
						bind:search
						playList={data.playList}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);
		/*
		font-family: 'Pixel Nes', 'Tahoma';
        */
	}

	.container {
		width: 100%;
		margin-top: 20px;
		flex: 1;
	}

	.tab-track {
		width: 100%;
		height: 100%;
		margin: 0px 20px 0px 20px;
	}

	.tab-track-title {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid rgba(var(--Overlay0), 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 20px;
	}

	.searchBar {
		width: 100%;
		height: 30px;
		margin: 0 20px 0 20px;
		border: 1px solid rgba(var(--Overlay0), 0.4);
		color: var(--Text);
		background: rgba(var(--Overlay2), 0.4);
	}

	.searchBar:focus {
		outline: 1px solid rgba(var(--Lavender), 0.8);
		border: none;
	}

	.tab-track-playlist {
		width: 100%;
		height: calc(100% - 50px);
	}

	.scrollable {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 720px) {
		.scrollable {
			flex-direction: column;
			align-items: center;
		}

		.tab-track {
			height: calc(100% - 200px);
		}
	}
</style>
