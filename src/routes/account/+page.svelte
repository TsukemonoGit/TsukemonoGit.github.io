<script lang="ts">
	import projectsData from '../../lib/generated/data.json';
	import { getAccounts, type Project } from '$lib/utils/csv';
	
	const accounts = getAccounts(projectsData as Project[]);
	
	// Account type icons and colors
	const accountMeta: Record<string, { icon: string; color: string; borderColor: string }> = {
		'Zenn': { icon: '📝', color: 'text-[var(--color-success)]', borderColor: 'border-[var(--color-success)]/30' },
		'Github': { icon: '🐙', color: 'text-[var(--color-heading)]', borderColor: 'border-[var(--color-heading)]/30' },
		'Nostr': { icon: '🔔', color: 'text-[var(--color-primary)]', borderColor: 'border-[var(--color-primary)]/30' },
		'Unityroom': { icon: '🎮', color: 'text-[var(--color-accent)]', borderColor: 'border-[var(--color-accent)]/30' },
		'Bluesky': { icon: '🦋', color: 'text-[var(--color-secondary)]', borderColor: 'border-[var(--color-secondary)]/30' },
		'npm': { icon: '📦', color: 'text-[var(--color-danger)]', borderColor: 'border-[var(--color-danger)]/30' },
	};
</script>

<div>
	<!-- Header -->
	<div class="text-center py-16">
		<div class="text-7xl mb-4">₍ ･ᴗ･ ₎</div>
		<h1 class="text-4xl font-bold text-[var(--color-heading)]">
			Accounts
		</h1>
		<p class="text-[var(--color-text-muted)] mt-2">
			各プラットフォームで活動してるよ
		</p>
	</div>

	<!-- Account Cards -->
	<div class="max-w-3xl mx-auto px-4 pb-20">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each accounts as account}
				{#if accountMeta[account.Title]}
					<a
						href={account.Url}
						target="_blank"
						rel="noopener"
						class="group block rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:-translate-y-1 {accountMeta[account.Title].borderColor}"
					>
						<div class="flex items-start gap-4">
							<div class="text-4xl flex-shrink-0">{accountMeta[account.Title].icon}</div>
							<div class="flex-1 min-w-0">
								<h3 class="text-xl font-bold text-[var(--color-heading)] group-hover:text-[var(--color-primary-light)] transition-colors">
									{account.Title}
								</h3>
								{#if account.Desc}
									<p class="text-sm text-[var(--color-text-muted)] mt-1">{account.Desc}</p>
								{/if}
								{#if account.Npub}
									<p class="text-xs text-[var(--color-primary)] mt-2 font-mono break-all">
										{account.Npub}
									</p>
								{/if}
							</div>
							<div class="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors flex-shrink-0 self-center">
								→
							</div>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>
