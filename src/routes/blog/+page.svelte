<script lang="ts">
	import Title from './title.svelte';
</script>

<svelte:head>
	<title>Faewulf's Basement | Blog</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title />

	<a href="/blog/cake">lmao</a>
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
