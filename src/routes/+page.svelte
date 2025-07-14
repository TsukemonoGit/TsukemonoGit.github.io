<!--+page.svelte-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { groupByCategoryHierarchy } from '$lib/dataParser';
	import type {
		ProcessedProject,
		MajorCategory,
		MinorCategory,
		CategoryHierarchy
	} from '$lib/types';
	import {
		majorCategories,
		minorCategories,
		majorCategoryConfigs,
		minorCategoryConfigs
	} from '$lib/types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import AccountSection from '$lib/components/AccountSection.svelte';

	let projects: ProcessedProject[] = $state([]);
	let categoryHierarchy: CategoryHierarchy = $state({});
	let loading = $state(true);
	let error = $state('');
	let searchQuery = $state('');
	let selectedMajorCategory = $state<MajorCategory | 'all'>('all');
	let selectedMinorCategory = $state<MinorCategory | 'all'>('all');
	let expandedCategories = $state<Set<MajorCategory>>(new Set());

	// フィルタリングされたプロジェクト
	let filteredHierarchy = $derived(() => {
		if (!searchQuery && selectedMajorCategory === 'all' && selectedMinorCategory === 'all') {
			return categoryHierarchy;
		}

		const filtered: CategoryHierarchy = {};

		Object.entries(categoryHierarchy).forEach(([majorCat, majorData]) => {
			// 大分類フィルタ
			if (selectedMajorCategory !== 'all' && majorCat !== selectedMajorCategory) {
				return;
			}

			let filteredProjects = majorData.projects;

			// 小分類フィルタ
			if (selectedMinorCategory !== 'all') {
				filteredProjects = filteredProjects.filter(
					(project) => project.minorCategory === selectedMinorCategory
				);
			}

			// 検索フィルタ
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				filteredProjects = filteredProjects.filter(
					(project) =>
						project.title.toLowerCase().includes(query) ||
						project.description.toLowerCase().includes(query) ||
						project.primaryGenre.toLowerCase().includes(query) ||
						project.secondaryGenre.toLowerCase().includes(query) ||
						project.keywords.some((k) => k.toLowerCase().includes(query))
				);
			}

			if (filteredProjects.length > 0) {
				// フィルタ結果の小分類を更新
				const activeMinors = new Set<MinorCategory>();
				filteredProjects.forEach((project) => {
					activeMinors.add(project.minorCategory);
				});

				filtered[majorCat] = {
					major: majorData.major,
					minors: Array.from(activeMinors),
					projects: filteredProjects
				};
			}
		});

		return filtered;
	});

	// 統計情報
	let stats = $derived(() => {
		const majorStats: Record<MajorCategory, number> = {} as Record<MajorCategory, number>;
		const minorStats: Record<MinorCategory, number> = {} as Record<MinorCategory, number>;

		// 初期化
		majorCategories.forEach((major) => {
			majorStats[major] = 0;
		});
		minorCategories.forEach((minor) => {
			minorStats[minor] = 0;
		});

		// カウント
		Object.values(categoryHierarchy).forEach((majorData) => {
			majorStats[majorData.major] = majorData.projects.length;

			majorData.projects.forEach((project) => {
				minorStats[project.minorCategory]++;
			});
		});

		return { majorStats, minorStats };
	});

	// 表示順序（プロジェクト数の多い順）
	let orderedMajorCategories = $derived.by(() => {
		const { majorStats } = stats();
		return majorCategories.filter((category) => majorStats[category] > 0);
		//.sort((a, b) => majorStats[b] - majorStats[a]);// プロジェクト数の多い順にソート
	});

	// 選択された大分類に含まれる小分類
	let availableMinorCategories = $derived(() => {
		if (selectedMajorCategory === 'all') {
			return minorCategories.filter((minor) => {
				const { minorStats } = stats();
				return minorStats[minor] > 0;
			});
		}

		const majorData = categoryHierarchy[selectedMajorCategory];
		return majorData ? majorData.minors : [];
	});

	onMount(async () => {
		try {
			loading = true;
			error = '';

			const response = await fetch('/data.json');
			const raw = await response.json();

			projects = raw;
			categoryHierarchy = groupByCategoryHierarchy(projects);
			expandedCategories = new Set(['アプリケーション', 'ライブラリ・コンポーネント']);
		} catch (e) {
			error = e instanceof Error ? e.message : 'データの読み込みに失敗しました';
			console.error('Error loading data:', e);
		} finally {
			loading = false;
		}
	});

	function toggleMajorCategory(category: MajorCategory) {
		if (expandedCategories.has(category)) {
			expandedCategories.delete(category);
		} else {
			expandedCategories.add(category);
		}
		expandedCategories = new Set(expandedCategories);
	}

	function expandAll() {
		expandedCategories = new Set(orderedMajorCategories);
	}

	function collapseAll() {
		expandedCategories = new Set();
	}

	// 大分類選択が変更された時に小分類をリセット
	$effect(() => {
		selectedMinorCategory = 'all';
	});
</script>

<svelte:head>
	<title>もの₍ ･ᴗ･ ₎の活動記録</title>
	<meta
		name="description"
		content="mono's projects, tools, and creations - Nostr apps, games, libraries, and more"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<h1>もの₍ ･ᴗ･ ₎の活動記録</h1>

