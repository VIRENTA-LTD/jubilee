<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/Footer.svelte';
	import ContactUs from '$lib/ContactUs.svelte';
	import Icon from '@iconify/svelte';
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Tabs, TabItem } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	interface FurnitureItem {
		name: string;
		price: string;
		description: string;
		image: string;
		category: string;
		subcategory: string;
	}

	let furniture: FurnitureItem[] = [];
	let filteredFurniture: FurnitureItem[] = [];
	let categories: string[] = [];
	let selectedCategory = '';
	let selectedSubcategory = '';
	let sidebarOpen = false;
	let filterModalOpen = false;

	onMount(async () => {
		const res = await fetch('/furniture.json');
		const furnitureData = await res.json();
		furniture = furnitureData.flatMap((category: { subcategories: any[]; category: any }) =>
			category.subcategories.flatMap((subcat: { items: any[]; name: any }) =>
				subcat.items.map((item: any) => ({
					...item,
					category: category.category,
					subcategory: subcat.name
				}))
			)
		);

		const urlParams = new URLSearchParams($page.url.search);
		selectedCategory = urlParams.get('category') || '';
		selectedSubcategory = urlParams.get('subcategory') || '';

		categories = Array.from(new Set(furniture.map((item) => item.category)));
	});

	$: filteredFurniture = selectedCategory
		? furniture.filter(
				(item) =>
					item.category === selectedCategory &&
					(selectedSubcategory ? item.subcategory === selectedSubcategory : true)
			)
		: furniture;

	function filterByCategory(category: string) {
		selectedCategory = category;
		selectedSubcategory = '';
		updateUrl();
	}

	function filterBySubcategory(subcategory: string) {
		selectedSubcategory = subcategory;
		updateUrl();
		closeFilterModal();
	}

	function clearFilters() {
		selectedCategory = '';
		selectedSubcategory = '';
		updateUrl();
		closeFilterModal();
	}

	function updateUrl() {
		const params = new URLSearchParams();
		if (selectedCategory) params.set('category', selectedCategory);
		if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
		window.history.replaceState({}, '', `${$page.url.pathname}?${params}`);
	}

	function goToLogin() {
		goto('/login');
	}

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};

	function closeSidebar() {
		sidebarOpen = false;
	}

	$: if (typeof window !== 'undefined') {
		if (sidebarOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}


	const toggleFilterModal = () => {
		filterModalOpen = !filterModalOpen;
	};

	function closeFilterModal() {
		filterModalOpen = false;
	}


</script>

<div class="relative">
	<!-- Navigation for large screens -->
	<div class="hidden md:flex flex-col">
		<Navbar class=" px-4 py-2.5  w-full z-20 top-0 start-0 border-b bg-white shadow-md">
			<NavBrand href="#">
				<span
					class=" pl-4 self-center whitespace-nowrap text-xl md:text-3xl font-extrabold text-mainGreen"
					>Jubilee Furnitures</span
				>
			</NavBrand>
			<div class="flex md:order-2">
				<button
					class="hidden md:flex bg-mainGreen py-3 px-8 font-bold text-lg text-stone-50 rounded-md"
					on:click={goToLogin}>Login</button
				>
				<NavHamburger />
			</div>
			<NavUl class="order-1">
				<NavLi
					href="/#home"
					activeClass="text-mainGreen text-xl"
					nonActiveClass=" hover:text-mainGreen text-xl">Home</NavLi
				>

				<NavLi
					href="/#categories"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass=" hover:text-mainGreen text-xl">Categories</NavLi
				>
				<NavLi
					href="/shop"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">Shop</NavLi
				>

				<NavLi
					href="/#about-us"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">About Us</NavLi
				>
				<NavLi
					href="/#contact-us"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">Contact Us</NavLi
				>
				<NavLi href="/login" class="flex md:hidden" nonActiveClass="hover:text-mainGreen">
					<button class="bg-mainGreen text-white py-2 px-4 rounded hover:bg-gray-800">Login</button>
				</NavLi>
			</NavUl>
		</Navbar>
	</div>

	<!-- Navbar for small screens -->

	<Navbar
		class="md:hidden px-2 sm:px-4 py-6 fixed w-full z-20 top-0 start-0 border-b  shadow-md flex justify-evenly items-center"
	>
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

		<div class="whitespace-nowrap text-xl font-extrabold text-mainGreen">Jubilee Furnitures</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="" on:click={goToLogin}>
			<Icon icon="radix-icons:person" width="20" height="20" style="color: black" />
		</div>
	</Navbar>

	<div
		class="{sidebarOpen
			? 'translate-x-0 md:hidden'
			: '-translate-x-full'}  md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white h-full shadow-lg transition-transform duration-300 ease-in-out sidebar-content"
	>
		<div class="flex justify-between items-center">
			<p class="text-mainGreen p-4 font-bold text-lg text-start">Jubilee Furnitures</p>

			<button class="p-4" on:click={closeSidebar}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-7 h-7 text-gray-800"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<Tabs
			tabStyle="underline"
			divider={false}
			contentClass="bg-transparent "
			class="px-4 justify-between py-2"
		>
			<!-- Menu Tab -->
			<TabItem
				title="Menu"
				open
				class="active-tab"
				activeClasses="text-mainGreen inline-block text-lg font-medium text-center disabled:cursor-not-allowed w-full h-full px-5 py-3 rounded-l-xl underline underline-offset-[10px] decoration-4"
				inactiveClasses="bg-mainWhite w-full h-full px-5 py-3 rounded-l-xl"
				defaultClass="inline-block text-lg  text-center disabled:cursor-not-allowed"
			>
				<ul class="p-4 space-y-4">
					<hr />
					<li>
						<a
							href="/#home"
							class="block text-md text-gray-700 hover:text-mainGreen"
							on:click={closeSidebar}>Home</a
						>
					</li>

					<hr />
					<li>
						<a
							href="/shop"
							class="block text-md text-gray-700 hover:text-mainGreen"
							on:click={closeSidebar}>Shop</a
						>
					</li>
					<hr />
					<li>
						<a
							href="/#contact-us"
							class="block text-md text-gray-700 hover:text-mainGreen"
							on:click={closeSidebar}>Contact Us</a
						>
					</li>
					<hr />
					<li>
						<a
							href="/#about-us"
							class="block text-md text-gray-700 hover:text-mainGreen"
							on:click={closeSidebar}>About Us</a
						>
					</li>
					<hr />
					<li>
						<button
							class="block w-full bg-mainGreen text-white py-2 px-4 rounded hover:bg-gray-800"
							on:click={goToLogin}
						>
							Login
						</button>
					</li>
				</ul>
			</TabItem>
		</Tabs>
	</div>

	<section id="shop" class="py-16">
		<div class="container mx-auto">
			<h2 class="text-3xl font-bold text-mainGreen text-center mt-10 md:mt-0 mb-8">
				Shop Furniture
			</h2>

			<div class="lg:flex">
				<!-- Sidebar for filters -->
				<div class="lg:w-1/4 hidden lg:block pr-8">
					<h3 class="text-xl font-bold mb-4">Filters</h3>
					<div>
						<h4 class="text-lg font-semibold mb-2">Category</h4>
						<ul>
							{#each categories as category}
								<li class="mb-2">
									<button
										class="w-full flex justify-between items-center p-2 bg-blue-100 rounded-md hover:bg-blue-200"
										on:click={() => filterByCategory(category)}
									>
										{category}
									</button>

									<!-- Subcategories dropdown -->
									{#if selectedCategory === category}
										<div class="pl-4 mt-2">
											{#each Array.from(new Set(furniture
														.filter((item) => item.category === category)
														.map((item) => item.subcategory))) as subcat}
												<button
													class="w-full text-left text-blue-500 py-1"
													on:click={() => filterBySubcategory(subcat)}
												>
													{subcat}
												</button>
											{/each}
										</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<!-- Main content for furniture items -->
				<div class="lg:w-3/4 px-8">
					<!-- Sorting options and filter button -->
					<div class="flex justify-between items-center mb-4 lg:items-end lg:justify-end">
						<!-- Button to open the filter modal -->
						<button
							class="block lg:hidden bg-mainGreen text-white px-4 py-2 rounded-md"
							on:click={toggleFilterModal}
						>
							Filters
						</button>

						<div class="flex items-center">
							<button
								class=" hidden lg:flex bg-mainGreen text-white px-4 py-2 rounded-md"
								on:click={clearFilters}
							>
								Clear Filters
							</button>
						</div>
					</div>

					<!-- Furniture Items -->
					<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each filteredFurniture as item}
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li class="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
								<img src={item.image} alt={item.name} class="w-full h-48 object-cover mb-4" />
								<h3 class="text-xl font-bold text-gray-800 mb-6">{item.name}</h3>
								<p class="text-gray-600 mb-2">KES {item.price}</p>
								<p class="text-gray-500 text-sm">{item.description}</p>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Filter modal -->
			{#if filterModalOpen}
				<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div class="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
						<div class="flex justify-between items-center mb-4">
							<h3 class="text-xl font-bold">Filters</h3>
							<button on:click={toggleFilterModal}>
								<Icon icon="mdi:close" class="text-gray-700 text-lg" />
							</button>
						</div>

						<div>
							<h4 class="text-lg font-semibold mb-2">Furniture Category</h4>
							<ul>
								{#each categories as category}
									<li class="mb-2">
										<button
											class="w-full flex justify-between items-center p-2 bg-blue-100 rounded-md hover:bg-blue-200"
											on:click={() => filterByCategory(category)}
										>
											{category}
										</button>

										{#if selectedCategory === category}
											<div class="pl-4 mt-2">
												{#each Array.from(new Set(furniture
															.filter((item) => item.category === category)
															.map((item) => item.subcategory))) as subcat}
													<button
														class="w-full text-left text-blue-500 py-1"
														on:click={() => filterBySubcategory(subcat)}
													>
														{subcat}
													</button>
												{/each}
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						</div>

						<button
							class="mt-6 bg-mainGreen text-white px-4 py-2 rounded-md"
							on:click={clearFilters}
						>
							Clear Filters
						</button>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<ContactUs />
	<Footer />
</div>
