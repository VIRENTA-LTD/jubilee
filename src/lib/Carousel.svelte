<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	/**
	 * @type {string | any[]}
	 */
	export let slides = [];

	let currentSlide = 0;

	const startCarousel = () => {
		setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
		}, 10000);
	};

	onMount(() => {
		startCarousel();
	});
</script>

<div class=" relative overflow-hidden  mx-auto items-center justify-center  md:mt-10 ">
	<div
		class="slides flex transition-transform duration-1000 ease-in-out"
		style="transform: translateX(-{currentSlide * 100}%);"
	>
		{#each slides as slide (slide.title)}
			<div class="slide flex-none w-full flex flex-col md:flex-row p-4 items-center justify-center">
				<div class="text-left md:w-1/2 mx-auto p-4 pt-6 md:pt-0">
					<h3 class="w-[80%] md:w-auto text-4xl  md:text-6xl font-extrabold mb-10 text-mainGreen">
						{slide.title}
					</h3>
					<p class="test-sm md:text-lg md:w-3/4">{slide.description}</p>

					<button
						class="bg-mainGreen rounded-full text-gray-100 font-extrabold mt-12 px-8 py-4 hover:bg-gray-800"
						on:click={() => goto('/shop')}
					>
					 Shop Now
					</button>
				</div>
				<div class="md:w-[30%] p-4">
					<img src={slide.image} alt={slide.title} class=" rounded-lg" />
				</div>
			</div>
		{/each}
	</div>
</div>
