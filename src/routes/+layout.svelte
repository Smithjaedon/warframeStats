<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex items-center justify-between bg-transparent p-4 text-white">
	<div class="text-lg font-bold">Warframe Helper</div>
	<ul class="flex space-x-4">
		<li><a href="/" class="hover:text-gray-400">Home</a></li>
		<li><a href="/prices" class="hover:text-gray-400">Prices</a></li>
	</ul>
</nav>
{@render children()}
