<script lang="ts">
	export const color = '';
	export let size = 24;
</script>

<svg
	style="width: {size}px; height: {size}px;"
	viewBox="0 0 24 24"
	width="24"
	height="24"
	xmlns="http://www.w3.org/2000/svg"
	fill-rule="evenodd"
	clip-rule="evenodd"
>
	<path
		d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"
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
