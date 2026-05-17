<script lang="ts">
  import projectsData from "../lib/generated/data.json";
  import {
    isProject,
    sortByDate,
    projectUrl,
    type Project,
  } from "$lib/utils/csv";

  const allProjects: Project[] = sortByDate(projectsData as Project[]).filter(
    isProject,
  );

  // Featured: projects with Featured === 'true'
  const featured = allProjects.filter((p) => p.Featured === "true");

  // Stats
  const totalProjects = allProjects.length;
  const apps = allProjects.filter(
    (p) => p["大分類"] === "アプリケーション",
  ).length;
  const libs = allProjects.filter(
    (p) => p["大分類"] === "ライブラリ・コンポーネント",
  ).length;
  const bots = allProjects.filter((p) => p["大分類"] === "Bot").length;
  const games = allProjects.filter((p) => p["大分類"] === "ゲーム").length;

  // Tech stack with counts
  const allTech = allProjects.flatMap((p) =>
    p["技術・プラットフォーム"]
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  );
  const techCounts: Record<string, number> = {};
  allTech.forEach((t) => {
    techCounts[t] = (techCounts[t] || 0) + 1;
  });
  const topTechs = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  // Filter state
  let activeTech = $state<string | null>(null);

  const filteredProjects = () => {
    if (!activeTech) return allProjects;
    return allProjects.filter((p) =>
      p["技術・プラットフォーム"].includes(activeTech!),
    );
  };

  const toggleTech = (tech: string) => {
    activeTech = activeTech === tech ? null : tech;
  };

  // Category badge colors
  const categoryColors: Record<string, string> = {
    アプリケーション: "from-cyan-500 to-blue-500",
    "ライブラリ・コンポーネント": "from-violet-500 to-purple-500",
    Bot: "from-emerald-500 to-teal-500",
    ゲーム: "from-amber-500 to-orange-500",
    "記事・出版物": "from-rose-500 to-pink-500",
  };

  const categoryBg: Record<string, string> = {
    アプリケーション: "bg-secondary/10 text-secondary",
    "ライブラリ・コンポーネント": "bg-primary/10 text-primary",
    Bot: "bg-success/10 text-success",
    ゲーム: "bg-accent/10 text-accent",
    "記事・出版物": "bg-danger/10 text-danger",
  };
</script>

