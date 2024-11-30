<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import { boids } from './boids';
	import { obstacle } from './obstacle';
	import Quadtree from '@timohausmann/quadtree-js';
	import type { boidSettings } from './controller';
	import { rulesHandler } from './scripts/rulesHandler';

	import {
		S_boidBorder,
		S_boidChooseOption,
		S_boidResetSignal,
		S_boidsCount,
		S_boidsSettings,
		S_boidsType
	} from '$lib/store';

	let view: HTMLCanvasElement;
	let app: PIXI.Application;
	let boidSetting: boidSettings;
	let boidTotalType = 1;
	let boidBorder = false;
	let onFirstLoad = true;

	let elementList: boids[] = [];
	let elementQuadTree: Quadtree;

	$: S_boidsCount.set(elementList.length);

	S_boidBorder.subscribe((value) => {
		boidBorder = value;
	});

	S_boidsType.subscribe((value) => {
		boidTotalType = value;
	});

	S_boidsSettings.subscribe((value) => {
		boidSetting = value;

		elementList.forEach((element) => {
			element.visionRadius = boidSetting.visionRadius;
			element.visionAngle = boidSetting.visionAngle;
			element.localRadius = boidSetting.localRadius;
			element.rivalRadius = boidSetting.rivalRadius;
			element.flockRadius = boidSetting.flockRadius;
		});
	});

	function visibilitychange() {
		let onFocus = document.visibilityState;
		if (onFirstLoad || onFocus == 'visible') {
			onFirstLoad = false;
			app.start();
		} else app.stop();
	}

	onMount(() => {

		document.removeEventListener('visibilitychange', visibilitychange);
		document.addEventListener('visibilitychange', visibilitychange);

		app = new PIXI.Application({
			view: view,
			resizeTo: document.body,
			backgroundColor: 0x141414
		});

		elementQuadTree = new Quadtree(
			{
				x: 0,
				y: 0,
				width: app.view.width,
				height: app.view.height
			},
			5
		);

		let obstacleList: obstacle[] = [];

		app.stage.hitArea = new PIXI.Rectangle(0, 0, view.width, view.height);
		app.stage.eventMode = 'static';

		/*
		const count = new PIXI.Text(elementList.objects.length, {
			fontFamily: 'Arial',
			fontSize: 20,
			fill: 0xff1010,
			align: 'center'
		});

		count.x = 10;
		count.y = 10;

		app.stage.addChild(count);
		*/
		const color = [0xffffff, 0xff1010, 0x10ff10, 0xff10ff];

		app.stage.on('pointertap', (event) => {
			switch ($S_boidChooseOption) {
				case 'boid': {
					let element = new boids(
						event.global.x,
						event.global.y,
						Math.random() * 1 + 0.5,
						Math.random() * 360,
						view.width,
						view.height,
						1
					);

					elementList = [...elementList, element];
					elementQuadTree.insert(element);
					element.boidType = Math.floor(Math.random() * boidTotalType);
					element.setColor(color[element.boidType]);
					app.stage.addChild(element.element);

					break;
				}
				case 'obstacle': {
					let obs = new obstacle(event.global.x, event.global.y, 50);
					app.stage.addChild(obs.element);
					obstacleList.push(obs);
					break;
				}
			}
		});

		let boidCount = 400;
		for (let i = 0; i < boidCount; i++) {
			let element = new boids(
				Math.random() * view.width,
				Math.random() * view.height,
				Math.random() * 0.5 + 1,
				Math.random() * 360,
				view.width,
				view.height,
				1
			);

			elementList = [...elementList, element];
			elementQuadTree.insert(element);

			element.boidType = Math.floor(Math.random() * boidTotalType);
			element.setColor(color[element.boidType]);
			app.stage.addChild(element.element);
			//app.stage.addChild(element.debugText);
		}

		//on reset
		S_boidResetSignal.subscribe(() => {
			//clear old datas
			for (let i = 0; i < elementList.length; i++) {
				app.stage.removeChild(elementList[i].element);
				//app.stage.removeChild(elementList[i].debugText);
			}

			//insert new
			elementList = [];
			elementQuadTree.clear();

			for (let i = 0; i < boidCount; i++) {
				let element = new boids(
					Math.random() * view.width,
					Math.random() * view.height,
					Math.random() * 0.5 + 1,
					Math.random() * 360,
					view.width,
					view.height,
					1
				);

				elementList = [...elementList, element];
				elementQuadTree.insert(element);

				element.boidType = Math.floor(Math.random() * boidTotalType);
				element.setColor(color[element.boidType]);
				app.stage.addChild(element.element);
				//app.stage.addChild(element.debugText);
			}
		});

		// Listen for animate update
		app.ticker.add((delta) => {
			rulesHandler(elementList, elementQuadTree, obstacleList, delta, boidBorder);
		});
	});

	onDestroy(() => {
		app?.destroy();

		//document.removeEventListener('visibilitychange', visibilitychange);
	});
</script>

<canvas bind:this={view} />

<style lang="scss">
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
</style>
