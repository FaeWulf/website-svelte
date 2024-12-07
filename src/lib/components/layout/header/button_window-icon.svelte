<script lang="ts">
	import { tooltip } from '$lib/utils';
	import { AppWindow } from 'lucide-svelte';

	export let windowToggle: boolean;
</script>

<button
	class="behavior--reset-button toggle-button"
	aria-label="window toggle button"
	on:click={() => {
		windowToggle = !windowToggle;
	}}
	use:tooltip={{
	content: 'Toggle window tab',
	theme: 'catppuccin',
	animation: 'scale'
}}
	class:toggle-button--off={!windowToggle}
	class:toggle-button--on={windowToggle}
>
	<AppWindow />
</button>

<style lang="scss">
  .toggle-button {
    margin: 0;
    padding: 0;
    line-height: 0;

    &--on {
      :global(.lucide) {
        stroke: rgb(var(--Green));
        animation: flip 0.5s ease-out;
        animation-fill-mode: forwards;
      }
    }

    &--off {
      :global(.lucide) {
        stroke: rgb(var(--Yellow));
        animation: reverseflip 0.5s ease-out;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes flip {
    0% {
      transform: rotateY(360deg);
    }

    100% {
      transform: rotateY(180deg);
    }
  }

  @keyframes reverseflip {
    0% {
      transform: rotateY(180deg);
    }

    100% {
      transform: rotateY(360deg);
    }
  }
</style>
