<script lang="ts">
	import '../app.css';
</script>

<div class="app">
	<header class="app-header">
		<div class="container">
			<h1 class="app-title">
				<span class="mono-icon">₍ ･ᴗ･ ₎</span>
				もの の活動記録
			</h1>
			<p class="app-subtitle">Projects, Tools, and Creations by mono</p>
		</div>
	</header>

	<main class="app-main">
		<div class="container">
			<nostr-container relays={`["wss://nos.lol","wss://yabu.me","wss://relay.nostr.band"]`}
			></nostr-container>
			<slot />
		</div>
	</main>

	<footer class="app-footer">
		<div class="container">
			<p>&copy; 2024 mono ₍ ･ᴗ･ ₎</p>
			<div class="social-links">
				<a href="https://github.com/TsukemonoGit" target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>
				<a href="https://zenn.dev/konemono" target="_blank" rel="noopener noreferrer">Zenn</a>
				<a
					href="https://bsky.app/profile/mono.bsky.social"
					target="_blank"
					rel="noopener noreferrer">Bluesky</a
				>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.app-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 2rem 0;
		text-align: center;
	}

	.app-title {
		margin: 0 0 0.5rem 0;
		font-size: 2.5rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.mono-icon {
		font-size: 2rem;
		font-weight: normal;
	}

	.app-subtitle {
		margin: 0;
		font-size: 1.1rem;
		opacity: 0.9;
		font-weight: 300;
	}

	.app-main {
		flex: 1;
		background: #f8f9fa;
		padding: 2rem 0;
	}

	.app-footer {
		background: #2c3e50;
		color: white;
		padding: 1.5rem 0;
	}

	.app-footer .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.app-footer p {
		margin: 0;
		font-size: 0.875rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-links a {
		color: white;
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;
	}

	.social-links a:hover {
		color: #3498db;
	}

	@media (max-width: 768px) {
		.app-title {
			font-size: 2rem;
			flex-direction: column;
			gap: 0.25rem;
		}

		.app-subtitle {
			font-size: 1rem;
		}

		.app-footer .container {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
