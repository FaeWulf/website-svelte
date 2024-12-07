<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import ImagePreview from '$lib/components/custom/ImagePreview/ImagePreview.svelte';

	export let name: string = '';
	export let description: string = '';
	export let url: string = '';
	export let tags: string[] = [];
	export let source: string = '';
	export let previewImg: string = '';
	export let archived: boolean = false;

</script>

{#if !archived}
	<div class="entry">
		<div class="entry-wrapper">
			<div class="entry__preview-wrapper">
				<ImagePreview>
					<img class="entry__preview-img" src="{previewImg}" alt="{name} preview" />
				</ImagePreview>
				<div class="entry__preview-shadow-overlay behavior--click-through" />
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
					{#if url.length > 0}
						<a class="entry__description-link" href="{url}" target="_blank">
							Visit
							<div class="entry__description-link-icon">
								<ExternalLink size="1rem" />
							</div>
						</a>
					{/if}
					{#if source.length > 0}
						<a class="entry__description-link" href="{source}" target="_blank">
							Source Code
							<div class="entry__description-link-icon">
								<ExternalLink size="1rem" />
							</div>
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
  .entry {
    position: relative;

    margin: 4px;

    width: 100%;
    height: 450px;
    min-width: 300px;
    max-width: 400px;

    border-radius: 0.5rem;
    border: 1px solid var(--color-border-0);

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
        background: rgba(var(--Base), 1);

        overflow: hidden;

        .entry__preview-img {
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }

        //Glassmorphism effect
        &::after {
          position: absolute;
          content: '';
          background: rgba(white, 0.15);
          width: 80%;
          height: 100%;
          top: 0;
          left: -120%;

          mask-image: linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%);

          transform: skew(60deg);
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
          height: 110px;
          overflow-y: auto;
          color: rgba(var(--Subtext0), 1);

          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }

        .entry__description-tag-wrapper {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;

          margin-top: 1rem;

          .entry__description-tag-item {
            border-radius: 0.5rem;
            border: 1px solid var(--color-border-0);
            padding: 4px;

            display: flex;
            align-items: center;
            justify-content: center;

            background-color: rgba(var(--Overlay1), 1);
            color: rgba(var(--Subtext0), 1);
            opacity: 0.8;

            .entry__description-tag-text {
              margin: 0;
            }
          }
        }

        .entry__description-link-wrapper {
          position: relative;
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
          font-weight: bold;
          font-size: large;
          justify-content: flex-start;
          align-items: center;

          .entry__description-link {
            position: relative;
            display: flex;
            overflow: hidden;
            transition: color 0.7s ease, transform 0.2s ease-out;

            .entry__description-link-icon {
              margin-left: 5px;
            }

            &:after {
              content: '';
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: -100%;
              opacity: 0.5;
              background-image: linear-gradient(45deg,
                      rgba(white, 0),
                      rgba(white, 0.8),
                      rgba(white, 0)
              );
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }

    &:hover {
      transform: scale(1.005);

      //img effect
      .entry__preview-wrapper {
        .entry__preview-img {
          transform: scale(1.05);
        }

        &::after {
          left: 150%;
          opacity: 0.2;

          transition: left 1s ease,
          opacity 1s ease;
        }

      }

      //link effect
      .entry__description-link {
        color: rgba(var(--Green), 1) !important;
        text-decoration: underline;

        &::after {
          transition: all 0.7s ease;
          left: 100% !important;
        }
      }

    }
  }
</style>