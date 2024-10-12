<script lang="ts">
	import { slide } from 'svelte/transition';
	import { isMobile } from '$lib/utils';
	import { onMount } from 'svelte';

	export let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	let mobileMode = false;

	onMount(() => {
		mobileMode = isMobile(window, window.navigator);
	});

	$: level = descriptionChanger.value;
	$: learner = descriptionChanger.learner;
	$: text = descriptionChanger.text.replaceAll(' ', '&nbsp;');

	const anVowel = [0, 2];
	const colorLevel = ['', '', 'hueText-green', 'hueText-blue', 'hueText-purple', 'hueText-red'];
	const textLevel = ['Inexperienced', 'Novice', 'Advanced&nbsp;Beginner', 'Competence', 'Proficient', 'Expert'];

	/*
	onMount(() => {
		descriptionText.subscribe((value) => {
			level = value.value;
			text = value.text.replaceAll(' ', '&nbsp;');
			learner = value.learner;
		});
	});
	*/
</script>

<h2>
	「
	{#if anVowel.includes(level)}
		An
	{:else}
		A
	{/if}
	{#each textLevel as textlvl, index (textlvl)}
		{#if level == index}
			<span transition:slide={{ delay: 200, axis: 'x' }} class:animate={!mobileMode} class={colorLevel[index]}>{@html textlvl}</span>
			<span class:hueText-cycle={!mobileMode} class="description-info" out:slide={{ delay: 200, axis: 'x' }} in:slide={{ delay: 200, axis: 'x' }}
				>{@html text}</span
			>
		{/if}
	{/each}
	{#if learner}
		learner
	{:else}
		developer
	{/if} on the sofa 」
</h2>

<style>
	h2 {
		margin-top: 5px;
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
		color: #eb008b;
	}
</style>
