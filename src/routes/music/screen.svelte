<script lang="ts">
	import { onMount } from 'svelte';
	import YoutubePlayer from 'youtube-player';
	import type { YouTubePlayer } from 'youtube-player/dist/types';

	export let id = 'qWNQUvIk954';
	export let autoPlay = false;
	export let player: YouTubePlayer;

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
		player.on('error', (value) => {});
		player.on('stateChange', (value) => {
			if (value.data == -1 && autoPlay) player.playVideo();
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
	}

	@media (max-width: 720px) {
		#player {
			height: 200px;
			margin: 0;
		}
	}
</style>
