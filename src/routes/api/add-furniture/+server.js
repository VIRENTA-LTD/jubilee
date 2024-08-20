import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
	const newFurniture = await request.json();
	const filePath = path.resolve('static/furniture.json');

	// Read the existing furniture data
	const furnitureData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

	// Add the new furniture item
	furnitureData.push(newFurniture);

	// Save the updated data back to the file
	fs.writeFileSync(filePath, JSON.stringify(furnitureData, null, 2));

	return new Response(JSON.stringify({ status: 'success' }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
