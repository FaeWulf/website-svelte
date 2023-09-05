<script lang="ts">
	import badges from '$lib/bagde.json';
	import { descriptionText } from './store';

	badges.skill.forEach((skill) => {
		const url = new URL(`../lib/images/badges/${skill.name}.webp`, import.meta.url).href;
		skill.url = url;
	});

	badges.env.forEach((env) => {
		const url = new URL(`../lib/images/badges/${env.name}.webp`, import.meta.url).href;
		env.url = url;
	});

	badges.epx.forEach((epx) => {
		const url = new URL(`../lib/images/badges/${epx.name}.webp`, import.meta.url).href;
		epx.url = url;
	});

	function sendChangeText(value: number, text: string) {
		descriptionText.set({ value, text });
	}
</script>

<div class="profile">
	<div class="title">🚀 Languages</div>
	{#each badges.skill as skill (skill.name)}
		<img
			on:mouseenter={() => sendChangeText(skill.level, skill.name)}
			on:mouseleave={() => sendChangeText(0, '')}
			class="badge"
			src={skill.url}
			alt={skill.name}
		/>
	{/each}
	<div class="title">🌟 Experienced with</div>
	{#each badges.epx as epx (epx.name)}
		<img class="badge" src={epx.url} alt={epx.name} />
	{/each}
	<div class="title">💻 Battle Station</div>
	{#each badges.env as envi (envi.name)}
		<img src={envi.url} alt={envi.name} />
	{/each}
	<div class="dummy" />
</div>

<style>
	.profile {
		display: flex;
		padding: 5px;

		width: 100%;
		max-width: 520px;
		height: 300px;

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		margin-top: 20px;
		gap: 5px;

		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
	}

	.title {
		flex-basis: 100%;
		text-align: center;
		background-color: rgb(var(--Base));
		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		font-weight: 600;
	}

	img {
		border-radius: 5px;
		width: auto;
		height: 28px;
	}

	.dummy {
		height: 50px;
		flex-basis: 100%;
	}
</style>
