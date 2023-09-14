<script lang="ts">
	import { slide } from 'svelte/transition';
	import { tooltip } from '$lib/utils';

	export let titleChanger = '';

	//dynamic var to change title when titleChangeer changed value
	$: type = titleChanger;

	let infoMap: Map<string, { first: string; last: string }> = new Map([
		['email', { first: 'contact@', last: '.xyz' }],
		['discord', { first: '@', last: '' }],
		['steam', { first: '', last: '' }],
		['website', { first: '', last: '.xyz' }],
		['github', { first: 'github.com/', last: '' }],
		['youtube', { first: '', last: '' }]
	]);
</script>

<div class="title">
	{#if type == ''}
		<span transition:slide={{ delay: 0, axis: 'x' }} class="wave">👋</span>
		<span class="adjust-height" transition:slide={{ delay: 0, axis: 'x' }}>&nbsp;I'm&nbsp;</span>
	{/if}
	{#each [...infoMap] as [key, value]}
		{#if type == key && value.first.length > 0}
			<span class="adjust-height" transition:slide={{ delay: 0, axis: 'x' }}>{value.first}</span>
		{/if}
	{/each}<span class="hueText name"
		>Faewulf
		<div
			class="status"
			use:tooltip={{
				content: "I'm Offline!",
				theme: 'catppuccin',
				animation: 'scale'
			}}
		/>
	</span>
	{#each [...infoMap] as [key, value]}
		{#if type == key && value.last.length > 0}
			<span class="adjust-height" transition:slide={{ delay: 0, axis: 'x' }}>{value.last}</span>
		{/if}
	{/each}
</div>

<style>
	.title {
		font-weight: 600;
		display: flex;
		overflow: hidden;
		line-height: 3rem;
		font-size: 2.4rem;

		margin-top: 10px;
		align-items: flex-end;

		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		padding-bottom: 5px;
	}

	.name {
		position: relative;
		margin-left: 0px;
		margin-right: 0px;
		font-family: 'Daydream', 'Tahoma';
		font-size: 2rem;
	}

	.wave {
		animation-name: wave-animation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
		display: inline-block;
		text-align: center;
	}

	.adjust-height {
		line-height: 2.6rem;
	}

	.status {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		background: red;
		border: 2px solid rgba(var(--Overlay0), 0.4);
		border-radius: 50%;
		cursor: pointer;
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
