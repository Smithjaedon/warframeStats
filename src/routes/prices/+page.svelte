<script>
	import { onMount } from 'svelte';

	let data = null;

	onMount(async () => {
		const res = await fetch(
				'https://cors-anywhere.herokuapp.com/https://api.warframe.market/v2/lich/weapons',
				{
					mode: 'cors', // Ensure CORS is enabled on the server
					headers: {
						'Access-Control-Allow-Origin': '*'
					}
				}
			),
			json = await res.json();
		data = json;
		console.log(data);
	});
</script>

<main class="bg flex h-screen w-screen items-center justify-center">
	<div class="rounded-md border-2 border-black bg-[#ecf3f9] px-20 py-10">
		<h1 class="mb-4 text-center text-4xl font-bold">Warframe Prices</h1>
		<section>
			<div class="mb-4 flex justify-center space-x-4"></div>

			<div class="scroll-hidden mt-4 h-96 overflow-y-auto"></div>
		</section>
	</div>
</main>
