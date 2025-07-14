// scripts/preprocess-data.ts
import fs from 'fs/promises';
import path from 'path';
//import Papa from 'papaparse';CSV
//ExcelJS xlsx用
import ExcelJS from 'exceljs';

// 小分類の定義
 const minorCategories = [
  'Webアプリ',
  '自動投稿Bot',
  'Web Component',
  'ライブラリ',
  '拡張機能',
  'Webゲーム',
  'ソフトウェア',
  '記事',
  'カシふぁん作品',
  'GitHub',
  'Nostr機能',
  'Bluesky',
  'ブラウザ拡張',
  '未分類',
  'Zenn',       // 実データにあるので追加
  'Nostr',      // 実データにあるので追加
  'Game',       // 実データにあるので追加
  'npm'         // 実データにあるので追加
] ;
// 大分類の定義
 const majorCategories = [
  'ライブラリ・コンポーネント',
  'アプリケーション',
  "ゲーム",
  "記事・出版物",
  "Bot",
  'その他',
  "アカウント"
] ;

// 文字列の .trim() 安全版
function safeTrim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// 大分類・小分類を正規化する関数
function normalizeMajorCategory(category) {
  const normalized = safeTrim(category);
  if (majorCategories.includes(normalized)) {
    return normalized;
  }
  return 'その他';
}

function normalizeMinorCategory(category) {
  const normalized = safeTrim(category);
  if (minorCategories.includes(normalized )) {
    return normalized ;
  }
  return '未分類';
}

// 日付文字列を解析する関数
function parseDate(dateStr) {
  if (!dateStr) return { year: 0, month: 0 };

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

// データを処理する関数
export function processProjectData(rawData ){
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
      pubkey:safeTrim(item['Nostr Publickey']),
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


// Excel ファイルからデータを読み込む関数
async function loadExcelData(xlsxPath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(xlsxPath);
  const worksheet = workbook.worksheets[0];

  const headers = [];
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber - 1] = safeTrim(String(cell.value ?? ''));
  });

  const data= [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // ヘッダ行はスキップ
    const item = {};
    row.eachCell((cell, colNumber) => {
      const header = headers[colNumber - 1];
      item[header] = safeTrim(String(cell.value ?? ''));
    });
    data.push(item);
  });

  return data;
}

async function main() {
  const xlsxPath = path.resolve('static/data.xlsx');
  const jsonPath = path.resolve('static/data.json');

  const rawData = await loadExcelData(xlsxPath);
  const processed = processProjectData(rawData); // 既存の関数を再利用
  await fs.writeFile(jsonPath, JSON.stringify(processed, null, 2), 'utf-8');

  console.log(`✅ XLSX -> JSON 変換完了: ${jsonPath}`);
}

main().catch((err) => {
  console.error('❌ データ変換に失敗:', err);
  process.exit(1);
});
/* 
async function main() {
  const csvPath = path.resolve('static/data.csv');
  const jsonPath = path.resolve('static/data.json');

  const csvRaw = await fs.readFile(csvPath, 'utf-8');
  const { data } = Papa.parse(csvRaw, { header: true });

  const processed = processProjectData(data); // ProjectData[]
  await fs.writeFile(jsonPath, JSON.stringify(processed, null, 2), 'utf-8');

  console.log(`✅ CSV -> JSON 変換完了: ${jsonPath}`);
}

main().catch((err) => {
  console.error('❌ データ変換に失敗:', err);
  process.exit(1);
});
 */