<script lang="ts">
	export let subtitle = '';
</script>

<h1>
	<span class="hueText">Faewulf</span>
	<p>{subtitle}</p>
</h1>

<style>
	h1 {
		position: relative;

		display: flex;
		font-weight: 600;
		width: fit-content;
		align-items: flex-end;

		margin: 30px;
		margin-bottom: 20px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		font-family: 'Daydream', 'Tahoma';

		border: 5px solid rgba(255, 255, 255, 1);
		border-radius: 1rem;

		padding: 15px;
		animation: flicker 3s infinite alternate;
	}

	p {
		position: absolute;
		bottom: 0;
		right: 0;
		font-weight: 600;
		font-size: 2rem;
		line-height: 1.5rem;
		margin: 0;

		text-align: center;

		font-family: 'handwrite', 'Tahoma';

		transform: translate(30%, 70%) rotateZ(-15deg);

		color: white;
		-webkit-text-stroke: 1px magenta;

		text-shadow: -0.2rem -0.2rem 1rem rgba(255, 0, 255, 0.7),
			0.2rem 0.2rem 1rem rgba(255, 0, 255, 0.7), 0 0 2rem rgba(var(--Mauve), 1),
			0 0 4rem rgba(var(--Mauve), 1), 0 0 8rem rgba(var(--Mauve), 1);

		-webkit-text-stroke: 1px rgba(magenta, 0.5);

		animation: subtext 3s infinite alternate;
	}

	@keyframes subtext {
		40% {
			opacity: 0.8;
		}
		42% {
			opacity: 0.6;
		}
		43% {
			opacity: 0.8;
		}
		45% {
			opacity: 0.4;
		}
		46% {
			opacity: 0.8;
		}
	}

	@keyframes flicker {
		0%,
		19%,
		21%,
		100% {
			box-shadow: 0 0 10px #e4f1ffaa, inset 0 0 10px rgb(148, 0, 255),
				inset 0 0 2rem rgba(174, 210, 255, 0.5), inset 0 0 1rem rgba(39, 0, 93, 0.2),
				0 0 2rem rgba(39, 0, 93, 0.6), 0 0 8rem rgba(148, 0, 255, 0.5);

			-webkit-text-stroke: 1px rgba(var(--Blue), 0.5);
		}

		20% {
			box-shadow: none;
			-webkit-text-stroke: 1px #0009;
		}
	}

	@media (max-width: 720px) {
		p {
			font-size: 1.2rem;
			line-height: 1.2rem;
		}
	}
</style>
