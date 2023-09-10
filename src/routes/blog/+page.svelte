<script lang="ts">
	import Title from './title.svelte';
	import '../../styles/hueText.css';
</script>

<svelte:head>
	<title>Faewulf's Basement | Blog</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title />
</div>

<style>
	.main {
		flex: 1;
		border: 1px red solid;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	}
</style>
