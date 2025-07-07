<script lang="ts">
	import { categoryStats } from '$lib/data/state';
	import LightSwitch from './LightSwitch.svelte';
</script>

<div class="flex h-full flex-col p-6">
	<!-- ヘッダー -->
	<div class="mb-8">
		<h1 class="text-primary mb-2 text-3xl font-black">tsukemonogit</h1>
		<p class="text-base-content/70 text-sm">制作・活動まとめ</p>
	</div>

	<!-- ナビゲーション -->
	<nav class="flex-1 space-y-2">
		<a
			href="#overview"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">📊</span>
			<span class="font-medium">概要</span>
		</a>

		<a
			href="#games"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">🎮</span>
			<div class="flex-1">
				<span class="font-medium">ゲーム</span>
			</div>
		</a>

		<a
			href="#nostr"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">⚡</span>
			<div class="flex-1">
				<span class="font-medium">Nostr関連</span>
			</div>
		</a>

		<a
			href="#tools"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">🛠️</span>
			<div class="flex-1">
				<span class="font-medium">その他作ったもの</span>
			</div>
		</a>

		<a
			href="#fan"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">💗</span>
			<div class="flex-1">
				<span class="font-medium">ファン活動</span>
			</div>
		</a>

		<a
			href="#articles"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">✍️</span>
			<div class="flex-1">
				<span class="font-medium">書いた記事</span>
			</div>
		</a>

		<a
			href="#mentions"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">🗣️</span>
			<div class="flex-1">
				<span class="font-medium">紹介・言及</span>
			</div>
		</a>

		<a
			href="#links"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">🔗</span>
			<div class="flex-1">
				<span class="font-medium">SNS・アカウント</span>
			</div>
		</a>
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
