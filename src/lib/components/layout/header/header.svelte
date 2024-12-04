<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/svgs/search.svelte';
	import 'tippy.js/animations/perspective-subtle.css';
	import HeaderDroplist from '$lib/components/layout/header/header_droplist.svelte';
	import { onMount } from 'svelte';
	import { capitalFirstLeter, isMobile, tooltip, typewriter } from '$lib/utils';

	//import toolbar comps
	import Volume from '$lib/components/layout/header/button_volume.svelte';
	import Theme from '$lib/components/layout/header/button_theme.svelte';
	import WindowIcon from '$lib/components/layout/header/button_window-icon.svelte';
	import ButtonUfo from '$lib/components/layout/header/button_ufo.svelte';
	import Bell from '$lib/components/layout/header/bell.svelte';

	export let windowToggle: boolean;
	export let ufoToggleMovement: boolean;

	let template: HTMLElement;
	let droplist: any;

	onMount(() => {
		//get droplist, this DOM Elemtent is used for tooltip, currently display: none
		template = <HTMLElement>document.getElementById('dropDownList');
		template.style.display = 'flex';

		//set sound volumn
		spaceSound.volume = 0.05;
		thinkfast.volume = 0.5;

		/* use:tooltip={{
					allowHTML: true,
					theme: 'catppuccin-transparent',
					animation: 'perspective-subtle',
					interactive: true,
					arrow: false,
					content: template,
					maxWidth: 400,
					offset: [0, 6],
					trigger: 'mouseenter click'
				}} */

		if (isMobile(window, window.navigator)) {
			tooltip(droplist, {
				offset: [0, 10],
				maxWidth: 1000,
				allowHTML: true,
				theme: 'catppuccin-transparent',
				animation: 'perspective-subtle',
				interactive: true,
				arrow: false,
				content: template,
				trigger: 'click'
			});
		} else {
			tooltip(droplist, {
				offset: [0, 8],
				maxWidth: 400,
				allowHTML: true,
				theme: 'catppuccin-transparent',
				animation: 'perspective-subtle',
				interactive: true,
				arrow: false,
				content: template,
				trigger: 'mouseenter click'
			});
		}
	});

	//making sub path in main path
	$: pathname = $page.url.pathname == '/' ? 'Home Page' : capitalFirstLeter($page.url.pathname.split('/')[1]);

	let volumeToggle: boolean;
	let pauseSFX = false;
	let spaceSound: HTMLAudioElement;
	let thinkfast: HTMLAudioElement;

	$: {
		if (volumeToggle && !pauseSFX) spaceSound?.play();
		else spaceSound?.pause();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<header>
	<div class="nav-wrapper">
		<div class="nav__toolbar">
			<div
				class="nav__toolbar-item"
				use:tooltip={{
					content: 'Toggle mysterious sound',
					theme: 'catppuccin',
					animation: 'scale'
				}}
			>
				<Volume bind:toggle={volumeToggle} />
			</div>
			<div
				class="nav__toolbar-item"
				use:tooltip={{
					content: 'Chagne theme',
					theme: 'catppuccin',
					animation: 'scale'
				}}
			>
				<Theme />
			</div>
			<div
				class="nav__toolbar-item"
				id="js-ufo_home"
				use:tooltip={{
					content: 'Toggle UFO movement',
					theme: 'catppuccin',
					animation: 'scale'
				}}
			>
				<ButtonUfo bind:toggle={ufoToggleMovement} />
			</div>
			<div
				class="nav__toolbar-item"
				use:tooltip={{
					content: 'Toggle window tab',
					theme: 'catppuccin',
					animation: 'scale'
				}}
			>
				<WindowIcon bind:windowToggle />
			</div>
		</div>
		<nav>
			<div class="nav__search-input" aria-label="Drop menu" bind:this={droplist}>
				<div class="nav__search-icon">
					<Search size={24} color="#a6da95" />
				</div>
				{#key $page.url.pathname}
					<span in:typewriter={{ speed: 2 }}>
						{pathname}
					</span>
				{/key}

				<span class="nav__search-input--blinking">_</span>
			</div>

			<Bell />
		</nav>
	</div>

	<HeaderDroplist />
	<audio src="/sfx/space-sound.mp3" preload="auto" bind:this={spaceSound} loop />
	<audio src="/sfx/think-fast.mp3" preload="auto" bind:this={thinkfast} />
</header>

{#if false}
	<div class="theme__flash-bang" class:theme__flash-bang--play={false} />
{/if}

<svelte:window on:blur={() => (pauseSFX = true)} on:focus={() => (pauseSFX = false)} />

<style lang="scss">
  header {
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    z-index: 9;
  }

  .nav-wrapper {
    max-width: 550px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px;
    column-gap: 8px;

    //backdrop-filter: blur(10px);
    //-webkit-backdrop-filter: blur(10px);
    border-radius: 50px;
    //background-color: rgba(var(--Overlay0), 0.6);
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.2));


    .nav__toolbar {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;

      height: 40px;
      width: max-content;

      padding: 0 5px;

      border: 1px solid var(--color-border-secondary);
      border-radius: 0.5rem;
      background-color: rgba(var(--Overlay1), 1);
      //backdrop-filter: blur(10px);

      .nav__toolbar-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
      }
    }

    nav {
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
      //backdrop-filter: blur(10px);

      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      .nav__search-input {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;

        overflow: hidden;

        &--blinking {
          color: rgb(var(--Rosewater));
          animation: blink 1s step-end infinite;
        }

        .nav__search-icon {
          margin-right: 10px;
          margin-left: 5px;
          padding-right: 9px;
          border-right: 2px solid rgba(var(--Text), 0.2);

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  #js-ufo_home {
    width: 30px;
    height: 30px;
  }

  .theme__flash-bang {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: white;

    &--play {
      animation: flash 5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  }

  @keyframes flash {
    0% {
      opacity: 0;
    }

    2% {
      opacity: 1;
    }

    70% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  /*
	nav:hover {
		transform: scale(1.05) translateY(5px);
				filter: drop-shadow(0px 0px 5px rgba(var(--Yellow), 0.2));
	}
	*/

  span {
    line-height: 30px;
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
</style>
