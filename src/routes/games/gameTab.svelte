<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

	const games = [
		{
			name: 'Dota 2',
			img: 'dota2',
			description:
				"Very good moba game, complex and very interactive game mechanics, highly recommend. I'm tired of buggy unbalanced LoL.",
			url: 'https://store.steampowered.com/app/570/Dota_2/'
		},
		{
			name: 'Caveblazers',
			img: 'caveblazers',
			description:
				"Caveblazers is a super fun pixelated roguelike platformer. It's easy to pick up. Sadly, the developer has stopped updating it.",
			url: 'https://store.steampowered.com/app/452060/Caveblazers/'
		},
		{
			name: 'Your Only Move Is HUSTLE',
			img: 'yomihustle',
			description: 'Unique turn base "action" game, like chest but... more',
			url: 'https://store.steampowered.com/app/2212330/Your_Only_Move_Is_HUSTLE/'
		},
		{
			name: 'The Binding of Isaac',
			img: 'isaac',
			description: '2d RPG shooter game, but with a twist.',
			url: 'https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/'
		},
		{
			name: 'Barony',
			img: 'barony',
			description: 'A first-person roguelike voxel? game.',
			url: 'https://store.steampowered.com/app/371970/Barony/'
		},
		{
			name: 'Streets of Rogue',
			img: 'streetsofrogue',
			description:
				'A rogue-like dungeon crawler game. Nuclear Throne meets Deus Ex, mixed with the anarchy of GTA. Fun to play. Laugh all the times with friends',
			url: 'https://store.steampowered.com/app/512900/Streets_of_Rogue/'
		},
		{
			name: 'Baba is you',
			img: 'baba',
			description:
				'A puzzle game with rules in the form of blocks, and you can change those rules!',
			url: 'https://store.steampowered.com/app/736260/Baba_Is_You/'
		},
		{
			name: 'Vagante',
			img: 'vagante',
			description: 'A pixel art roguelike game. Decent game mechanic, stick to it for like months.',
			url: 'https://store.steampowered.com/app/323220/Vagante/'
		},
		{
			name: 'Vampire Survival',
			img: 'vampire',
			description:
				'A rogue-lite hack and slash game, with vampires. Hidden elements is what makes it special. But where are vampires? They are in another coffin.',
			url: 'https://store.steampowered.com/app/1794680/Vampire_Survivors/'
		},
		{
			name: 'Superfighters Deluxe',
			img: 'superfighters',
			description: 'A retro-style arcade fighting game with 2D graphics.',
			url: 'https://store.steampowered.com/app/855860/Superfighters_Deluxe/'
		},
		{
			name: 'Wayward',
			img: 'wayward',
			description: 'A turn-based, top-down, wilderness survival roguelike.',
			url: 'https://store.steampowered.com/app/379210/Wayward/'
		},
		{
			name: 'Super Cane Magic ZERO',
			img: 'supercanemagic',
			description: 'Comedy gold andventure RPG game. Get ready for a good laugh!',
			url: 'https://store.steampowered.com/app/336440/Super_Cane_Magic_ZERO__Legend_of_the_Cane_Cane/'
		},
		{
			name: 'Lover in a Dangerous Spacetime',
			img: 'lovers',
			description:
				'A game best enjoyed with friends or family. You absolutely have to give it a try',
			url: 'https://store.steampowered.com/app/252110/Lovers_in_a_Dangerous_Spacetime/'
		},
		{
			name: 'Project Zomboid',
			img: 'projectzomboid',
			description:
				'An ultimate zombie "survival" game with complex machanics, it\'s not just zombies that can get you; everything is a threat!',
			url: 'https://store.steampowered.com/app/108600/Project_Zomboid/'
		},
		{
			name: 'Dwarf Fortress',
			img: 'dwarffortress',
			description:
				" a unique construction and management simulation with roguelike elements. It's incredibly complex, and the original version uses ASCII graphics. Definitely worth checking out!",
			url: 'https://store.steampowered.com/app/975370/Dwarf_Fortress/'
		},
		{
			name: 'Rise to Ruins',
			img: 'risetoruins',
			description:
				'A charming godlike village simulator with pixel art graphics. Have fun building your own little world',
			url: 'https://store.steampowered.com/app/328080/Rise_to_Ruins/'
		}
	];

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
		width: 100%;
		height: fit-content;
		margin-top: 30px;
		border-top: 1px solid rgba(var(--Text), 0.5);
		border-bottom: 1px solid rgba(var(--Text), 0.5);
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
	}

	:global(.splide__slide) {
		display: flex;
		justify-content: center;
	}

	a {
		text-decoration: underline;
	}

	a:hover {
		text-decoration: none;
	}

	.description {
		margin-left: 10px;
		margin-right: 10px;
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
