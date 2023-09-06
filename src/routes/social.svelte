<script lang="ts">
	import { onMount } from 'svelte';
	import { titleText } from './store';

	const badges = [
		{
			name: 'youtube',
			url: 'https://www.youtube.com/channel/UC20U4ou9cuZBH9atdMvUa6Q'
		},
		{
			name: 'discord',
			url: 'https://discord.com/users/442263875560144896/'
		},
		{
			name: 'steam',
			url: 'https://steamcommunity.com/id/notfaewulf'
		},
		{
			name: 'website',
			url: 'https://faewulf.xyz'
		},
		{
			name: 'github',
			url: 'https://github.com/FaeWulf'
		},
		{
			name: 'email',
			url: 'mailto:contact@faewulf.xyz'
		}
		//"facebook",
	];

	function sendTitle(text: string) {
		titleText.set({ value: text });
	}
</script>

<div class="container">
	{#each badges as badge (badge.name)}
		<a
			href={badge.url}
			target="_blank"
			on:mouseenter={() => sendTitle(badge.name)}
			on:mouseleave={() => sendTitle('')}
		>
			<img class="social" alt={badge.name} src="svgs/{badge.name}.svg" width="38" height="38" />
		</a>
	{/each}
</div>

<style>
	.container {
		position: relative;
		width: 350px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.2rem;
	}

	.container > a {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.container > a::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: rgb(var(--Base));
		transition: 0.3s;
		transform: scale(0.9);
		z-index: -2;
	}

	.container > a:hover::before {
		transform: scale(1);
		box-shadow: 0 0 8px #ffee10;
	}
</style>
