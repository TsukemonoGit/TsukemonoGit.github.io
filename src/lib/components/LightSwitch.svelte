<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import { Sun, Moon } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let isDark = $state(false);

	/** ユーザー設定を反映する */
	function applyTheme(theme: 'dark' | 'light') {
		document.documentElement.classList.toggle('dark', theme === 'dark');

		localStorage.setItem('theme', theme);
		isDark = theme === 'dark';
	}

	onMount(() => {
		const saved = localStorage.getItem('theme');
		applyTheme(saved === 'dark' ? 'dark' : 'light');
	});

	function handleModeChange(checked: boolean) {
		applyTheme(checked ? 'dark' : 'light');
	}
</script>

<Switch
	name="mode"
	controlActive="bg-surface-200"
	checked={isDark}
	onCheckedChange={(e) => handleModeChange(e.checked)}
>
	{#snippet inactiveChild()}<Moon size="14" />{/snippet}
	{#snippet activeChild()}<Sun size="14" />{/snippet}
</Switch>
