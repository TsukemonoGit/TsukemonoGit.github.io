export interface FanActivity {
	title: string;
	description: string;
	url?: string;
	linkText?: string;
	tags?: string[];
}

export const fanActivities: FanActivity[] = [
	{
		title: 'ファンツール',
		description: '楽曲検索・情報整理ツール',
		url: 'https://example.com/tool',
		linkText: '歌詞検索くん'
	},
	{
		title: 'FAまとめ',
		description: 'PixivやTwitterでの創作活動',
		tags: ['イラスト', '動画']
	}
];
