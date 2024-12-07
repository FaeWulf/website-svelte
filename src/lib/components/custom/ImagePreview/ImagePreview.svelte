<script>
	import { img_preview } from '$lib/store';

	// Function to open fullscreen preview
	const openFullscreen = (event) => {
		img_preview.set(event.target.src);
	};
</script>

<div style="cursor: pointer;" on:click={openFullscreen}>
	<slot></slot>
</div>