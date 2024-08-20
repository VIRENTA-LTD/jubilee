<script lang="ts">
	import { onMount } from 'svelte';
	import Carousel from '../lib/Carousel.svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	let categories: any[] = [];

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

	function navigateToShop(category: string | number | boolean) {
		window.location.href = `/shop?category=${encodeURIComponent(category)}`;
	}

	let slides = [
		{
			image: '/corousel/1.png',
			title: 'Elegant Elegance',
			description:
				'Experience the epitome of sophistication with our latest collection of elegant furniture pieces designed to complement any interior.'
		},
		{
			image: '/corousel/2.jpg',
			title: 'Modern Marvels',
			description:
				'Step into the future with our modern marvels. Sleek lines, innovative designs, and cutting-edge technology redefine what it means to live comfortably.'
		},
		{
			image: '/corousel/3.jpg',
			title: 'Timeless Treasures',
			description:
				'Discover timeless treasures that blend seamlessly with any decor. Our vintage-inspired collection brings a touch of nostalgia to contemporary living spaces.'
		},
		{
			image: '/corousel/4.jpg',
			title: 'Luxurious Leisure',
			description:
				'Indulge in luxurious leisure with our premium collection. Crafted with meticulous attention to detail, these pieces are the ultimate statement of luxury.'
		},
		{
			image: '/corousel/5.jpg',
			title: 'Sustainable Splendor',
			description:
				'Embrace sustainability and splendor with our eco-friendly collection. Made with renewable materials, these pieces are as beautiful as they are sustainable.'
		}
	];
</script>

<div class="relative">
	<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b bg-white shadow-md">
		<NavBrand href="#">
			<span class="self-center whitespace-nowrap text-xl font-extrabold text-mainGreen"
				>Jubilee Furnitures</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl>
			<NavLi href="#home" active={true}>Home</NavLi>
			<NavLi href="#about">About Us</NavLi>
			<NavLi href="#categories">Categories</NavLi>
			<NavLi href="#testimonials">Testimonials</NavLi>
			<NavLi href="#contact-us">Contact Us</NavLi>
			<NavLi href="/admin">
				<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"> Login </button>
			</NavLi>
		</NavUl>
	</Navbar>

	<div class="pt-16">
		<section id="home">
			<div class="relative h-screen bg-cover bg-no-repeat overflow-hidden bg-[url('/hero-bg.jpg')]">
				<div
					class="absolute bottom-0 right-0 w-[45%] h-full bg-cover bg-no-repeat bg-[url('/hero-side-bg.png')]"
				></div>

				<Carousel {slides} />
			</div>
		</section>

		<section id="about-us" class="py-16 bg-gray-100">
			<div class="container mx-auto md:w-3/2 justify-between flex flex-col lg:flex-row gap-4 p-4">
				<div>
					<h2
						class=" text-center md:text-start text-3xl md:text-5xl font-bold text-mainGreen mb-10"
					>
						About Us
					</h2>
					<p class="max-w-2xl text-center md:text-justify mx-auto text-lg">
						We are a family-owned business offering the best furniture for your home and office.
						With over 20 years of experience, we bring you the finest quality and designs that suit
						your style and comfort.
					</p>
				</div>

				<div class="mt-6">
					<img src="/about-img.png" alt="" />
				</div>
			</div>
		</section>
		<!-- 
		<section id="categories" class="py-16">
			<div class="container mx-auto">
				<h2 class="text-3xl font-bold text-blue-500 text-center mb-8">Categories</h2>
				<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each furniture as item}
						<li class="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow">
							<h3 class="text-xl font-bold text-gray-800">{item.name}</h3>
							<p class="text-gray-600">${item.price}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section> -->

		<section id="categories" class="py-16">
			<div class="container mx-auto">
				<h2 class="text-3xl md:tetx-5xl font-bold text-mainGreen text-center mb-8">Categories</h2>
				<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{#each categories as category}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
							on:click={() => navigateToShop(category.category)}
						>
							<img
								src={category.image}
								alt={category.category}
								class="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<h3 class="text-xl font-bold text-gray-800 mb-2">{category.category}</h3>
							<p class="text-gray-600">{category.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<section id="contact-us" class="py-16">
			<div class="container mx-auto">
				<h2 class="text-3xl font-bold text-blue-500 text-center mb-8">Contact Us</h2>
				<form class="max-w-lg mx-auto space-y-4">
					<input
						type="text"
						placeholder="Name"
						class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="email"
						placeholder="Email"
						class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<textarea
						placeholder="Message"
						class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows="5"
					></textarea>
					<button
						type="submit"
						class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Send Message
					</button>
				</form>
			</div>
		</section>

		<footer id="footer" class="py-8 bg-gray-800 text-gray-100">
			<div class="container mx-auto text-center">
				<p>&copy; {new Date().getFullYear()} Our Store. All rights reserved.</p>
				<p>
					<a href="#home" class="text-blue-400 hover:underline">Back to Top</a>
				</p>
			</div>
		</footer>
	</div>
</div>
