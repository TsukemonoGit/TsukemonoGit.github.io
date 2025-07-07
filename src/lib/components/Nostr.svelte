<script>
	import { nostrTools } from '$lib/data/nostr';
	import WorkCard from './WorkCard.svelte';
</script>

<!-- Nostrツールセクション -->
<section id="nostr" class="px-4 py-12">
	<div class="container mx-auto max-w-6xl">
		<div class="section-header mb-8">
			<div class="flex items-center gap-4">
				<span class="text-4xl">⚡</span>
				<div>
					<h2 class="text-base-content text-4xl font-bold">Nostr関連ツール</h2>
					<p class="text-base-content/60">分散型プロトコル向けアプリケーション</p>
				</div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{#each nostrTools as work, index}
				<div class="animate-fade-in" style={`animation-delay: ${index * 0.1}s`}>
					<WorkCard {...work} />
				</div>
			{/each}
		</div>
	</div>
</section>
