<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { ufoBubble } from '$lib/store';

	let messageInterval: any;

	const messages = ['Hello!', 'Checkout my playlist!', 'Checkout my projects!'];

	onMount(() => {
		messageInterval = setInterval(
			() => {
				const choose = Math.floor(Math.random() * 3);
				if (choose == 0) {
					ufoBubble.set(messages[Math.floor(Math.random() * messages.length)]);
				}
			},
			1 * 60 * 1000
		);
	});

	onDestroy(() => {
		clearInterval(messageInterval);
	});
</script>
