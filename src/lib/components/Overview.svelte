<script>
	import { categoryStats, getOverviewCategories } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';

	// カテゴリーデータとstatsを結合
	const categories = getOverviewCategories(categoryStats);
</script>

<!-- 概要セクション -->
<section id="overview" class="px-4 pb-12">
	<div class="container mx-auto max-w-6xl">
		<div
			class="hero-section relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 shadow-xl dark:from-slate-800 dark:via-purple-900/20 dark:to-pink-900/20"
		>
			<!-- 背景装飾 -->
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]"
			></div>
			<div
				class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-xl dark:from-blue-800/20 dark:to-purple-800/20"
			></div>
			<div
				class="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 blur-xl dark:from-pink-800/20 dark:to-purple-800/20"
			></div>

			<div class="relative z-10 text-center">
				<div class="max-w-xl">
					<h2
						class="animate-bounce-gentle mb-4 overflow-visible font-mono text-5xl font-bold break-keep whitespace-nowrap text-slate-800 dark:text-slate-100"
					>
						₍ ･ᴗ･ ₎
					</h2>
					<p class="text-xl font-medium text-slate-700 dark:text-slate-200">
						{$t('overview.description')}
					</p>
					<div
						class="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
					></div>
				</div>
			</div>
		</div>

		<!-- 統計ダッシュボード -->
		<div class="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-6">
			{#each categories as category}
				<a
					href={category.href}
					class="stat-card bg-gradient-to-br {category.colors.from} {category.colors.to} {category
						.colors.border} {category.colors.darkFrom} {category.colors.darkTo} {category.colors
						.darkBorder} cursor-pointer rounded-2xl border p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				>
					<div class="{category.colors.text} {category.colors.darkText} mb-3">
						<span class="text-4xl drop-shadow-sm">{category.emoji}</span>
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

	.hero-section {
		background-image:
			radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
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
</style>
