<script lang="ts">
	import { apiURL } from '$lib/store';
	import { onMount } from 'svelte';
	import LoadingCircle from '$lib/components/custom/LoadingCircle.svelte';
	import { sanitizeHTML } from '$lib/utils';

	let fortune: string;

	onMount(async () => {
		const fetchFortune = await fetch($apiURL + '/api/v1/misc/fortune').then((res) => res.json());
		fortune = fetchFortune.data.fortune;
	});
</script>

{#if fortune}
	<div class="badge-title" id="js-infotabs-fortuneteller">🔮 Fortune Teller</div>
	<div class="post__description">{@html sanitizeHTML(fortune.replaceAll(/\n/g, '<br />'))}</div>
{:else}
	<LoadingCircle />
{/if}

<div class="badge-dummy" />

<style lang="scss">
  .badge-title {
    flex-basis: 100%;
    text-align: center;
    background-color: rgb(var(--Overlay1));
    border: 1px var(--color-border-0) solid;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 600;
    scroll-snap-align: start;
  }

  .post__description {
    width: 100%;
    text-align: left;
  }

  .badge-dummy {
    height: 50px;
    flex-basis: 100%;
  }
</style>
