<script lang="ts">
	import { categoryStats, getNavigationCategories } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import LightSwitch from './LightSwitch.svelte';

	// ナビゲーション用のカテゴリーデータを取得
	const navigationItems = getNavigationCategories(categoryStats);
</script>

<div class="flex h-full flex-col p-6">
	<!-- ヘッダー -->
	<div class="mb-8">
		<h1 class="text-primary mb-2 text-3xl font-black">tsukemonogit</h1>
		<p class="text-base-content/70 text-sm">制作・活動まとめ</p>
	</div>

	<!-- ナビゲーション -->
	<nav class="flex-1 space-y-2">
		{#each navigationItems as item}
			<a
				href={item.href}
				class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
			>
				<span class="text-xl">{item.emoji}</span>
				<div class="flex-1">
					<span class="font-medium">{$t(item.nameKey)}</span>
				</div>
			</a>
		{/each}
	</nav>

	<!-- フッター -->
	<div class="border-base-300 mt-auto border-t pt-4">
		<div class="mb-4 flex items-center gap-3">
			<div
				class="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br"
			>
				<span class="text-sm font-bold text-white">T</span>
			</div>
			<span class="text-sm font-medium">tsukemonogit</span>
		</div>

		<!-- テーマ切り替えボタン -->
		<LightSwitch />
	</div>
</div>
