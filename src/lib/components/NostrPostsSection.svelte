<!--NostrPostsSection.svelte-->
<script lang="ts">
	import { onMount } from 'svelte';

	interface NostrPost {
		id: string;
		content: string;
		created_at: number;
		author: string;
	}

	let posts: NostrPost[] = $state([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			// nostr-listカスタム要素が利用可能になるまで待機
			await new Promise((resolve) => {
				if (customElements.get('nostr-list')) {
					resolve(null);
				} else {
					customElements.whenDefined('nostr-list').then(resolve);
				}
			});

			// 少し待ってからデータを取得
			setTimeout(() => {
				loading = false;
			}, 1000);
		} catch (e) {
			error = 'Nostr投稿の読み込みに失敗しました';
			loading = false;
		}
	});

	function formatDate(timestamp: number) {
		const date = new Date(timestamp * 1000);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / (1000 * 60));
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (minutes < 60) {
			return `${minutes}分前`;
		} else if (hours < 24) {
			return `${hours}時間前`;
		} else if (days < 7) {
			return `${days}日前`;
		} else {
			return date.toLocaleDateString('ja-JP', {
				month: 'short',
				day: 'numeric'
			});
		}
	}

	function truncateContent(content: string, maxLength: number = 120) {
		if (content.length <= maxLength) return content;
		return content.substring(0, maxLength) + '...';
	}
</script>

<div class="nostr-posts-section">
	<h3 class="section-title">
		<span class="icon">🟣</span>
		最新のものとBotたちのNostr投稿
	</h3>

	{#if loading}
		<div class="loading">
			<div class="loading-spinner"></div>
			<p>投稿を読み込んでいます...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
		</div>
	{:else}
		<div class="posts-container">
			<!-- nostr-listカスタム要素を使用 -->
			<nostr-list
				href={`https://lumilumi.app/{id}`}
				filters={`[{"kinds":[1],"limit":10,"authors":["84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5","5650178597525e90ea16a4d7a9e33700ac238a1be9dbf3f5093862929d9a1e60","87e02cd9151cbf69ba20268a2a4237ad2f39fc631c96558e294ca00586477412","f987fb90696fcb09358629aeebf5156ea05a405101c4f2d9020bf02f47ea4a49","86fd1c80c07debbc3d1929377b24d4bf65a85af268af15cda2acce454df670be","7202985c7e34a7c1c48b93d882a953c5258cf226204ec95bececd8360c792969","dbe95a47d0836c031eace9f0c2afb3b1b3982c06b1d85a21ac305d2f4f454c3e","4f129b892cf19a3dd2eb6e6bb097349e88e9fb51c035b119795900c8235ab5bb","c5969169537a12f29f60f62b30d511a4359355418bfb9a74676a9d1509aaad9a","54fd3172bbc4110646ddb0410dc5451bf141a47e00cbfa2e7e238d9e8f3392de","f40901c9f844c9e92c3f951ed58b729a2a5819cf82f590403d186587a12b7fa0"]}]`}
				limit="10"
				class="nostr-widget"
			></nostr-list>

			<!-- フォールバック用の手動レンダリング -->
			<div class="fallback-posts">
				{#each posts as post}
					<div class="post-item">
						<div class="post-content">
							{truncateContent(post.content)}
						</div>
						<div class="post-meta">
							<span class="post-time">
								{formatDate(post.created_at)}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.nostr-posts-section {
		background-color: #f8fafc;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
		color: #374151;
		border-bottom: 1px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	.icon {
		font-size: 1.25rem;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.loading-spinner {
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid #f3f4f6;
		border-top: 2px solid #8b5cf6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.error {
		padding: 1rem;
		background-color: #fee2e2;
		border: 1px solid #fca5a5;
		color: #991b1b;
		border-radius: 0.375rem;
		font-size: 0.875rem;
	}

	.posts-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 400px;
		max-height: 600px;
		overflow-y: auto;
	}

	/* nostr-listカスタム要素のスタイル */
	.nostr-widget {
		display: block;
		width: 100%;
	}

	/* フォールバック用のスタイル */
	.fallback-posts {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.post-item {
		background-color: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 0.75rem;
		transition: border-color 0.2s;
	}

	.post-item:hover {
		border-color: #8b5cf6;
	}

	.post-content {
		font-size: 0.875rem;
		line-height: 1.5;
		color: #374151;
		margin-bottom: 0.5rem;
		word-wrap: break-word;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.post-time {
		font-weight: 500;
	}

	/* レスポンシブデザイン */
	@media (max-width: 768px) {
		.nostr-posts-section {
			padding: 0.75rem;
			min-height: 300px;
			max-height: 400px;
		}

		.section-title {
			font-size: 1rem;
		}

		.post-content {
			font-size: 0.8rem;
		}

		.post-meta {
			font-size: 0.7rem;
		}
	}
</style>