{#if loading}
	<div class="loading">
		<div class="loading-spinner"></div>
		<p>データを読み込んでいます...</p>
	</div>
{:else if error}
	<div class="error">
		<h2>エラーが発生しました</h2>
		<p>{error}</p>
	</div>
{:else}
	<div class="controls">
		<div class="search-section">
			<input
				type="text"
				placeholder="プロジェクトを検索..."
				bind:value={searchQuery}
				class="search-input"
			/>
		</div>

		<div class="filter-section">
			<div class="filter-group">
				<label for="major-category-filter">大分類:</label>
				<select
					id="major-category-filter"
					bind:value={selectedMajorCategory}
					class="category-select"
				>
					<option value="all">すべて ({projects.length})</option>
					{#each orderedMajorCategories as category}
						<option value={category}>
							{majorCategoryConfigs[category].name} ({stats().majorStats[category]})
						</option>
					{/each}
				</select>
			</div>

			<div class="filter-group">
				<label for="minor-category-filter">小分類:</label>
				<select
					id="minor-category-filter"
					bind:value={selectedMinorCategory}
					class="category-select"
				>
					<option value="all">すべて</option>
					{#each availableMinorCategories() as category}
						<option value={category}>
							{minorCategoryConfigs[category].name} ({stats().minorStats[category]})
						</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="action-buttons">
			<button onclick={expandAll} class="action-button">すべて展開</button>
			<button onclick={collapseAll} class="action-button">すべて折りたたみ</button>
		</div>
	</div>

	<div class="stats">
		<div class="total-projects">
			<span class="stat-number">{projects.length}</span>
			<span class="stat-label">プロジェクト</span>
		</div>
		<div class="category-counts">
			{#each orderedMajorCategories as category}
				<div class="category-stat">
					<span class="stat-icon">{majorCategoryConfigs[category].icon}</span>
					<span class="stat-count">{stats().majorStats[category]}</span>
					<span class="stat-label">{majorCategoryConfigs[category].name}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="projects-container">
		{#each orderedMajorCategories as majorCategory}
			{@const majorData = filteredHierarchy()[majorCategory]}
			{#if majorData && majorData.projects.length > 0}
				{#if majorData.major === 'アカウント'}
					<AccountSection accounts={majorData.projects} />
				{:else}
					<div class="major-category-section">
						<button
							class="major-category-header"
							onclick={() => toggleMajorCategory(majorCategory)}
						>
							<h2>
								<span class="category-icon">{majorCategoryConfigs[majorCategory].icon}</span>
								{majorCategoryConfigs[majorCategory].name}
								<span class="project-count">({majorData.projects.length})</span>
							</h2>
							<div class="expand-button" class:expanded={expandedCategories.has(majorCategory)}>
								{expandedCategories.has(majorCategory) ? '▼' : '▶'}
							</div>
						</button>

						{#if expandedCategories.has(majorCategory)}
							<div class="major-category-content">
								{#each majorData.minors as minorCategory}
									{@const minorProjects = majorData.projects.filter(
										(p) => p.minorCategory === minorCategory
									)}
									{#if minorProjects.length > 0}
										<div class="minor-category-section">
											<h3 class="minor-category-header">
												<span class="category-icon">{minorCategoryConfigs[minorCategory].icon}</span
												>
												{minorCategoryConfigs[minorCategory].name}
												<span class="project-count">({minorProjects.length})</span>
											</h3>
											<div class="projects-grid">
												{#each minorProjects as project}
													<ProjectCard {project} />
												{/each}
											</div>
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/if}{/if}
		{/each}
	</div>

	{#if Object.keys(filteredHierarchy()).length === 0}
		<div class="no-results">
			<p>検索条件に一致するプロジェクトが見つかりませんでした。</p>
		</div>
	{/if}
{/if}

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.loading-spinner {
		width: 2rem;
		height: 2rem;
		border: 3px solid #f3f4f6;
		border-top: 3px solid #3b82f6;
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
		background-color: #fee2e2;
		border: 1px solid #fca5a5;
		color: #991b1b;
		padding: 1rem;
		border-radius: 0.5rem;
		margin: 1rem 0;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: #f8fafc;
		border-radius: 0.5rem;
	}

	.search-section {
		display: flex;
		gap: 1rem;
	}

	.search-input {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 1rem;
	}

	.filter-section {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.filter-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.category-select {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		background-color: white;
		min-width: 200px;
	}

	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.action-button {
		padding: 0.5rem 1rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.action-button:hover {
		background-color: #2563eb;
	}

	.stats {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: #f8fafc;
		border-radius: 0.5rem;
		align-items: center;
	}

	.total-projects {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: bold;
		color: #1f2937;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.category-counts {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.category-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
		background-color: white;
		border-radius: 0.375rem;
		min-width: 80px;
	}

	.stat-icon {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.stat-count {
		font-size: 1.25rem;
		font-weight: bold;
		color: #1f2937;
	}

	.projects-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.major-category-section {
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.major-category-header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #f9fafb;
		cursor: pointer;
		border-bottom: 1px solid #e5e7eb;
	}

	.major-category-header:hover {
		background-color: #f3f4f6;
	}

	.major-category-header h2 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.25rem;
	}

	.category-icon {
		font-size: 1.5rem;
	}

	.project-count {
		color: #6b7280;
		font-weight: normal;
	}

	.expand-button {
		background: none;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0.25rem;
		color: #6b7280;
		transition: transform 0.2s;
	}

	.expand-button.expanded {
		transform: rotate(0deg);
	}

	.major-category-content {
		padding: 1rem;
	}

	.minor-category-section {
		margin-bottom: 2rem;
	}

	.minor-category-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 1rem 0;
		padding: 0.5rem;
		background-color: #f8fafc;
		border-radius: 0.375rem;
		font-size: 1.125rem;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.no-results {
		text-align: center;
		padding: 2rem;
		color: #6b7280;
	}

	@media (max-width: 768px) {
		.controls {
			padding: 0.75rem;
		}

		.filter-section {
			flex-direction: column;
		}

		.category-select {
			min-width: unset;
		}

		.stats {
			flex-direction: column;
			gap: 1rem;
		}

		.category-counts {
			justify-content: center;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
