<script lang="ts">
	import { onMount } from 'svelte';
	import Carousel from '../lib/Carousel.svelte';
	import Map from '../lib/Map.svelte';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		SidebarGroup,
		Sidebar,
		SidebarDropdownWrapper,
		SidebarDropdownItem,
		SidebarWrapper,
		Footer,
		FooterLinkGroup,
		FooterLink,
		FooterIcon,
		Tabs,
		TabItem
	} from 'flowbite-svelte';
	import { ChevronDownOutline, FacebookSolid, TwitterSolid } from 'flowbite-svelte-icons';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	let categories: any[] = [];
	let apiKey = 'AIzaSyCY57H96Hsg6kRvjAJz6oe7j6mOpxQoARs';
	let name = '';
	let email = '';
	let phoneNumber = '';
	let message = '';
	let sidebarOpen = false;

	let slides = [
		{
			image: '/corousel/dining.jpg',
			title: 'Dining Sets Delight',
			description:
				'Transform your dining experience with our elegant and versatile dining sets. Whether you’re hosting a formal dinner party or enjoying a cozy family meal, our collection offers a perfect blend of comfort and style. From classic wooden tables to modern glass designs, each piece is crafted to create memorable dining moments.'
		},

		{
			image: '/corousel/living.jpg',
			title: 'Living Room Luxury',
			description:
				'Unwind in style and comfort with our luxurious living room furniture collection. Discover plush sofas, elegant coffee tables, and stunning accent chairs that seamlessly blend modern aesthetics with timeless comfort. Whether you are relaxing after a long day or entertaining guests, our living room pieces create a welcoming and sophisticated environment.'
		},
		{
			image: '/corousel/bedroom.jpg',
			title: 'Bedroom Bliss',
			description:
				'Create a personal sanctuary with our carefully curated bedroom furniture collection. From luxurious beds that promise a peaceful night’s sleep to stylish wardrobes and functional bedside tables, every piece is designed to bring both beauty and practicality to your space. Transform your bedroom into a retreat where relaxation meets refined design.'
		},
		{
			image: '/corousel/outdoor.jpeg',
			title: 'Outdoor Oasis',
			description:
				'Turn your outdoor spaces into a haven of relaxation and style with our outdoor furniture collection. Whether it’s a sunny patio, garden retreat, or rooftop escape, our weather-resistant seating, dining sets, and lounges offer the perfect combination of durability and design. Enjoy the outdoors with furniture built for comfort and elegance.'
		},
		{
			image: '/corousel/office.jpeg',
			title: 'Office Comfort',
			description:
				'Enhance your productivity and comfort with our range of ergonomic office furniture. From adjustable desks that support a healthy work posture to ergonomic chairs designed for all-day comfort, our office solutions combine style with functionality. Create a workspace that inspires creativity while ensuring you remain comfortable and focused throughout the day.'
		}
	];

	onMount(async () => {
		const res = await fetch('/furniture.json');
		const furnitureData = await res.json();
		categories = furnitureData.map((category: { subcategories: any[] }) => ({
			...category,
			subcategories: category.subcategories.map((subcat: { items: any[] }) => ({
				...subcat,
				items: subcat.items.map(
					(item: {
						name: any;
						price: any;
						description: any;
						image: any;
						dimensions: any;
						material: any;
						color: any;
					}) => ({
						name: item.name,
						price: item.price,
						description: item.description,
						image: item.image,
						dimensions: item.dimensions,
						material: item.material,
						color: item.color
					})
				)
			}))
		}));
	});

	function navigateToShop(category: string | number | boolean, subcategory: string | null = null) {
		const path = subcategory
			? `/shop?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
			: `/shop?category=${encodeURIComponent(category)}`;
		window.location.href = path;
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
					href="#home"
					activeClass="text-mainGreen text-xl"
					nonActiveClass=" hover:text-mainGreen text-xl">Home</NavLi
				>

				<NavLi
					href="#categories"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass=" hover:text-mainGreen text-xl">Categories</NavLi
				>
				<NavLi
					href="/shop"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">Shop</NavLi
				>

				<NavLi
					href="#about-us"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">About Us</NavLi
				>
				<NavLi
					href="#contact-us"
					activeClass="text-mainGreen text-2xl"
					nonActiveClass="hover:text-mainGreen text-xl">Contact Us</NavLi
				>
				<NavLi href="/login" class="flex md:hidden" nonActiveClass="hover:text-mainGreen">
					<button class="bg-mainGreen text-white py-2 px-4 rounded hover:bg-gray-800">Login</button>
				</NavLi>
			</NavUl>
		</Navbar>

		<!-- Second Navbar (Categories) -->
		<Navbar class="hidden md:flex  w-full z-20 top-20 border-b  shadow-md">
			<NavUl class="flex space-x-8 w-full">
				{#each categories as category}
					<NavLi
						class="relative group cursor-pointer text-base "
						nonActiveClass="text-gray-700 text-lg"
					>
						{category.name}
						<ChevronDownOutline class="w-5 h-5 inline ml-1 text-mainGreen" />

						<!-- Dropdown for Subcategories -->
						<div
							class=" rounded-lg absolute left-0 top-22 mt-2 w-48 bg-mainGreen text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						>
							<ul>
								{#each category.subcategories as subcategory}
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
									<li
										class="px-4 py-4 hover:bg-gray-800 hover:text-mainGreen cursor-pointer"
										on:click={() => navigateToShop(category.name, subcategory.name)}
									>
										{subcategory.name}
									</li>
								{/each}
							</ul>
						</div>
					</NavLi>
				{/each}
			</NavUl>
		</Navbar>
	</div>

	<!-- Navbar for small screens -->

	<!-- svelte-ignore a11y_click_events_have_key_events -->
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
			<!-- Categories Tab -->
			<TabItem
				title="Categories"
				open
				class="p-0 bg-transparent"
				activeClasses="text-mainGreen inline-block text-lg font-medium text-center disabled:cursor-not-allowed w-full h-full px-5 py-3 rounded-l-xl underline underline-offset-[10px] decoration-4"
				inactiveClasses="bg-mainWhite w-full h-full px-5 py-3 rounded-l-xl"
				defaultClass="inline-block text-lg text-center disabled:cursor-not-allowed"
			>
				<Sidebar>
					<SidebarWrapper divClass="bg-transparent pt-4 px-3">
						<SidebarGroup>
							<hr />
							{#each categories as category}
								<SidebarDropdownWrapper label={category.name}>
									{#each category.subcategories as subcategory}
										<SidebarDropdownItem
											label={subcategory.name}
											on:click={() => navigateToShop(category.name, subcategory.name)}
										/>
									{/each}
								</SidebarDropdownWrapper>
								<hr />
							{/each}
						</SidebarGroup>
					</SidebarWrapper>
				</Sidebar>
			</TabItem>
			<!-- Menu Tab -->
			<TabItem
				title="Menu"
				class="active-tab"
				activeClasses="text-mainGreen inline-block text-lg font-medium text-center disabled:cursor-not-allowed w-full h-full px-5 py-3 rounded-l-xl underline underline-offset-[10px] decoration-4"
				inactiveClasses="bg-mainWhite w-full h-full px-5 py-3 rounded-l-xl"
				defaultClass="inline-block text-lg  text-center disabled:cursor-not-allowed"
			>
				<ul class="p-4 space-y-4">
					<hr />
					<li>
						<a
							href="#home"
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
							href="#contact-us"
							class="block text-md text-gray-700 hover:text-mainGreen"
							on:click={closeSidebar}>Contact Us</a
						>
					</li>
					<hr />
					<li>
						<a
							href="#about-us"
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

	<div class="pt-10 md:pt-0">
		<section id="home">
			<div class="relative h-[900px] bg-cover bg-no-repeat overflow-hidden">
				<div
					class="absolute bottom-0 right-0 w-[45%] h-full bg-cover bg-no-repeat bg-[url('/hero-side-bg.png')] hidden md:flex"
				></div>

				<Carousel {slides} />
			</div>
		</section>
		<section id="categories" class="md:py-16 py-4 bg-gray-200">
			<div class="container mx-auto p-4">
				<div class="mb-8 flex flex-col gap-6">
					<p class="text-2xl md:text-5xl font-bold text-mainGreen">Furniture Categories</p>
					<p class="text-md md:text-lg">Lots of new products and product collections</p>
				</div>
				<ul class="grid grid-cols-2 lg:grid-cols-6 gap-4">
					{#each categories as category}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="relative overflow-hidden bg-mainGreen border rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
							on:click={() => navigateToShop(category.category)}
						>
							<img
								src={category.image}
								alt={category.category}
								class="w-full h-48 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
							/>

							<div
								class="absolute top-4 left-4 bg-white rounded-full px-4 py-2 text-center font-bold text-gray-800 shadow-md"
							>
								{category.category}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<section id="about-us" class="md:py-16 py-4 bg-gray-100">
			<div class="container mx-auto md:w-3/2 justify-between flex flex-col lg:flex-row gap-4 p-4">
				<div>
					<h2 class=" md:text-start text-3xl md:text-5xl font-bold text-mainGreen mb-10">
						About Us
					</h2>
					<div class="flex flex-col max-w-2xl text-justify mx-auto text-md md:text-lg gap-4">
						<p class="">
							Jubilee Furniture offers a wide range of quality, modern, and traditional style
							furniture for every room in your home. Whether you're furnishing your living room,
							dining room, or bedroom, our collections feature both contemporary and classic designs
							to complement any home décor. Based in Eldoret City, we proudly serve customers across
							the entire Kenya, delivering top-notch furniture to homes nationwide.
						</p>
						<p>
							We offer the best brands at prices lower than many other stores, and we work closely
							with our customers to provide flexible financing options so you can easily afford the
							furniture you desire. At Jubilee Furniture, we are committed to exceptional customer
							service and are pleased to offer these financing solutions to meet your needs. Having
							served the Eldoret City community since 2010, our experienced staff brings decades of
							expertise in the furniture industry.
						</p>

						<p>
							When you shop with Jubilee Furniture, you’ll discover why we stand out: quality,
							variety, and a personalized shopping experience. Our collection includes Italian
							leather couches, European-designed bedroom furniture, modern glass tables and chair
							sets, and much more — all crafted from the finest materials. Whether you know exactly
							what you need or require recommendations, we will assist you in finding the perfect
							furniture to suit your home and budget.
						</p>
					</div>
				</div>

				<div class="mt-6">
					<img src="/about-img.png" alt="" />
				</div>
			</div>
		</section>

		<section
			id="contact-us"
			class="md:py-16 py-4 bg-gray-200 flex flex-col md:flex-row mx-auto items-center justify-center gap-20"
		>
			<div class="p-4">
				<h2 class="text-3xl md:text-5xl font-bold text-mainGreen mb-8">Contact Us</h2>
				<form
					class="max-w-lg mx-auto space-y-4"
					target="_blank"
					action="https://formsubmit.co/lazzohchainz@gmail.com"
					method="POST"
				>
					<input type="hidden" name="_template" value="box" />
					<input
						type="text"
						placeholder="Name"
						name="Name"
						bind:value={name}
						class="w-full px-4 py-2 border rounded focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
					/>
					<input
						type="text"
						placeholder="Phone"
						name="Phone Number"
						bind:value={phoneNumber}
						class="w-full px-4 py-2 border rounded focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
					/>
					<input
						type="email"
						placeholder="Email"
						name="Email Address"
						bind:value={email}
						class="w-full px-4 py-2 border rounded focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
					/>
					<textarea
						placeholder="Message"
						name="Message"
						bind:value={message}
						class="w-full px-4 py-2 border rounded focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
						rows="5"
					></textarea>
					<button
						type="submit"
						class="w-full px-4 py-2 font-bold text-white bg-mainGreen rounded hover:bg-mainGreen"
					>
						Send Message
					</button>
				</form>
			</div>

			<div class="w-full md:w-[40%] p-4 h-[400px]">
				<Map {apiKey} coordinates="0.5474355589369159, 35.30725327936269" />
			</div>
		</section>

		<Footer footerType="socialmedia" id="footer" class="bg-gray-800">
			<div class="mx-auto md:w-3/4">
				<div class="md:flex md:justify-between py-10">
					<div class="mb-6 md:mb-0 gap-10">
						<p class="font-bold text-2xl md:text-4xl text-mainGreen text-center">
							Jubilee Furnitures
						</p>

						<div class="hidden md:flex mt-10 gap-4">
							<FooterIcon href="/">
								<FacebookSolid
									class="w-10 h-10 text-gray-100  hover:text-mainGreen dark:hover:text-mainGreen"
								/>
							</FooterIcon>

							<FooterIcon href="/">
								<TwitterSolid
									class="w-10 h-10 text-gray-100 hover:text-mainGreen dark:hover:text-mainGreen"
								/>
							</FooterIcon>
						</div>

						<div class="items-center flex md:items-start mt-10 gap-4 flex-col text-gray-100">
							<div class="flex flex-row gap-2 mt-2">
								<Icon icon="clarity:email-solid" width="30" height="30" style="color: white" />
								<p>jubileefurniture@gmail.com</p>
							</div>

							<div class="flex flex-row gap-2 mt-2">
								<Icon icon="ic:baseline-phone" width="30" height="30" style="color: white" />
								<p class="">+254 70000000</p>
							</div>
						</div>
						<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 md:hidden" />
					</div>
					<div class="grid grid-cols-2 gap-20 sm:gap-6 mt-10">
						<div class="md:px-10">
							<h2 class="mb-6 text-sm md:text-xl font-semibold text-mainGreen uppercase">
								Resources
							</h2>
							<FooterLinkGroup>
								<FooterLink liClass="mb-4 text-gray-100 hover:text-mainGreen " href="/shop"
									>Shop</FooterLink
								>
							</FooterLinkGroup>
						</div>

						<div class="md:px-10">
							<h2 class="mb-6 text-sm md:text-xl font-semibold uppercase text-mainGreen">
								Follow us
							</h2>
							<FooterLinkGroup>
								<FooterLink liClass="mb-4 text-gray-100 hover:text-mainGreen " href="/"
									>Facebook</FooterLink
								>
								<FooterLink liClass="mb-4 text-gray-100 hover:text-mainGreen " href="/"
									>Twitter</FooterLink
								>
								<FooterLink liClass="mb-4 text-gray-100 hover:text-mainGreen " href="/"
									>Instagram</FooterLink
								>
							</FooterLinkGroup>
						</div>
					</div>
				</div>
				<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<div class="flex items-center justify-center text-center">
					<p class="text-gray-100">
						&copy; {new Date().getFullYear()} Jubilee Furnitures. All rights reserved.

						<span class="text-mainGreen font-bold">
							<a href="https://lazarusmugo.github.io"> Designed by Lazarus Mugo</a>
						</span>
					</p>
				</div>
			</div>
		</Footer>
	</div>
</div>

<style>
	.active-tab {
		color: var(--mainGreen);
		border-bottom: 2px solid var(--mainGreen);
	}

	.inactive-tab {
		color: gray;
	}
</style>
