<script>
  	import {
	
		Footer,
		FooterLinkGroup,
		FooterLink,
		FooterIcon,
	
	} from 'flowbite-svelte';
	import {  FacebookSolid, TwitterSolid } from 'flowbite-svelte-icons';
	import Icon from '@iconify/svelte';
  export let id = 'footer';
</script>

<Footer footerType="socialmedia" {id} class="bg-gray-800">
	<div class="mx-auto md:w-3/4">
		<div class="md:flex md:justify-between py-10">
			<div class="mb-6 md:mb-0 gap-10">
				<p class="font-bold text-2xl md:text-4xl text-mainGreen text-center">Jubilee Furnitures</p>

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
					<h2 class="mb-6 text-sm md:text-xl font-semibold text-mainGreen uppercase">Resources</h2>
					<FooterLinkGroup>
						<FooterLink liClass="mb-4 text-gray-100 hover:text-mainGreen " href="/shop"
							>Shop</FooterLink
						>
					</FooterLinkGroup>
				</div>

				<div class="md:px-10">
					<h2 class="mb-6 text-sm md:text-xl font-semibold uppercase text-mainGreen">Follow us</h2>
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
