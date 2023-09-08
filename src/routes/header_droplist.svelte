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
		color: white;
	}

	.nav-dropdown-item:hover {
		background-color: rgba(var(--Overlay0), 1);
	}
</style>
