<script lang="ts">
	import { onMount } from 'svelte';
	import { titleText } from './store';
	import { slide } from 'svelte/transition';

	let type = '';

	let infoMap: Map<string, { first: string; last: string }> = new Map([
		['email', { first: 'contact@', last: '.xyz' }],
		['discord', { first: '@', last: '' }],
		['steam', { first: '', last: '' }],
		['website', { first: '', last: '.xyz' }],
		['github', { first: 'github.com/', last: '' }],
		['youtube', { first: '', last: '' }]
	]);
	onMount(() => {
		titleText.subscribe((value) => {
			type = value.value;
		});
	});
</script>

<h1>
	{#if type == ''}
		<span transition:slide={{ delay: 0, axis: 'x' }} class="wave">👋</span>
		<span transition:slide={{ delay: 0, axis: 'x' }}>&nbsp;I'm&nbsp;</span>
	{/if}
	{#each [...infoMap] as [key, value]}
		{#if type == key && value.first.length > 0}
			<span transition:slide={{ delay: 0, axis: 'x' }}>{value.first}</span>
		{/if}
	{/each}<span class="hueText name">Faewulf</span>
	{#each [...infoMap] as [key, value]}
		{#if type == key && value.last.length > 0}
			<span transition:slide={{ delay: 0, axis: 'x' }}>{value.last}</span>
		{/if}
	{/each}
</h1>

<style>
	h1 {
		font-weight: 600;
		display: flex;
		overflow: hidden;
		line-height: 3rem;

		margin-top: 10px;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.name {
		margin-left: 0px;
		margin-right: 0px;
	}

	.wave {
		animation-name: wave-animation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
		display: inline-block;
		text-align: center;
	}

	@keyframes wave-animation {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
