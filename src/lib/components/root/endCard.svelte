<div class="badge-title" id="js-infotabs-project">End of the summary <br />
	<span class="badge-subtitle">Below is some random personal categories</span><br />
	<span class="badge-subtitle">—check them out if you’re interested!</span>
</div>

<div class="badge-dummy" />

<style lang="scss">
  .badge-title {
    flex-basis: 100%;
    text-align: center;
    background-color: rgb(var(--Overlay1));
    border: 1px var(--color-border-0) solid;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 600;


    scroll-snap-align: start;

    color: rgb(var(--Text));

    .badge-subtitle {
      color: rgb(var(--Subtext0));
      font-size: 0.9rem;
    }
  }

  .project-wrapper {
    position: relative;
    width: max-content;
    height: max-content;

    display: block;
    border: 1px var(--color-border-0) solid;
    border-radius: 5px;
    color: rgb(var(--Text));
    background: rgb(var(--Overlay1));
    text-decoration: none;
    overflow: hidden;

    transition: all 0.3s ease;

    .project-name {
      padding: 5px;
    }

    &:hover {
      border: 1px var(--color-border-primary) solid;
      color: rgb(var(--Green));
    }
  }

  .badge-dummy {
    height: 20px;
    flex-basis: 100%;
  }
</style>
