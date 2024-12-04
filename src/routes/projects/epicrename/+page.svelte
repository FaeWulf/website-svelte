<script lang="ts">
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';

	//vvars declare
	let input: string = "First line is for Item's name\nThis is line #1\n\nYou can skip for line #3\n&bNow create your own...";
	let output: string = '';
	let editor: HTMLTextAreaElement;

	let previewTab: HTMLElement;
	let preview: string = '';
	let glow: boolean = false;
	let buttonWrapper: HTMLElement;

	let totalLine = 0;

	let mainHeight: number, mainWidth: number;

	const formatCodes: { [key: string]: string } = {
		'&0': 'format-0',
		'&1': 'format-1',
		'&2': 'format-2',
		'&3': 'format-3',
		'&4': 'format-4',
		'&5': 'format-5',
		'&6': 'format-6',
		'&7': 'format-7',
		'&8': 'format-8',
		'&9': 'format-9',
		'&a': 'format-a',
		'&b': 'format-b',
		'&c': 'format-c',
		'&d': 'format-d',
		'&e': 'format-e',
		'&f': 'format-f',
		'&n': 'format-n',
		'&l': 'format-l',
		'&k': 'format-k',
		'&o': 'format-o',
		'&m': 'format-m',
		'&r': 'format-r'
	};

	//functions
	function render(input: string) {
		//render preview
		const splitted = input.split('\n');
		let linesPreview: string[] = [];
		for (let i = 0; i < splitted.length; i++) {
			//with each line, replace format code with html tags
			let currentLineResult = '';

			//convert string into format objects
			const line = splitStringIntoObjects(splitted[i]);

			//with each format object, replace format code with html tags
			line.forEach((element) => {
				const reversedFormatCodes = element.format.reverse();
				let renderElement = element.content;
				//reserve the format codes, to wrap format by format
				reversedFormatCodes.forEach((formatCode) => {
					renderElement = `<span class="${formatCodes[formatCode.toLowerCase()]}">${renderElement}</span>`;
				});

				//add to current line
				currentLineResult += renderElement;
			});

			//if current line is the first line, add format-name tag
			if (i == 0) {
				currentLineResult = `<span class="format-name">${currentLineResult}</span>`;
			}

			//add to linePreview
			linesPreview.push(currentLineResult);
		}
		totalLine = splitted.length;

		preview = linesPreview.join('<br>');
	}

	function splitStringIntoObjects(inputString: string) {
		const regex = /(&[0-9a-fnlkmor])*[^&]*/gi;
		//const regex = /(&[0-9a-fulmor])+[^&]+/gi;
		const matches = inputString.match(regex);
		const result: { format: string[]; content: string }[] = [];

		if (!matches) {
			return [{ format: ['none'], content: inputString }];
		}

		matches.forEach((match) => {
			//case match is ""
			if (match === '') {
				return;
			}
			//const formatCode = match.slice(0, 2);

			const formats = match.match(/&[0-9a-fnlkmor]/gi);
			const content = match.replace(/&[0-9a-fnlkmor]/gi, '');

			//if format codes found
			if (formats && formats.length > 0) {
				result.push({
					format: formats,
					content: content
				});
			} else {
				//case if there is no format code, and there is element before this, then concat this element to the previous
				if (result.length > 0) {
					result[result.length - 1].content += '&' + content;
				} else
					result.push({
						format: ['none'],
						content: content
					});
			}
		});
		return result;
	}

	function obsfuscation(input: string | null) {
		if (!input) {
			return null;
		}

		//randomize character in string
		let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]^_`{|}~';
		let result = '';
		for (let i = 0; i < input.length; i++) {
			//insert random character
			result += characters[Math.floor(Math.random() * characters.length)];
		}

		return result;
	}

	function getDeepestChild(element: Element) {
		let deepestChild = element;

		while (deepestChild.children.length > 0) {
			deepestChild = deepestChild.children[0];
		}

		return deepestChild;
	}

	//for format button
	function format(type: string) {
		if (!editor) return;

		//insert format	 into selection text
		if (editor.selectionStart == editor.selectionEnd) {
			input = editor.value.slice(0, editor.selectionStart) + type + editor.value.slice(editor.selectionStart);
		} else {
			input =
				editor.value.slice(0, editor.selectionStart) +
				type +
				editor.value.slice(editor.selectionStart, editor.selectionEnd) +
				'&r' +
				editor.value.slice(editor.selectionEnd);
		}
	}

	//generate function
	function generate() {
		const lines = input.split('\n');

		if (lines.length < 0) {
			return;
		}

		let result: string[] = [];
		//first line is always for item name
		if (glow) result.push('/glow');
		result.push('/rename ' + lines[0]);
		let index = 1;
		for (let i = 1; i < lines.length; i++) {
			if (lines[i] == '') result.push('/setloreline ' + index + ' &r');
			else result.push('/setloreline ' + index + ' ' + lines[i]);
			index++;
		}

		output = result.join('\n');
	}

	//dynamic declares
	$: render(input);

	//for obsfuscation format-k
	setInterval(() => {
		//update all obfuscation elements: format-k
		if (previewTab) {
			const format_k = previewTab.querySelectorAll('span.format-k');
			for (let i = 0; i < format_k.length; i++) {
				let deepestChild = getDeepestChild(format_k[i]);
				//format_k[i].innerHTML = obsfuscation(format_k[i].innerHTML);
				if (deepestChild) deepestChild.textContent = obsfuscation(deepestChild.textContent);
			}
		}

		if (buttonWrapper) {
			const format_k = buttonWrapper.querySelector('button.format-k');
			if (format_k) format_k.textContent = obsfuscation(format_k.textContent);
		}
	}, 20);
</script>

<MetaTags
		title="EpicRename Generator | Faewulf's Basement"
		description="A generator for EpicRename spigot plugin and for my mod ItemRename."
		keywords={['faewulf', 'projects', 'epicrename', 'tool', 'generator']}
		canonical="https://faewulf.xyz/projects/epicrename"
/>

<div class="main-wrapper" bind:clientHeight={mainHeight} bind:clientWidth={mainWidth}>
	<h1>EpicRename Generator</h1>

	<div class="main__editor-tab" style="height: {(mainHeight - 50) * 0.6}px;">
		<div class="main__editor-wrapper">
			<textarea bind:value={input} bind:this={editor} class="main__editor"></textarea>
		</div>

		<div class="main__editor-preview-wrapper">
			<div class="main__editor-preview" bind:this={previewTab}>{@html preview}</div>
		</div>

		<div class="main__editor-button-wrapper" bind:this={buttonWrapper}>
			{#each Object.entries(formatCodes) as [key, value]}
				<button class="main__button {value}" on:click={() => format(key)}>{key}</button>
			{/each}
		</div>
	</div>
	<div class="main__output-tab" style="height: {(mainHeight - 50) * 0.3}px;">
		<button class="main__button main__output-button-generate" on:click={generate}>Generate</button>
		<label style="width: 90%; ">
			Make item glow:
			<input type="checkbox" name="glow" bind:checked={glow} />
		</label>
		<textarea bind:value={output} class="main__output-dialog" readonly></textarea>
	</div>
</div>

<style lang="scss">
	//minecraft font
	@font-face {
		font-family: 'minecraft';
		src: url('/fonts/minecraft.ttf') format('truetype');
	}

	.main-wrapper {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;
		font-family: 'minecraft';

		z-index: 5;

		.main__button {
			box-sizing: border-box;
			background-color: #6d6d6d;
			text-shadow: 2px 2px black;
      box-shadow: 10px 10px 15px rgba(black, 0.2);
			border: 3px solid black;

      color: white;
			cursor: pointer;

			&:hover {
				opacity: 0.8;
			}
		}

		//backdrop-filter: blur(2px);
		//-webkit-backdrop-filter: blur(2px);

		.main__editor-tab {
			width: 100%;
			//border: 1px red solid;
			justify-content: space-evenly;
			align-items: flex-start;
			display: flex;
			font-family: 'minecraft';
			font-size: 20px;
			flex-direction: row;
			flex-wrap: wrap;


			.main__editor-button-wrapper {
				box-sizing: border-box;
				padding-left: 20px;
				padding-right: 20px;
				width: 100%;
				height: fit-content;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				//border: 1px red solid;

				button {
					font-size: 16px;
					width: 40px;
					height: 40px;
				}
			}

			//editor tab
			.main__editor-wrapper {
				position: relative;
				width: 40%;
				height: 80%;

				.main__editor {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					//background-color: #f9efd6;
					background-color: #e0d7c0;
					border-radius: 5px;
					//border: 10px solid #833e2a;
					border: 10px solid #461709;
					outline: none;
					padding: 10px;
					resize: none;

          box-shadow: 10px 10px 15px rgba(black, 0.2);
				}
			}

			//preview tab
			.main__editor-preview-wrapper {
				position: relative;
				width: 40%;
				height: 80%;

				.main__editor-preview {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					position: relative;
					line-height: 1.3;

					border-image: linear-gradient(to bottom, rgb(33, 6, 76), rgb(21, 2, 47)) 30;
					border-width: 4px;
					border-radius: 2px;
					border-style: solid;
					background-color: rgb(13, 2, 15, 0.8);

					overflow: auto;
					outline: none;
					max-width: 100%;
					word-break: break-all;

					padding: 10px;

					-webkit-box-shadow: none;
					-moz-box-shadow: none;
          box-shadow: 10px 10px 15px rgba(black, 0.2);

					color: #aa00aa;
					text-shadow: 2px 2px black;
					font-style: italic;

					div,
					:global(span) {
						max-width: 100%;
						word-break: break-all;
					}
				}
			}

			:global(.format-name) {
				color: white;
				font-style: normal;
				font-weight: normal;
				text-decoration: none;

				:global(.format-r) {
					color: white;
					font-style: normal;
					font-weight: normal;
					text-decoration: none;
				}
			}

			:global(.format-0) {
				color: #000000;
				font-style: normal;
			}

			:global(.format-1) {
				color: #0000aa;
				font-style: normal;
			}

			:global(.format-2) {
				color: #00aa00;
				font-style: normal;
			}

			:global(.format-3) {
				color: #00aaaa;
				font-style: normal;
			}

			:global(.format-4) {
				color: #aa0000;
				font-style: normal;
			}

			:global(.format-5) {
				color: #aa00aa;
				font-style: normal;
			}

			:global(.format-6) {
				color: #ffaa00;
				font-style: normal;
			}

			:global(.format-7) {
				color: #aaaaaa;
				font-style: normal;
			}

			:global(.format-8) {
				color: #555555;
				font-style: normal;
			}

			:global(.format-9) {
				color: #5555ff;
				font-style: normal;
			}

			:global(.format-a) {
				color: #55ff55;
				font-style: normal;
			}

			:global(.format-b) {
				color: #55ffff;
				font-style: normal;
			}

			:global(.format-c) {
				color: #ff5555;
				font-style: normal;
			}

			:global(.format-d) {
				color: #ff55ff;
				font-style: normal;
			}

			:global(.format-e) {
				color: #ffff55;
				font-style: normal;
			}

			:global(.format-f) {
				color: #ffffff;
				font-style: normal;
			}

			:global(.format-n) {
				text-decoration: underline;
			}

			:global(.format-l) {
				font-weight: bold;
			}

			:global(.format-o) {
				font-style: italic;
			}

			:global(.format-m) {
				text-decoration: line-through;
			}

			:global(.format-k) {
				opacity: 1;
			}

			:global(.format-r) {
				color: #aa00aa;
				font-style: normal;
				font-weight: normal;
				text-decoration: none;
			}
		}

		.main__output-tab {
			font-family: 'minecraft';
			width: 100%;

			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-direction: column;

			.main__output-button-generate {
				width: 200px;
				height: 50px;
			}

			.main__output-dialog{
				width: 95%;
				height: 60%;

				outline: none;
        box-shadow: 10px 10px 15px rgba(black, 0.2);
				resize: none;
				border: 1px solid var(--color-border-0);
				border-radius: 0.5rem;

				box-sizing: border-box;
				background-color: rgba(var(--Overlay1, 1));
				padding: 10px;


				color: white;
				text-shadow: 2px 2px black;
			}
		}
	}
</style>
