<script lang="ts">
	import Card from '$lib/sveltes/page-comps/isaactarot/card.svelte';
	import Book from '$lib/sveltes/page-comps/isaactarot/book.svelte';
	import RuneBag from '$lib/sveltes/page-comps/isaactarot/rune_bag.svelte';
	import Crystalball from '$lib/sveltes/page-comps/isaactarot/crystalball.svelte';
	import Rune from '$lib/sveltes/page-comps/isaactarot/rune.svelte';
	import Box from '$lib/sveltes/page-comps/isaactarot/box.svelte';
	import type { cardData, runeData } from '$lib/sveltes/page-comps/isaactarot/type';

	let cardList: cardData[] = [];
	let runeList: runeData[] = [];
</script>

<svelte:head>
	<title>Faewulf's Basement | Isaac's Tarot</title>
	<meta name="description" content="About this website" />
	<link rel="preload" as="image" href="/images/isaac/card_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/stone_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/rune_sprites.png" />
</svelte:head>

<div class="main" />
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
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		//backdrop-filter: blur(2px);
		//-webkit-backdrop-filter: blur(2px);
	}
</style>
