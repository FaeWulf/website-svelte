<script lang="ts">
	import { tooltip } from '$lib/utils';
	import 'tippy.js/animations/scale.css';

	export let size = 340;
	export let url = 'https://faewulf.xyz/api/bonsai?live=true&width=500&height=500&background=false';
	$: outerWidth = 0;
	$: outerHeight = 0;

	let scr = '';
	function restart() {
		//generate random string to refresh img load
		scr = new Date().getTime().toString();
	}
</script>

<svelte:window bind:outerWidth bind:outerHeight />

{#if outerHeight > size * 1.5 && outerWidth > size * 3}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img
		style="width: {size}px;"
		src={url + '&' + scr}
		draggable="false"
		alt="bonsai"
		on:click={restart}
		use:tooltip={{
			content: 'Click to grow another bonsai!',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	/>
{/if}

<style>
	img {
		position: absolute;
		right: 0;
		bottom: 0;
		cursor: pointer;
	}
</style>
