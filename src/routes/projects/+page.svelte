<script lang="ts">
	import { onMount } from 'svelte';
	import Entry from '$lib/components/projects/entry.svelte';
	import NeonSign from '$lib/components/custom/NeonSign.svelte';

	import ProjectData from '$lib/data/project.json';

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
	let projects: project[] = ProjectData;

	// Sort list a-z
	projects.sort((a: project, b: project) => {
		return a.name.localeCompare(b.name);
	});

	onMount(() => {
		isMounted = true;

		// Get the hash fragment when the component mounts
		let hash = window.location.hash.replace('#', '').replace('%20', ' ');

		// Optionally listen for hash changes
		const handleHashChange = () => {
			hash = window.location.hash;
		};

		//scroll into specific project and focus
		setTimeout(() => {
			let el = document.getElementById(`js-project-${hash}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center'
			});
		}, 200);

		window.addEventListener('hashchange', handleHashChange);

		// Cleanup listener on component destruction
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	});

</script>

<div class="main-wrapper behavior--click-through">
	<NeonSign title="Projects" description="Here is a few projects I've created." />

	<div class="main__content-wrapper behavior--click-through">
		<div class="container-fixed-size behavior--click-through">
				{#each projects as project (project)}
					<Entry name={project.name} description={project.description} url={project.path} tags={project.tags}
								 source={project.source} previewImg={project.img} archived={project.old} />
				{/each}
		</div>
	</div>
</div>

<style lang="scss">
  .main-wrapper {
    height: 100%;
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
    height: 100%;

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
