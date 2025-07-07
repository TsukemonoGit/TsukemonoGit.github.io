import { games } from './games';
import { nostrTools } from './nostr';
import { fanActivities } from './fan';
import { mentions } from './media';
import { links } from './links';
import { articles } from './articles';

// カテゴリ別のアイテム数を計算
export const categoryStats = {
	games: games.length,
	nostrTools: nostrTools.length,
	fanActivities: fanActivities.length,
	mentions: mentions.length,
	links: links.length,
	articles: articles.length
};
// 統合カテゴリーデータの型定義
export interface CategoryData {
	id: string;
	name: string;
	emoji: string;
	href: string;
	showInOverview: boolean;
	showInNavigation: boolean;
	showCountInNavigation: boolean;
	colors: {
		from: string;
		to: string;
		border: string;
		text: string;
		textSecondary: string;
		darkFrom: string;
		darkTo: string;
		darkBorder: string;
		darkText: string;
		darkTextSecondary: string;
	};
}

// 統合カテゴリーデータ
export const categoryData: CategoryData[] = [
	{
		id: 'overview',
		name: '概要',
		emoji: '📊',
		href: '#overview',
		showInOverview: false,
		showInNavigation: true,
		showCountInNavigation: false,
		colors: {
			from: 'from-slate-50',
			to: 'to-slate-100',
			border: 'border-slate-200',
			text: 'text-slate-600',
			textSecondary: 'text-slate-700',
			darkFrom: 'dark:from-slate-900/20',
			darkTo: 'dark:to-slate-800/20',
			darkBorder: 'dark:border-slate-700/50',
			darkText: 'dark:text-slate-400',
			darkTextSecondary: 'dark:text-slate-300'
		}
	},
	{
		id: 'games',
		name: 'ゲーム',
		emoji: '🎮',
		href: '#games',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-blue-50',
			to: 'to-blue-100',
			border: 'border-blue-200',
			text: 'text-blue-600',
			textSecondary: 'text-blue-700',
			darkFrom: 'dark:from-blue-900/20',
			darkTo: 'dark:to-blue-800/20',
			darkBorder: 'dark:border-blue-700/50',
			darkText: 'dark:text-blue-400',
			darkTextSecondary: 'dark:text-blue-300'
		}
	},
	{
		id: 'nostr-tools',
		name: 'Nostr関連',
		emoji: '⚡',
		href: '#nostr',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-purple-50',
			to: 'to-purple-100',
			border: 'border-purple-200',
			text: 'text-purple-600',
			textSecondary: 'text-purple-700',
			darkFrom: 'dark:from-purple-900/20',
			darkTo: 'dark:to-purple-800/20',
			darkBorder: 'dark:border-purple-700/50',
			darkText: 'dark:text-purple-400',
			darkTextSecondary: 'dark:text-purple-300'
		}
	},
	{
		id: 'tools',
		name: 'その他作ったもの',
		emoji: '🛠️',
		href: '#tools',
		showInOverview: false,
		showInNavigation: true,
		showCountInNavigation: false,
		colors: {
			from: 'from-gray-50',
			to: 'to-gray-100',
			border: 'border-gray-200',
			text: 'text-gray-600',
			textSecondary: 'text-gray-700',
			darkFrom: 'dark:from-gray-900/20',
			darkTo: 'dark:to-gray-800/20',
			darkBorder: 'dark:border-gray-700/50',
			darkText: 'dark:text-gray-400',
			darkTextSecondary: 'dark:text-gray-300'
		}
	},
	{
		id: 'fan-activities',
		name: 'ファン活動',
		emoji: '💗',
		href: '#fan',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-pink-50',
			to: 'to-pink-100',
			border: 'border-pink-200',
			text: 'text-pink-600',
			textSecondary: 'text-pink-700',
			darkFrom: 'dark:from-pink-900/20',
			darkTo: 'dark:to-pink-800/20',
			darkBorder: 'dark:border-pink-700/50',
			darkText: 'dark:text-pink-400',
			darkTextSecondary: 'dark:text-pink-300'
		}
	},
	{
		id: 'articles',
		name: '書いた記事',
		emoji: '✍️',
		href: '#articles',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-cyan-50',
			to: 'to-cyan-100',
			border: 'border-cyan-200',
			text: 'text-cyan-600',
			textSecondary: 'text-cyan-700',
			darkFrom: 'dark:from-cyan-900/20',
			darkTo: 'dark:to-cyan-800/20',
			darkBorder: 'dark:border-cyan-700/50',
			darkText: 'dark:text-cyan-400',
			darkTextSecondary: 'dark:text-cyan-300'
		}
	},
	{
		id: 'mentions',
		name: '紹介・言及',
		emoji: '🗣️',
		href: '#mentions',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-amber-50',
			to: 'to-amber-100',
			border: 'border-amber-200',
			text: 'text-amber-600',
			textSecondary: 'text-amber-700',
			darkFrom: 'dark:from-amber-900/20',
			darkTo: 'dark:to-amber-800/20',
			darkBorder: 'dark:border-amber-700/50',
			darkText: 'dark:text-amber-400',
			darkTextSecondary: 'dark:text-amber-300'
		}
	},
	{
		id: 'links',
		name: 'SNS・アカウント',
		emoji: '🔗',
		href: '#links',
		showInOverview: true,
		showInNavigation: true,
		showCountInNavigation: true,
		colors: {
			from: 'from-emerald-50',
			to: 'to-emerald-100',
			border: 'border-emerald-200',
			text: 'text-emerald-600',
			textSecondary: 'text-emerald-700',
			darkFrom: 'dark:from-emerald-900/20',
			darkTo: 'dark:to-emerald-800/20',
			darkBorder: 'dark:border-emerald-700/50',
			darkText: 'dark:text-emerald-400',
			darkTextSecondary: 'dark:text-emerald-300'
		}
	}
];

// 概要セクション用のデータを取得
export function getOverviewCategories(categoryStats: any): (CategoryData & { count: number })[] {
	return categoryData
		.filter((category) => category.showInOverview)
		.map((category) => ({
			...category,
			count:
				categoryStats[
					category.id === 'nostr-tools'
						? 'nostrTools'
						: category.id === 'fan-activities'
							? 'fanActivities'
							: category.id
				] || 0
		}));
}

// ナビゲーション用のデータを取得
export function getNavigationCategories(categoryStats: any): (CategoryData & { count?: number })[] {
	return categoryData
		.filter((category) => category.showInNavigation)
		.map((category) => ({
			...category,
			count: category.showCountInNavigation
				? categoryStats[
						category.id === 'nostr-tools'
							? 'nostrTools'
							: category.id === 'fan-activities'
								? 'fanActivities'
								: category.id
					] || 0
				: undefined
		}));
}
