<script>
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

<div class="carousel relative overflow-hidden my-10 md:mt-60 mx-auto">
	<div
		class="slides flex transition-transform duration-1000 ease-in-out"
		style="transform: translateX(-{currentSlide * 100}%);"
	>
		{#each slides as slide (slide.title)}
			<div class="slide flex-none w-full flex flex-col md:flex-row justify-between p-4">
				<div class="text-left md:w-1/2 mx-auto p-4">
					<h3 class="w-[10%] md:w-auto text-5xl md:text-6xl font-extrabold mb-10 text-mainGreen">
						{slide.title}
					</h3>
					<p class=" text-lg w-3/4">{slide.description}</p>
				</div>
				<div class="md:w-[30%] p-4">
					<img src={slide.image} alt={slide.title} class=" rounded-lg" />
				</div>
			</div>
		{/each}
	</div>
</div>
