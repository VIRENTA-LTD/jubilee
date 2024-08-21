<script lang="ts">
	import { onMount } from 'svelte';
	import Carousel from '../lib/Carousel.svelte';
	import Map from '../lib/Map.svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterBrand,
		FooterIcon
	} from 'flowbite-svelte';
	import { FacebookSolid, GithubSolid, DiscordSolid, TwitterSolid } from 'flowbite-svelte-icons';

	let categories: any[] = [];
	let apiKey = import.meta.env.GOOGLE_API_KEY;
	let name = '';
	let email = '';
	let phoneNumber = '';
	let message = '';

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

		<section id="categories" class="py-16">
			<div class="container mx-auto p-4">
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

		<section
			id="contact-us"
			class="py-16 bg-gray-200 flex flex-col md:flex-row mx-auto items-center justify-center gap-20"
		>
			<div class="p-4">
				<h2 class="text-3xl md:text-5xl font-bold text-mainGreen text-center mb-8">Contact Us</h2>
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

						<div class="hidden md:flex mt-10 gap-4 flex-col text-gray-100">
							<div class="flex flex-row gap-2 mt-2">
								<Icon icon="clarity:email-solid" width="30" height="30" style="color: white" />
								<p>jubileefurniture@gmail.com</p>
							</div>

							<div class="flex flex-row gap-2 mt-2">
								<Icon icon="ic:baseline-phone" width="30" height="30" style="color: white" />
								<p class="">+254 70000000</p>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-2 gaap-20 sm:gap-6 mt-10">
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
