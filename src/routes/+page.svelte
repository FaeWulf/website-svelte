<script lang="ts">
	//comps
	import Logo from './logo.svelte';
	import Badges from './badges.svelte';
	import Description from './description.svelte';
	import Title from './title.svelte';
	import Social from './social.svelte';

	let descriptionChanger = {
		value: 0,
		text: '',
		learner: false
	};

	let titleChanger = '';
</script>

<svelte:head>
	<title>Faewulf's Basement | HQ</title>
	<meta name="description" content="My Bio" />
</svelte:head>

<Logo />
<Title bind:titleChanger />
<Description bind:descriptionChanger />
<Badges bind:descriptionChanger />
<Social bind:titleChanger />
