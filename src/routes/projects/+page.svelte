<script lang="ts">
	import Title from '$lib/sveltes/neonTitle.svelte';
	import { onMount } from 'svelte';

	interface project {
		name: string;
		description: string;
		path: string;
		old: boolean;
	}

	let isMounted = false;
	const projects: project[] = [
		{
			name: 'Amogusify',
			description: 'Turn your link into a bunch of sus crewmates.',
			path: '/amogus',
			old: false
		},
		{
			name: 'Ninym Ralei',
			description: 'Personal discord bot.',
			path: '/ninym',
			old: false
		},
		{
			name: 'Bonsai API',
			description: 'cbonsai but api.',
			path: '/projects/bonsai',
			old: false
		},
		{
			name: "Isaac's Tarot",
			description: 'Tarot card but Isaac',
			path: '/projects/isaactarot',
			old: false
		},
		{
			name: 'Boids Sim',
			description: 'Boids simulation.',
			path: '/projects/boids',
			old: false
		},
		{
			name: 'Scheduler',
			description: 'Very first project on freshman year.',
			path: '/projects/schedule',
			old: true
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
					<a href={project.path} class="project" class:abandoned={project.old}>
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
		background-color: rgba(var(--Crust), 1);

		font-family: 'Pixel Nes', 'Tahoma';

		z-index: 5;

		//backdrop-filter: blur(2px);
		//-webkit-backdrop-filter: blur(2px);
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
				transition: all 0.1s ease-in-out;
				margin-left: 20px;
				margin-right: 20px;
				color: rgba(var(--Text));

				&.abandoned {
					opacity: 0.5;
					text-decoration: line-through;
					text-decoration-color: rgb(var(--Red));
				}

				&:hover {
					color: rgb(var(--Green));
					text-decoration: none;
					transform: scale(1.01);
				}

				.card-title {
					font-size: 1rem;
					margin-left: 20px;
				}

				.card-description {
					font-size: 0.8rem;
					margin-left: 20px;
					margin-top: -5px;
					opacity: 0.5;
				}
			}
		}
	}
</style>
