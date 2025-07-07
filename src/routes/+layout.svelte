<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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
		if (typeof window !== 'undefined') {
			isExpansed = window.innerWidth >= EXPANDED_BREAKPOINT;
		}
	}

	onMount(() => {
		checkWindowSize();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', checkWindowSize);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', checkWindowSize);
		}
	});
</script>

<main class="card border-surface-100-900 h-screen grid-cols-[auto_1fr] overflow-y-auto border">
	<Navigation.Rail
		expanded={isExpansed}
		width={'w-12'}
		classes={`z-10 fixed transition-all duration-100 ease-in-out`}
	>
		{#snippet header()}
			<Navigation.Tile
				labelExpanded="Menu"
				onclick={toggleExpanded}
				title="Toggle Menu Width"
				classes="h-12"
			>
				<Menu />
			</Navigation.Tile>
		{/snippet}
		{#snippet tiles()}
			{#each navigationItems as item}
				<Navigation.Tile
					labelExpanded={$t(`${item.id}.label`)}
					href={item.href}
					classes="h-12"
					expandedClasses="break-keep overflow-x-hidden whitespace-pre"
				>
					<span class="text-xl">{item.emoji}</span>
				</Navigation.Tile>
			{/each}
		{/snippet}
		{#snippet footer()}
			<LightSwitch />
		{/snippet}
	</Navigation.Rail>

	<div
		class={`mx-auto max-w-screen-2xl flex-1 px-4 py-6 ${
			isExpansed ? 'pl-62' : 'pl-14'
		} transition-all duration-100 ease-in-out`}
	>
		{@render children()}
	</div>
</main>
