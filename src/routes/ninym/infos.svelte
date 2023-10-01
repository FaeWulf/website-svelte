<script lang="ts">
	const features = [
		'Music player',
		'Youtube',
		'Soundcloud',
		'Chat',
		'Minigames',
		'Images search',
		'MoonbaseTTS',
		'Anime search',
		'TTS',
		'Manga search'
	];
</script>

<div class="profile">
	<div class="title">⭐ Features</div>
	{#each features as feature (feature)}
		<div draggable="false" class="feature">{feature}</div>
	{/each}
	<div class="dummy" />
</div>

<style lang="scss">
	.profile {
		display: flex;

		width: calc(100% - 12px);
		height: calc(100% - 12px);

		max-width: 350px;
		max-height: 200px;

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		padding: 5px;
		gap: 5px;

		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		opacity: 0.6;
		transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);

		&:hover {
			opacity: 1;
		}

		.title {
			flex-basis: 100%;
			text-align: center;
			background-color: rgb(var(--Base));
			border: 1px rgba(var(--Text), 0.2) solid;
			border-radius: 5px;
			padding-top: 5px;
			padding-bottom: 5px;
			font-weight: 600;
		}

		.feature {
			box-sizing: border-box;

			border-radius: 5px;
			padding: 5px 10px 5px 10px;
			width: auto;
			height: 28px;

			display: flex;
			justify-content: center;
			align-items: center;

			border: 1px solid rgba(var(--Text), 0.2);
			background: rgba(var(--Overlay0), 0.4);
		}

		.dummy {
			height: 50px;
			flex-basis: 100%;
		}
	}
</style>
