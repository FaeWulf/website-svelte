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
			name: 'My music list',
			icon: '🎵',
			url: '/music'
		},
		{
			name: 'Projects',
			icon: '♿',
			url: '/projects'
		},
		// {
		// 	name: 'Game library',
		// 	icon: '🎮',
		// 	url: '/games'
		// },
		{
			name: 'About',
			icon: 'ℹ️',
			url: '/about'
		},
		{
			name: 'Status page',
			icon: '📊',
			url: 'https://status.faewulf.xyz'
		},
		{
			name: 'Support me',
			icon: '❤️',
			url: '/support'
		}
	];
</script>

<div id="dropDownList" class="nav-dropdown">
	{#each pages as page (page.name)}
		<a class="nav-dropdown__item" href={page.url} data-sveltekit-preload-code="tap"
			 data-sveltekit-preload-data="tap">{page.icon}| &nbsp;{page.name}</a>
	{/each}
</div>

<style lang="scss">
  .nav-dropdown {
    display: none;
    max-width: 360px;
    width: 100vw;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 2px;
    gap: 2px;

    .nav-dropdown__item {
      color: rgb(var(--Text));
      padding: 3px 7px;

      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:hover {
        color: rgb(var(--Green));
        background-color: rgba(var(--Surface2), 0.6);
        text-decoration: none;
      }
    }

    @media screen and (max-width: 600px) {
      max-width: none;
    }
  }
</style>
