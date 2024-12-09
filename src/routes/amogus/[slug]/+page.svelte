<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import LoadingCircle from '$lib/components/custom/LoadingCircle.svelte';
	import Background from '$lib/components/amogus/background.svelte';
	import MetaTags from '$lib/components/custom/MetaTags.svelte';

	export let data;

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

	function amogusimalToDecimal(hexadecimalString: string) {
		// Convert the hexadecimal string to a decimal number
		let amogusToHex = '';
		hexadecimalString.split('').forEach((char) => {
			amogusToHex += Object.keys(amogusValue).find((key) => amogusValue[key] == char);
		});
		return parseInt(amogusToHex, 16);
	}

	function decode(str: string) {
		//split string into groups of 4 chars
		const toCharacters = str.match(/.{1,4}/g);
		let r = '';
		toCharacters?.forEach((char) => {
			r += String.fromCharCode(amogusimalToDecimal(char));
		});
		return r;
	}

	let Redirect = '';
	let time = 6;
	let timeOut: string | number | NodeJS.Timeout | undefined;
	onMount(() => {
		Redirect = decode(data.value);
		timeOut = setInterval(() => {
			time--;
			if (time <= 0) {
				clearInterval(timeOut);
				window.open(Redirect, '_self');
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(timeOut);
	});

	function onclick() {
		window.open(Redirect, '_self');
	}
</script>

<MetaTags
	title="Amongusify | Faewulf's Basement"
	description="Instead of shortening your url, this simple tool will convert urls into a bunch of crew mates."
	keywords={['link converter', 'amongus', 'sus']}
	canonical="https://faewulf.xyz/amogus"
/>

<Background />
<div class="main-wrapper behavior--click-through">
	{#if Redirect}
		<h3>Redirecting after {time} seconds</h3>
		<a href={Redirect}>{Redirect}</a>
		<button on:click={onclick}>Take me there immediately</button>
	{:else}
		<LoadingCircle />
	{/if}
</div>

<style lang="scss">
  .main-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h3 {
    margin-top: 60px;
    font-size: 1.6rem;
    text-align: center;
  }

  a {
    margin-top: 20px;
  }

  button {
    margin: 50px 10px 10px;
    border: 1px solid var(--color-border-secondary);
    border-radius: 0.5rem;
    background: rgba(var(--Overlay1), 1);
    color: rgb(var(--Text));
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: rgba(var(--Overlay2), 0.8);
    }
  }
</style>
