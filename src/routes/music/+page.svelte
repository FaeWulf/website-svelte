<script lang="ts">
	import { onMount } from 'svelte';
	import { apiURL, ufoBubble, mp_currentList, mp_id, mp_autoNext, mp_autoPlay } from '$lib/store';
	import type { track } from '$lib/types';
	import MetaTags from '$lib/components/custom/MetaTags.svelte';

	import LoadingCircle from '$lib/components/custom/LoadingCircle.svelte';
	import Title from '$lib/components/custom/neonTitle.svelte';
	import Screen from '$lib/components/music/screen.svelte';
	import MenuBar from '$lib/components/music/menuBar.svelte';
	import { isMobile } from '$lib/utils';

	//export let data;
	let isMobileClient = false;
	let innerWidth = 0;

	let currentList: { index: number; data: track }[];
	//playlist vars
	let id: string, autoPlay: boolean;

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

	//subscribe
	let sub_mp_id = mp_id.subscribe((value) => id = value);
	let sub_mp_autoNext = mp_autoNext.subscribe((value) => autoNextActive = value);
	let sub_mp_autoPlay = mp_autoPlay.subscribe((value) => autoPlay = value);
	let sub_mp_currentList = mp_currentList.subscribe((value) => currentList = value);

	$: mp_id.set(id)
	$: mp_autoPlay.set(autoPlay)
	$: mp_autoNext.set(autoNextActive)
	$: mp_currentList.set(currentList)

	onMount(async () => {
		import('$lib/components/music/playlist.svelte').then((module) => {
			lazyLoadPlaylist = module.default;
		});

		isMobileClient = isMobile(window, window.navigator);

		ufoBubble.set({ message: 'My favorite playlist!', timeout: 6000 });

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

		return () => {
			sub_mp_id();
			sub_mp_autoNext();
			sub_mp_autoPlay();
			sub_mp_currentList();
		}
	});

	//auto play and shuffle. random music
</script>

<MetaTags
	title="Music list | Faewulf's Basement"
	description="Faewulf's favorite music list."
	keywords={['faewulf', 'music', 'list', 'infomation']}
	canonical="https://faewulf.xyz/music"
/>

<svelte:window bind:innerWidth />

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
		<LoadingCircle />
	{/if}
	{#if dataPlaylist}
		<div class="main__content-wrapper" bind:clientHeight={containerHeight}>
			<div class="content__scrollable-wrapper" style="height: {containerHeight}px;">
				{#if isMobileClient || innerWidth < 720}
					<Screen/>
				{/if}

				<div class="content__scrollable">
					<MenuBar bind:search bind:autoNextActive bind:autoplayActive={autoPlay} bind:randomActive bind:id
									 bind:currentList />
					<div class="content__track-list">
						<svelte:component this={lazyLoadPlaylist} {...$$props} bind:id bind:search bind:currentList
															bind:playList={dataPlaylist} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<LoadingCircle />
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
      justify-content: center;
      width: 100%;
      height: 100%;

      .content__scrollable {
        width: 100%;
        max-width: 650px;
				height: 100%;
        margin: 0 20px 0 20px;

        display: flex;
        flex-direction: column;
				align-items: center;
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

    .main__title-wrapper {
      display: none;
    }

    .main__content-wrapper {
			margin: 0 !important;

      .content__scrollable-wrapper {
        height: calc(100% - 70px);
        flex-direction: column !important;
        align-items: center !important;

        .content__scrollable {
          margin: 0 !important;
          margin-top: 30px !important;
					height: 80% !important;

          .content__track-list {
            height: calc(100% - 70px) !important;
          }
        }
      }

    }
  }
</style>
