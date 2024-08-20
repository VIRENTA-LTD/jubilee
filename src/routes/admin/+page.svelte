<script>
	let name = '';
	let price = '';

	async function addFurniture() {
		const furniture = { name, price };
		await fetch('/api/add-furniture', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(furniture)
		});
		name = '';
		price = '';
		alert('Furniture added successfully!');
	}

	async function logout() {
		await fetch('/api/logout', {
			method: 'POST'
		});
		window.location.href = '/login';
	}
</script>

<h1>Admin Panel</h1>
<form on:submit|preventDefault={addFurniture}>
	<input type="text" placeholder="Name" bind:value={name} required />
	<input type="number" placeholder="Price" bind:value={price} required />
	<button type="submit">Add Furniture</button>
</form>

<button
	on:click={logout}
	class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
>
	Logout
</button>
