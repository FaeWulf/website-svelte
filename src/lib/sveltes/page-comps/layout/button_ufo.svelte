<script lang="ts">
	import { isMobile } from '$lib/utils';
	import { onMount } from 'svelte';
	export let toggle = true;

	onMount(() => {
		toggle = !isMobile(window, window.navigator);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		toggle = !toggle;
	}}
>
	{#if toggle}
		<svg
			width="800px"
			height="800px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
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
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3.5 15.5C4.05228 15.5 4.5 15.9477 4.5 16.5V19.5H19.5V16.5C19.5 15.9477 19.9477 15.5 20.5 15.5H21.5C22.0523 15.5 22.5 15.9477 22.5 16.5V20C22.5 21.3807 21.3807 22.5 20 22.5H4C2.61929 22.5 1.5 21.3807 1.5 20V16.5C1.5 15.9477 1.94772 15.5 2.5 15.5H3.5Z"
				fill="#cad3f5"
			/>
			<path
				d="M7.07615 11.6173C7.23093 11.2436 7.59557 11 8.00003 11H10.5V3C10.5 2.44772 10.9477 2 11.5 2H12.5C13.0523 2 13.5 2.44771 13.5 3V11H16C16.4045 11 16.7691 11.2436 16.9239 11.6173C17.0787 11.991 16.9931 12.4211 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29292 12.7071C7.00692 12.4211 6.92137 11.991 7.07615 11.6173Z"
				fill="#cad3f5"
			/>
		</svg>
	{/if}
</div>

<style>
	div {
		margin: 0;
		padding: 0;
		line-height: 0;
	}

	svg {
		width: 25px;
		height: 25px;
		fill: rgb(var(--Text));

		cursor: pointer;
	}
</style>
