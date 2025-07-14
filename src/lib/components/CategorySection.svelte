<script lang="ts">
  import type { ProcessedProject, MajorCategory, MinorCategory } from '$lib/types';
  import { majorCategoryConfigs, minorCategoryConfigs } from '$lib/types';
  import ProjectCard from './ProjectCard.svelte';

  interface Props {
    majorCategory: MajorCategory;
    minorCategories: MinorCategory[];
    projects: ProcessedProject[];
    isExpanded: boolean;
    expandedMinors: Set<MinorCategory>;
    onclick: () => void;
    onToggleMinor: (minor: MinorCategory) => void;
  }

  let { 
    majorCategory, 
    minorCategories, 
    projects, 
    isExpanded, 
    expandedMinors,
    onclick, 
    onToggleMinor 
  }: Props = $props();

  // 小分類ごとにプロジェクトをグループ化
  let projectsByMinor = $derived(() => {
    const groups: Record<MinorCategory, ProcessedProject[]> = {} as Record<MinorCategory, ProcessedProject[]>;
    
    minorCategories.forEach(minor => {
      groups[minor] = projects.filter(p => p.minorCategory === minor);
    });
    
    return groups;
  });

  // 表示する小分類（プロジェクトがあるもののみ）
  let visibleMinors :MinorCategory[]= $derived(minorCategories.filter(minor => projectsByMinor()[minor].length > 0)
  );

  const config = majorCategoryConfigs[majorCategory];
</script>

<div class="category-section">
  <div class="category-header" onclick={onclick} style="--category-color: {config.color}">
    <div class="category-info">
      <span class="category-icon">{config.icon}</span>
      <h2 class="category-title">{config.name}</h2>
      <span class="project-count">({projects.length})</span>
    </div>
    <div class="expand-icon" class:expanded={isExpanded}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

  {#if isExpanded}
    <div class="minor-categories">
      {#each visibleMinors as minor}
        {@const minorProjects = projectsByMinor()[minor]}
        {@const minorConfig = minorCategoryConfigs[minor]}
        <div class="minor-category">
          <div 
            class="minor-header" 
            onclick={() => onToggleMinor(minor)}
            style="--minor-color: {minorConfig.color}"
          >
            <div class="minor-info">
              <span class="minor-icon">{minorConfig.icon}</span>
              <h3 class="minor-title">{minorConfig.name}</h3>
              <span class="minor-count">({minorProjects.length})</span>
            </div>
            <div class="expand-icon" class:expanded={expandedMinors.has(minor)}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L10 12L14 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          {#if expandedMinors.has(minor)}
            <div class="projects-grid">
              {#each minorProjects as project}
                <ProjectCard {project} />
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .category-section {
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, var(--category-color), color-mix(in srgb, var(--category-color) 80%, white));
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  .category-header:hover {
    background: linear-gradient(135deg, 
      color-mix(in srgb, var(--category-color) 90%, black), 
      color-mix(in srgb, var(--category-color) 70%, white)
    );
  }

  .category-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .category-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .project-count {
    font-size: 0.875rem;
    opacity: 0.9;
  }

  .expand-icon {
    transition: transform 0.2s;
  }

  .expand-icon.expanded {
    transform: rotate(180deg);
  }

  .minor-categories {
    background: #f9fafb;
  }

  .minor-category {
    border-top: 1px solid #e5e7eb;
  }

  .minor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: white;
    cursor: pointer;
    transition: background 0.2s;
    border-left: 4px solid var(--minor-color);
  }

  .minor-header:hover {
    background: #f3f4f6;
  }

  .minor-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .minor-icon {
    font-size: 1.25rem;
  }

  .minor-title {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    color: #374151;
  }

  .minor-count {
    font-size: 0.75rem;
    color: #6b7280;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: white;
  }

  @media (max-width: 768px) {
    .category-header {
      padding: 0.75rem 1rem;
    }

    .category-title {
      font-size: 1.1rem;
    }

    .minor-header {
      padding: 0.5rem 1rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }
</style>