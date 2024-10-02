<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '$lib/Footer.svelte';

	let activeTab = 'furniture';
	let sidebarOpen = false;

	// Furniture form data
	let name = '',
		price = '',
		category = '',
		subcategory = '',
		description = '',
		material = '',
		color = '',
		width = '',
		height = '',
		depth = '';

	// Categories and subcategories data
	let categories: any[] = [];
	let subcategories: any[] = [];
	let subcategoryNames: String;
	let newCategory = '',
		newSubcategory = '',
		selectedCategory = '';

	async function fetchCategories() {
		try {
			const response = await fetch('/api/categories');
			const data = await response.json();
			categories = data;
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	}

	function getSubcategories(categoryName: any) {
		const foundCategory = categories.find((cat) => cat.name === categoryName);
		if (foundCategory) {
			return foundCategory.subcategories;
		}
		return [];
	}

	function handleCategorySelect(categoryName: string) {
		const subcategoryObjects = getSubcategories(categoryName); // Fetch the subcategory objects
		subcategories = subcategoryObjects.map((subcat: { name: string }) => subcat.name); // Map to get only the names
	}

	async function addFurniture() {
		const furniture = {
			name,
			price,
			category,
			subcategory,
			description,
			material,
			color,
			dimensions: { width, height, depth }
		};
		await fetch('/api/add-furniture', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(furniture)
		});
		resetFurnitureForm();
		alert('Furniture added successfully!');
	}

	function resetFurnitureForm() {
		name =
			price =
			category =
			subcategory =
			description =
			material =
			color =
			width =
			height =
			depth =
				'';
	}

	async function addCategory() {
		const newCategoryData = { category: newCategory, subcategories: [newSubcategory] };
		await fetch('/api/add-category', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newCategoryData)
		});
		newCategory = newSubcategory = '';
		fetchCategories();
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		if (window.innerWidth <= 768) {
			sidebarOpen = false;
		}
	}

	onMount(fetchCategories);
</script>

<div class="relative">
	<!-- Top Navbar -->
	<div class="w-full text-mainGreen py-4 px-6 flex justify-between items-center">
		<button class="md:hidden" on:click={toggleSidebar}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-8 h-8 transform scale-x-[-1]"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
			</svg>
		</button>
		<h1 class="text-xl md:text-center md:w-full md:text-2xl md:font-extrabold font-bold">
			Jubilee Furnitures
		</h1>
	</div>

	<!-- Main Layout with Collapsible Sidebar -->
	<div class="flex overflow-auto">
		<!-- Sidebar (collapsible) -->
		<div
			class={`fixed inset-y-0 left-0 z-20 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}
		>
			<div class="px-6 py-4 text-2xl font-bold flex justify-between items-center">
				<span class="md:mt-8">Dashboard</span>
				<button class="md:hidden pl-10 text-white" on:click={toggleSidebar}>
					<!-- Close button for small screens -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<nav class="mt-6 px-4">
				<ul>
					<hr />
					<li class="my-3">
						<button
							on:click={() => {
								activeTab = 'furniture';
								closeSidebar();
							}}
							class={` font-normal md:font-bold text-lg md:text-xl block w-full rounded-lg px-6 py-2 text-left ${activeTab === 'furniture' ? 'bg-mainGreen text-white' : 'hover:bg-mainGreen'} focus:outline-none`}
						>
							Add Furniture
						</button>
					</li>
					<hr />
					<li class="my-3">
						<button
							on:click={() => {
								activeTab = 'category';
								closeSidebar();
							}}
							class={` font-normal  md:font-bold text-lg block rounded-lg w-full px-6 py-2 text-left ${activeTab === 'category' ? 'bg-mainGreen text-white' : 'hover:bg-mainGreen'} focus:outline-none`}
						>
							Add Category
						</button>
					</li>
					<hr />
				</ul>

				<button
					on:click={() => alert('Logging out...')}
					class="block mt-10 rounded-lg w-full px-6 py-2 text-center font-bold text-lg bg-mainGreen focus:outline-none"
				>
					Logout
				</button>
			</nav>
		</div>

		<!-- Content Area -->
		<div class="flex-1 md:ml-64 py-8 px-4">
			<!-- Add Furniture Tab -->

			{#if activeTab === 'furniture'}
				<div class="mx-auto md:w-1/2 py-8 px-2">
					<h2 class="text-2xl font-bold mb-6 text-center">Add Furniture</h2>
					<form on:submit|preventDefault={addFurniture} class="space-y-4 overflow-auto px-2">
						<!-- Category Select -->
						<div class="mb-4">
							<label class="block mb-2 text-sm font-semibold text-gray-700">Category</label>
							<select
								bind:value={category}
								on:change={() => handleCategorySelect(category)}
								class="w-full px-3 py-2 rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent
								"
							>
								<option value="">Select Category</option>
								{#each categories as cat}
									<option value={cat.category}>{cat.category}</option>
								{/each}
							</select>
						</div>

						<!-- Subcategory Select -->
						<div class="mb-4">
							<label class="block mb-2 text-sm font-semibold text-gray-700">Subcategory</label>
							<select
								bind:value={subcategory}
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
							>
								<option value="">Select Subcategory</option>
								{#if subcategories.length > 0}
									{#each subcategories as subcat}
										<option value={subcat}>{subcat}</option>
									{/each}
								{/if}
							</select>
						</div>

						<!-- Form Fields -->
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Name</label>
								<input
									type="text"
									bind:value={name}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Price</label>
								<input
									type="number"
									bind:value={price}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Material</label>
								<input
									type="text"
									bind:value={material}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Color</label>
								<input
									type="text"
									bind:value={color}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Width</label>
								<input
									type="number"
									bind:value={width}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Height</label>
								<input
									type="number"
									bind:value={height}
									class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
							<div>
								<label class="block mb-2 text-sm font-semibold text-gray-700">Depth</label>
								<input
									type="number"
									bind:value={depth}
									class="w-full px-3 py-2 border rounded-md f focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
								/>
							</div>
						</div>

						<!-- Description Field -->
						<div class="mb-4">
							<label class="block mb-2 text-sm font-semibold text-gray-700">Description</label>
							<textarea
								bind:value={description}
								rows="5"
								class="w-full px-3 py-2 border rounded-md focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
							></textarea>
						</div>

						<!-- Submit Button -->
						<div class="flex justify-center mt-4">
							<button type="submit" class="px-4 py-2 bg-mainGreen text-white rounded">
								Add Furniture
							</button>
						</div>
					</form>
				</div>
			{/if}

			<!-- Add Category Tab -->
			{#if activeTab === 'category'}
				<div class="max-w-3/4 mx-auto">
					<h2 class="text-xl font-bold mb-4">Add Category</h2>
					<form on:submit|preventDefault={addCategory} class="space-y-4">
						<div>
							<label class="block mb-2">Category Name</label>
							<input
								type="text"
								bind:value={newCategory}
								class="w-full p-2 border"
								placeholder="Enter category name"
								required
							/>
						</div>
						<div>
							<label class="block mb-2">Subcategory Name</label>
							<input
								type="text"
								bind:value={newSubcategory}
								class="w-full p-2 border"
								placeholder="Enter subcategory name"
								required
							/>
						</div>
						<button
							type="submit"
							class="mt-4 w-full py-2 bg-blue-500 text-white font-bold rounded-lg"
							>Add Category</button
						>
					</form>
				</div>
			{/if}
		</div>
	</div>

	<div class="md:hidden">
		<Footer />
	</div>
</div>
