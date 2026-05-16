<script lang="ts">
  import projectsData from "../../lib/generated/data.json";
  import {
    isProject,
    sortByDate,
    projectUrl,
    type Project,
  } from "$lib/utils/csv";

  const projects: Project[] = sortByDate(projectsData as Project[]).filter(
    isProject,
  );

  interface YearGroup {
    year: string;
    projects: Project[];
  }

  const byYear = (): YearGroup[] => {
    const map: Record<string, Project[]> = {};
    for (const p of projects) {
      const yearMatch = p.Date.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : "その他";
      if (!map[year]) map[year] = [];
      map[year].push(p);
    }
    return Object.entries(map)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .map(([year, projs]) => ({ year, projects: projs }));
  };

  const yearGroups = byYear();

  const categoryBg: Record<string, string> = {
    アプリケーション:
      "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]",
    "ライブラリ・コンポーネント":
      "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
    Bot: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    ゲーム: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
    "記事・出版物": "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  };
</script>

<div>
  <!-- Header -->
  <div class="text-center py-16">
    <div class="text-7xl mb-4">₍ ･ᴗ･ ₎</div>
    <h1 class="text-4xl font-bold text-[var(--color-heading)]">
      Activity Timeline
    </h1>
    <p class="text-[var(--color-text-muted)] mt-2">
      {projects.length}件のプロジェクトが時系列に並ぶよ
    </p>
  </div>

  <!-- Timeline -->
  <div class="max-w-4xl mx-auto px-4 pb-20">
    <div class="relative">
      <div
        class="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]"
      ></div>

      {#each yearGroups as group}
        <div class="relative mb-12">
          <div class="relative z-10 flex items-center mb-6">
            <div
              class="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white text-lg flex-shrink-0 shadow-lg shadow-primary/30"
            >
              {group.year}
            </div>
            <div class="ml-4 text-2xl font-bold text-heading">
              {group.year}年
            </div>
            <div class="ml-3 text-sm text-text-muted">
              {group.projects.length} projects
            </div>
          </div>

          <div class="ml-12 space-y-4">
            {#each group.projects as project}
              <a
                href={projectUrl(project)}
                target="_blank"
                rel="noopener"
                class="block group rounded-xl bg-surface border border-border p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-x-1"
              >
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                      {#if categoryBg[project["大分類"]]}
                        <span
                          class="px-2 py-0.5 rounded-full text-xs font-medium"
                          style="background: {categoryBg[project['大分類']]};"
                        >
                          {project["大分類"]}
                        </span>
                      {/if}
                      <span class="text-xs text-text-muted">
                        {project.Date}
                      </span>
                    </div>
                    <h3
                      class="text-lg font-semibold text-heading group-hover:text-primary-light transition-colors truncate"
                    >
                      {project.Title}
                    </h3>
                    {#if project.Desc}
                      <p
                        class="text-sm text-text-muted mt-1 line-clamp-2 leading-relaxed"
                      >
                        {@html project.Desc.replace(/\n/g, '<br>')}
                      </p>
                    {/if}
                    <div class="flex flex-wrap gap-1.5 mt-3">
                      {#each project["技術・プラットフォーム"]
                        .split(",")
                        .filter((t) => t.trim()) as tech}
                        <span
                          class="px-2 py-0.5 text-xs rounded-md bg-bg text-text-muted"
                        >
                          {tech.trim()}
                        </span>
                      {/each}
                    </div>
                  </div>
                  {#if project.Picture}
                    <div
                      class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--color-bg)]"
                    >
                      <img
                        src={project.Picture}
                        alt={project.Title}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  {/if}
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
