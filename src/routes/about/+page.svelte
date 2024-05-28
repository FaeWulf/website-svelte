<script>
	import { MetaTags } from 'svelte-meta-tags';
</script>

<svelte:head>
	<MetaTags title="Faewulf's Basement | About" description="About this website" keywords={['about']} canonical="https://faewulf.xyz/about" />
</svelte:head>

<div class="text-column">
	<h1>About this website</h1>

	<p>
		This is a simple website that I have made to learn, practice and research about webdev since 2019.<br />
		<br />
		First version was purely HTML/CSS/JS (served with GitHub Pages).<br />
		-&gt; Then I rebuilt it with Node.js (Express.js/EJS, served with a self-hosted server).<br />
		-&gt; Then I reimplemented it using some popular web frameworks (Reactjs -&gt; Vuejs).<br />
		-&gt; <strong>Then</strong> recently, I discovered a very interesting framework and wanted to give it a try.<br />
	</p>

	<p class="center">
		This website made with <a href="https://kit.svelte.dev">SvelteKit</a> with the loss of multiple braincells 🧠.
	</p>

	<p>
		Yet simple, consistent and legible - in fact, it's incredibly fast.<br />
		In my opinion, Svelte requires less code to accomplish the same task compared to other frameworks. Syntax is easy to read, but .svelte file is a little
		bit weird.<br />
		(Too ideal to get a job, I hate svelte)
	</p>
</div>

<style>
	.center {
		text-align: center;
	}
</style>
