<script lang="ts">
	import type { boidSpawnOption, boidSettings } from './controller';
	import { S_boidsSettings, S_boidsCount, S_boidChooseOption } from '$lib/store';

	let option: boidSpawnOption = 'none';
	let boidSetting: boidSettings;
	let boidsCount: number;
	let boidsMax: number = 300;

	S_boidsCount.subscribe((value) => {
		boidsCount = value;
	});

	S_boidsSettings.subscribe((value) => {
		boidSetting = value;
	});

	$: S_boidsSettings.set({
		speed: boidSetting.speed,
		visionRadius: boidSetting.visionRadius,
		visionAngle: boidSetting.visionAngle,
		localRadius: boidSetting.localRadius,
		rivalRadius: boidSetting.rivalRadius
	});

	$: S_boidChooseOption.set(option);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container">
	<button on:click={() => console.log($S_boidsSettings)}>lmao</button>
	<div class="component">
		<label for="boids count">Boids: {boidsCount}/{boidsMax}</label>
	</div>
	<div class="component">
		<label for="select">On mouse click: </label>
		<select bind:value={option}>
			<option value="none">None</option>
			<option value="boid">Spawn Boid</option>
			<option value="obstacle">Spawn Obstacle</option>
		</select>
	</div>
	<label for="stats" class="label">Boid setting: </label>
	<div class="component slider">
		<label for="stats">Vision range [{boidSetting.visionRadius}] </label>
		<input type="range" min="5" max="100" bind:value={boidSetting.visionRadius} />
	</div>
	<div class="component slider">
		<label for="stats">Vision angle [{boidSetting.visionAngle}] </label>
		<input type="range" min="10" max="180" bind:value={boidSetting.visionAngle} />
	</div>
	<div class="component slider">
		<label for="stats">Local range [{boidSetting.localRadius}] </label>
		<input type="range" min="5" max="200" bind:value={boidSetting.localRadius} />
	</div>
	<div class="component slider">
		<label for="stats">Rival range [{boidSetting.rivalRadius}] </label>
		<input type="range" min="0" max="200" bind:value={boidSetting.rivalRadius} />
	</div>
</div>

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 10px;

		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 10px;

		font-size: 0.9rem;

		overflow: auto;

		.component {
			width: 100%;
			height: max-content;
			box-sizing: border-box;

			display: flex;
			gap: 10px;
			align-items: center;

			cursor: pointer;

			user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;

			&.slider {
				justify-content: space-around;
			}
		}
	}

	select {
		width: 100px;
	}

	input[type='range'] {
		width: 50%;
	}
</style>
