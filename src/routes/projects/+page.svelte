<script lang="ts">
	import { onMount } from 'svelte';

	import Title from '$lib/components/custom/neonTitle.svelte';
	import MetaTags from '$lib/components/custom/MetaTags.svelte';
	import Entry from '$lib/components/projects/entry.svelte';

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
	let projects: project[] = [
		{
			name: 'Amogusify',
			description: 'Instead of shortening your link, this silly simple tool instead turns your link into a bunch of sus crewmates.',
			path: '/amogus',
			img: '/images/projects/amogus.webp',
			tags: ['typescript', 'html', 'SvelteKit'],
			old: false
		},
		{
			name: 'Ninym Ralei',
			description: 'My personal discord bot! It contains a lot of converters for base, color format, measure unit,... Image processing, OCR, text check tool, and more!',
			path: '/ninym',
			img: '/images/projects/ninimralei.webp',
			tags: ['typescript', 'discordjs', 'mongodb'],
			old: false
		},
		{
			name: 'Bonsai API',
			description: 'An API for generating SVG bonsai trees! This is a port of cbonsai, originally created by John Allbritten.',
			path: '/projects/bonsai',
			img: '/images/projects/bonsai.webp',
			tags: ['typescript', 'nodejs', 'expressjs'],
			old: false
		},
		{
			name: 'GeoReImage (WIP)',
			description: 'Recreate image using 2d geometry',
			path: '/projects/georeimage',
			old: true
		},
		{
			name: 'EpicRename Generator',
			description: 'A small tool to generates commands for the EpicRename plugin and my ItemRename mod! You can add color with an easy-to-use editor, preview it and then export it into commands!',
			path: '/projects/epicrename',
			img: '/images/projects/epicrename.webp',
			tags: ['html', 'javascript'],
			old: false
		},
		{
			name: 'Isaac\'s Tarot',
			description: 'Tarot card but The Binding of Isaac\'s theme, draw 3 cards and use crystal ball will give you an advice! Warning: silly and for-fun generated advices, don\'t take it too serious.',
			path: '/projects/isaactarot',
			img: '/images/projects/isaactarot.webp',
			tags: ['html', 'css', 'javascript'],
			old: false
		},
		{
			name: 'Boids Sim',
			description: 'Interactive Boids - Flocking Simulation. With customizable parameters!',
			path: '/projects/boids',
			tags: ['typescript', 'PixiJS'],
			img: '/images/projects/boid.webp',
			old: false
		},
		{
			name: 'Scheduler',
			description: 'Very first project on freshman year.',
			path: '/projects/schedule',
			old: true
		},
		{
			name: 'Diversity',
			description: 'Diversity is a Minecraft mod that introduces a wide range of features to enhance the gameplay experience. From quality of life improvements to new mob behaviors and random sh*t, this mod offers a little bit of everything. The mod is designed to work on server-side only installations as well.',
			path: 'https://modrinth.com/mod/faewufs-diversity',
			tags: ['java', 'Multiloader', 'Minecraft', 'Server-side'],
			source: 'https://github.com/FaeWulf/Diversity',
			img: '/images/projects/diversity.webp',
			old: false
		},
		{
			name: 'ItemRename',
			description: 'The Item Rename mod for Fabric that allows players to edit various properties of items in the game, such as their name, lore, and enchantment glow. With support for color and formatting, you can personalize your items like a piece of cake.',
			path: 'https://modrinth.com/mod/faewulf-itemrename',
			tags: ['java', 'Minecraft', 'Fabric', 'Server-side'],
			source: 'https://github.com/FaeWulf/item-rename',
			img: '/images/projects/itemrename.webp',
			old: false
		},
		{
			name: 'Squaremap Banner',
			description: 'A mod that is an extension for the SquareMap mod. It adds additional functionality related to banners within the game: use banner to create markers visible in the worldmap. Inspired by squaremap-banners plugins',
			path: 'https://modrinth.com/mod/squaremap-banner',
			tags: ['java', 'Minecraft', 'Fabric', 'Server-side'],
			source: 'https://github.com/FaeWulf/squaremap_banner',
			img: '/images/projects/squaremap-banner.webp',
			old: false
		}
	];

	projects.sort((a: project, b: project) => {
		return a.name.localeCompare(b.name);
	});

	onMount(() => {
		isMounted = true;
	});

</script>

<MetaTags
	title="Projects | Faewulf's Basement"
	description="Faewulf's projects."
	keywords={['faewulf', 'projects', 'list', 'infomation']}
	canonical="https://faewulf.xyz/projects"
/>

<div class="main-wrapper behavior--click-through">
	<Title subtitle="projects" />

	<div class="main__content-wrapper behavior--click-through">
		<div class="container-fixed-size behavior--click-through">
			{#if isMounted}
				{#each projects as project (project)}
					<Entry name={project.name} description={project.description} url={project.path} tags={project.tags}
								 source={project.source} previewImg={project.img} archived={project.old} />
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
