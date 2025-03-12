<script>
	import { onMount } from 'svelte';

	let categoryItems = {};
	let loading = true;
	const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.warframe.market/v2';

	async function fetchData() {
		try {
			// Fetch all items
			const itemResponse = await fetch(`${baseUrl}/items`);
			const itemData = await itemResponse.json();

			print(itemData);
			const items = itemData.payload.items;
			print(items);

			let tempCategoryItems = {};

			for (let item of items) {
				const itemName = item.url_name;
				const category = item.category || 'Unknown';

				try {
					const priceResponse = await fetch(`${baseUrl}/items/${itemName}/orders`);
					const priceData = await priceResponse.json();
					const orders = priceData.payload.orders;

					// Find highest sell order price
					let highestPrice = Math.max(
						...orders.filter((o) => o.order_type === 'sell' && o.visible).map((o) => o.platinum)
					);

					if (!tempCategoryItems[category]) {
						tempCategoryItems[category] = { items: [], expanded: false };
					}

					if (highestPrice > 0) {
						tempCategoryItems[category].items.push({
							name: item.item_name,
							price: highestPrice
						});
					}
				} catch (error) {
					console.error(`Error fetching price for ${itemName}:`, error);
				}
			}

			// Sort items within each category by price (descending)
			for (let category in tempCategoryItems) {
				tempCategoryItems[category].items.sort((a, b) => b.price - a.price);
			}

			categoryItems = tempCategoryItems;
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchData);

	function toggleCategory(category) {
		categoryItems[category].expanded = !categoryItems[category].expanded;
	}
</script>

<main class="flex h-screen w-screen items-center justify-center bg-gray-900">
	<div class="w-full max-w-3xl rounded-md border-2 border-black bg-[#ecf3f9] px-20 py-10">
		<h1 class="mb-4 text-center text-4xl font-bold text-gray-800">Warframe Prices</h1>

		<section>
			<div class="mb-4 flex justify-center space-x-4"></div>

			<div class="scroll-hidden mt-4 h-96 overflow-y-auto rounded-lg border bg-white p-4 shadow-md">
				{#if loading}
					<p class="text-center text-lg text-gray-500">Loading data...</p>
				{:else}
					{#each Object.keys(categoryItems) as category}
						<div class="mb-3 rounded-lg bg-gray-800 p-4 text-white shadow-md">
							<button
								class="flex w-full items-center justify-between text-left font-semibold"
								on:click={() => toggleCategory(category)}
							>
								<span>{category} ({categoryItems[category].items.length} items)</span>
								<span>{categoryItems[category].expanded ? '▲' : '▼'}</span>
							</button>

							{#if categoryItems[category].expanded}
								<ul class="mt-2 border-t border-gray-600 pt-2">
									{#each categoryItems[category].items as item}
										<li class="flex justify-between border-b border-gray-700 px-2 py-1">
											<span>{item.name}</span>
											<span class="font-bold text-yellow-400">{item.price}p</span>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		</section>
	</div>
</main>
