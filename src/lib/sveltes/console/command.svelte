<script lang="ts">
	export let output: string = '';
	export let input: string = '';
	export let triggerEnter: boolean = false;
	export let memmory: string[] = [];
	export let memmoryIndex = -1;

	let root = `<span style="color: rgb(var(--Yellow))">Host</span>@<span style="color: rgb(var(--Green))">faewulf</span> <span style="color: rgb(var(--Red))" >~$ </span>`;
	const commands = [
		{
			name: 'help',
			description: 'Show commands list'
		},
		{
			name: 'whoami',
			description: 'Who am I?',
			output: `
        <pre>
He/him, from Vietnam with ♥
Dreams of mastering coding, enjoying every seconds of sleep, and listening musics.
        </pre>
        `
		},
		{
			name: 'sysfetch',
			description: 'My current pc spec',
			output: `
<pre>
<span style="color:rgb(var(--Teal))" >Host: </span>LENOVO 82AU
<span style="color:rgb(var(--Teal))" >Kernel: </span>10.0.22000.0
<span style="color:rgb(var(--Teal))" >Motherboard: </span>LENOVO LNVNB161216
<span style="color:rgb(var(--Teal))" >CPU: </span>Intel i7-10750H 2.60GHz
<span style="color:rgb(var(--Teal))" >GPU: </span>NVIDIA GeForce GTX 1650
<span style="color:rgb(var(--Teal))" >Memory: </span>16 GiB
</pre>
        `
		},
		{
			name: 'git',
			description: 'Github status',
			output: `
        <div>&nbsp;</div>
        <img align="center" style="width: 100%;" src="https://github-readme-stats.vercel.app/api?username=faewulf&show_icons=true&theme=dracula&locale=en" alt="faewulf" />
        <div>&nbsp;</div>
        `
		}
	];

	//function
	function run(trigger?: boolean) {
		if (!triggerEnter) return '';

		if (!input || input.length < 1) return '';
		const commandIndex = commands.findIndex((E) => E.name == input);

		let output =
			commandIndex == -1
				? `<div>${root}${input}</div><div><div>Command not found. Use help for a list of commands</div>`
				: `<div>${root}${input}</div><div>${commands[commandIndex].output} </div>`;

		//if command == "help" show all commands
		if (input == 'help') {
			output = `<div>${root}${input}</div>`;
			for (const command of commands) {
				output += `<div><span style="color: rgb(var(--Teal))">${command.name}</span><span style="color: rgb(var(--Subtext0))"> : ${command.description}</span></div>`;
			}
		}

		//if the last item in memory != input, push it to memory
		if (memmory[memmory.length - 1] != input) {
			memmory.push(input);
		}
		input = '';
		triggerEnter = false;
		memmoryIndex = -1;

		return output;
	}

	//function that set input then trigger run command
	function onClickHelp(command: string) {
		input = command;
		triggerEnter = true;
	}

	//dynamic

	$: output += run(triggerEnter);
</script>

{@html output}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="current-line">
	{@html root}
	{input}<span class="current-line__cursor ">_</span>
	<div class="current-line__command-helper-wrapper">
		{#each commands as command}
			<button class="current-line__command-helper" on:click={() => onClickHelp(command.name)}>{command.name}</button>
		{/each}
	</div>
</div>

<style lang="scss">
  .current-line {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .current-line__cursor {
      color: rgb(var(--Rosewater));
      animation: blink 1s step-end infinite;
    }

    .current-line__command-helper-wrapper {
      margin: 5px;
      display: flex;
      gap: 5px;

      .current-line__command-helper {
        color: rgb(var(--Text));
        background: rgba(var(--Overlay2));
        border: 1px solid var(--color-border-1);
        font-size: 0.7rem;
        border-radius: 4px;
        opacity: 0.7;
        cursor: pointer;

        &:hover {
          opacity: 1;
          border: 1px solid var(--color-border-secondary);
        }
      }
    }
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
