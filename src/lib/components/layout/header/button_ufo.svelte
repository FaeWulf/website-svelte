<script lang="ts">
	import { tooltip } from '$lib/utils';

	export let toggle = false;
</script>

<button
	class="behavior--reset-button toggle-button"
	aria-label="Ufo's movement toggle button"
	on:click={() => {
		toggle = !toggle;
	}}
	use:tooltip={{
					content: 'Toggle UFO follows cursor',
					theme: 'catppuccin',
					animation: 'scale'
				}}
>
	{#if toggle}
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="toggle-button__icon"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.5 15.5C4.05228 15.5 4.5 15.9477 4.5 16.5V19.5H19.5V16.5C19.5 15.9477 19.9477 15.5 20.5 15.5H21.5C22.0523 15.5 22.5 15.9477 22.5 16.5V20C22.5 21.3807 21.3807 22.5 20 22.5H4C2.61929 22.5 1.5 21.3807 1.5 20V16.5C1.5 15.9477 1.94772 15.5 2.5 15.5H3.5Z"
				fill="#a6da95"
			/>
		</svg>
	{:else}
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="toggle-button__icon"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.5 15.5C4.05228 15.5 4.5 15.9477 4.5 16.5V19.5H19.5V16.5C19.5 15.9477 19.9477 15.5 20.5 15.5H21.5C22.0523 15.5 22.5 15.9477 22.5 16.5V20C22.5 21.3807 21.3807 22.5 20 22.5H4C2.61929 22.5 1.5 21.3807 1.5 20V16.5C1.5 15.9477 1.94772 15.5 2.5 15.5H3.5Z"
				fill="#cad3f5"
			/>
		</svg>
	{/if}
</button>

<style lang="scss">
  .toggle-button {
    margin: 0;
    padding: 0;
    line-height: 0;

    .toggle-button__icon {
      width: 25px;
      height: 25px;
      fill: rgb(var(--Text));

      cursor: pointer;
    }
  }
</style>
