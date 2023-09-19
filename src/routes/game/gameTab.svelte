<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	const games = [
		'dota2',
		'caveblazers',
		'yomihustle',
		'projectzomboid',
		'dwarffortress',
		'risetoruins'
	];

	let gameCardContainer: HTMLElement;
	let forceReset = false;

	//create an interval that add value to games-container.scrollLeft, if scrollLeft == scrollWidth, reset to 0
	let gameCardInterval = setInterval(() => {
		if (!gameCardContainer) return;

		if (forceReset) {
			if (gameCardContainer.scrollLeft != 0) return (gameCardContainer.scrollLeft = 0);
			if (gameCardContainer.scrollLeft == 0) forceReset = false;
		}

		if (
			gameCardContainer.scrollLeft + gameCardContainer.clientWidth >=
			gameCardContainer.scrollWidth
		) {
			gameCardContainer.scrollLeft = 0;
			forceReset = true;
		} else {
			gameCardContainer.scrollLeft += 5;
		}
	}, 100);

	onMount(() => {});

	onDestroy(() => {
		clearInterval(gameCardInterval);
	});

	// recalculate lastGame and nextGame based on currentGame
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

<div class="games-contaier-wrapper">
	<div class="games-container" bind:this={gameCardContainer}>
		{#each games as game}
			<div class="game-card-cover">
				<div class="game-card-wrapper">
					<img class="game-card" src="/images/games/{game}.png" alt={game} />
				</div>
			</div>
		{/each}
	</div>
	<div class="games-description">lmao</div>
</div>

<style>
	.games-contaier-wrapper {
		display: flex;
		width: 100%;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.games-container {
		display: flex;
		width: 100%;
		height: 350px;
		align-items: center;
		overflow-x: auto;
		margin-top: 30px;
		border-top: 1px solid rgba(var(--Text), 0.5);
		border-bottom: 1px solid rgba(var(--Text), 0.5);

		scroll-behavior: smooth;
	}

	.games-description {
		flex: 1;
		width: 100%;
	}

	.game-card {
		position: relative;
		height: 300px;
		width: auto;
		z-index: 1;
	}

	.game-card-cover {
		position: relative;
		width: max-content;
		height: max-content;
		transform-origin: top center;
		perspective: 1000px;

		margin: 10px;

		transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
	}

	.game-card-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
	}

	.game-card-wrapper::after {
		display: block;
		content: '';
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			226deg,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0.2) 20%,
			rgba(255, 255, 255, 0.2) 30%,
			rgba(255, 255, 255, 0) 44%
		);
		will-change: transform;
		transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);
	}

	.game-card-cover:hover .game-card-wrapper::after {
		width: 100%;
		height: 150%;
	}

	.game-card-cover:hover .game-card-wrapper {
		transform: rotateX(10deg) translateY(-6px) scale(1.05);
	}
</style>
