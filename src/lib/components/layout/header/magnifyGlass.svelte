<script lang="ts">
	import Search from '$lib/svgs/search.svelte';
	import { tooltip } from '$lib/utils';

	const elements = [
		{
			id: 'js-searchbar',
			info: 'Hover to reveal the navigation menu.'
		},
		{
			id: 'js-toolbar',
			info: 'This toolbar contains toggles for various thing.'
		},
		{
			id: 'js-info-bar',
			info: 'Displays additional information when hovering over any badge below. Hover over each component to see what details it shows.'
		},
		{
			id: 'js-window',
			info: 'This window contains some fun widgets: live chat, bonsai tree simulator, console, music player (switch to the music page to see it!), and more.'
		},
		{
			id: 'js-status-dot',
			info: 'My online status!'
		}
	];

	function trigger() {
		elements.forEach(element => {
			let el = document.getElementById(element.id);
			if (el) {
				let infoTooltip = tooltip(el, {
					onHidden(instance) {
						instance.destroy();
					},
					content: element.info,
					maxWidth: 300,
					theme: 'catppuccin-light',
					animation: 'scale',
					hideOnClick: true
				});

				infoTooltip.instancesHolder.show();
			}
		});
	}

</script>

<div class="search" on:click={() => trigger()}>
	<div class="search__icon">
		<Search size={24} color="#a6da95" />
	</div>
</div>

<style lang="scss">
  .search {
    margin-right: 10px;
    margin-left: 5px;
    padding-right: 9px;
    border-right: 2px solid rgba(var(--Text), 0.2);

    display: flex;
    justify-content: center;
    align-items: center;

    .search__icon {
      margin: 0;
      transition: transform 0.2s ease;
      line-height: 0;

    }

    &:hover {
      .search__icon {
        transform: scale(1.2);
      }
    }
  }
</style>