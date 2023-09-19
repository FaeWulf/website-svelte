<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import Command from './console/command.svelte';

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
					break;
				}

				case 'Backspace':
					if (input.length <= 0) return;
					input = input.slice(0, -1);
					break;
			}
	}

	function focusConsole(trigger: boolean) {
		if (trigger)
			setTimeout(() => {
				consoleTab.focus();
			}, 500);
	}

	//dynamic
	$: focusConsole(openConsole);
</script>

{#if openConsole}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => {
			openConsole = false;
		}}
		transition:slide={{ duration: 300, easing: quintInOut, axis: 'y' }}
		class="console-holder"
	>
		<div
			on:click={onclickConsole}
			class="console-container"
			role="textbox"
			tabindex="-1"
			on:keydown={handleKeyDown}
			bind:this={consoleTab}
		>
			<div>
				<Command bind:output bind:input bind:triggerEnter />
			</div>
		</div>
	</div>
{/if}

<style>
	.console-holder {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		z-index: 15;
	}

	.console-container {
		width: 100%;
		height: 100%;
		max-width: 600px;
		max-height: 500px;
		border: 1px solid rgba(var(--Text), 0.3);
		border-radius: 2px;
		margin: 5px;
		padding: 5px;

		background: rgba(var(--Crust), 0.7);

		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);

		display: flex;
		flex-direction: column;
	}

	.console-container:focus {
		outline: none;
		border: 1px solid rgba(var(--Lavender), 0.8);
	}

	.console-container :global(pre) {
		margin: 0;
		white-space: pre-line;
		background: none;
	}

	.console-container :global(span) {
		margin: 0;
	}
</style>
