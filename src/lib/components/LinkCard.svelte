<script lang="ts">
	import type { Work } from '$lib/data/state';

	let { work }: { work: Work } = $props();
</script>

<a
	href={work.url}
	target="_blank"
	class="btn preset-outlined-primary-500 btn-lg animate-fade-in h-auto flex-col gap-3 p-6 transition-all duration-300 hover:scale-105"
>
	<div class="text-3xl">
		{work.emoji}
	</div>
	<span class="text-sm font-semibold">{work.id}</span>
</a>
