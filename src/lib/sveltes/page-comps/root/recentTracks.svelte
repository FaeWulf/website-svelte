<script lang="ts">
	import { onMount } from 'svelte';
	import { apiURL } from '$lib/store';

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
	<div class="title" id="infotabs-recenttracks">
		🎵 Recent Added Tracks <br />
		<span style="font-size: 0.7rem;">Last update: {lastUpdate}</span>
	</div>
	{#each last5 as track (track.ID)}
		<a class="track" href={track.Link} target="_blank">
			<div class="text-wrapper">
				<div class="text">
					<div class="name">{track.title}</div>
					<div class="artist">{track.artist}</div>
					<div class="duration">{track.time}</div>
				</div>
			</div>

			<div class="text-wrapper highlight">
				<div class="text">
					<div class="name">{track.title}</div>
					<div class="artist">{track.artist}</div>
					<div class="duration">{track.time}</div>
				</div>
			</div>
		</a>
	{/each}
{:else}
	<div>Searching...</div>
{/if}

<div class="dummy" />

<style lang="scss">
  .title {
    flex-basis: 100%;
    text-align: center;
    background-color: rgb(var(--Overlay1));
    border: 1px rgba(var(--Text), 0.2) solid;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 600;
  }

  .track {
    position: relative;
    width: 100%;

    border: 1px rgba(var(--Text), 0.2) solid;
    border-radius: 5px;
    overflow: hidden;

    text-decoration: none;
    color: rgb(var(--Text));

    > div.text-wrapper {
      width: 100%;
      height: fit-content;

      .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        padding: 5px;

        > .duration {
          position: absolute;
          top: 30%;
          right: 10px;
        }

        > .artist {
          font-size: 0.8rem;
          opacity: 0.6;
        }
      }

      &.highlight {
        position: absolute;
        top: 0;
        left: 0;

        width: 0;

        flex-wrap: nowrap;
        text-wrap: nowrap;

        overflow: hidden;

        background-color: rgba(var(--Green), 1);
        color: black;

        transition: width 0.4s ease;
      }
    }

    &:hover {
      div.highlight {
        width: 100%;
      }
    }
  }

  .dummy {
    height: 20px;
    flex-basis: 100%;
  }
</style>
