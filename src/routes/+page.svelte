<script lang="ts">
	import Badges from './badges.svelte';
	import Description from './description.svelte';
	import '../styles/hueText.css';
</script>

<h1>👋 I'm <span class="hueText">Faewulf</span></h1>
<Description />
<Badges />

<style>
	h1 {
		font-weight: 600;
	}
</style>
