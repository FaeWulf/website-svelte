<script lang="ts">
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';
	import MetaTags from '$lib/sveltes/components/custom/MetaTags.svelte';

	let respone: any;
	onMount(async () => {
		respone = $apiURL + '/api/v1/misc/bonsai?background=0.5&time=40&seed="faewulf"';
	});
</script>

<MetaTags
	title="Bonsai API | Faewulf's Basement"
	description="An API for generating bonsai trees. Ported from cBonsai."
	keywords={['faewulf', 'projects', 'bonsai', 'cbonsai', 'tree', 'generator', 'API']}
	canonical="https://faewulf.xyz/projects/bonsai"
/>

<div class="main-wrapper">
	<h1>Bonsai API</h1>
	<h3>Generate a bonsai as SVG</h3>
	<p>
		Ported from <a href="https://gitlab.com/jallbrit/cbonsai" target="_blank">cbonsai</a> - a bonsai tree generator,
		written in C using ncurses
	</p>
	<p>API endpoint</p>
	<code>https://faewulf.xyz/api/v1/misc/bonsai</code>
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
			<td>-1</td>
			<td>Tree vase type, there are 2 types (-1 = random, 0, 1)</td>
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
  .main-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border: 1px solid rgba(var(--Text), 0.2);
    border-radius: 0.5rem;
    background-color: rgba(var(--Overlay0), 1);

    box-shadow: 10px 10px 15px rgba(black, 0.2);

    z-index: 5;

    //backdrop-filter: blur(2px);
    //-webkit-backdrop-filter: blur(2px);
  }

  code {
    border: 1px solid rgba(var(--Green), 0.5);
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
      background-color: rgba(var(--Overlay1), 0.8);
    }

    th {
      background-color: rgba(var(--Red), 0.3);
    }
  }
</style>
