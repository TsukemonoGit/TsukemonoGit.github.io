<script lang="ts">
	import type { Work } from '$lib/data/state';
	import { icons } from '@lucide/svelte';

	let { work }: { work: Work } = $props();

	// 安全なキャスト + 存在チェック
	let Icon = $derived(icons[work.icon as keyof typeof icons] ?? null);
	console.log(work.icon);
</script>

<a
	href={work.url}
	target="_blank"
	rel="noopener noreferrer"
	class="btn preset-outlined-primary-500 btn-lg animate-fade-in h-auto flex-col gap-3 p-6 transition-all duration-300 hover:scale-105"
>
	{#if Icon}
		<Icon class={`h-6 w-6 ${work.colorClass}`} />
	{/if}
	<span class="text-sm font-semibold">{work.id}</span>
</a>
