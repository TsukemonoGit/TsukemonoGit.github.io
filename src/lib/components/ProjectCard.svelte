<script lang="ts">
	import type { ProcessedProject } from '$lib/types';

	interface Props {
		project: ProcessedProject;
	}

	let { project }: Props = $props();
</script>

<div class="card">
	<div class="card-body">
		<div class="grid grid-cols-[auto_1fr] gap-1">
			{#if project.picture}
				<div class="card-image">
					<img src={project.picture} alt={project.title} />
				</div>
			{/if}

			<div class="card-content">
				<h2 class="card-title">
					{#if project.url}
						<a href={project.url} target="_blank" rel="noopener noreferrer">
							{project.title}
						</a>
					{:else}
						{project.title}
					{/if}
				</h2>

				{#if project.npub}
					<nostr-profile display="compact" user={project.npub} href={`https://lumilumi.app/{id}`}
					></nostr-profile>
				{/if}

				{#if project.description}
					<p class="card-description">{project.description}</p>
				{/if}
			</div>
		</div>
		{#if project.keywords.length > 0}
			<div class="flex flex-wrap gap-0.5">
				{#each project.keywords as keyword}
					<span class="tag">{keyword}</span>
				{/each}
			</div>
		{/if}

		<div class="meta-footer">
			{#if project.date}
				<span class="date">{project.date}</span>
			{/if}

			{#if project.source}
				<a class="source-button" href={project.source} target="_blank" rel="noopener noreferrer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.001 8.001 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/>
					</svg>
					ソースコードを見る
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		overflow: hidden;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		border-color: #cbd5e1;
	}

	.card:hover::before {
		opacity: 1;
	}

	.card-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.card-image {
		width: 96px;
		height: 96px;
		flex-shrink: 0;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid #e2e8f0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.3;
		margin: 0;
		background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.card-title a {
		color: inherit;
		text-decoration: none;
		position: relative;
		background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		transition: all 0.3s ease;
	}

	.card-title a::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #3b82f6, #6366f1);
		transition: width 0.3s ease;
	}

	.card-title a:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.card-title a:hover::after,
	.card-title a:focus::after {
		width: 100%;
	}

	.card-title a:hover {
		background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.card-description {
		color: #64748b;
		font-size: 0.95rem;
		line-height: 1.6;
		white-space: pre-wrap;
	}

	.tag {
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
		color: #1e40af;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		border: 1px solid #bfdbfe;
	}

	.meta-footer {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
		color: #64748b;
	}

	.date {
		background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
		padding: 0.375rem 0.75rem;
		border-radius: 0.5rem;
		font-weight: 500;
		border: 1px solid #e2e8f0;
	}

	.source-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.source-button:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.source-button:hover,
	.source-button:focus {
		transform: translateY(-1px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
		background: linear-gradient(135deg, #334155 0%, #475569 100%);
	}

	.source-button svg {
		transition: transform 0.3s ease;
	}

	.source-button:hover svg,
	.source-button:focus svg {
		transform: scale(1.1);
	}

	/* fallback if no image */
	.card-body:not(:has(.card-image)) .card-content {
		width: 100%;
	}
</style>
