// 大分類の定義
export const majorCategories = [
    'ライブラリ・コンポーネント',
    'アプリケーション',
    "ゲーム",
    "記事・出版物",
    "Bot",
    'その他',
    "アカウント"
];
// 小分類の定義
export const minorCategories = [
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
    'Zenn', // 実データにあるので追加
    'Nostr', // 実データにあるので追加
    'Game', // 実データにあるので追加
    'npm' // 実データにあるので追加
];
// 大分類の設定
export const majorCategoryConfigs = {
    'ライブラリ・コンポーネント': { name: 'ライブラリ・コンポーネント', icon: '📚', color: '#3b82f6' },
    'アプリケーション': { name: 'アプリケーション', icon: '💻', color: '#10b981' },
    'ゲーム': { name: 'ゲーム', icon: '🎮', color: '#f97316' },
    '記事・出版物': { name: '記事・出版物', icon: '📰', color: '#facc15' },
    'Bot': { name: 'Bot', icon: '🤖', color: '#8b5cf6' },
    'その他': { name: 'その他', icon: '📂', color: '#6b7280' },
    'アカウント': { name: 'アカウント', icon: '👤', color: '#ef4444' }
};
// 小分類の設定
export const minorCategoryConfigs = {
    'Webアプリ': { name: 'Webアプリ', icon: '🌐', color: '#3b82f6' },
    '自動投稿Bot': { name: '自動投稿Bot', icon: '🤖', color: '#8b5cf6' },
    'Web Component': { name: 'Web Component', icon: '⚙️', color: '#f59e0b' },
    'ライブラリ': { name: 'ライブラリ', icon: '📦', color: '#06b6d4' },
    '拡張機能': { name: '拡張機能', icon: '🧩', color: '#84cc16' },
    'Webゲーム': { name: 'Webゲーム', icon: '🎮', color: '#ec4899' },
    'ソフトウェア': { name: 'ソフトウェア', icon: '💾', color: '#14b8a6' },
    '記事': { name: '記事', icon: '📝', color: '#f97316' },
    'カシふぁん作品': { name: 'カシふぁん作品', icon: '🎨', color: '#ef4444' },
    'GitHub': { name: 'GitHub', icon: '🐙', color: '#374151' },
    'Nostr機能': { name: 'Nostr機能', icon: '🔗', color: '#7c3aed' },
    'Bluesky': { name: 'Bluesky', icon: '🦋', color: '#0ea5e9' },
    'ブラウザ拡張': { name: 'ブラウザ拡張', icon: '🧩', color: '#84cc16' },
    '未分類': { name: '未分類', icon: '❓', color: '#9ca3af' },
    'Zenn': { name: 'Zenn', icon: '📚', color: '#1e40af' }, // 適宜アイコン・色を設定
    'Nostr': { name: 'Nostr', icon: '🔗', color: '#7c3aed' },
    'Game': { name: 'Game', icon: '🎮', color: '#f97316' },
    'npm': { name: 'npm', icon: '📦', color: '#cb3837' }
};
// 大分類ごとの小分類マッピング
export const categoryMapping = {
    'ライブラリ・コンポーネント': ['ライブラリ', 'Web Component', '未分類'],
    'アプリケーション': ['Webアプリ', 'ソフトウェア', '未分類'],
    'ゲーム': ['Webゲーム', 'Game'],
    '記事・出版物': ['記事'],
    'Bot': ['自動投稿Bot'],
    'その他': ['未分類'],
    'アカウント': ['Zenn', 'GitHub', 'Nostr', 'Game', 'Bluesky', 'npm']
};
