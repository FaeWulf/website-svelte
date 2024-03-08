<script lang="ts">
	import { onMount } from 'svelte';
	import { parseDiscordEmoji } from '$lib/utils';

	let input = '';
	let output = '';

	let clientName = '';

	let ws: WebSocket;

	onMount(() => {
		websocketInit();
	});

	function sendMessage() {
		if (!ws) return;
		output += '<br> ' + `<span style="color: white; font-weight: bold">${clientName}</span>: ` + parseDiscordEmoji(input);
		ws.send(
			JSON.stringify({
				type: 'chat',
				data: {
					name: clientName,
					content: input
				}
			})
		);
	}

	function websocketInit() {
		ws = new WebSocket('ws://localhost:3000');

		ws.addEventListener('open', (event) => {
			console.log('Connected to websocket');
		});

		ws.addEventListener('message', (event) => {
			try {
				const data = JSON.parse(event.data);

				//if name type
				if (data.type == 'name') {
					clientName = data.data.name;
				}

				//if chat type
				if (data.type == 'chat') {
					const color = data.data.color ? data.data.color : 'white';

					output += '<br> ' + `<span style="color: ${color}; font-weight: bold">${data.data.name}</span>: ` + parseDiscordEmoji(data.data.content);
				}
			} catch (error) {
				console.log(error);
			}
		});

		ws.addEventListener('close', (event) => {
			console.log('Disconnected from websocket, attempting reconnect after 3s...');

			//attempt reconnect
			setTimeout(() => {
				websocketInit();
			}, 3000);
		});
	}
</script>

<svelte:head>
	<title>Faewulf's Basement | Support</title>
	<meta name="description" content="About this website" />
</svelte:head>

<textarea bind:value={input} />
<div>{@html output}</div>
<button on:click={() => sendMessage()}>Send</button>

<style lang="scss">
	:global(img.emoji) {
		display: inline;
		width: 20px;
		height: 20px;
	}
</style>
