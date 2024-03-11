<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	export let toggle = true;

	import { Moon, Sun } from 'lucide-svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		toggle = !toggle;
	}}
>
	{#if toggle}
		<div in:scale={{ duration: 200, easing: quintOut }} out:scale={{ duration: 200, easing: quintOut }}>
			<Moon />
		</div>
	{:else}
		<div in:scale={{ duration: 200, easing: quintOut }} out:scale={{ duration: 200, easing: quintOut }}>
			<Sun />
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;
		margin: 0;
		padding: 0;
		line-height: 0;

		width: 24px;
		height: 24px;

		transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

		> div {
			position: absolute;
			top: 0;
			left: 0;
			cursor: pointer;
		}
	}
</style>
