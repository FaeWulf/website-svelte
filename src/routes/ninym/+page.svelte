<script lang="ts">
	import Logo from './logo.svelte';
	import Infos from './infos.svelte';

	function onClick() {
		window.open(
			'https://discord.com/api/oauth2/authorize?client_id=874974280495026186&permissions=1071631366721&scope=bot',
			'_blank'
		);
	}
</script>

<svelte:head>
	<title>Faewulf's Basement | Ninym Ralei</title>
	<meta name="description" content="Discord bot" />
</svelte:head>

<Logo />
<h1>Ninym Ralei</h1>
<h3>Personal Simple Discord bot</h3>
<Infos />
<button on:click={onClick}>Invite to Discord</button>

<style lang="scss">
	h1 {
		font-size: 3.2rem;
		font-weight: 800;
	}

	h3 {
		margin-top: -10px;
	}

	button {
		box-sizing: border-box;

		font-size: 1rem;
		background: none;

		border: 2px solid rgba(var(--Lavender), 0.8);
		color: rgb(var(--Text));

		cursor: pointer;
		padding: 10px 20px 10px 20px;
		height: 50px;
		margin-top: 20px;

		transition: all 0.2s ease-in-out;

		&:hover {
			transform: scale(1.1);
			background: rgba(var(--Lavender), 0.3);
			border: 2px solid rgba(var(--Blue), 0.8);
		}
	}
</style>
