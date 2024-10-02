<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	let email = '';
	let password = '';
	let error = '';
	let sidebarOpen = false;

	async function login() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			// If login is successful, redirect to the admin page
			window.location.href = '/admin';
		} else {
			error = 'Invalid credentials';
		}
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
		class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-200"
	>
		<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
			<h1 class="text-3xl font-extrabold text-center text-gray-700">Admin Login</h1>
			<form class="space-y-5" on:submit|preventDefault={login}>
				<input
					type="email"
					placeholder="Email"
					bind:value={email}
					required
					class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
				/>
				<input
					type="password"
					placeholder="Password"
					bind:value={password}
					required
					class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:outline-none focus:outline-mainGreen focus:border-none focus:ring-transparent"
				/>
				<button
					type="submit"
					class="w-full px-4 py-3 font-bold text-white bg-mainGreen rounded-lg shadow"
				>
					Login
				</button>
			</form>
			{#if error}
				<p class="text-red-500 text-center font-semibold">{error}</p>
			{/if}
		</div>
	</div>
</div>
