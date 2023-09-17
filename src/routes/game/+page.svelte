<script lang="ts">
	import Title from './title.svelte';
</script>

<svelte:head>
	<title>Faewulf's Basement | Games</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title />
</div>

<style>
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		font-family: 'Pixel Nes', 'Tahoma';
	}

	@media only screen and (max-width: 720px) {
	}
</style>
