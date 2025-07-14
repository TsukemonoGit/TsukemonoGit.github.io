<script lang="ts">
	import type { ProcessedProject } from '$lib/types';

	interface Props {
		accounts: ProcessedProject[];
	}

	let { accounts }: Props = $props();

	// アカウント情報のアイコンマッピング
	const accountIcons: Record<string, string> = {
		'Github': '🐱',
		'Nostr': '🟣',
		'Zenn': '📝',
		'Unityroom': '🎮',
		'Bluesky': '🦋',
		'npm': '📦'
	};

	// アカウント情報から適切なアイコンを取得
	function getAccountIcon(account: ProcessedProject): string {
		// タイトルや説明からアカウントタイプを判定
		const title = account.title.toLowerCase();
		const desc = account.description.toLowerCase();
		
		if (title.includes('github') || desc.includes('github')) return accountIcons['Github'];
		if (title.includes('nostr') || desc.includes('nostr')) return accountIcons['Nostr'];
		if (title.includes('zenn') || desc.includes('zenn')) return accountIcons['Zenn'];
		if (title.includes('unityroom') || desc.includes('unityroom')) return accountIcons['Unityroom'];
		if (title.includes('bluesky') || desc.includes('bluesky')) return accountIcons['Bluesky'];
		if (title.includes('npm') || desc.includes('npm')) return accountIcons['npm'];
		
		return '🔗'; // デフォルトアイコン
	}

	// アカウント名を抽出
	function getAccountName(account: ProcessedProject): string {
		const title = account.title.toLowerCase();
		if (title.includes('github')) return 'GitHub';
		if (title.includes('nostr')) return 'Nostr';
		if (title.includes('zenn')) return 'Zenn';
		if (title.includes('unityroom')) return 'Unityroom';
		if (title.includes('bluesky')) return 'Bluesky';
		if (title.includes('npm')) return 'npm';
		return account.title;
	}

	// アカウントIDを取得
	function getAccountId(account: ProcessedProject): string {
		return account.description || account.title;
	}
</script>

<section class="account-section">
	<div class="section-header">
		<h2 class="section-title">
			<span class="section-icon">👤</span>
			アカウント
		</h2>
		<span class="count-badge">{accounts.length}</span>
	</div>

	<div class="accounts-grid">
		{#each accounts as account}
			<div class="account-card">
				<div class="account-icon">
					{getAccountIcon(account)}
				</div>
				<div class="account-info">
					<div class="account-name">{getAccountName(account)}</div>
					<div class="account-id">{getAccountId(account)}</div>
				</div>
				{#if account.url}
					<a href={account.url} target="_blank" rel="noopener noreferrer" class="account-link">
						<span class="link-icon">🔗</span>
					</a>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.account-section {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid #f8f9fa;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c3e50;
	}

	.section-icon {
		font-size: 1.5rem;
	}

	.count-badge {
		background: #e9ecef;
		color: #6c757d;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.accounts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.account-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border: 2px solid #e9ecef;
		border-radius: 8px;
		transition: all 0.2s ease;
		background: #f8f9fa;
	}

	.account-card:hover {
		border-color: #3498db;
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.1);
		transform: translateY(-2px);
	}

	.account-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.account-info {
		flex: 1;
		min-width: 0;
	}

	.account-name {
		font-weight: 600;
		color: #2c3e50;
		margin-bottom: 0.25rem;
	}

	.account-id {
		color: #6c757d;
		font-size: 0.875rem;
		word-break: break-word;
	}

	.account-link {
		color: #3498db;
		text-decoration: none;
		padding: 0.5rem;
		border-radius: 6px;
		transition: background 0.2s ease;
		flex-shrink: 0;
	}

	.account-link:hover {
		background: rgba(52, 152, 219, 0.1);
	}

	.link-icon {
		font-size: 1.25rem;
	}

	@media (max-width: 768px) {
		.accounts-grid {
			grid-template-columns: 1fr;
		}
		
		.account-card {
			gap: 0.75rem;
		}
		
		.account-icon {
			font-size: 1.5rem;
		}
	}
</style>