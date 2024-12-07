<script>
	import { SquareArrowUp } from 'lucide-svelte';
	import { tooltip } from '$lib/utils.ts';
	import { fly } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	let scrollHeight = 0;
	let clientHeight = 0;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	$: showGotoTop = scrollHeight > clientHeight + 200;
</script>

{#if showGotoTop}
	<button
		transition:fly={{duration: 400, easing: backInOut, y: 0, x: 10}}
		on:click={scrollToTop}
		class="goto-top-button"
		title="Go to top"
		aria-label="Scroll to top"
		use:tooltip={{
			theme: 'catpuccin-light'
		}}>
		<SquareArrowUp size={70} />
	</button
	>
{/if}

<svelte:body bind:scrollHeight />
<svelte:window bind:scrollY={scrollHeight} />

<style lang="scss">
  .goto-top-button {
    position: fixed;
    right: 1rem;
    bottom: 50%;
    cursor: pointer;
    color: rgba(var(--Subtext0));
    transition: all 0.3s ease;
    background: none;
    border: none;
    padding: 0;
    z-index: 999;

    &:hover {
      transform: translateY(-5px) scale(1.1);
    }
  }

  @media (max-width: 720px) {
    .goto-top-button {
      bottom: 1rem;
    }
  }
</style>