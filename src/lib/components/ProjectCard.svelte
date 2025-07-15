<script lang="ts">
	import type { ProcessedProject } from '$lib/types';

	interface Props {
		project: ProcessedProject;
	}

	let { project }: Props = $props();
	console.log(project);
</script>

<div class="project-card">
	<div class="project-header">
		{#if project.picture}
			<div class="project-image">
				<img src={project.picture} alt={project.title} />
			</div>
		{/if}
		<div class="project-info">
			<h4 class="project-title">
				{#if project.url}
					<a href={project.url} target="_blank" rel="noopener noreferrer">
						{project.title}
					</a>
				{:else}
					{project.title}
				{/if}
			</h4>
			{#if project.npub}
				<div class="nostr">
					<nostr-profile display="compact" id={project.npub}></nostr-profile>
				</div>
			{/if}
			{#if project.description}
				<p class="project-description">{project.description}</p>
			{/if}
		</div>
	</div>

	<div class="project-footer">
		{#if project.date}
			<div class="project-meta">
				<span class="project-date">{project.date}</span>
			</div>
		{/if}

		{#if project.keywords.length > 0}
			<div class="project-keywords">
				{#each project.keywords as keyword}
					<span class="keyword-tag">{keyword}</span>
				{/each}
			</div>
		{/if}
	</div>
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

	.project-header {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	.project-image {
		flex-shrink: 0;
		width: 80px;
		height: 80px;
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid #e5e7eb;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-info {
		flex: 1;
		min-width: 0;
	}

	.project-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.project-title a {
		color: #3b82f6;
		text-decoration: none;
	}

	.project-title a:hover {
		text-decoration: underline;
	}

	.nostr {
		margin-bottom: 0.5rem;
	}

	.project-description {
		margin: 0;
		color: #6b7280;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.project-footer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.project-meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.project-date {
		background-color: #f3f4f6;
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

	/* 画像がない場合のスタイル調整 */
	.project-header:not(:has(.project-image)) .project-info {
		width: 100%;
	}
</style>
