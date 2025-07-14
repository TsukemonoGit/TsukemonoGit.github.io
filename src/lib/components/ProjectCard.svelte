<script lang="ts">
	import type { ProcessedProject } from '$lib/types';
	import { minorCategoryConfigs } from '$lib/types';

	interface Props {
		project: ProcessedProject;
	}

	let { project }: Props = $props();

	console.log(project.date);
</script>

<div class="project-card">
	<h4 class="project-title">
		{#if project.url}
			<a href={project.url} target="_blank" rel="noopener noreferrer">
				{project.title}
			</a>
		{:else}
			{project.title}
		{/if}
	</h4>
	{#if project.description}
		<p class="project-description">{project.description}</p>
	{/if}
	<div class="project-meta">
		{#if project.date}
			<span class="project-date">{project.date}</span>
		{/if}
		{#if project.primaryGenre}
			<span class="project-genre">{project.primaryGenre}</span>
		{/if}
		{#if project.secondaryGenre}
			<span class="project-genre">{project.secondaryGenre}</span>
		{/if}
	</div>
	{#if project.keywords.length > 0}
		<div class="project-keywords">
			{#each project.keywords as keyword}
				<span class="keyword-tag">{keyword}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.project-card {
		background-color: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 1rem;
		transition: box-shadow 0.2s;
	}

	.project-card:hover {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.project-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.project-title a {
		color: #3b82f6;
		text-decoration: none;
	}

	.project-title a:hover {
		text-decoration: underline;
	}

	.project-description {
		margin: 0 0 0.75rem 0;
		color: #6b7280;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.project-meta {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.project-date {
		background-color: #f3f4f6;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}

	.project-genre {
		background-color: #dbeafe;
		color: #1e40af;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}

	.project-keywords {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.keyword-tag {
		background-color: #f0f9ff;
		color: #0c4a6e;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
	}
</style>
