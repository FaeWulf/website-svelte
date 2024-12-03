<script lang="ts">
	export const color = '';
	export let size = 24;
	export let animate = true;
	import MdiWeb from '~icons/mdi/web';

	$: style = `width: ${size}px; height: ${size}px;`;
</script>

<div class:animate>
	<MdiWeb {style} />
</div>

<style lang="scss">
	.animate {
    filter: drop-shadow(-1px -1px 0px var(--color-hue-0)) drop-shadow(1px 1px 0px var(--color-hue-0)) drop-shadow(-1px 1px 0px var(--color-hue-0)) drop-shadow(1px -1px 0px var(--color-hue-0));
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
      filter: drop-shadow(-1px -1px 0px var(--color-hue-0)) drop-shadow(1px 1px 0px var(--color-hue-0)) drop-shadow(-1px 1px 0px var(--color-hue-0)) drop-shadow(1px -1px 0px var(--color-hue-0));
		}

		25% {
      filter: drop-shadow(-1px -1px 0px var(--color-hue-1)) drop-shadow(1px 1px 0px var(--color-hue-1)) drop-shadow(-1px 1px 0px var(--color-hue-1)) drop-shadow(1px -1px 0px var(--color-hue-1));
		}

		50% {
      filter: drop-shadow(-1px -1px 0px var(--color-hue-2)) drop-shadow(1px 1px 0px var(--color-hue-2)) drop-shadow(-1px 1px 0px var(--color-hue-2)) drop-shadow(1px -1px 0px var(--color-hue-2));
		}

		75% {
      filter: drop-shadow(-1px -1px 0px var(--color-hue-3)) drop-shadow(1px 1px 0px var(--color-hue-3)) drop-shadow(-1px 1px 0px var(--color-hue-3)) drop-shadow(1px -1px 0px var(--color-hue-3));
		}

		100% {
      filter: drop-shadow(-1px -1px 0px var(--color-hue-0)) drop-shadow(1px 1px 0px var(--color-hue-0)) drop-shadow(-1px 1px 0px var(--color-hue-0)) drop-shadow(1px -1px 0px var(--color-hue-0));
		}
	}
</style>
