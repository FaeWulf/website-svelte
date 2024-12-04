<script lang="ts">
	import type { boidSettings, boidSpawnOption } from './controller';
	import {
		S_boidBorder,
		S_boidChooseOption,
		S_boidResetSignal,
		S_boidsCount,
		S_boidsSettings,
		S_boidsType
	} from '$lib/store';
	import { tooltip } from '$lib/utils';

	let option: boidSpawnOption = 'none';
	let boidSetting: boidSettings;
	let boidsCount: number;
	let boidsMax: number = 300;
	let boidTypes: number;
	let boidBorder: boolean;

	S_boidsCount.subscribe((value) => {
		boidsCount = value;
	});

	S_boidBorder.subscribe((value) => {
		boidBorder = value;
	});

	S_boidsType.subscribe((value) => {
		boidTypes = value;
	});

	S_boidsSettings.subscribe((value) => {
		boidSetting = value;
	});

	$: S_boidsSettings.set({
		speed: boidSetting.speed,
		visionRadius: boidSetting.visionRadius,
		visionAngle: boidSetting.visionAngle,
		localRadius: boidSetting.localRadius,
		rivalRadius: boidSetting.rivalRadius,
		flockRadius: boidSetting.flockRadius
	});

	$: S_boidChooseOption.set(option);
	$: S_boidsType.set(boidTypes);
	$: S_boidBorder.set(boidBorder);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="main__content-wrapper">
	<button on:click={() => S_boidResetSignal.set(!$S_boidResetSignal)}>Reset</button>
	<div class="component">
		<label for="boids count">Boids: {boidsCount}</label>
	</div>
	<div class="component">
		<label for="select">On mouse click: </label>
		<select bind:value={option}>
			<option value="none">None</option>
			<option value="boid">Spawn Boid</option>
			<option value="obstacle">Spawn Obstacle</option>
		</select>
	</div>
	<div
		class="component"
		use:tooltip={{
			content: 'Should boids avoid border or not? Very buggy, sorry...',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">No border (very buggy) </label>
		<input type="checkbox" bind:checked={boidBorder} />
	</div>
	<div class="component slider">
		<label for="stats">Boid types [{boidTypes}] </label>
		<input type="range" min="1" max="4" bind:value={boidTypes} />
	</div>
	<label for="stats" class="label">Boid setting: </label>
	<div
		class="component slider"
		use:tooltip={{
			content:
				'Circular vision that boid can see, if = 0 then it ignores rule 1: "Separation: boids move away from other boids that are too close."',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">Vision range [{boidSetting.visionRadius}] </label>
		<input type="range" min="5" max="100" bind:value={boidSetting.visionRadius} />
	</div>
	<div
		class="component slider"
		use:tooltip={{
			content: 'Vision angle, (angle) per side (left and right)',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">Vision angle [{boidSetting.visionAngle}] </label>
		<input type="range" min="10" max="180" bind:value={boidSetting.visionAngle} />
	</div>
	<div
		class="component slider"
		use:tooltip={{
			content:
				'Circular range that boid use to check other boids with same type, if = 0 then it ignores rule 2: "Alignment: boids attempt to match the velocities, directions of their neighbors."',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">Local range [{boidSetting.localRadius}] </label>
		<input type="range" min="0" max="400" bind:value={boidSetting.localRadius} />
	</div>
	<div
		class="component slider"
		use:tooltip={{
			content:
				'Circular range that boid use to check other differcent type boids, if = 0 then it ignores rule: "avoid different type boids"',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">Rival range [{boidSetting.rivalRadius}] </label>
		<input type="range" min="0" max="200" bind:value={boidSetting.rivalRadius} />
	</div>
	<div
		class="component slider"
		use:tooltip={{
			content:
				'Circular range use to check nearby same type boids for rule 3, if = 0 then it ignores rule 3: "Cohesion: boids move toward the center of mass of their neighbors"',
			theme: 'catppuccin',
			animation: 'scale'
		}}
	>
		<label for="stats">Flock range [{boidSetting.flockRadius}] </label>
		<input type="range" min="0" max="400" bind:value={boidSetting.flockRadius} />
	</div>
</div>

<style lang="scss">
  .main__content-wrapper {
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
