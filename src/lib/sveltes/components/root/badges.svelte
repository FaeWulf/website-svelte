<script lang="ts">
	import badges from '$lib/data/bagde.json';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createSingleton } from 'tippy.js';

	export let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	export function sendChangeText(value: number, text: string, learner: boolean) {
		descriptionChanger.value = value;
		descriptionChanger.text = text;
		descriptionChanger.learner = learner;
	}

	let tippyInstances: any[] = [];
	onMount(() => {
		const singleton = createSingleton(tippyInstances, {
			moveTransition: 'transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
			delay: 50,
			theme: 'catppuccin-light',
			animation: 'scale'
		});
	});
</script>

<div class="badge-title" id="js-infotabs-skill">🚀 Languages</div>
{#each badges.skill as skill (skill.name)}
	<img
		on:mouseenter={() => sendChangeText(skill.level, skill.name, false)}
		on:touchstart={() => setTimeout(() => sendChangeText(skill.level, skill.name, false), 10)}
		on:touchend={() => sendChangeText(0, '', false)}
		use:tooltip={{ instancesHolder: tippyInstances, content: skill.info }}
		draggable="false"
		class="badge-img"
		src="/images/badges/css_sprites.png"
		alt={skill.name}
		style="width: {skill.sprite.width}px; height: {skill.sprite.height}px; object-position: {skill.sprite.x}px {skill.sprite.y}px;"
	/>
{/each}
<div class="badge-title" id="js-infotabs-epx">🌟 Experienced with</div>
{#each badges.epx as epx (epx.name)}
	<img
		class="badge-img"
		draggable="false"
		on:mouseenter={() => sendChangeText(epx.level, epx.name, true)}
		on:touchstart={() => sendChangeText(epx.level, epx.name, true)}
		on:touchend={() => sendChangeText(0, '', false)}
		use:tooltip={{ instancesHolder: tippyInstances, content: epx.info }}
		src="/images/badges/css_sprites.png"
		alt={epx.name}
		style="width: {epx.sprite.width}px; height: {epx.sprite.height}px; object-position: {epx.sprite.x}px {epx.sprite.y}px;"
	/>
{/each}
<div class="badge-title" id="js-infotabs-workstation">💻 Work Station</div>
{#each badges.env as envi (envi.name)}
	<img
		draggable="false"
		class="badge-img"
		alt={envi.name}
		src="/images/badges/css_sprites.png"
		style="width: {envi.sprite.width}px; height: {envi.sprite.height}px; object-position: {envi.sprite.x}px {envi.sprite.y}px;"
	/>
{/each}
<div class="badge-dummy" />

<style lang="scss">
	.badge-title {
		flex-basis: 100%;
		text-align: center;
		background-color: rgb(var(--Overlay1));
		border: 1px solid var(--color-border-0);
		border-radius: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
		font-weight: 600;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

  .badge-img {
    border-radius: 5px;
    object-fit: none;
    cursor: help;
  }

	.badge-dummy {
		height: 20px;
		flex-basis: 100%;
	}
</style>
