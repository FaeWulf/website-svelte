<script>
	import { page } from '$app/stores';

	export let title = '';
	export let description = '';
	export let keywords = [];
	export let image = 'https://faewulf.xyz/og.webp';

	const domain = 'https//faewulf.xyz';
</script>

<title>{title} | Faewulf's Basement</title>
<meta name="description" content={description}>
<meta name="keywords" content={keywords.join(", ")}>
<meta property="og_site_name" content=“{domain}>
<meta property="og:url" content="{domain}{$page.url.pathname.toString()}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title} | Faewulf's Basement">
<meta property="og:description" content={description}>
<meta property="og:image" content={image}>

<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="{domain}">
<meta property="twitter:url" content="{domain}{$page.url.pathname.toString()}">
<meta name="twitter:title" content="{title} | Faewulf's Basement">
<meta name="twitter:description" content={description}>
<meta name="twitter:image" content={image}>
{@html `  <script type="application/ld+json">{
   "@context": "https://schema.org",
   "@type": "Website",
   "name": "${title} | Faewulf's Basement",
   "url": "${domain}${$page.url.pathname}",
   "logo": ${image}}</script>`}
