<script>
	import { page } from '$app/stores';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import 'tippy.js/animations/scale.css';

	const pages = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'About',
			url: '/about'
		}
	];

	$: outerWidth = 0;

	onMount(() => {
		console.log(outerWidth);
	});
</script>

<header>
	<nav>
		<!--svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg-->
		<div
			use:tooltip={{
				content: `
<div class="nav-dropdown" style="width: ${outerWidth}px">
		<div class="nav-dropdown-item">test1</div>
		<div class="nav-dropdown-item">test1</div>
		<div class="nav-dropdown-item">test1</div>
		<div class="nav-dropdown-item">test1</div>
	</div>
                `,
				allowHTML: true,
				theme: 'catppuccin',
				animation: 'scale',
				interactive: true
			}}
		>
			{$page.url.pathname == '/' ? 'Home Page' : $page.url.pathname.split('/')[1]}
		</div>
	</nav>

	<!--div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div-->
</header>

<svelte:window bind:outerWidth />

<style>
	header {
		display: flex;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	.nav-dropdown {
		display: flex;
		width: 100%;
		max-width: 350px;
		flex-wrap: wrap;
		flex-direction: column;
		padding: 3px;
	}

	.nav-dropdown-item {
		width: 100%;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
