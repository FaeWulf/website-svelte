<script lang="ts">
	import { apiURL } from '$lib/store';
	import { tooltip } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
	let statusValue: number;

	const statusText = ["I'm Offline!", "I'm Online!", "I'm Resting...", "Don't Disturb!"];
	const statusColor = ['#747F8D', '#3BA55C', '#FAA61A', '#ED4245'];
	const statusList = [undefined, 'online', 'idle', 'dnd'];

	//define an interval for later cancel
	let interval: any;

	onMount(async () => {
		const url = $apiURL;

		const fetchStatus = await fetch(url + '/api/v1/discord').then((res) => res.json());
		statusValue = statusList.indexOf(fetchStatus.data);

		interval = setInterval(async () => {
			const fetchStatus = await fetch(url + '/api/v1/discord').then((res) => res.json());
			statusValue = statusList.indexOf(fetchStatus.data);
		}, 30 * 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div id="js-status-dot" class="status-wrapper">
	{#if statusValue}
		<div
			class="status"
			use:tooltip={{
			content: statusText[statusValue],
			theme: 'catppuccin',
			animation: 'scale'
		}}
			style="background: {statusColor[statusValue]};"
		/>
	{:else}
		<div
			class="status"
			use:tooltip={{
			content: statusText[0],
			theme: 'catppuccin',
			animation: 'scale'
		}}
			style="background: {statusColor[0]};"
		/>
	{/if}
</div>

<style lang="scss">
		.status-wrapper {
				line-height: 0;
				margin: 0;
        position: absolute;
        bottom: 0;
        right: 0;

        .status {
            width: 10px;
            height: 10px;
            background: red;
            border: 2px solid var(--color-border-1);
            border-radius: 50%;
            cursor: pointer;
        }
		}


</style>
