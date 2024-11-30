<script lang="ts">
	//libs
	import { tooltip } from '$lib/utils';

	//comps
	import Logo from '$lib/sveltes/components/root/logo.svelte';
	import Description from '$lib/sveltes/components/root/description.svelte';
	import Title from '$lib/sveltes/components/root/title.svelte';
	import Social from '$lib/sveltes/components/root/social.svelte';

	//tabs
	import Badges from '$lib/sveltes/components/root/badges.svelte';
	import RecentTracks from '$lib/sveltes/components/root/recentTracks.svelte';
	import RecentBlog from '$lib/sveltes/components/root/recentBlog.svelte';
	import FortuneTeller from '$lib/sveltes/components/root/fortuneTeller.svelte';

	import { ufoBubble } from '$lib/store';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';

	const tabs: string[] = ['js-infotabs-skill', 'js-infotabs-epx', 'js-infotabs-workstation', 'js-infotabs-recentblog', 'js-infotabs-recenttracks', 'js-infotabs-fortuneteller'];
	let tab_index = 0;

	onMount(async () => {
		const greetings = ['Happy 2024!', 'Hello!', 'Greetings!'];
		setTimeout(() => {
			ufoBubble.set(greetings[Math.floor(Math.random() * greetings.length)]);
		}, 500);
	});

	//cycle through tabs, call function scrollIntoView
	function nextTab() {
		tab_index = (tab_index + 1) % tabs.length;
		document.getElementById(tabs[tab_index])?.scrollIntoView({ behavior: 'smooth' });
	}

	let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	let titleChanger = '';

</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/badges/css_sprites.png" />
	<MetaTags
		title="HQ | Faewulf's Basement"
		description="Faewulf's Landing Page."
		keywords={['faewulf', 'hq', 'bio', 'landing page', 'portfolio']}
		canonical="https://faewulf.xyz/"
	/>
</svelte:head>

<Logo />
<Title bind:titleChanger />
<Description bind:descriptionChanger />
<div class="info-summary">
	<div class="info-summary__wrapper"
			 on:mouseleave={() => {
					descriptionChanger.value = 0;
					descriptionChanger.text = '';
					descriptionChanger.learner = false;
				}}
			 role="img"
	>
		<Badges bind:descriptionChanger />
		<RecentBlog />
		<RecentTracks />
		<FortuneTeller />
	</div>
</div>
<div class="scroll-button" use:tooltip={{ theme: 'catppuccin', animation: 'scale', content: 'scroll...' }}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img class="scroll-button__icon" draggable="false" src="/svgs/double_down_arrow.svg" alt="down arrow"
			 on:click={nextTab} />
</div>
<Social bind:titleChanger />

<style lang="scss">
  .info-summary {
    margin-top: 25px;
    opacity: 0.6;
    transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    //backdrop-filter: blur(2px);
    width: 100%;
    max-width: 420px;
    height: 240px;

    &:hover {
      opacity: 1;
      background-color: rgba(var(--Overlay0), 0.5);
    }

    .info-summary__wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100%;

      flex-wrap: wrap;
      overflow-y: auto;
      overflow-x: hidden;

      padding: 5px;
      gap: 5px;

      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;

      border-radius: 8px;

      border: 1px rgba(var(--Text), 0.2) solid;
      mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
      -webkit-mask-image: -webkit-linear-gradient(to bottom, black 70%, transparent 100%);
    }
  }

  .scroll-button {
    margin-top: 10px;
    opacity: 0.6;
    //transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    //remove ability to select text
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .scroll-button__icon {
      width: 35px;
      animation: scroll-button__icon__keyframe--animateArrow 0.6s ease-in infinite alternate;
      cursor: pointer;
    }
  }

  @keyframes scroll-button__icon__keyframe--animateArrow {
    0% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(4px);
    }
  }
</style>
