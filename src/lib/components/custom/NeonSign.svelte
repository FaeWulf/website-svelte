<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="title-wrapper behavior--click-through">
	<img class="title__neon-img" src="/neon_logo.webp" alt="Neon logo.webp" />
	<div class="title__text-wrapper">
		<h1 class="title__text-title">
			{title}
		</h1>
		<h3 class="title__text-subtitle">
			{description}
		</h3>
	</div>

</div>

<style lang="scss">

  .title-wrapper {
    width: 100%;
    max-width: 550px;
    margin: 0 0 0.5rem 0;
    height: fit-content;

    display: flex;
    gap: 0.5rem;
    justify-content: center;

    .title__neon-img {
      margin: -10px;
      width: 120px;
      height: 120px;
      filter: drop-shadow(0px 0px 0.8rem rgba(61, 227, 191, 0.35));
      animation: flicker 3s infinite alternate;
    }

    .title__text-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .title__text-title {
        text-align: start;
        margin: 0 0 0.5rem;
        font-weight: bold;
      }

      .title__text-subtitle {
        text-align: start;
        font-weight: normal;
        margin: 0;
      }
    }
  }

  @keyframes flicker {
    0%,
    19%,
    21%,
    100% {
      opacity: 1;
    }

    20% {
      opacity: 0.4;
    }
  }
</style>