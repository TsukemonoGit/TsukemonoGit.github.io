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

  const cleanDate = dateStr.replace(/\s+/g, '').trim();

  // 月名マッピング
  const monthMap = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
  };

  // 月名を数値に変換
  const getMonthNumber = (monthStr) => monthMap[monthStr.toLowerCase()] || 0;

  // 継続中プロジェクト形式: "Jun.2024 - 2025"
  const rangeMatch = cleanDate.match(/(\w{3})\.(\d{4})\s*-\s*(\d{4})/);
  if (rangeMatch) {
    const [, monthStr, startYear] = rangeMatch;
    return {
      year: parseInt(startYear),
      month: getMonthNumber(monthStr)
    };
  }

  // 通常形式: "Jul.2025"
  const normalMatch = cleanDate.match(/(\w{3})\.(\d{4})/);
  if (normalMatch) {
    const [, monthStr, yearStr] = normalMatch;
    return {
      year: parseInt(yearStr),
      month: getMonthNumber(monthStr)
    };
  }

  // フォールバック処理
  const yearMatch = cleanDate.match(/20(\d{2})/);
  const year = yearMatch ? parseInt(`20${yearMatch[1]}`) : 0;

  // 月名での検索
  for (const [monthStr, monthNum] of Object.entries(monthMap)) {
    if (new RegExp(monthStr, 'i').test(cleanDate)) {
      return { year, month: monthNum };
    }
  }

  // 数値での月検索
  const numMonthMatch = cleanDate.match(/(\d{1,2})/);
  if (numMonthMatch) {
    const num = parseInt(numMonthMatch[1]);
    if (num >= 1 && num <= 12) {
      return { year, month: num };
    }
  }

  return { year, month: 0 };
}

// データを処理する関数
export function processProjectData(rawData ){
  return rawData.map((item, index) => {
    const { year, month } = parseDate(item['Date']);

    const keywords = (item.技術・プラットフォーム ?? '')
      .split(/[、,，]/)
      .map((k) => (typeof k === 'string' ? k.trim() : ''))
      .filter((k) => k.length > 0);

    const majorCategory = normalizeMajorCategory(item.大分類);
    const minorCategory = normalizeMinorCategory(item.小分類);

    return {
      id: `project-${index}`,
      title: safeTrim(item.Title),
      url: safeTrim(item.Url),
      npub:safeTrim(item['Npub']),
      description: safeTrim(item.Desc),
      source: safeTrim(item.Source),
      date: safeTrim(item['Date']),
 
      keywords,
      majorCategory,
      minorCategory,
      year,
      month,
      picture:safeTrim(item['Picture'])
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

  // ✅ 出力先を Vite で import 可能な場所へ変更
  const outputDir = path.resolve('src/lib/generated');
  const jsonPath = path.join(outputDir, 'data.json');

  // ✅ ディレクトリがなければ作成
  await fs.mkdir(outputDir, { recursive: true });

  const rawData = await loadExcelData(xlsxPath);
  const processed = processProjectData(rawData);

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