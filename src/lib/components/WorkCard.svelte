<!-- Card.svelte -->
<script lang="ts">
	import type { Work } from '$lib/data/state';
	import { t } from '@konemono/svelte5-i18n';

	type Props = Work & { category: string };
	let { category, id, url, image, tags = [] }: Props = $props();

	const titleKey = `${category}.${id}.title`;
	const descriptionKey = `${category}.${id}.description`;
</script>

<a
	href={url}
	class="bg-base-100 border-surface-200 block overflow-hidden rounded-xl border p-0 shadow-md transition-shadow duration-300 hover:shadow-lg"
>
	<!-- Header -->
	<header
		class="bg-surface-100-900 flex aspect-[21/9] w-full items-center justify-center overflow-hidden"
	>
		{#if image}
			<img src={image} class="h-full w-full object-cover" alt="banner" />
		{:else}
			<!-- 画像がない場合のプレースホルダー（SVGやアイコンでも可）-->
			<span class="text-sm text-slate-400">No image available</span>
		{/if}
	</header>

	<!-- Article -->
	<article class="min-h-[180px] space-y-4 p-6">
		<div>
			<h3 class="mb-2 text-xl font-bold text-slate-800 dark:text-slate-100">{$t(titleKey)}</h3>
		</div>
		<p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
			{$t(descriptionKey)}
		</p>
		{#if tags.length > 0}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each tags as tag}
					<span class="btn btn-sm preset-filled-primary-500 rounded-md">{$t(tag)}</span>
				{/each}
			</div>
		{/if}
	</article>

	<!-- Footer -->
	<footer class="min-h-[48px] px-6 pb-6">
		<div class="flex flex-row-reverse">
			<span class="btn preset-filled-primary-500 text-primary text-sm font-medium">
				{$t(`${category}.${id}.link_text`, 'common.view')}
			</span>
		</div>
	</footer>
</a>
