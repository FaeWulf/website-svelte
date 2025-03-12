<script lang="ts">
	//libs
	import { tooltip } from '$lib/utils';
	import { ChevronsDown } from 'lucide-svelte';

	//comps
	import Logo from '$lib/components/root/logo.svelte';
	import Description from '$lib/components/root/description.svelte';
	import Title from '$lib/components/root/title.svelte';
	import Social from '$lib/components/root/social.svelte';
	import HintBar from '$lib/components/root/hintBar.svelte';

	//tabs
	import Badges from '$lib/components/root/badges.svelte';
	import RecentTracks from '$lib/components/root/recentTracks.svelte';
	import RecentBlog from '$lib/components/root/recentBlog.svelte';
	import FortuneTeller from '$lib/components/root/fortuneTeller.svelte';
	import Projects from '$lib/components/root/projects.svelte';
	import EndCard from '$lib/components/root/endCard.svelte';

	import { ufoBubble } from '$lib/store';
	import { onMount } from 'svelte';
	import type { badgeInfo } from '$lib/types';


	export let data;

	const tabs: string[] = ['js-infotabs-1', 'js-infotabs-2', 'js-infotabs-3', 'js-infotabs-4', 'js-infotabs-project', 'js-infotabs-recentblog', 'js-infotabs-recenttracks', 'js-infotabs-fortuneteller'];
	let tab_index = 0;

	onMount(async () => {

		//hello day with state
		const currentHour = new Date().getHours(); // Get current hour (0-23)
		let dayState = '';
		if (currentHour >= 5 && currentHour < 12) {
			dayState = 'Morning';
		} else if (currentHour >= 12 && currentHour < 18) {
			dayState = 'Afternoon';
		} else {
			dayState = 'Night';
		}

		const greetings = ['Nice to meet you :D', 'Hello!', 'Greetings!', 'Good ' + dayState + '!'];
		setTimeout(() => {
			ufoBubble.set({ message: greetings[Math.floor(Math.random() * greetings.length)], timeout: 5000 });
		}, 500);

		const tourMessageTimer = setTimeout(() => {
			if (data.url == '/')
				ufoBubble.set({
					message: `You can click 🔍 on the search bar to show the function of components.`,
					timeout: 10_000
				});
		}, 10 * 1000);

		return () => {
			clearTimeout(tourMessageTimer);
		};
	});

	//cycle through tabs, call function scrollIntoView
	function nextTab() {
		tab_index = (tab_index + 1) % tabs.length;
		document.getElementById(tabs[tab_index])?.scrollIntoView({ behavior: 'smooth' });
	}

	let descriptionChanger: badgeInfo = {
		value: 0,
		text: '',
		learner: false,
		time: 0,
		favorite: false
	};

	let titleChanger = '';

</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/badges/css_sprites.png" />
</svelte:head>

<Logo />
<Title bind:titleChanger />
<Description bind:descriptionChanger />
<HintBar bind:descriptionChanger />
<div id="js-info-summary" class="info-summary">
	<div class="info-summary__wrapper"
			 on:mouseleave={() => {
					descriptionChanger.value = 0;
					descriptionChanger.text = '';
					descriptionChanger.learner = false;
					descriptionChanger.time = 0;
					descriptionChanger.favorite = false;
				}}
			 role="img"
	>
		<Badges bind:descriptionChanger />
		<Projects />
		<EndCard />
		<RecentBlog />
		<RecentTracks />
		<FortuneTeller />
	</div>
</div>
<button class="behavior--reset-button scroll-button"
				use:tooltip={{ theme: 'catppuccin', animation: 'scale', content: 'scroll...' }}
				on:click={nextTab}
>
	<ChevronsDown size={35} />
</button>
<Social bind:titleChanger />

<style lang="scss">
  .info-summary {
    margin-top: 5px;
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
      scroll-snap-type: y mandatory;

      padding: 5px;
      gap: 5px;

      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;

      border-radius: 8px;

      border: 1px var(--color-border-0) solid;
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

    animation: scroll-button__icon__keyframe--animateArrow 0.6s ease-in infinite alternate;
    color: rgb(var(--Text), 0.8);
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
