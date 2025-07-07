<script>
	import { games } from '$lib/data/games';
	import WorkCard from './WorkCard.svelte';
</script>

<!-- ゲーム作品セクション -->
<section id="games" class="bg-base-200/50 px-4 py-12">
	<div class="container mx-auto max-w-6xl">
		<div class="section-header mb-8">
			<div class="flex items-center gap-4">
				<span class="text-4xl">🎮</span>
				<div>
					<h2 class="text-base-content text-4xl font-bold">ゲーム作品</h2>
					<p class="text-base-content/60">制作したゲームとインタラクティブコンテンツ</p>
				</div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{#each games as work, index}
				<div class="animate-fade-in" style={`animation-delay: ${index * 0.1}s`}>
					<WorkCard {...work} />
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
		opacity: 0;
	}

	/* セクション間のスペース調整 */
	section {
		scroll-margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.section-header h2 {
			font-size: 2rem;
		}
	}
</style>
