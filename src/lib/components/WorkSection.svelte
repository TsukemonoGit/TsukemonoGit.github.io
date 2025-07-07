<!-- src/lib/components/WorkSection.svelte -->
<script lang="ts">
	import WorkCard from './WorkCard.svelte';
	import { enrichCategoryData } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import LinkCard from './LinkCard.svelte';

	const categoryData = enrichCategoryData(); // items付き
</script>

{#each categoryData as category}
	<section id={category.id} class="bg-base-200/50 px-4 py-12">
		<div class="container mx-auto max-w-6xl">
			<div class="section-header mb-8">
				<div class="flex items-center gap-4">
					<span class="text-4xl">{category.emoji}</span>
					<div>
						<h2 class="text-base-content text-4xl font-bold">{$t(`${category.id}.title`)}</h2>
						<p class="text-base-content/60">{$t(`${category.id}.description`)}</p>
					</div>
				</div>
			</div>

			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#if category.id === 'links'}
					{#each category.items as work, index}
						<LinkCard {work} />
					{/each}
				{:else}
					{#each category.items as work, index}
						<div class="animate-fade-in" style={`animation-delay: ${index * 0.1}s`}>
							<WorkCard category={category.id} {...work} />
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</section>
{/each}

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

	section {
		scroll-margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.section-header h2 {
			font-size: 2rem;
		}
	}
</style>
