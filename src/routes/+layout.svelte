<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
	
	// Track active route for highlighting
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="mono（₍ ･ᴗ･ ₎）の活動記録ポートフォリオ" />
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
	<!-- Navigation -->
	<nav class="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
		<div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2 group">
				<span class="text-2xl">₍ ･ᴗ･ ₎</span>
				<span class="text-lg font-bold text-[var(--color-heading)] group-hover:text-[var(--color-primary)] transition-colors">
					mono.
				</span>
			</a>
			
			<div class="flex items-center gap-1">
				<a
					href="/"
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {($page.url.pathname === '/' || $page.url.pathname.startsWith('/sample')) ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-surface)]'}"
				>
					Home
				</a>
				<a
					href="/timeline"
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {$page.url.pathname === '/timeline' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-surface)]'}"
				>
					Timeline
				</a>
				<a
					href="/account"
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {$page.url.pathname === '/account' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)] hover:bg-[var(--color-surface)]'}"
				>
					Account
				</a>
			</div>
		</div>
	</nav>

	<!-- Main content -->
	<main class="flex-1">
		{@render children()}
	</main>
</div>
