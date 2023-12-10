<script lang="ts">
	export let windowToggle: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		windowToggle = !windowToggle;
	}}
>
	<svg
		class:on={windowToggle}
		class:off={!windowToggle}
		fill="#000000"
		width="800px"
		height="800px"
		viewBox="0 0 32 32"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>alt-console-1</title>
		<path
			d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-18.016h24v18.016q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM4 4q0-0.832 0.576-1.408t1.44-0.576 1.408 0.576 0.576 1.408-0.576 1.44-1.408 0.576-1.44-0.576-0.576-1.44zM12 18.016h2.016v-2.016h-2.016v2.016zM12 14.016h2.016v-2.016h-2.016v2.016zM14.016 16h1.984v-1.984h-1.984v1.984zM16 20h4v-1.984h-4v1.984z"
		/>
	</svg>
</div>

<style lang="scss">
	div {
		margin: 0;
		padding: 0;
		line-height: 0;
	}

	svg {
		width: 20px;
		height: 20px;
		margin: 0;
		padding: 0;

		cursor: pointer;

		&.on {
			fill: rgb(var(--Green));
			animation: flip 0.5s ease-out;
			animation-fill-mode: forwards;
		}

		&.off {
			fill: rgb(var(--Yellow));
			animation: reverseflip 0.5s ease-out;
			animation-fill-mode: forwards;
		}
	}

	@keyframes flip {
		0% {
			transform: rotateY(360deg);
		}

		100% {
			transform: rotateY(180deg);
		}
	}

	@keyframes reverseflip {
		0% {
			transform: rotateY(180deg);
		}

		100% {
			transform: rotateY(360deg);
		}
	}
</style>
