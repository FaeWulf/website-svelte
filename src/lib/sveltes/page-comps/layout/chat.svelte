<script lang="ts">
	import { onMount } from 'svelte';
	import { parseDiscordEmoji } from '$lib/utils';
	import { PUBLIC_chatServer } from '$env/static/public';

	let input = '';

	let chatContent = '';

	let clientName = '';

	let content: HTMLElement;

	let ws: WebSocket;

	let ping: HTMLAudioElement;

	onMount(() => {
		websocketInit();
	});

	function sendMessage() {
		if (!ws) return;

		if (input.trim().length < 1) {
			//reset
			input = '';
			return;
		}

		chatContent += `<div class="message"> <span style="color: white; font-weight: bold">${clientName}</span>: ` + parseDiscordEmoji(input) + '</div>';
		ws.send(
			JSON.stringify({
				type: 'chat',
				data: {
					name: clientName,
					content: input
				}
			})
		);

		//reset
		input = '';

		//jump to bottom
		if (content) {
			setTimeout(() => {
				content.scrollTo(0, content.scrollHeight);
			}, 10);
		}

		if (ping) {
			ping.play();
		}
	}

	function websocketInit() {
		ws = new WebSocket(PUBLIC_chatServer);

		ws.addEventListener('open', (event) => {
			console.log('Connected to websocket');
			chatContent = '<div class="message">Connected to server...</div>';
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

					chatContent +=
						`<div class="message"><span style="color: ${color}; font-weight: bold">${data.data.name}</span>: ` +
						parseDiscordEmoji(data.data.content) +
						'</div>';
				}

				if (ping) {
					ping.play();
				}
			} catch (error) {
				console.log(error);
			}
		});

		ws.addEventListener('close', (event) => {
			console.log('Disconnected from websocket, attempting reconnect after 3s...');

			chatContent = '';
			chatContent += '<div class="message">Disconnected from server... attempting reconnect</div>';
			//attempt reconnect
			setTimeout(() => {
				websocketInit();
			}, 3000);
		});
	}

	function onkeydown_input_chat(e: KeyboardEvent) {
		//if enter, send message and return false
		if (e.key == 'Enter') {
			sendMessage();
			return false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<audio src="/sfx/ping.mp3" preload="auto" volume="0.5" bind:this={ping} />
<div class="wrapper">
	<div class="content-wrapper" bind:this={content}>
		<div class="content">{@html chatContent}</div>
	</div>
	<div class="buttons-wrapper">
		<textarea class="input-chat" rows="1" bind:value={input} on:keydown={onkeydown_input_chat} />
		<button class="button-send" on:click={() => sendMessage()}>Send</button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		font-size: 15px;
		width: 100%;
		height: 100%;

		.content-wrapper {
			box-sizing: border-box;
			padding: 5px;
			width: 100%;
			height: calc(100% - 30px);
			max-height: calc(100% - 30px);
			overflow-x: hidden;
			overflow-y: scroll;
			scroll-behavior: smooth;

			.content {
				width: 100%;
				min-height: 100%;
				height: fit-content;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				flex-wrap: wrap;
				gap: 5px;

				:global(> div.message) {
					width: 100%;
					height: fit-content;
					overflow-wrap: break-word;

					-webkit-user-select: text; /* Safari */
					-ms-user-select: text; /* IE 10 and IE 11 */
					user-select: text; /* Standard syntax */
				}
			}
		}

		.buttons-wrapper {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			color: rgba(var(--Text), 1);

			.input-chat {
				width: 80%;
				height: 20px;

				resize: none;

				outline: none;
				box-shadow: none;
				border: 1px rgba(var(--Text), 0.2) solid;
				background-color: rgba(var(--Crust), 0.2);
				color: rgb(var(--Text));
			}

			.button-send {
				width: 15%;
				height: 25px;

				background-color: rgb(var(--Green));
				opacity: 0.6;
				color: rgb(var(--Crust));
				border: 1px rgba(var(--Text), 0.2) solid;
				border-radius: 5px;
				cursor: pointer;

				transition: all 0.3s ease;

				&:hover {
					opacity: 1;
				}
			}
		}
	}

	:global(img.emoji) {
		display: inline;
		width: 20px;
		height: 20px;
	}
</style>
