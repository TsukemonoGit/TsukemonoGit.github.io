<script lang="ts">
	let { projects, orderedMajorCategories, majorCategoryConfigs, stats } = $props();
</script>

<div class="stats">
	<div class="total-projects">
		<span class="stat-number">{projects.length}</span>
		<span class="stat-label">プロジェクト</span>
	</div>
	<div class="category-counts">
		{#each orderedMajorCategories as category}
			<a class="category-stat" href={`#${category}`}>
				<span class="stat-icon">{majorCategoryConfigs[category].icon}</span>
				<span class="stat-count">{stats.majorStats[category]}</span>
				<span class="stat-label">{majorCategoryConfigs[category].name}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	.stats {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1.25rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
		border-radius: 8px;
		align-items: center;
		background-color: rgb(232, 238, 255);
	}

	.total-projects {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 1rem;
		margin-right: 1rem;
		border-right: 1px solid #e2e8f0;
	}

	.stat-number {
		font-size: 2.25rem;
		font-weight: 700;
		color: #1f2937;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #6b7280;
		font-weight: 500;
		margin-top: 0.25rem;
	}

	.category-counts {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		flex: 1;
	}

	.category-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.875rem;
		background-color: #fff;
		border-radius: 10px;
		min-width: 95px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		text-decoration: none;
		color: inherit;
	}

	.category-stat:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
	}

	.stat-icon {
		font-size: 1.75rem;
		margin-bottom: 0.5rem;
		opacity: 0.85;
		color: #4f46e5; /* より目立つブルーに */
	}

	.stat-count {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		line-height: 1.1;
	}

	.category-stat .stat-label {
		font-size: 0.8125rem;
		text-align: center;
		margin-top: 0.25rem;
		line-height: 1.2;
		color: #6b7280;
	}

	.category-counts {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		flex: 1;
		justify-content: flex-start;
	}

	.category-stat .stat-label {
		font-size: 0.8rem;
		text-align: center;
		margin-top: 0.25rem;
		line-height: 1.2;
	}

	@media (max-width: 768px) {
		.stats {
			flex-direction: column;
			gap: 1.5rem;
			padding: 1rem;
		}

		.total-projects {
			padding-right: 0;
			margin-right: 0;
			border-right: none;
			border-bottom: 1px solid #e2e8f0;
			padding-bottom: 1rem;
		}

		.category-counts {
			justify-content: center;
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.category-counts {
			gap: 0.75rem;
		}

		.category-stat {
			min-width: 75px;
			padding: 0.5rem;
		}

		.stat-icon {
			font-size: 1.25rem;
		}

		.stat-count {
			font-size: 1.125rem;
		}

		.category-stat .stat-label {
			font-size: 0.75rem;
		}
	}
</style>
