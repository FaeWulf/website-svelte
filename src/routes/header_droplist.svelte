<script lang="ts">
	const pages = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'About',
			url: '/about'
		}
	];
</script>

<div id="dropDownList" class="nav-dropdown">
	{#each pages as page (page.name)}
		<a class="nav-dropdown-item" href={page.url}>{page.name}</a>
	{/each}
</div>

<style>
	.nav-dropdown {
		display: none;
		max-width: 350px;
		width: 100vw;
		flex-wrap: wrap;
		flex-direction: column;
		padding: 3px;
	}

	.nav-dropdown-item {
		color: rgb(var(--Text));

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.nav-dropdown-item:hover {
		background-color: rgba(var(--Surface2), 0.6);
	}

	a:hover {
		text-decoration: none;
	}
</style>
