<script lang="ts">
	import badges from '$lib/data/bagde.json';
	import { tooltip } from '$lib/utils';
	import { onMount } from 'svelte';
	import { createSingleton } from 'tippy.js';
	import type { badgeInfo } from '$lib/types';

	export let descriptionChanger: badgeInfo = {
		value: 0,
		text: '',
		learner: false
	};

	export function sendChangeText(value: number, text: string, learner: boolean, time: number, favorite: boolean) {
		descriptionChanger.value = value;
		descriptionChanger.text = text;
		descriptionChanger.learner = learner;
		descriptionChanger.time  = time;
		descriptionChanger.favorite = favorite;
	}
</script>

<div class="badge-title" id="js-infotabs-skill">🚀 Languages</div>
{#each badges.skill as skill (skill.name)}
	<div class="badge-wrapper">
		<img
			on:mouseenter={() => sendChangeText(skill.level, skill.name, false, skill.time, skill.preferred)}
			on:touchstart={() => setTimeout(() => sendChangeText(skill.level, skill.name, false, skill.time, skill.preferred), 10)}
			on:touchend={() => sendChangeText(0, '', false, 0, false)}
			draggable="false"
			class="badge-img"
			src="/images/badges/css_sprites.png"
			alt={skill.name}
			style="width: {skill.sprite.width}px; height: {skill.sprite.height}px; object-position: {skill.sprite.x}px {skill.sprite.y}px;"
		/>
		{#if skill.preferred}
			<img class="badge-star" src="/images/badges/star.png" alt="preferred" draggable="false">
		{/if}
	</div>
{/each}
<div class="badge-title" id="js-infotabs-epx">🌟 Experienced with</div>
{#each badges.epx as epx (epx.name)}
	<div class="badge-wrapper">
		<img
			class="badge-img"
			draggable="false"
			on:mouseenter={() => sendChangeText(epx.level, epx.name, true, epx.time, epx.preferred)}
			on:touchstart={() => sendChangeText(epx.level, epx.name, true, epx.time, epx.preferred)}
			on:touchend={() => sendChangeText(0, '', false, 0, false)}
			src="/images/badges/css_sprites.png"
			alt={epx.name}
			style="width: {epx.sprite.width}px; height: {epx.sprite.height}px; object-position: {epx.sprite.x}px {epx.sprite.y}px;"
		/>
		{#if epx.preferred}
			<img class="badge-star" src="/images/badges/star.png" alt="preferred" draggable="false">
		{/if}
	</div>
{/each}
<div class="badge-title" id="js-infotabs-workstation">💻 Work Station</div>
{#each badges.env as envi (envi.name)}
	<div class="badge-wrapper">
		<img
			draggable="false"
			class="badge-img"
			alt={envi.name}
			src="/images/badges/css_sprites.png"
			style="width: {envi.sprite.width}px; height: {envi.sprite.height}px; object-position: {envi.sprite.x}px {envi.sprite.y}px;"
		/>
		{#if envi.preferred}
			<img class="badge-star" src="/images/badges/star.png" alt="preferred" draggable="false">
		{/if}
	</div>
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

  .badge-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
    line-height: 0;

    .badge-img {
      border-radius: 5px;
      object-fit: none;
      cursor: help;
    }

    .badge-star {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 13px;
      height: 13px;

      filter: drop-shadow(-1px 1px 2px black);
      animation: badge-star__blink 5s ease 5s infinite;
    }
  }

  .badge-dummy {
    height: 20px;
    flex-basis: 100%;
  }

  @keyframes badge-star__blink {

    0%, 80%, 100% {
      transform: scale(1);
    }

    90% {
      transform: scale(1.3);
    }
  }
</style>
