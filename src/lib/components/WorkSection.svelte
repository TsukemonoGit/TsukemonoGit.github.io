<!-- src/lib/components/WorkSection.svelte -->
<script lang="ts">
	import WorkCard from './WorkCard.svelte';
	import { enrichCategoryData } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import LinkCard from './LinkCard.svelte';
	import { icons } from '@lucide/svelte';
	import NostrTools from './NostrTools.svelte';

	const categoryData = enrichCategoryData(); // items付き
</script>

{#each categoryData as category}
	{#if category.id !== 'overview'}
		{@const Icon = icons[category.icon as keyof typeof icons] ?? null}
		<section id={category.id} class="bg-base-200/50 px-4 py-12">
			<div class="container mx-auto max-w-6xl">
				<div class="section-header mb-8">
					<div class="flex items-center gap-4">
						{#if Icon}
							<Icon class={`h-12 w-12 ${category.iconColorClass}`} />{/if}
						<div>
							<h2 class="text-base-content text-4xl font-bold">{$t(`${category.id}.title`)}</h2>
							<p class="text-base-content/60">{$t(`${category.id}.description`)}</p>
						</div>
					</div>
				</div>

				<div class="xs:grid-cols-2 grid gap-6 md:grid-cols-3 2xl:grid-cols-4">
					{#if category.id === 'links'}
						{#each category.items as work, index}
							<LinkCard {work} />
						{/each}
					{:else if category.id === 'nostr-posts'}
						<!-- Nostr投稿の場合は nostr-list コンポーネントを使用 -->
						{#await import('@konemono/nostr-web-components') then}
							<div class="col-span-full">
								<nostr-list
									filters={'[{"kinds":[1],"limit":10,"authors":["84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5"]}]'}
									limit="10"
									height="400px"
								>
								</nostr-list>
							</div>{/await}
					{:else if category.id === 'nostr'}
						<NostrTools />
					{:else}
						{#each category.items as work, index}
							<div class="animate-fade-in" style={`animation-delay: ${index * 0.1}s`}>
								<WorkCard category={category.id} {...work} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</section>{/if}
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
