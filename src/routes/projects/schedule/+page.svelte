<script lang="ts">
	import { onMount } from 'svelte';
	import { tooltip } from '$lib/utils';
	import { scale, fade } from 'svelte/transition';
	import { bounceInOut, quintInOut } from 'svelte/easing';

	const weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const rows = ['Cook', 'Wash', 'Clean', 'Wipe'];

	let result_schedule: any = {};

	let rowAvailableEntry: any = {};

	function rowDayNames() {
		return rowAvailableEntry;
	}

	function onClick() {
		let data: any[] = [];
		const forms = document.getElementsByClassName('form');
		Array.from(forms).forEach((form) => {
			let formData: any = {};

			formData['name'] = (form.querySelector('input[name="name"]') as any).value;
			rows.forEach((row) => {
				const checkboxes = form.querySelectorAll(`input[name="${row}"]:checked`);
				formData[row] = Array.from(checkboxes).map((checkbox: any) => checkbox.value);
			});

			data.push(formData);
		});

		// for each rows, push all data[id].name that data[row] includes the current weekday
		//rowAvailableEntry: {
		// row -> weekday -> name
		//}
		rowAvailableEntry = {};
		rows.forEach((row) => {
			rowAvailableEntry[row] = {};
			weekDay.forEach((day) => {
				rowAvailableEntry[row][day] = [];

				data.forEach((entry: any) => {
					if (entry[row].includes(day)) {
						rowAvailableEntry[row][day].push(entry.name);
					}
				});
			});
		});

		//console.log(rowAvailableEntry);
		//make an array contains all data[i].name, that array uses to count rows
		//entryAvailableJobCount {
		//   name -> row -> count
		//}
		let entryAvailableJobCount: any = {};
		data.forEach((element) => {
			entryAvailableJobCount[element.name] = {};
			rows.forEach((row) => {
				entryAvailableJobCount[element.name][row] = 0;
			});
		});

		function checkCount(array: any, row: string) {
			let result = 0;
			let count = 0;
			//console.log(array);
			Object.entries(array).forEach((entry) => {
				const [key, value]: any = entry;
				count++;
				result += value[row];
			});

			//if result / count is rounded, then result = ceil + 1, else ceil
			return Math.floor(result / count) + 1;
		}

		function getLowestCount(array: any, nameArray: any, row: string) {
			let min = -1;
			let result = undefined;
			//console.log(nameArray);

			//get min value
			Object.entries(array).forEach((entry) => {
				const [key, value]: any = entry;
				if (nameArray.includes(key)) {
					if (min > value[row]) {
						min = value[row];
					}
				}
			});

			//return first name that has value == min
			let aaray = Object.entries(array);
			for (let i = 0; i < aaray.length; i++) {
				const [key, value]: any = aaray[i];
				if (nameArray.includes(key) && value[row] == min) {
					//console.log(key + ', min: ' + min);
					result = key;
					break;
				}
			}

			//if result is undefined, return random name
			if (result === undefined) {
				result = nameArray[Math.floor(Math.random() * Object.keys(nameArray).length)];
			}

			return result;
		}

		function alreadyHaveJob(schedule: any, day: string, name: string) {
			let result = false;

			let entries = Object.entries(schedule);
			for (let i = 0; i < entries.length; i++) {
				let entry: any = entries[i];
				let [key, values] = entry;
				if (values[day] == name) {
					result = true;
					break;
				}
			}
			return result;
		}

		//console.log(rowAvailableEntry);

		//console.log(entryAvailableJobCount);
		//irterate through weekdays: then on each row, choose random name then push to that [weekday][row] and count how many times each name appears
		result_schedule = {};
		rows.forEach((row) => {
			result_schedule[row] = {};
		});

		//console.log(priorityWeekDaySort);
		//console.log(weekDay);

		//create an array that contains data structure: { row, weekday, names (aray name on that [row][weekday]) }
		let schedule_entries: any = [];

		rows.forEach((row) => {
			weekDay.forEach((day) => {
				schedule_entries.push({
					row,
					day,
					names: rowAvailableEntry[row][day]
				});
			});
		});

		schedule_entries.sort((a: any, b: any) => {
			return a.names.length - b.names.length;
		});

		//console.log(schedule_entries);

		schedule_entries.forEach((entry: any) => {
			//sort weekDay based on rowAvailableEntry[row][weekday] sum count
			let day = entry.day;
			let row = entry.row;
			let names = entry.names;

			let list = names.sort(() => 0.5 - Math.random());

			let name: string | undefined = undefined;
			while (list.length > 0) {
				name = getLowestCount(entryAvailableJobCount, list, row);
				//remove name from list
				list = list.filter((n: any) => n != name);

				let currentJobVal = checkCount(entryAvailableJobCount, row);

				if (name && alreadyHaveJob(result_schedule, day, name)) {
					name = 'M';
					console.log('have');
					continue;
				}

				if (name && entryAvailableJobCount[name][row] < currentJobVal) {
					entryAvailableJobCount[name][row] += 1;
					break;
				}
			}

			result_schedule[row][day] = name;
			//r.push(row + ' - ' + day + ': ' + name);
		});
		/*
		rows.forEach((row) => {
			result_schedule[row] = {};

			//sort weekDay based on rowAvailableEntry[row][weekday] sum count
			let priorityWeekDaySort = weekDay.toSorted((a, b) => {
				return rowAvailableEntry[row][a].length - rowAvailableEntry[row][b].length;
			});

			//console.log(priorityWeekDaySort);

			priorityWeekDaySort.forEach((day) => {
				let list = rowAvailableEntry[row][day].sort(() => 0.5 - Math.random());

				let name: string | undefined = undefined;
				while (list.length > 0) {
					name = getLowestCount(entryAvailableJobCount, list, row);
					//remove name from list
					list = list.filter((n: any) => n != name);

					let currentJobVal = checkCount(entryAvailableJobCount, row);

					if (name && entryAvailableJobCount[name][row] < currentJobVal) {
						entryAvailableJobCount[name][row] += 1;
						break;
					}
				}

				result_schedule[row][day] = name;
				//r.push(row + ' - ' + day + ': ' + name);
			});
		});
        */

		console.log('result: ', result_schedule);
	}
	let index = 2;
	let formElements = [1];
	function addForm() {
		formElements = [...formElements, index];
		index++;
	}

	function tdOnClick(event: any) {
		let checkbox = event.target.childNodes[0].checked;
		event.target.childNodes[0].checked = !checkbox;
	}

	//$: console.log(formElements);
