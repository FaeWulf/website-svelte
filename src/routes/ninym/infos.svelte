<script lang="ts">
	const search = ['Minigames', 'Images search', 'Anime search', 'Manga search'];
	const iamge_processing = ['blur', 'clahe', 'convole', 'gamma', 'invert', 'grayscale', 'flip', 'flop', 'rotate'];
	const cipher = ['a1z26', 'affine', 'bacon', 'Caesar', 'Rot13'];
	const converter = [
		'number base2',
		'number base8',
		'number base10',
		'number base16',
		'color HSV',
		'color RGB',
		'color HEX',
		'color HSL',
		'speed ft/s',
		'speed km/h',
		'speed mph',
		'speed knot',
		'speed m/s',
		'temperature \'C',
		'temperature \'F',
		'temperature \'K'
	];
	const text = ['compare', 'modify', 'overview'];
	const other = ['OCR', 'color from image', 'cron parser', 'decode url', 'hash'];
	const generator = ['timestamp', 'loremipsum', 'random number', 'random string', 'random UUID', 'random password', 'random ranexp'];
</script>

<div class="profile">
	<div class="profile__badge-title">⭐ Search</div>
	{#each search as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Image processing</div>
	{#each iamge_processing as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Ciphers</div>
	{#each cipher as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Converters</div>
	{#each converter as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Text</div>
	{#each text as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Generators</div>
	{#each generator as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__badge-title">⭐ Other</div>
	{#each other as feature (feature)}
		<div draggable="false" class="profile__badge-feature">{feature}</div>
	{/each}
	<div class="profile__dummy" />
</div>

<style lang="scss">
  .profile {
    display: flex;

    width: calc(100% - 12px);
    height: calc(100% - 12px);

    max-width: 350px;
    max-height: 300px;

    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;

    padding: 5px;
    gap: 5px;

    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    border-radius: 0.5rem;

    border: 1px rgba(var(--Lavender), 0.2) solid;
    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    -webkit-mask-image: -webkit-linear-gradient(to bottom, black 70%, transparent 100%);

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    opacity: 0.6;
    transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      opacity: 1;
    }

    .profile__badge-title {
      flex-basis: 100%;
      text-align: center;
      background-color: rgb(var(--Overlay1));
      border: 1px rgba(var(--Text), 0.2) solid;
      border-radius: 0.5rem;
      padding-top: 5px;
      padding-bottom: 5px;
      font-weight: 600;
    }

    .profile__badge-feature {
      box-sizing: border-box;

      border-radius: 0.5rem;
      padding: 5px 10px 5px 10px;
      width: auto;
      height: 28px;

      display: flex;
      justify-content: center;
      align-items: center;

      border: 1px solid rgba(var(--Text), 0.2);
      background: rgba(var(--Overlay1), 0.4);
    }

    .profile__dummy {
      height: 50px;
      flex-basis: 100%;
    }
  }
</style>
