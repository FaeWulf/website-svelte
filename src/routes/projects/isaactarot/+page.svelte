<script lang="ts">
	import Card from '$lib/sveltes/page-comps/isaactarot/card.svelte';
	import Book from '$lib/sveltes/page-comps/isaactarot/book.svelte';
	import RuneBag from '$lib/sveltes/page-comps/isaactarot/rune_bag.svelte';
	import Crystalball from '$lib/sveltes/page-comps/isaactarot/crystalball.svelte';
	import Rune from '$lib/sveltes/page-comps/isaactarot/rune.svelte';
	import Box from '$lib/sveltes/page-comps/isaactarot/box.svelte';
	import type { cardData, runeData } from '$lib/sveltes/page-comps/isaactarot/type';
	import { MetaTags } from 'svelte-meta-tags';

	let cardList: cardData[] = [];
	let runeList: runeData[] = [];
</script>

<svelte:head>
	<link rel="preload" as="image" href="/images/isaac/card_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/stone_sprites.png" />
	<link rel="preload" as="image" href="/images/isaac/rune_sprites.png" />

	<MetaTags
		title="Isaac's Tarot | Faewulf's Basement"
		description="A fun little tool for tarot enjoyer, TBOI's Tarot themed"
		keywords={['faewulf', 'projects', 'isaactarot', 'tarot', 'fun tool', 'tool']}
		canonical="https://faewulf.xyz/projects/isaactarot"
	/>
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
