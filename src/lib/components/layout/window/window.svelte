<script lang="ts">
	import { onMount } from 'svelte';
	import Bonsai from '$lib/components/layout/window/bonsai/bonsai.svelte';
	import Console from '$lib/components/layout/window/console/console.svelte';
	import Chat from '$lib/components/layout/window/chat/chat.svelte';
	import { app3rd } from '$lib/store';

	import Controller from '$lib/components/boids/controller.svelte';
	import Screen from '$lib/components/music/screen.svelte';

	export let windowToggle: boolean = true;
	export let windowOntop: boolean = false;

	let innerHeightb4 = 0;
	let innerWidthb4 = 0;
	let innerHeight: number, innerWidth: number;
	let windowEl: HTMLElement;
	let window_x = -500;
	let window_y = -500;

	let selectTab = 3;
	let totalTabs = [
		{ id: 0, name: 'Bonsai' },
		{ id: 1, name: 'Console' },
		{ id: 3, name: 'Chat' },
		{ id: 2, name: '...' }
	];

	// based on totalTabs id
	// bonasi, console, ..., chat
	$: tabsNotification = [false, true, false, true];

	app3rd.subscribe((value) => {
		if (value != '') selectTab = 2;
	});

	//for mouseDrag
	let initialMouseX: number, initialMouseY: number, initialWindowX: number, initialWindowY: number;

	//function
	function onMouseDown(event: MouseEvent) {
		initialMouseX = event.clientX;
		initialMouseY = event.clientY;
		initialWindowX = windowEl.offsetLeft;
		initialWindowY = windowEl.offsetTop;

		document.addEventListener('pointermove', onMouseMove);
		document.addEventListener('pointerup', onMouseUp);
	}

	function onMouseUp() {
		document.removeEventListener('pointermove', onMouseMove);
		document.removeEventListener('pointerup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		const windowSize = windowEl.getBoundingClientRect();
		// let newX = window_x + e.movementX,
		// 	newY = window_y + e.movementY;
		let newX = initialWindowX + e.clientX - initialMouseX,
			newY = initialWindowY + e.clientY - initialMouseY;

		let top = 0,
			left = 0,
			bottom = innerHeight - windowSize.height,
			right = innerWidth - windowSize.width;

		// window_x value will in between left and right
		window_x = Math.min(Math.max(newX, left), right);
		window_y = Math.min(Math.max(newY, top), bottom);

		innerHeightb4 = innerHeight;
		innerWidthb4 = innerWidth;
	}

	function onToggleButtonClick() {
		windowToggle = false;
	}

	function onWindowResize(e: UIEvent) {
		const windowSize = windowEl.getBoundingClientRect();
		let deltaWidth = innerWidth - innerWidthb4;
		let deltaHeight = innerHeight - innerHeightb4;

		let newX = windowSize.left + deltaWidth,
			newY = windowSize.top + deltaHeight;

		let top = 0,
			left = 0,
			bottom = innerHeight - windowSize.height,
			right = innerWidth - windowSize.width;

		window_x = Math.min(Math.max(newX, left), right);
		window_y = Math.min(Math.max(newY, top), bottom);

		innerWidthb4 = innerWidth;
		innerHeightb4 = innerHeight;
	}

	function onClickTab(index: number) {
		selectTab = index;

		//remove notification from console tabs
		tabsNotification[index] = false;
		tabsNotification = tabsNotification;
	}

	onMount(() => {
		if (innerWidth < 1000) {
			windowToggle = false;
		}

		innerHeightb4 = innerHeight;
		innerWidthb4 = innerWidth;

		const windowSizeQuery = Math.min(innerWidth / 3, innerHeight / 2);
		windowEl.style.width = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';
		windowEl.style.height = Math.max(180, Math.min(windowSizeQuery, 350)) + 'px';

		const windowSize = windowEl.getBoundingClientRect();
		window_x = innerWidth - (windowSize.width + 5);
		window_y = innerHeight - (windowSize.height + 5);
	});
</script>

<div
	tabindex="-1"
	id="js-window"
	class="window"
	class:window--hide="{!windowToggle}"
	class:window__overlay--ontop="{windowOntop}"
	style:top="{window_y}px"
	style:left="{window_x}px"
	bind:this={windowEl}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="window__title-bar" on:pointerdown={onMouseDown}>
		<div class="window__tab">
			{#each totalTabs as tab}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="window__tab-item" class:window__tab-item--selected="{selectTab === tab.id}"
						 on:click={() => onClickTab(tab.id)}>
					<div class="window__tab-item--name"> {tab.name}</div>
					{#if selectTab === tab.id}
						<div class="window__tab-item__dummy" />
					{/if}
					<div class="window__notification" class:window_notification--show="{tabsNotification[tab.id]}"></div>
				</div>
			{/each}
		</div>
		<div class="window__title-bar--toggle">
			<button class="window__button" on:click={onToggleButtonClick}>-</button>
		</div>
	</div>
	<div class="window__content">
		<div class="window__content--unfocus" class:window__tab-item--selected="{selectTab === 0}">
			<Bonsai />
		</div>
		<div class="window__content--unfocus" class:window__tab-item--selected="{selectTab === 1}">
			<Console />
		</div>
		<div class="window__content--unfocus" class:window__tab-item--selected="{selectTab === 2}">
			{#if $app3rd === 'boids'}
				<Controller />
			{/if}
			{#if $app3rd === 'music' && innerWidth >= 720 }
				<div class="window__content-music">
					<Screen />
				</div>
			{/if}
		</div>
		<div class="window__content--unfocus" class:window__tab-item--selected="{selectTab === 3}">
			<Chat />
		</div>
	</div>
</div>

<svelte:window bind:innerHeight bind:innerWidth on:resize={onWindowResize} />

<style lang="scss">
  .window {
    position: fixed;
    width: 350px;
    height: 350px;
    min-width: 220px;
    min-height: 220px;
    opacity: 0.6;

    border: 1px solid var(--color-border-primary);
    border-radius: 0.5rem;

    resize: both;
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 1fr;
    grid-template-areas:
			'titlebar'
			'content';

    transition: //	backdrop-filter 2s cubic-bezier(0.075, 0.82, 0.165, 1),
            opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1),
            box-shadow 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    animation: 0.3s window__keyframe--show ease;

    //prevent selection
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    &.window--hide {
      pointer-events: none;
      animation: 0.3s window__keyframe--hide ease forwards;
    }

    &.window__overlay--ontop {
      z-index: 5;
    }

    &:focus,
    &:hover {
      border: 1px solid var(--color-border-primary);
      opacity: 1;
      background: rgba(var(--Overlay0), 1);
      //backdrop-filter: blur(2px);
      //-webkit-backdrop-filter: blur(2px);
      z-index: 10;
      box-shadow: 0 0 20px #000;
    }

    .window__title-bar {
      grid-area: titlebar;
      position: relative;
      background: rgb(var(--Overlay0));
      cursor: grab;

      .window__title-bar--toggle {
        position: absolute;
        right: 0;
        top: 0;
        aspect-ratio: 1 / 1;
        height: 100%;
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;

        .window__button {
          width: 50%;
          height: 50%;

          border: none;
          border-radius: 50%;
          background: rgb(var(--Red));
          color: rgb(var(--Base));
          cursor: pointer;

          line-height: 0;

          &:hover {
            opacity: 0.5;
          }
        }
      }

      .window__tab {
        box-sizing: border-box;
        padding-left: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;

        background: rgb(var(--Base));

        justify-content: flex-start;
        align-items: end;
        gap: 1px;

        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;

        .window__tab-item {
          position: relative;
          height: 20px;
          width: 20%;

          border: 1px solid var(--color-border-0);
          border-bottom: none;
          border-radius: 5px 5px 0 0;

          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;

          background: rgb(var(--Overlay0));
          color: rgba(var(--Text), 0.5);
          opacity: 0.5;
          cursor: pointer;

          display: flex;
          justify-content: center;
          align-items: center;

          > div.window__tab-item--name {
            overflow: hidden;
            box-sizing: border-box;
            padding-left: 5px;
            padding-right: 5px;
          }

          &.window__tab-item--selected {
            color: rgba(var(--Green), 1);
            border: 1px solid var(--color-border-primary);
            border-bottom: none;
            opacity: 1;
            min-width: fit-content;
          }

          .window__tab-item__dummy {
            position: absolute;
            bottom: -1px;
            left: 0;
            display: block;
            width: 100%;
            height: 1px;
            background: rgb(var(--Overlay0));
          }

          .window__notification {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgb(var(--Green));
            display: none;
            animation: window__notification__keyframe--blink 1s ease-out infinite;

            &.window_notification--show {
              display: block;
            }
          }
        }
      }
    }

    .window__content {
      border-top: 1px solid rgba(var(--Green), 0.3);
      grid-area: content;
      overflow-y: hidden;

      > div.window__content--unfocus {
        display: none;

        &.window__tab-item--selected {
          display: inline;
        }
      }

      .window__content-music {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }
  }

  @keyframes window__keyframe--hide {
    0% {
      opacity: 0.6;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.4);
    }
  }

  @keyframes window__keyframe--show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.6;
    }
  }

  @keyframes window__notification__keyframe--blink {
    0% {
      transform: scale(1);
    }
    60%, 100% {
      transform: scale(1.7);
      opacity: 0;
    }
  }
</style>
