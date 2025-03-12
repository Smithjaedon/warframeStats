<script>
	import { onMount } from 'svelte';

	let categoryItems = {};
	let loading = true;
	const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.warframe.market/v2';

	async function fetchData() {
		try {
			// Fetch all items
			const itemResponse = await fetch(`${baseUrl}/items`);
			let itemData = await itemResponse.json();

			console.log('Item data:', itemData.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchData);
</script>

<main class="flex h-screen w-screen items-center justify-center bg-gray-900">
	<div class="w-full max-w-2xl rounded-md border-2 border-black bg-[#ecf3f9] px-10 py-5">
		<h1 class="text-center text-3xl font-bold text-gray-800">Warframe Items</h1>

		<section class="mt-4 h-96 overflow-y-auto rounded-lg border bg-white p-4 shadow-md">
			{#if loading}
				<p class="text-center text-lg text-gray-500">Loading items...</p>
			{:else}
				<ul>
					{#each items as item}
						<li class="flex items-center space-x-4 border-b border-gray-300 py-2">
							<img class="h-12 w-12" src={item.thumb} alt={item.name} />
							<div>
								<p class="text-lg font-semibold">{item.name}</p>
								<p class="text-sm text-gray-600">Tags: {item.tags}</p>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>
</main>