</script>

<svelte:head>
	<title>Faewulf's Basement | Projects - Scheduler</title>
	<meta name="description" content="About this website" />
</svelte:head>

<div class="main">
	<div class="controller">
		{#if result_schedule}
			<table class="result-table">
				<tr>
					<th>Type</th>
					{#each weekDay as day}
						<th>{day}</th>
					{/each}
				</tr>
				{#each rows as row}
					<tr>
						<td class="row-label">{row}</td>
						{#each weekDay as day}
							<td>
								{#if result_schedule[row]}
									{#if result_schedule[row][day]}
										<select class="drop-down">
											<option selected={true}>{result_schedule[row][day]}</option>
											{#each rowAvailableEntry[row][day] as name}
												{#if name != result_schedule[row][day]}
													<option>{name}</option>
												{/if}
											{/each}
										</select>
									{:else}
										x
									{/if}
								{:else}
									{' '}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</table>
		{/if}
		<button
			class="controller-button"
			style="margin-left: 10px;"
			title="New entry"
			use:tooltip={{
				theme: 'catppuccin',
				animation: 'scale'
			}}
			on:click={addForm}>+</button
		>
		<button
			class="controller-button"
			title="Generate"
			use:tooltip={{
				theme: 'catppuccin',
				animation: 'scale'
			}}
			on:click={onClick}>Generate</button
		>
	</div>

	<div class="forms-container">
		{#each formElements as form (form)}
			<form
				in:scale={{ duration: 500, easing: bounceInOut, opacity: 0 }}
				out:fade={{ duration: 500, easing: quintInOut }}
				id="form-{form}"
				method="post"
				class="form"
				on:submit={(e) => e.preventDefault()}
			>
				<button
					class="delete-button-form"
					aria-label="Delete this"
					type="button"
					title="Delete this"
					use:tooltip={{
						theme: 'catppuccin',
						animation: 'scale'
					}}
					on:click={(e) => (formElements = formElements.filter((f) => f !== form))}>x</button
				>
				<div class="name-container">
					<label for="name" style="font-weight: 800;">Name</label><br />
					<input type="text" name="name" required />
				</div>
				<table>
					<tr>
						<th>Type</th>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
					</tr>
					{#each rows as row}
						<tr>
							<td class="row-label">{row}</td>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Mon" type="checkbox" /></td
							>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Tue" type="checkbox" /></td
							>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Wed" type="checkbox" /></td
							>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Thu" type="checkbox" /></td
							>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Fri" type="checkbox" /></td
							>
							<td on:click={tdOnClick}
								><input class="checkBox" name={row} value="Sat" type="checkbox" /></td
							>
						</tr>
					{/each}
				</table>
			</form>
		{/each}
	</div>
</div>

<style>
	.main {
		flex: 1;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		border: 1px solid rgba(var(--Text), 0.2);
	}

	.controller {
		width: calc(100% - 10px);
		min-height: 200px;
		border: 1px solid rgba(var(--Text), 0.2);
		margin-bottom: 10px;
		padding: 5px;
	}

	.controller-button {
		font-size: 1.5rem;
	}

	.forms-container {
		width: 100%;
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		justify-content: space-around;
		align-items: flex-start;
		align-content: flex-start;
	}

	.forms-container input {
		background-color: rgba(var(--Overlay0), 0.5);
		border: 1px solid rgba(var(--Text), 0.2);
		color: rgb(var(--Text));
	}

	.forms-container input:focus {
		outline: none;
	}

	.form {
		position: relative;
		width: fit-content;
		max-width: calc(100% / 2 - 20px);
		min-width: 380px;
		min-height: 200px;
		height: fit-content;
		border: 1px solid rgba(var(--Overlay0), 0.5);
	}

	.delete-button-form {
		margin-right: 10px;
		margin-top: 10px;
		position: absolute;
		right: 0;
		top: 0;

		background-color: rgb(var(--Overlay2));
		width: 20px;
		height: 20px;
		text-align: center;
		border: red;

		cursor: pointer;
	}

	.delete-button-form:hover {
		background-color: rgb(var(--Red));
		color: rgb(var(--Text));
	}

	.name-container {
		margin-left: 10px;
		margin-top: 10px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	table,
	th,
	td {
		border: 1px solid rgba(var(--Text), 0.4);
	}

	table {
		width: calc(100% - 20px);
		border-collapse: collapse;
		table-layout: fixed;
		margin: 10px;
	}

	td {
		text-align: center;
		vertical-align: middle;
	}

	.checkBox {
		pointer-events: none;
	}

	.drop-down {
		width: 100%;
		background-color: rgba(var(--Overlay0), 0);
		color: rgb(var(--Text));
		border-radius: 0px;
		margin: 0;

		outline: 0px;
		border: none;

		box-shadow: none;

		text-align: center;
		cursor: pointer;
	}

	tr {
		height: 30px;
	}

	tr:nth-child(odd) {
		background-color: rgba(var(--Overlay0), 0.2);
	}

	th {
		background-color: rgba(var(--Red), 0.3);
	}
</style>
