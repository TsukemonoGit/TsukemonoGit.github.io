import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const csvPath = path.join(root, 'static', 'data.csv');
const jsonPath = path.join(root, 'src', 'lib', 'generated', 'data.json');

// Ensure output directory exists
const jsonDir = path.dirname(jsonPath);
if (!fs.existsSync(jsonDir)) {
	fs.mkdirSync(jsonDir, { recursive: true });
}

// Read CSV
const csv = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csv.trim().split('\n');
if (lines[0].startsWith('\uFEFF')) {
	lines[0] = lines[0].slice(1);
}

const headers = lines[0].split(',');

const projects = [];
for (let i = 1; i < lines.length; i++) {
	const fields = [];
	let current = '';
	let inQuotes = false;
	
	for (let j = 0; j < lines[i].length; j++) {
		const char = lines[i][j];
		if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === ',' && !inQuotes) {
			fields.push(current.trim());
			current = '';
		} else {
			current += char;
		}
	}
	fields.push(current.trim());
	
	const obj = {};
	headers.forEach((h, idx) => {
		// Convert literal \n sequences to actual newline characters
		obj[h.trim()] = (fields[idx] || '').replace(/\\n/g, '\n');
	});
	
	projects.push(obj);
}

// Write JSON
fs.writeFileSync(jsonPath, JSON.stringify(projects, null, 2), 'utf-8');

console.log(`✅ Generated ${projects.length} projects to ${jsonPath}`);
