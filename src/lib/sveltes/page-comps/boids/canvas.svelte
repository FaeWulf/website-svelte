<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';

	let view: HTMLCanvasElement;

	class boids {
		public element: PIXI.Graphics;
		private speed: number;
		private angle: number;
		private minX: number;
		private maxX: number;
		private minY: number;
		private maxY: number;

		constructor(speed: number, angle: number, width: number, height: number) {
			this.element = new PIXI.Graphics();
			this.element.beginFill(0xffffff);
			this.element.drawPolygon(0, -20, -10, 20, 10, 20);
			this.element.endFill();

			this.element.scale.set(0.3);

			this.speed = speed;
			this.angle = angle;

			this.minX = 0;
			this.minY = 0;
			this.maxX = width;
			this.maxY = height;
		}

		public setAngle(angle: number) {
			angle = angle % 360;
			this.angle = angle;
			this.element.angle = angle;
		}

		public getAngle() {
			return this.angle;
		}

		public setSandBox(width: number, height: number) {
			this.minX = 0;
			this.maxX = width;
			this.minY = 0;
			this.maxY = height;
		}

		public update() {
			this.element.x += Math.sin(this.angle * (Math.PI / 180)) * this.speed;
			this.element.y += -Math.cos(this.angle * (Math.PI / 180)) * this.speed;

			if (this.element.x < this.minX) this.element.x = this.maxX;
			if (this.element.x > this.maxX) this.element.x = this.minX;
			if (this.element.y < this.minY) this.element.y = this.maxY;
			if (this.element.y > this.maxY) this.element.y = this.minY;
		}
	}

	onMount(() => {
		const app = new PIXI.Application({
			view: view,
			resizeTo: document.body,
			backgroundColor: 0x141414
		});

		let elementList: boids[] = [];

		let boidCount = 100;
		for (let i = 0; i < boidCount; i++) {
			let element = new boids(Math.random() * 1 + 1, Math.random() * 360,  view.width, view.height);
			element.element.x = Math.random() * view.width;
			element.element.y = Math.random() * view.height;
			elementList.push(element);

			app.stage.addChild(element.element);
		}

		// Listen for animate update
		app.ticker.add((delta) => {
			// delta is 1 if running at 100% performance

			for (let i = 0; i < elementList.length; i++) {
				let angle = elementList[i].getAngle() + delta * (Math.random() * 10 - 5);
				elementList[i].setAngle(angle);
				elementList[i].update();
			}
		});
	});
</script>

<canvas bind:this={view} />

<style lang="scss">
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
