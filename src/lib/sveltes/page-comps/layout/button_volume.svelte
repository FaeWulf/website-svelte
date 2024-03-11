<script lang="ts">
	export let toggle = false;
	import { VolumeX, Volume2 } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		toggle = !toggle;
	}}
>
	{#if toggle}
		<Volume2 />
	{:else}
		<VolumeX />
	{/if}
</div>

<style lang="scss">
	div {
		margin: 0;
		padding: 0;
		line-height: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;

		:global(.lucide) {
			stroke: rgb(var(--Text));
		}
	}
</style>
