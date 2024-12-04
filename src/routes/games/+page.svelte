<script lang="ts">
	import GameTab from './gameTab.svelte';
	import NeonSign from '$lib/components/custom/NeonSign.svelte';
</script>

<svelte:head>
	<title>Faewulf's Basement | Games</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main-wrapper">
	<NeonSign title="Games" description="A list of my favorite games" />
	<GameTab />
</div>

<style>
    .main-wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        font-family: 'Pixel Nes', 'Tahoma';
    }

    @media only screen and (max-width: 720px) {
    }
</style>
