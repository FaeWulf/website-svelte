<script lang="ts">
	import categories from '$lib/data/badge.json';
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

{#each categories as category, index (category.name)}
	<div class="badge-title" id="js-infotabs-{index+1}">{category.name}</div>
	{#each category.data as badge (badge.name)}
		<div class="badge-wrapper">
		<img
			tabindex="0"
			role="img"
			on:mouseenter={() => sendChangeText(badge.level, badge.name, index !== 0 , badge.time, badge.preferred)}
			on:focusin={() => sendChangeText(badge.level, badge.name, index !== 0 , badge.time, badge.preferred)}
			on:touchstart={() => setTimeout(() => sendChangeText(badge.level, badge.name, index !== 0, badge.time, badge.preferred), 10)}
			on:touchend={() => sendChangeText(0, '', false, 0, false)}
			on:focusout={() => sendChangeText(0, '', false, 0, false)}
			draggable="false"
			class="badge-img"
			src="/images/badges/css_sprites.png"
			aria-label="{badge.name}"
			alt={badge.name}
				style="width: {badge.sprite.width}px; height: {badge.sprite.height}px; object-position: {badge.sprite.x}px {badge.sprite.y}px;"
				/>
				{#if badge.preferred}
					<img class="badge-star" src="/images/badges/star.png" alt="preferred" draggable="false">
				{/if}
			</div>
	{/each}
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
