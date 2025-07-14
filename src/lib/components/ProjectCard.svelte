<script lang="ts">
  import type { ProcessedProject } from '$lib/types';
  import { minorCategoryConfigs } from '$lib/types';

  interface Props {
    project: ProcessedProject;
  }

  let { project }: Props = $props();

const config = minorCategoryConfigs[project.minorCategory];
</script>

<div class="project-card" style="--minor-color: {config.color}">
  <div class="card-header">
    <div class="project-info">
      <span class="project-icon">{config.icon}</span>
      <h3 class="project-title">
        {#if project.url}
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        {:else}
          {project.title}
        {/if}
      </h3>
    </div>
    <div class="project-meta">
      <span class="project-date">{project.date}</span>
    </div>
  </div>

  {#if project.description}
    <div class="project-description">
      {project.description}
    </div>
  {/if}

  <div class="project-details">
    {#if project.primaryGenre}
      <div class="detail-item">
        <span class="detail-label">ジャンル:</span>
        <span class="detail-value">{project.primaryGenre}</span>
        {#if project.secondaryGenre}
          <span class="detail-value">, {project.secondaryGenre}</span>
        {/if}
      </div>
    {/if}

    {#if project.keywords.length > 0}
      <div class="detail-item">
        <span class="detail-label">キーワード:</span>
        <div class="keywords">
          {#each project.keywords as keyword}
            <span class="keyword">{keyword}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="card-footer">
    {#if project.source}
      <a href={project.source} target="_blank" rel="noopener noreferrer" class="source-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ソース
      </a>
    {/if}
    
    <div class="category-badge">
      {config.name}
    </div>
  </div>
</div>

<style>
	.project-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		margin-bottom: 1.5rem;
	}

	.project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		border-bottom: 1px solid #dee2e6;
	}

	.category-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.category-icon {
		font-size: 1rem;
	}

	.date-badge {
		font-size: 0.875rem;
		color: #6c757d;
		font-weight: 500;
	}

	.card-content {
		padding: 1.5rem;
	}

	.project-title {
		margin: 0 0 1rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.project-title a {
		color: #2c3e50;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.project-title a:hover {
		color: #3498db;
	}

	.project-description {
		margin: 0 0 1rem 0;
		color: #555;
		line-height: 1.6;
	}

	.project-meta {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.genre-tag {
		padding: 0.25rem 0.75rem;
		border-radius: 15px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.genre-tag.primary {
		background: #3498db;
		color: white;
	}

	.genre-tag.secondary {
		background: #95a5a6;
		color: white;
	}

	.keywords {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.keyword-tag {
		padding: 0.25rem 0.5rem;
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 10px;
		font-size: 0.75rem;
		color: #6c757d;
	}

	.project-links {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.link-button {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.link-button.demo {
		background: #3498db;
		color: white;
	}

	.link-button.demo:hover {
		background: #2980b9;
	}

	.link-button.source {
		background: #2ecc71;
		color: white;
	}

	.link-button.source:hover {
		background: #27ae60;
	}

	.nostr-embed {
		margin-top: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
		border: 1px solid #e9ecef;
	}

	@media (max-width: 768px) {
		.card-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.project-links {
			flex-direction: column;
		}

		.keywords {
			gap: 0.25rem;
		}
	}
</style>
