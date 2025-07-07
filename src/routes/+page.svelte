<script lang="ts">
	import Games from '$lib/components/Games.svelte';
	import Nostr from '$lib/components/Nostr.svelte';
	import Overview from '$lib/components/Overview.svelte';
</script>

<!-- メインコンテンツ -->
<main class="min-h-screen">
	<Overview />

	<Games />
	<Nostr />
</main>
