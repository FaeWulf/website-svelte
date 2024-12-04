<script>
	import MetaTags from '$lib/components/custom/MetaTags.svelte';
</script>

<MetaTags
	title="Support | Faewulf's Basement"
	description="Support Faewulf with any kind of donation or support."
	keywords={['faewulf', 'donations', 'support']}
	canonical="https://faewulf.xyz/support"
/>

<div class="post__wrapper behavior--click-through">
	<h1>Support me via</h1>
	<div class="text__brand-wrapper">
		<a href="https://paypal.me/faewulf" target="_blank">
			<img class="text__brand-img" src="/images/brand_logos/paypal.png" alt="paypal logo" />
		</a>
		<div class="text__brand-or">Or</div>
		<a href="https://ko-fi.com/faewulf" target="_blank">
			<img class="text__brand-img" src="/images/brand_logos/kofi.png" alt="kofi logo" />
		</a>
	</div>
	<p class="center">"Every donation or support, no matter the size, is deeply appreciated and incredibly valuable to
		me."</p>
	<p class="center">Thank you very much ❤️</p>
</div>

<style lang="scss">
  .post__wrapper {

    .text--center {
      text-align: center;
    }

    .text__brand-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 25px;

      .text__brand-img {
        height: 60px;
      }

      .text__brand-or {
        font-weight: 600;
        font-size: 25px;
        text-align: center;
      }

      margin-top: 30px;
      margin-bottom: 30px;

      @media (max-width: 520px) {
        flex-direction: column;
        gap: 10px;
      }
    }
  }
</style>
