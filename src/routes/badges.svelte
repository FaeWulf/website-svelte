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

<style>
	.profile {
		display: flex;
		padding: 5px;

		width: 100%;
		max-width: 420px;
		height: 200px;
		opacity: 0.6;

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		margin-top: 25px;
		gap: 5px;

		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);

		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */

		transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
		backdrop-filter: blur(2px);
	}

	.profile:hover {
		opacity: 1;
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
