<script lang="ts">
	import Title from '$lib/sveltes/neonTitle.svelte';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';

	import Entry from '$lib/sveltes/components/projects/entry.svelte';

	interface project {
		name: string;
		description: string;
		path: string;
		tags?: string[];
		source?: string;
		img?: string;
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
			name: 'Isaac\'s Tarot',
			description: 'Tarot card but Isaac, for fun: don\'t take generated advice too serious.',
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

<div class="main-wrapper behavior--click-through">
	<Title subtitle="projects" />

	<div class="main__content-wrapper behavior--click-through">
		<div class="container-fixed-size behavior--click-through">
			{#if isMounted}
				{#each projects as project (project)}
					<Entry name={project.name} description={project.description} url={project.path} tags={project.tags}
								 source={project.source} previewImg={project.img} />
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
    justify-content: center;
    align-items: center;
    flex-direction: column;

    z-index: 5;
  }

  .main__content-wrapper {
    overflow: hidden;
    margin-top: 40px;
    width: 100%;
    flex: 1;

    .container-fixed-size {
      position: relative;

      display: flex;
      flex-direction: row;
      width: 100%;
      height: fit-content;

      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
      gap: 15px;
    }
  }
</style>
