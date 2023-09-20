<script lang="ts">
	import { ufoBubble } from '$lib/store';
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let toggleBubbbleChat0 = false;
	let toggleBubbbleChat1 = false;
	let toggleBubbbleChat2 = false;
	let toggleBubbbleChat3 = false;

	let storeContent = '';
	let bubbleChatContent = '';

	//functions

	//if toggleBubbbleChat == false then all toggleBubbbleChat = false
	function toggleBubble(enable: boolean) {
		if (enable) toggleBubbbleChat0 = true;
		else {
			toggleBubbbleChat3 = false;
		}
	}

	//below function is checking ufoChatContent, if ufochatContent is not empty then toggleBubbleChat = true, else toggleBubbleChat = false
	function toggleBubbleChat(str: string) {
		if (toggleBubbbleChat0 == true || toggleBubbbleChat3 == true) {
			return;
		}

		if (str && str.length > 0) {
			bubbleChatContent = str;
			toggleBubble(true);
			setTimeout(() => {
				toggleBubble(false);
				bubbleChatContent = '';
				ufoBubble.set('');
			}, 5000);
		} else {
			toggleBubble(false);
		}
	}

	//dynamics
	$: toggleBubbleChat(storeContent);

	//stores
	ufoBubble.subscribe((E) => {
		storeContent = E;
	});
</script>

<div class="bubble-chat">
	{#if toggleBubbbleChat0}
		<div
			on:introend={() => {
				toggleBubbbleChat1 = true;
			}}
			transition:fly={{ duration: 100, x: -8, y: 13, opacity: 0.5, easing: quintOut }}
			style="position:absolute; top: 13px; left: -8px; background: white; width: 5px; height: 5px; border-radius: 50%;"
		/>
	{/if}

	{#if toggleBubbbleChat1}
		<div
			on:introend={() => {
				toggleBubbbleChat2 = true;
			}}
			on:outroend={() => {
				toggleBubbbleChat0 = false;
			}}
			transition:fly={{ duration: 100, x: -6, y: 10, opacity: 0.5, easing: quintOut }}
			style="position:absolute; top: 3px; left: -1px; background: white; width: 7px; height: 7px; border-radius: 50%;"
		/>
	{/if}

	{#if toggleBubbbleChat2}
		<div
			on:introend={() => {
				toggleBubbbleChat3 = true;
			}}
			on:outroend={() => {
				toggleBubbbleChat1 = false;
			}}
			transition:fly={{ duration: 100, x: -7, y: 14, opacity: 0.5, easing: quintOut }}
			style="position:absolute; top:-14px; left:5px; background: white; width: 10px; height: 10px; border-radius: 50%;"
		/>
	{/if}

	{#if toggleBubbbleChat3}
		<div
			on:outroend={() => {
				toggleBubbbleChat2 = false;
			}}
			transition:fade={{ duration: 300 }}
			class="bubble-chat-wrapper"
		>
			<a href="https://github.com/ngola" target="_blank">Github</a>
			{bubbleChatContent}
		</div>
	{/if}
</div>

<style>
	.bubble-chat {
		position: absolute;
		top: 0;
		right: 0;
	}

	.bubble-chat-wrapper {
		position: absolute;
		bottom: 10px;
		left: -25px;
		border-radius: 50%;
		width: max-content;
		height: fit-content;
		max-width: 200px;
		overflow-wrap: break-word;

		background: white;
		color: black;

		padding: 12px 24px;
		text-align: center;

		pointer-events: all;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
