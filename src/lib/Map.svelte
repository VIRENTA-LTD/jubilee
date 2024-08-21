<!-- Map.svelte -->
<script>
	/**
	 * @type {any}
	 */
	export let apiKey;
	export let coordinates = '0.5474355589369159, 35.30725327936269';
</script>

<iframe
	frameborder="0"
	allowfullscreen
	src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates}`}
/>

<style>
	iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
