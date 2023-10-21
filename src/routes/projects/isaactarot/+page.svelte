<script lang="ts">
	import Card from '$lib/sveltes/page-comps/isaactarot/card.svelte';
	import Book from '$lib/sveltes/page-comps/isaactarot/book.svelte';
	import Crystalball from '$lib/sveltes/page-comps/isaactarot/crystalball.svelte';
	import type { cardData } from '$lib/sveltes/page-comps/isaactarot/type';

	let cardList: cardData[] = [];
</script>

<svelte:head>
	<title>Faewulf's Basement | Isaac's Tarot</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main" />

<Crystalball bind:cardList />

{#each cardList as card (card.data)}
	<Card bind:card={card.data} bind:position={card.position} bind:cardList />
{/each}

<Book
	book={{
		name: "Isaac's Tarot",
		path: 'The_Book_of_Sin.png',
		description: 'Tarot card but Isaac'
	}}
	bind:cardList
/>

<style lang="scss">
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
	}
</style>
