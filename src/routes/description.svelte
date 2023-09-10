<script lang="ts">
	import { onMount } from 'svelte';
	import { descriptionText } from './store';
	import { slide } from 'svelte/transition';

	let level = -1;
	let learner = false;
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
			text = value.text.replaceAll(' ', '&nbsp;');
			learner = value.learner;
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
			<span
				class="hueText-cycle description-info"
				out:slide={{ delay: 200, axis: 'x' }}
				in:slide={{ delay: 200, axis: 'x' }}>{@html text}</span
			>
		{/if}
	{/each}
	{#if learner}
		learner
	{:else}
		developer
	{/if} on the sofa
</h2>

<style>
	h2 {
		margin-top: -20px;
		display: flex;
		gap: 5px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.level {
		display: none;
	}

	.description-info {
		font-weight: 800;
	}
</style>
