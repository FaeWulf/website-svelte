<script lang="ts">
	//some main styles
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/dist/border.css';
	import '../styles/hueText.css';

	//comps
	import Logo from './logo.svelte';
	import Badges from './badges.svelte';
	import Description from './description.svelte';
	import Title from './title.svelte';
	import Social from './social.svelte';
	import Bonsai from './bonsai.svelte';
</script>

<svelte:head>
	<title>Home Page</title>
	<meta name="description" content="My Bio" />
</svelte:head>

<Logo />
<Title />
<Description />
<Badges />
<Social />
<Bonsai />
