<script lang="ts">
	export let toggle = false;
	import { Volume2, VolumeX } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="toggle-button"
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
