<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
</script>

<div class="loader--spin">
	<LoaderCircle />
</div>

<style lang="scss">
  .loader--spin {
    line-height: 0;
    animation: spin 1.5s infinite linear;
    width: max-content;
    height: max-content;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
