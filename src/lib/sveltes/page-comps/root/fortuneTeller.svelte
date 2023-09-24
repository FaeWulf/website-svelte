<script lang="ts">
	export let fortune: Promise<any>;
</script>

<div class="tab">
	{#await fortune}
		<div>Searching...</div>
	{:then data}
		<div class="title">🔮 Fortune Teller</div>
		<div class="text">{@html data.fortune.replaceAll(/\n/g, '<br />')}</div>
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

	.text {
		width: 100%;
		text-align: left;
	}

	.dummy {
		height: 50px;
		flex-basis: 100%;
	}
</style>
