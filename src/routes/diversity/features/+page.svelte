<script lang="ts">
	import Entry from '$lib/components/diversity/entry.svelte';

	import entries from '$lib/data/diversity_data.json';

	let select: number = 1;
	let selectedFilter: string = 'all';

	let tags = [];

	$: updateFilter(select);

	function updateFilter(index: number) {
		tags = [];
		entries[index]?.entry?.forEach(entry => {
			entry.version?.forEach(version => {
				if (tags.indexOf(version) === -1) {
					tags.push(version);
				}
			});
		});
	}
</script>


<h1 class="feature__title">Features</h1>
<a href="/diversity" class=feature__return>⬅️ return Home</a>

<div class="feature-wrapper">
	<ul class="feature__list">
		{#each entries as entry, index}
			<li class="feature__list-entry">
				<button
					class="feature__list-button"
					on:click={() => select = index}
					class:feature__list-button--selected={select === index}
				>
					{entry.name}
				</button>
			</li>
		{/each}
	</ul>
	{#if select >= 0 && select < entries.length}
		<h2 class="feature__showcase-category-name">{entries[select].name}</h2>
		<p class="feature__showcase-category-subtitle">{entries[select]?.entry.length ?? 0} features</p>
		<div class="feature__showcase-filter-wrapper">
			<label class="feature__filter-text" for="Filter">Version:</label>
			<select class="feature__showcase-filter-select" name="Filter" bind:value={selectedFilter}>
				<option value="all">All</option>
				{#each tags as tag}
					<option value="{tag}">{tag}</option>
				{/each}
			</select>
		</div>

		<div class="feature__showcase-entries-list">
			{#each entries[select].entry as entry (entry.name)}
				{#if entry.version?.includes(selectedFilter) || selectedFilter === "all"}
					<Entry name="{entry.name}" description="{entry.description}" version={entry.version}
								 disabled={entry.disabled} img={entry.img} />
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">

  .feature__title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .feature__return {
    font-weight: bold;
    font-size: 1rem;
    color: rgb(var(--Subtext0));
    margin-bottom: 2.5rem;
  }

  .feature-wrapper {
    flex: 1;
    width: 100%;

    .feature__list {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      padding-bottom: 20px;
      margin-bottom: 0;

      border-bottom: 1px solid var(--color-border-0);

      list-style: none;
      gap: 15px;

      .feature__list-entry {
        .feature__list-button {
          padding: 7px 10px 7px 10px;
          cursor: pointer;
          border-radius: 5px;

          &--selected {
            background: rgb(var(--Overlay2));
            color: rgba(var(--Green));
            font-weight: bold;
          }
        }
      }
    }

    .feature__showcase-category-name {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }

    .feature__showcase-category-subtitle {
      width: 100%;
      text-align: center;
      color: rgb(var(--Subtext0));
    }

    .feature__showcase-filter-wrapper {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
    }

    .feature__showcase-entries-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }
  }
</style>