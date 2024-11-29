<script lang="ts">
	import { onMount } from 'svelte';
	import type { track } from '$lib/types';
	import YoutubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';

	export let id = 'qWNQUvIk954';
	export let autoPlay = false;
	export let autoNext = false;
	export let player: YouTubePlayer;

	//readonly
	export let currentList: { index: number; data: track }[];

	$: play(id);

	let playerElement: HTMLElement;
	onMount(() => {
		createPlayer();
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

<div id="player" bind:this={playerElement} />

<style>
    #player {
        width: 300px;
        height: 300px;
        margin-left: 20px;
        border-radius: 0.5rem;
        background: rgba(var(--Overlay0));
    }

    @media (max-width: 720px) {
        #player {
            height: 200px;
            margin: 0;
        }
    }
</style>
