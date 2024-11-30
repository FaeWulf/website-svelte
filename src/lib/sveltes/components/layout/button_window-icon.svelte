<script lang="ts">
	export let windowToggle: boolean;
	import { AppWindow } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="toggle-button"
	on:click={() => {
		windowToggle = !windowToggle;
	}}
	class:toggle-button--off={!windowToggle}
	class:toggle-button--on={windowToggle}
>
	<AppWindow />
</div>

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
