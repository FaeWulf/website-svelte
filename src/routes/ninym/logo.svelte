<div class="logo-wrapper">
	<div class="logo-bg" />
	<img draggable="false" class="logo" src="/images/ninym/logo.png" alt="logo" />
</div>

<style lang="scss">
	.logo-wrapper {
		position: relative;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		.logo-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: white;
			border-radius: 50%;
			z-index: -1;
			transform: scale(1);
			filter: blur(15px);

			background: linear-gradient(90deg, #0fffc1, #7e0fff);
			background-size: 200% 200%;

			animation: animateBackground 10s ease infinite;
		}
	}

	img.logo {
		border-radius: 50%;
		width: 200px;
		height: 200px;
	}

	@keyframes animateBackground {
		0% {
			background-position: 0% 50%;
			opacity: 0.8;
			transform: scale(0.9);
		}
		50% {
			background-position: 100% 50%;
			opacity: 0.5;
			transform: scale(1.2);
		}
		100% {
			background-position: 0% 50%;
			opacity: 0.8;
			transform: scale(0.9);
		}
	}
</style>
