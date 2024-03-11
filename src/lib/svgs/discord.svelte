<script lang="ts">
	export const color = '';
	export let size = 24;
	export let animate = true;
	import IcBaselineDiscord from '~icons/ic/baseline-discord';

	$: style = `width: ${size}px; height: ${size}px;`;
</script>

<div class:animate>
	<IcBaselineDiscord {color} {style} />
</div>

<style lang="scss">
	.animate {
		filter: drop-shadow(-1px -1px 0px #ff1b6b) drop-shadow(1px 1px 0px #ff1b6b) drop-shadow(-1px 1px 0px #ff1b6b) drop-shadow(1px -1px 0px #ff1b6b);
		animation: hue 30s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
	}

	div {
		line-height: 0;

		:global(svg) {
			color: rgba(var(--Base), 255);
		}
		filter: drop-shadow(-1px -1px 0px rgb(var(--Red))) drop-shadow(1px 1px 0px rgb(var(--Yellow))) drop-shadow(-1px 1px 0px rgb(var(--Green)))
			drop-shadow(1px -1px 0px rgb(var(--Blue)));
	}

	@keyframes hue {
		0% {
			filter: drop-shadow(-1px -1px 0px #ff1b6b) drop-shadow(1px 1px 0px #ff1b6b) drop-shadow(-1px 1px 0px #ff1b6b) drop-shadow(1px -1px 0px #ff1b6b);
		}

		25% {
			filter: drop-shadow(-1px -1px 0px #00ff87) drop-shadow(1px 1px 0px #00ff87) drop-shadow(-1px 1px 0px #00ff87) drop-shadow(1px -1px 0px #00ff87);
		}

		50% {
			filter: drop-shadow(-1px -1px 0px #ffff00) drop-shadow(1px 1px 0px #ffff00) drop-shadow(-1px 1px 0px #ffff00) drop-shadow(1px -1px 0px #ffff00);
		}

		75% {
			filter: drop-shadow(-1px -1px 0px #45caff) drop-shadow(1px 1px 0px #45caff) drop-shadow(-1px 1px 0px #45caff) drop-shadow(1px -1px 0px #45caff);
		}

		100% {
			filter: drop-shadow(-1px -1px 0px #ff1b6b) drop-shadow(1px 1px 0px #ff1b6b) drop-shadow(-1px 1px 0px #ff1b6b) drop-shadow(1px -1px 0px #ff1b6b);
		}
	}
</style>
