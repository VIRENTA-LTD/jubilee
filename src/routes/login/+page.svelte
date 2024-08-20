<script lang="ts">
  import { onMount } from 'svelte';
  let email = '';
  let password = '';
  let error = '';

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
</script>

<div class="flex items-center justify-center h-screen bg-gray-100">
  <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
    <h1 class="text-2xl font-bold text-center">Admin Login</h1>
    <form class="space-y-4" on:submit|preventDefault={login}>
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        required
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        required
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
    {#if error}
      <p class="text-red-500 text-center">{error}</p>
    {/if}
  </div>
</div>
