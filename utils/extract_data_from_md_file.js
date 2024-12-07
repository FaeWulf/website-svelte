const fs = require('fs');
const path = require('path');

// Input and output file paths
const inputFile = './readme.md';
const outputFile = './data.json';

// Function to extract details tags
function extractDetailsFromMarkdown(markdown) {
	const detailsRegex = /<details>\s*<summary>(.*?)<\/summary>\s*(.*?)<\/details>/gs;
	const categoryRegex = /###\s+(.*)/g;

	let match;
	let categories = {};
	let currentCategory = 'Uncategorized';
	let detailsList = [];

	// Extract categories and their indices in markdown
	while ((match = categoryRegex.exec(markdown)) !== null) {
		categories[match.index] = match[1];
	}

	// Extract <details> tags and associate with categories
	while ((match = detailsRegex.exec(markdown)) !== null) {
		const name = match[1].trim();
		const content = match[2].trim();

		const imgMatch = content.match(/<img\s+src="(.*?)"/);
		const descriptionMatch = content.match(/<p>(.*?)<\/p>/s);

		const img = imgMatch ? imgMatch[1].trim() : null;
		const description = descriptionMatch ? descriptionMatch[1].trim() : null;

		// Determine category based on position
		const index = match.index;
		let category = currentCategory;
		for (const catIndex in categories) {
			if (index >= catIndex) category = categories[catIndex];
		}

		// Then push into detailsList
		const category_index = detailsList.findIndex(c => c.name === category);

		if (category_index >= 0) {
			detailsList[category_index].entry.push({ name, img, description });
		} else {
			detailsList.push({ name: category, entry: [{ name, img, description }] });
			//detailsList[category] = [{ name, img, description }];
		}

		//detailsList.push({ category, name, img, description });
	}

	return detailsList;
}

// Main function
function main() {
	// Read Markdown file
	const markdown = fs.readFileSync(inputFile, 'utf-8');

	// Extract details
	const details = extractDetailsFromMarkdown(markdown);

	// Write to JSON file
	fs.writeFileSync(outputFile, JSON.stringify(details, null, 2));
	console.log(`Details extracted and saved to ${path.basename(outputFile)}`);
}

// Run the script
main();
