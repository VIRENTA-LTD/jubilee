<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	/**
	 * @type {any[]}
	 */
	let furniture = [];
	let filteredFurniture = [];
	let selectedCategory = '';
	let selectedSubcategory = '';

	$: filteredFurniture = selectedCategory
		? furniture.filter(
				(item) =>
					item.category === selectedCategory &&
					(selectedSubcategory ? item.subcategory === selectedSubcategory : true)
			)
		: furniture;

	onMount(async () => {
		const res = await fetch('/furniture.json');
		const furnitureData = await res.json();
		furniture = furnitureData.flatMap(
			(/** @type {{ subcategories: any[]; category: any; }} */ category) =>
				category.subcategories.flatMap((/** @type {{ items: any[]; name: any; }} */ subcat) =>
					subcat.items.map((/** @type {any} */ item) => ({
						...item,
						category: category.category,
						subcategory: subcat.name
					}))
				)
		);

		// Get the category from URL parameters
		const urlParams = new URLSearchParams($page.url.search);
		selectedCategory = urlParams.get('category') || '';
	});

	/**
	 * @param {string} subcategory
	 */
	function filterBySubcategory(subcategory) {
		selectedSubcategory = subcategory;
	}
</script>

<section id="shop" class="py-16">
	<div class="container mx-auto">
		<h2 class="text-3xl font-bold text-blue-500 text-center mb-8">Shop Furniture</h2>

		<!-- Filters -->
		<div class="mb-8">
			<h3 class="text-xl font-bold mb-4">Filters</h3>
			{#if selectedCategory}
				<h4 class="text-lg font-semibold">Category: {selectedCategory}</h4>
				<ul class="flex space-x-4">
					<li>
						<button class="text-blue-500" on:click={() => filterBySubcategory('')}>All</button>
					</li>
					{#each Array.from(new Set(furniture
								.filter((item) => item.category === selectedCategory)
								.map((item) => item.subcategory))) as subcat}
						<li>
							<button class="text-blue-500" on:click={() => filterBySubcategory(subcat)}
								>{subcat}</button
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- Furniture Items -->
		<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredFurniture as item}
				<li class="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
					<img src={item.image} alt={item.name} class="w-full h-48 object-cover mb-4" />
					<h3 class="text-xl font-bold text-gray-800">{item.name}</h3>
					<p class="text-gray-600">${item.price}</p>
					<p class="text-gray-500 text-sm">{item.description}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
