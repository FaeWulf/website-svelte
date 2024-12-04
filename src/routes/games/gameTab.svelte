<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
	import games from '$lib/data/game.json';

	let gameCardContainerCLientWidth = 0;
	let chosenGame: {
		name: string;
		img: string;
		description: string;
		url: string;
	};

	//dyanmic
	//calculate max item per page (perPage) with gameCardContainer.clientWidth
	$: maxItem = Math.round(gameCardContainerCLientWidth / (213 + 20));
</script>

<div class="games-contaier-wrapper">
	<div class="games-container" bind:clientWidth={gameCardContainerCLientWidth}>
		<Splide
			extensions={{ AutoScroll: AutoScroll }}
			aria-label="My Favorite Games"
			options={{
				type: 'loop',
				rewind: true,
				perPage: maxItem,
				snap: true,
				arrows: false,
				pagination: false,
				wheel: true,
				focus: 'center',
				autoScroll: {
					pauseOnFocus: true,
					pauseOnHover: true
				}
			}}
		>
			{#each games as game}
				<SplideSlide>
					<div
						class="game-card-cover"
						tabindex="-1"
						on:focus={() => {
							chosenGame = game;
						}}
					>
						<div class="game-card-wrapper">
							<img class="game-card" src="/images/games/{game.img}.png" alt={game.name} />
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
	<div class="games-description">
		{#if chosenGame}
			<a href={chosenGame.url}>
				<h1>{chosenGame.name}</h1>
			</a>
			<div class="description">{chosenGame.description}</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.games-contaier-wrapper {
		display: flex;
		width: 100%;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.games-container {
			width: 100%;
			height: fit-content;
			margin-top: 30px;
			border-top: 1px solid rgba(var(--Text), 0.5);
			border-bottom: 1px solid rgba(var(--Text), 0.5);
		}
	}

	.game-card {
		position: relative;
		height: 300px;
		width: auto;
		z-index: 1;
	}

	.games-description {
		flex: 1;
		width: 100%;
		text-align: center;

		.description {
			margin-left: 10px;
			margin-right: 10px;
		}
	}

	:global(.splide__slide) {
		display: flex;
		justify-content: center;
	}

	a {
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}

	.game-card-cover {
		position: relative;
		width: max-content;
		height: max-content;
		transform-origin: top center;
		perspective: 1000px;

		margin: 10px;

		transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);

		.game-card-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			transition: all 0.65s cubic-bezier(0.18, 0.9, 0.58, 1);

			&::after {
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
		}
	}

	.game-card-cover:focus .game-card-wrapper::after,
	.game-card-cover:hover .game-card-wrapper::after {
		width: 100%;
		height: 150%;
	}

	.game-card-cover:focus .game-card-wrapper,
	.game-card-cover:hover .game-card-wrapper {
		transform: rotateX(7deg) translateY(-6px) scale(1.05);
		border: 1px solid rgba(var(--Rosewater), 1);
	}
</style>
