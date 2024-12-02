<script lang="ts">
	import { onMount } from 'svelte';
	import { apiURL, ufoBubble } from '$lib/store';
	import type { track } from '$lib/types';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';

	import LoadingCircle from '$lib/sveltes/components/custom/loadingCircle.svelte'
	import Title from '$lib/sveltes/neonTitle.svelte';
	import Screen from '$lib/sveltes/components/music/screen.svelte';
	import MenuBar from './menuBar.svelte';

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

		ufoBubble.set({message: 'My favorite playlist!', timeout: 6000});

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

<MetaTags
		title="Music list | Faewulf's Basement"
		description="Faewulf's favorite music list."
		keywords={['faewulf', 'music', 'list', 'infomation']}
		canonical="https://faewulf.xyz/music"
/>

<div class="main-wrapper">
	<div class="main__title-wrapper">
		<Title subtitle="music" />
	</div>
	{#if lastUpdatePlaylistDate && dataPlaylist}
		<div class="main__statistic">
			<div>
				Updated: {lastUpdatePlaylistDate}
			</div>
			<div>
				{dataPlaylist.length} tracks
			</div>
		</div>
	{:else}
		<LoadingCircle/>
	{/if}
	{#if dataPlaylist}
		<div class="main__content-wrapper" bind:clientHeight={containerHeight}>
			<div class="content__scrollable-wrapper" style="height: {containerHeight}px;">
				<Screen bind:autoPlay bind:id bind:player bind:autoNext={autoNextActive} bind:currentList />

				<div class="content__scrollable">
					<MenuBar bind:search bind:autoNextActive bind:autoplayActive={autoPlay} bind:randomActive bind:id bind:currentList />
					<div class="content__track-list">
						<svelte:component this={lazyLoadPlaylist} {...$$props} bind:id bind:search bind:currentList bind:playList={dataPlaylist} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<LoadingCircle/>
	{/if}
</div>

<style lang="scss">
	.main-wrapper {
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

	.main__statistic {
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

	.main__content-wrapper {
		width: 100%;
		margin-top: 20px;
		flex: 1;

    .content__scrollable-wrapper {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 100%;

      .content__scrollable {
        width: 100%;
        height: 100%;
        margin: 0 20px 0 20px;

        display: flex;
        flex-direction: column;
        row-gap: 10px;

        .content__track-list {
          width: 100%;
          height: calc(100% - 70px);

          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: -webkit-linear-gradient(to bottom, black 70%, transparent 100%);
        }
      }
    }
	}

	@media (max-width: 720px) {

		.main__title-wrapper{
			display: none;
		}

		.content__scrollable-wrapper {
			height: calc(100% - 70px);
      flex-direction: column !important;
      align-items: center !important;

      .content__scrollable {
				margin: 0 !important;

        .content__track-list {
          height: calc(100% - 200px) !important;
				}
      }
		}

	}
</style>
