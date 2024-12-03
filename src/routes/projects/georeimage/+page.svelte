<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let desinationCanvas: HTMLCanvasElement;

	let tempCanvas: HTMLCanvasElement;
	let canvas4Calculation: HTMLCanvasElement;

	onMount(async () => {
		let ctx = canvas.getContext('2d');

		tempCanvas = document.createElement('canvas');
		canvas4Calculation = document.createElement('canvas');

		let tempCtx = tempCanvas.getContext('2d')!,
			canvas4CalculationCtx = canvas4Calculation.getContext('2d')!;

		//place older width/height
		tempCtx.canvas.width = 100;
		tempCtx.canvas.height = 100;
		canvas4CalculationCtx.canvas.width = 100;
		canvas4CalculationCtx.canvas.height = 100;

		ctxDrawRect(tempCtx, 0, 0, 10, 10, 'red', 0);
	});

	function debug() {
		//create a canvas with width and height based on the image input

		//this is width height of the source image
		const width = 100;
		const height = 100;

		const step = 1000;
		// size of the object list which uses on hill climbing
		const objectListSize = 100;
		//in each step, insert an object into destnation canvas, the object is choosen based on hill climbing algorithm
		for (let i = 0; i < step; i++) {
			const objectList: {
				shape: string;
				sizeX: number;
				sizeY: number;
				degree: number;
				score: number | undefined;
			}[] = [];

			//create a random point on source image for hill climbing
			const randomX = Math.random() * width;
			const randomY = Math.random() * height;

			//generate object list
			for (let j = 0; j < objectListSize; j++) {
				objectList.push({
					shape: 'rect',
					sizeX: Math.random() * width,
					sizeY: Math.random() * height,
					degree: Math.random() * 360,
					score: undefined
				});
			}

			//with each object, draw the object on cloned destination canvas
			//Then calculate the score (difference between source image and cloned destination canvas)
			//Then choose top k objects with lowest score and insert on chosen object list

			//object loop
			for (let j = 0; j < objectListSize; j++) {
				let canvas4CalculationCtx = canvas4Calculation.getContext('2d');

				let currentObject = objectList[j];

				if (canvas4CalculationCtx) {
					//clone destination canvas into canvas4Calculation
					canvas4CalculationCtx.drawImage(desinationCanvas, 0, 0);

					//get most common color from source image
					const mostCommonColor = getMostCommonColor(canvas.getContext('2d'), randomX, randomY, currentObject.sizeX, currentObject.sizeY);

					if (mostCommonColor) {
						//draw object into canvas4Calculation
						ctxDrawRectFromCenter(
							canvas4CalculationCtx,
							objectList[j].sizeX,
							objectList[j].sizeY,
							objectList[j].sizeX,
							objectList[j].sizeY,
							mostCommonColor,
							objectList[j].degree
						);
					}

					//calculate score
					let canvasImageData = canvas.getContext('2d')?.getImageData(0, 0, 100, 100);
					let canvas4CalculationImageData = canvas4CalculationCtx.getImageData(0, 0, 100, 100);
					let score = customCalculateMSE(canvasImageData, canvas4CalculationImageData);
					objectList[j].score = score;
				}
			}

			let chosenObjectList: {
				shape: string;
				sizeX: number;
				sizeY: number;
				degree: number;
				score: number | undefined;
			}[] = [];

			//By using chosen object list, generate object list based on that object list

			//then do the hill climbing again, with the new object list

			//with each object, draw the object on cloned destination canvas
			//Then calculate the score (difference between source image and cloned destination canvas)
			//then choose the object with the lowest score (draw it on destination canvas)
		}
	}

	//this method will draw rectangle from center rather than top left, use method ctxDrawRect
	function ctxDrawRectFromCenter(
		ctx: CanvasRenderingContext2D | null,
		x: number,
		y: number,
		width: number,
		height: number,
		color: string,
		degress: number
	) {
		if (!ctx) return;

		ctxDrawRect(ctx, x - width / 2, y - height / 2, width, height, color, degress);
	}

	//this method will draw rectangle from default top left
	function ctxDrawRect(ctx: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, color: string, degrees: number) {
		if (!ctx) return;

		ctx.beginPath();
		//rorate in rectange's center

		//translate to center of the rect
		ctx.translate(x + width / 2, y + height / 2);
		ctx.rotate((degrees * Math.PI) / 180);

		//draw rect, because translated and roateed at center of the shape, then rect 0,0 point should be at -width / 2; - height / 2
		ctx.rect(-width / 2, -height / 2, width, height);

		//fill color
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}

	//this method will return the most common color based on location and size of the location
	function getMostCommonColor(ctx: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number) {
		if (!ctx) return;

		const imageData = ctx.getImageData(x, y, width, height);
		let color = '';

		//color list
		let colorList: { color: string; count: number }[] = [];

		for (let i = 0; i < imageData.data.length; i += 4) {
			const r = imageData.data[i];
			const g = imageData.data[i + 1];
			const b = imageData.data[i + 2];

			//convert to rgb
			const color = `rgb(${r}, ${g}, ${b})`;

			//insert to list if not exist, if exist increase count
			if (!colorList.find((c) => c.color == color)) {
				colorList.push({
					color,
					count: 1
				});
			} else {
				const colorFromList = colorList.find((c) => c.color == color)!;
				colorFromList.count++;
			}
		}

		//then choose the most common color
		colorList.sort((a, b) => b.count - a.count);
		color = colorList[0].color;

		//return color
		return color;
	}

	//difference between two image using mean squared error
	//https://en.wikipedia.org/wiki/Mean_squared_error
	function calculateMSE(imgData1: ImageData, imgData2: ImageData) {
		var data1 = imgData1.data;
		var data2 = imgData2.data;
		var sumSquaredDiff = 0;

		for (var i = 0; i < data1.length; i += 4) {
			var diffR = data1[i] - data2[i];
			var diffG = data1[i + 1] - data2[i + 1];
			var diffB = data1[i + 2] - data2[i + 2];

			sumSquaredDiff += diffR * diffR + diffG * diffG + diffB * diffB;
		}

		var mse = sumSquaredDiff / (imgData1.width * imgData1.height);
		return mse;
	}

	//difference between two image using difference between pixels
	function customCalculateMSE(imgData1: ImageData | undefined, imgData2: ImageData | undefined) {
		if (!imgData1 || !imgData2) {
			return -1;
		}

		var data1 = imgData1.data;
		var data2 = imgData2.data;

		var result = 0;

		for (var i = 0; i < data1.length; i += 4) {
			var diffR = data1[i] - data2[i];
			var diffG = data1[i + 1] - data2[i + 1];
			var diffB = data1[i + 2] - data2[i + 2];

			result += Math.abs(diffR) + Math.abs(diffG) + Math.abs(diffB);
		}

		return result;
	}
</script>

<svelte:head>
	<title>Faewulf's Basement | GeoReimage</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main-wrapper">
	<input type="file" id="inputImage" accept="image/*" />
	<canvas id="workflow" bind:this={canvas}></canvas>

	<button on:click={debug}>Debug</button>
</div>

<style lang="scss">
  .main-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border: 1px solid var(--color-border-0);
    background-color: rgba(var(--Crust), 1);

    z-index: 5;

    //backdrop-filter: blur(2px);
    //-webkit-backdrop-filter: blur(2px);
  }
</style>
