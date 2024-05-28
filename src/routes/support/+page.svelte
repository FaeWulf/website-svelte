<script>
	import { MetaTags } from 'svelte-meta-tags';
</script>

<svelte:head>
	<MetaTags
		title="Support | Faewulf's Basement"
		description="Support Faewulf with any kind of donation or support."
		keywords={['faewulf', 'donations', 'support']}
		canonical="https://faewulf.xyz/support"
	/>
</svelte:head>

<div class="text-column">
	<h1>Support me via</h1>
	<div class="brand">
		<a href="https://paypal.me/faewulf" target="_blank">
			<img src="/images/brand_logos/paypal.png" alt="paypal logo" />
		</a>
		<div class="or-text">Or</div>
		<a href="https://ko-fi.com/faewulf" target="_blank">
			<img src="/images/brand_logos/kofi.png" alt="kofi logo" />
		</a>
	</div>
	<p class="center">"Every donation or support, no matter the size, is deeply appreciated and incredibly valuable to me."</p>
	<p class="center">Thank you very much ❤️</p>
</div>

<style lang="scss">
	.center {
		text-align: center;
	}

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 25px;

		img {
			height: 60px;
		}

		.or-text {
			font-weight: 600;
			font-size: 25px;
			text-align: center;
			flex-grow: 1 0 25%;
		}

		margin-top: 30px;
		margin-bottom: 30px;

		@media (max-width: 520px) {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
