<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	export let name: string = '';
	export let description: string = '';
	export let url: string = '';
	export let tags: string[] = [];
	export let source: string = '';
	export let previewImg: string = '';
	export let archived: boolean = false;


	description = 'I designed and built the website for Ruby, a news app for Apple devices. It includes a marketing page and a blog. Built with Next.js,Tailwind CSS, and Content Collections.Tailwind CSS';
	tags = ['css', 'scss', 'svelte', 'typescript', 'bunsh'];

	previewImg = '/images/projects/bonsai.webp';
	archived = true;
</script>

<div class="entry">
	<div class="entry-wrapper">
		<div class="entry__preview-wrapper">
			<img class="entry__preview-img" src="{previewImg}" alt="{name} preview" />
			<div class="entry__preview-shadow-overlay" />
		</div>
		<div class="entry__description">
			<h2 class="entry__description-title">{name}</h2>
			<p class="entry__description-text">{description}</p>
			<div class="entry__description-tag-wrapper">
				{#each tags as tag, index (tag)}
					<div class="entry__description-tag-item">
						<span class="entry__description-tag-text">{tag}</span>
					</div>
				{/each}
			</div>

			<div class="entry__description-link-wrapper">
				<a class="entry__description-link" href="{url}">
					Visit
					<div class="entry__description-link-icon">
						<ExternalLink Size="1rem" />
					</div>
				</a>
				<a href="{source}">Source</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
  .entry {
    position: relative;

    margin: 4px;

    width: 100%;
    height: 450px;
    min-width: 300px;
    max-width: 400px;

    border-radius: 0.5rem;
    border: 1px rgba(var(--Text), 0.1) solid;

    background: rgba(var(--Overlay0), 1);
    box-shadow: 2px 2px 10px rgba(black, 0.4);

    transition: transform 0.3s ease;

    .entry-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-rows: 3fr 4fr;

      .entry__preview-wrapper {
        position: relative;
        grid-row-start: 1;

        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;

        overflow: hidden;

        .entry__preview-img {
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }

        //Glassmorphism effect
        &::after {
          content: '';
          background: rgba(white, 0.2);
          width: 40%;
          height: 100%;
          top: 0;
          left: -120%;

          transform: skew(60deg);

          position: absolute;

        }

        .entry__preview-shadow-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;

          background: rgba(0, 0, 0, 0.7);

          mask-image: linear-gradient(to bottom, transparent 60%, black 100%);
          -webkit-mask-image: -webkit-linear-gradient(to bottom, transparent 60%, black 100%);
        }
      }

      .entry__description {
        grid-row-start: 2;
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;

        background: rgba(var(--Overlay0), 1);
        border-top: 1px rgba(var(--Text), 0.1) solid;

        padding: 15px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .entry__description-title {
          margin: 0;
          line-height: 2rem;
        }

        .entry__description-text {
          margin: 0;
          flex-grow: 1;
          max-height: 145px;
          overflow-y: auto;
          color: rgba(var(--Subtext0), 1);
        }

        .entry__description-tag-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          margin-top: 1rem;

          .entry__description-tag-item {
            border-radius: 0.5rem;
            border: 1px rgba(var(--Text), 0.3) solid;
            padding: 4px;

            display: flex;
            align-items: center;
            justify-content: center;

            background-color: rgba(var(--Overlay0), 1);
            color: rgba(var(--Subtext0), 1);

            .entry__description-tag-text {
              margin: 0;
            }
          }
        }

        .entry__description-link-wrapper {

          display: flex;
          gap: 10px;
          margin-top: 1rem;

          .entry__description-link {
            display: flex;

            .entry__description-link-icon {
              width: 1rem;
              height: 1rem;
            }
          }
        }
      }
    }

    &:hover {
      transform: scale(1.005);

      .entry__preview-wrapper {
        .entry__preview-img {
          transform: scale(1.05);
        }

        &::after {
          left: 150%;
          opacity: 0.2;

          transition: left 0.5s ease,
          opacity 0.5s ease;
        }
      }


    }
  }
</style>