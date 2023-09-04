<script lang="ts">
	import badges from '$lib/bagde.json';
	const skills = badges.skill;
	skills.forEach((skill) => {
		const url = new URL(`../lib/images/badges/${skill.name}.webp`, import.meta.url).href;
		skill.url = url;
	});
</script>

<div class="profile">
	{#each skills as skill (skill.name)}
		<img src={skill.url} alt={skill.name} />
	{/each}
</div>

<style>
	.profile {
		display: flex;
		padding: 5px;

		width: 500px;
		height: 300px;

		flex-wrap: wrap;
		overflow-y: auto;
		overflow-x: hidden;

		justify-content: flex-start;
		justify-items: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		border-radius: 8px;

		border: 1px rgba(var(--Text), 0.2) solid;
		mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
	}

	img {
		border-radius: 5px;
		width: auto;
		height: 28px;
	}
</style>
