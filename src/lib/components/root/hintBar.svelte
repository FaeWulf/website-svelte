<script lang="ts">
	import type { badgeInfo } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createSingleton } from 'tippy.js';


	export let descriptionChanger: badgeInfo;

	//$: console.log(descriptionChanger);

	const colorLevel = ['', 'hueText-green', 'hueText-blue', 'hueText-purple', 'hueText-red'];
	const levels = [
		{
			name: 'Novice',
			description: ' - I understand basic concepts and syntax.<br/> - I can solve simple problems and completing straightforward tasks.<br/> - I still rely heavily on rules, guidance and google (stackoverflow too).'
		},
		{
			name: 'Advanced Beginner',
			description: '- I have somewhat experience using it.<br/> - I can create simple projects but still needs some guidance, tutorials.'
		},
		{
			name: 'Competence',
			description: ' - I have experience with related ecosystems, tools, and stacks.<br/> - I have solid knowledge and can discuss/teamwork with others.<br/> - I can take an idea and turn it into a working project mostly on my own.'
		},
		{
			name: 'Proficient',
			description: ' - I have lots of experience and a deep understanding about it.<br/> - I’m confident in my intuition and able to carefully think, making plans before doing any task.<br/> - I can handle tough problems and help others learn.'
		},
		{
			name: 'Expert',
			description: ' - I truly understand the philosophy behind it.<br/> - I’ve built an OS with it and can run DOOM on that OS.'
		}
	];

	let tippyInstances: any[] = [];
	let ChoseLevel = 0;

	onMount(() => {
		const singleton = createSingleton(tippyInstances, {
			moveTransition: 'transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
			delay: 50,
			theme: 'catppuccin-light',
			animation: 'scale',
			allowHTML: true,
			maxWidth: 280,
			hideOnClick: false
		});
	});

</script>

<fieldset id="js-info-bar" class="menu-bar-wrapper">
	<!--	<legend>Info</legend>-->

	<div class="menu-bar__extra-wrapper" use:tooltip={{ instancesHolder: tippyInstances }}
			 title="How long have I used '...'?"
			 class:menu-bar__extra-wrapper--active={descriptionChanger.time > 0}
	>
		Total experience:
		<div class="menu-bar__extra-text-wrapper">
			{#if descriptionChanger.time > 0}
				<span transition:fade={{axis: 'x'}}>
					{descriptionChanger.time} yrs
				</span>
			{/if}
		</div>
	</div>

	<div class="menu-bar__level-indicator-wrapper">
		<div class="menu-bar__level-indicator-text"></div>
		{#each levels as level, index (level.name)}
			<div class="menu-bar__level-indicator"
					 class:menu-bar__level-indicator--active={descriptionChanger.value >= index + 1 || ChoseLevel >= index + 1}
					 on:mouseenter={() => ChoseLevel = index + 1}
					 on:mouseleave={() => ChoseLevel = 0}
					 use:tooltip={{ instancesHolder: tippyInstances }}
					 title="Level: <span class='{colorLevel[index]}'>{level.name}</span><br/> {level.description}"
					 tabindex="0"
					 role="img"
			>
			</div>
		{/each}
	</div>

	<div class="menu-bar__star" class:menu-bar__star--active={descriptionChanger.favorite}>
		<img class="menu-bar__star-img" src="/images/badges/star.png" alt="Preferred Icon"
				 use:tooltip={{ instancesHolder: tippyInstances }}
				 title="Preferred" draggable="false" />
	</div>

</fieldset>

<style lang="scss">

  .menu-bar-wrapper {
    width: 100%;
    max-width: 418px;
    height: fit-content;

    margin: 25px 0 0 0;
    padding: 5px 0 5px;
    line-height: 0;

    border-radius: 0.5rem;
    border: 1px dashed var(--color-border-0);

    display: flex;
    gap: 5px;
    justify-content: flex-start;
    align-items: center;

    .menu-bar__extra-wrapper {
      margin-left: 8px;
      line-height: 1rem;

      display: flex;
      gap: 0.2rem;

      opacity: 0.6;
      color: rgb(var(--Subtext0));
      transition: opacity 0.2s ease;

      .menu-bar__extra-text-wrapper {
        width: 3.5rem;
      }

      &--active {
        opacity: 1.0;
      }
    }

    .menu-bar__level-indicator-wrapper {
      display: flex;
      gap: 7px;

      .menu-bar__level-indicator-text {
        line-height: 1rem;
        color: rgba(var(--Subtext0), 1);
      }

      .menu-bar__level-indicator {
        width: 15px;
        height: 15px;
        border-radius: 50%;

        //border: 1px sold rgba(var(--Subtext0), 1);
        border: 1px solid var(--color-border-secondary);
        transition: all 0.3s ease;
        filter: drop-shadow(1px 1px 3px rgba(black, 0.5));
        image-rendering: pixelated;

        &--active {
          background: rgba(var(--Green), 1) !important;
        }
      }
    }

    .menu-bar__star {

      opacity: 0.8;
      filter: drop-shadow(1px 1px 3px rgba(black, 0.5)) grayscale(1.0) brightness(0.5);
      transition: all 0.2s ease;

      .menu-bar__star-img {
        width: 20px;
        height: 20px;
        margin-top: -3px;
        line-height: 0;
      }

      &--active {
        opacity: 1;
        filter: drop-shadow(1px 1px 3px rgba(black, 0.5)) grayscale(0) brightness(1);
      }

    }

    legend {
      color: rgba(var(--Subtext0), 0.6);
      padding: 0 5px 0 5px;
    }
  }

</style>
