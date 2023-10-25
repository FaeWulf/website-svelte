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
			src="/images/badges/css_sprites.png"
			alt={skill.name}
			style="width: {skill.sprite.width}px; height: {skill.sprite.height}px; object-position: {skill
				.sprite.x}px {skill.sprite.y}px;"
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
			src="/images/badges/css_sprites.png"
			alt={epx.name}
			style="width: {epx.sprite.width}px; height: {epx.sprite.height}px; object-position: {epx
				.sprite.x}px {epx.sprite.y}px;"
		/>
	{/each}
	<div class="title">💻 Work Station</div>
	{#each badges.env as envi (envi.name)}
		<img
			draggable="false"
			class="badge"
			alt={envi.name}
			src="/images/badges/css_sprites.png"
			style="width: {envi.sprite.width}px; height: {envi.sprite.height}px; object-position: {envi
				.sprite.x}px {envi.sprite.y}px;"
		/>
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

		.badge {
			border-radius: 5px;
			object-fit: none;
			cursor: help;
		}

		.dummy {
			height: 50px;
			flex-basis: 100%;
		}
	}
</style>
