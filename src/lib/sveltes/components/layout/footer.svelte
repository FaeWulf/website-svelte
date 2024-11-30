<script lang="ts">
	//useless string
	function randomStringNum() {
		let result = '';
		for (let i = 1; i < 6; i++) {
			result += ' ' + Math.floor(Math.random() * 100).toString();
		}

		return result;
	}
</script>

<p>{randomStringNum()}</p>
