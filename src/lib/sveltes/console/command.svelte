<script lang="ts">
	export let output: string = '';
	export let input: string = '';
	export let triggerEnter: boolean = false;

	let root = `<span style="color: rgb(var(--Teal))">Host</span>@<span style="color: rgb(var(--Green))">faewulf</span> <span style="color: rgb(var(--Red))" >~$ </span>`;
	const commands = [
		{
			name: 'help',
			description: 'Show commands list'
		},
		{
			name: 'reboot',
			description: 'Restart OS'
		},
		{
			name: 'whoami',
			description: 'a command-line system information tool',
			output: `
        <pre>
 He/him, from Vietnam ♥
 ~want to learn to code everything, sleep, enjoy musics~
        </pre>
        `
		},
		{
			name: 'sysfetch',
			description: 'My current pc spec',
			output: `
<div>&nbsp;</div>
<pre><span style="color:rgb(var(--Teal))">My <> Spec</span></pre>
<pre><span style="color:rgb(var(--Teal))" >-------------</span></pre>
<pre><span style="color:rgb(var(--Teal))" >Host: </span>LENOVO 82AU</pre>
<pre><span style="color:rgb(var(--Teal))" >Kernel: </span>10.0.22000.0</pre>
<pre><span style="color:rgb(var(--Teal))" >Motherboard: </span>LENOVO LNVNB161216</pre>
<pre><span style="color:rgb(var(--Teal))" >Resolution: </span>1920x1080</pre>
<pre><span style="color:rgb(var(--Teal))" >CPU: </span>Intel i7-10750H 2.60GHz</pre>
<pre><span style="color:rgb(var(--Teal))" >GPU: </span>NVIDIA GeForce GTX 1650</pre>
<pre><span style="color:rgb(var(--Teal))" >Memory: </span>16 GiB</pre>
<div>&nbsp;</div>
        `
		},
		{
			name: 'projects',
			description: '<pre>All my personal projects</pre>'
		},
		{
			name: 'git',
			description: 'Github status',
			output: `
        <div>&nbsp;</div>
        <img align="center" src="https://github-readme-stats.vercel.app/api?username=faewulf&show_icons=true&theme=dracula&locale=en" alt="faewulf" />
        <div>&nbsp;</div>
        `
		},
		{
			name: 'bonsai',
			description: 'ported cbonsai, use bonsai -h'
		},
		{
			name: 'donut',
			description: 'Spawn donut.c'
		}
	];

	//function
	function run(trigger: boolean) {
		if (!triggerEnter) return '';

		if (!input || input.length < 1) return '';
		const commandIndex = commands.findIndex((E) => E.name == input);

		const output =
			commandIndex == -1
				? `<div>${root}${input}</div><div><div>Command not found.</div>`
				: `<div>${root}${input}</div><div>${commands[commandIndex].output} </div>`;

		input = '';
		triggerEnter = false;

		return output;
	}

	//dynamic

	$: output += run(triggerEnter);
</script>

{@html output}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="current-line">
	{@html root}
	{input}<span class="cursor">_</span>
</div>

<style>
	.cursor {
		color: rgb(var(--Rosewater));
		animation: blink 1s step-end infinite;
	}

	.current-line {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
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
