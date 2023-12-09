<script lang="ts">
	//libs
	import { tooltip } from '$lib/utils';

	//comps
	import Logo from '$lib/sveltes/page-comps/root/logo.svelte';
	import Description from '$lib/sveltes/page-comps/root/description.svelte';
	import Title from '$lib/sveltes/page-comps/root/title.svelte';
	import Social from '$lib/sveltes/page-comps/root/social.svelte';

	//tabs
	import Badges from '$lib/sveltes/page-comps/root/badges.svelte';
	import RecentTracks from '$lib/sveltes/page-comps/root/recentTracks.svelte';
	import RecentBlog from '$lib/sveltes/page-comps/root/recentBlog.svelte';
	import FortuneTeller from '$lib/sveltes/page-comps/root/fortuneTeller.svelte';

	import { ufoBubble } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(async () => {
		const greetings = ["Welcome to Faewulf's Basement!", 'Hello!', 'Greetings!'];
		ufoBubble.set(greetings[Math.floor(Math.random() * greetings.length)]);
	});

	let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	let titleChanger = '';
</script>

<svelte:head>
	<title>Faewulf's Basement | HQ</title>
	<meta name="description" content="My Bio" />
	<link rel="preload" as="image" href="/images/badges/css_sprites.png" />
</svelte:head>

<Logo />
<Title bind:titleChanger />
<Description bind:descriptionChanger />
<div class="infoSlide">
	<div class="infoTab">
		<Badges bind:descriptionChanger />
		<RecentTracks />
		<RecentBlog />
		<FortuneTeller />
	</div>
</div>
<Social bind:titleChanger />

<style lang="scss">
	.infoSlide {
		margin-top: 25px;
		opacity: 0.6;
		transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
		//backdrop-filter: blur(2px);
		width: 100%;
		max-width: 420px;
		height: 200px;

		&:hover {
			opacity: 1;
		}

		.infoTab {
			/*
			width: 100%;
			max-width: 420px;
			height: 200px;

			display: flex;
			justify-content: center;
			align-items: center;

			flex-direction: column;
			*/
			width: calc(100% - 12px);
			height: calc(100% - 12px);

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
			-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		}
	}

	@keyframes animateArrow {
		0% {
			transform: translateX(-7px) scale(1.5);
		}
		100% {
			transform: translateX(7px) scale(1.5);
		}
	}

	@keyframes animateArrow-reverse {
		0% {
			transform: translateX(7px) scale(1.5);
		}
		100% {
			transform: translateX(-7px) scale(1.5);
		}
	}
</style>
