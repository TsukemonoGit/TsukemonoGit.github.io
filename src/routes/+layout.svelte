<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../app.css';
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();
	let drawerState = $state(false);

	function drawerClose() {
		drawerState = false;
	}
</script>

<!-- メインレイアウト -->
<div class="grid h-screen grid-cols-1 overflow-hidden sm:grid-cols-[250px_1fr]">
	<!-- Sidebar (大画面のみ表示) -->
	<div class="bg-base-200 hidden h-screen overflow-y-auto sm:block">
		<Sidebar />
	</div>

	<!-- メインコンテンツ -->
	<div class="flex h-screen flex-col overflow-hidden">
		<!-- ヘッダー -->
		<Header />

		<!-- モバイル用ドロワーボタン（小画面のみ） -->
		<div class="sm:hidden">
			<Modal
				open={drawerState}
				onOpenChange={(e) => (drawerState = e.open)}
				triggerBase="btn preset-tonal"
				contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[80vw] max-w-[320px] h-screen overflow-y-auto"
				positionerJustify="justify-start"
				transitionsPositionerIn={{ x: -320, duration: 200 }}
				transitionsPositionerOut={{ x: -320, duration: 200 }}
			>
				{#snippet trigger()}
					☰ メニュー
				{/snippet}
				{#snippet content()}
					<header class="flex items-center justify-between">
						<h2 class="text-lg font-bold">メニュー</h2>
						<button class="btn btn-sm btn-ghost" onclick={drawerClose}>×</button>
					</header>
					<Sidebar />
				{/snippet}
			</Modal>
		</div>

		<!-- メインの子コンテンツ -->
		<main class="flex-1 overflow-y-auto px-4 py-6">
			{@render children()}
		</main>

		<!-- フッター -->
		<Footer />
	</div>
</div>
