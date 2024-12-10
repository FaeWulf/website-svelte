<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - {$page.error.message}</title>
	<meta name="description" content="The page you're looking for does not exist." />
</svelte:head>

<h1>{$page.status} </h1>
<p>"{$page.error?.message}"</p>
<p>Oops! The page you're trying to access doesn’t exist or unable to access.</p>
<a href="/">Return to Home</a>

<style>
    h1 {
        font-size: 4rem;
        font-weight: 600;
    }

    p {
        font-size: 1.2rem;
        margin: 1rem;
    }

    a {
        display: inline-block;
        margin-top: 1rem;
        padding: 1rem 1rem;
        background-color: rgb(var(--Overlay1));
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        color: rgb(var(--Text));
    }

    a:hover {
        background-color: rgb(var(--Green));
    }
</style>