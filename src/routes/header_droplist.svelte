<script lang="ts">
	const pages = [
		{
			name: 'Home Page',
			icon: '🏠',
			url: '/'
		},
		{
			name: 'My Blog',
			icon: '📜',
			url: '/blog'
		},
		{
			name: 'My favorite music list',
			icon: '🎵',
			url: '/music'
		},
		{
			name: 'Projects',
			icon: '♿',
			url: '/projects'
		},
		{
			name: 'Game library',
			icon: '🎮',
			url: '/games'
		},
		{
			name: 'About',
			icon: 'ℹ️',
			url: '/about'
		}
	];
</script>

<div id="dropDownList" class="nav-dropdown">
	{#each pages as page (page.name)}
		<a
			class="nav-dropdown-item"
			href={page.url}
			data-sveltekit-preload-code="tap"
			data-sveltekit-preload-data="tap">{page.icon}| {page.name}</a
		>
	{/each}
</div>

<style>
	.nav-dropdown {
		display: none;
		max-width: 350px;
		width: 100vw;
		flex-wrap: wrap;
		flex-direction: column;
		padding: 2px;
		gap: 2px;
	}

	.nav-dropdown-item {
		color: rgb(var(--Text));
		padding: 3px;
		padding-left: 7px;
		padding-right: 7px;

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
