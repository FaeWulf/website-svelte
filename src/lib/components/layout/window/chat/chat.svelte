<script lang="ts">
	import { onMount } from 'svelte';
	import { parseDiscordEmoji, timeAgo } from '$lib/utils';
	import { PUBLIC_chatServer } from '$env/static/public';
	import { dev } from '$app/environment';

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

		chatContent += `<div class="chat__content-message">
						<div><span style="color: white; font-weight: bold">${clientName}</span> <span class="chat__content-timestamp">${timeAgo(Date.now())}</span></div>
						<div>${parseDiscordEmoji(input)}</div>
						</div>`;
		ws.send(
			JSON.stringify({
				type: 'chat',
				data: {
					name: clientName,
					content: input,
					date: Date.now()
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

		try {
			ping?.play();
		} catch (e) {
			if (dev)
				console.debug(e);
		}
	}

	function websocketInit() {
		ws = new WebSocket(PUBLIC_chatServer);

		ws.addEventListener('open', (event) => {
			console.log('Connected to websocket');
			chatContent = '<div class="chat__content-message">Connected to server...</div>';
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

					chatContent += `<div class="chat__content-message">
						<div><span style="color: ${color}; font-weight: bold">${data.data.name}</span> <span class="chat__content-timestamp">${timeAgo(Number(data.data.date))}</span></div>
						<div>${parseDiscordEmoji(data.data.content)}</div>
						</div>`;

					setTimeout(() => {
						content.scrollTo(0, content.scrollHeight);
					}, 10);
				}

				ping?.play();
			} catch (error) {
				if (dev)
					console.debug(error);
			}
		});

		ws.addEventListener('close', (event) => {
			console.log('Disconnected from websocket, attempting reconnect after 3s...');

			chatContent = '';
			chatContent += '<div class="chat__content-message">Disconnected from server... attempting reconnect</div>';
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
<div class="chat-wrapper">
	<div class="chat__content-wrapper" bind:this={content}>
		<div class="content">{@html chatContent}</div>
	</div>
	<div class="chat__button-wrapper">
		<textarea class="chat__text-input" rows="1" bind:value={input} on:keydown={onkeydown_input_chat} />
		<button class="chat__button-send" on:click={() => sendMessage()}>Send</button>
	</div>
</div>

<style lang="scss">
  .chat-wrapper {
    font-size: 15px;
    width: 100%;
    height: 100%;

    .chat__content-wrapper {
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

        :global(.chat__content-message) {
          margin-top: 6px;
          width: 100%;
          height: fit-content;
          overflow-wrap: break-word;

          -webkit-user-select: text; /* Safari */
          -ms-user-select: text; /* IE 10 and IE 11 */
          user-select: text; /* Standard syntax */

          :global(.chat__content-timestamp) {
            font-size: x-small;
            opacity: 0.5;
          }
        }
      }
    }

    .chat__button-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      color: rgba(var(--Text), 1);

      .chat__text-input {
        width: 80%;
        height: 20px;

        resize: none;

        outline: none;
        box-shadow: none;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border-0);
        background-color: rgba(var(--Overlay2), 0.2);
        color: rgb(var(--Text));
      }

      .chat__button-send {
        width: 15%;
        height: 25px;

        background-color: rgb(var(--Overlay2));
        opacity: 0.6;
        color: rgb(var(--Text));
        border: 1px solid var(--color-border-0);
        border-radius: 0.5rem;
        cursor: pointer;

        transition: all 0.3s ease;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  :global(.chat__emoji-img) {
    display: inline;
    width: 20px;
    height: 20px;
  }
</style>
