<script lang="ts">
	import { onMount } from 'svelte';
	import { descriptionText } from './store';
	import { typewriter, gibberish } from '$lib/utils';
	import '../styles/hueText.css';
	import { fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let level = -1;
	let text = '';

	const anVowel = [0, 2];
	const colorLevel = ['', '', 'hueText-green', 'hueText-blue', 'hueText-purple', 'hueText-red'];
	const textLevel = [
		'inexperience',
		'Novice',
		'Advaned&nbsp;Beginner',
		'Competence',
		'Proficient',
		'Expert'
	];

	onMount(() => {
		descriptionText.subscribe((value) => {
			level = value.value;
			text = value.text;
		});
	});
</script>

<h2>
	{#if anVowel.includes(level)}
		An
	{:else}
		A
	{/if}
	{#each textLevel as textlvl, index (textlvl)}
		{#if level == index}
			<span transition:slide={{ delay: 200, axis: 'x' }} class={colorLevel[index]}
				>{@html textlvl}</span
			>
			<span out:slide={{ delay: 200, axis: 'x' }} in:slide={{ delay: 200, axis: 'x' }}>{text}</span>
		{/if}
	{/each} developer on the sofa
</h2>

<style>
	h2 {
		margin-top: -20px;
		display: flex;
		gap: 5px;
	}

	.level {
		display: none;
	}
</style>
