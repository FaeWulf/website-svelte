<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	export let title: string = '';
	export let description: string = '';
	export let keywords: string[] = [];
	export let canonical: string = '';
	export let img: string = 'https://faewulf.xyz/og.webp';
</script>

<svelte:head>
	<MetaTags
		title={title}
		description={description}
		keywords={keywords}
		canonical={canonical}
		openGraph={{
    	url: canonical,
    	title,
    	description,
    	siteName: 'Faewulf\'s Basement',
    	images: [
				{ url: img },
      	{ url: 'https://faewulf.xyz/og.png' }
    	]
  	}}
		twitter={{
    	title,
    	description,
    	image: img
  }}
	/>
</svelte:head>
