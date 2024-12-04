<script lang="ts">
	import Command from '$lib/components/layout/window/console/command.svelte';
	import { onMount } from 'svelte';

	export let openConsole: boolean = false;

	//functions

	let consoleTab: HTMLElement;
	let memmory: string[] = [];
	let memmoryIndex = -1;
	let output: string;
	let input: string;
	let triggerEnter: boolean;

	function onclickConsole(event: Event) {
		event.stopPropagation();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		const keyPressed = event.key;

		if (String(keyPressed).length == 1) {
			input += keyPressed;
		} else
			switch (keyPressed) {
				case 'Enter': {
					triggerEnter = true;
					//make ConsoleTab scroll to the bottom
					consoleTab.scrollTop = consoleTab.scrollHeight;
					break;
				}

				case 'Backspace':
					if (input.length <= 0) return;
					input = input.slice(0, -1);
					break;

				//case for up arrow
				case 'ArrowUp':
					if (memmoryIndex == -1) memmoryIndex = memmory.length;
					memmoryIndex--;
					memmoryIndex = memmoryIndex < 0 ? 0 : memmoryIndex;
					input = memmory[memmoryIndex];
					break;

				//case for down arrow
				case 'ArrowDown':
					if (memmoryIndex == -1) memmoryIndex = memmory.length;
					memmoryIndex++;
					memmoryIndex = memmoryIndex > memmory.length - 1 ? memmory.length - 1 : memmoryIndex;
					input = memmory[memmoryIndex];
					break;
			}
	}

	function focusConsole(trigger: boolean) {
		if (trigger)
			setTimeout(() => {
				consoleTab.focus();
			}, 500);
	}

	onMount(() => {
		setTimeout(() => {
			input = 'whoami';
			triggerEnter = true;
		}, 2000);
	});

	//dynamic
	$: focusConsole(openConsole);
</script>

<div
	on:click={onclickConsole}
	class="console-container"
	role="textbox"
	tabindex="-1"
	on:keydown={handleKeyDown}
	bind:this={consoleTab}
>
	<div>
		<Command bind:output bind:input bind:triggerEnter bind:memmory bind:memmoryIndex />
	</div>
</div>

<style lang="scss">
  .console-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    padding: 5px;

    display: flex;
    flex-direction: column;
    overflow: auto;
    opacity: 0.6;

    &:focus {
      box-sizing: border-box;
      border: 1px solid var(--color-border-secondary);
      outline: none;
      opacity: 1;
    }

    :global(pre) {
      margin: 5px;
      white-space: pre-line;
      background: none;
      overflow-y: hidden;
    }

    :global(span) {
      margin: 0;
    }
  }
</style>
