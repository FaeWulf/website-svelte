<script lang="ts">
	(function () {
		var requestAnimationFrame = window.requestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
	})();

	var background = <HTMLCanvasElement>document.getElementById('background'),
		bgCtx = background?.getContext('2d')!,
		width = window.innerWidth,
		height = window.innerHeight;
	background.width = width;
	background.height = height;

	//define some oops shit
	interface bgItem {
		x: number;
		y: number;
		size: number;
		speed: number;

		reset(): any;
		update(): any;
	}

	class Star implements bgItem {
		x: number;
		y: number;
		size: number;
		speed: number;

		constructor(options: { x: number; y: number }) {
			this.size = Math.random() * 2;
			this.speed = Math.random() * 0.05;
			this.x = options.x;
			this.y = options.y;
		}

		reset() {
			this.size = Math.random() * 2;
			this.speed = Math.random() * 0.05;
			this.x = width;
			this.y = Math.random() * height;
		}

		update() {
			this.x -= this.speed;
			if (this.x < 0) {
				this.reset();
			} else {
				bgCtx.fillRect(this.x, this.y, this.size, this.size);
			}
		}
	}

	function ShootingStar(this: any) {
		this.reset();
	}

	ShootingStar.prototype.reset = function () {
		this.x = Math.random() * width;
		this.y = 0;
		this.len = Math.random() * 80 + 10;
		this.speed = Math.random() * 10 + 6;
		this.size = Math.random() * 1 + 0.1;

		// shooting start delay
		this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
		this.active = false;
	};

	ShootingStar.prototype.update = function () {
		if (this.active) {
			this.x -= this.speed;
			this.y += this.speed;
			if (this.x < 0 || this.y >= height) {
				this.reset();
			} else {
				bgCtx.lineWidth = this.size;
				bgCtx.beginPath();
				bgCtx.moveTo(this.x, this.y);
				bgCtx.lineTo(this.x + this.len, this.y - this.len);
				bgCtx.stroke();
			}
		} else {
			if (this.waitTime < new Date().getTime()) {
				this.active = true;
			}
		}
	};

	let entities: any[] = [];

	// init the stars
	for (var i = 0; i < height / 2; i++) {
		entities.push(
			new Star({
				x: Math.random() * width,
				y: Math.random() * height
			})
		);
	}

	// Add 2 shooting stars that just cycle.
	entities.push(new ShootingStar());
	entities.push(new ShootingStar());

	//animate background
	function animate() {
		bgCtx.fillStyle = '#110E19AA';
		bgCtx.clearRect(0, 0, width, height);
		bgCtx.fillStyle = '#ffffff';
		bgCtx.strokeStyle = '#ffffff';

		var entLen = entities.length;

		while (entLen--) {
			entities[entLen].update();
		}
		requestAnimationFrame(animate);
	}

	animate();
</script>

<canvas id="background" />

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
