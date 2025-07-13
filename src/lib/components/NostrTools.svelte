<script lang="ts">
	import { nostr } from '$lib/data/nostr'; // 上記のデータをimport
	import WorkCard from './WorkCard.svelte';

	// typeごとに分類して取得
	const webapps = nostr.filter((item) => item.type === 'webapp');
	const bots = nostr.filter((item) => item.type === 'bot');
	const components = nostr.filter((item) => item.type === 'component');
</script>

<section class="nostr-tools">
	<h3 class="section-title">WEBアプリケーション (WebApps)</h3>
	{#if webapps.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each webapps as app}
				<WorkCard {...app} category={'nostr'} />
			{/each}
		</div>
	{:else}
		<p>該当するWEBアプリケーションはありません。</p>
	{/if}

	<h3 class="section-title mt-8">BOT</h3>
	{#if bots.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each bots as bot}
				<WorkCard {...bot} category={'nostr'} />
			{/each}
		</div>
	{:else}
		<p>該当するBOTはありません。</p>
	{/if}

	<h3 class="section-title mt-8">その他コンポーネント・ライブラリ</h3>
	{#if components.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each components as comp}
				<WorkCard {...comp} category={'nostr'} />
			{/each}
		</div>
	{:else}
		<p>該当するコンポーネント・ライブラリはありません。</p>
	{/if}
</section>

<style>
	.section-title {
		font-weight: bold;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
