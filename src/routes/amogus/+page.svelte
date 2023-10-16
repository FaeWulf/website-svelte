<script lang="ts">
	import { dev } from '$app/environment';

	const amogusValue: { [key: string]: string } = {
		'0': 'ඬ',
		'1': 'ඩ',
		'2': 'ඣ',
		'3': 'ඪ',
		'4': 'ච',
		'5': 'ඔ',
		'6': 'ඕ',
		'7': 'ධ',
		'8': 'ඹ',
		'9': 'ය',
		a: 'ව',
		b: 'ස',
		c: 'හ',
		d: 'බ',
		e: 'ඨ',
		f: 'ඖ'
	};

	let input: string;
	let output: string;
	let copyToClipboardText: string = 'Copy to clipboard';
	let invalidUrl = false;

	function decimalToAmogusimal(decimalNumber: number) {
		// Convert the decimal number to a hexadecimal string
		const hexadecimalString = decimalNumber.toString(16);

		// Split the hexadecimal string into individual characters
		const hexadecimalDigits = hexadecimalString.split('');

		// Pad with leading zeros to ensure four characters
		while (hexadecimalDigits.length < 4) {
			hexadecimalDigits.unshift('0');
		}

		for (let i = 0; i < hexadecimalDigits.length; i++) {
			hexadecimalDigits[i] = amogusValue[hexadecimalDigits[i]];
		}

		return hexadecimalDigits.join('');
	}

	function encode(str: string) {
		let r = '';
		//split string into individual chars
		str.split('').forEach((char) => {
			r += decimalToAmogusimal(char.charCodeAt(0));
			//console.log(decimalToAmogusimal(char.charCodeAt(0)));
		});

		return r;
	}

	function onClick_generate() {
		if (dev) output = 'http://localhost:5173/amogus/' + encode(input);
		else output = 'https://faewulf.xyz/amogus/' + encode(input);

		const urlCheck = input.match(
			/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g
		);

		if (urlCheck == null) {
			invalidUrl = true;
		}
	}

	function copyToClipboard(str: string) {
		copyToClipboardText = 'Copied!';
		navigator.clipboard.writeText(str);
	}
</script>

<svelte:head>
	<title>Faewulf's Basement | Amongusify</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<h2>
		⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛<br />
		⬛🟥🟥🟥🟥⬛⬛🟥⬛⬛🟥⬛⬛🟥🟥🟥🟥⬛<br />
		⬛🟥⬛⬛⬛⬛⬛🟥⬛⬛🟥⬛⬛🟥⬛⬛⬛⬛<br />
		⬛🟥🟥🟥🟥⬛⬛🟥⬛⬛🟥⬛⬛🟥🟥🟥🟥⬛<br />
		⬛⬛⬛⬛🟥⬛⬛🟥⬛⬛🟥⬛⬛⬛⬛⬛🟥⬛<br />
		⬛⬛⬛⬛🟥⬛⬛🟥⬛⬛🟥⬛⬛⬛⬛⬛🟥⬛<br />
		⬛🟥🟥🟥🟥⬛⬛🟥🟥🟥🟥⬛⬛🟥🟥🟥🟥⬛<br />
		⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛<br />
	</h2>

	<input type="text" bind:value={input} placeholder="Input URL here" />
	<button on:click={() => onClick_generate()}>Amogusify</button>
	<p>
		Generated link:
		{#if invalidUrl}
			<span style="color: red;">Invalid URL detected!</span>
		{/if}
	</p>
	<textarea readonly cols="30" rows="10" bind:value={output} />
	<button on:click={() => copyToClipboard(output)}>{copyToClipboardText}</button>
</div>

<style lang="scss">
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);

		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
	}

	input {
		margin-top: 70px;
		height: 30px;
		width: 100%;
		max-width: 350px;
	}

	p {
		margin-top: 50px;
	}

	textarea {
		width: 100%;
		max-width: 350px;
	}

	textarea,
	input {
		resize: none;
		background: rgba(var(--Overlay0), 0.2);
		border: 1px solid rgba(var(--Text), 0.2);
		color: rgb(var(--Text));

		&:focus {
			outline: rgba(var(--Green), 0.6);
			border: 1px solid rgba(var(--Green), 0.6);
		}
	}

	button {
		margin: 10px;
		border: 1px solid rgba(var(--Lavender), 0.6);
		background: rgba(var(--Overlay0), 0.5);
		color: rgb(var(--Text));
		padding: 5px;
		cursor: pointer;

		&:hover {
			background: rgba(var(--Overlay2), 0.8);
		}
	}
</style>
