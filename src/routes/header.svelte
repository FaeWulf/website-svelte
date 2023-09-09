<script lang="ts">
	import { page } from '$app/stores';
	import { tooltip } from '$lib/utils';
	import Search from '$lib/svgs/search.svelte';
	import 'tippy.js/animations/perspective-subtle.css';
	import HeaderDroplist from './header_droplist.svelte';
	import { onMount } from 'svelte';
	import { typewriter, capitalFirstLeter } from '$lib/utils';

	let template: HTMLElement;
	onMount(() => {
		template = <HTMLElement>document.getElementById('dropDownList');
		template.style.display = 'flex';
	});

	$: pathname =
		$page.url.pathname == '/' ? 'Home Page' : capitalFirstLeter($page.url.pathname.split('/')[1]);
</script>

<header>
	<nav>
		<div
			class="searchBar"
			use:tooltip={{
				allowHTML: true,
				theme: 'catppuccin',
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
		<img draggable="false" class="logo" src="logo.jpg" alt="logo" />
	</nav>

	<HeaderDroplist />

	<!--div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div-->
</header>

<style>
	header {
		/*
		position: absolute;
		width: 100%;
		top: 0;
        */
		display: flex;
		justify-content: center;
		z-index: 10;
	}

	nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		max-width: 400px;
		width: 100%;
		height: 30px;
		margin-top: 10px;
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

	nav:hover {
		transform: scale(1.05) translateY(5px);
		filter: drop-shadow(0px 0px 5px rgba(var(--Yellow), 0.2));
	}

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
	}

	.blinking {
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
