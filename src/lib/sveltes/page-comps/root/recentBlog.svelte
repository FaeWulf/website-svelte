<script lang="ts">
	export let blogs: Promise<{ name: string; date: Date }[]>;
</script>

<div class="tab">
	<div class="title">📝 Recent blog</div>
	{#await blogs}
		Loading...
	{:then data}
		{#each data as blog (blog.name)}
			<a class="post" href="/blog/{blog.name.replaceAll(' ', '-')}">
				<div class="name">{blog.name}</div>
				<div class="date">
					{blog.date.toLocaleDateString('en-us', {
						weekday: 'long',
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</div>
			</a>
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

	.post {
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
		color: rgb(var(--Text));
		text-decoration: none;
	}

	.post > .date {
		font-size: 0.8rem;
		opacity: 0.6;
	}

	.dummy {
		height: 50px;
		flex-basis: 100%;
	}
</style>
