import { type ProcessedProject, type CategoryHierarchy, majorCategories, type MajorCategory, type MinorCategory } from "./types";

// 階層構造でグループ化する関数
export function groupByCategoryHierarchy(projects: ProcessedProject[]): CategoryHierarchy {
  const hierarchy: CategoryHierarchy = {};

  // 大分類ごとに初期化
  majorCategories.forEach(majorCat => {
    hierarchy[majorCat] = {
      major: majorCat,
      minors: [],
      projects: []
    };
  });

  // プロジェクトを分類
  projects.forEach(project => {
    const majorCat = project.majorCategory;
    if (!hierarchy[majorCat]) {
      hierarchy[majorCat] = {
        major: majorCat,
        minors: [],
        projects: []
      };
    }
    hierarchy[majorCat].projects.push(project);
  });

  // 各大分類内で小分類を整理
  Object.keys(hierarchy).forEach(majorCat => {
    const majorCategory = majorCat as MajorCategory;
    const projects = hierarchy[majorCat].projects;
    
    // 小分類を抽出
    const minorsInCategory = new Set<MinorCategory>();
    projects.forEach(project => {
      minorsInCategory.add(project.minorCategory);
    });
    
    hierarchy[majorCat].minors = Array.from(minorsInCategory);
    
    // プロジェクトを日付順にソート（新しい順）
    hierarchy[majorCat].projects.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  });

  return hierarchy;
}
