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

<div class="title" id="infotabs-badges">🚀 Languages</div>
{#each badges.skill as skill (skill.name)}
	<img
		on:mouseenter={() => sendChangeText(skill.level, skill.name, false)}
		on:mouseleave={() => sendChangeText(0, '', false)}
		on:touchstart={() => setTimeout(() => sendChangeText(skill.level, skill.name, false), 10)}
		on:touchend={() => sendChangeText(0, '', false)}
		draggable="false"
		class="badge level-border"
		src="/images/badges/css_sprites.png"
		alt={skill.name}
		style="width: {skill.sprite.width}px; height: {skill.sprite.height}px; object-position: {skill.sprite.x}px {skill.sprite.y}px;"
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
		style="width: {epx.sprite.width}px; height: {epx.sprite.height}px; object-position: {epx.sprite.x}px {epx.sprite.y}px;"
	/>
{/each}
<div class="title">💻 Work Station</div>
{#each badges.env as envi (envi.name)}
	<img
		draggable="false"
		class="badge"
		alt={envi.name}
		src="/images/badges/css_sprites.png"
		style="width: {envi.sprite.width}px; height: {envi.sprite.height}px; object-position: {envi.sprite.x}px {envi.sprite.y}px;"
	/>
{/each}
<div class="dummy" />

<style lang="scss">
	.title {
		flex-basis: 100%;
		text-align: center;
		background-color: rgb(var(--Base));
		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		font-weight: 600;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.badge {
		border-radius: 5px;
		object-fit: none;
		cursor: help;
	}

	.dummy {
		height: 20px;
		flex-basis: 100%;
	}
</style>
