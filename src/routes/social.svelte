<script lang="ts">
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
			<img class="social hueSVG" alt={badge.name} src="svgs/{badge.name}.svg" />
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

	.social {
		position: relative;
		width: 45px;
		filter: invert(29%) sepia(22%) saturate(578%) hue-rotate(196deg) brightness(97%) contrast(88%);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.social:hover {
		transform: scale(1.2);
	}

	.hueSVG {
		border-radius: 50%;
		background: linear-gradient(120deg, #ff1b6b, #45caff, #ff1b6b);
		background-size: 200%;
		color: transparent;
		animation: hue 2s linear infinite;
	}
</style>
