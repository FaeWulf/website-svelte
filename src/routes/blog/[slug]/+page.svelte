<script>
	export let data;
</script>

<h1>{data.callback.name}</h1>
<div class="content">{@html data.callback.content}</div>

<style>
	.content {
		border: 1px red solid;
		width: 100%;
		overflow-y: scroll;
	}
</style>
