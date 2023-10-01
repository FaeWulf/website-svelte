<script lang="ts">
	import discord from '$lib/svgs/discord.svelte';
	import email from '$lib/svgs/email.svelte';
	import steam from '$lib/svgs/steam.svelte';
	import website from '$lib/svgs/website.svelte';
	import youtube from '$lib/svgs/youtube.svelte';
	import github from '$lib/svgs/github.svelte';

	import { tooltip } from '$lib/utils';
	import 'tippy.js/animations/scale.css';
	import { createSingleton } from 'tippy.js';
	import { onMount } from 'svelte';

	export let titleChanger = '';

	const badges = [
		{
			name: 'youtube',
			url: 'https://www.youtube.com/channel/UC20U4ou9cuZBH9atdMvUa6Q',
			component: youtube
		},
		{
			name: 'discord',
			url: 'https://discord.com/users/442263875560144896/',
			component: discord
		},
		{
			name: 'steam',
			url: 'https://steamcommunity.com/id/notfaewulf',
			component: steam
		},
		{
			name: 'website',
			url: 'https://faewulf.xyz',
			component: website
		},
		{
			name: 'github',
			url: 'https://github.com/FaeWulf',
			component: github
		},
		{
			name: 'email',
			url: 'mailto:contact@faewulf.xyz',
			component: email
		}
		//"facebook",
	];

	//this function will change title
	function sendTitle(text: string) {
		titleChanger = text;
	}

	let tippyInstances: any[] = [];

	onMount(() => {
		const singleton = createSingleton(tippyInstances, {
			moveTransition: 'transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
			delay: 50,
			theme: 'catppuccin',
			animation: 'scale'
		});
	});
</script>

<div class="container">
	{#each badges as badge (badge.name)}
		<a
			class="social"
			href={badge.url}
			target="_blank"
			draggable="false"
			on:mouseenter={() => sendTitle(badge.name)}
			on:mouseleave={() => sendTitle('')}
			use:tooltip={{ instancesHolder: tippyInstances }}
			title={badge.name}
		>
			<!--img class="social" alt={badge.name} src="svgs/{badge.name}.svg" /-->
			<svelte:component this={badge.component} size={41} />
		</a>
	{/each}
</div>

<style lang="scss">
	.container {
		margin-top: 50px;
		position: relative;
		max-width: 350px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;

		> a {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			opacity: 0.5;
		}

		.social {
			position: relative;
			width: 45px;
			cursor: pointer;
			transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

			&:hover {
				transform: scale(1.2);
			}
		}
	}
</style>
