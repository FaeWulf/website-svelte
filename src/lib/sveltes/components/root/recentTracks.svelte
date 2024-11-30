<script lang="ts">
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';
	import LoadingCircle from '$lib/sveltes/components/custom/loadingCircle.svelte';

	let last5: any;
	let lastUpdate: string;
	onMount(async () => {
		const url = $apiURL;

		const fetchRecentTrack = await fetch(url + '/api/v1/playlist/last5').then((res) => res.json());

		last5 = fetchRecentTrack.data;

		const fetchlastUpdate = await fetch(url + '/api/v1/playlist/lastupdate').then((res) => res.json());

		lastUpdate = fetchlastUpdate.data;
	});
</script>

{#if last5 && lastUpdate}
	<div class="badge-title" id="js-infotabs-recenttracks">
		🎵 Recent Added Tracks <br />
		<span class="badge-title__description">Last update: {lastUpdate}</span>
	</div>
	{#each last5 as track (track.ID)}
		<a class="track" href={track.Link} target="_blank">
			<div class="post__wrapper">
				<div class="post__description">
					<div class="name">{track.title}</div>
					<div class="track__artist-text">{track.artist}</div>
					<div class="track__duration-text">{track.time}</div>
				</div>
			</div>

			<div class="post__wrapper  post__wrapper--highlight">
				<div class="post__description">
					<div class="name">{track.title}</div>
					<div class="track__artist-text">{track.artist}</div>
					<div class="track__duration-text">{track.time}</div>
				</div>
			</div>
		</a>
	{/each}
{:else}
	<LoadingCircle />
{/if}

<div class="badge-dummy" />

<style lang="scss">
  .badge-title {
    flex-basis: 100%;
    text-align: center;
    background-color: rgb(var(--Overlay1));
    border: 1px rgba(var(--Text), 0.2) solid;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 600;

    .badge-title__description {
      font-size: 0.7rem;
      color: rgb(var(--Subtext0));
    }
  }

  .track {
    position: relative;
    width: 100%;

    border: 1px rgba(var(--Text), 0.2) solid;
    border-radius: 5px;
    overflow: hidden;

    text-decoration: none;
    color: rgb(var(--Text));

    .post__wrapper {
      width: 100%;
      height: fit-content;

      .post__description {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        padding: 5px;

        .track__duration-text {
          position: absolute;
          top: 30%;
          right: 10px;
        }

        .track__artist-text {
          font-size: 0.8rem;
          color: rgb(var(--Subtext0));
        }
      }

      &--highlight {
        position: absolute;
        top: 0;
        left: 0;

        width: 0;

        flex-wrap: nowrap;
        text-wrap: nowrap;

        overflow: hidden;

        background-color: rgba(var(--Green), 1);
        color: black !important;

        transition: width 0.4s ease;
			
        .track__artist-text {
          color: black !important;
        }
      }
    }

    &:hover {
      .post__wrapper--highlight {
        width: 100%;
      }
    }
  }

  .badge-dummy {
    height: 20px;
    flex-basis: 100%;
  }
</style>
