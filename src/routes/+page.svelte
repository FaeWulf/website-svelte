<script lang="ts">
	//libs
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { tooltip } from '$lib/utils';

	//comps
	import Logo from './logo.svelte';
	import Description from './description.svelte';
	import Title from './title.svelte';
	import Social from './social.svelte';

	//tabs
	import Badges from '$lib/sveltes/page-comps/root/badges.svelte';
	import RecentTracks from '$lib/sveltes/page-comps/root/recentTracks.svelte';
	import RecentBlog from '$lib/sveltes/page-comps/root/recentBlog.svelte';

	import { ufoBubble } from '$lib/store';
	import { onMount } from 'svelte';
	import FortuneTeller from '$lib/sveltes/page-comps/root/fortuneTeller.svelte';

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
</svelte:head>

<Logo />
<Title bind:titleChanger />
<Description bind:descriptionChanger />
<div class="infoSlide">
	<Splide
		hasTrack={false}
		options={{
			type: 'loop',
			arrows: true,
			pagination: true,
			AutoScroll: true,
			height: '100%',
			width: '100%',
			autoplay: true,
			interval: 5000,
			pauseOnHover: true,
			pauseOnFocus: true,
			classes: {
				prev: 'splide__arrow--prev prev-arrow',
				next: 'splide__arrow--next next-arrow',
				pagination: 'splide__pagination pagination'
			}
		}}
	>
		<SplideTrack>
			<SplideSlide>
				<div class="infoTab">
					<Badges bind:descriptionChanger />
				</div>
			</SplideSlide>
			<SplideSlide>
				<div class="infoTab">
					<RecentTracks />
				</div>
			</SplideSlide>
			<SplideSlide>
				<div class="infoTab">
					<RecentBlog />
				</div>
			</SplideSlide>
			<SplideSlide>
				<div class="infoTab">
					<FortuneTeller />
				</div>
			</SplideSlide>
		</SplideTrack>
		<div class="splide__progress">
			<div class="splide__progress__bar" />
		</div>
		<button
			class="splide__toggle"
			type="button"
			use:tooltip={{
				content: 'Toggle autoplay',
				theme: 'catppuccin',
				animation: 'scale'
			}}
		>
			<svg class="splide__toggle__play" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="m22 12-20 11v-22l10 5.5z" />
			</svg>
			<svg class="splide__toggle__pause" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="m2 1v22h7v-22zm13 0v22h7v-22z" />
			</svg>
		</button>
	</Splide>
</div>
<Social bind:titleChanger />

<style lang="scss">
	.infoSlide {
		margin-top: 25px;
		opacity: 0.6;
		transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
		backdrop-filter: blur(2px);
		width: 100%;
		max-width: 420px;
		height: 200px;

		&:hover {
			opacity: 1;
		}

		.infoTab {
			width: 100%;
			max-width: 420px;
			height: 200px;

			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	:global(.splide__arrow svg),
	:global(.splide__arrow--next.next-arrow svg),
	:global(.splide__arrow--prev.prev-arrow svg) {
		fill: rgb(var(--Teal));
	}

	:global(.splide__arrow--next.next-arrow) {
		position: absolute;
		top: 50%;
		right: -40px;
		background: none;
		animation: animateArrow-reverse 0.6s ease-out infinite alternate;
	}

	:global(.splide__arrow--prev.prev-arrow) {
		position: absolute;
		top: 50%;
		left: -40px;
		background: none;
		animation: animateArrow 0.6s ease-out infinite alternate;
	}
	:global(.splide__pagination.pagination) {
		position: absolute;
		bottom: -30px;
	}

	:global(.splide__progress) {
		position: absolute;
		bottom: -10px;
		height: 1px;
		width: 100%;
		opacity: 0.5;
	}

	:global(.splide__progress__bar) {
		height: 1px;
		background: rgb(var(--Teal));
	}

	:global(.splide__pagination.pagination button) {
		background: rgb(var(--Teal));
	}

	:global(.splide__toggle) {
		position: absolute;
		width: 20px;
		height: 20px;
		background: none;
		border: 1px solid rgb(var(--Teal));

		display: flex;
		justify-content: center;
		align-items: center;
		bottom: -33px;
		left: 5px;
		opacity: 0.8;
	}
	:global(.splide__toggle svg) {
		fill: rgb(var(--Teal));
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

	@media only screen and (max-width: 620px) {
		:global(.splide__arrow--prev.prev-arrow),
		:global(.splide__arrow--next.next-arrow) {
			display: none;
		}
	}
</style>
