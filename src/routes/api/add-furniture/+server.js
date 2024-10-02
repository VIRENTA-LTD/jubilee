import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
	const newFurniture = await request.json();
	const filePath = path.resolve('static/furniture.json');

	// Read the existing furniture data
	const furnitureData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

	// Find the category and subcategory where the item will be added
	const categoryIndex = furnitureData.findIndex((/** @type {{ category: any; }} */ cat) => cat.category === newFurniture.category);
	if (categoryIndex !== -1) {
		const subcategoryIndex = furnitureData[categoryIndex].subcategories.findIndex(
			(/** @type {{ name: any; }} */ sub) => sub.name === newFurniture.subcategory
		);

		if (subcategoryIndex !== -1) {
			// Add the new furniture item to the respective subcategory
			furnitureData[categoryIndex].subcategories[subcategoryIndex].items.push({
				name: newFurniture.name,
				price: newFurniture.price,
				description: newFurniture.description,
				image: newFurniture.image, // Ensure you provide this in the request
				dimensions: {
					width: newFurniture.width,
					height: newFurniture.height,
					depth: newFurniture.depth
				},
				material: newFurniture.material,
				color: newFurniture.color
			});
		} else {
			return new Response(JSON.stringify({ status: 'error', message: 'Subcategory not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} else {
		return new Response(JSON.stringify({ status: 'error', message: 'Category not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Save the updated data back to the file
	fs.writeFileSync(filePath, JSON.stringify(furnitureData, null, 2));

	return new Response(JSON.stringify({ status: 'success' }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
