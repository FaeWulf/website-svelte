<script lang="ts">
	import Card from '$lib/components/isaactarot/card.svelte';
	import Book from '$lib/components/isaactarot/book.svelte';
	import RuneBag from '$lib/components/isaactarot/rune_bag.svelte';
	import Crystalball from '$lib/components/isaactarot/crystalball.svelte';
	import Rune from '$lib/components/isaactarot/rune.svelte';
	import Box from '$lib/components/isaactarot/box.svelte';
	import type { cardData, runeData } from '$lib/components/isaactarot/type';

	let cardList: cardData[] = [];
	let runeList: runeData[] = [];
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/isaac/card_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/stone_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/rune_sprites.png" />
</svelte:head>

<div class="main-wrapper" />
<Crystalball bind:cardList />

<Box bind:cardList bind:runeList />

{#each cardList as card (card.data)}
	<Card bind:card={card.data} bind:position={card.position} bind:cardList />
{/each}

{#each runeList as rune (rune.data)}
	<Rune bind:rune={rune.data} bind:position={rune.position} bind:runeList />
{/each}

<RuneBag bind:runeList />

<Book bind:cardList />

<style lang="scss">
  .main-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid var(--color-border-0);

    //backdrop-filter: blur(2px);
    //-webkit-backdrop-filter: blur(2px);
  }
</style>
