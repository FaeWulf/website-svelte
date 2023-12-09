<script lang="ts">
	import { apiURL } from '$lib/store';
	import { onMount } from 'svelte';

	let fortune: string;

	onMount(async () => {
		const url = $apiURL;
		const fetchFortune = await fetch(url + '/api/v1/misc/fortune').then((res) => res.json());
		fortune = fetchFortune.data.fortune;
	});
</script>

{#if fortune}
	<div class="title">🔮 Fortune Teller</div>
	<div class="text">{@html fortune.replaceAll(/\n/g, '<br />')}</div>
{:else}
	<div>Searching...</div>
{/if}

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
	}

	.text {
		width: 100%;
		text-align: left;
	}

	.dummy {
		height: 50px;
		flex-basis: 100%;
	}
</style>
