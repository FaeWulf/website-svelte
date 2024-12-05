<script lang="ts">
	import crewmates from '$lib/data/crewmate.json'
	import { onMount } from 'svelte';

	let innerHeight: number, innerWidth: number;

	// Generate random positions ensuring elements start and stay within the screen
	let crewmatesWithAnimation = [];
	let mounted = false;
	onMount(() => {
		crewmatesWithAnimation = crewmates.map(crewmate => ({
			...crewmate,
			rotateSpeed: Math.random() * 30 + 10, // Rotation speed between 5s and 10s
			moveSpeedX: Math.random() * 20 - 10,  // Movement speed between 5s and 15s
			moveSpeedY: Math.random() * 20 - 10,  // Movement speed between 5s and 15s
			startX: Math.random() * (innerWidth - 180),  // X position clamped within screen
			startY: Math.random() * (innerHeight - 180), // Y position clamped within screen
		}));

		//
		// let lastTime = 0;
		// function update(time: number) {
		// 	const deltaTime = (time - lastTime) / 1000; // Convert to seconds
		// 	lastTime = time;
		//
		// 	crewmatesWithAnimation.forEach(crewmate => {
		//
		// 		console.log(crewmate.startY)
		//
		// 		if (crewmate.startX < 0) crewmate.startX = innerWidth;
		// 		if (crewmate.startX > innerWidth) crewmate.startX = 0;
		//
		// 		if (crewmate.startY < 0) crewmate.startY = innerHeight;
		// 		if (crewmate.startY > innerHeight) crewmate.startY = 0;
		//
		// 		crewmate.startX += crewmate.moveSpeedX * deltaTime;
		// 		crewmate.startY += crewmate.moveSpeedY * deltaTime;
		// 	})
		// 	crewmatesWithAnimation = crewmatesWithAnimation
		// 	requestAnimationFrame(update);
		// }
		//
		// requestAnimationFrame(update);

		mounted = true;
	})

</script>


<svelte:window bind:innerHeight bind:innerWidth />

<div class="background">
	{#if mounted}
	{#each crewmatesWithAnimation as crewmate, index (crewmate)}
			<div class="background__image-wrapper behavior--no-select" draggable="false"
					 style="
					 animation-duration: {crewmate.rotateSpeed}s;
					 animation-direction: {Math.random() < 0.5 ? "reverse" : "none"};
					 top: {crewmate.startY}px;
					 left: {crewmate.startX}px;"
			>
				<img
					class="background__image"
					draggable="false"
					src="/images/amogus/crewmate_sprites.webp"
					alt="crewmate {index}"
					style="width: {crewmate.width}px; height: {crewmate.height}px; object-position: {crewmate.x}px {crewmate.y}px;"
				/>
			</div>

		{/each}
	{/if}
</div>

<style lang="scss">

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;

		overflow: hidden;

		z-index: -1;
		.background__image-wrapper {
			position: absolute;

			animation-name: image-rotate;
			animation-iteration-count: infinite;
			animation-timing-function: linear;

			.background__image {
        object-fit: none;
        filter: drop-shadow(0 0 1rem rgba(black, 0.2)) brightness(0.5);
			}
		}
	}

  @keyframes image-rotate {
    0% { transform: rotate(0deg) scale(0.3); }
    100% { transform: rotate(360deg) scale(0.3); }
  }

</style>
