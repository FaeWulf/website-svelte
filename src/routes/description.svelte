<script lang="ts">
	import { onMount } from 'svelte';
	import { descriptionText } from './store';
	import { fade } from 'svelte/transition';
	import { typewriter } from '$lib/utils';

	let text: string = 'inexperienced';
	onMount(() => {
		descriptionText.subscribe((value) => {
			text = value;
		});
	});
</script>

<h2>
	An
	{#key text}
		<span in:typewriter={{ speed: 3 }} out:typewriter={{ speed: 3 }} id="level">{text}</span>
	{/key} developer on the sofa
</h2>

<style>
	h2 {
		margin-top: -20px;
	}
</style>
