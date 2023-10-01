<script lang="ts">
	import Title from '$lib/sveltes/neonTitle.svelte';
	import { onMount } from 'svelte';

	interface project {
		name: string;
		description: string;
		path: string;
	}

	let isMounted = false;
	const projects: project[] = [
		{
			name: 'Amogusify',
			description: 'Turn your link into a bunch of sus crewmates.',
			path: '/amogus'
		},
		{
			name: 'Bonsai API',
			description: 'cbonsai but api.',
			path: '/projects/bonsai'
		},
		{
			name: 'Schedule generator',
			description: 'Simple schedule generator.',
			path: '/projects/schedule'
		}
	];

	onMount(() => {
		isMounted = true;
	});

	let containerCLientHeight: number;
</script>

<svelte:head>
	<title>Faewulf's Basement | Projects</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<Title subtitle="projects" />

	<div class="container" bind:clientHeight={containerCLientHeight}>
		<div class="container-fixed-size" style="height: {containerCLientHeight}px;">
			{#if isMounted}
				{#each projects as project (project)}
					<a href={project.path} class="project">
						<p class="card-title">{project.name}</p>
						<p class="card-description">{project.description}</p>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
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

	.container {
		overflow: hidden;
		margin-top: 40px;
		width: 100%;
		flex: 1;

		.container-fixed-size {
			display: flex;
			flex-direction: row;
			width: 100%;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			gap: 0;
			overflow: auto;

			.project {
				width: 100%;
				height: fit-content;
				border-top: 1px solid rgba(var(--Text), 0.4);
				border-bottom: 1px solid rgba(var(--Text), 0.4);
				transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
				margin-left: 20px;
				margin-right: 20px;

				.card-title {
					font-size: 1rem;
					margin-left: 20px;
					color: rgb(var(--Text));
				}
				.card-description {
					font-size: 0.8rem;
					margin-left: 30px;
					color: rgba(var(--Text), 0.6);
				}
			}
		}
	}
</style>
