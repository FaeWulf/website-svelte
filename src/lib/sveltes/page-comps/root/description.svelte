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

</script>

<h2>
	「
	{#if anVowel.includes(level)}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>An</span>
	{:else}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>A</span>
	{/if}

	{#each textLevel as textlvl, index (textlvl)}
		{#if level === index}
			<span class={colorLevel[index]}
						class:animate={!mobileMode}
						transition:slide={{ delay: 200, axis: 'x' }}
			>
				{@html textlvl}
			</span>
			<span class:hueText-cycle={!mobileMode}
						class="description-info"
						out:slide={{ delay: 200, axis: 'x' }}
						in:slide={{ delay: 200, axis: 'x' }}
			>
				{@html text}
			</span>
		{/if}
	{/each}

	<!--	This is for user/developer word after the language/program selecting-->
	{#if learner}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>user</span>
	{:else}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>developer</span>
	{/if}

	on the sofa 」
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
