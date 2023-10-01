<script lang="ts">
	import badges from '$lib/data/bagde.json';
	export let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	function sendChangeText(value: number, text: string, learner: boolean) {
		descriptionChanger.value = value;
		descriptionChanger.text = text;
		descriptionChanger.learner = learner;
	}
</script>

<div class="profile">
	<div class="title">🚀 Languages</div>
	{#each badges.skill as skill (skill.name)}
		<img
			on:mouseenter={() => sendChangeText(skill.level, skill.name, false)}
			on:mouseleave={() => sendChangeText(0, '', false)}
			on:touchstart={() => setTimeout(() => sendChangeText(skill.level, skill.name, false), 10)}
			on:touchend={() => sendChangeText(0, '', false)}
			draggable="false"
			class="badge"
			src={`images/badges/${skill.name}.webp`}
			alt={skill.name}
		/>
	{/each}
	<div class="title">🌟 Experienced with</div>
	{#each badges.epx as epx (epx.name)}
		<img
			class="badge"
			draggable="false"
			on:mouseenter={() => sendChangeText(epx.level, epx.name, true)}
			on:mouseleave={() => sendChangeText(0, '', false)}
			on:touchstart={() => sendChangeText(epx.level, epx.name, true)}
			src={`images/badges/${epx.name}.webp`}
			alt={epx.name}
		/>
	{/each}
	<div class="title">💻 Battle Station</div>
	{#each badges.env as envi (envi.name)}
		<img draggable="false" src={`images/badges/${envi.name}.webp`} alt={envi.name} />
	{/each}
	<div class="dummy" />
</div>

<style lang="scss">
	.profile {
		display: flex;

		width: calc(100% - 12px);
		height: calc(100% - 12px);

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		padding: 5px;
		gap: 5px;

		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

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
			cursor: help;
		}

		.dummy {
			height: 50px;
			flex-basis: 100%;
		}
	}
</style>
