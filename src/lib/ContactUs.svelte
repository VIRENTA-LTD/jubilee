
<script>
    import Map from '../lib/Map.svelte';
  export let name = '';
  export let phoneNumber = '';
  export let email = '';
  export let message = '';
 export	let apiKey = 'AIzaSyCY57H96Hsg6kRvjAJz6oe7j6mOpxQoARs';

  /**
   * Function to handle form submission if needed (optional)
   */
  function handleSubmit() {
    // Custom form submission logic if required
  }
</script>

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
      on:submit={handleSubmit}
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
