import ExcelJS from 'exceljs';
import { majorCategories, minorCategories } from './types';

// XLSXファイルを読み込む関数
export async function loadXLSXData(xlsxPath) {
    const response = await fetch(xlsxPath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    const jsonData = [];
    worksheet?.eachRow((row, rowNumber) => {
        const rowData = [];
        row.eachCell((cell, colNumber) => {
            rowData[colNumber - 1] = cell.value ? cell.value.toString() : '';
        });
        jsonData.push(rowData);
    });
    const headers = jsonData[0];
    const rows = jsonData.slice(1);
    return rows
        .filter((row) => row.length > 0 && row[0] && row[0].trim() !== '')
        .map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || '';
        });
        return obj;
    });
}
// 日付文字列を解析する関数
function parseDate(dateStr) {
    if (!dateStr)
        return { year: 0, month: 0 };
    const cleanDate = dateStr.replace(/\s+/g, ' ').trim();
    const yearMatch = cleanDate.match(/20(\d{2})/);
    const year = yearMatch ? parseInt(`20${yearMatch[1]}`) : 0;
    const monthPatterns = [
        { pattern: /jan/i, month: 1 },
        { pattern: /feb/i, month: 2 },
        { pattern: /mar/i, month: 3 },
        { pattern: /apr/i, month: 4 },
        { pattern: /may/i, month: 5 },
        { pattern: /jun/i, month: 6 },
        { pattern: /jul/i, month: 7 },
        { pattern: /aug/i, month: 8 },
        { pattern: /sep/i, month: 9 },
        { pattern: /oct/i, month: 10 },
        { pattern: /nov/i, month: 11 },
        { pattern: /dec/i, month: 12 }
    ];
    let month = 0;
    for (const { pattern, month: m } of monthPatterns) {
        if (pattern.test(cleanDate)) {
            month = m;
            break;
        }
    }
    if (month === 0) {
        const numMonthMatch = cleanDate.match(/(\d{1,2})/);
        if (numMonthMatch) {
            const num = parseInt(numMonthMatch[1]);
            if (num >= 1 && num <= 12) {
                month = num;
            }
        }
    }
    return { year, month };
}
// 大分類・小分類を正規化する関数
function normalizeMajorCategory(category) {
    const normalized = category.trim();
    if (majorCategories.includes(normalized)) {
        return normalized;
    }
    return 'その他';
}
function normalizeMinorCategory(category) {
    const normalized = category.trim();
    if (minorCategories.includes(normalized)) {
        return normalized;
    }
    return '未分類';
}
// データを処理する関数
export function processProjectData(rawData) {
    return rawData.map((item, index) => {
        const { year, month } = parseDate(item['Date']);
        const keywords = (item.他キーワード ?? '')
            .split(/[、,，]/)
            .map((k) => (typeof k === 'string' ? k.trim() : ''))
            .filter((k) => k.length > 0);
        const majorCategory = normalizeMajorCategory(item.大分類);
        const minorCategory = normalizeMinorCategory(item.小分類);
        return {
            id: `project-${index}`,
            title: safeTrim(item.Title),
            url: safeTrim(item.Url),
            description: safeTrim(item.Desc),
            source: safeTrim(item.Source),
            date: safeTrim(item['Date']),
            primaryGenre: safeTrim(item.ジャンル１),
            secondaryGenre: safeTrim(item.ジャンル２),
            keywords,
            majorCategory,
            minorCategory,
            year,
            month
        };
    });
}
// 階層構造でグループ化する関数
export function groupByCategoryHierarchy(projects) {
    const hierarchy = {};
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
        const majorCategory = majorCat;
        const projects = hierarchy[majorCat].projects;
        // 小分類を抽出
        const minorsInCategory = new Set();
        projects.forEach(project => {
            minorsInCategory.add(project.minorCategory);
        });
        hierarchy[majorCat].minors = Array.from(minorsInCategory);
        // プロジェクトを日付順にソート（新しい順）
        hierarchy[majorCat].projects.sort((a, b) => {
            if (a.year !== b.year)
                return b.year - a.year;
            return b.month - a.month;
        });
    });
    return hierarchy;
}
// 小分類ごとにプロジェクトをグループ化
export function groupByMinorCategory(projects) {
    const groups = {};
    // 初期化
    minorCategories.forEach(minor => {
        groups[minor] = [];
    });
    // プロジェクトを分類
    projects.forEach(project => {
        const minorCat = project.minorCategory;
        if (!groups[minorCat]) {
            groups[minorCat] = [];
        }
        groups[minorCat].push(project);
    });
    // 各小分類内で日付順にソート
    Object.keys(groups).forEach(minorCat => {
        groups[minorCat].sort((a, b) => {
            if (a.year !== b.year)
                return b.year - a.year;
            return b.month - a.month;
        });
    });
    return groups;
}
// 文字列の .trim() 安全版
function safeTrim(value) {
    return typeof value === 'string' ? value.trim() : '';
}
