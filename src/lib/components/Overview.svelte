<script lang="ts">
	import { categoryStats, getOverviewCategories } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import { icons } from '@lucide/svelte';
	// カテゴリーデータとstatsを結合
	const categories = getOverviewCategories(categoryStats);
</script>

<!-- 概要セクション -->
<section id="overview" class="px-4 pb-12">
	<div class="container mx-auto max-w-6xl">
		<div
			class="card preset-gradient-one flex min-h-[200px] items-center justify-center overflow-hidden shadow-xl"
		>
			<div class="relative z-10 text-center">
				<div class="max-w-xl">
					<h2
						class="animate-bounce-gentle mb-4 overflow-visible font-mono text-5xl font-bold break-keep whitespace-nowrap
				text-slate-800 dark:text-white"
					>
						₍ ･ᴗ･ ₎
					</h2>
					<p class="text-xl font-medium text-slate-700 dark:text-slate-300">
						{$t('overview.description')}
					</p>
					<div
						class="mx-auto mt-4 h-1 w-16 rounded-full
				bg-gradient-to-r from-blue-400 to-purple-400 opacity-80
				dark:from-blue-600 dark:to-purple-600"
					></div>
				</div>
			</div>
		</div>

		<!-- 統計ダッシュボード -->
		<div class="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-6">
			{#each categories as category}
				{@const Icon = icons[category.icon as keyof typeof icons] ?? null}
				<a
					href={category.href}
					class="stat-card bg-gradient-to-br {category.colors.from} {category.colors.to} {category
						.colors.border} {category.colors.darkFrom} {category.colors.darkTo} {category.colors
						.darkBorder} cursor-pointer rounded-2xl border p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div class="{category.colors.text} {category.colors.darkText} mb-3">
						{#if Icon}
							<Icon class={`mx-auto h-12 w-12 text-center ${category.iconColorClass}`} />{/if}
					</div>
					<div class="{category.colors.text} {category.colors.darkText} mb-1 text-3xl font-bold">
						{category.count}
					</div>
					<div
						class="text-sm {category.colors.textSecondary} {category.colors
							.darkTextSecondary} font-medium"
					>
						{$t(`${category.id}.link`)}
					</div>
				</a>
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

	@keyframes bounce-gentle {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	.animate-bounce-gentle {
		animation: bounce-gentle 3s ease-in-out infinite;
	}

	.stat-card {
		transform-origin: center;
		backdrop-filter: blur(10px);
	}

	.stat-card:hover {
		transform: translateY(-4px) scale(1.02);
	}

	/* セクション間のスペース調整 */
	section {
		scroll-margin-top: 2rem;
	}

	/* ライトモード用のグラデーション */
	.preset-gradient-one {
		background-image: linear-gradient(45deg, var(--color-primary-100), var(--color-tertiary-100));
		color: var(--color-primary-contrast-100);
	}

	/* ダークモード用のグラデーション */
	:global(.dark) .preset-gradient-one {
		background-image: linear-gradient(45deg, var(--color-primary-600), var(--color-tertiary-600));
		color: var(--color-primary-contrast-600);
	}
</style>
