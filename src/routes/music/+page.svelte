<script lang="ts">
	import type { track } from '$lib/types';
	import Title from '$lib/sveltes/neonTitle.svelte';
	import Screen from './screen.svelte';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import { onMount } from 'svelte';
	import MenuBar from './menuBar.svelte';
	import { apiURL, ufoBubble } from '$lib/store';
	import { MetaTags } from 'svelte-meta-tags';

	//export let data;

	let currentList: { index: number; data: track }[];
	//playlist vars
	let id: string, autoPlay: boolean, player: YouTubePlayer;

	//toolbar vars
	let autoNextActive: boolean, randomActive: boolean;

	//lazy load
	let lazyLoadPlaylist: any;

	//get contaier height
	let containerHeight: number;

	//search string for track search
	let search: string;
	let dataPlaylist: any;
	let lastUpdatePlaylistDate: string;

	onMount(async () => {
		import('./playlist.svelte').then((module) => {
			lazyLoadPlaylist = module.default;
		});

		ufoBubble.set('Favorite playlist!');

		const url = $apiURL;

		const fetchPLaylist = await fetch(url + '/api/v1/playlist/').then((res) => res.json());
		dataPlaylist = [];
		const rawPlaylist: any[] = fetchPLaylist.data;
		for (let i = 0; i < rawPlaylist.length; i++) {
			dataPlaylist.push({
				index: i,
				data: rawPlaylist[i]
			});
		}
		dataPlaylist = dataPlaylist.reverse();
		const fetchDate = await fetch(url + '/api/v1/playlist/lastupdate').then((res) => res.json());
		lastUpdatePlaylistDate = fetchDate.data;
	});

	//auto play and shuffle. random music
</script>

<svelte:head>
	<MetaTags
		title="Music list | Faewulf's Basement"
		description="Faewulf's music list."
		keywords={['faewulf', 'music', 'list', 'infomation']}
		canonical="https://faewulf.xyz/music"
	/>
</svelte:head>

<div class="main">
	<Title subtitle="music" />
	{#if lastUpdatePlaylistDate && dataPlaylist}
		<div class="statistic">
			<div>
				Updated: {lastUpdatePlaylistDate}
			</div>
			<div>
				{dataPlaylist.length} tracks
			</div>
		</div>
	{:else}
		<div>Loading...</div>
	{/if}
	{#if dataPlaylist}
		<div class="container" bind:clientHeight={containerHeight}>
			<div class="scrollable" style="height: {containerHeight}px;">
				<Screen bind:autoPlay bind:id bind:player bind:autoNext={autoNextActive} bind:currentList />

				<div class="tab-track">
					<MenuBar bind:search bind:autoNextActive bind:autoplayActive={autoPlay} bind:randomActive bind:id bind:currentList />
					<div class="tab-track-playlist">
						<svelte:component this={lazyLoadPlaylist} {...$$props} bind:id bind:search bind:currentList bind:playList={dataPlaylist} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<style lang="scss">
	.main {
		position: relative;
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

		//backdrop-filter: blur(2px);
		//-webkit-backdrop-filter: blur(2px);
		//font-family: 'Pixel Nes', 'Tahoma';
	}

	.statistic {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		top: 0;
		left: 0;
		margin: 10px;
		font-size: 0.7rem;

		color: rgba(var(--Text), 0.6);

		z-index: -1;
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

		display: flex;
		flex-direction: column;
		row-gap: 10px;

    .tab-track-playlist {
      width: 100%;
      height: calc(100% - 70px);

      mask-image:
							linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);

      -webkit-mask-image: -webkit-linear-gradient(to bottom, black 70%, transparent 100%);
    }
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
