<script>
	import { categoryStats } from '$lib/data/state';
</script>

<!-- 概要セクション -->
<section id="overview" class="px-4 pb-12">
	<div class="container mx-auto max-w-6xl">
		<div
			class="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 p-6 shadow-md dark:from-slate-800 dark:to-slate-900"
		>
			<div class="text-center">
				<div class="max-w-xl">
					<h2 class="mb-3 font-mono text-4xl font-bold text-slate-800 dark:text-slate-100">
						₍ ･ᴗ･ ₎
					</h2>
					<p class="text-lg text-slate-600 dark:text-slate-300">作ったものとかやったこととか</p>
				</div>
			</div>
		</div>
		<!-- 統計ダッシュボード -->
		<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class="text-primary mb-2">
					<span class="text-3xl">🎮</span>
				</div>
				<div class=" text-primary text-3xl font-bold">
					{categoryStats.games}
				</div>
				<div class=" text-sm">ゲーム作品</div>
			</div>

			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class=" text-secondary mb-2">
					<span class="text-3xl">⚡</span>
				</div>
				<div class=" text-secondary text-3xl font-bold">
					{categoryStats.nostrTools}
				</div>
				<div class=" text-sm">Nostrツール</div>
			</div>

			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class=" text-accent mb-2">
					<span class="text-3xl">💗</span>
				</div>
				<div class="text-accent text-3xl font-bold">
					{categoryStats.fanActivities}
				</div>
				<div class=" text-sm">ファン活動</div>
			</div>

			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class=" text-info mb-2">
					<span class="text-3xl">✍️</span>
				</div>
				<div class="text-info text-3xl font-bold">
					{categoryStats.articles}
				</div>
				<div class=" text-sm">執筆記事</div>
			</div>

			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class=" text-warning mb-2">
					<span class="text-3xl">🗣️</span>
				</div>
				<div class=" text-warning text-3xl font-bold">
					{categoryStats.mentions}
				</div>
				<div class="text-sm">紹介・言及</div>
			</div>

			<div class=" bg-base-100 border-surface-200 rounded-xl border p-6 text-center shadow-md">
				<div class=" text-success mb-2">
					<span class="text-3xl">🔗</span>
				</div>
				<div class=" text-success text-3xl font-bold">
					{categoryStats.links}
				</div>
				<div class=" text-sm">SNS・プラットフォーム</div>
			</div>
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

	/* セクション間のスペース調整 */
	section {
		scroll-margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}
	}
</style>
