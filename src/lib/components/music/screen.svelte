<script lang="ts">
	import { onMount } from 'svelte';
	import type { track } from '$lib/types';
	import YoutubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import { mp_autoNext, mp_autoPlay, mp_currentList, mp_id } from '$lib/store';

	let id = 'qWNQUvIk954';
	let autoPlay = false;
	let autoNext = false;

	//readonly
	let currentList: { index: number; data: track }[];

	//subscribe
	let sub_mp_id = mp_id.subscribe((value) => id = value);
	let sub_mp_autoNext = mp_autoNext.subscribe((value) => autoNext = value);
	let sub_mp_autoPlay = mp_autoPlay.subscribe((value) => autoPlay = value);
	let sub_mp_currentList = mp_currentList.subscribe((value) => currentList = value);

	$: mp_id.set(id);
	$: mp_autoPlay.set(autoPlay);
	$: mp_autoNext.set(autoNext);

	//
	let player: YouTubePlayer;


	$: play(id);

	let playerElement: HTMLElement;
	onMount(() => {
		createPlayer();


		return () => {
			sub_mp_id();
			sub_mp_autoNext();
			sub_mp_autoPlay();
			sub_mp_currentList();
		};
	});

	function createPlayer() {
		player = YoutubePlayer(playerElement);

		// Register event handlers
		player.on('ready', () => {
			play(id);
		});
		player.on('error', (value) => {
		});
		player.on('stateChange', (value) => {
			if (value.data == -1 && autoPlay) player.playVideo();

			if (value.data == 0 && autoNext) {
				const currentIndex = currentList.findIndex((E) => E.data.ID == id);
				if (currentIndex != -1 && currentIndex + 1 <= currentList.length) {
					id = currentList[currentIndex + 1].data.ID;
				}
			}
		});

		// Tear down player when done
		return () => player.destroy();
	}

	function play(id: string) {
		if (player && id) {
			player.cueVideoById(id);
			if (autoPlay)
				setTimeout(() => {
					player.playVideo();
				}, 500);
		}
	}
</script>

<div id="music-player" bind:this={playerElement} />

<style>
    #music-player {
        width: 300px;
        height: 300px;
        border-radius: 0.5rem;
        background: rgba(var(--Overlay0));
    }

    @media (max-width: 720px) {
        #music-player {
            height: 200px;
            margin: 0;
        }
    }
</style>
