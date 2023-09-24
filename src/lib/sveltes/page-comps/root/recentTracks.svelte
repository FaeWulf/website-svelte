<script lang="ts">
	export let recentTracks: Promise<{ tracks: any; lastUpdate: string }>;
</script>

<div class="tab">
	{#await recentTracks}
		<div>Searching...</div>
	{:then data}
		<div class="title">
			🎵 Recent Added Tracks <br />
			<span style="font-size: 0.7rem;">Last update: {data.lastUpdate}</span>
		</div>
		{#each data.tracks as track (track.ID)}
			<div class="track">
				<div class="name">{track.title}</div>
				<div class="artist">{track.artist}</div>
				<div class="duration">{track.time}</div>
			</div>
		{/each}
	{/await}

	<div class="dummy" />
</div>

<style>
	.tab {
		width: calc(100% - 12px);
		height: calc(100% - 12px);

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		padding: 5px;
		gap: 5px;

		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);

		/*
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
        */
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

	.track {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		padding: 5px;

		border: 1px rgba(var(--Text), 0.2) solid;
		border-radius: 5px;
	}

	.track > .artist {
		font-size: 0.8rem;
		opacity: 0.6;
	}

	.track > .duration {
		position: absolute;
		top: 30%;
		right: 10px;
	}

	.dummy {
		height: 50px;
		flex-basis: 100%;
	}
</style>
