<script lang="ts">
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	export let status: Promise<number>;

	const statusText = ["I'm Offline!", "I'm Online!", "I'm Resting...", "Don't Disturb!"];
	const statusColor = ['#747F8D', '#3BA55C', '#FAA61A', '#ED4245'];
</script>

{#await status}
	<div
		class="status"
		use:tooltip={{
			content: statusText[0],
			theme: 'catppuccin',
			animation: 'scale'
		}}
		style="background: {statusColor[0]};"
	/>
{:then value}
	<div
		class="status"
		use:tooltip={{
			content: statusText[value],
			theme: 'catppuccin',
			animation: 'scale'
		}}
		style="background: {statusColor[value]};"
	/>
{/await}

<style>
	.status {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		background: red;
		border: 2px solid rgba(var(--Overlay0), 0.4);
		border-radius: 50%;
		cursor: pointer;
	}
</style>
