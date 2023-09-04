<script lang="ts">
	import Badges from './badges.svelte';
	import Description from './description.svelte';
</script>

<h1>👋 I'm <span class="hueText">Faewulf</span></h1>
<Description />
<Badges />

<style>
	h1 {
		font-weight: 600;
	}

	.hueText {
		background: linear-gradient(120deg, #ff1b6b, #45caff, #ff1b6b);
		background-size: 200%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: hue 2s linear infinite;
	}

	@keyframes hue {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 200% 200%;
		}
	}
</style>
