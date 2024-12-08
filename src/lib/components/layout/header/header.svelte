<script lang="ts">
	import { page } from '$app/stores';
	import 'tippy.js/animations/perspective-subtle.css';
	import { onMount } from 'svelte';
	import { capitalFirstLeter } from '$lib/utils';

	//import toolbar comps
	import Volume from '$lib/components/layout/header/button_volume.svelte';
	import Theme from '$lib/components/layout/header/button_theme.svelte';
	import WindowIcon from '$lib/components/layout/header/button_window-icon.svelte';
	import ButtonUfo from '$lib/components/layout/header/button_ufo.svelte';
	import NavigationBar from '$lib/components/layout/header/naviation_bar.svelte';

	export let windowToggle: boolean;
	export let ufoToggleMovement: boolean;

	onMount(() => {
		//set sound volumn
		spaceSound.volume = 0.05;
		thinkfast.volume = 0.5;
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
		<div id="js-toolbar" class="nav__toolbar">
			<div class="nav__toolbar-item">
				<Volume bind:toggle={volumeToggle} />
			</div>
			<div class="nav__toolbar-item">
				<Theme />
			</div>
			<div class="nav__toolbar-item" id="js-ufo_home">
				<ButtonUfo bind:toggle={ufoToggleMovement} />
			</div>
			<div class="nav__toolbar-item">
				<WindowIcon bind:windowToggle />
			</div>
		</div>
		<NavigationBar pageUrl={pathname} />
	</div>
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
    filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.8));


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

  span {
    line-height: 30px;
  }

</style>
