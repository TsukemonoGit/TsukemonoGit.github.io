<script lang="ts">
	import { categoryData, categoryStats } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import LightSwitch from './LightSwitch.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	import { icons } from '@lucide/svelte';
	onMount(() => {
		console.log('onMount');
	});

	onDestroy(() => {
		console.log('destroy');
	});

	beforeNavigate((e) => {
		console.log(e);
	});

	function handleNavClick(event: Event, href: string) {
		console.log('Clicked:', href); // デバッグ用

		if (href.startsWith('#')) {
			event.preventDefault();

			const element = document.querySelector(href);
			console.log('Element found:', element); // デバッグ用

			if (element) {
				// URLを更新
				window.history.replaceState(null, '', href);

				// スムーズスクロール
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	}
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
			href="/"
			class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
		>
			<span class="text-xl">TOP</span>
		</a>
		{#each categoryData as item}
			{@const Icon = icons[item.icon as keyof typeof icons] ?? null}
			<a
				onclick={(e) => handleNavClick(e, item.href)}
				href={item.href}
				class="nav-link hover:bg-base-200 flex items-center gap-3 rounded-lg p-3 transition-colors"
				>{#if Icon}
					<Icon class={`h-5 w-5 ${item.iconColorClass}`} />{/if}

				<div class="flex-1">
					<span class="font-medium">{$t(item.id)}</span>
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
