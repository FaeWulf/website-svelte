<script lang="ts">
	import { slide } from 'svelte/transition';
	import { isMobile } from '$lib/utils';
	import { onMount } from 'svelte';
	import badges from '$lib/data/bagde.json';

	export let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	//to detect mobile user or not
	let mobileMode = false;

	$: level = descriptionChanger.value;
	$: learner = descriptionChanger.learner;
	$: text = descriptionChanger.text;

	const anVowel = [0, 2];
	const colorLevel = ['', '', 'hueText-green', 'hueText-blue', 'hueText-purple', 'hueText-red'];
	const textLevel = ['Inexperienced', 'Novice', 'Advanced&nbsp;Beginner', 'Competence', 'Proficient', 'Expert'];

	//list of all badges
	let badgesText:  {color: string, name: string}[] = [];

	badges.skill?.forEach(b => {
		badgesText.push({
			name: b.name,
			color: b.color
		});
	});

	badges.epx?.forEach(b => {
		badgesText.push({
			name: b.name,
			color: b.color
		});
	});

	//elements for textLevel scroller
	let levelScroll: HTMLElement;
	let previousIndex = level;

	//have to calculate adjustedWidth for the list (if not, then the list's width expand to fit all the word)
	$: adjustedWidth = 100;

	onMount(() => {
		mobileMode = isMobile(window, window.navigator);

		//calculate at start
		const list = levelScroll;
		const currentWord = levelScroll?.children.item(level);
		if (list && currentWord)
			adjustedWidth = currentWord.getBoundingClientRect().width;
	});

	//dynamic functions
	$: {
		if (previousIndex !== level) {
			scrollToWord(level, 300);
		}
		previousIndex = level;
	}

	function scrollToWord(index, speed = 500) {
		const list = levelScroll;
		const currentWord = levelScroll?.children.item(index);

		if (list && currentWord) {
			//have calculate adjustedWidth for the list (if not, then the list's width expand to fit all the word)
			adjustedWidth = currentWord.getBoundingClientRect().width;

			const wordHeight = currentWord.getBoundingClientRect().height;
			const targetPosition = index * wordHeight + index * 7;
			const startPosition = list.scrollTop;
			const distance = targetPosition - startPosition;
			let startTime = null;

			function animation(currentTime) {
				if (!startTime) startTime = currentTime;
				const timeElapsed = currentTime - startTime;
				list.scrollTop = ease(timeElapsed, startPosition, distance, speed);
				if (timeElapsed < speed) {
					requestAnimationFrame(animation);
				}
			}

			function ease(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return (c / 2) * t * t + b;
				t--;
				return (-c / 2) * (t * (t - 2) - 1) + b;
			}

			requestAnimationFrame(animation);
		}
	}

</script>

<h2>
	「
	{#if anVowel.includes(level)}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>An</span>
	{:else}
		<span class:animate={!mobileMode} transition:slide={{ delay: 200, axis: 'x' }}>A</span>
	{/if}

	<span class="description__level-list" bind:this={levelScroll} style="width: {adjustedWidth}px">
		{#each textLevel as textlvl, index (textlvl)}
			<span class="description__level-text {colorLevel[index]} {index}" class:animate={!mobileMode} aria-hidden={level !== index}>
				{@html textlvl}
			</span>
		{/each}
	</span>

	{#each badgesText as badgeText, index (badgeText)}
		{#if text === badgeText.name}
			<span
						class="description--info"
						out:slide={{ delay: 200, axis: 'x' }}
						in:slide={{ delay: 200, axis: 'x' }}
						style="color: #{badgeText.color}"
			>
				{@html badgeText.name.replaceAll(' ', '&nbsp;')}
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

<style lang="scss">
  h2 {
    margin-top: 5px;
    display: flex;
    gap: 5px;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .description__level-list {
    display: flex;
    flex-direction: column;
    height: 1.3rem;
    overflow: hidden;
    row-gap: 7px;

    scroll-behavior: smooth;
    transition: width 0.5s ease-in-out;

    .description__level-text {
      width: fit-content;
    }
  }

  .description--info {
		font-weight: bold;
		color: #fdfdfd;
  }


</style>
