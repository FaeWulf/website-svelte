<script lang="ts">
	export let toggle = false;
	import { Volume2, VolumeX } from 'lucide-svelte';
	import { tooltip } from '$lib/utils';
</script>

<button
	class="behavior--reset-button toggle-button"
	aria-label="Volume button"
		 on:click={() => {
		toggle = !toggle;
	}}
	use:tooltip={{
					content: 'Toggle mysterious sound',
					theme: 'catppuccin',
					animation: 'scale'
				}}
>
	{#if toggle}
		<Volume2 />
	{:else}
		<VolumeX />
	{/if}
</button>

<style lang="scss">
  .toggle-button {
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
