import fs from 'fs';
import path from 'path';

async function readCategoriesFile() {
	const filePath = path.resolve('static/furniture.json');
	if (!fs.existsSync(filePath)) {
		throw new Error('Categories file not found.');
	}
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function GET() {
	try {
		const categories = await readCategoriesFile();
		return new Response(JSON.stringify(categories), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: `Failed to load categories. ${error}` }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

