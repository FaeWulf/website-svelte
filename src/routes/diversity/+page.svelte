<img class="main-page__banner-img" src="/images/diversity/banner.png" alt="Mod's banner" />
<p>Diversity is a Minecraft mod that introduces a wide range of features to enhance the gameplay experience. From
	quality of life improvements to new mob behaviors and random sh*t, this mod offers a little bit of everything. The mod
	is designed to work on server-side only installations as well.</p>

<a href="/diversity/features">
	<button class="button">
		Feature List
	</button>
</a>

<h2 style="margin-top: 5rem">
	Downloads
</h2>

<div class="download-wrapper">
	<a href="https://modrinth.com/mod/faewufs-diversity" target="_blank">
		<button class="button">
			Modrinth
		</button>
	</a>
	<a href="https://www.curseforge.com/minecraft/mc-mods/diversity" target="_blank">
		<button class="button">
			Curseforge
		</button>
	</a>

</div>


<style lang="scss">

  .main-page__banner-img {
    width: 100%;
    height: auto;
    filter: drop-shadow(5px 5px 15px black);
  }

  .download-wrapper {
    display: flex;
    gap: 20px;
  }

  .button {
    background: rgb(var(--Overlay0), 1);
    border-radius: 0.5rem;
    padding: 1rem;
    border: 1px solid var(--color-border-0);
    cursor: pointer;

    font-weight: bold;

    transition: all 0.3s ease;

    &:hover {
      border: 1px solid var(--color-border-primary);
      transform: scale(1.1);
    }
  }
</style>
