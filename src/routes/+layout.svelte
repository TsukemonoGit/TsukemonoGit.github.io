<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Menu } from '@lucide/svelte';
	import '../app.css';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import { categoryStats, getNavigationCategories } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';
	import '$lib/i18n/index.ts';

	let { children } = $props();

	let isExpansed = $state(false);

	function toggleExpanded() {
		isExpansed = !isExpansed;
	}

	const navigationItems = getNavigationCategories(categoryStats);

	// 画面幅のしきい値を設定（例: 1200px以上なら展開）
	const EXPANDED_BREAKPOINT = 1200;

	function checkWindowSize() {
		isExpansed = window.innerWidth >= EXPANDED_BREAKPOINT;
	}

	onMount(() => {
		checkWindowSize();
		window.addEventListener('resize', checkWindowSize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', checkWindowSize);
	});
</script>

<div
	class="card border-surface-100-900 mx-auto grid h-screen max-w-screen-2xl grid-cols-[auto_1fr] border"
>
	<Navigation.Rail expanded={isExpansed} width={'w-12'}>
		{#snippet header()}
			<Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width">
				<Menu />
			</Navigation.Tile>
		{/snippet}
		{#snippet tiles()}
			{#each navigationItems as item}
				<Navigation.Tile labelExpanded={$t(item.nameKey)} href={item.href}>
					<span class="text-xl">{item.emoji}</span>
				</Navigation.Tile>
			{/each}
		{/snippet}
		{#snippet footer()}
			<LightSwitch />
		{/snippet}
	</Navigation.Rail>

	<Header />

	<main class="flex-1 overflow-y-auto px-4 py-6">
		{@render children()}
	</main>

	<Footer />
</div>
