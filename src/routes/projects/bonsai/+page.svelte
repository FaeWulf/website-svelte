<script lang="ts">
	import { onMount } from 'svelte';

	let respone: any;
	onMount(async () => {
		respone = 'http://localhost:3000/api/v1/misc/bonsai?background=0.5&time=40&seed="faewulf"';
	});
</script>

<svelte:head>
	<title>Faewulf's Basement | Projects - Bonsai API</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<h1>Bonsai API</h1>
	<h3>Retieve a bonsai as SVG</h3>
	<p>
		Ported from <a href="https://gitlab.com/jallbrit/cbonsai" target="_blank">cbonsai</a> - a bonsai
		tree generator, written in C using ncurses
	</p>
	<p>Example request</p>
	<code>https://faewulf.xyz/api/v1/misc/bonsai?background=0.5&time=40&seed="faewulf"</code>
	<p>Response (SVG)</p>
	<img src={respone} alt="" />
	<h3>Parameters</h3>
	<table>
		<tr>
			<th>Name</th>
			<th>Default value</th>
			<th>Description</th>
		</tr>
		<tr>
			<td>background</td>
			<td>1</td>
			<td>Background opacity (0-1)</td>
		</tr>
		<tr>
			<td>base</td>
			<td>0</td>
			<td>Tree vase type (0, 1, random)</td>
		</tr>
		<tr>
			<td>time</td>
			<td>0</td>
			<td>Delay time (in ms) between tree growth, 0 = instant growth</td>
		</tr>
		<tr>
			<td>life</td>
			<td>30</td>
			<td>Active branch life, higher = more growth (0-200)</td>
		</tr>
		<tr>
			<td>multiplier</td>
			<td>5</td>
			<td>Branch multiplier, higher = more branching (0-20)</td>
		</tr>
		<tr>
			<td>seed</td>
			<td>random</td>
			<td>Tree seed</td>
		</tr>
	</table>

	<h3>Terms of use</h3>

	<p>
		Be gentle with the server, please :&lt; <br />
		If you want to suggest something, please send me a message via
		<a href="https://discord.com/users/442263875560144896/" target="_blank">Discord</a>
		or <a href="mailto:contact@faewulf.xyz" target="_blank">Email</a>
	</p>
</div>

<style lang="scss">
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);
	}

	code {
		border: 1px solid rgba(var(--Red), 0.5);
		border-radius: 5px;
		background: rgba(var(--Overlay0), 0.2);
		padding: 10px;
	}

	img {
		width: 400px;
		height: 400px;
	}

	table {
		border-collapse: collapse;
		table-layout: fixed;
		margin: 10px;

		td {
			text-align: center;
			vertical-align: middle;
		}

		td,
		th {
			padding: 5px 10px 5px 10px;
		}

		tr:nth-child(odd) {
			background-color: rgba(var(--Overlay0), 0.2);
		}

		th {
			background-color: rgba(var(--Red), 0.3);
		}
	}
</style>
