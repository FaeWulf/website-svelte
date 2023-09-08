<script lang="ts">
	export const color = '';
	export let size = 24;
</script>

<svg
	style="width: {size}px; height: {size}px"
	viewBox="0 0 24 24"
	width="24"
	height="24"
	xmlns="http://www.w3.org/2000/svg"
	fill-rule="evenodd"
	clip-rule="evenodd"
	>discord
	<path
		d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z"
	/>
</svg>

<style>
	svg {
		background: linear-gradient(120deg, #ff1b6b, #45caff, #ff1b6b);
		-webkit-mask-image: linear-gradient(black, black);
		mask-image: linear-gradient (transparent, transparent);
		border: 50%;
		fill: rgba(var(--Base), 255);
		background-size: 200%;
		animation: hue 10s linear infinite;
		border-radius: 60%;
		border: 2px solid rgba(var(--Text), 0.2);

		transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
</style>
