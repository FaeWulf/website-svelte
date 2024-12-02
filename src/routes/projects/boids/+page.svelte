<script lang="ts">
	import Canvas from '$lib/sveltes/components/boids/canvas.svelte';
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';
</script>

<svelte:head>
	<MetaTags
		title="Boids simulation | Faewulf's Basement"
		description="A boids simulation using webgl and pixiJS."
		keywords={['faewulf', 'projects', 'boids simulation', 'pixijs', 'webgl']}
		canonical="https://faewulf.xyz/projects/boids"
	/>
</svelte:head>

<Canvas />

<style lang="scss">
</style>
