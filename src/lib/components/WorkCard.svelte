<!-- Card.svelte -->
<script>
	let { image, title, description, tags = [], url, buttonText = '見る' } = $props();
</script>

<div class="card">
	{#if image}
		<figure>
			<img src={image} alt={title} />
		</figure>
	{/if}
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p class="description">{description}</p>
		{#if tags.length > 0}
			<div class="tags">
				{#each tags as tag}
					<span class="badge">{tag}</span>
				{/each}
			</div>
		{/if}
		<div class="card-actions">
			<a class="btn" href={url} target="_blank" rel="noopener noreferrer">
				{buttonText}
			</a>
		</div>
	</div>
</div>

<style>
	.card {
		background: white;
		border-radius: 0.5rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		max-width: 24rem;
	}

	figure {
		width: 100%;
		height: 12rem;
		overflow: hidden;
		margin: 0;
	}

	figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-body {
		padding: 1.5rem;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		color: #1f2937;
	}

	.description {
		color: #6b7280;
		margin-bottom: 1rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge {
		padding: 0.25rem 0.75rem;
		font-size: 0.875rem;
		border: 1px solid #3b82f6;
		color: #3b82f6;
		border-radius: 9999px;
		background: transparent;
	}

	.card-actions {
		display: flex;
		justify-content: flex-end;
	}

	.btn {
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		text-decoration: none;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background: #2563eb;
	}
</style>
