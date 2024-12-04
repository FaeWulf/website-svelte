<script lang="ts">
	import { slide } from 'svelte/transition';
	import StatusDot from '$lib/components/root/statusDot.svelte';

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

	//invalidate discord Status every 30 seconds
</script>

<div class="title-text">
	{#if type === ''}
		<span transition:slide={{ delay: 0, axis: 'x' }} class="title-text__hand-icon">👋</span>
		<span class="title-text__adjust-height-text" transition:slide={{ delay: 0, axis: 'x' }}>&nbsp;I'm&nbsp;</span>
	{/if}
	{#each [...infoMap] as [key, value]}
		{#if type === key && value.first.length > 0}
			<span class="title-text__adjust-height-text" transition:slide={{ delay: 0, axis: 'x' }}>{value.first}</span>
		{/if}
	{/each}<span class="hueText title-text__brand-name">
		Faewulf
		<StatusDot />
	</span>
	{#each [...infoMap] as [key, value]}
		{#if type === key && value.last.length > 0}
			<span class="title-text__adjust-height-text" transition:slide={{ delay: 0, axis: 'x' }}>{value.last}</span>
		{/if}
	{/each}
</div>

<style lang="scss">
  .title-text {
    font-weight: 600;
    display: flex;
    overflow: hidden;
    line-height: 3rem;
    font-size: 2.4rem;

    margin-top: 10px;
    align-items: flex-end;

    text-wrap: nowrap;

    //-webkit-user-select: none;
    //-ms-user-select: none;
    //user-select: none;
    padding-bottom: 5px;

    .title-text__adjust-height-text {
      line-height: 2.6rem;
    }

    .title-text__brand-name {
      position: relative;
      margin-left: 0;
      margin-right: 0;
      font-family: 'Daydream', 'Tahoma';
      font-size: 2rem;
    }

    .title-text__hand-icon {
      animation-name: wave-animation;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      transform-origin: 70% 70%;
      display: inline-block;
      text-align: center;
    }
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
