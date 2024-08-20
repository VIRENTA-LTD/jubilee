<script lang="ts">
     import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  const sections = ['Home', 'About Us', 'Categories', 'Testimonials', 'Contact Us'];
</script>

<nav class="fixed top-0 left-0 w-full bg-white shadow-lg z-10">
  <div class="container mx-auto flex justify-between items-center p-4">
    <a href="#home" class="text-2xl font-bold text-blue-500">Our Store</a>
    <ul class="flex space-x-6">
      {#each sections as section}
        <li>
          <a
            href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
            class="text-gray-700 hover:text-blue-500 transition-colors"
          >
            {section}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