<div>
  <!-- Hero Section -->
  <div class="relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 py-20 text-center">
      <div class="inline-block text-8xl mb-6 animate-bounce-slow">₍ ･ᴗ･ ₎</div>
      <h1 class="text-5xl md:text-6xl font-bold text-heading mb-4">
        mono<span class="text-primary">.</span>
      </h1>
      <p
        class="text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Nostr を中心に、Web
        アプリ・ライブラリ・Bot・ゲームを自作する開発者の活動記録
      </p>

      <!-- Quick stats -->
      <div class="flex flex-wrap justify-center gap-8 mb-12">
        <div class="text-center">
          <div class="text-3xl font-bold text-heading">
            {totalProjects}
          </div>
          <div class="text-sm text-text-muted">Projects</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-secondary">
            {apps}
          </div>
          <div class="text-sm text-text-muted">Applications</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary">
            {libs}
          </div>
          <div class="text-sm text-text-muted">Libraries</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-accent">
            {games}
          </div>
          <div class="text-sm text-text-muted">Games</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Featured Projects -->
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-heading mb-8 flex items-center gap-3">
      <span class="text-primary">✦</span>
      Featured Projects
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each featured as project}
        <a
          href={projectUrl(project)}
          target="_blank"
          rel="noopener"
          class="group relative rounded-2xl overflow-hidden bg-surface border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
        >
          <div
            class="h-1 bg-gradient-to-r {categoryColors[project['大分類']] ||
              'from-gray-500 to-gray-600'}"
          ></div>

          <div class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <span
                class="px-2 py-1 rounded-md text-xs font-medium"
                style="background: {categoryBg[project['大分類']] ||
                  'bg-surface-hover text-text-muted'}"
              >
                {project["大分類"]}
              </span>
              <span class="text-xs text-text-muted">{project.Date}</span>
            </div>

            {#if project.Picture}
              <div class="rounded-xl overflow-hidden mb-4 bg-bg">
                <img
                  src={project.Picture}
                  alt={project.Title}
                  class="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            {/if}

            <h3
              class="text-xl font-bold text-heading group-hover:text-primary-light transition-colors mb-2"
            >
              {project.Title}
            </h3>
            {#if project.Desc}
              <p
                class="text-sm text-text-muted leading-relaxed whitespace-pre-wrap mb-4"
              >
                {project.Desc}
              </p>
            {/if}

            <div class="flex flex-wrap gap-1.5">
              {#each project["技術・プラットフォーム"]
                .split(",")
                .slice(0, 4) as tech}
                {#if tech.trim()}
                  <span
                    class="px-2 py-0.5 text-xs rounded bg-bg text-text-muted"
                  >
                    {tech.trim()}
                  </span>
                {/if}
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <!-- Tech Stack Section -->
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-heading mb-8 flex items-center gap-3">
      <span class="text-secondary">⚡</span>
      Tech Stack
      {#if activeTech}
        <span class="text-sm font-normal text-text-muted">
          ({activeTech} でフィルター中)
          <button
            onclick={() => (activeTech = null)}
            class="ml-2 text-primary hover:underline"
          >
            クリア
          </button>
        </span>
      {/if}
    </h2>

    <div class="flex flex-wrap gap-3">
      {#each topTechs as [tech, count]}
        <button
          onclick={() => toggleTech(tech)}
          class="inline-flex items-center px-4 py-2 rounded-xl border transition-all duration-200 hover:-translate-y-1 cursor-pointer"
          style="
						background: {activeTech === tech
            ? 'var(--color-primary)'
            : 'var(--color-surface)'};
						border-color: {activeTech === tech
            ? 'var(--color-primary)'
            : 'var(--color-border)'};
						color: {activeTech === tech
            ? 'var(--color-heading)'
            : 'var(--color-text-muted)'};
						font-size: calc(0.75rem + {count * 0.04}rem);
					"
        >
          {tech}
          <span class="ml-1.5 text-xs opacity-60">×{count}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- All Projects Section -->
  <div class="max-w-6xl mx-auto px-4 py-12 pb-20">
    <h2 class="text-2xl font-bold text-heading mb-8 flex items-center gap-3">
      <span class="text-accent">📋</span>
      All Projects ({filteredProjects().length})
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredProjects() as project}
        <a
          href={projectUrl(project)}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 p-2 rounded-xl bg-surface border border-border transition-all duration-200 hover:border-primary/30 hover:bg-surface-hover group"
        >
          <div
            class="w-16 h-16 rounded-lg bg-bg flex items-center justify-center flex-shrink-0 text-sm"
          >
            {#if project.Picture}
              <img
                src={project.Picture}
                alt=""
                class="w-full h-full object-cover rounded-lg"
              />
            {:else}
              <span>📦</span>
            {/if}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3
                class="font-medium text-heading group-hover:text-primary-light transition-colors truncate"
              >
                {project.Title}
              </h3>
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-xs text-text-muted">{project.Date}</span>
              <span class="text-xs text-text-muted">•</span>
              <span class="text-xs text-text-muted">{project["小分類"]}</span>
            </div>
            {#if project.Desc}
              <div
                class="line-clamp-3 text-sm text-text-muted mt-0.5"
                title={project.Desc}
              >
                {project.Desc}
              </div>{/if}
          </div>
          <div
            class="text-text-muted group-hover:text-primary transition-colors flex-shrink-0"
          >
            →
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @keyframes bounce-slow {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
</style>
