<script lang="ts">
	import { typewriter } from '$lib/utils';
	import MagnifyGlass from '$lib/components/layout/header/magnifyGlass.svelte';
	import Bell from '$lib/components/layout/header/bell.svelte';

	export let pageUrl = '';

	const pages = [
		{ name: 'Home Page', icon: '🏠', url: '/' },
		{ name: 'Projects', icon: '♿', url: '/projects' },
		{ name: 'About', icon: 'ℹ️', url: '/about' },
		{ name: 'My Blog', icon: '📜', url: '/blog' },
		{ name: 'My music list', icon: '🎵', url: '/music' },
		{ name: 'Status page', icon: '📊', url: 'https://status.faewulf.xyz' },
		{ name: 'Support me', icon: '❤️', url: '/support' }
		//{ name: 'Game library', icon: '🎮', url: '/games' }
	];


</script>

<nav class="nav-bar" id="js-searchbar" onclick="">
	<div class="nav-bar__dropdown">
		<!-- aria-expanded needs managed with Javascript -->
		<button
			type="button"
			class="nav-bar__dropdown-button"
			aria-expanded="false"
			aria-controls="nav-dropdown"
		>
			<MagnifyGlass />
			{#key pageUrl}
				<span class="nav-bar__dropdown-button__text" in:typewriter={{ speed: 2 }}>{pageUrl}</span>
			{/key}
			<span class="nav-bar__dropdown-button__text nav-bar__dropdown-button__text--blinking">_</span>
		</button>
		<ul class="nav-bar__dropdown-menu" id="nav-dropdown">
			{#each pages as page (page.name)}
				<li class="nav-bar__dropdown-item">
					<a class="nav-bar__dropdown-text-wrapper"
						 href={page.url}
						 data-sveltekit-preload-code="tap"
						 data-sveltekit-preload-data="tap">
						<span class="nav-bar__dropdown-text">
							{page.icon}
						</span>
						<span class="nav-bar__dropdown-text">
							{page.name}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
<!--	<Bell />-->
</nav>

<style lang="scss">

  .nav-bar {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 400px;
    height: 30px;

    border: 1px solid var(--color-border-secondary);
    border-radius: 0.5rem;
    padding: 4px;
    background-color: rgba(var(--Overlay1), 1);

    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    .nav-bar__dropdown {
      width: 100%;
      height: 100%;

      .nav-bar__dropdown-button {
        height: 100%;
        width: 100%;
        border: none;
        background: none;

        display: flex;
        cursor: pointer;

        .nav-bar__dropdown-button__text {
          height: 100%;

          display: flex;
          align-items: center;

          &--blinking {
            animation: blink 1s step-end infinite;
          }
        }
      }

      ul.nav-bar__dropdown-menu {
        position: absolute;

        width: 100%;
        top: calc(100% + 5px);
        left: 0;

        list-style: none;
        margin: 0;
        padding: 5px;

        border-radius: 0.5rem;
        border: 1px solid var(--color-border-secondary);
        box-sizing: border-box;

        background: rgba(var(--Overlay1), 1);

        visibility: hidden;
        display: grid;
        transform: rotateX(-90deg);
        transform-origin: top center;
        opacity: 0.3;

        transition: 280ms all ease;

        li.nav-bar__dropdown-item {
          width: 100%;
          box-sizing: border-box;
          padding: 5px 10px 5px 10px;
          border-radius: 0.5rem;

          .nav-bar__dropdown-text-wrapper {
            display: flex;
            gap: 1rem;
            width: 100%;
            color: rgb(var(--Text));
            text-decoration: none;
          }

          &:hover {
            background-color: rgba(var(--Surface2), 0.6);

            .nav-bar__dropdown-text-wrapper {
              color: rgb(var(--Green));
            }
          }
        }
      }

      &:hover,
      &:focus-within {
        .nav-bar__dropdown-menu {
          opacity: 1;
          transform: rotateX(0);
          visibility: visible;
          border: 1px solid var(--color-border-primary);
        }
      }
    }

    &:hover,
    &:focus-within {
      border: 1px solid var(--color-border-primary);
    }

    @media (max-width: 720px) {
      .nav-bar__dropdown {
        ul.nav-bar__dropdown-menu {
          position: fixed;
          width: calc(100% - 20px);
          top: 100%;
          left: 10px;
        }
      }
    }

    @keyframes blink {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

</style>