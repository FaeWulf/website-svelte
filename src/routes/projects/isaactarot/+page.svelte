<script lang="ts">
	import Card from '$lib/sveltes/components/isaactarot/card.svelte';
	import Book from '$lib/sveltes/components/isaactarot/book.svelte';
	import RuneBag from '$lib/sveltes/components/isaactarot/rune_bag.svelte';
	import Crystalball from '$lib/sveltes/components/isaactarot/crystalball.svelte';
	import Rune from '$lib/sveltes/components/isaactarot/rune.svelte';
	import Box from '$lib/sveltes/components/isaactarot/box.svelte';
	import type { cardData, runeData } from '$lib/sveltes/components/isaactarot/type';
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';

	let cardList: cardData[] = [];
	let runeList: runeData[] = [];
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/isaac/card_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/stone_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/rune_sprites.png" />
</svelte:head>

<MetaTags
	title="Isaac's Tarot | Faewulf's Basement"
	description="A fun little web for tarot enjoyer, TBOI's Tarot themed. Don't take the advice too serious!"
	keywords={['faewulf', 'projects', 'isaactarot', 'tarot', 'fun tool', 'tool']}
	canonical="https://faewulf.xyz/projects/isaactarot"
/>

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
