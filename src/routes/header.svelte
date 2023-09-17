<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/svgs/search.svelte';
	import 'tippy.js/animations/perspective-subtle.css';
	import HeaderDroplist from './header_droplist.svelte';
	import { onMount } from 'svelte';
	import { typewriter, capitalFirstLeter, tooltip } from '$lib/utils';

	//import toolbar comps
	import Volume from '$lib/sveltes/volume.svelte';
	import Theme from '$lib/sveltes/theme.svelte';

	let template: HTMLElement;
	onMount(() => {
		template = <HTMLElement>document.getElementById('dropDownList');
		template.style.display = 'flex';
		spaceSound.volume = 0.07;
		thinkfast.volume = 0.5;
	});

	//making sub path in main path
	$: pathname =
		$page.url.pathname == '/' ? 'Home Page' : capitalFirstLeter($page.url.pathname.split('/')[1]);

	let volumeToggle: boolean, themeToggle: boolean;
	let pauseSFX = false;
	let spaceSound: HTMLAudioElement;
	let thinkfast: HTMLAudioElement;

	$: {
		if (volumeToggle && !pauseSFX) spaceSound?.play();
		else spaceSound?.pause();
	}
</script>

<header>
	<div class="nav-container">
		<div class="toolbar">
			<div
				use:tooltip={{
					content: 'Toggle mysterious sound',
					theme: 'catppuccin',
					animation: 'scale'
				}}
			>
				<Volume bind:toggle={volumeToggle} />
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				use:tooltip={{
					content: 'Chagne theme',
					theme: 'catppuccin',
					animation: 'scale'
				}}
				on:click={() => {
					thinkfast.play();
					setTimeout((E) => {
						themeToggle = true;
					}, 4500);
				}}
			>
				<Theme bind:toggle={themeToggle} />
			</div>

			<div id="ufo_home" />
		</div>
		<nav>
			<div
				class="searchBar"
				use:tooltip={{
					allowHTML: true,
					theme: 'catppuccin-transparent',
					animation: 'perspective-subtle',
					interactive: true,
					arrow: false,
					content: template,
					maxWidth: 400,
					offset: [15, 6],
					trigger: 'mouseenter click'
				}}
			>
				<div class="searchIcon">
					<Search size={25} color="#CAD3FF" />
				</div>
				{#key $page.url.pathname}
					<span in:typewriter={{ speed: 2 }}>
						{pathname}
					</span>
				{/key}

				<span class="blinking">_</span>
			</div>
			<img draggable="false" class="logo" src="/logo.jpg" alt="logo" />
		</nav>
	</div>

	<HeaderDroplist />
	<audio src="/sfx/space-sound.mp3" preload="auto" bind:this={spaceSound} loop />
	<audio src="/sfx/think-fast.mp3" preload="auto" bind:this={thinkfast} />
	<!--div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div-->
</header>

{#if !themeToggle}
	<div class="flashbang" class:play={!themeToggle} />
{/if}

<svelte:window on:blur={() => (pauseSFX = true)} on:focus={() => (pauseSFX = false)} />

<style>
	header {
		position: fixed;
		width: 100%;
		top: 0;
		display: flex;
		justify-content: center;
		z-index: 10;
	}

	.nav-container {
		max-width: 550px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 50px;
	}

	nav {
		flex: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		max-width: 400px;
		height: 30px;
		margin-top: 8px;
		margin-bottom: 8px;
		margin-left: 10px;
		margin-right: 10px;

		border: 1px solid rgba(var(--Lavender), 0.4);
		border-radius: 50px;
		padding: 4px;
		background-color: rgba(var(--Surface0), 0.5);
		backdrop-filter: blur(10px);

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.toolbar {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		height: 30px;
		margin-top: 8px;
		margin-bottom: 8px;
		margin-left: 10px;
		width: fit-content;

		column-gap: 10px;

		border: 1px solid rgba(var(--Lavender), 0.4);
		border-radius: 50px;
		padding: 4px;
		background-color: rgba(var(--Surface0), 0.5);
		backdrop-filter: blur(10px);
	}

	.toolbar > div:first-child {
		margin-left: 10px;
	}
	.toolbar > div:last-child {
		margin-right: 10px;
	}

	#ufo_home {
		width: 30px;
		height: 30px;
	}

	.flashbang {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: white;
	}

	.flashbang.play {
		animation: flash 5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	@keyframes flash {
		0% {
			opacity: 0;
		}

		2% {
			opacity: 1;
		}

		70% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
	/*
	nav:hover {
		transform: scale(1.05) translateY(5px);
        filter: drop-shadow(0px 0px 5px rgba(var(--Yellow), 0.2));
	}
	*/

	span {
		line-height: 30px;
	}

	.searchIcon {
		margin-right: 10px;
		margin-left: 10px;
		padding-right: 9px;
		border-right: 2px solid rgba(var(--Text), 0.2);
	}

	.searchBar {
		width: 100%;
		display: flex;
		flex-direction: row;
		cursor: text;

		overflow-x: hidden;
	}

	.blinking {
		color: rgb(var(--Rosewater));
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.logo {
		width: 30px;
		border-radius: 50%;
		animation: wobble 3s linear infinite;
		cursor: pointer;
	}

	@keyframes wobble {
		3.33% {
			transform: rotate(40deg);
		}
		6.66% {
			transform: rotate(-30deg);
		}
		10% {
			transform: rotate(20deg);
		}
		13.33% {
			transform: rotate(-10deg);
		}
		16.66% {
			transform: rotate(5deg);
		}
		20%,
		100% {
			transform: rotate(0deg);
		}
	}
</style>
