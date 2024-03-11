<script lang="ts">
	import { onMount } from 'svelte';
	import { parseDiscordEmoji, tooltip } from '$lib/utils';
	import { apiURL } from '$lib/store';
	import 'tippy.js/animations/perspective-subtle.css';
	import { Bell } from 'lucide-svelte';

	const url = $apiURL;

	let bell: HTMLElement;
	let clicked = false;

	onMount(async () => {
		const pseudoFetch = await fetch(url + '/api/v1/discord/announcement').then((res) => res.json());
		const data: string[] = pseudoFetch.data;

		let processedData: string[] = [];

		data.reverse().forEach((element) => {
			processedData.push('<span style="color: rgb(var(--Yellow))">✪</span> ' + parseDiscordEmoji(element));
		});

		if (data) {
			tooltip(bell, {
				content: processedData.join('<br>'),
				theme: 'catppuccin-transparent',
				animation: 'perspective-subtle',
				trigger: 'mouseenter click',
				allowHTML: true,
				interactive: true
			});
		}
	});

	function trigger() {
		clicked = true;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="icon" class:active={!clicked} on:click={() => trigger()} on:pointerenter={() => trigger()} bind:this={bell}>
	<Bell />
</div>

<style lang="scss">
	.icon {
		position: absolute;
		right: 10px;
		height: 30px;

		margin: 0;
		padding: 0;
		line-height: 0;

		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		:global(.lucide) {
			stroke: rgb(var(--Green));
		}

		&:hover {
			:global(.lucide) {
				stroke: rgb(var(--Yellow));
			}
		}

		&.active {
			transform-origin: top;
			animation: bell-shake 5s ease-out infinite;
			//animation-fill-mode: forwards;
		}
	}

	@keyframes bell-shake {
		0% {
			transform: rotate(0deg);
		}
		4% {
			transform: rotate(20deg);
		}
		8% {
			transform: rotate(-10deg);
		}
		12% {
			transform: rotate(10deg);
		}
		16% {
			transform: rotate(-5deg);
		}

		20% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
