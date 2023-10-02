<script lang="ts">
	import { apiURL } from '$lib/store';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import 'tippy.js/animations/scale.css';

	const api = $apiURL;
	export let size = 340;
	export let url = api + '/api/v1/misc/bonsai?time=40&width=500&height=500&background=0';
	let innerWidth = 0;

	let shouldHide = false;
	let scr = '';
	let bonsaiTab: HTMLElement;
	function restart() {
		//generate random string to refresh img load
		scr = new Date().getTime().toString();
	}

	onMount(() => {
		collideCheck();
		window.addEventListener('resize', () => collideCheck());

		function collideCheck() {
			const mainTab = document.getElementById('main')?.getBoundingClientRect();
			const bonsaiTabRect = bonsaiTab.getBoundingClientRect();

			if (mainTab) {
				const collision =
					mainTab.left < bonsaiTabRect.right &&
					mainTab.right > bonsaiTabRect.left &&
					mainTab.top < bonsaiTabRect.bottom &&
					mainTab.bottom > bonsaiTabRect.top;
				//console.log('Collision:', collision);

				shouldHide = collision;
			}
		}
	});
</script>

<svelte:window bind:innerWidth />

{#if !shouldHide}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img
		style="max-width: {size}px; width: calc(({innerWidth / 2}px - 34rem))"
		src={url + '&' + scr}
		draggable="false"
		alt="bonsai"
		on:click={restart}
		use:tooltip={{
			content: 'Click to grow another bonsai!',
			theme: 'catppuccin',
			animation: 'scale'
		}}
		bind:this={bonsaiTab}
	/>
{/if}

<style>
	img {
		position: fixed;
		right: 0;
		bottom: 0;
		cursor: pointer;
		min-width: 150px;
	}
</style>
