<script lang="ts">
	import Title from '$lib/sveltes/neonTitle.svelte';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';

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
			name: 'GeoReImage (WIP)',
			description: 'Recreate image using 2d geometry',
			path: '/projects/georeimage',
			old: false
		},
		{
			name: 'EpicRename Generator',
			description: 'Generate commands for the EpicRename plugin.',
			path: '/projects/epicrename',
			old: false
		},
		{
			name: "Isaac's Tarot",
			description: "Tarot card but Isaac, for fun: don't take generated advice too serious.",
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
	<MetaTags
		title="Projects | Faewulf's Basement"
		description="Faewulf's projects."
		keywords={['faewulf', 'projects', 'list', 'infomation']}
		canonical="https://faewulf.xyz/projects"
	/>
</svelte:head>

<div class="main-wrapper">
	<Title subtitle="projects" />

	<div class="main__content-wrapper" bind:clientHeight={containerCLientHeight}>
		<div class="container-fixed-size" style="height: {containerCLientHeight}px;">
			{#if isMounted}
				{#each projects as project (project)}
					<a href={project.path} class="project" class:abandoned={project.old}>
						<div class="post__wrapper">
							<div class="post__description">
								<p class="card-title">{project.name}</p>
								<p class="card-description">{project.description}</p>
							</div>
						</div>
						<div class="post__wrapper highlight">
							<div class="post__description">
								<p class="card-title">{project.name}</p>
								<p class="card-description">{project.description}</p>
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.main-wrapper {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);
		background-color: rgba(var(--Overlay0), 1);

		font-family: 'Pixel Nes', 'Tahoma';

		z-index: 5;

		//backdrop-filter: blur(2px);
		//-webkit-backdrop-filter: blur(2px);
	}

	.main__content-wrapper {
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
				position: relative;
				width: 100%;
				height: fit-content;
				border-top: 1px solid rgba(var(--Text), 0.4);
				border-bottom: 1px solid rgba(var(--Text), 0.4);
				transition: all 0.4s ease;
				margin-left: 20px;
				margin-right: 20px;
				color: rgba(var(--Text));

				&.abandoned {
					opacity: 0.5;
					text-decoration: line-through;
					text-decoration-color: rgb(var(--Red));
				}

				.post__wrapper {
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

					&.highlight {
						position: absolute;
						top: 0;
						left: 0;

						width: 0;

						flex-wrap: nowrap;
						text-wrap: nowrap;

						overflow: hidden;

						background-color: rgba(var(--Green), 1);
						color: black;

						transition: width 0.4s ease;

						.card-description {
							opacity: 1;
						}
					}
				}

				&:hover {
					text-decoration: none;
					transform: scale(1.02);

					div.highlight {
						width: 100%;
					}
				}
			}
		}
	}
</style>
