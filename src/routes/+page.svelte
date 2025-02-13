<script>
	import { onMount } from 'svelte';

	let selected = 'Warframe';
	let data = null;
	let sortedData = null;
	let selectedRank = 'ALL';
	let availableRanks = [];

	function selectTab(tab) {
		selected = tab;
		if (data) {
			sortUsageData(data[selected]);
			updateAvailableRanks();
		}
	}

	$: filterData = data ? data[selected] || {} : {};

	// Make sorting reactive to selectedRank
	$: sortUsageData(data ? data[selected] : {}, selectedRank);

	function sortUsageData(usageData, rank) {
		if (!usageData) return;
		sortedData = Object.entries(usageData).sort((a, b) => b[1][rank] - a[1][rank]); // Sort by the selected rank
	}

	function updateAvailableRanks() {
		if (sortedData && sortedData.length > 0) {
			availableRanks = Object.keys(sortedData[0][1]);
		}
	}

	function formatPercentage(value) {
		return (value * 100).toFixed(2) + '%';
	}

	onMount(async () => {
		const res = await fetch('https://www-static.warframe.com/repos/WarframeUsageData2024.json');
		const json = await res.json();
		data = json.ALL;
		if (data) {
			sortUsageData(data[selected], selectedRank);
			updateAvailableRanks();
		}
	});
</script>

<main class="bg flex h-screen w-screen items-center justify-center">
	<div class="rounded-md border-2 border-black bg-[#ecf3f9] px-20 py-10">
		<h1 class="mb-4 text-center text-4xl font-bold">Warframe Stats</h1>
		<section>
			<div class="mb-4 flex justify-center space-x-4">
				{#each ['Warframe', 'Primary', 'Secondary', 'Melee'] as category}
					<button
						class="cursor-pointer rounded-lg px-4 py-2 shadow-md hover:animate-pulse hover:bg-gray-400 {selected ===
						category
							? 'bg-gray-600 text-white'
							: 'bg-white text-black'}"
						on:click={() => selectTab(category)}
					>
						{category}
					</button>
				{/each}
			</div>

			<div class="mb-4 flex justify-center">
				<select bind:value={selectedRank} class="rounded-lg bg-white p-2 shadow-md">
					{#each availableRanks as rank}
						<option value={rank}>{rank}</option>
					{/each}
				</select>
			</div>

			<div class="scroll-hidden mt-4 h-96 overflow-y-auto">
				{#each sortedData as [key, values]}
					<div class="flex justify-between border-b p-2">
						<p class="text-lg font-bold">{key}</p>
						<p class="text-lg">{formatPercentage(values[selectedRank] || 0)}</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</main>
