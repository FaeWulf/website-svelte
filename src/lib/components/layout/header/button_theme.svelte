<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/store';
	import { onMount } from 'svelte';
	import { tooltip } from '$lib/utils';

	let darkMode = true;

	$: theme.set(darkMode ? 'dark' : 'light');

	onMount(() => {
		//local storage is used to override OS theme settings
		let themeMode = 'light';

		if (localStorage.getItem('theme')) {
			if (localStorage.getItem('theme') === 'dark') {
				themeMode = 'dark';
			}
		} else if (!window.matchMedia) {
			themeMode = 'dark';
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			//OS theme setting detected as dark
			themeMode = 'dark';
		}

		darkMode = themeMode === 'dark';

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	});

</script>

<button
	class="behavior--reset-button toggle-button"
	aria-label="Theme switch button"
	on:click={() => {
		darkMode = !darkMode;

		if(darkMode)
			theme.set("dark")
		else
			theme.set("light")

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	}}
	use:tooltip={{
					content: 'Chagne theme',
					theme: 'catppuccin',
					animation: 'scale'
				}}
>
	{#if darkMode}
		<div class="toggle-button__icon" in:scale={{ duration: 200, easing: quintOut }}
				 out:scale={{ duration: 200, easing: quintOut }}>
			<Moon />
		</div>
	{:else}
		<div class="toggle-button__icon" in:scale={{ duration: 200, easing: quintOut }}
				 out:scale={{ duration: 200, easing: quintOut }}>
			<Sun />
		</div>
	{/if}
</button>

<style lang="scss">
  .toggle-button {
    position: relative;
    margin: 0;
    padding: 0;
    line-height: 0;

    width: 24px;
    height: 24px;

    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    .toggle-button__icon {
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
</style>
