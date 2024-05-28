<script lang="ts">
	import Logo from './logo.svelte';
	import Infos from './infos.svelte';

	import { gibberish, shuffleArray, typewriter } from '$lib/utils';
	import { MetaTags } from 'svelte-meta-tags';

	function onClickInvite() {
		window.open('https://discord.com/api/oauth2/authorize?client_id=874974280495026186&permissions=1071631366721&scope=bot', '_blank');
	}

	function onClickSupport() {
		window.open('https://discord.gg/xZneCTcEvb', '_blank');
	}

	let features = ['Image processing', 'Ciphers', 'Converters', 'Text tools', 'Generators', 'random thing!', 'OCR'];
	//shuffle features
	shuffleArray(features);

	let selectFeature = 0;

	setInterval(() => {
		selectFeature = (selectFeature + 1) % features.length;
	}, 4000);
</script>

<svelte:head>
	<MetaTags
		title="Ninym Ralei | Faewulf's Basement"
		description="Ninym Ralei's discord bot, with a lot of useful features."
		keywords={['faewulf', 'discord bot', 'bot', 'converter', 'image processing', 'ciphers', 'text tools', 'generators', 'ocr']}
		canonical="https://faewulf.xyz/ninym"
	/>
</svelte:head>

<Logo />
<h1>Ninym Ralei</h1>
<h3>
	Essential assistant discord bot for 「
	{#key selectFeature}
		<span class="highlight" in:gibberish={{ speed: 3, delay: 300 }} out:typewriter={{ speed: 5, delay: 0 }}>{features[selectFeature]}</span>
	{/key}
	」
</h3>
<Infos />
<div class="buttons">
	<button on:click={onClickInvite}>Invite to Discord</button>
	<button on:click={onClickSupport}>Support server</button>
</div>

<style lang="scss">
	h1 {
		font-size: 3.2rem;
		font-weight: 800;
	}

	h3 {
		margin-top: -10px;

		.highlight {
			color: rgb(var(--Green));
			//shifl color
			animation: color 5s ease-in-out infinite;
			@keyframes color {
				0% {
					color: rgb(var(--Green));
				}
				33% {
					color: rgb(var(--Red));
				}
				66% {
					color: rgb(var(--Blue));
				}
				100% {
					color: rgb(var(--Green));
				}
			}
		}
	}

	.buttons {
		display: flex;
		flex-direction: row;
		gap: 15px;

		button {
			box-sizing: border-box;

			font-size: 1rem;
			background: none;

			border: 2px solid rgba(var(--Lavender), 0.8);
			color: rgb(var(--Text));

			cursor: pointer;
			padding: 10px 20px 10px 20px;
			height: 50px;
			margin-top: 20px;

			transition: all 0.2s ease-in-out;

			&:hover {
				transform: scale(1.1);
				background: rgba(var(--Lavender), 0.3);
				border: 2px solid rgba(var(--Blue), 0.8);
			}
		}
	}
</style>
