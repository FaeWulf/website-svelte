<script lang="ts">
	export const color = '';
	export let size = 24;
	export let animate = true;
</script>

<svg
	style="width: {size}px; height: {size}px"
	viewBox="0 0 24 24"
	width="24"
	height="24"
	class:animate
	xmlns="http://www.w3.org/2000/svg"
	fill-rule="evenodd"
	clip-rule="evenodd"
	>discord
	<path
		d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
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
		border-radius: 60%;
		border: 2px solid rgba(var(--Text), 0.2);

		transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.animate {
		animation: hue 10s linear infinite;
	}
</style>
