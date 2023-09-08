<script lang="ts">
</script>

<div class="logo-wrapper">
	<div class="logo-bg" />
	<div class="orbit">
		<div
			style="top:-60px; width:25px; height:25px; background:rgba(var(--Surface1), 0.4); border-radius:50%; border:1px solid rgba(var(--Text), 0.2)"
			class="satellite"
		>
			<div
				style="top:-30px; width:10px; height:10px; background:rgba(var(--Text), 0.4); border-radius:50%"
				class="satellite"
			/>
		</div>
	</div>
	<!--div class="orbit2">
		<div
			style="left: 350px; top:0px; width:45px; height:45px; background:rgba(var(--Overlay0), 0.4); border-radius:50%; border:1px solid rgba(var(--Text), 0.2)"
			class="satellite"
		/>
	</div-->
	<img draggable="false" class="logo" src="/logo.jpg" alt="logo" />
</div>

<style>
	.logo-wrapper {
		position: relative;
	}

	img.logo {
		border-radius: 50%;
		width: 200px;
		height: 200px;
	}

	.logo-wrapper .logo-bg {
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

	.orbit {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: -1;

		animation: orbit-rotate 60s linear infinite;
	}

	/*
	.orbit2 {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: -1;

		animation: orbit-rotate 360s linear infinite;
	}
    */

	.satellite {
		position: absolute;
		animation: orbit-rotate 5s linear infinite;
	}

	@keyframes orbit-rotate {
		100% {
			transform: rotate(360deg);
		}
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
