<script lang="ts">
	import { apiURL } from '$lib/store';
	import { tooltip } from '$lib/utils';
	import 'tippy.js/animations/scale.css';

	const api = $apiURL;
	export let url = api + '/api/v1/misc/bonsai?time=40&width=500&height=500&background=0';

	let scr = '';
	function restart() {
		//generate random string to refresh img load
		scr = new Date().getTime().toString();
	}

	/*
	onMount(() => {
		collideCheck();
		window.addEventListener('resize', () => collideCheck());

		function collideCheck() {
			const mainTab = document.getElementById('main')?.getBoundingClientRect();
			const bonsaiTabRect = bonsaiTab.getBoundingClientRect();

			if (mainTab) {
				const collision =
					mainTab.left < bonsaiTabRect.right &&
					mainTab.right > bonsaiTabRect.left &&
					mainTab.top < bonsaiTabRect.bottom &&
					mainTab.bottom > bonsaiTabRect.top;
				//console.log('Collision:', collision);
			}
		}
	});
	*/
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
	src={url + '&' + scr}
	draggable="false"
	alt="bonsai"
	on:click={restart}
	use:tooltip={{
		content: 'Click to grow another bonsai!',
		theme: 'catppuccin',
		animation: 'scale',
		offset: [0, 40]
	}}
/>

<style>
	img {
		display: block;
		width: 100%;
		height: 100%;
		cursor: pointer;
		min-width: 150px;

		user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
